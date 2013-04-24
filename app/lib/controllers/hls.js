App.IcecastController = Ember.ObjectController.extend({
  needs: 'player',
  player: null,
  playerBinding: 'controllers.player' 
});

App.HlsController = Ember.ObjectController.extend({
  needs: 'player',
  player: null,
  playerBinding: 'controllers.player' 
});

App.FlashController = Ember.ObjectController.extend({
  needs: 'player',
  player: null,
  playerBinding: 'controllers.player' 
});
