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
