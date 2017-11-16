app.service('dataService', ['$http', function ($http) {

    var urlBase = 'https://www.reddit.com';
    var urlApi = urlBase+'/r';
    var filter='/new.json?sort=new';

    this.getImages = function (id,limit) {
        if(limit===undefined || limit==='')
            limit=10;
        return $http.get(urlApi + '/' + id+filter+'&limit='+limit);
    };
    this.getUrlBase = function () {
        return urlBase;
    };


}]);