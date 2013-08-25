App.ChannelController = Ember.ObjectController.extend({
  // Properties
  currentVersion: 0,
  currentStatus: null,
  currentInterval: null,
  renderPlayer: false, 
  channelName: null,
  previousStatus: null,

  // Bindings
  currentVersionBinding: 'version',
  currentStatusBinding: 'status',
  currentIntervalBinding: 'interval',
  channelNameBinding: 'settings.channelName',

  poller: App.Poller.create(),

  // Observers
  statusChanged: Ember.observer(function(controller, key) {
    var status = controller.get('currentStatus');
    var previousStatus = controller.get('previousStatus');
    if(status === 'open' && previousStatus === 'refresh') {
      window.location.reload();
    } else {
      if(status === 'open') {
        this.set('renderPlayer', true);
      } else {
        if (status !== 'refresh') this.set('renderPlayer', false);
        if(['not_allowed', 'invalid'].contains(status)) {
          //TODO: send message - Implement message model
        }
      }
    }
    controller.set('previousStatus', status);
  }, 'currentStatus'),

  // This also triggers the poller for the first time!
  intervalChanged: Ember.observer(function(controller, key) {
    // minimum interval should be 2 seconds otherwise it will crash!
    if (this.get('currentInterval') < 2) return;

    controller.poller.stop();
    controller.startPolling();
  }, 'currentInterval'),


  // functions
  startPolling: function(){
    var controller = this;
    controller.poller.start(function() {
      var recordState = controller.get('content.stateManager.currentState.name');

      // don't reload channel in case it is in 'bad' state
      if (['uncommitted', 'reloading'].contains(recordState)) return;
      
      try{
        controller.content.reload();
      } catch(e){
        console.log(e.message);
        controller.content.stateManager.transitionTo('loaded.saved');
        // TODO: implement sending message to developers
      }

    }, controller.get('currentInterval'));
  }


});
