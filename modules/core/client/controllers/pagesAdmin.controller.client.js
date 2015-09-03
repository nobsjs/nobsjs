'use strict';

angular.module('tropicalbs')
  .controller('PagesAdminController', PagesAdminController);

PagesAdminController.$inject = ['$state', '$pageStateManager', 'PagesService', '$stateParams', '$window'];

function PagesAdminController ($state, $pageStateManager, PagesService, $stateParams, $window) {
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
  function activate () {
    checkState();
    getPage();
  }

  function checkState () {
    if($state.current.name === 'pagesCreate') {
      // we are in create mode
      vm.mode = 'create';
      vm.viewTitle = 'Create a Page';
    } else if ($state.current.name === 'pagesEdit') {
      // we are in edit mode
      vm.mode = 'edit';
      vm.viewTitle = 'Update a Page';
    }
  }

  function createPage () {
    PagesService.createPage(vm.page)
      .then(function (resp) {
        // TODO: add success/error message
        $pageStateManager.addState(resp);
        $state.go('pages.' + resp.id);
      });
  }

  function deletePage () {
    PagesService.deletePage(vm.page.id)
      .then(function (resp) {
        // TODO: update state so that you don't need to refresh the page
        // TODO: add success/error message
        // $state.go('pages.' + resp.id);

        // reloads the app
        // TODO: find a way to handle this more gracefully
        $window.location.reload();
        $state.go('pagesList');
      });
  }

  function getPage () {
    // Make sure pageId exists
    if($stateParams.pageId) {
      vm.page.id = $stateParams.pageId;
      // get page info and update vm.page if successful
      PagesService.getPageById(vm.page.id).then(function(res) {
        vm.page.title = res.title;
        vm.page.slug = res.slug;
        vm.page.content = res.content;
      });
    } else {
      // TODO: show the user an error message or create a redirect handler.
    }
  }

  function updatePage () {
    PagesService.updatePage(vm.page, vm.page.id)
      .then(function (resp) {
        // TODO: update state so that you don't need to refresh the page
        // TODO: add success/error message
        // $state.go('pages.' + resp.id);

        // reloads the app
        $window.location.reload();
      });
  }
}
