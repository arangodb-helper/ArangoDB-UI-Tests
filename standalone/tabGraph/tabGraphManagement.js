/*global casper, exports */
exports.test = function(casper, phantomcss, baseUrl, helper) {

  helper.createCollection("vertices", "document");
  helper.createCollection("edges", "edge");

  casper.thenOpen(baseUrl + "#graph");

  casper.then(function loadManageGraphs() {
    casper.click("#manageGraphs");
    casper.waitUntilVisible("#arangoCollectionsContainer",
      function success() {
        phantomcss.screenshot("#content", "graphManagement");
      },
      function timeout() {
        casper.test.fail("Could not open graph management.");
      }
    );
  });

  casper.then(function menuAdd() {
    casper.click("#createGraph");
    casper.waitUntilVisible("#add-graph",
      function success() {
        phantomcss.screenshot("#add-graph", "newGraph");
      },
      function timeout() {
        casper.test.fail("Could not open add graph menu.");
      }
    );
  });

  casper.then(function newGraph() {
    casper.fillSelectors("#add-graph", {
      "input#newGraphName": "myGraph",
      "input#newGraphVertices": "vertices",
      "input#newGraphEdges": "edges"
    });
    phantomcss.screenshot("#add-graph", "newGraphFilled");
  });

  casper.then(function createGraph() {
    casper.click("#createNewGraph");
    casper.waitWhileVisible(".modal-backdrop",
      function success() {
        phantomcss.screenshot("#graphManagementThumbnailsIn", "filledGraphList");
      },
      function timeout() {
        casper.test.fail("Could not create a new graph.");
      }
    );
  });

  casper.then(function showInfo() {
    casper.click("#myGraph_info");
    casper.waitUntilVisible("#infoGraphModal",
      function success() {
        phantomcss.screenshot("#infoGraphModal", "graphInfo");
      },
      function timeout() {
        casper.test.fail("Could not show graph info.");
      }
    );
  });

  casper.then(function closeInfo() {
    casper.click("#infoGraphModal button.button-close");
    casper.waitWhileVisible(".modal-backdrop", undefined,
      function timeout() {
        casper.test.fail("Could not hide graph info.");
      }
    );
  });

  casper.then(function showInfo() {
    casper.click("#myGraph_settings");
    casper.waitUntilVisible("#editGraphModal",
      function success() {
        phantomcss.screenshot("#editGraphModal", "graphSettings");
      },
      function timeout() {
        casper.test.fail("Could not show graph settings.");
      }
    );
  });

  casper.then(function deleteGraph() {
    casper.click("#deleteGraph");
    casper.waitUntilVisible("#delete-graph", 
      function success() {
        phantomcss.screenshot("#delete-graph", "graphDeleteConfirmation");
      },
      function timeout() {
        casper.test.fail("Could not show confirm dialog to delete graph.");
      }
    );
  });

  casper.then(function confirmDeletion() {
    casper.click("#confirmDelete");
    casper.waitWhileVisible(".modal-backdrop", 
      function success() {
        phantomcss.screenshot("#graphManagementThumbnailsIn", "emptyGraphList");
      },
      function timeout() {
        casper.test.fail("Could not hide confirm dialog to delete graph.");
      }
    );
  });

  helper.cleanup();
};

