angular.module('starter.controllers', [])

.controller('ResumoCtrl', function($scope, Previsao) {



  Previsao.getPrevisoes(function(resp){
    $scope.paradas = resp;
  });


})



.controller('ConfigCtrl', function($scope) {



});
