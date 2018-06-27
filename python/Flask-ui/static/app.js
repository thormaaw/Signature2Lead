
var myApp = angular.module('myApp', ['ui.router', 'ui.bootstrap', 'plunker', 'ngTouch', 'ngAnimate', 'ngSanitize']);
//This example is coming from https://scotch.io/tutorials/angular-routing-using-ui-router
myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: '/static/partials/partial-home.html'
        })
        .state('bootstrap', {
            url: '/bootstrap',
            templateUrl: '/static/partials/bootstrap.html'
        })
        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: '/static/partials/partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        })
        
        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/static/partials/paragraph',
            template: 'I could sure use a drink right now.'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: '/static/partials/partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': {
                    templateUrl: '/static/table-data.html',
                    controller: 'scotchController'
                }
        }


    });
    $locationProvider.html5Mode(true);
});
myApp.factory('buildFilesService', function ($http, $q) {

    var moduleMap;
    var rawFiles;

    return {
        getModuleMap: getModuleMap,
        getRawFiles: getRawFiles,
        get: function () {
            return $q.all({
                moduleMap: getModuleMap(),
                rawFiles: getRawFiles()
            });
        }
    };

    function getModuleMap() {
        return moduleMap ? $q.when(moduleMap) : $http.get('/static/assets/module-mapping.json')
            .then(function (result) {
                moduleMap = result.data;
                return moduleMap;
            }).catch(angular.noop);
    }

    function getRawFiles() {
        return rawFiles ? $q.when(rawFiles) : $http.get('/static/assets/raw-files.json')
            .then(function (result) {
                rawFiles = result.data;
                return rawFiles;
            }).catch(angular.noop);
    }

});
myApp.controller('DatepickerPopupDemoCtrl', function ($scope) {
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
});

myApp.controller('DatepickerDemoCtrl', function ($scope) {
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.options = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.options.minDate = $scope.options.minDate ? null : new Date();
    };

    $scope.toggleMin();

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
})
myApp.controller('TypeaheadCtrl', function ($scope, $http) {

    var _selected;

    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function (val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
        }).then(function (response) {
            return response.data.results.map(function (item) {
                return item.formatted_address;
            });
        });
    };

    $scope.ngModelOptionsSelected = function (value) {
        if (arguments.length) {
            _selected = value;
        } else {
            return _selected;
        }
    };

    $scope.modelOptions = {
        debounce: {
            default: 500,
            blur: 250
        },
        getterSetter: true
    };

    $scope.statesWithFlags = [{
        'name': 'Alabama',
        'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'
    }, {
        'name': 'Alaska',
        'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'
    }, {
        'name': 'Arizona',
        'flag': '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'
    }, {
        'name': 'Arkansas',
        'flag': '9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'
    }, {
        'name': 'California',
        'flag': '0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'
    }, {
        'name': 'Colorado',
        'flag': '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'
    }, {
        'name': 'Connecticut',
        'flag': '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'
    }, {
        'name': 'Delaware',
        'flag': 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'
    }, {
        'name': 'Florida',
        'flag': 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'
    }, {
        'name': 'Georgia',
        'flag': '5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'
    }, {
        'name': 'Hawaii',
        'flag': 'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'
    }, {
        'name': 'Idaho',
        'flag': 'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'
    }, {
        'name': 'Illinois',
        'flag': '0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'
    }, {
        'name': 'Indiana',
        'flag': 'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'
    }, {'name': 'Iowa', 'flag': 'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'}, {
        'name': 'Kansas',
        'flag': 'd/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'
    }, {
        'name': 'Kentucky',
        'flag': '8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'
    }, {
        'name': 'Louisiana',
        'flag': 'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'
    }, {
        'name': 'Maine',
        'flag': '3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'
    }, {
        'name': 'Maryland',
        'flag': 'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'
    }, {
        'name': 'Massachusetts',
        'flag': 'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'
    }, {
        'name': 'Michigan',
        'flag': 'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'
    }, {
        'name': 'Minnesota',
        'flag': 'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'
    }, {
        'name': 'Mississippi',
        'flag': '4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'
    }, {
        'name': 'Missouri',
        'flag': '5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'
    }, {
        'name': 'Montana',
        'flag': 'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'
    }, {
        'name': 'Nebraska',
        'flag': '4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'
    }, {
        'name': 'Nevada',
        'flag': 'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'
    }, {
        'name': 'New Hampshire',
        'flag': '2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'
    }, {
        'name': 'New Jersey',
        'flag': '9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'
    }, {
        'name': 'New Mexico',
        'flag': 'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'
    }, {
        'name': 'New York',
        'flag': '1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'
    }, {
        'name': 'North Carolina',
        'flag': 'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'
    }, {
        'name': 'North Dakota',
        'flag': 'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'
    }, {
        'name': 'Ohio',
        'flag': '4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'
    }, {
        'name': 'Oklahoma',
        'flag': '6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'
    }, {
        'name': 'Oregon',
        'flag': 'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'
    }, {
        'name': 'Pennsylvania',
        'flag': 'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'
    }, {
        'name': 'Rhode Island',
        'flag': 'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'
    }, {
        'name': 'South Carolina',
        'flag': '6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'
    }, {
        'name': 'South Dakota',
        'flag': '1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'
    }, {
        'name': 'Tennessee',
        'flag': '9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'
    }, {
        'name': 'Texas',
        'flag': 'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'
    }, {
        'name': 'Utah',
        'flag': 'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'
    }, {
        'name': 'Vermont',
        'flag': '4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'
    }, {
        'name': 'Virginia',
        'flag': '4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'
    }, {
        'name': 'Washington',
        'flag': '5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'
    }, {
        'name': 'West Virginia',
        'flag': '2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'
    }, {
        'name': 'Wisconsin',
        'flag': '2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'
    }, {
        'name': 'Wyoming',
        'flag': 'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'
    }];
});

myApp.controller('TooltipDemoCtrl', function ($scope, $sce) {
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = $sce.trustAsHtml('I\'ve been made <b>bold</b>!');
    $scope.placement = {
        options: [
            'top',
            'top-left',
            'top-right',
            'bottom',
            'bottom-left',
            'bottom-right',
            'left',
            'left-top',
            'left-bottom',
            'right',
            'right-top',
            'right-bottom'
        ],
        selected: 'top'
    };
});

myApp.controller('TimepickerDemoCtrl', function ($scope, $log) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function () {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function () {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.mytime = d;
    };

    $scope.changed = function () {
        $log.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function () {
        $scope.mytime = null;
    };
});

myApp.controller('TabsDemoCtrl', function ($scope, $window) {
    $scope.tabs = [
        {title: 'Dynamic Title 1', content: 'Dynamic content 1'},
        {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true}
    ];

    $scope.alertMe = function () {
        setTimeout(function () {
            $window.alert('You\'ve selected the alert tab!');
        });
    };

    $scope.model = {
        name: 'Tabs'
    };
});

myApp.controller('RatingDemoCtrl', function ($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
        {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
        {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
        {stateOn: 'glyphicon-heart'},
        {stateOff: 'glyphicon-off'}
    ];
});

myApp.controller('ProgressDemoCtrl', function ($scope) {
    $scope.max = 200;

    $scope.random = function () {
        var value = Math.floor(Math.random() * 100 + 1);
        var type;

        if (value < 25) {
            type = 'success';
        } else if (value < 50) {
            type = 'info';
        } else if (value < 75) {
            type = 'warning';
        } else {
            type = 'danger';
        }

        $scope.showWarning = type === 'danger' || type === 'warning';

        $scope.dynamic = value;
        $scope.type = type;
    };

    $scope.random();

    $scope.randomStacked = function () {
        $scope.stacked = [];
        var types = ['success', 'info', 'warning', 'danger'];

        for (var i = 0, n = Math.floor(Math.random() * 4 + 1); i < n; i++) {
            var index = Math.floor(Math.random() * 4);
            $scope.stacked.push({
                value: Math.floor(Math.random() * 30 + 1),
                type: types[index]
            });
        }
    };

    $scope.randomStacked();
});

myApp.controller('PositionDemoCtrl', function ($scope, $window, $uibPosition) {

    $scope.elemVals = {};
    $scope.parentScrollable = true;
    $scope.parentRelative = true;

    $scope.getValues = function () {
        var divEl = $window.document.querySelector('#posdemodiv');
        var btnEl = $window.document.querySelector('#posdemobtn');

        var offsetParent = $uibPosition.offsetParent(divEl);
        $scope.elemVals.offsetParent = 'type: ' + offsetParent.tagName + ', id: ' + offsetParent.id;

        var scrollParent = $uibPosition.scrollParent(divEl);
        $scope.elemVals.scrollParent = 'type: ' + scrollParent.tagName + ', id: ' + scrollParent.id;

        $scope.scrollbarWidth = $uibPosition.scrollbarWidth();

        $scope.elemVals.position = $uibPosition.position(divEl);

        $scope.elemVals.offset = $uibPosition.offset(divEl);

        $scope.elemVals.viewportOffset = $uibPosition.viewportOffset(divEl);

        $scope.elemVals.positionElements = $uibPosition.positionElements(btnEl, divEl, 'auto bottom-left');
    };
});

myApp.controller('PopoverDemoCtrl', function ($scope, $sce) {
    $scope.dynamicPopover = {
        content: 'Hello, World!',
        templateUrl: 'myPopoverTemplate.html',
        title: 'Title'
    };

    $scope.placement = {
        options: [
            'top',
            'top-left',
            'top-right',
            'bottom',
            'bottom-left',
            'bottom-right',
            'left',
            'left-top',
            'left-bottom',
            'right',
            'right-top',
            'right-bottom'
        ],
        selected: 'top'
    };

    $scope.htmlPopover = $sce.trustAsHtml('<b style="color: red">I can</b> have <div class="label label-success">HTML</div> content');
});

myApp.controller('PaginationDemoCtrl', function ($scope, $log) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function () {
        $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
});

myApp.controller('PagerDemoCtrl', function ($scope) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;
});

myApp.controller('ModalDemoCtrl', function ($uibModal, $log, $document) {
    var $ctrl = this;
    $ctrl.items = ['item1', 'item2', 'item3'];

    $ctrl.animationsEnabled = true;

    $ctrl.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return $ctrl.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $ctrl.openComponentModal = function () {
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            component: 'modalComponent',
            resolve: {
                items: function () {
                    return $ctrl.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
            $log.info('modal-component dismissed at: ' + new Date());
        });
    };

    $ctrl.openMultipleModals = function () {
        $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title-bottom',
            ariaDescribedBy: 'modal-body-bottom',
            templateUrl: 'stackedModal.html',
            size: 'sm',
            controller: function ($scope) {
                $scope.name = 'bottom';
            }
        });

        $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'stackedModal.html',
            size: 'sm',
            controller: function ($scope) {
                $scope.name = 'top';
            }
        });
    };

    $ctrl.toggleAnimation = function () {
        $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
    };
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

myApp.controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.selected = {
        item: $ctrl.items[0]
    };

    $ctrl.ok = function () {
        $uibModalInstance.close($ctrl.selected.item);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

myApp.component('modalComponent', {
    templateUrl: 'myModalContent.html',
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    controller: function () {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $ctrl.items = $ctrl.resolve.items;
            $ctrl.selected = {
                item: $ctrl.items[0]
            };
        };

        $ctrl.ok = function () {
            $ctrl.close({$value: $ctrl.selected.item});
        };

        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
        };
    }
});



myApp.controller('DropdownCtrl', function ($scope, $log) {
    $scope.items = [
        'The first choice!',
        'And another choice for you.',
        'but wait! A third!'
    ];

    $scope.status = {
        isopen: false
    };

    $scope.toggled = function (open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
});

myApp.controller('DateParserDemoCtrl', function ($scope, uibDateParser) {
    $scope.format = 'yyyy/MM/dd';
    $scope.date = new Date();
});

myApp.controller('CollapseDemoCtrl', function ($scope) {
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;
});

myApp.controller('CarouselDemoCtrl', function ($scope) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function () {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: '//unsplash.it/' + newWidth + '/300',
            text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
            id: currIndex++
        });
    };

    $scope.randomize = function () {
        var indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
    };

    for (var i = 0; i < 4; i++) {
        $scope.addSlide();
    }

    // Randomize logic below

    function assignNewIndexesToSlides(indexes) {
        for (var i = 0, l = slides.length; i < l; i++) {
            slides[i].id = indexes.pop();
        }
    }

    function generateIndexesArray() {
        var indexes = [];
        for (var i = 0; i < currIndex; ++i) {
            indexes[i] = i;
        }
        return shuffle(indexes);
    }

    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
        var tmp, current, top = array.length;

        if (top) {
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        }

        return array;
    }
});

myApp.controller('ButtonsCtrl', function ($scope) {
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
        left: false,
        middle: true,
        right: false
    };

    $scope.checkResults = [];

    $scope.$watchCollection('checkModel', function () {
        $scope.checkResults = [];
        angular.forEach($scope.checkModel, function (value, key) {
            if (value) {
                $scope.checkResults.push(key);
            }
        });
    });
});

myApp.controller('AlertDemoCtrl', function ($scope) {
    $scope.alerts = [
        {type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'},
        {type: 'success', msg: 'Well done! You successfully read this important alert message.'}
    ];

    $scope.addAlert = function () {
        $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
});
myApp.controller('AccordionDemoCtrl', function ($scope) {
    console.log("in AccordionDemoCtrl");
    $scope.oneAtATime = true;

    $scope.groups = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function () {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };
});



myApp.controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});
myApp.controller('MainCtrl', function($scope, $http, $document, $uibModal, orderByFilter) {
//function MainCtrl($scope, $http, $document, $uibModal, orderByFilter) {
    // Grab old version docs
    console.log("in main ctrl");
    $http({
      method: 'GET',
      url: '/version'
   }).then(function (response){
        console.log(response);
        $scope.data = response;
   },function (error){
console.log("there is an error in /version api");
   });
    //$http.get('/version')
    //.then(function (data){
    //    $scope.data.products = data;
    //    console.log(data);
    //})
    //.error(function (error){
    //    $scope.data.error=error;
    //    console.log($scope.data.error.status); // Undefined!
    //    // (This is the spot that I don't get it.)
    //});
    //$http.get('/version')
    //    .then(function(result) {
    //        console.log(result);
    //        $scope.oldDocs = result.data;
    //    }).catch(angular.noop); // Edit: This is to handle an error that keeps appearing.

    $scope.showBuildModal = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'buildModal.html',
            controller: 'SelectModulesCtrl',
            resolve: {
                modules: function(buildFilesService) {
                    return buildFilesService.getModuleMap()
                        .then(function (moduleMap) {
                            return Object.keys(moduleMap);
                        });
                }
            }
        });
    };

    $scope.showDownloadModal = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'downloadModal.html',
            controller: 'DownloadCtrl'
        });
    };
})
myApp.controller('SelectModulesCtrl', function($scope, $uibModalInstance, modules, buildFilesService) {
// function SelectModulesCtrl($scope, $uibModalInstance, modules, buildFilesService) {
    $scope.selectedModules = [];
    $scope.modules = modules;

    $scope.selectedChanged = function(module, selected) {
        if (selected) {
            $scope.selectedModules.push(module);
        } else {
            $scope.selectedModules.splice($scope.selectedModules.indexOf(module), 1);
        }
    };

    $scope.downloadBuild = function () {
        $uibModalInstance.close($scope.selectedModules);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

    $scope.isOldBrowser = function () {
        return isOldBrowser;
    };

    $scope.build = function (selectedModules, version) {
        /* global JSZip, saveAs */
        var moduleMap, rawFiles;

        buildFilesService.get().then(function (buildFiles) {
            moduleMap = buildFiles.moduleMap;
            rawFiles = buildFiles.rawFiles;

            generateBuild();
        });

        function generateBuild() {
            var srcModuleNames = selectedModules
                .map(function (module) {
                    return moduleMap[module];
                })
                .reduce(function (toBuild, module) {
                    addIfNotExists(toBuild, module.name);

                    module.dependencies.forEach(function (depName) {
                        addIfNotExists(toBuild, depName);
                    });
                    return toBuild;
                }, []);

            var srcModules = srcModuleNames
                .map(function (moduleName) {
                    return moduleMap[moduleName];
                });

            var srcModuleFullNames = srcModules
                .map(function (module) {
                    return module.moduleName;
                });

            var srcJsContent = srcModules
                .reduce(function (buildFiles, module) {
                    return buildFiles.concat(module.srcFiles);
                }, [])
                .map(getFileContent)
                .join('\n')
            ;

            var jsFile = createNoTplFile(srcModuleFullNames, srcJsContent);

            var tplModuleNames = srcModules
                .reduce(function (tplModuleNames, module) {
                    return tplModuleNames.concat(module.tplModules);
                }, []);

            var tplJsContent = srcModules
                .reduce(function (buildFiles, module) {
                    return buildFiles.concat(module.tpljsFiles);
                }, [])
                .map(getFileContent)
                .join('\n')
            ;

            var jsTplFile = createWithTplFile(srcModuleFullNames, srcJsContent, tplModuleNames, tplJsContent);

            var cssContent = srcModules
                .map(function (module) {
                    return module.css;
                })
                .filter(function (css) {
                    return css;
                })
                .join('\n')
            ;

            var cssJsContent = srcModules
                .map(function (module) {
                    return module.cssJs;
                })
                .filter(function (cssJs) {
                    return cssJs;
                })
                .join('\n')
            ;

            var footer = cssJsContent;

            var zip = new JSZip();
            zip.file('ui-bootstrap-custom-' + version + '.js', rawFiles.banner + jsFile + footer);
            zip.file('ui-bootstrap-custom-' + version + '.min.js', rawFiles.banner + uglify(jsFile + footer));
            zip.file('ui-bootstrap-custom-tpls-' + version + '.js', rawFiles.banner + jsTplFile + footer);
            zip.file('ui-bootstrap-custom-tpls-' + version + '.min.js', rawFiles.banner + uglify(jsTplFile + footer));
            zip.file('ui-bootstrap-custom-tpls-' + version + '.min.js', rawFiles.banner + uglify(jsTplFile + footer));

            if (cssContent) {
                zip.file('ui-bootstrap-custom-' + version + '-csp.css', rawFiles.cssBanner + cssContent);
            }

            saveAs(zip.generate({type: 'blob'}), '/static/ui-bootstrap-custom-build.zip');
        }

        function createNoTplFile(srcModuleNames, srcJsContent) {
            return 'angular.module("ui.bootstrap", [' + srcModuleNames.join(',') + ']);\n' +
                srcJsContent;
        }

        function createWithTplFile(srcModuleNames, srcJsContent, tplModuleNames, tplJsContent) {
            var depModuleNames = srcModuleNames.slice();
            depModuleNames.unshift('"ui.bootstrap.tpls"');

            return 'angular.module("ui.bootstrap", [' + depModuleNames.join(',') + ']);\n' +
                'angular.module("ui.bootstrap.tpls", [' + tplModuleNames.join(',') + ']);\n' +
                srcJsContent + '\n' + tplJsContent;

        }

        function addIfNotExists(array, element) {
            if (array.indexOf(element) == -1) {
                array.push(element);
            }
        }

        function getFileContent(fileName) {
            return rawFiles.files[fileName];
        }

        function uglify(js) {
            /* global UglifyJS */

            var ast = UglifyJS.parse(js);
            ast.figure_out_scope();

            var compressor = UglifyJS.Compressor();
            var compressedAst = ast.transform(compressor);

            compressedAst.figure_out_scope();
            compressedAst.compute_char_frequency();
            compressedAst.mangle_names();

            var stream = UglifyJS.OutputStream();
            compressedAst.print(stream);

            return stream.toString();
        }
    };
})
myApp.controller('DownloadCtrl', function($scope, $uibModalInstance) {

// function DownloadCtrl($scope, $uibModalInstance) {
    $scope.options = {
        minified: true,
        tpls: true
    };

    $scope.download = function (version) {
        var options = $scope.options;

        var downloadUrl = ['ui-bootstrap-'];
        if (options.tpls) {
            downloadUrl.push('tpls-');
        }
        downloadUrl.push(version);
        if (options.minified) {
            downloadUrl.push('.min');
        }
        downloadUrl.push('.js');

        return downloadUrl.join('');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
})

/*
 * The following compatibility check is from:
 *
 * Bootstrap Customizer (http://getbootstrap.com/customize/)
 * Copyright 2011-2014 Twitter, Inc.
 *
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see http://creativecommons.org/licenses/by/3.0/.
 */
var isOldBrowser;
(function () {

    var supportsFile = (window.File && window.FileReader && window.FileList && window.Blob);
    function failback() {
        isOldBrowser = true;
    }
    /**
     * Based on:
     *   Blob Feature Check v1.1.0
     *   https://github.com/ssorallen/blob-feature-check/
     *   License: Public domain (http://unlicense.org)
     */
    var url = window.URL;
    var svg = new Blob(
        ['<svg xmlns=\'http://www.w3.org/2000/svg\'></svg>'],
        { type: 'image/svg+xml;charset=utf-8' }
    );
    var objectUrl = url.createObjectURL(svg);

    if (/^blob:/.exec(objectUrl) === null || !supportsFile) {
        // `URL.createObjectURL` created a URL that started with something other
        // than "blob:", which means it has been polyfilled and is not supported by
        // this browser.
        failback();
    } else {
        angular.element('<img/>')
            .on('load', function () {
                isOldBrowser = false;
            })
            .on('error', failback)
            .attr('src', objectUrl);
    }

})();
