var attr = DS.attr;

App.Channel = DS.Model.extend({
  version: attr('number'),
  status: attr('string'),

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

App.Stream = DS.Model.extend({
  location: attr('string'),
  system_name: attr('string'),
  quality: attr('string'),
  resolution: attr('string'),
  url: attr('string'),

  technology: DS.belongsTo('App.Technology'),
  channel: DS.belongsTo('App.Channel'),
  language: DS.belongsTo('App.Language')
});

