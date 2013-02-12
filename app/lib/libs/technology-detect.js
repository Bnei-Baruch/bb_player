App.TechnologyDetection = Ember.Controller.extend({
  flashSupport: function(){
    // flowplayer has flash detection property
    return flowplayer.support.flashVideo;
  }.property(),
  hlsSupport: function(){
    //iOS or safari or non mobile hls flash mode
    return App.BrowserDetect.browser == 'Safari' || MobileEsp.IsIphone || this.hlsFlashModeSupport;
  }.property(),
  icecastSupport: function(){
    return true;
  }.property(),
  //jwplayer supports playing hls stream in flash mode - this setting is enabled in settings
  hlsFlashModeSupport: function(){
    return this.flashSupport && !(MobileEsp.IsTierIphone || MobileEsp.IsTierTablet) && this.get('settings.supportHLSFlashMode');
  }.property()

});
