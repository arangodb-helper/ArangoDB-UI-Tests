/*global casper, exports */
exports.test = function(casper, phantomcss, baseUrl, helper) {

  helper.createCollection("vertices", "document");
  helper.createCollection("edges", "edge");
  helper.createGraph("graph", "vertices", "edges");

  casper.thenOpen(baseUrl + "#graph");

  casper.then(function init() {
    phantomcss.screenshot("#content", "graphContent");
  });

  casper.then(function showAdvanced() {
    casper.click("#advancedGraphOptions a.accordion-toggle");
    casper.waitUntilVisible('#advancedOptions',
      function success() {
        phantomcss.screenshot("#content", "graphAdvancedContent");
      },
      function timeout() {
        casper.test.fail("Could not dropdown the advanced graph options.");
      }
    );
  });

  casper.then(function selectGraph() {
    casper.click("#useGraphs");
    casper.waitUntilVisible("#graph_config",
      function success() {
        phantomcss.screenshot("#datasoure", "graphSelectGraph");
      },
      function timeout() {
        casper.test.fail("Could not select to use a graph as input.");
      }
    );
  });

  casper.then(function addNewLabel() {
    casper.click("#add_label");
    casper.waitUntilVisible("#label_2",
      function success() {
        phantomcss.screenshot("#label_list", "graphListOfLabels");
      },
      function timeout() {
        casper.test.fail("Could not add a new label to the list.");
      }
    );
  });

  casper.then(function switchColouring() {
    casper.click("#differentcolour");
    casper.waitUntilVisible("#colour_list",
      function success() {
        phantomcss.screenshot("#colour_list", "graphListForColours");
      },
      function timeout() {
        casper.test.fail("Could not switch to use different colour list.");
      }
    );
  });

  casper.then(function addNewColour() {
    casper.click("#add_colour");
    casper.waitUntilVisible("#colour_2",
      function success() {
        phantomcss.screenshot("#colour_list", "graphListForColoursEnlarged");
      },
      function timeout() {
        casper.test.fail("Could not add a new colour to the list.");
      }
    );
  });

  casper.then(function addNewGroupAttr() {
    casper.click("#add_group_by");
    casper.waitUntilVisible("#group_by_2",
      function success() {
        phantomcss.screenshot("#label_list", "graphListOfLabels");
      },
      function timeout() {
        casper.test.fail("Could not add a new label to the list.");
      }
    );
  });

  casper.then(function loadViewer() {
    casper.click("#createViewer");
    casper.waitUntilVisible("#graphViewerSVG",
      function success() {
        phantomcss.screenshot("#content", 0, "#svg.graphViewerSVG", "graphViewerBasic");
      },
      function timeout() {
        casper.test.fail("Could not load the graph viewer.");
      }
    );
  });
  
  casper.then(function dropdownSettings() {
    casper.click("#configuredropdown");
    casper.waitUntilVisible("#configureDropdown",
      function success() {
        phantomcss.screenshot("#content", 0, "#svg.graphViewerSVG", "graphViewerConfigureDropdown");
      },
      function timeout() {
        casper.test.fail("Could not load the configure dropdown.");
      }
    );
  });

  casper.then(function dropdownFilter() {
    casper.click("#filterdropdown");
    casper.waitUntilVisible("#filterDropdown",
      function success() {
        phantomcss.screenshot("#menubar", "graphViewerFilterDropdown");
      },
      function timeout() {
        casper.test.fail("Could not load the filter dropdown.");
      }
    );
  });

  helper.cleanup();
};
