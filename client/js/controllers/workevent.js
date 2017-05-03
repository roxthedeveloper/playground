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
            var wtypes = ["wedding", "engagement", "other"];
            $scope.viewModel = {
                action: "Add",
                isTitleDisabled: false,
                isTypeDisabled: false,
                workTypes: wtypes,
                eventTitle: "",
                eventDesc: "",
                selectedType: wtypes[0],
                startDatetime: now,
                endDatetime: now,
                minStartDatetime: now.toJSON(),
                minEndDatetime: ((this.startDatetime) ? this.startDatetime.toJSON() : now)
            };

            $scope.submitForm = function(){
                WorkEvent.create({
                    title: $scope.viewModel.eventTitle,
                    type: $scope.viewModel.selectedType,
                    description: $scope.viewModel.eventDesc,
                    start: $scope.viewModel.startDatetime.toJSON(),
                    end: $scope.viewModel.endDatetime.toJSON()
                })
                .$promise
                .then(function(){
                    $state.go('my-events');
                });
            };
        });
    }])
    .controller('DeleteEventController', ['$scope', 'WorkEvent', '$state', '$stateParams', function($scope, WorkEvent, $state, $stateParams) {
        console.log('delete ('+$stateParams+')');
        WorkEvent.deleteById({ id: $stateParams.id })
            .$promise
            .then(function() {
                $state.go('my-events');
            });
    }])
    .controller('EditEventController', ['$scope', '$q', 'WorkEvent', '$state', '$stateParams', function($scope, $q, WorkEvent, $state, $stateParams){
        $scope.$watch('currentUser.id', function(value) {
            if (!value) {
                console.log('user not logged in');
                $state.go('login');
                return;
            }

            var now = new Date();
            now.setSeconds(0, 0);
            var wtypes = ["wedding", "engagement", "other"];
            $scope.workevent = {};
            $scope.viewModel = {
                action: "Edit",
                isTitleDisabled: true,
                isTypeDisabled: true,
                workTypes: wtypes,
                eventTitle: " ",
                eventDesc: " ",
                selectedType: "",
                startDatetime: now,
                endDatetime: now,
                minStartDatetime: now.toJSON(),
                minEndDatetime: ((this.startDatetime) ? this.startDatetime.toJSON() : now)
            };

            $q.all([
                WorkEvent.findById({id: $stateParams.id}).$promise
            ])
            .then(function(data){
                console.log('stateParams id='+$stateParams.id)
                console.log('workevent id='+data[0].id)
                console.log('workevent id='+data[0].ownerId)
                $scope.workevent = data[0];
                $scope.viewModel.eventTitle = data[0].title;
                $scope.viewModel.eventDesc = data[0].description;
                $scope.viewModel.selectedType = data[0].type;
                $scope.viewModel.startDatetime = new Date(data[0].start);
                $scope.viewModel.endDatetime = new Date(data[0].end);
            });

            $scope.submitForm = function(){
                $scope.workevent.start = $scope.viewModel.startDatetime.toJSON();
                $scope.workevent.end = $scope.viewModel.endDatetime.toJSON();
                $scope.workevent.description = $scope.viewModel.eventDesc;

                $scope.workevent
                    .$save()
                    .then(function(workevent){
                        $state.go('my-events');
                    });
            };
        });
    }])
