require('bb-player/ext');
require('bb-player/env');

Ember.LOG_BINDINGS = false;

App = Ember.Application.create({
  LOG_TRANSITIONS: false,
  ready: function() {
    // this.set('router.enableLogging', true);
  },
  customEvents: {
    // player event
    'playererror': "playerError"
  }
});

// DS.Model.reopen({
//   reloadObject: function() {
//     var store = this.store,
//     adapter = store.adapter,
//     id = this.get('id'),
//     root = adapter.rootForType(this.constructor);

//     //save the model type to be used inside the ajax success callback (workaround)
//     adapter.set('_reloadedType', this.constructor);
//     adapter.ajax(adapter.buildURL(root, id), "GET", {
//       success: function(json) {
//         Ember.run(this, function() {
//           this.didFindRecord(store, this.get('_reloadedType'), json, id);
//           this.set('_reloadedType', null);
//         });
//       }
//     });
//   }
// });
