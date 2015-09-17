'use strict';

angular.module('nobsjs')
  .controller('PagesAdminController', PagesAdminController);

PagesAdminController.$inject = ['$mdDialog', '$state', '$stateParams', '$window', 'pagesService'];

/**
 * Manages the view of an individual Page Admin. This is an admin view that enables create/edit/delete operations on a Page
 *
 * @param {CustomProvider} Provider that can add pages to the $state
 * @param {AngularService} $state UI-router service
 * @param {AngularService} $stateParams UI-router service used to access state parameters
 * @param {CustomService} Service than manages custom pages
 * @param {AngularService} $window Angular service that references the browser window
 */
function PagesAdminController ($mdDialog, $state, $stateParams, $window, pagesService) {
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
   * Opens a confirm modal and calls deletePageFromDatabase on confirmation.
   */

  function deletePage (ev, user) {
    openConfirmDialog()
      .then(deletePageFromDatabase)
      .then(redirectToPages)
      .catch(showError);

    //////////

    function redirectToPages () {
      $state.go('pagesList');
    }

    function showError (error) {
      // TODO: show an error message
    }
  }

  /**
   * Requests the page Service to perform a delete page action
   */
  function deletePageFromDatabase () {
    return pagesService.deletePage(vm.page.id);
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

  /**
   * Open a dialog to confirm a deletion
   */

  function openConfirmDialog () {
    var confirm = $mdDialog.confirm()
      .title('Are you sure you want to delete this page?')
      .content('This will delete the page and you will not be able to undo.')
      .ariaLabel('Are you sure you want to delete Page')
      .ok('Delete')
      .cancel('Cancel');

    return $mdDialog.show(confirm);
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
