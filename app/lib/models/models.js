var attr = DS.attr;

DS.Model.reopen({

  becameError: function(record){
    // TODO: implement sending message to developers
    //debugger;
    //record.stateManager.transitionTo('loaded.saved');
    //debugger;
    //record.stateManager.transitionTo('loaded.updated');
    //status = record.get('status');
    //if (status != 'open') {
      //record.set('status', 'invalid');
    //}
  }

});

App.Channel = DS.Model.extend({
  version: attr('number'),
  status: attr('string'),
  interval: attr('number'),

  streams: DS.hasMany('App.Stream')
});

App.Language = DS.Model.extend({
  locale: attr('string'),
  technologies: DS.hasMany('App.Technology'),
  streams: DS.hasMany('App.Stream')
});

App.Technology = DS.Model.extend({
  technologyType: attr('string'),
  mediaType: attr('string'),
  languages: DS.hasMany('App.Language'), // Not implemented on the server
  streams: DS.hasMany('App.Stream')
});

App.Stream = DS.Model.extend(Ember.Copyable, {
  location: attr('string'),
  system_name: attr('string'),
  quality: attr('string'),
  resolution: attr('string'),
  url: attr('string'),

  technology: DS.belongsTo('App.Technology'),
  channel: DS.belongsTo('App.Channel'),
  language: DS.belongsTo('App.Language'),

  copy: function(deep){
    return App.Stream.createRecord({
      location: this.get('location'),
      system_name: this.get('system_name'),
      quality: this.get('quality'),
      resolution: this.get('resolution'),
      url: this.get('url'),

      technology: this.get('technology'),
      channel: this.get('channel'),
      language: this.get('language')
    });
  }
});
