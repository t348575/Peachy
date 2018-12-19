var two = [];
var i = 0;
var back = "", front = "";
var palette = new DistinctColors({ count: 100 });
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}
function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    return "#" + padZero(r) + padZero(g) + padZero(b);
}
function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
function change_color() {
    var string = "rgb(" + palette[i]._rgb[0] + "," + palette[i]._rgb[1] + "," + palette[i]._rgb[2] + "," + palette[i]._rgb[3] + ")";
    back = rgb2hex(string)
    front = invertColor(rgb2hex(string))
    i++;
}
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return 0;
    }
    return results[1] || 0;
}
function countdown(time) {
    var countDownDate = new Date(time);
    var countdownfunction1 = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s";
        if (distance <= 0) {
            clearInterval(countdownfunction1);
            document.getElementById("countdown").innerHTML = "Time up!";
            $('#add1').remove();
        }
    }, 1000);
}
var app = angular.module('display', []);
app.controller('point', function ($scope, $http) {
    $scope.one = [];
    $scope.getdetails = function () {
        var x = "./data/msgboard/" + $.urlParam('id') + '.json';
        $http.get(x)
            .then(function (response) {
                $scope.topic = response.data.topic;
                $scope.by = response.data.name;
                countdown(response.data.time);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    $scope.firsthundred = function() {
        var x = "./stats/msgboard/values/" + $.urlParam('id') + '.json';
        $http.get(x)
            .then(function(response) {
                var count = 0;
                for (var k in response.data) {  
                    if (response.data.hasOwnProperty(k)) {
                        ++count;
                    }
                }
                if(count<100) {
                    $scope.at = Object.entries(response.data).slice(0, count).map(entry => entry[1]);
                    for (var j = (count-1); j >= 0; j--) {
                        change_color();
                        $scope.at[j][2] = front;
                        $scope.at[j][3] = back;
                        $scope.one.push($scope.at[j]);
                    }
                }
                else {
                    $scope.at = Object.entries(response.data).slice(0, 100).map(entry => entry[1]);
                    for (var j = 99; j >= 0; j--) {
                        change_color();
                        $scope.at[j][2] = front;
                        $scope.at[j][3] = back;
                        $scope.one.push($scope.at[j]);
                    }
                }
            });
    }
});
var ctrl = 0;
function now() {
    var one = [];
    var x = "./stats/msgboard/data/" + $.urlParam('id') + '.json';
    $.getJSON(x, function (response) {
        var at = [];        
        var count = 0;
        for (var k in response) {
            if (response.hasOwnProperty(k)) {
                ++count;
            }
        }
        if (count < 100) {
            at = Object.entries(response).slice(0, count).map(entry => entry[1]);
            for (var j = (count - 1); j >= 0; j--) {
                change_color();
                at[j][2] = front;
                at[j][3] = back;
                one.push(at[j]);
            }
        }
        else {
            at = Object.entries(response).slice(0, 100).map(entry => entry[1]);
            for (var j = 99; j >= 0; j--) {
                change_color();
                at[j][2] = front;
                at[j][3] = back;
                one.push(at[j]);
            }
        }
        return one;
    });
    return one;
}
app.directive('heart', function () {
    var one = now();
    return {
        restrict: 'E',
        scope: {},
        templateUrl: './dependencies/icons/heart.html',
        link: function (scope, element, attrs) {
            scope.num = one[ctrl].likes,
            scope.installed = true,
            ctrl = ctrl +1,
            scope.index = ctrl,
            scope.download = function () {
                if(scope.installed) {
                    scope.num++;
                    element.children().toggleClass('fa-beat');    
                    element.find('#heart').removeClass('fa-grey');    
                    element.find('#heart').addClass('fa-red');    
                    setTimeout(function () {
                        element.children().toggleClass('fa-beat')
                    }, 100)
                    $.post('./php/calculate.php', { type: "msgboard", id: $.urlParam('id'), res: scope.index, plus: 1, mode: "likes" });
                    scope.installed = false;
                }
                else {
                    scope.num--;
                    element.children().toggleClass('fa-beat');   
                    element.find('#heart').removeClass('fa-red');    
                    element.find('#heart').addClass('fa-grey');    
                    setTimeout(function () {
                        element.children().toggleClass('fa-beat')
                    }, 100)
                    $.post('./php/calculate.php', { type: "msgboard", id: $.urlParam('id'), res: scope.index, plus: 0, mode: "likes" });
                    scope.installed = true;
                }
            }
        }
    };
});
var ctrl1 = 0;
app.directive('vote', function () {
    var one = now();
    return {
        restrict: 'E',
        scope: {},
        templateUrl: './dependencies/icons/vote.html',
        link: function (scope, element, attrs) {
            scope.numup = one[ctrl1].upvote,
            scope.numdown = one[ctrl1].downvote,
            ctrl1 = ctrl1 + 1,
            scope.index = ctrl1,
            scope.inclusive = false,
            scope.upvote = function () {
                    if(scope.inclusive == true) {
                        return true;
                    }
                    scope.numup++;
                    element.find('#up').toggleClass('fa-beat');
                    setTimeout(function () {
                        element.find('#up').toggleClass('fa-beat');
                    }, 100)
                    $.post('./php/calculate.php', { type: "msgboard", id: $.urlParam('id'), res: scope.index, plus: 1, mode: "upvote" });
                    scope.installed = false;
                    scope.inclusive =  true;
            }
            scope.downvote = function () {
                if (scope.inclusive == true) {
                    return true;
                }
                scope.numdown++;
                element.find('#down').toggleClass('fa-beat');
                setTimeout(function () {
                    element.find('#down').toggleClass('fa-beat');
                }, 100)
                $.post('./php/calculate.php', { type: "msgboard", id: $.urlParam('id'), res: scope.index, plus: 1, mode: "downvote" });
                scope.inclusive = true;
            }
        }
    };
});