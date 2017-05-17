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

    $scope.card = {
      name: '',
      email: '',
      addr1: '',
      addr2: '',
      city: '',
      country: '',
      number: '',
      cvc: '',
      exp_month: '',
      exp_year: ''
    };

    $scope.addCustomer=function() {

      console.log("Card Details: "+JSON.stringify($scope.card));


      /**
       * Create a card object to hold card details
       * send card object to Stripe using "Stripe.card.createToken({})"
       */
      Stripe.card.createToken(

        { "number": $scope.card.number,
          "exp_month": $scope.card.exp_month,
          "exp_year": $scope.card.exp_year,
          "cvc": $scope.card.cvc,
          "currency":"eur",
          "country":"IE",
          "name":$scope.card.name,
          "address_line1":$scope.card.addr1,
          "address_line2":$scope.card.addr2,
          "address_city":$scope.card.city,
          "address_country":$scope.card.country
        }, stripeResponseHandler);




      /**
       * Callback function
       */
      function stripeResponseHandler(status, response) {

        /**
         * Error!
         */
        if (response.error) {
          console.log(response.error)
        }

        /**
         * Successful
         * Stripe creates a Token and sends it back to client
         * can access token from response.id callback parameter
         */
        else {
          // response contains id and card, which contains additional card details
          var stripeToken = response.id;

          console.log("response.id = "+ response.id);
          console.log("response.card = "+ JSON.stringify(response.card));

          /**
           * Create customer object
           * containing token and other customer info
           */
          var customerObj = {
            "stripeToken":stripeToken,
            "email":"Johnodoe@gmail.com",
            "description": "This is the description!!",
            "discount": 10
          };

          /**
           * Send customer object to Node server
           */
          $http.post('/customers', customerObj )

          /**
           * Success callback - new customer added to stripe
           */
            .success(function(data, status, headers, config) {
              console.log("Success: "+data+" "+status)
            })

            /**
             * Error callback - problem adding customer object to stripe DB
             */
            .error(function(data, status, headers, config) {
              console.log("Error: "+data+" "+status)
            })
        }
      };
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
