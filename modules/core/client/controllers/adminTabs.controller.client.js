'use strict';

angular.module('tropicalbs')
  .controller('AdminTabsController', AdminTabsController);

AdminTabsController.$inject =  ['$mdDialog', 'tabsService'];

/**
 * Manages the view of the Tabs Admin view which displays a list of pages and an interface to perform operations on them
 */
function AdminTabsController ($mdDialog, tabsService) {
  var vm = this;
  vm.tabs = [];
  vm.readonly = true;
  vm.createTabDialogue = createTabDialogue;
  vm.deleteTabDialogue = deleteTabDialogue;
  vm.editTabDialogue = editTabDialogue;

  activate();

  //////////

  /**
   * Queries the database to get all Tabs
   */
  function activate () {
    //do stuff
    tabsService.getAllTabs()
      .then(setAllTabs);
  }

  function createTabDialogue (ev, tab) {
    $mdDialog.show({
      controller: 'AddTabDialogueController',
      controllerAs: 'vm',
      templateUrl: '../../../../modules/core/client/views/modals/adminTabsDialogue.view.client.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    })
    .then(handleSuccess)
    .catch(handleCancel);
  }

  function deleteTabDialogue (ev, tab) {
    $mdDialog.show({
      controller: 'DeleteTabDialogueController',
      controllerAs: 'vm',
      templateUrl: '../../../../modules/core/client/views/modals/removeTabsDialogue.view.client.html',
      parent: angular.element(document.body),
      locals: {
             tab: tab,
           },
      targetEvent: ev,
      clickOutsideToClose: true
    })
    .then(handleSuccess)
    .catch(handleCancel);
  }

  function editTabDialogue (ev, tab) {
    $mdDialog.show({
      controller: 'EditTabDialogueController',
      controllerAs: 'vm',
      templateUrl: '../../../../modules/core/client/views/modals/adminTabsDialogue.view.client.html',
      parent: angular.element(document.body),
      locals: {
             tab: tab,
           },
      targetEvent: ev,
      clickOutsideToClose: true
    })
    .then(handleSuccess)
    .catch(handleCancel);
  }

  function handleCancel () {
    //TODO - Cancel button handler
  }

  function handleSuccess () {
    //TODO - save button handler
  }

  function setAllTabs (res) {
    vm.tabs = res;
  }
}
