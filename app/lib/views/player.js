App.PlayerView = Ember.View.extend({
  playerError: function() {
    debugger;
    this.get('controller').send('playNextStream');
    this.rerender();
  }
});

App.GenericPlayerView = Ember.View.extend({
  isAndroid: function() {
    return MobileEsp.os == 'Android';
  }.property(),
  controller: function(){
    return this.get('parentView.context');
  }.property(),

  flowPlayer: function(){
    flowplayer.conf.ratio = 3/4;
    flowplayer(function(api, root) {
      api.bind("error", function(e, api, error) {
        alert(error.code + ": " + error.message);
      })
    });

    $("#player").html('<video autoplay><source type="application/x-mpegurl" src="' + this.get('controller.url') + '"/></video>');
    $("#player").flowplayer();
  }
});

App.IcecastView = App.GenericPlayerView.extend({
  templateName: 'icecast',
  playerId: 'jplayer_1',
  setupPlayer: function(stream) {
    var ready = false;
    var self = this;
    
    $("#" + this.get('playerId')).jPlayer({
      ready: function (event) {
        ready = true;
        $(this).jPlayer("setMedia", stream).jPlayer('play');
      },
      pause: function() {
        $(this).jPlayer("clearMedia");
      },
      error: function(event) {
        if(ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
          // Setup the media stream again and play it.
          $(this).jPlayer("setMedia", stream).jPlayer("play");
        }else {
          self.$().trigger('playererror');
        }
      },
      swfPath: "assets/swf",
      supplied: "mp3",
      preload: "none",
      wmode: "window",
      smoothPlayBar: true,
      keyEnabled: true
    });
  },
  didInsertElement: function() {
    var stream = {
      title: "Audio stream player",
      mp3: this.get('controller.url')
    };
    this.setupPlayer(stream);
  },
  restartPlayer: function() {
    debugger;
    var stream = {
      title: "Audio stream player",
      mp3: this.get('controller.url')
    };
     $("#" + this.get('playerId')).jPlayer('destroy');
    this.setupPlayer(stream);
  }.observes('controller.url')
});

App.JwPlayerComponent = Em.Component.extend({
  heigh: null,
  width: null,
  url: null,
  timeout: 10,
  playerId: 'jwplayer',
  _timeoutId:  null,
  
  
  didInsertElement: function(){
    this.setup();
    this.play();
  },

  setup: function(){
    debugger;
    var playerId = this.get('playerId')
    var self = this;
    playerSetup = {
      file: this.get('url'),
      height: this.get('height'),
      width: this.get('width'),
      autostart: false,
      skin: 'stormtrooper'
    };
    
    jwplayer(playerId).setup(playerSetup);

    jwplayer(playerId).onSetupError( function(event){
      debugger;
      // self.$() - my current view element
      self._raiseError();
    });

    jwplayer(playerId).onError( function(event){
      debugger;
      // self.$() - my current view element
      self._raiseError();
    });

  },

  play: function(){
    debugger;
    var currentUrl = this.get('url')
    if (Em.isEmpty(currentUrl)) return;

    jwplayer(this.playerId).load([{
      file: currentUrl
    }]);
    jwplayer().play();

    // in case the plaer doesn't start playing after x seconds
    this._playerTimeoutObserver();
  }.observes('url'),

  willDestroy: function() {
    this._clearTimeout(); 
    this._super();
  },

  _raiseError: function() {
    this.$().parent().trigger('playererror');
  },

  _playerTimeoutObserver: function() {
    this._clearTimeout(); 
    var self = this;
    var timeoutId = setTimeout(function() {
      debugger;
      var state = jwplayer().getState();
      if (state !== 'PLAYING') self._raiseError();
    }, this.get('timeout') * 1000);
    this.set('_timeoutId', timeoutId);
  },

  _clearTimeout: function() {
    var timeoutId = this.get('_timeoutId');
    if (!Em.isEmpty(timeoutId)) {
      clearTimeout(timeoutId);
    }
  }

});

App.HlsView = App.GenericPlayerView.extend({
  mobileMode: function(){
    return this.get('controller.player.isMobile') && MobileEsp.IsAndroid;
  }.property(),

  mobileStyle: function(){
    return 'width:' + this.get('controller.settings.playerWidth') + 'px; height:' + this.get('controller.settings.playerHeight') + 'px;'
  }.property()

});

App.FlashView = App.GenericPlayerView.extend({
  templateName: 'flash',
});

//App.PlayerWrapperView = Ember.ContainerView.extend({
  //childViews:['playerView'],
  //playerView: function(){
    //var tech = this.get('controller.streamTechnologyType');
    //if (tech === 'hls'){
      //return App.HlsView;
    //} else if (tech === 'flash'){
      //return App.FlashView;
    //} else if (tech === 'icecast'){
      //return App.IcecastView;
    //}
  //}.property('controller.streamTechnologyType')
//});
