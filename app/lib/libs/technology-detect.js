App.TechnologyDetection = Ember.Object.extend({
  supportHLSFlashMode: false,
  flashSupport: function(){
    // flowplayer has flash detection property
    return flowplayer.support.flashVideo;
  }.property(),
  hlsSupport: function(){
    //iOS or safari or non mobile hls flash mode
    return App.BrowserDetect.browser == 'Safari' || MobileEsp.IsIphone || MobileEsp.IsAndroid || this.get('_hlsFlashModeSupport');
  }.property(),
  icecastSupport: function(){
    return true;
  }.property(),
  //jwplayer supports playing hls stream in flash mode - this setting is enabled in settings
  _hlsFlashModeSupport: function(){
    return this.get('supportHLSFlashMode') && this.get('flashSupport') && !(MobileEsp.IsTierIphone || MobileEsp.IsTierTablet);
  }.property()

});
