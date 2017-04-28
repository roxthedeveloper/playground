angular.module('app')
    //log in controller
    .controller('AuthLoginController', ['$scope', 'AuthService', '$state', function($scope, AuthService, $state){
        $scope.user = {
            email: '',
            password: ''
        };

        $scope.login = function(){
            AuthService.login($scope.user.email, $scope.user.password)
                .then(function(){
                    if($scope.returnTo && $scope.returnTo.state){
                        $state.go($scope.returnTo.state.name, $scope.returnTo.params);

                        $scope.returnTo.state = null;
                        $scope.returnTo.params = null;

                        return;
                    }
                    $state.go('my-events');
                });
        };
    }])
    //log out controller
    .controller('AuthLogoutController', ['$scope', 'AuthService', '$state', function($scope, AuthService, $state){
        console.log('ready to log out!');
        AuthService.logout()
            .then(function(){
                console.log('successfully log out!');
                $state.go('login');
            });
    }])
    //sign up controller
    .controller('SignUpController', ['$scope', 'AuthService', '$state', function($scope, AuthService, $state){
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.register = function(){
            AuthService.register($scope.user.email, $scope.user.password)
                .then(function(){
                    $state.transitionTo('sign-up-success');
                });
        };
    }])