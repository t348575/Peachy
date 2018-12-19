/*var hold = new Array();
var opt = [1,2,3,4];
var time = 0;
var newopt = new Array();
var data = new Array();
var newdata = new Array();
var score = 0;
var tries = 0;
var oresult, ocount;
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return 0;
    }
    return results[1] || 0;
}
$(window).resize(function() {
    colsize();
});
function colsize() {
    var type="";
    var id = $.urlParam('id');
    $.getJSON('./data/quiz/' + id + ".json", function (result) {
        type = result.option;
        if (type == "Step-Wise") {
            var w = window.innerWidth;
            if (w > 800) {
                $('#mainpoint').removeClass('col-12');
                $('#mainpoint').addClass('col-8');
                $('#in').removeClass('col-4');
                $('#in1').removeClass('col-4');
                $('#in').addClass('col-2');
                $('#in1').addClass('col-2');
                $('#in').css('display', 'inline');
                $('#in1').css('display', 'inline');
            }
            if (w < 800) {
                $('#mainpoint').removeClass('col-8');
                $('#mainpoint').addClass('col-12');
                $('#in').css('display', 'none');
                $('#in1').css('display', 'none');
            }
        }
        else {
            var w = window.innerWidth;
            if (w > 800) {
                $('#mainpoint').removeClass('col-12');
                $('#mainpoint').addClass('col-4');
                $('#in').removeClass('col-2');
                $('#in1').removeClass('col-2');
                $('#in').addClass('col-4');
                $('#in1').addClass('col-4');
                $('#in').css('display', 'inline');
                $('#in1').css('display', 'inline');
            }
            if (w < 800) {
                $('#mainpoint').removeClass('col-4');
                $('#mainpoint').addClass('col-12');
                $('#in').css('display', 'none');
                $('#in1').css('display', 'none');
            }
        }
    });
}
$(document).ready(function() {
    $('#create').click(function () {
        if (validateEmail(document.getElementById('lemail')) == true && $('#pwd').val().length > 0) {
            $('#lform').fadeOut(200);
            $('#lload').delay().fadeIn(200);
            var email = $('#lemail').val();
            var pwd = $('#pwd').val();
            $.post('/php/accounts/signup.php', { email: email, pwd: pwd }, function (data) {
                if (data == 'success') {
                    $('#lload').fadeOut(0);
                    $('#incorrect').removeClass('alert-danger');
                    $('#incorrect').removeClass('alert-success');
                    $('#errormsg').text();
                    $('#errormsg').text('Success!');
                    $('#errormsg').after(' Check Your Email to Verify Account and use Our Services. ( Email might be at spam! )');
                    $('#incorrect').css('display', 'inline');
                }
                else if (data == "taken") {
                    $('#errormsg').after("");
                    $('#lload').fadeOut(0);
                    $('#lform').fadeIn(200);
                    $('#errormsg').after("  Giver user already exists!");
                    $('#incorrect').css('display', 'inline');
                }
                else {
                    $('#errormsg').after("");
                    $('#lload').fadeOut(0);
                    $('#lform').fadeIn(200);
                    $('#errormsg').after("  Connection problem! Check if email exists, and check if internet connection is valid!");
                    $('#incorrect').css('display', 'inline');
                }
            });
        }
    });
    $('#submit').click(function () { check(); });
    function check() {
        if (validateEmail(document.getElementById('lemail')) == true && $('#pwd').val().length > 0) {
            $('#lform').fadeOut(200);
            $('#lload').delay(200).fadeIn(200);
            var email = $('#lemail').val();
            var pwd = $('#pwd').val();
            $.post('/php/accounts/login.php', { email: email, pwd: pwd }, function (data) {
                if (data == 'clear') {
                    loginstate = true;
                    $('#lload').fadeOut(0);
                    $('#login').modal('hide');
                    $('#beg').css('display', 'none');
                    $('#log').html('Logout');
                    $('#accountbtn').css('display', 'inline');
                    $('#signup').parent().css('display', 'none');
                }
                else if (data == 'loggedin') {
                    $('#lload').fadeOut(0);
                    $('#lform').fadeIn(200);
                    $('#errormsg').after(data);
                    $('#incorrect').css('display', 'inline');
                }
                else if (data == 'none') {
                    $('#lload').fadeOut(0);
                    $('#lform').fadeIn(200);
                    $('#errormsg').after("  Giver user password combination does'nt exist!");
                    $('#incorrect').css('display', 'inline');
                }
                else if (data == 'notverify') {
                    $('#lload').fadeOut(0);
                    $('#errormsg').after("&nbspAccount has'nt been verified!");
                    $('#incorrect').css('display', 'inline');
                }
                else if (data == 'full') {
                    $('#lload').fadeOut(0);
                    $('#errormsg').after("&nbspAll 20 free services have been used!");
                    $('#incorrect').css('display', 'inline');
                }
            });
        }
    }
    colsize();
    $("button").click(function () {
        var name = $(this).attr('id');
        name = name.slice(3, 4);
        if (name == 1) {
            time++;
            score++
            $('img').addClass('ripple');
            setTimeout(function() {
                $('img').css('opacity', 0);
                $('img').removeClass('ripple');
                startquizselect(oresult, ocount);
            }, 1200);
        }
        else {
            time++;
            $('img').addClass('badripple');
            setTimeout(function () {
                $('img').css('opacity', 0);
                $('img').removeClass('badripple');
                startquizselect(oresult, ocount);
            }, 1200);
        }
    });
    checkaccess();
});
function checkaccess() {
    var url = $.urlParam('id');
    if (url == 0) { done(); }
    else {
        $.post('php/url.php', { id: url, type: "quiz" }, function (data) {
            if (data == "clear") {
                handle();
            }
            else {
                done();
            }
        });
    }
}
function done() {
    alert('No Such Quiz Exists!');
    window.location.replace('./');
}
function handle() {
    var id = $.urlParam('id');
    $.getJSON('./data/quiz/' + id + ".json", function(result) {
        var type = result.option;
        var x = 0;
        if(type=="Step-Wise") {
            count = Object.keys(result.question).length;
            assignpos(count);
            $.each(result.img, function (index) {
                data[x] = result.img[index];
                x++;
            });
            match();
            oresult = result;
            ocount = count;
            $('h2').text(result.title);
            $('#quizselect').css('display', 'block');
            startquizselect(result, count);
        }
        else {
            $('#place').css('display', 'inline');
            count = Object.keys(result.question).length;
            assignpos(count);
            $.each(result.img, function (index) {
                data[x] = result.img[index];
                x++;
            });
            match();
            for(var z=1; z<=count;z++) {
                $('li:nth-child(' + z + ')').find('img').attr('src', newdata[z-1]);
                $('li:nth-child(' + z + ')').find('.overlay').attr('id', 'ques' + hold[z-1]);
            }
            for(var q=count+1; q<=15; q++) {
                $('li:nth-child(' + q + ')').css('display', 'none');
            }
            $('h2').text(result.title);
            $('#place').css('display', 'inline');
            startquizimg(result, count);
        }
    });
}
function startquizimg(result, count) {
    $('#qp').text(result.question.ques1);
    var i = 1;
    var numid = 0;
    $('.overlay').click(function() {
        var id = $(this).attr('id');
        id = id.slice(4,5);
        numid = parseInt(id);
        var newid = "ques";
        if(i==id) {
            if($(this).hasClass('done')) {}
            else {
                if(i==count) {
                    $('ul').animate({ opacity: '0' }, 1000);
                    $('h3').animate({ opacity: '0' }, 1000);
                    setTimeout(function () {
                        $('ul').css('display', 'none');
                        $('#doneee').css('display', 'inline');
                        $('#calculate').css('display', 'inline');
                        $('#lload').css('display', 'inline');
                        setTimeout(function() {
                            $('#lload').css('display', 'none');
                            perc = (score/count) * 100;
                            $('#calculate').css('display', 'none');
                            var give = "";
                            if(perc>90) {
                                give = "Excellent! You Scored " + score + " out of " + count;
                            }
                            else if (perc>50) {
                                give = "Not Bad! You Scored " + score + " out of " + count;
                            }
                            else if (perc<25) {
                                give = "Poor! You Scored " + score + " out of " + count;
                            }
                            else {
                                give = "Disaster! You Scored " + score + " out of " + count;
                            }
                            $('#end').append("<br><br><h2>" + give + "</h2>");
                            setTimeout(function() {
                                var id = $.urlParam('id');
                                $.post('./php/quizlog.php', { id: id });
                                window.location.replace('./');
                            },3000)
                        }, 800);
                    }, 1000);
                }
                score++;
                score = score - tries;
                tries = 0;
                newid = newid + i;
                $('#qp').text(result.question['ques' + (i+1)]);
                $(this).css('background-color', 'lightgreen');
                $(this).animate({ opacity: "1" }, 250);
                $(this).delay(400).animate({ opacity: "0.5" }, 250);
                $(this).children().html("<i class='fas fa-check'></i>");
                $(this).prev().css('opacity', '0.2');
                $(this).addClass('done');
                newid = "ques";
                i++;
            }
        }
        else {
            if ($(this).hasClass('done')) {}
            else {
                tries++;
                $(this).css('background-color', '#ef3d47');
                $(this).animate({ opacity: "1" }, 250);
                $(this).delay(400).animate({ opacity: "0" }, 250);
                $(this).children().html("<i class='fas fa-times'></i>");
            }
        }
    });
}
function assignpos(count) {
    var min = 1
    var max = count;
    for(var i = 0; i<count; i++) {
        hold[i] = randomInt(min, max);
        while(!Lsearch(i)) {
            hold[i] = randomInt(min, max);
        }
    }
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Lsearchopt(i) {
    var item = opt[i];
    for (var j = 0; j < i; j++) {
        if (opt[j] == opt[i]) {
            return false;
        }
    }
    return true;
}
function Lsearch(i) {
    var item = hold[i];
    for(var j=0; j<i; j++) {
        if(hold[j] == hold[i]) {
            return false;
        }
    }
    return true;
}
function match() {
    var dist = hold.length;
    var now = 0;
    for(i=0;i<dist;i++) {
        now = hold[i];
        newdata[i] = data[now-1];
    }
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function startquizselect(result, count) {
    if(time==count) {
        $('.tab').css('display', 'none');
        $('.next').css('display', 'inline');
        $('#lload1').css('display', 'inline');
        setTimeout(function() {
            $('#lload1').css('display', 'none');
            $('#one').css('display', 'none');
            $('#two').text("You scored " + score + " out of " + count);
        }, 600);
        setTimeout(function() {
            window.location.replace('./');
        }, 5600);
    }
    shuffle(opt);
    var temp;
    for (var j = 1; j <= 4; j++) {
        temp = opt[j - 1];
        newopt[j - 1] = result.qoption["opt" + ((hold[time] * 4) + (temp - 1) - 3)];
        $('.tab').children().find('button:nth-child(' + j + ')').html(newopt[j - 1]);
        $('.tab').children().find("button:nth-child(" + j + ")").attr('id', "opt" + opt[j - 1]);
    }
    $('#quesimg').attr('src', newdata[time]);
    $('#question').text(result.question["ques" + hold[time]]);
    $('img').css('opacity', 1);
}
var loginstate = false;
$.post('./php/accounts/state.php', function (data) {
    if (data == 'loggedin') {
        loginstate = true;
        $('#beg').css('display', 'inline');
        $('#signup').parent().css('display', 'none');
        $('#accountbtn').css('display', 'inline');
        $('#log').html('Logout');
    }
    else if (data != "clear" || data != "full") {

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
        $('#beg').css('display', 'inline');
        $('#log').html('Login');
        $('#accountbtn').css('display', 'none');
        $.post('./php/accounts/logout.php');
        $('#signup').parent().css('display', '');
        loginstate = false;
    }
}
function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (emailField.value.length == 0) {
        return true;
    }
    if (reg.test(emailField.value) == false) {
        $('#lemail').toggleClass('bad');
        return false;
    }
    return true;
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
    var id = randomString(64);
    $.post('./php/accounts/accountmng.php', { id: id, type: "send" }, function (data) {
        if (data != "internal error!") {
            id = sha256(id);
            data = sha256(data);
            window.location.replace("./accountinfo.html?temp=" + id + "&id=" + data);
        }
        else {
            alert(data);
        }
    });
}*/
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
var loginstate = false;
var loginvar;
$.post('./php/accounts/state.php', function (data) {
    if (data != 'end' && data != 'noexist') {
        loginstate = true;
        loginvar = data;
        $('#beg').css('display', 'inline');
        $('#mainpoint').css('display', 'none');
        $('#signup').parent().css('display', 'none');
        $('#accountbtn').css('display', 'inline');
        $('#log').html('Logout');
        $.post("./php/accounts/returnname.php", function (data) {
            if (data != "false") {
                if (window.innerWidth >= 992) {
                    $('#accountbtn').popover({ title: "Welcome!", content: "Welcome, " + data, trigger: "manual", placement: "bottom", template: "<div class='popover' role='tooltip'><div class='arrow'></div><h3 class='popover-header'></h3><div class='popover-body'></div></div>" });
                    $('#accountbtn').popover("show");
                    setTimeout(function () {
                        $('#accountbtn').popover("hide");
                    }, 4000);
                }
                else {
                    $('.navbar-toggler').popover({ title: "Welcome!", content: "Welcome, " + data, trigger: "manual", placement: "bottom", template: "<div class='popover' role='tooltip'><div class='arrow'></div><h3 class='popover-header'></h3><div class='popover-body'></div></div>" });
                    $('.navbar-toggler').popover("show");
                    setTimeout(function () {
                        $('.navbar-toggler').popover("hide");
                    }, 4000);
                }
            }
        });
    }
});
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return 0;
    }
    return results[1] || 0;
}
function precheck() {
    if (loginstate == false) {
        $('#signup').parent().css('display', '');
        $('#login').modal('show');
        $('#accountbtn').css('display', 'none');
    }
    if (loginstate == true) {
        var email = $('#lemail').val();
        $.post('./php/accounts/logout.php');
        $('#beg').css('display', 'inline');
        $('#log').html('Login');
        $('#accountbtn').css('display', 'none');
        $('#signup').parent().css('display', '');
        window.location.reload();
        loginstate = false;
    }
}
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
$(document).ready(function() {
    resize();
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
                    $.post("./php/accounts/returnname.php", function (data) {
                        if (window.innerWidth >= 992) {
                            $('#accountbtn').popover({ title: "Welcome!", content: "Welcome, " + data, trigger: "manual", placement: "bottom" });
                            $('#accountbtn').popover("show");
                            setTimeout(function () {
                                $('#accountbtn').popover("hide");
                            }, 4000);
                        }
                        else {
                            $('.navbar-toggler').popover({ title: "Welcome!", content: "Welcome, " + data, trigger: "manual", placement: "bottom" });
                            $('.navbar-toggler').popover("show");
                            setTimeout(function () {
                                $('.navbar-toggler').popover("hide");
                            }, 4000);
                        }
                    });
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
$(function(){
    var id = $.urlParam('id');
    var type = $.urlParam('type');
    if (id == 0 && type != "quiz") {
        alert('No poll to display!');
        window.location.replace('./quiz.html');
    }
    else {
        $.post('php/url.php', { id: id, type: "quiz" }, function (data) {
            if (data == "0") {
                alert('No quiz to display!');
                window.location.replace('./quiz.html');
            }
            else {
                one();
            }
        });
    }
    $(".navbar-nav li a").click(function (event) {
        $(".navbar-collapse").collapse('hide');
    });
    $('#collapsibleNavbar').on('hide.bs.collapse', function () {
        $('.navbar-toggler').removeClass('open');
    });
    $('#collapsibleNavbar').on('show.bs.collapse', function () {
        $('.navbar-toggler').addClass('open');
    });
});
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
var alive = true;
function one() {
    var id = $.urlParam('id');
    $.post('./php/analytics.php', { id: id, type: "quiz", time: new Date() });
    $.getJSON("./data/quiz/" + id + ".json", function(result) {
        count = Object.keys(result.question).length;
        var countDownDate = new Date(result.time);
        var countdownfunction1 = setInterval(function () {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementById("time").innerHTML = days + "d " + hours + "h "
                + minutes + "m " + seconds + "s";
            if (distance <= 0) {
                clearInterval(countdownfunction1);
                document.getElementById("time").innerHTML = "Time up!";
                alive = false;
                $("#qp").fadeOut(0);
            }
        }, 1000);
        if(result.quiztype == "Image-Select") {
            $("#imageselect").fadeIn(300);
            startquiz(result, "image", count);
        }
        else {
            $("#imageselect").fadeIn(300);
            startquiz(result, "step", count);
        }
    });
}
function startquiz(result, type, count) {
    var min = 1
    var max = count;
    var data = new Array();
    var option = new Array();
    var img = new Array();
    var imgtemp = new Array();
    var answer = new Array();
    var x = 0;
    $.each(result.img, function (index) {
        $.ajax({
            url: result.img[index], async: false, success: function (data) {
                imgtemp[x] = data;
            }
        });
        x++;
    });
    for (var i = 0; i < count; i++) {
        if(type=="image") {
            var temp = randomInt(min, max);
            var stemp = randomInt(min, max);
            while (data[stemp] != null || img[temp - 1] != null) {
                temp = randomInt(min, max);
                stemp = randomInt(min, max);
            }
            img[temp - 1] = imgtemp[i];
            data[stemp] = result.question["ques" + (i + 1)];
            answer[stemp - 1] = temp;
        }
        if(type=="step") {
            /*for(var j=0;j<4;j++) {
                var innertemp = randomInt(0, 3);
                while (option[innertemp + i] != null) {
                    innertemp = randomInt(0, 3);
                }
                option[i+innertemp] = result.option[i+innertemp];
            }*/
        }
    }
    console.log(result.option);
    //console.log(option);
    if(type=="image") {
        var score = 0;
        var tries = 0;
        for(var i=0; i<count; i++) {
            var place = "<li><img src='" + img[i] + "' class='quizimgway'><div class='overlay' id='" + (i+1) + "'><div class='text'></div></div></li>"
            $("#imageselect").append(place);
        }
        $("#title").text("Quiz: " + result.title);
        $("#mainpoint").fadeIn(0);
        $("#start").fadeIn(0);
        var j = 0;
        $("#qp").text("Question: " + data[1]);
        $("ul").on("click", ".overlay", function (event) {
            if(alive==false){
                event.preventDefault();
            }
            else {
                var x = $(this).attr("id");
                if (x == answer[j]) {
                    $("#qp").text("Question: " + data[j + 2]);
                    if (!($(this).hasClass("done"))) {
                        $(this).css('background-color', 'lightgreen');
                        $(this).animate({ opacity: "1" }, 250);
                        $(this).delay(400).animate({ opacity: "0.5" }, 250);
                        $(this).children().html("<i class='fas fa-check'></i>");
                        $(this).prev().css('opacity', '0.2');
                        $(this).addClass('done');
                        score++;
                        j++;
                        if (j == count) {
                            var total = 0;
                            if (tries > score) {
                                total = score - (score / tries)
                            }
                            else {
                                total = score - (tries / score)
                            }
                            total = (total / count) * 100;
                            $("#qp").fadeOut(600);
                            $("#imageselect").fadeOut(600);
                            $("#tp").delay(600).fadeIn(600);
                            $("#tp").text("You scored " + Math.round(total) + "%");
                            $("#tp").append("<br><br>Share this quiz with others!");
                            $("#copy").fadeIn(0);
                            $("textarea").text(window.location.href);
                            $('#copyclip').click(function () {
                                $("textarea").select();
                                document.execCommand('copy');
                            });
                            $('textarea').click(function () {
                                $("textarea").select();
                                document.execCommand('copy');
                            });
                        }
                    }
                }
                else {
                    tries++;
                    $(this).css('background-color', '#ef3d47');
                    $(this).animate({ opacity: "1" }, 250);
                    $(this).delay(400).animate({ opacity: "0" }, 250);
                    $(this).children().html("<i class='fas fa-times'></i>");
                }
            }
        });
    }
    if(type=="step") {
        var score = 0;
        var tries = 0;
        $("#title").text("Quiz: " + result.title);
        $("#mainpoint").fadeIn(0);
        $("#start").fadeIn(0);
        if(alive==false) {
            $("#qp").fadeIn(0);
            $("#qp").text("Quiz time over!")
        }
        else {
            $("#stepwise").fadeIn(600);
            $("#qp").text("Question: " + data[1]);
            $("img").attr("src", img[0  ]);
        }
    }
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}