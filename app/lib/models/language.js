var attr = DS.attr;
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

