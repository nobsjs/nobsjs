'use strict';

angular.module('nobsjs')
  .controller('DeleteTabDialogueController', DeleteTabDialogueController);

DeleteTabDialogueController.$inject =  ['$mdDialog', 'tab', 'tabsService'];

/**
 * Manages the view of the Tabs Admin view which displays a list of pages and an interface to perform operations on them
 */
function DeleteTabDialogueController ($mdDialog, tab, tabsService) {
  var vm = this;
  vm.cancel = cancel;
  vm.hide = hide;
  vm.saveAction = saveAction;
  vm.tab = {};
  vm.title = '';

  activate();

  //////////

  function activate () {
    _.assign(vm.tab, tab);
    vm.title = 'Delete Tab';
  }

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
    tabsService.deleteTab(tab.id)
      .then(showSuccess)
      .catch(displayError);
  }

  function showSuccess () {
    $mdDialog.hide();
  }
}
