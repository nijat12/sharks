'use strict';

/**
 * @ngdoc overview
 * @name sharksApp
 * @description
 * # sharksApp
 *
 * Main module of the application.
 */
var app = angular
  .module('shark', ['ui.router', 'ui.bootstrap'])


  .controller('MainCtrl', ['$uibModal', '$scope', function ($uibModal, $scope) {

    $scope.contact = {name : '', email: '', message: ''};



    $scope.openMail = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/mail.html',
        backdrop: true,
        scope: $scope
      });
    };

    $scope.openBuy = function () {
      var modalInstance2 = $uibModal.open({
        animation: true,
        templateUrl: 'views/buy.html',
        backdrop: true,
        scope: $scope
      });
    };

    $scope.openSubscribe = function () {
      var modalInstance3 = $uibModal.open({
        animation: true,
        templateUrl: 'views/subscribe.html',
        backdrop: true,
        scope: $scope
      });
    };
  }]);
