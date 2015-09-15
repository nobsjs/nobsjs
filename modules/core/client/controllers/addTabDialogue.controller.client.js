'use strict';

angular.module('nobsjs')
  .controller('AddTabDialogueController', AddTabDialogueController);

AddTabDialogueController.$inject =  ['$mdDialog', 'tabsService'];

/**
 * Manages the view of the Tabs Admin view which displays a list of pages and an interface to perform operations on them
 */
function AddTabDialogueController ($mdDialog, tabsService) {
  var vm = this;
  vm.cancel = cancel;
  vm.hide = hide;
  vm.saveAction = saveAction;
  vm.tab = {};
  vm.title = 'Create Tab';


  //////////

  function cancel () {
    $mdDialog.cancel();
  }

  function displayError() {
    //TODO
  }

  function hide () {
    $mdDialog.hide();
  }

  function saveAction () {
    // TODO tabsService
    tabsService.createTab(vm.tab)
      .then(showSuccess)
      .catch(displayError);
  }

  function showSuccess () {
    $mdDialog.hide();
  }

}
