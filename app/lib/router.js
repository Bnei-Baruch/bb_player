App.Router.map(function() {
  this.route("channel", { path: "/" });
});

App.ChannelRoute = Ember.Route.extend({
  model: function(params) {
    var channel = this.controllerFor('channel').channelName;
    return App.Channel.find(channel);
  },
  enter: function() {
    this.send('startPolling', this.controllerFor('channel'));
  },
  renderTemplate: function() {
    this.render('channel', {
      into: 'application'
    });
  },
  events: {
    getChannelDetails: function(controller) {
      controller.set('languages', App.Language.find({
        channel_id: controller.channelName
      }));
    },
    startPolling: function(controller) {
      controller.poller.start(function() {
        controller.content.reload();
      }, 5);
    },
    showSlide: function() {
      this.transitionTo('slide');
    },
    showPlayer: function() {
      this.transitionTo('player');
    }
  }
});
