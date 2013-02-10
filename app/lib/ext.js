attr = DS.attr;

// settings controller will be injected to all controllers as settings property
Em.ControllerMixin.reopen({
  needs: 'settings',
  settings: function() {
    return this.controllerFor('settings');
  }.property()
})

//var get = Ember.get, fmt = Ember.String.fmt;

//Ember.View.reopen({
  //templateForName: function(name, type) {
    //if (!name) { return; }

    //var templates = get(this, 'templates'),
        //template = get(templates, name);

    //if (!template) {
      //try {
        //template = require(name);
      //} catch (e) {
        //throw new Ember.Error(fmt('%@ - Unable to find %@ "%@".', [this, type, name]));
      //}
    //}

    //return template;
  //}
//});
