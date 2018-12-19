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
$(function () {
    $('label').click(function () {
        $(this).prev().prev().prev().focus();
    });
    $("#holder").scroll(function () {
        if ($(this).scrollTop() >= 50) {
            $('#add1').fadeIn(200);
        } else {
            $('#add1').fadeOut(200);
        }
    });
    $('#add1').click(function () {
        $('#holder').animate({
            scrollTop: 0
        }, 500);
    });
    $('#collapsibleNavbar').on('hide.bs.collapse', function () {
        $('.navbar-toggler').removeClass('open');
    });
    $('#collapsibleNavbar').on('show.bs.collapse', function () {
        $('.navbar-toggler').addClass('open');
    });
});
var currentTab = 1;
var totallimit = new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000);
var dp1 = $('#msgtilld');
var today = new Date().toISOString().split('T')[0];
var limit = new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
dp1.attr('min', today);
dp1.attr('max', limit);
function error() {
    alert('All 5 free services used up!');
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
    if (w > 800) {
        $('#mainpoint').removeClass('col-12');
        $('#mainpoint').addClass('col-8');
        $('#in').css('display', 'inline');
        $('#in1').css('display', 'inline');
    }
    if (w < 800) {
        $('#mainpoint').removeClass('col-8');
        $('#mainpoint').addClass('col-12');
        $('#in').css('display', 'none');
        $('#in1').css('display', 'none');
    }
};
$(document).ready(function () {
    $("[data-paroller-factor]").paroller();
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
function prechecknow() {
    if (loginstate == false) {
        $('#login').modal('show');
    }
    if (loginstate == true) {
        if (loginvar == "full") {
            alert('All 5 free services used!');
            alert("Manage & delete services in 'Account'");
        }
        else {
            $('#mainpoint').css('display', 'inline');
            $('#home2').css('display', 'none');
            $('body').addClass('bodyanimation');
            one();
        }
    }
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
        loginstate = false;
    }
}
function one() {
    $('#start').fadeIn(500);
    $('.step:nth-child(1)').addClass('active');
    $('#next').click(function () { nextslide(); });
    $('#previous').click(function () { prevslide(); });
    showTab(currentTab);
}
function showTab() {
    $('.tab:nth-child(1)').css('display', 'block');
    $('.step:nth-child(1)').addClass('active');
}
function validateForm(n) {
    var valid = true;
    switch (currentTab) {
        case 1: {
            var num = 0;
            if (($('#msgtitle').val()).length == 0) {
                $('#msgtitle').next().next().removeClass('bar');
                $('#msgtitle').next().next().next().addClass('badlabel');
                $('#msgtitle').next().next().addClass('bad');
                num++;
            }
            else {
                $('#msgtitle').next().next().removeClass('bad');
                $('#msgtitle').next().next().next().removeClass('badlabel');
                $('#msgtitle').next().next().addClass('bar');
            }
            if (($('#msgname').val()).length == 0) {
                $('#msgname').next().next().removeClass('bar');
                $('#msgname').next().next().next().addClass('badlabel');
                $('#msgname').next().next().addClass('bad');
                num++;
            }
            else {
                $('#msgname').next().next().removeClass('bad');
                $('#msgname').next().next().next().removeClass('badlabel');
                $('#msgname').next().next().addClass('bar');
            }
            temp = $('#msgtilld').val();
            var time = "";
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var date = new Date(temp);
            var now = new Date();
            var year = date.getFullYear();
            var month = months[date.getMonth()];
            var newdate = date.getDate();
            var hour = $('#msgtillt').val();;
            var minute = "00";
            var second = "00";
            var millisecond = "00";
            var ndate = month + " " + newdate + " " + year + " " + hour + ":" + minute + ":" + second + ":" + millisecond;
            var time = new Date(ndate);
            var totaltoday = new Date();
            if (($('#msgtilld').val()).length == 0 || $('#msgtilld').val() < today) {
                $('#msgtilld').next().next().removeClass('bar');
                $('#msgtilld').next().next().addClass('bad');
                $('#msgtilld').next().next().next().removeClass('badlabel');
                num++;
            }
            else {
                $('#msgtilld').next().next().removeClass('bad');
                $('#msgtilld').next().next().next().removeClass('badlabel');
                $('#msgtilld').next().next().addClass('bar');
            }
            if (time > totallimit || time < totaltoday) {
                $('#msgtillt').next().next().removeClass('bar');
                $('#msgtillt').next().next().addClass('bad');
                $('#msgtillt').next().next().next().addClass('badlabel');
                num++;
            }
            else {
                $('#msgtillt').next().next().removeClass('bad');
                $('#msgtillt').next().next().next().removeClass('badlabel');
                $('#msgtillt').next().next().addClass('bar');
            }
            if (num == 0) {
                $('.step:nth-child(' + n + ')').addClass('finish');
                return valid;
            }
            else {
                return false;
            }
            break;
        }
    }
    $('.step:nth-child(' + n + ')').addClass('finish');
    return valid;
}
function fixStepIndicator(n) {
    $('.step:nth-child(' + n + ')').addClass('active');
}
function removeStepIndicator(n) {
    $('.step:nth-child(' + n + ')').removeClass('finish');
    $('.step:nth-child(' + (n + 1) + ')').removeClass('active');
}
function prevslide() {
    $('.tab:nth-child(' + currentTab + ')').fadeOut(300);
    currentTab--;
    $('.tab:nth-child(' + currentTab + ')').delay(300).fadeIn(300);
    if (currentTab == 1) {
        $('#previous').fadeOut(300);
        $('#next').html("Next   <i class='fas fa-arrow-right'></i>");
    }
    else {
        $('#previous').html("<i class='fas fa-arrow-left'></i>     Previous")
        $('#next').html("Next   <i class='fas fa-arrow-right'></i>");
    }
    removeStepIndicator(currentTab);
}
function nextslide() {
    if (!validateForm(currentTab)) return false;
    if (currentTab == 1) {
        $('#previous').html("<i class='fas fa-arrow-left'></i>      Go Back to check");
        $('#next').html('Confirm and generate link');
    }
    if (currentTab == 2) {
        $('.steps').remove();
        $('#next').remove();
        $('#previous').remove();
        genlink();
    }
    $('.tab:nth-child(' + currentTab + ')').fadeOut(300);
    currentTab++;
    $('.tab:nth-child(' + currentTab + ')').delay(300).fadeIn(300);
    fixStepIndicator(currentTab);
    if (currentTab != 1 && currentTab != 5) {
        $('#previous').fadeIn(300);
        $('#previous').html("<i class='fas fa-arrow-left'></i>     Previous");
    }
}
function genlink() {
    var time = "";
    if ($('#lessmore').val() == "less") {
        temp = $('#msgtillt').val();
        var ts = new Date().getTime();
        var ts = ts + (temp * 3600000);
        var time = new Date(ts);
    }
    else {
        temp = $('#msgtilld').val();
        var time = "";
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var date = new Date(temp);
        var now = new Date();
        var year = date.getFullYear();
        var month = months[date.getMonth()];
        var newdate = date.getDate();
        var hour = $('#msgtillt').val();;
        var minute = "00";
        var second = "00";
        var millisecond = "00";
        var ndate = month + " " + newdate + " " + year + " " + hour + ":" + minute + ":" + second + ":" + millisecond;
        var time = new Date(ndate);
    }
    $('[data-toggle="tooltip"]').tooltip(); 
    var title = $('#msgtitle').val();
    var name = $('#msgname').val();
    $.post('./php/create.php', { name: name, topic: title, time: time, type: "msgboard" }, function (data) {
        link = data;
        $('.spinner').css('display', 'none');
        $('textarea').css('display', '');
        $('textarea').text(window.location.protocol + "//" + window.location.hostname + "/msgview.html?type=msgboard&id=" + link);
        $('#generating').text('Use this link to access the message board!');
        $('#copyclip').css('display', 'inline');
    });
    $('#copyclip').click(function () {
        $("textarea").select();
        document.execCommand('copy');
    });
    $('textarea').click(function () {
        $("textarea").select();
        document.execCommand('copy');
    });
}