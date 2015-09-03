'use strict';

angular.module('tropicalbs')
  .controller('PagesAdminListController', PagesAdminListController);

PagesAdminListController.$inject =  ['PagesService', '$state'];

function PagesAdminListController (PagesService, $state) {
  var vm = this;

  vm.gotoCreatePage = gotoCreatePage;
  vm.gotoPage = gotoPage;
  vm.gotoEditPage = gotoEditPage;

  activate();

  //////////

  function activate() {
    // Queries the database to get all Pages
    // NOTE: it retrieves the entire content
    // TODO: ideally we should decide to show a snippet of the content or not show the content at all
    PagesService.getAllPages()
      .then(function(res){
        vm.allPages = res;
      });
  }

  // transitions state to page create view
  function gotoCreatePage() {
    $state.go('pagesCreate');
  }

  // transitions state to page EDIT view with that page Id
  function gotoEditPage(pageId) {
    $state.go('pagesEdit',{pageId: pageId});
  }

  // transitions state to page view with that page Id
  function gotoPage(pageId) {
    $state.go('pages.' + pageId);
  }
}
