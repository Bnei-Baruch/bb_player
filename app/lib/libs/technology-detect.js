App.TechnologyDetection = Ember.Object.extend({
  flashSupport: function(){
    // flowplayer has flash detection property
    return flowplayer.support.flashVideo;
  }.property(),
  hlsSupport: function(){
    //iOS or safari
    return App.BrowserDetect.browser == 'Safari' || MobileEsp.IsIphone;
  }.property(),
  icecastSupport: function(){
    return true;
  }.property()
});
