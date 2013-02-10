App.Store = DS.Store.extend({
  revision: 11,
  adapter: DS.RESTAdapter.create({
    url: 'http://10.66.9.92:3002',
    namespace: 'api'
  })
});
