angular.module('app', ['ui.router', 'lbServices'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('forbidden', {url:'/forbidden', templateUrl:'views/forbidden.html'})
            .state('sign-up', {url:'/sign-up', controller:'SignUpController', templateUrl:'views/sign-up-form.html'})
            .state('sign-up-success', {url:'/sign-up-success', templateUrl:'views/sign-up-success.html'})
            .state('login', {url:'/login', controller:'AuthLoginController', templateUrl:'views/login.html'})
            .state('logout', {url:'/logout', controller:'AuthLogoutController'})
            .state('my-events', {url:'/my-events', controller:'MyEventsController', templateUrl:'views/my-events.html', authenticate: true})
            .state('add-event', {url:'/add-event', controller:'AddEventController', templateUrl:'views/event-form.html', authenticate: true})
        $urlRouterProvider.otherwise('login');
    }])
    .run(['$rootScope', '$state', 'LoopBackAuth', 'AuthService', function($rootScope, $state, LoopBackAuth, AuthService){
        $rootScope.$on('$StateChangeStart', function(event, toState, toParams){
            //redirect to login if not login
            if($rootScope.authenticate && !LoopBackAuth.accessTokenId) {
                event.preventDefault();
                $rootScope.returnTo = {
                    state: toState,
                    params: toParams
                };
                $state.go('forbidden');
            }
        });

        if(LoopBackAuth.accessTokenId && !$rootScope.currentUser){
            AuthService.refresh(LoopBackAuth.accessTokenId);
        }
    }]);