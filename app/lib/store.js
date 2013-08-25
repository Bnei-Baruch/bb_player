App.UrlParser = Em.Object.extend({
  url: function(){
    query = decodeURI(location.search.replace(/^\?/, '').replace(/&/g, "\",\"").replace(/=/g,"\":\""));
    var originConfig = {};
    if (!Em.isEmpty(query)) {
      originConfig = JSON.parse('{"' + query + '"}');
    }
    return originConfig['apiURL'] || 'http://player.kbb1.com';
  }.property()
});

DS.RESTAdapter.configure("plurals", {
  technology: "technologies"
});

App.Store = DS.Store.extend({
  //revision: 12,
  recordWasError: function(record, errors) {
    record.stateManager.transitionTo('loaded.saved');
    // TODO: implement sending message to developers
    
    //record.set('version', 0);
    //record.set('status', 'closed');
  },
  adapter: DS.RESTAdapter.create({
    url: App.UrlParser.create().get('url'),
    namespace: 'api'
  })
});
