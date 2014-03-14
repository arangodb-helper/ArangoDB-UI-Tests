/*globals exports*/

(function() {
  "use strict"; 
  var Helper = function(casper, bUrl) {
    var baseUrl = bUrl.split("/_admin")[0];
    var toCleanUp = [];
    var urls = {
      collections: baseUrl + "/_api/collection",
      graphs: baseUrl + "/_api/graph"
    };

    var deleteCollection = function() {
      var name = this;
      casper.thenOpen(urls.collections + "/" + name, {
        method: "delete"
      });
    };

    var deleteGraph = function() {
      var name = this;
      casper.thenOpen(urls.graphs + "/" + name, {
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

    var createGraph = function(name, vs, es) {
      if (!name) {
        throw "Please give a name";
      }
      if (!vs) {
        throw "Please give a vertex collection";
      }
      if (!es) {
        throw "Please give a edge collection";
      }
      var data = {
        _key: name,
        vertices: vs,
        edges: es
      };

      casper.thenOpen(urls.graphs, {
        method: "post",
        dataType: "json",
        data: JSON.stringify(data)
      }).then(function() {
        toCleanUp.push(deleteGraph.bind(name));
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
    };

    this.unloadCollection = unloadCollection;

    this.createGraph = createGraph;
    this.deleteGraph = function(name) {
      return deleteGraph.apply(name);
    };
    this.createCollection = createCollection;
    this.deleteCollection = function(name) {
      return deleteCollection.apply(name);
    };
    this.cleanup = cleanup;
  };
  exports.Helper = Helper;
}());
