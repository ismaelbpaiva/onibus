angular.module('starter.services', [])



.factory('Previsao', function($http){

    /**
     * Serviço que localiza as previsões de ônibus
     */
    var urlPrevisoes = "http://api.plataforma.cittati.com.br/m3p/js/prediction/service/";

    var linhas = [{codigo: 6095, isVolta: false, descricao: 'Rio doce Príncipe', pontoRetorno: 2959180, somarAposRetorno: 5},
    {codigo: 6096, isVolta: true, descricao: 'Rio doce Príncipe', pontoRetorno: 2959180},
    /*{codigo: 6570, isVolta: false, descricao : 'Conjunto Praia Janga', pontoRetorno: 2957687, somarAposRetorno: 7},
    {codigo: 6571, isVolta: true, descricao : 'Conjunto Praia Janga', pontoRetorno: 2957687},
    {codigo: 6073, isVolta: false, descricao : 'Jardim Atlântico', pontoRetorno: 2959180, somarAposRetorno: 5},
    {codigo: 6075, isVolta: true, descricao : 'Jardim Atlântico', pontoRetorno: 2959180},
    {codigo: 6093, isVolta: false, descricao : 'Conjunto Beira Mar', pontoRetorno:2959180, somarAposRetorno: 5 },
    {codigo: 6080, isVolta: true, descricao : 'Conjunto Beira Mar', pontoRetorno:2959180 }*/];
    var paradas = [{parada: 'Treze de maio', codigo: 2957625, aposRetorno: true, previsoes: []}/*,
     {parada: 'Rua princesa Isabel', codigo: 2957625, aposRetorno: false, previsoes: []}*/];
    
    /**
     * Método executa uma chamada assíncrona ao serviço do CittaMobbi
     */
    retornarPrevisao = function(linha, parada){

      var codigoLinha = linha.codigo;
      var codigoParada = parada.codigoParada;
      var somar = 0;
      if ( linha.isIda && parada.aposRetorno ){        
          codigoParada = linha.pontoRetorno;
          //workaround - pois o cittamobi não dá previsões corretas após o retorno no ponto de retorno
          somar = linha.somarAposRetorno; 
      }

      var url = urlPrevisoes + codigoLinha + "/" + codigoParada;

      return $http.get(url,{cache: false}).then(function(response){

            

            if ( response && response.data && response.data.services ){
              var i = response.data.services.length;
              while (i--){

                var linhaRetorno = response.data.services[i];
                
                var x = linhaRetorno.vehicles.length;
                while (x--){
                  var onibus = linhaRetorno.vehicles[x];
                  parada.previsoes.push({numero: onibus.prefix, linha: linhaRetorno.routeCode, previsao: (onibus.prediction / 60).toFixed(1) + somar });
                }
                // paradas.push(parada);
              }
            }
      
      });
    };




    return {

      getPrevisoes : function(callBack){

        var totalChamadas = paradas.length * linhas.length;

        var i = paradas.length;
        while (i--){
          var x = linhas.length;
          while (x--){
            retornarPrevisao(linhas[x], paradas[i]).then(function(){            
              console.log(paradas[i].previsoes.length);
              console.log(totalChamadas);
              if ( paradas[i].previsoes.length === totalChamadas ){

                var y = paradas.length;
                while (y--){
                  paradas[y].previsoes.sort(function(a,b){
                    return a.previsao-b.previsao;
                  });
                }

                callBack(paradas);
              }
            });
          }
        }


      }


    }




});