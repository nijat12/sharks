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
  .module('shark', ['ui.router'])


  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
