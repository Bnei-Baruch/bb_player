PlayerBB = {
  url: "http://player.kbb1.com/player/?",
  iframeId: null,
  config: {
    channelName: 'tv66',
    defaultLanguage: 'he',
    playerWidth: 640,
    playerHeight: 480,
    defaultQuality: 'medium',
    mediaMode: 'video',
    techPriorities: ['hls', 'flash', 'icecast'],
    showControlls: true,
    consoleDebug: false,
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

  _addControllsHeight: function(){
    if(this.config.showControlls){
      return 30;
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
  
  // This is used for debugging in console
  // Adds 'ember' object as proxy to Ember App
  _getApp: function(){
    var iframe = document.getElementById(this.iframeId);
    var inter = window.setInterval(function() {
      if (iframe.contentWindow.document.readyState === "complete") {
        window.clearInterval(inter);
        window.ember = iframe.contentWindow.App;
      }
    }, 100);
  },
  
  init: function(containerId, setup){
    this._setConfig(setup);

    this.iframeId |= containerId + "-iframe"
    var link = this.url + this._parseParams(); 
    var iframe = document.createElement('iframe');
    
    iframe.frameBorder = 0;
    iframe.width = this.config.playerWidth;
    iframe.height = this.config.playerHeight + 5 + this._addDebugHeight() + this._addControllsHeight();
    iframe.id = this.iframeId;
    iframe.setAttribute("src", link);
    document.getElementById(containerId).appendChild(iframe);

    if (this.config.consoleDebug){
      this._getApp();
    }
  },
}
