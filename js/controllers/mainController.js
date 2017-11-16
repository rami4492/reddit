app.controller('mainController', ['$scope', 'dataService',
    function ($scope, dataService) {
        $scope.submitForm = function () {
            $scope.links = [];
            dataService.getImages($scope.form.search, 100)
                .then(function (response) {
                    // console.log(response.data.data.children);
                    angular.forEach(response.data.data.children, function (value, key) {
                        if (value.data.thumbnail !== "self" && value.data.thumbnail !== "default" && value.data.thumbnail !== "") {
                            $scope.links.push({
                                src: value.data.thumbnail,
                                title: value.data.title,
                                permalink: dataService.getUrlBase() + value.data.permalink
                            });
                        }
                    });
                    console.log($scope.links);
                    if ($scope.links.length == 0) {
                        $scope.errorResponde = 'no galleries for this name';
                    }
                }, function myError(response) {
                    console.log(response)
                    $scope.errorResponde = 'no galleries for this name';
                });
        };
    }]);
