App.PollingController = Ember.Controller.extend({
  _intervalId: null,
  start: function(time){
    // In case it is running
    if (this._intervalId){
      this.stop();
    }
    var self = this;
    this._intervalId = setInterval(function(){
      App.Channel.find(self.settings.channelName);
    }, time*1000);
  },
  stop: function(){
    if (this._intervalId){
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }
});
