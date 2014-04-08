/*global casper, exports */
exports.test = function (casper, phantomcss, baseUrl, helper) {

  //definitions
  var newUsername1  = 'myDBUser',
    newUsername2    = 'myOtherDBUser',
    newName         = 'Papp Nase',
    newName2        = 'Mr Papp Nase',
    newPassword     = 'blub',
    component       = '[tabToolsUserManagement] => ';



  casper.thenOpen(baseUrl + "#userManagement");


  //*** helper ***
  var screenshot = function(id) {
    casper.then(
      function() {
        phantomcss.screenshot("#"+id, 'tab-tools-user-management');
      }
    );
  };

  //*** /helper ***

  //initial view
  screenshot('content');

  //add active user with password
  casper.then(
    function() {
      this.click('#createUser');
      this.waitUntilVisible(
        '#modal-dialog',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal open failed (01)');
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
          '#newUsername': newUsername1,
          '#newName': newName,
          '#newPassword': newPassword
        }
      );
    }
  );

  screenshot('modal-dialog');

  //submit
  casper.then(
    function () {
      casper.clickLabel('Create');
      this.waitWhileVisible(
        '.modal-backdrop',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal close failed (submit create user)');
        }
      );
    }
  );

  screenshot('content');

  //create same user
  casper.then(
    function() {
      this.click('#createUser');
      this.waitUntilVisible(
        '#modal-dialog',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal open failed (02)');
        }
      );
    }
  );
  casper.then(
    function () {
      casper.fillSelectors(
        '#modal-dialog', {
          '#newUsername': newUsername1,
          '#newName': newName,
          '#newPassword': newPassword
        }
      );
    }
  );

  screenshot('modal-dialog');

  //create user (nothing happens atm)
  casper.then(
    function () {
      casper.clickLabel('Create');
    }
  );

  screenshot('modal-dialog');

  //close modal
  casper.then(
    function() {
      this.click(".button-close");
      this.waitWhileVisible(
        '.modal-backdrop',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal close failed (close create same user');
        }
      );
    }
  );

  screenshot('content');

  //add inactive user without password and name
  casper.then(
    function() {
      this.click('#createUser');
      this.waitUntilVisible(
        '#modal-dialog',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal open failed (03)');
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
          '#newUsername': newUsername2
        }
      );
      casper.click('#newStatus');
    }
  );

  screenshot('modal-dialog');

  //submit
  casper.then(
    function () {
      casper.clickLabel('Create', 'button');
      this.waitWhileVisible(
        '.modal-backdrop',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal close failed (fill create dialog)');
        }
      );
    }
  );

  screenshot('content');

  //edit user 1
  casper.then(
    function() {
      this.click('#' + newUsername1 + '_edit-user');
      this.waitUntilVisible(
        '#modal-dialog',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal open failed (04)');
        }
      );
    }
  );

  screenshot('modal-dialog');

  casper.then(
    function () {
      casper.fillSelectors(
        '#modal-dialog', {
          '#editName': newName2
        }
      );
      casper.click('#editStatus');
    }
  );

  screenshot('modal-dialog');

  //submit
  casper.then(
    function () {
      casper.clickLabel('Save', 'button');
      this.waitWhileVisible(
        '.modal-backdrop',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal close failed (submit edit user)');
        }
      );
    }
  );

  screenshot('content');

  //delete user 2
  casper.then(
    function() {
      this.click('#' + newUsername2 + '_edit-user');
      this.waitUntilVisible(
        '#modal-dialog',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal open failed (delete user pt1)');
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
          casper.test.fail(component + 'modal open failed (05)');
        }
      );
    }
  );

  screenshot('modal-dialog');

  //delete finally
  casper.then(
    function() {
      this.click('#modal-confirm-delete');
      this.waitWhileVisible(
        '.modal-backdrop',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal close failed (finally delete user)');
        }
      );
    }
  );

  screenshot('content');


};
