App.PlayerController = Ember.ArrayController.extend({
  init: function() {
    this._super();
    this._getStreamData();
  },

  // Properties
  _currentIndex: 0,
  _currentTechnologyIndex: 0,
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
  streams: function() {
    var streams = this.get('content');
    return streams.filterProperty('quality', this.get('currentQuality'));
  }.property('content.@each'),

  currentQuality: function() {
    var defaultQuality = this.get('settings.defaultQuality') || 'medium';
    var streams = this.get('content');
    var qualities = streams.mapProperty('quality');
    if (qualities.contains(defaultQuality)) {
      return defaultQuality;
    } else if (qualities.length > 0) {
      return qualities[0];
    } else {
      return null;
    };
  }.property('content.@each'),
  
  currentStream: function() {
    var quality = this.get('currentQuality');
    var idx = this.get('_currentIndex');
    return this.get('streams').objectAt(idx); 
  }.property('content.@each', '_currentIndex'),
  
  streamsLength: function() {
    var streams = this.get('streams');
    if (Em.isEmpty(streams)) return 0;
    return streams.toArray().length;
  }.property('content.@each'),

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

  //functions
  playNextStream: function() {
    var idx = this.get('_currentIndex') + 1;
    if (idx >= this.get('streamsLength')){
      var success = this._getNextTechnology();
      if (success){
        idx = 0;
      }else {
        console.log('##### - PROBLEM - #####');// TODO: Create error message manager.
      }
    }
    this.set('_currentIndex', idx);
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
    this.set('content', App.Stream.find({
      language_id: this.get('channel.currentLanguage.id'),
      channel_id: this.get('channel.id'),
      technology_id: this.get('currentTechnology') 
    }));
  }
});
