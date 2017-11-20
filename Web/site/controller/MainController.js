

var app = angular.module("Fingerprint", ["ngRoute","ngMaterial","ngMessages","ui.bootstrap"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "site/view/fingerprint.html",
            controller: "FingerprintController"
        })
        .when("/salary", {
            templateUrl: "site/view/salary.html",
            controller: "SalaryController"
        })
        .when("/employee", {
            templateUrl: "site/view/employee.html",
            controller: "EmployeeController"
        })
        .when("/calendar", {
            template: "<h1>CALENDAR<h1>"
        })
        .when("/history", {
            templateUrl: "site/view/history.html",
            controller: "HistoryController"
        })
        .otherwise({
            redirectTo: "/"
        });
});


var yearArray = new Array();
var currentTime = new Date();
var currentYear = currentTime.getFullYear();
var currentMonth = currentTime.getMonth();
function createYearArray() {

    var year;
    var firstYear = 2010;
    var temp = true;
    if (yearArray.length == 0) {
        while (firstYear <= currentYear) {
            year = yearArray.push(firstYear);
            firstYear++;
        }
    }
    return yearArray;
}
// Fingerprint Controller
app.controller("FingerprintController", ['$scope', function($scope){
    $scope.init = function(){
        $('.carousel').carousel();
    };
    $scope.init();
}]);

// Salary Controller
app.controller('SalaryController', function ($scope) {

    $scope.employees = [
        { Name: 'huy', Room: 'A3', Salary: 113 },
        { Name: 'le', Room: 'A2', Salary: 11 }
    ];
    $scope.selectedYear = currentYear;

    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var n = month[currentTime.getMonth()];
    $scope.selectedMonth = n;
    $scope.months = month;

    $scope.years = createYearArray();

});

// Employee Controller
app.controller('EmployeeController', ['$scope','$uibModal',
    function ($scope, $uibModal) {

    $scope.Position = ["Team Leader", "Member", "Manager"];
    $scope.employees = [
        {EmployeeID: 'NV01', Name: 'huy', Position: 'Member', Email: 'huyle@gmail.com', PhoneNumber: '0957435290', Address: '9 nguyen thi minh khai, quan 1', Salary: 113, Bonus: 220, StartingDate: '2/10/2017' }
    ];
    this.myDate = new Date();
    this.isOpen = false;
    $scope.ShowDetail = function($employee){
         var modalInstance = $uibModal.open({
            templateUrl: '/view/DetailEmployee.html',
            controller: $employee > 0 ? 'UpdateEmployeeController' : 'CreateEmployeeController',
            windowClass: "hmodal-info",
            animation: false,
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                employee: function () {
                    return $employee;
                }
            }
        });
    };
}]);
app.controller('CreateEmployeeController', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance){
    console.log("Started CreateEmployee controller");
    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.Change = function () {
            if ($scope.form.$invalid)
                return true;
        }
}]);
app.controller('UpdateEmployeeController', ['$scope', function($scope){
    console.log("Started CreateEmployee controller");
    
}]);
app.controller('HistoryController',['$scope', '$http', function ($scope, $http) {
  console.log("Started history controller");
  var config = {
    headers:{
        'Accept': 'application/json',
        'requestType':'angularJS',
        'Cache-Control': 'no-cach, no-store, must-revalidate',
        'Pragame':'no-catch',
        'Expries': 0,
        action: 's',
       },
    };
   var url = 'HistoryService.php';
   $scope.init = function(){
    $scope.historys = [];
    $scope.FromDate = new Date(); 
    $scope.ToDate = new Date();
   };
  $scope.getHistory = function() {
      $http.get(url, config)
      .then(function(data){
          $scope.historys = data;
      });
  };
  $scope.init();
  $scope.getHistory();  
}]);

