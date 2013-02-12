App.SettingsController = Ember.Controller.extend({
  playerWidth: 640,
  playerHeight: 480,
  defaultLanguage: 'he',
  prefferedPlayer: 'jwplayer', // support for 'flowplayer' or 'jwplayer'
  supportHLSFlashMode: false, //only when jwplayer is used
  techPriorities: ['hls', 'flash', 'icecast'],
  technologies: [1, 2],
  channelName: 'tv66',

  needs: ['technologyDetection'],
  technologyDetection: function() {
    return this.controllerFor('technologyDetection');
  }.property(),

});

