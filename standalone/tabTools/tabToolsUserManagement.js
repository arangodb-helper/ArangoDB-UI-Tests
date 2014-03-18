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
        '#createUserModal',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal open failed');
        }
      );
    }
  );

  screenshot('createUserModal');

  //fill create dialog
  casper.then(
    function () {
      casper.fillSelectors(
        '#createUserModal', {
          '#newUsername': newUsername1,
          '#newName': newName,
          '#newPassword': newPassword
        }
      );
    }
  );

  screenshot('createUserModal');

  //submit
  casper.then(
    function () {
      casper.click('#submitCreateUser');
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
        '#createUserModal',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal open failed');
        }
      );
    }
  );
  casper.then(
    function () {
      casper.fillSelectors(
        '#createUserModal', {
          '#newUsername': newUsername1,
          '#newName': newName,
          '#newPassword': newPassword
        }
      );
    }
  );

  screenshot('createUserModal');

  //create user (nothing happens atm)
  casper.then(
    function () {
      casper.click('#submitCreateUser');
    }
  );

  screenshot('createUserModal');

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
        '#createUserModal',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal open failed');
        }
      );
    }
  );

  screenshot('createUserModal');

  //fill create dialog
  casper.then(
    function () {
      casper.fillSelectors(
        '#createUserModal', {
          '#newUsername': newUsername2
        }
      );
      casper.click('#newStatus');
    }
  );

  screenshot('createUserModal');

  //submit
  casper.then(
    function () {
      casper.click('#submitCreateUser');
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
        '#editUserModal',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal open failed');
        }
      );
    }
  );

  screenshot('editUserModal');

  casper.then(
    function () {
      casper.fillSelectors(
        '#editUserModal', {
          '#editName': newName2
        }
      );
      casper.click('#editStatus');
    }
  );

  screenshot('editUserModal');

  //submit
  casper.then(
    function () {
      casper.click('#submitEditUser');
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
        '#editUserModal',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal open failed (delete user pt1)');
        }
      );
    }
  );

  screenshot('editUserModal');

  //click delete
  casper.then(
    function() {
      this.click('#deleteUser');
      this.waitUntilVisible(
        '#deleteUserModal',
        function success() {
        },
        function timeout() {
          casper.test.fail(component + 'modal open failed');
        }
      );
    }
  );

  screenshot('deleteUserModal');

  //delete finally
  casper.then(
    function() {
      this.click('#submitDeleteUser');
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
