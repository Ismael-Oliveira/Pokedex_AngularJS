var app = angular.module('myApp', []);

app.controller('myCtrl', ($scope, $http)=>{

    // $scope.options = [
    //     {'name':'nome', 'value':'name'},
    //     {'name':'velocidade', 'value':'speed'},
    //     {'name':'ataque', 'value':'atk'},
    // ]

    // $scope.pokemons = [
    //     {'name':'pikachu', 'speed': 100, 'atk':50},
    //     {'name':'bulbasaul', 'speed': 10, 'atk':45},
    //     {'name':'mew', 'speed': 150, 'atk':100}
    // ]

    $scope.options = [
        {'name':'nome', 'value':'name'},
        {'name':'velocidade', 'value':'stats[0].base_stat'},
        {'name':'ataque', 'value':'stats[4].base_stat'},
    ]
    
    $scope.pokemons= [];
    for (let i = 1; i <= 6; i++) {
        $http.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res)=>{
            $scope.pokemons.push(res.data);
        });    
    }

    $('.pagination').pajinatify({
        onChange: function (currentPage) {
            $scope.pokemons= [];
            let limit = 6;
            let offset = ((currentPage*6) - limit)+1;
            for (let i = offset; i < limit+offset; i++) {
                $http.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res)=>{
                    $scope.pokemons.push(res.data);
                });    
            }        
        },
    });

    $scope.frontToBackShiny = function(evF) {
        let $src = evF.target.src;
        $src = $src.split('pokemon/');
        evF.target.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/"+$src[1];
    }

    $scope.backShinyToFront = function(evF) {
        let $src = evF.target.src;
        $src = $src.split('shiny/');
        evF.target.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+$src[1];
    }

    $scope.backToFrontShiny = function(evF) {
        let $src = evF.target.src;
        $src = $src.split('back/');
        evF.target.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/"+$src[1];
    }

    $scope.FrontShinyToBack = function(evF) {
        let $src = evF.target.src;
        $src = $src.split('shiny/');
        evF.target.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/"+$src[1];
    }
    // console.log($scope.pokemons);
});
