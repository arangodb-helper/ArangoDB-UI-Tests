/*global casper, exports */
exports.test = function(casper, phantomcss, baseUrl) {
  var installed = "#content #installedList div.tile:first-of-type";
  var available = "#content #availableList div.tile:first-of-type";

  casper.thenOpen(baseUrl + "#applications");

  casper.then(function startingPoint() {
    phantomcss.screenshot("#content", "applicationsContent");
    phantomcss.screenshot(installed, "activeApplicationTile");
    phantomcss.screenshot(available, "availableApplicationTile");
  });

  casper.then(function downloadDropdown() {
    casper.click("#importFoxxToggle");
    casper.waitUntilVisible('#foxxDropdownImport',
      function success() {
        phantomcss.screenshot("#content", 0, "input[type=file], div.contentDiv", "foxxDropdownImport");
      },
      function timeout() {
        casper.test.fail("Could not dropdown dialog to import app");
      }
    );
  });

  casper.then(function settingsDropdown() {
    casper.click("#foxxToggle");
    casper.waitUntilVisible('#foxxDropdownOut',
      function success() {
        phantomcss.screenshot("#content", 0, "input[type=file], div.contentDiv", "foxxDropdownImport");
      },
      function timeout() {
        casper.test.fail("Could not dropdown dialog to change settings");
      }
    );
  });

  casper.then(function modifyInstalled() {
    casper.click(installed + " span.icon_arangodb_settings2");
    casper.waitUntilVisible('#modal-dialog',
      function success() {
        phantomcss.screenshot("#modal-dialog", "modifyApplicationDialog");
      },
      function timeout() {
        casper.test.fail("Could not load dialog to modify an app");
      }
    );
  });

  casper.then(function fillADifferentMount(){
    casper.fillSelectors("#modal-dialog", {
      "input#change-mount-point": "/newPath"
    });
    phantomcss.screenshot("#modal-dialog", "modifiedApplicationDialog");
  });

  casper.then(function closeModifyDialog(){
    casper.click("div.modal-header button.close");
    casper.waitWhileVisible('#modal-dialog',
      undefined,
      function timeout() {
        casper.test.fail("Could not close dialog for app modification");
      }
    );
  });

  casper.then(function installed() {
    casper.click(available + " button.install");
    casper.waitUntilVisible('#modal-dialog',
      function success() {
        phantomcss.screenshot("#modal-dialog", "installApplicationDialog");
      },
      function timeout() {
        casper.test.fail("Could not load dialog to install an app");
      }
    );
  });

  casper.then(function closeInstallDialog(){
    casper.click("div.modal-header button.close");
    casper.waitWhileVisible('#install-foxx',
      undefined,
      function timeout() {
        casper.test.fail("Could not close dialog for app installation");
      }
    );
  });

  casper.then(function apiOverview(){
    casper.click(installed + " span.icon_arangodb_info");
    casper.waitUntilVisible('#swagger-ui-container',
      function() {
        casper.click("#resource_aardvark h2 a");
        phantomcss.screenshot("#content", "aardvark-api-documentation");
      },
      function timeout() {
        casper.test.fail("Could not display the aardvark api");
      }
    );
  });
};
