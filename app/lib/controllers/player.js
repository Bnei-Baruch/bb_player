App.PlayerController = Ember.ArrayController.extend({
  init: function() {
    this._getStreamData();
    this._super();
  },

  // Properties
  _currentIndex: 0,
  _currentTechnologyIndex: 0,

  // Settings
  needs: ['channel'],
  lookupItemController: function( object ) {
    if (Em.isEmpty(object)) return false;
    return object.get('technology.technologyType');
  },
  channel: function() {
    return this.controllerFor('channel');
  }.property(),

  // Computed properties
  currentStream: function() {
    var idx = this.get('_currentIndex');
    return this.get('content').objectAt(idx); 
  }.property('content.@each', '_currentIndex'),
  streamsLength: function() {
    var streams = this.get('content');
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
