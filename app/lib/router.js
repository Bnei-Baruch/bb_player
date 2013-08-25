App.Router.map(function() {
  this.route("channel", { path: "/" });
});

App.ChannelRoute = Ember.Route.extend({
  model: function() {
    var channel = this.controllerFor('channel').channelName;
    //return App.Channel.find(channel);
    record = App.Channel.createRecord({
      id: channel,
      status: 'playerLoading',
      version: 0,
      interval: 2
    });
    // workarounf to make the record in state of saved so poling will work (otherwise its in state uncommited)
    record.stateManager.transitionTo('loaded.saved');
    return record;
  },
  renderTemplate: function() {
    this.render('channel', {
      into: 'application'
    });
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    //this.events.startPolling(controller);
  },
  events: {
    showSlide: function() {
      this.transitionTo('slide');
    },
    showPlayer: function() {
      this.transitionTo('player');
    }
  }
});
