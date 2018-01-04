(function () {
    'use strict';

    angular.module('nutricia.breastfeed', [])
    .controller('BreastfeedCtrl', function($scope, $timeout, $ionicPopup) {
      var vm = this;
      
      //Adding initial values for counter
      vm.counter1 = 0;
      vm.counter2 = 0;

      vm.counter1max = 0;
      vm.counter2max = 0;

      var stopped1, stopped2;
        
      vm.timer1Running = false;
      vm.timer2Running = false;

      vm.countUp = function(counter) {  
        console.log(vm.counter1)
          if (counter == '1') {
            vm.timer1Running = true;
            stopped1 = $timeout(function() {
                  vm.counter1++; 
             vm.countUp('1'); 
            }, 1000);
          }
          else {
            vm.timer2Running = true;
            stopped2 = $timeout(function() {
                vm.counter2++;
           vm.countUp(); 
          }, 1000);
          } 
        };

      vm.countDown = function(counter) {  
          if (counter == '1') {
            if (vm.counter1 != 0) {
              vm.timer1Running = true;
              stopped1 = $timeout(function() {
                    vm.counter1--; 
               vm.countDown('1'); 
              }, 1000);
            }
            else {
              vm.timer1Running = false;
              vm.showAlert();
              vm.counter1max = 0;
            }
          }
          else {
            if (vm.counter2 != 0) {
                vm.timer2Running = true;
                stopped2 = $timeout(function() {
                    vm.counter2--;
               vm.countDown(); 
              }, 1000);
            }
            else{
              vm.timer2Running = false;
              vm.showAlert();
              vm.counter2max = 0;
            }
          } 
        };
         
      vm.stop = function(counter){
        if (counter == '1') {
          vm.timer1Running = false;
          $timeout.cancel(stopped1);
          vm.counter1max = vm.counter1;
        } 
        else {
          vm.timer2Running = false;
          $timeout.cancel(stopped2);
          vm.counter2max = vm.counter2;
        }
      };

      vm.reset = function(counter) {
        if (counter == '1') {
          vm.counter1 = 0;
        }
        else {
          vm.counter2 = 0;
        }
      } 

      vm.showAlert = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'Time!',
         template: 'Your boob is empty!'
       })
      };
       
    })


})();

