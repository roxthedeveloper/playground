angular.module('app')
    .controller('MyEventsController', ['$scope', 'WorkEvent', '$state', function($scope, WorkEvent, $state){
        //$scope.workevents = WorkEvent.find();
        //console.log('ha' + $scope.workevents);
        $scope.$watch('currentUser.id', function(value) {
            if (!value) {
                console.log('user not logged in');
                $state.go('login');
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
    .controller('AddEventController', ['$scope', 'WorkEvent', '$state', function($scope, WorkEvent, $state){
        $scope.$watch('currentUser.id', function(value) {
            if (!value) {
                console.log('user not logged in');
                $state.go('login');
                return;
            }

            var now = new Date();
            now.setSeconds(0, 0);
            $scope.Action = "Add";
            $scope.isDisabled = false;
            $scope.workTypes = ["wedding", "engagement", "other"];
            $scope.selectedType = $scope.workTypes[0];
            $scope.CurrentDatetime = now.toJSON();
            console.log(now.toJSON());
            $scope.workevent = {
                start: now,
                end: now
            };

            $scope.submitForm = function(){
                WorkEvent.create({
                    title: $scope.workevent.title,
                    type: $scope.selectedType,
                    description: $scope.workevent.description,
                    start: $scope.workevent.start,
                    end: $scope.workevent.end
                })
                .$promise
                .then(function(){
                    $state.go('my-events');
                });
            };
        });
    }])