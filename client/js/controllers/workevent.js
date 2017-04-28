angular.module('app')
    .controller('MyEventsController', ['$scope', 'WorkEvent', function($scope, WorkEvent){
        //$scope.workevents = WorkEvent.find();
        //console.log('ha' + $scope.workevents);

        $scope.$watch('currentUser.id', function(value) {
            if (!value) {
                return;
            }
            $scope.workevents = WorkEvent.find({
                filter: {
                    where: {
                        ownerId: $scope.currentUser.id
                    },
                    include: 'member'
                }
            });
        });
    }])