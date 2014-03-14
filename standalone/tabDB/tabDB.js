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
        '#createDatabaseModal',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal open failed');
        }
      );
    }
  );

  screenshot('createDatabaseModal');

  //fill create dialog
  casper.then(
    function () {
      casper.fillSelectors(
        '#createDatabaseModal', {
          '#newDatabaseName': newDB1,
          '#newUser': user,
          '#newPassword': password
        }
      );
    }
  );

  screenshot('createDatabaseModal');

  //create database
  casper.then(
    function () {
      casper.click('#submitCreateDatabase');
      this.waitWhileVisible(
        '.modal-backdrop',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal close failed');
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
        '#createDatabaseModal',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal open failed');
        }
      );
    }
  );
  casper.then(
    function () {
      casper.fillSelectors(
        '#createDatabaseModal', {
          '#newDatabaseName': newDB1,
          '#newUser': user,
          '#newPassword': password
        }
      );
    }
  );

  screenshot('createDatabaseModal');

  //create database (throws notification)
  casper.then(
    function () {
      casper.click('#submitCreateDatabase');
    }
  );

  screenshot('createDatabaseModal');

  //close modal
  casper.then(
    function() {
      this.click(".button-close");
      this.waitWhileVisible(
        '.modal-backdrop',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal close failed');
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
        '#editDatabaseModal',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal open failed #_system_edit-database');
        }
      );
    }
  );

  screenshot('editDatabaseModal');

  //close modal
  casper.then(
    function() {
      this.click('#editDatabaseModal .button-close');
      this.waitWhileVisible(
        '.modal-backdrop',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal close failed');
        }
      );
    }
  );

  //delete created database
  casper.then(
    function() {
      this.click('#' + newDB1 + '_edit-database');
      this.waitUntilVisible(
        '#editDatabaseModal',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal open failed');
        }
      );
    }
  );

  screenshot('editDatabaseModal');

  //click delete
  casper.then(
    function() {
      this.click('#deleteDatabase');
      this.waitUntilVisible(
        '#deleteDatabaseModal',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal open failed');
        }
      );
    }
  );

  screenshot('deleteDatabaseModal');

  //delete it finally
  casper.then(
    function() {
      this.click('#submitDeleteDatabase');
      this.waitWhileVisible(
        '.modal-backdrop',
        function success() {
        },
        function timeout() {
          casper.test.fail('modal close failed');
        }
      );
    }
  );

  screenshot('content');


};
