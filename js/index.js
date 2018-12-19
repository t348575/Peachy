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
            if(data!="false") {
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
$(window).resize(function () {
    resize();
});
function resize() {
    var w = window.innerWidth;
    var h = $(window).height();
    if(h>600 && w < 770) {
        $('#one .col-4:nth-child(1)').addClass('col-6');
        $('#one .col-4:nth-child(1)').removeClass('col-4');
        $('#one .col-4:nth-child(2)').addClass('col-6');
        $('#one .col-4:nth-child(2)').removeClass('col-4');
        $('#one .col-4:nth-child(3)').addClass('col-12');
        $('#one .col-4:nth-child(3)').removeClass('col-4');
    }
    if(w<=768) {
        $('.two .col-6:first-child').toggleClass("col-6").toggleClass("col-12");
    }
    // /var navh = $('nav').height();
    $('.scrollTo').css("height", h);
    $('#two').css("height", h);
};
$(document).ready(function () {
    resize();
    $("[data-paroller-factor]").paroller();
    window.sr = ScrollReveal({ reset: true });
    sr.reveal('#one', { duration: 1000 });
    $(document).scroll(function () {
        if ($(this).scrollTop() >= 60) {
            $('#add1').fadeIn(200);
        } else {
            $('#add1').fadeOut(200);
        }
    });
    $('#add1').click(function () {
        $.scrollify.move('#1');
    });
    $('#btn').click(function(){
        $.scrollify.move('#3');
    });
    lot();
    $(document).keypress(function (event) {
        if (event.which == 13) {
            check();
        }
    });
    $('#create').click(function() {
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
                else if(data=="false"){
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
        if(($('#lemail').val()).length == 0) {
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
function lot() {
    var type = $.urlParam('type');
    var id = $.urlParam('id');
    var aler = $.urlParam('alert');
    if(aler==0) {}
    else { alert(aler); window.location = window.location.href.replace('?alert=timeout', '');}
    if(type=='msgboard') {
        window.location.replace('./msgview.html?type='+type+"&id="+id);
    }
    if(type=="poll") {
        window.location.replace('./pollview.html?type=' + type + "&id=" + id);
    }
    if(type=="quiz") {
        window.location.replace('./quizview.html?type=' + type + '&id=' + id);
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
    $.post('./php/accounts/mng.php', { id: key }, function(data) {
        window.location.replace("./accountinfo.html?key=" + key);
    });
}
$(function () {
    $.scrollify({
        section: ".scrollTo",
        scrollSpeed: 800,
        after: function() {
            if($.scrollify.current().hasClass("two")) {
                $('#getstarted h2:nth-child(1)').animate({opacity: 1}, 400);
                $('#getstarted h2:nth-child(2)').delay(400).animate({ opacity: 1 }, 400);
                $('#getstarted h2:nth-child(3)').delay(800).animate({ opacity: 1 }, 400);
                $('#getstarted h2:nth-child(4)').delay(1200).animate({ opacity: 1 }, 400);
                $('#getstarted h2:nth-child(5)').delay(1600).animate({ opacity: 1 }, 400);
                $('#getstarted h2:last-child').delay(2000).animate({ opacity: 1 }, 400);
            }
            else {
                $('#getstarted h2').css("opacity", "0");
            }
        }
    });
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
function closelogin() {
    $('#login').modal('toggle');
    $('#errormsg').text('');
    $('#errormsg').siblings().remove();
    $('#incorrect').css('display', 'none');
    $('#pwd').val('');
    $('#lemail').val('');
    $('#lform').fadeIn(0);
}