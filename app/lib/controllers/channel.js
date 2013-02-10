App.ChannelController = Ember.ObjectController.extend({
  // Properties
  currentVersion: 0,
  currentStatus: null,
  displaySlide: false, //TODO: Do we need it?
  languages: null,
  channelName: null,
  
  // Bindings
  currentVersionBinding: 'version',
  currentStatusBinding: 'status',
  channelNameBinding: 'settings.channelName',
  
  poller: App.Poller.create(),

  // Observers
  statusChanged: Ember.observer(function(controller, key) {
    var status = controller.get('currentStatus');
    if(status === 'open') {
      this.get('target').send('getChannelDetails', this);
    } else {
      if(['not_allowed', 'invalid'].contains(status)) {
        //TODO: send message - Implement message model
      }
      //TODO: display slide
      // this.get('target').send('showSlide');
      // this.target.transitionTo('slide');
    }
  }, 'currentStatus'),

  // Binded properties
  readyToRenderPlayer: function() {
    // default language in the list
    // status is open
    var statusIsOpen = this.get('currentStatus') === 'open',
      languagePresent = !Em.isEmpty(this.get('currentLanguage'));

    return statusIsOpen && languagePresent;
  }.property('currentLanguage', 'currentStatus'),
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
  }.property('languages.@each')

});
