/*global casper, exports */
exports.test = function (casper, phantomcss, baseUrl, helper) {

  var myCollectionName = 'myCollection';


  helper.createCollection(myCollectionName, 'document');

  casper.thenOpen(baseUrl + "#collections");

  //*** helper ***
  var screenshot = function(id) {
    casper.then(
      function() {
        phantomcss.screenshot("#"+id, 'tab-collections-collection');
      }
    );
  };

  //*** /helper ***

  //initial view
  screenshot('content');

  //open collection view
  casper.then(
    function() {
      this.click('#collection_' + myCollectionName);
    }
  );

  //collection view
  screenshot('content');

  //add document
  casper.then(
    function() {
      this.click('#addDocumentButton');
      this.waitUntilVisible(
        '#documentEditor',
        function success() {
        },
        function timeout() {
          casper.test.fail('open documentEditor failed');
        }
      );
    }
  );

  //document view
  screenshot('content');

  //some input
  casper.then(
    function() {
      this.click('table.tree tr:nth-child(2) td:nth-child(2) button');
      this.waitUntilVisible(
        '.jsoneditor-contextmenu',
        function () {},
        function timeout() {
          casper.test.fail('open jsoneditor-contextmenu failed');
        }
      );
    }
  );

  //context menu
  screenshot('content');

  //show context of context
  casper.then(
    function() {
      this.click('.jsoneditor-contextmenu button.expand');
      this.waitUntilVisible(
        '.jsoneditor-contextmenu ul.menu',
        function() {},
        function timeout() {
          casper.test.fail('open contextmenu of jsoneditor-contextmenu failed');
        }
      );
    }
  );

  //contextmenu of contextmenu
  screenshot('content');

  //append data
  casper.then(
    function() {
      this.click('.jsoneditor-contextmenu button.insert');
      this.waitWhileVisible(
        '.jsoneditor-contextmenu',
        function() {},
        function timeout() {
          casper.test.fail('close jsoneditor-contextmenu failed');
        }
      );
    }
  );

  //append data
  screenshot('content');

  //fill field and value
  casper.then(
    function() {
      casper.sendKeys('div.field.empty', 'lastName');
      casper.sendKeys('div.value.empty', 'Nase');
    }
  );

  //filled
  screenshot('content');

  //show contextmenu
  casper.then(
    function() {
      this.click('table.tree tr:nth-child(2) td:nth-child(2) button');
      this.waitUntilVisible(
        '.jsoneditor-contextmenu',
        function () {},
        function timeout() {
          casper.test.fail('open jsoneditor-contextmenu failed');
        }
      );
    }
  );

  //filled
  screenshot('content');

  //insert data
  casper.then(
    function() {
      this.click('button.insert.default');
      this.waitWhileVisible(
        '.jsoneditor-contextmenu',
        function () {},
        function timeout() {
          casper.test.fail('close jsoneditor-contextmenu failed');
        }
      );
    }
  );

  //inserted empty
  screenshot('content');

  //fill inserted
  //fill field and value
  casper.then(
    function() {
      this.sendKeys('div.field.empty', 'firstName');
      this.sendKeys('div.value.empty', 'Papp');
    }
  );

  //inserted filled
  screenshot('content');

  //save
  casper.then(
    function() {
      this.click('#saveDocumentButton');
    }
  );

  //saved
  screenshot('content');

  //collapse all
  casper.then(
    function() {
      this.click('.collapse-all');
      this.waitUntilVisible(
        'button.collapsed',
        function () {},
        function timeout() {
          casper.test.fail('collapse failed');
        }
      );
    }
  );

  //collapsed
  screenshot('content');

  //expand
  casper.then(
    function() {
      this.click('.expand-all');
      this.waitUntilVisible(
        'button.expanded',
        function () {},
        function timeout() {
          casper.test.fail('expand failed');
        }
      );
    }
  );

  //expanded
  screenshot('content');

  //undo
  casper.then(
    function() {
      this.click('button.undo');
      this.click('button.undo');
    }
  );

  //undone
  screenshot('content');

  //redo
  casper.then(
    function() {
      this.click('button.redo');
      this.click('button.redo');
    }
  );

  //redone
  screenshot('content');

  //search
  casper.then(
    function() {
      this.sendKeys('table tbody tr td input', 'am');
    }
  );

  //redone
  screenshot('content');

  //mode context
  casper.then(
    function() {
      this.click('button.modes');
      this.waitUntilVisible(
        '.jsoneditor-contextmenu',
        function() {},
        function timeout() {
          casper.test.fail('open modes failed');
        }
      );
    }
  );

  //redone
  screenshot('jsoneditor-contextmenu');

  //change to mode code
  casper.then(
    function() {
      this.clickLabel('Code', 'button');
    }
  );

  //code
  screenshot('content');

  //compact code
  casper.then(
    function() {
      this.click('button.compact');
    }
  );

  //code
  screenshot('content');

  //compact code
  casper.then(
    function() {
      this.click('button.format');
    }
  );

  //code
  screenshot('content');

  //back to document view
  casper.then(
    function() {
      this.clickLabel(myCollectionName, 'a');
      this.waitWhileVisible(
        '#saveDocumentButton',
        function() {},
        function timeout() {
          casper.test.fail('back to document view failed');
        }
      );
    }
  );

  //document view
  screenshot('content');

  //delete document
  casper.then(
    function() {
      this.click('a#deleteDoc');
      this.waitUntilVisible(
        '#docDeleteModal',
        function() {},
        function timeout() {
          casper.test.fail('show docDeleteModal failed');
        }
      );
    }
  );

  //confirm dialog
  screenshot('content');

  //delete confirm
  casper.then(
    function() {
      this.click('#confirmDeleteBtn');
      this.waitWhileVisible(
        '.modal-backdrop',
        function() {},
        function timeout() {
          casper.test.fail('close docDeleteModal failed');
        }
      );
    }
  );

  //final
  screenshot('content');

};
