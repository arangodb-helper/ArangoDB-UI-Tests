/*globals exports*/

(function() {
  "use strict"; 
  var Helper = function(casper, bUrl) {
    var baseUrl = bUrl.split("/_admin")[0];
    var toCleanUp = [];
    var urls = {
      collections: baseUrl + "/_api/collection",
    };
    var deleteCollection = function() {
      var name = this;
      casper.thenOpen(urls.collections + "/" + name, {
        method: "delete"
      });
    };
    var createCollection = function(name, type, options) {
      if (!name) {
        throw "Please give a name";
      }
      options = options || {};
      options.name = name;
      if (type) {
        if (typeof type !== "number") {
          if (type.toLowerCase() === "edge") {
            type = 3;
          } else if (type.toLowerCase() === "document") {
            type = 2;
          }
        }
        options.type = type;
      }

      casper.thenOpen(urls.collections, {
        method: "post",
        dataType: "json",
        data: JSON.stringify(options)
      }).then(function() {
        toCleanUp.push(deleteCollection.bind(name));
      });
    };
    var cleanup = function() {
      casper.then(function() {
        var i;
        for (i = toCleanUp.length; i > 0; --i) {
          toCleanUp[i-1]();
        }
        toCleanUp = [];
      });
    };

    var unloadCollection = function(name) {
      casper.thenOpen(
        urls.collections + '/' + name + '/unload', {
          method: "put",
          dataType: "json"
        }
      );
    }

    this.unloadCollection = unloadCollection;

    this.createCollection = createCollection;
    this.deleteCollection = function(name) {
      return deleteCollection.apply(name);
    };
    this.cleanup = cleanup;
  };
  exports.Helper = Helper;
}());
