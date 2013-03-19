App.PlayerView = Ember.View.extend({
  playerError: function() {
    this.get('controller').send('playNextStream');
    this.rerender();
  }
});

App.GenericPlayerView = Ember.View.extend({
  isMobile: function(){
    return (MobileEsp.IsTierIphone || MobileEsp.IsTierTablet);
  }.property(),
  isAndroid: function() {
    return MobileEsp.os == 'Android';
  }.property(),
  controller: function(){
    return this.get('parentView.context');
  }.property(),
  jwPlayer: function(primary){
    var self = this;
    playerSetup = {
      file: this.get('controller.url'),
      height: 480,
      width: 640,
      autostart: true,
      primary: primary
    };
    
    jwplayer("player").setup(playerSetup);

    jwplayer("player").onError( function(event){
      // self.$() - my current view element
      self.$().trigger('playererror');
    });

  },
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
  
  didInsertElement: function() {
    var stream = {
      title: "Audio stream player",
      mp3: this.get('controller.url')
    },
    ready = false;

    $("#jquery_jplayer_1").jPlayer({
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
      swfPath: "swf",
      supplied: "mp3",
      preload: "none",
      wmode: "window"
    });
  }
});

App.HlsView = App.GenericPlayerView.extend({
  templateName: 'hls',
  didInsertElement: function() {
    if (this.get('isMobile')){
      if (MobileEsp.IsAndroid) {
        $("#player").html('<a class="player-link" href="' + this.get('controller.url') + '"><div class="play-link-wrapper"><p></p></div></a>');
      } else {
        this.flowPlayer();
      }
    } else {
      this.jwPlayer('html5');
    }
  }
});

App.FlashView = App.GenericPlayerView.extend({
  templateName: 'flash',
  didInsertElement: function() {
    this.jwPlayer('flash');
  }
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
