App.Store = DS.Store.extend({
  revision: 11,
  adapter: DS.RESTAdapter.create({
    url: 'http://10.66.10.111:3001',
    namespace: 'api'
  })
});
