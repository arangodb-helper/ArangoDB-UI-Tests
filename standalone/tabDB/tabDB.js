/*global casper, exports */
exports.test = function (casper, phantomcss, baseUrl, helper) {

  //definitions
  var newDB1 = 'myDatabase01';
  var user = 'root';
  var password = 'blub';



  casper.thenOpen(baseUrl + "#databases");


  //*** helper ***
  var screenshot = function(id) {
    casper.then(
      function() {
        phantomcss.screenshot("#"+id, 'tab-db');
      }
    );
  };

  //*** /helper ***

  //initial view
  screenshot('content');

  //add database
  casper.then(
    function() {
      this.click('#createDatabase');
      this.waitUntilVisible(
        '#modal-dialog',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal open failed (tabDB01)');
        }
      );
    }
  );

  screenshot('modal-dialog');

  //fill create dialog
  casper.then(
    function () {
      casper.fillSelectors(
        '#modal-dialog', {
          '#newDatabaseName': newDB1,
          '#newUser': user,
          '#newPassword': password
        }
      );
    }
  );

  screenshot('modal-dialog');

  //create database
  casper.then(
    function () {
      casper.clickLabel('Create', 'button');
      this.waitWhileVisible(
        '.modal-backdrop',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal close failed (create database)');
        }
      );
    }
  );

  screenshot('content');

  //create same database
  casper.then(
    function() {
      this.click('#createDatabase');
      this.waitUntilVisible(
        '#modal-dialog',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal open failed (tabDB02)');
        }
      );
    }
  );
  casper.then(
    function () {
      casper.fillSelectors(
        '#modal-dialog', {
          '#newDatabaseName': newDB1,
          '#newUser': user,
          '#newPassword': password
        }
      );
    }
  );

  screenshot('modal-dialog');

  //create database (throws notification)
  casper.then(
    function () {
      casper.clickLabel('Create', 'button');
    }
  );

  screenshot('modal-dialog');

  //close modal
  casper.then(
    function() {
      this.click("#modalButton0");
      this.waitWhileVisible(
        '.modal-backdrop',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal close failed (create same database)');
        }
      );
    }
  );

  screenshot('content');

  //try delete _system database
  casper.then(
    function() {
      this.click("#_system_edit-database");
      this.waitUntilVisible(
        '#modal-dialog',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal open failed #_system_edit-database');
        }
      );
    }
  );

  screenshot('modal-dialog');

  //close modal
  casper.then(
    function() {
      this.click('#modal-dialog .button-close');
      this.waitWhileVisible(
        '.modal-backdrop',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal close failed (delete _system database)');
        }
      );
    }
  );

  //delete created database
  casper.then(
    function() {
      this.click('#' + newDB1 + '_edit-database');
      this.waitUntilVisible(
        '#modal-dialog',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal open failed (tabDB03)');
        }
      );
    }
  );

  screenshot('modal-dialog');

  //click delete
  casper.then(
    function() {
      this.clickLabel('Delete', 'button');
      this.waitUntilVisible(
        '#modal-delete-confirmation',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal open failed (tabDB04)');
        }
      );
    }
  );

  screenshot('modal-dialog');

  //delete it finally
  casper.then(
    function() {
      this.click('#modal-confirm-delete');
      this.waitWhileVisible(
        '.modal-backdrop',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal close failed (delete database');
        }
      );
    }
  );

  screenshot('content');


};
