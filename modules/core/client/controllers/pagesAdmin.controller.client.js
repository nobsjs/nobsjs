'use strict';

angular.module('tropicalbs')
  .controller('PagesAdminController', PagesAdminController);

PagesAdminController.$inject = ['$pageStateManager', '$state', '$stateParams', '$window', 'pagesService'];

/**
 * Manages the view of an individual Page Admin. This is an admin view that enables create/edit/delete operations on a Page
 *
 * @param {CustomProvider} Provider that can add pages to the $state
 * @param {AngularService} $state UI-router service
 * @param {AngularService} $stateParams UI-router service used to access state parameters
 * @param {CustomService} Service than manages custom pages
 * @param {AngularService} $window Angular service that references the browser window
 */
function PagesAdminController ($pageStateManager, $state, $stateParams, $window, pagesService) {
  var vm = this;

  vm.createPage = createPage;
  vm.deletePage = deletePage;
  vm.mode = '';
  vm.page = {};
  vm.viewTitle = '';
  vm.updatePage = updatePage;

  activate();

  ///////////

  // TODO: add validation in the view (check if it has a slash and other acceptability requirements)

  /**
   * Checks if state represent edit mode or creation mode, then retrieves the page and loads data into the view model
   */
  function activate () {
    var state = checkState();
    if (state === 'edit') {
      getPage();
    }
  }

  /**
   * Checks if state represent edit mode or creation mode by accessing the name of the current $state
   */
  function checkState () {
    if($state.current.name === 'pagesCreate') {
      // we are in create mode
      vm.mode = 'create';
      vm.viewTitle = 'Create a Page';
      return 'create';
    } else if ($state.current.name === 'pagesEdit') {
      // we are in edit mode
      vm.mode = 'edit';
      vm.viewTitle = 'Update a Page';
      return 'edit';
    }
  }

  /**
   * Requests the page Service to perform a page creation action then requests the $pageStateManager provider to add a new state
   */
  function createPage () {
    pagesService.createPage(vm.page)
      .then(addState);
  }

  function addState (res) {
    // TODO: add success/error message
    $pageStateManager.addState(res);
    $state.go('pages.' + res.id);
  }

  /**
   * Requests the page Service to perform a delete page action, then reloads the app and transition to the pages List
   */
  function deletePage () {
    pagesService.deletePage(vm.page.id)
      .then(reloadRedirect);
  }

  /**
   * Requests the page Service to retrieve the content of a page
   */
  function getPage () {
    // Make sure pageId exists
    if($stateParams.pageId) {
      vm.page.id = $stateParams.pageId;
      // get page info and update vm.page if successful
      pagesService.getPageById(vm.page.id)
        .then(setPageContent);
    } else {
      // TODO: show the user an error message or create a redirect handler.
    }
  }

  function reload () {
    // TODO: update state so that you don't need to refresh the page
    // TODO: add success/error message
    // $state.go('pages.' + resp.id);

    // reloads the app
    $window.location.reload();
  }

  function reloadRedirect () {
    // TODO: update state so that you don't need to refresh the page
    // TODO: add success/error message
    // $state.go('pages.' + resp.id);

    // reloads the app
    // TODO: find a way to handle this more gracefully
    $window.location.reload();
    $state.go('pagesList');
  }

  function setPageContent (res) {
    vm.page.title = res.title;
    vm.page.slug = res.slug;
    vm.page.content = res.content;
  }

  /**
   * Requests the page Service to update the content of a specific page then reloads the app
   */
  function updatePage () {
    pagesService.updatePage(vm.page, vm.page.id)
      .then(reload);
  }
}
