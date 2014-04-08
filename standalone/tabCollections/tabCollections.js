/*global casper, exports */
exports.test = function (casper, phantomcss, baseUrl) {
  casper.thenOpen(baseUrl + "#collections");

  var documentCollectionName = 'myDocumentCollection';
  var editedDocumentCollectionName = 'myDocumentCollectionEdited';
  var edgeCollectionName = 'myEdgeCollection';
  var imgIndex = -1;

//initial collections view
  casper.then(function () {
    phantomcss.screenshot("#content", 'tab-collection-' + (++imgIndex) + '--empty-collections');
  });

//add document collection
  casper.then(
    function () {
      casper.click('#newCollection');
      casper.waitUntilVisible('#modal-dialog',
        function success() {
          phantomcss.screenshot('#modal-dialog', 'tab-collection-' + (++imgIndex) + '--add-collection-modal');
        },
        function timeout() {
          casper.test.fail('#modal-dialog modal failed');
        }
      );
    }
  );

//open advanced options
  casper.then(
    function () {
      casper.click('a.accordion-toggle');
      phantomcss.screenshot('#modal-dialog', 'tab-collection-' + (++imgIndex) + '--add-collection-modal-advanced-options');
    }
  )

//fill modal dialog
  casper.then(
    function () {
      casper.fillSelectors(
        '#modal-dialog', {
          '#new-collection-name': documentCollectionName,
          '#new-collection-size': '2'
        }
      );
      phantomcss.screenshot('#modal-dialog', 'tab-collection-' + (++imgIndex) + '--filled-add-collection-modal-document');
    }
  );

//save new collection
  casper.then(
    function () {
      casper.clickLabel('Save', 'button');
      casper.waitWhileVisible('#modal-dialog',
        function success() {
          phantomcss.screenshot('#content', 'tab-collection-' + (++imgIndex) + '--additional-document-collection');
        },
        function timeout() {
          casper.test.fail('#modal-dialog modal close failed (document)');
        }
      );
    }
  );

//add edge collection
  casper.then(
    function () {
      casper.click('#newCollection');
      casper.waitUntilVisible('#modal-dialog',
        function success() {
          casper.evaluate(function () {
            document.getElementById('new-collection-type').selectedIndex = "1";
          });

          casper.fillSelectors(
            '#modal-dialog', {
              '#new-collection-name': edgeCollectionName
            }
          );
          phantomcss.screenshot('#modal-dialog', 'tab-collection-' + (++imgIndex) + '--filled-add-collection-modal-edge');

        },
        function timeout() {
          casper.test.fail('#modal-dialog modal open failed (edge)');
        }
      );
    }
  );

//overview with 2 collections
  casper.then(
    function () {
      casper.clickLabel('Save', 'button');
      casper.waitWhileVisible('#modal-dialog',
        function success() {
          phantomcss.screenshot('#content', 'tab-collection-' + (++imgIndex) + '--additional-edge-collection');
        },
        function timeout() {
          casper.test.fail('#modal-dialog modal close failed (edge)');
        }
      );
    }
  );

//modify collection
  casper.then(
    function () {
      casper.click('#editCollection_' + documentCollectionName);
      casper.waitUntilVisible('#modal-dialog',
        function success() {
          phantomcss.screenshot(
            '#modal-dialog',
            0,
            '#change-collection-id',
            'tab-collection-' + (++imgIndex) + '--edit-document-collection');
        },
        function timeout() {
          casper.test.fail('#edit-collection modal open failed');
        }
      );

    }
  );

  casper.then(
    function () {
      casper.fillSelectors(
        '#modal-dialog', {
          '#change-collection-name': editedDocumentCollectionName
        }
      );
      casper.clickLabel('Save', 'button');
      casper.waitWhileVisible('#modal-dialog',
        function success() {
          phantomcss.screenshot('#content', 'tab-collection-' + (++imgIndex) + '--overview-edited-document-collection');
        },
        function timeout() {
          casper.test.fail('#edit-collection modal open failed');
        }
      );
    }
  );


//unload collection
  casper.then(
    function () {
      casper.click('#editCollection_' + editedDocumentCollectionName);
      casper.waitUntilVisible('#modal-dialog',
        function success() {
          casper.clickLabel('Unload', 'button');
          casper.waitWhileVisible('#modal-dialog',
            function success() {
              phantomcss.screenshot('#content', 'tab-collection-' + (++imgIndex) + '--overview-unloaded-document-collection');
            },
            function timeout() {
              casper.test.fail('modal failed');
            }
          );
        },
        function timeout() {
          casper.test.fail('#modal failed');
        }
      );

    }
  );

//load collection
  casper.then(
    function () {
      casper.click('#editCollection_' + editedDocumentCollectionName);
      casper.waitUntilVisible('#modal-dialog',
        function success() {
          casper.clickLabel('Load', 'button');
          casper.waitWhileVisible('#modal-dialog',
            function success() {
              phantomcss.screenshot('#content', 'tab-collection-' + (++imgIndex) + '--overview-loaded-document-collection');
            },
            function timeout() {
              casper.test.fail('modal failed');
            }
          );
        },
        function timeout() {
          casper.test.fail('#modal failed');
        }
      );

    }
  );

//show info
  casper.then(
    function () {
      casper.click('#info_' + editedDocumentCollectionName);
      casper.waitUntilVisible('#show-collection',
        function success() {
          phantomcss.screenshot(
            '#show-collection',
            0,
            '#show-collection-id',
            'tab-collection-' + (++imgIndex) + '--info-document-collection');
        },
        function timeout() {
          casper.test.fail('#modal failed');
        }
      );
    }
  );
//navigate in info to figures
  casper.then(
    function () {
      casper.click('a[href="#figures"]');
      phantomcss.screenshot('#show-collection', 'tab-collection-' + (++imgIndex) + '--info-figures-document-collection');
    }
  );
//navigate in info to index
  casper.then(
    function () {
      casper.click('a[href="#index"]');
      phantomcss.screenshot('#show-collection', 'tab-collection-' + (++imgIndex) + '--info-index-document-collection');
    }
  );
//close info modal
  casper.then(
    function() {
      casper.click('#closeBtnInfoView');
      casper.waitWhileVisible('#show-collection',
        function success() {
          phantomcss.screenshot(
            '#content',
            0,
            '#show-collection-id',
            'tab-collection-' + (++imgIndex) + '--info-document-collection');
        },
        function timeout() {
          casper.test.fail('#modal failed');
        }
      );
    }
  );

//delete document collection
  casper.then(
    function () {
      casper.click('#editCollection_' + editedDocumentCollectionName);
      casper.waitUntilVisible('#modal-dialog',
        function success() {
        },
        function timeout() {
          casper.test.fail('#modal failed');
        }
      );
    }
  );
  casper.then(
    function () {
      casper.clickLabel('Delete', 'button');
      casper.waitUntilVisible('#modal-delete-confirmation',
        function success() {
          phantomcss.screenshot(
            '#modal-dialog',
            0,
            '#change-collection-id',
            'tab-collection-' + (++imgIndex) + '--confirm-delete-dialog');
        },
        function timeout() {
          casper.test.fail('modal failed');
        }
      );
    }
  );
  casper.then(
    function () {
      casper.click('#modal-confirm-delete');
      casper.waitWhileVisible('#modal-dialog',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal failed');
        }
      );
    }
  );

//delete edge collection
  casper.then(
    function () {
      casper.click('#editCollection_' + edgeCollectionName);
      casper.waitUntilVisible('#modal-dialog',
        function success() {
        },
        function timeout() {
          casper.test.fail('#modal failed');
        }
      );
    }
  );
  casper.then(
    function () {
      casper.clickLabel('Delete', 'button');
      casper.waitUntilVisible('#modal-delete-confirmation',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal failed');
        }
      );
    }
  );
  casper.then(
    function () {
      casper.click('#modal-confirm-delete');
      casper.waitWhileVisible('#modal-dialog',
        function success() {
          phantomcss.screenshot('#modal-dialog', 'tab-collection-' + (++imgIndex) + '--all-collections-deleted');
        },
        function timeout() {
          casper.test.fail('modal failed');
        }
      );
    }
  );
};