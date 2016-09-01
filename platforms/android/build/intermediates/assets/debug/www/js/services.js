angular.module('starter.services', [])



.factory('Previsao', function($http){

    /**
     * Serviço que localiza as previsões de ônibus
     */
    var urlPrevisoes = "http://api.plataforma.cittati.com.br/m3p/js/prediction/service/";

    var codigoLinha = 6095;
    var codigoParada = 2957625;


    


    return {


      getPrevisoes : function(){

          var url = urlPrevisoes + codigoLinha + "/" + codigoParada;

          return $http.get(url).then(function(response){

            var paradas = [];

            if ( response && response.data && response.data.services ){
              var i = response.data.services.length;
              while (i--){

                var linha = response.data.services[i];
                
                var parada = {parada: 'Treze de maio', previsoes : []};
                var x = linha.vehicles.length;
                while (x--){
                  var onibus = linha.vehicles[x];
                  parada.previsoes.push({numero: onibus.prefix, previsao: onibus.prediction / 60});
                }
                paradas.push(parada);
              }
            }

            return paradas;
          }, function(error){
            return "erro";
          });

      }


    }




})


.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
