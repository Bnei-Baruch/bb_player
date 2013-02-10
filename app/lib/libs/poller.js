App.Poller = Ember.Object.extend({
  _intervalId: null,
  start: function(code, delay){
    if (this._intervalId){
      this.stop();
    }

    this._intervalId = setInterval(code, delay*1000)
  },
  stop: function(){
    if (this._intervalId){
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }
});
