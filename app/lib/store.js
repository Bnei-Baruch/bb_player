DS.RESTAdapter.configure("plurals", {
  technology: "technologies"
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.create({
    url: 'http://player.kbb1.com',
    //url: 'http://10.0.0.10',
    
    namespace: 'api'
  })
});

