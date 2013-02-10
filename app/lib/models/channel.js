App.Channel = DS.Model.extend({
  version: attr('number'),
  status: attr('string'),

  streams: DS.hasMany('App.Stream')
});
