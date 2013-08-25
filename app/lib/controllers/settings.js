App.SettingsController = Ember.Controller.extend({
  playerWidth: 640,
  playerHeight: 480,
  defaultLanguage: 'he',
  defaultQuality: 'medium',
  prefferedPlayer: 'jwplayer', // support for 'flowplayer' or 'jwplayer'
  supportHLSFlashMode: true, //only when jwplayer is used
  techPriorities: ['hls', 'flash', 'icecast'],
  technologies: [],
  channelName: 'tv66',
  showControlls: false,
  showDebugMode: false,
  mediaMode: 'video',
  playerVersion: 0.3,
  apiURL: 'http://player.kbb1.com',

  _setOriginParams: function(){
    if (Em.isEmpty(location.search)){
      return null;
    }
    var originConfig = JSON.parse('{"' + decodeURI(location.search.replace(/^\?/, '').replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
    for (var key in originConfig){
      switch (typeof this[key]) {
        case 'undefined':
          break;
        case 'number':
          this.set(key, parseInt(originConfig[key]));
          break;
        case 'boolean':
          originConfig[key] == 'true' ? this.set(key, true) : this.set(key, false); 
          break;
        case 'object':
          if (Em.isArray(this[key])){
            this.set(key, originConfig[key].split(','));
          } 
          break;
        case 'string':
          this.set(key, originConfig[key]);
          break;
        default:
          break;
      }
    }
  },

  init: function() {
    this._super();
    this._setOriginParams();
    this.set('technologyDetection', App.TechnologyDetection.create({supportHLSFlashMode: this.get('supportHLSFlashMode')}));
    this.techPriorities.forEach(function(item) {
      var name = item + 'Support';
      if (this.get('technologyDetection.' + name)) {
        this.technologies.push(item);
      }
    }, this);
  }

});


