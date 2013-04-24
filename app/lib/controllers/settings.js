App.SettingsController = Ember.Controller.extend({
  playerWidth: 640,
  playerHeight: 480,
  defaultLanguage: 'he',
  prefferedPlayer: 'jwplayer', // support for 'flowplayer' or 'jwplayer'
  supportHLSFlashMode: true, //only when jwplayer is used
  techPriorities: ['hls', 'flash', 'icecast'],
  technologies: [],
  channelName: 'tv66',

  init: function() {
    this._super();
    this.set('technologyDetection', App.TechnologyDetection.create({supportHLSFlashMode: this.get('supportHLSFlashMode')}));
    this.techPriorities.forEach(function(item) {
      var name = item + 'Support';
      if (this.get('technologyDetection.' + name)) {
        this.technologies.push(item);
      }
    }, this);
  }

});


