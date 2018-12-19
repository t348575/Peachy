var loginstate = false;
var count = 0;
var loginvar;
var voted = false;
$.post('./php/accounts/state.php', function (data) {
    if (data == "notverify") {
        alert("Verify account first!");
    }
    if (data != 'end' && data != 'noexist') {
        loginstate = true;
        loginvar = data;
        $('#signup').parent().css('display', 'none');
        $('#accountbtn').css('display', 'inline');
        $('#log').html('Logout');
    }
});
$(function () {
    $('label').click(function () {
        $(this).prev().prev().prev().focus();
    });
    $('#collapsibleNavbar').on('hide.bs.collapse', function () {
        $('.navbar-toggler').removeClass('open');
    });
    $('#collapsibleNavbar').on('show.bs.collapse', function () {
        $('.navbar-toggler').addClass('open');
    });
    var id = $.urlParam('id');
    var type = $.urlParam('type');
    if (id == 0 && type != "poll") {
        alert('No poll to display!');
        window.location.replace('./poll.html');
    }
    else {
        $.post('php/url.php', { id: id, type: "poll" }, function (data) {
            if(data=="non_exist") { 
                alert('No poll to display!');
                window.location.replace('./poll.html');
            }
            if (data == "clear") {
                one();
            }
            else {
                results(voted);
            }
        });
    }
});
function validateEmail(emailField) {
    var reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (emailField.value.length == 0) {
        $('#lemail').next().next().removeClass('bad');
        $('#lemail').next().next().next().removeClass('badlabel');
        $('#lemail').next().next().addClass('bar');
        return true;
    }
    if (reg.test(emailField.value) == false) {
        $('#lemail').next().next().removeClass('bar');
        $('#lemail').next().next().next().addClass('badlabel');
        $('#lemail').next().next().addClass('bad');
        return false;
    }
    $('#lemail').next().next().removeClass('bad');
    $('#lemail').next().next().next().removeClass('badlabel');
    $('#lemail').next().next().addClass('bar');
    return true;
}
$(window).resize(function () {
    resize();
});
function resize() {
    var w = window.innerWidth;
    if (w > 768) {
        $('#countdown').addClass('ml-auto');
        $('#mainpoint').removeClass('col-12');
        $('#mainpoint').addClass('col-8');
        $('#in').css('display', 'inline');
        $('#in1').css('display', 'inline');
    }
    if (w < 768) {
        $('#countdown').removeClass('ml-auto');
        $('#mainpoint').removeClass('col-8');
        $('#mainpoint').addClass('col-12');
        $('#in').css('display', 'none');
        $('#in1').css('display', 'none');
    }
};
$(document).ready(function () {
    resize();
    $('[data-toggle="tooltip"]').tooltip();
    $(document).keypress(function (event) {
        if (event.which == 13) {
            check();
        }
    });
    $('#create').click(function () {
        if (($('#lemail').val()).length == 0) {
            $('#lemail').next().next().removeClass('bar');
            $('#lemail').next().next().addClass('bad');
        }
        if (($('#pwd').val()).length == 0) {
            $('#pwd').next().next().removeClass('bar');
            $('#pwd').next().next().addClass('bad');
            return false;
        }
        if (validateEmail(document.getElementById('lemail')) == true) {
            $('#errormsg').text('');
            $('#errormsg').siblings().remove();
            $('#incorrect').css('display', 'none');
            $('#lform').fadeOut(200);
            $('#lload').fadeIn(200);
            var email = $('#lemail').val();
            var pwd = $('#pwd').val();
            $.post('/php/accounts/signup.php', { email: email, pwd: pwd }, function (data) {
                if (data == 'valid') {
                    $('#lload').fadeOut(0);
                    $('#errormsg').text('Success!');
                    $('#errormsg').after('<p> Check Your Email to Verify Account and use Our Services. ( Email might be at spam! )</p>');
                    $('#incorrect').css('display', 'inline');
                }
                else if (data == "false") {
                    $('#errormsg').text("Error")
                    $('#lload').fadeOut(0);
                    $('#lform').fadeIn(200);
                    $('#errormsg').after("<p>  Giver user already exists!</p>");
                    $('#incorrect').css('display', 'inline');
                }
                else {
                    $('#errormsg').text("Error")
                    $('#lload').fadeOut(0);
                    $('#lform').fadeIn(200);
                    $('#errormsg').after("<p>  Connection problem! Check if email exists, and check if internet connection is valid!</p>");
                    $('#incorrect').css('display', 'inline');
                }
            });
        }
    });
    $('#submit').click(function () { check(); });
    function check() {
        if (($('#lemail').val()).length == 0) {
            $('#lemail').next().next().removeClass('bar');
            $('#lemail').next().next().addClass('bad');
        }
        if (($('#pwd').val()).length == 0) {
            $('#pwd').next().next().removeClass('bar');
            $('#pwd').next().next().addClass('bad');
            return false;
        }
        if (validateEmail(document.getElementById('lemail')) == true) {
            $('#errormsg').text('');
            $('#errormsg').siblings().remove();
            $('#incorrect').css('display', 'none');
            $('#pwd').next().next().removeClass('bad');
            $('#pwd').next().next().addClass('bar');
            $('#lemail').next().next().removeClass('bad');
            $('#lemail').next().next().addClass('bar');
            $('#lform').fadeOut(200);
            $('#lload').delay(200).fadeIn(200);
            var email = $('#lemail').val();
            var pwd = $('#pwd').val();
            $.post('/php/accounts/login.php', { email: email, pwd: pwd }, function (data) {
                loginvar = data;
                if (data == 'valid' || data == 'full') {
                    loginstate = true;
                    $('#lload').fadeOut(0);
                    $('#login').modal('hide');
                    $('#beg').css('display', 'none');
                    $('#log').html('Logout');
                    $('#accountbtn').css('display', 'inline');
                    $('#signup').parent().css('display', 'none');
                }
                else if (data == 'no') {
                    $('#lload').fadeOut(0);
                    $('#lform').fadeIn(200);
                    $('#errormsg').text("Error")
                    $('#errormsg').after("<p>  Giver user password combination does'nt exist!</p>");
                    $('#incorrect').css('display', 'inline');
                }
                else if (data == 'notverify') {
                    $('#lload').fadeOut(0);
                    $('#errormsg').text("Error")
                    $('#errormsg').after("<p>  Account has'nt been verified!</p>");
                    $('#incorrect').css('display', 'inline');
                }
            });
        }
    }
});
function precheck() {
    if (loginstate == false) {
        $('#signup').parent().css('display', '');
        $('#login').modal('show');
        $('#accountbtn').css('display', 'none');
    }
    if (loginstate == true) {
        var email = $('#lemail').val();
        $.post('./php/accounts/logout.php');
        $('#log').html('Login');
        $('#accountbtn').css('display', 'none');
        $('#signup').parent().css('display', '');
        loginstate = false;
    }
}
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return 0;
    }
    return results[1] || 0;
}
function one() {
    $('body').addClass('bodyanimation');
    var url = $.urlParam('id');
    $.post('./php/analytics.php', { id: url, type: "poll", time: new Date()});
    $.getJSON('/data/poll/' + url + '.json', function (result) {
        count1 = Object.keys(result.option).length;
        var endtime = new Date(result.time);
        var now = new Date();
        if(endtime>now) {
            $('.sk-folding-cube').css('display', 'none');
            $('.card-title:first-child').text(result.title);
            var countDownDate = new Date(result.time);
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
                    results(voted);
                }
            }, 1000);
            if (result.imgwant == "no") {
                var i = 1;
                $.each(result.option, function (index) {
                    var place = "<div class='row tab'><div class='btnholder" + i + " col-12 text-center'><button class='clickpnt btn btn-outline-dark' id='" + i + "'>" + result.option[index] + "</button></div></div>";
                    $('#holder').append(place);
                    i++;
                });
            }
            if(result.imgwant == "yes"){ 
                var i = 1;
                $.each(result.option, function (index) {
                    var image = "img";
                    image += index.slice(3, 4);
                    $.ajax({url: result.img["img" + i], async: false, success: function(data){
                        var place = "<div class='row tab'><div class='btnholder" + i + " col-xs-12 col-md-10 text-center'><button class='clickpnt btn btn-outline-dark' id='" + i + "'>" + result.option[index] + "</button></div><div class='col-xs-12 col-md-2 text-center'><img src='" + data + "' class='thumbnail img-fluid img-thumbnail'></div></div>";
                        $('#holder').append(place);
                    }});
                    i++;
                });
            }
            $('.clickpnt').on('click', function () {  
                voted = true;
                var count = $(this).attr('id')
                id = $.urlParam('id');
                var localip = "";
                getUserIP(function (ip) { localip = ip });
                var time = new Date(result.time).getTime();
                var ntime = parseInt(time);
                $.post('./php/url.php', { id: id, type: "pollw", count: count, time: ntime,local: localip })
                .done(function(){
                    $.getJSON('/stats/poll/values/' + id + '.json', function (data) {
                        var resu = eval(data);
                        var sum = 0, num = 0;
                        for (i = 1; i <= count1; i++) {
                            sum += resu.option[i];
                        }
                        for (var abc = 1; abc <= count1; abc++) {
                            var image = "opt";
                            image += abc;
                            num = resu.option[abc];
                            perc = Math.round((num / sum) * 100);
                            var place = "<div class='progress'><div class='progress-bar' style='width: " + perc + "%;'></div></div> <div class='text-center'><h4 class='unselectable'>" + result.option[image] + " with: " + perc + "%</h4></div>";
                            $('.btnholder' + abc).find('button').remove();
                            $('.btnholder' + abc).append(place);
                            image = "";
                        }
                    });
                });
            });
        }
        else {
            results(voted);
        }
    });
}
function results(call) {
    var perc = 0;
    id = $.urlParam('id');
    if(call==false) {
        $('body').addClass('bodyanimation');
        $.getJSON('/data/poll/' + id + ".json", function(result){
            count1 = Object.keys(result.option).length;
            $('.sk-folding-cube').css('display', 'none');
            $('.card-title:first-child').text(result.title);
            var countDownDate = new Date(result.time);
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
                    results(voted);
                }
            }, 1000);
            var i = 1;
            if (result.imgwant == "no") {
                $.getJSON('/stats/poll/values/' + id + '.json', function (data) {
                    var resu = eval(data);
                    var sum = 0, num = 0;
                    for (i = 1; i <= count1; i++) {
                        sum += resu.option[i];
                    }
                    i = 1;
                    $.each(result.option, function (index) {
                        num = resu.option[i];
                        i++;
                        perc = Math.round((num / sum) * 100);
                        var place = "<div class='row tab'><div class='btnholder" + index + " col-12 text-center'><div class='progress'><div class='progress-bar' style='width: " + perc + "%;'></div></div> <div class='text-center'><h4 class='unselectable'>" + result.option[index] + " with: " + perc + "%</h4></div></div></div>";
                        $('#holder').append(place);
                    });
                });
            }
            else if (result.imgwant == "yes") {
                $.getJSON('/stats/poll/values/' + id + '.json', function (data) {
                    var resu = eval(data);
                    var sum = 0, num = 0;
                    for (i = 1; i <= count1; i++) {
                        sum += resu.option[i];
                    }
                    i = 1;
                    $.each(result.option, function (index) {
                        num = resu.option[i];
                        i++;
                        perc = Math.round((num / sum) * 100);
                        var image = "img";
                        image += index.slice(3, 4);
                        $.ajax({
                            url: result.img["img" + (i-1)], async: false, success: function (data) {
                                var place = "<div class='row tab'><div class='btnholder" + index + " col-xs-12 col-md-10 text-center'><div class='progress-bar' style='width: " + perc + "%;'></div><div class='text-center'><h4 class='unselectable'>" + result.option[index] + " with: " + perc + "%</h4></div></div><div class='col-xs-12 col-md-2 text-center'><img src='" + data + "' class='thumbnail img-fluid img-thumbnail'></div></div>";
                                $('#holder').append(place);
                            }
                        });
                    });
                });
            }
        });
    }   
}
var randomString = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function send() {
    var key = randomString(128);
    $.post('./php/accounts/mng.php', { id: key }, function (data) {
        window.location.replace("./accountinfo.html?key=" + key);
    });
}
function closelogin() {
    $('#login').modal('toggle');
    $('#errormsg').text('');
    $('#errormsg').siblings().remove();
    $('#incorrect').css('display', 'none');
    $('#pwd').val('');
    $('#lemail').val('');
    $('#lform').fadeIn(0);
}
function getUserIP(onNewIP) {
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
        noop = function () { },
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;
    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }
    pc.createDataChannel("");
    pc.createOffer().then(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });
        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function (reason) {
    });
    pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}
