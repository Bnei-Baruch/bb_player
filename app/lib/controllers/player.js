App.PlayerController = Ember.ArrayController.extend({

  // Properties
  currentIndex: 0,
  currentStream: null,
  currentQuality: null,
  _currentTechnologyIndex: 0,
  _languages: null,
  names: ["Rami", "Moshe"],

  // Settings
  needs: ['channel'],
  lookupItemController: function( object ) {
    if (Em.isEmpty(object)) return false;
    return object.get('technology.technologyType');
  },
  channelBinding: 'controllers.channel',

  // Computed properties
  isMobile: function(){
    return (MobileEsp.IsTierIphone || MobileEsp.IsTierTablet);
  }.property(),

  streamsInQuality: function() {
    var streams = this.get('content');
    return streams.filterProperty('quality', this.get('currentQuality'));
  }.property('content.@each', 'currentQuality'),

  currentLanguage: function() {
    var languages = this.get('languages');
    var defaultLanguage = this.get('settings.defaultLanguage');
    if(Ember.isEmpty(languages)) return null;
    var results = languages.filterProperty('locale', defaultLanguage);
    if(Ember.isEmpty(results) || results.length > 1) {
      // TODO: Inform developers and write an error message
      return null;
    }
    return results.get('firstObject');
  }.property('languages.@each'),

  //currentQuality: function() {
    //var defaultQuality = this.get('settings.defaultQuality') || 'medium';
    //var streams = this.get('content');
    //var qualities = streams.mapProperty('quality');
    //if (qualities.contains(defaultQuality)) {
      //return defaultQuality;
    //} else if (qualities.length > 0) {
      //return qualities[0];
    //} else {
      //return null;
    //};
  //}.property('content.@each'),
  
  streamsLength: function() {
    var streams = this.get('streamsInQuality');
    if (Em.isEmpty(streams)) return 0;
    return streams.toArray().length;
  }.property('content.@each', 'streamsInQuality'),

  streamTechnologyType: function(){
    return this.get('currentStream.technology.technologyType')
  }.property('currentStream'),

  currentTechnology: function(){
    var tech = this.get('settings.technologies');
    return tech[this.get('_currentTechnologyIndex')];
  }.property('_currentTechnologyIndex'),

  isIcecast: function(){
   return 'icecast' === this.get('streamTechnologyType');
  }.property('streamTechnologyType'),

  isHls: function(){
   return 'hls' === this.get('streamTechnologyType');
  }.property('streamTechnologyType'),
  isFlash: function(){
   return 'flash' === this.get('streamTechnologyType');
  }.property('streamTechnologyType'),

  languages: function(){
    var cachedLanguages = this.get('_languages');
    if (!Em.isNone(cachedLanguages)) return cachedLanguages;
    self = this;
    var remoteLanguages = App.Language.find({
      channel_id: this.get('settings.channelName'),
      ts: Date.now()
    }).then(function(languages){
      self.set('_languages', languages);
      self._getStreamData();
      debugger;
    });
    return remoteLanguages;
  }.property().volatile(), // do not cache this property (I'm manually caching it)



  //Observers

  currentQualityShouldChange: Ember.observer(function(controller, key) {
    var quality = this.get('currentQuality');
    var defaultQuality = quality || this.get('settings.defaultQuality') || 'medium';
    var streams = this.get('content');
    var qualities = streams.mapProperty('quality');
    if (qualities.contains(defaultQuality)) {
      if (Em.isEmpty(quality)) controller.set('currentQuality', defaultQuality);
    } else if (qualities.length > 0) {
      controller.set('currentQuality', qualities[0]);
    } else {
      return null;
    }
  }, 'content.@each'),
  
  currentIndexShoudChange: function(){
    debugger;
    this.set('currentIndex', 0);
  }.observes('currentQuality'),

  languagesChanged: Ember.observer(function(controller, key) {
    debugger;
    if (Em.isEmpty(controller.content)) return;
    controller.content.reload();
  }, 'languages.@each'),

  versionChanged: Ember.observer(function(controller, key) {
    this._getStreamData();
  }, 'channel.currentVersion'),

  currentStreamShouldChange: Ember.observer(function(controller, key) {
    //debugger;
    var stream = controller.get('currentStream');
    var quality = controller.get('currentQuality');
    var idx = controller.get('currentIndex');
    //var newStream = controller.get('content').findProperty('id', idx.toString());
    var newStream = controller.get('streamsInQuality').objectAt(idx);
    if ((Em.isNone(stream) && newStream != undefined) || (!Em.isNone(newStream) && stream.get('url') != newStream.get('url'))){
      debugger;
      this.set('currentStream', Em.copy(newStream));
    } 
  }, 'content.@each', 'currentIndex', 'currentQuality'),


  //functions
  playNextStream: function() {
    debugger;
    var idx = this.get('currentIndex') + 1;
    if (idx >= this.get('streamsLength')){ // in case of last stream in the current tech
      var success = this._getNextTechnology();
      if (success){
        idx = 0;
      } else {
        console.log('##### - PROBLEM - #####');// TODO: Create error message manager.
      }
    }
    this.set('currentIndex', idx);
  },
  _getNextTechnology: function(){
    var idx = this.get('_currentTechnologyIndex') + 1;
    if (idx >= this.get('settings.technologies.length')){
      return false;
    }
    this.set('_currentTechnologyIndex', idx);
    this._getStreamData();
    return true;
  },
  _getStreamData: function(){
    var language_id = this.get('currentLanguage.id');
    if(language_id === null) return;
    this.set('content', App.Stream.find({
      language_id: language_id,
      channel_id: this.get('channel.id'),
      technology_id: this.get('currentTechnology'),
      ts: Date.now()
    }));
  }

});
