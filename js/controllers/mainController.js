app.controller('mainController', ['$scope', 'dataService', 'pagerService',
    function ($scope, dataService, pagerService) {
        $scope.submitForm = function () {
            $scope.items = $scope.links = [];
            $scope.errorResponde ="";
                dataService.getImages($scope.form.search, 100)
                .then(function (response) {//retrieve the data from reddit.
                    angular.forEach(response.data.data.children, function (value, key) {
                        if (value.data.thumbnail !== "self" && value.data.thumbnail !== "default" && value.data.thumbnail !== "") {
                            $scope.links.push({
                                src: value.data.thumbnail,
                                title: value.data.title,
                                permalink: dataService.getUrlBase() + value.data.permalink
                            });
                        }
                    });
                    if ($scope.links.length == 0) {
                        $scope.errorResponde = 'no galleries for this name';
                        return;
                    }
                    //create the paging
                    $scope.pager = {};
                    $scope.setPage = function (page) {
                        if (page < 1 || page > $scope.pager.totalPages) {
                            return;
                        }
                        // get pager object from service
                        $scope.pager = pagerService.GetPager($scope.links.length, page, 10);
                        // get current page of items
                        $scope.items = $scope.links.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
                        console.log($scope.pager);
                    }
                    $scope.setPage(1);    // initialize to page 1
                }, function myError(response) {

                    $scope.errorResponde = 'no galleries for this name';
                });
        };
    }]);
