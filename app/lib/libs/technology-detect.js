App.TechnologyDetection = Ember.Object.extend({
  supportHLSFlashMode: false,
  flashSupport: function(){
    // FlashDetect - http://www.featureblend.com/javascript-flash-detection-library.html
    //return false;
    return FlashDetect.installed && !this.get('_isMobile');
  }.property(),
  hlsSupport: function(){
    //iOS or safari or non mobile hls flash mode
    return App.BrowserDetect.browser == 'Safari' || MobileEsp.IsIphone || MobileEsp.IsAndroid && App.BrowserDetect.osVersion >= 4 || this.get('_hlsFlashModeSupport');
  }.property(),
  icecastSupport: function(){
    return true;
  }.property(),
  //jwplayer supports playing hls stream in flash mode - this setting is enabled in settings
  _hlsFlashModeSupport: function(){
    return this.get('supportHLSFlashMode') && this.get('flashSupport') && !this.get('_isMobile');
  }.property(),

  _isMobile: function(){
    return MobileEsp.IsTierIphone || MobileEsp.IsTierTablet;
  }.property()

});
