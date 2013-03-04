App.PlayerView = Ember.View.extend({
  playerError: function() {
    this.get('controller').send('playNextStream');
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
  template: Ember.Handlebars.compile('mobile?:{{view.isMobile}} <div id="player" data-ratio="0.75"></div>'),
  jwPlayer: function(primary){
    var self = this;
    playerSetup = {
      file: this.get('controller.url'),
      height: 480,
      width: 640,
      autostart: true,
      primary: primary
    };
    playerState = jwplayer('player').getState();
    //if (playerState !== undefined){
    if (false){

      jwplayer("player").load([{file: 'http://wowza1.il.kab.tv/rtplive/tv66-heb-medium.stream/playlist.m3u8'}]).play(true);
      //jwplayer('player').play()
    } else {
      jwplayer("player").setup(playerSetup);
    }
    jwplayer("player").onError( function(event){
      // self.$() - my current view element
      self.$().trigger('playererror');
    });

  }
});

App.HlsView = App.GenericPlayerView.extend({
  didInsertElement: function() {
    debugger;
    if (this.get('isMobile')){
      if (MobileEsp.IsAndroid) {
        $("#player").html('<a href="' + this.get('controller.url') + '">Play</a>');
      } else {
        flowplayer.conf.ratio = 3/4;
        flowplayer(function(api, root) {
          api.bind("error", function(e, api, error) {
            alert(error.code + ": " + error.message);
          })
        });

        $("#player").html('<video autoplay><source type="application/x-mpegurl" src="' + this.get('controller.url') + '"/></video>');
        $("#player").flowplayer();
      }
    } else {
      this.jwPlayer('html5');
    }
  }
});

App.FlashView = App.GenericPlayerView.extend({
  didInsertElement: function() {
    this.jwPlayer('flash');
  }
});

App.PlayerWrapperView = Ember.ContainerView.extend({
  childViews:['playerView'],
  playerView: function(){
    var tech = this.get('controller.streamTechnologyType');
    if (tech === 'hls'){
      return App.HlsView;
    }else if (tech === 'flash'){
      return App.FlashView;
    }
  }.property('controller.streamTechnologyType')
});
