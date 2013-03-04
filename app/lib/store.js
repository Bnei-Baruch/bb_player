App.Store = DS.Store.extend({
  revision: 11,
  adapter: DS.RESTAdapter.create({
    url: 'http://player.kbb1.com',
    namespace: 'api'
  })
});
