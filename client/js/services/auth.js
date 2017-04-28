angular.module('app')
    .factory('AuthService', ['Member', '$q', '$rootScope', '$state', function(Member, $q, $rootScope, $state){
        function login(email, password)
        {
            console.log("login !!!")
            return Member
                .login({email: email, password: password})
                .$promise
                .then(function(response){
                    $rootScope.currentUser = {
                        id: response.user.id,
                        tokenId: response.id,
                        email: email
                    };
                });
        }

        function logout()
        {
            console.log("logout !!!")
            return Member
                .logout()
                .$promise
                .then(function(){
                    $rootScope.currentUser = null;
                });
        }

        function register(email, password)
        {
            return Member
                .create({
                    email: email,
                    password: password
                })
                .$promise;
        }

        function refresh(accessTokenId)
        {
            return Member
                .getCurrent(function(memberResource){
                    $rootScope.currentUser = {
                        id: memberResource.id,
                        tokenId: accessTokenId,
                        email: memberResource.email
                    }
                })
        }

        return {
            login: login,
            logout: logout,
            register: register,
            refresh: refresh
        }
    }])