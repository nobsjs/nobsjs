'use strict';

angular.module('tropicalbs')
  .controller('PagesAdminController', PagesAdminController);

PagesAdminController.$inject = ['$state', '$pageStateManager', 'Pages', '$stateParams', '$window'];

function PagesAdminController ($state, $pageStateManager, Pages, $stateParams, $window) {
  var vm = this;
  vm.mode = '';
  vm.page = {};
  vm.Title = '';

  vm.createPage = createPage;
  vm.deletePage = deletePage;
  vm.updatePage = updatePage;

  activate();

  /////////////

  // TODO: add validation in the view (check if it has a slash and other acceptability requirements)
  function createPage () {
    Pages.createPage(vm.page)
      .then(function (resp) {
        // TODO: add success/error message
        $pageStateManager.addState(resp);
        $state.go('pages.' + resp.id);
      });
  }

  function deletePage () {
    Pages.deletePage(vm.page.id)
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

  function updatePage () {
    Pages.updatePage(vm.page, vm.page.id)
      .then(function (resp) {
        // TODO: update state so that you don't need to refresh the page
        // TODO: add success/error message
        // $state.go('pages.' + resp.id);

        // reloads the app
        $window.location.reload();
      });
  }

  function activate () {
    checkState();
    getPage();
  }

  function checkState () {
    if($state.current.name === 'pagesCreate') {
      // we are in create mode
      vm.mode = 'create';
      vm.Title = 'Create a Page';
    } else if ($state.current.name === 'pagesEdit') {
      // we are in edit mode
      vm.mode = 'edit';
      vm.Title = 'Update a Page';
    }
  }

  function getPage () {
    // Make sure pageId exists
    if($stateParams.pageId) {

      vm.page.id = $stateParams.pageId;
      //get page info and update vm.page if successful
      Pages.getPageById(vm.page.id).then(function(res) {
        vm.page.title = res.title;
        vm.page.slug = res.slug;
        vm.page.content = res.content;
      });
    } else {
      // TODO: show the user an error message or create a redirect handler.
    }
  }
}








