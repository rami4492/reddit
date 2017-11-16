app.controller('mainController',  ['$scope', 'dataService',
    function ($scope, dataService) {

        $scope.links = [];
        dataService.getImages('cat',20)
            .then(function (response) {
                // console.log(response.data.data.children);
                angular.forEach(response.data.data.children, function (value, key) {
                    if(value.data.thumbnail !== "self" && value.data.thumbnail !== "default" && value.data.thumbnail !== "")
                    {
                        $scope.links.push({
                            src: value.data.thumbnail,
                            title: value.data.title,
                            caption: '',
                            permalink: dataService.getUrlBase()+ value.data.permalink
                        });
                    }});
                console.log($scope.links);
                if($scope.links.length==0){
                    $scope.errorResponde='no galleries for this name';
                }

                // $scope.myWelcome = response.data;
            }, function myError(response) {
                console.log(response)
                $scope.errorResponde='no galleries for this name';
                console.log('emptsd');
            });


        var carousel;
        $scope.loadPage = function(page, tmplCb) {
            var carouselPageScope = $scope.$new();
            // Assign / load all the items you want to carouselPageScope.
            // Do work
            // Ensure that the carousel knows how many total pages there are
            carousel.updatePageCount(totalPages);
            tmplCb(carouselPageScope);
        };
        $scope.onCarouselAvailable = function(car) {
            carousel = car;
        };
        $scope.hasNext = function() {
            return carousel ? carousel.hasNext() : false;
        };
        $scope.hasPrevious = function() {
            return carousel ? carousel.hasPrevious() : false;
        };
        $scope.next = function() {
            if (carousel) carousel.next();
        };
        $scope.prev = function() {
            if (carousel) carousel.prev();
        };

        $scope.submitForm = function () {
            $scope.links = [];
            dataService.getImages($scope.form.search)
                .then(function (response) {
                    // console.log(response.data.data.children);
                    angular.forEach(response.data.data.children, function (value, key) {
                        if(value.data.thumbnail !== "self" && value.data.thumbnail !== "default" && value.data.thumbnail !== "")
                        {
                            $scope.links.push({
                                src: value.data.thumbnail,
                                title: value.data.title,
                                caption: '',
                                permalink: dataService.getUrlBase()+ value.data.permalink
                            });
                        }});
                    console.log($scope.links);
                    if($scope.links.length==0){
                        $scope.errorResponde='no galleries for this name';
                    }

                    // $scope.myWelcome = response.data;
                }, function myError(response) {
                    console.log(response)
                    $scope.errorResponde='no galleries for this name';
                    console.log('emptsd');
                });

            //$http.post('form.php', JSON.stringify(data)).success(function(){/*success callback*/});
        };


    }]);
