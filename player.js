PlayerBB = {
  url: "http://player.kbb1.com/player/?",
  config: {
    channelName: 'tv66',
    defaultLanguage: 'he',
    playerWidth: 640,
    playerHeight: 480,
    defaultQuality: 'medium',
    mediaMode: 'video',
    techPriorities: ['hls', 'flash', 'icecast'],
    showControlls: true,
    showDebugMode: false
  },

  _parseParams: function(){
    var result = "";
    for (var key in this.config) {
      if (result != "") {
        result += "&";
      }
      result += key + "=" + this.config[key];
    }
    return result;
  },

  _addDebugHeight: function(){
    if(this.config.showDebugMode){
      return 420;
    } else {
      return 0;
    }
  },

    // update config according to external ob
  _setConfig: function(setup){
    if (typeof setup == 'object' ){
      for (var key in setup){
        if (typeof this.config[key] != 'undefined') {
          this.config[key] = setup[key];
        } 
      }
    }
  },
  
  init: function(containerId, setup){
    this._setConfig(setup);

    var link = this.url + this._parseParams(); 
    var iframe = document.createElement('iframe');
    iframe.frameBorder = 0;
    iframe.width = this.config.playerWidth + 10;
    iframe.height = this.config.playerHeight + this._addDebugHeight();
    iframe.id = containerId + "-iframe";
    iframe.setAttribute("src", link);
    document.getElementById(containerId).appendChild(iframe);
  },
}
