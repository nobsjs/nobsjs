'use strict';

angular.module('tropicalbs')
  .controller('PagesAdminController', PagesAdminController);

PagesAdminController.$inject = ['$state', '$stateParams', '$window', 'pagesService'];

/**
 * Manages the view of an individual Page Admin. This is an admin view that enables create/edit/delete operations on a Page
 *
 * @param {CustomProvider} Provider that can add pages to the $state
 * @param {AngularService} $state UI-router service
 * @param {AngularService} $stateParams UI-router service used to access state parameters
 * @param {CustomService} Service than manages custom pages
 * @param {AngularService} $window Angular service that references the browser window
 */
function PagesAdminController ($state, $stateParams, $window, pagesService) {
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
   * Requests the page Service to perform a page creation action
   */
  function createPage () {
    pagesService.createPage(vm.page);
  }

  /**
   * Requests the page Service to perform a delete page action
   */
  function deletePage () {
    pagesService.deletePage(vm.page.id);
  }

  /**
   * Requests the page Service to retrieve the content of a page
   */
  function getPage () {
    // Make sure pageId exists
    if($stateParams.pageId) {
      vm.page.id = $stateParams.pageId;
      // get page info and update vm.page if successful
      pagesService.getPage(vm.page.id)
        .then(setPageContent);
    } else {
      // TODO: show the user an error message or create a redirect handler.
    }
  }

  function setPageContent (res) {
    vm.page.title = res.title;
    vm.page.slug = res.slug;
    vm.page.content = res.content;
  }

  /**
   * Requests the page Service to update the content of a specific page
   */
  function updatePage () {
    pagesService.updatePage(vm.page, vm.page.id);
  }
}
