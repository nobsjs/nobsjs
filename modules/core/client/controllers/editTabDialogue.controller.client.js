'use strict';

angular.module('tropicalbs')
  .controller('EditTabDialogueController', EditTabDialogueController);

EditTabDialogueController.$inject =  ['$mdDialog', 'tabsService', 'tab'];

/**
 * Manages the view of the Tabs Admin view which displays a list of pages and an interface to perform operations on them
 */
function EditTabDialogueController ($mdDialog, tabsService, tab) {
  var vm = this;
  vm.answer = answer;
  vm.cancel = cancel;
  vm.hide = hide;
  vm.saveTab = saveTab;
  vm.tab = {};
  vm.title = '';

  activate();

  //////////

  function activate () {
    _.assign(vm.tab, tab);
    vm.title = 'Edit Tab';
  }

  function answer (answ) {
    $mdDialog.hide(answ);
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

  function saveTab () {
    tabsService.updateTab(vm.tab, tab.id)
      .then(showSuccess)
      .catch(displayError);
  }

  function showSuccess () {
    $mdDialog.hide();
  }
}
