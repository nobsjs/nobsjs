'use strict';

angular.module('nobsjs')
  .controller('PagesAdminListController', PagesAdminListController);

PagesAdminListController.$inject =  ['$state', 'pagesService'];

/**
 * Manages the view of the Page List Admin view which displays a list of pages and an interface to perform operations on them
 * @param {AngularService} $stateParams UI-router service used to access state parameters
 * @param {CustomService} Service than manages custom pages
 */
function PagesAdminListController ($state, pagesService) {
  var vm = this;

  vm.gotoCreatePage = gotoCreatePage;
  vm.gotoPage = gotoPage;
  vm.gotoEditPage = gotoEditPage;

  activate();

  //////////

  /**
   * Queries the database to get all Pages
   */
  function activate() {
    // NOTE: it retrieves the entire content
    // TODO: ideally we should decide to show a snippet of the content or not show the content at all
    pagesService.getAllPages()
      .then(setAllPages);
  }

  /**
   * Transitions state to page create view
   */
  function gotoCreatePage() {
    $state.go('pagesCreate');
  }

  /**
   * Transitions state to page EDIT view with that page Id
   */
  function gotoEditPage(pageId) {
    $state.go('pagesEdit', {pageId: pageId});
  }

  /**
   * Transitions state to page view with that page Id
   */
  function gotoPage(slug) {
    slug = slug.slice(1);
    $state.go(slug);
  }

  function setAllPages (res) {
    vm.allPages = res;
  }
}
