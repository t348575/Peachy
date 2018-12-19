var currentTab = 1;
var point = 0;
var question = new Array();
var img = new Array();
var qoption = new Array();
var loginstate = false;
var loginvar;
var bool = false;
var bool1 = false;
var bool2 = false;
var bool3 = false;
var dp1 = $('#quiztilld');
var today = new Date().toISOString().split('T')[0];
var limit = new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
dp1.attr('min', today);
dp1.attr('max', limit);
var totallimit = new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000);
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
        window.location.reload();
    }
}
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
    $('#imgwant').on('change', function () {
        quizfour();
    });
    $('#quizoption').on("change", function () {
        quizthree();
    });
});
function genlink() { 
    var num = $('#quizoption').val();
    var quiztype = $("#quiztype").val();
    var title = $('#quiztitle').val();
    temp = $('#quiztilld').val();
    var time = "";
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date(temp);
    var now = new Date();
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var newdate = date.getDate();
    var hour = $('#quiztillt').val();;
    var minute = "00";
    var second = "00";
    var millisecond = "00";
    var ndate = month + " " + newdate + " " + year + " " + hour + ":" + minute + ":" + second + ":" + millisecond;
    var time = new Date(ndate);
    var hyploc = $('#hyploc').val()
    for (i = 0; i < num; i++) {
        question[i] = $('#' + (i + 1)).val();
        if (hyploc == "yes") {
            img[i] = $('#img' + (i + 1)).attr('src');
        }
        else {
            img[i] = $('#quizimg' + (i + 1)).attr('src');
        }
    }
    if(quiztype != "Image-Select") {
        for (i = 0; i < num; i++) {
            for (j = 1; j <= 4; j++) {
                qoption[i+j-1] = $("#ques" + (i + 1) + "opt" + j).val();
            }
        }
    }
    var link = "";
    if (hyploc == "no" && quiztype == "Image-Select") {
        $.post('./php/create.php', { quiztype: quiztype, title: title, time: time, type: "quiz", 'question[]': question, imgwant: "file" }, function (data) {
            link = data;
            for (var i = 0; i < num; i++) {
                var post = $.post('./php/temp_upload.php', { img: img[i], id: data, type: "quiz", index: i }, function (data) { console.log(data); });
            }
        })
            .done(function () {
                $('.spinner').css('display', 'none');
                $('textarea').css('display', '');
                $('textarea').text(window.location.protocol + "//" + window.location.hostname + "/quizview.html?type=quiz&id=" + link);
                $('#generating').text('Use this link to access the quiz!');
                $('#copyclip').css('display', 'inline');
            });
    }
    else if (hyploc == "no" && quiztype != "Image-Select") {
        $.post('./php/create.php', { quiztype: quiztype, title: title, time: time, type: "quiz", 'question[]': question, "option[]": qoption, imgwant: "file" }, function (data) {
            link = data;
            for (var i = 0; i < num; i++) {
                var post = $.post('./php/temp_upload.php', { img: img[i], id: data, type: "quiz", index: i }, function (data) { console.log(data); });
            }
        })
            .done(function () {
                $('.spinner').css('display', 'none');
                $('textarea').css('display', '');
                $('textarea').text(window.location.protocol + "//" + window.location.hostname + "/quizview.html?type=quiz&id=" + link);
                $('#generating').text('Use this link to access the quiz!');
                $('#copyclip').css('display', 'inline');
            });
    }
    else if (hyploc == "yes" && quiztype == "Image-Select") {
        $.post('./php/create.php', { quiztype: quiztype, title: title, time: time, type: "quiz", 'question[]': question, 'img[]': img, imgwant: "yes" }, function (data) {
            link = data;
        })
            .done(function () {
                $('.spinner').css('display', 'none');
                $('textarea').css('display', '');
                $('textarea').text(window.location.protocol + "//" + window.location.hostname + "/quizview.html?type=quiz&id=" + link);
                $('#generating').text('Use this link to access the quiz!');
                $('#copyclip').css('display', 'inline');
            });
    }
    else if (hyploc == "yes" && quiztype != "Image-Select") {
        $.post('./php/create.php', { quiztype: quiztype, title: title, time: time, type: "quiz", 'question[]': question, "option[]": qoption, 'img[]': img, imgwant: "yes" }, function (data) {
            link = data;
        })
            .done(function () {
                $('.spinner').css('display', 'none');
                $('textarea').css('display', '');
                $('textarea').text(window.location.protocol + "//" + window.location.hostname + "/quizview.html?type=quiz&id=" + link);
                $('#generating').text('Use this link to access the quiz!');
                $('#copyclip').css('display', 'inline');
            });
    }
    $('#copyclip').click(function () {
        $("textarea").select();
        document.execCommand('copy');
    });
    $('textarea').click(function () {
        $("textarea").select();
        document.execCommand('copy');
    });
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
    resize();
    $("[data-paroller-factor]").paroller();
    resize();
    $(document).scroll(function () {
        if ($(this).scrollTop() >= 50) {
            $('#addx').fadeIn(200);
        } else {
            $('#addx').fadeOut(200);
        }
    });
    $('#addx').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });
    $('#learn').click(function () {
        $('html, body').animate({
            scrollTop: $("#lstpoint").offset().top
        }, 1000);
    });
    window.sr = ScrollReveal({ reset: true });
    sr.reveal('#one', { duration: 1000 });
    sr.reveal('#two', { duration: 1000 });
    sr.reveal('#three', { duration: 1000 });
    sr.reveal('#four', { duration: 1000 });
    sr.reveal('#five', { duration: 1000 });
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
function one() {
    $('#mainpoint').css('display', '');
    $('#home2').css('display', 'none');
    $('body').addClass('bodyanimation');
    $('#start').fadeIn(500);
    $('#one').css('display', 'none');
    $('#two').css('display', 'none');
    $('#three').css('display', 'none');
    $('#four').css('display', 'none');
    $('#five').css('display', 'none');
    $('.step:nth-child(1)').addClass('active');
    $('#next').click(function () { nextslide(); });
    $('#previous').click(function () { prevslide(); });
    showTab(currentTab);   
}
function showTab(n) {
    $('.tab').css('display', 'none');
    $('.tab:nth-child(' + n + ')').css('display', 'block');
    $('.step:nth-child(' + n + ')').addClass('active');
}
function validateForm(n) {
    var valid = true;
    switch (currentTab) {
        case 1: {
            var num = 0;
            if(($('#quiztitle').val()).length == 0) {
                bad($('#quiztitle'));
                num++;
            }
            else {
                good($('#quiztitle'));
            }
            if ($('#quizoption').val() == 0 || $('#quizoption').val() > 15) {
                bad($('#quizoption'));
                num++;
            }
            else {
                good($('#quizoption'));
            }
            if(num != 0){ 
                return false;
            }
            else {
                $('.step:nth-child(' + n + ')').addClass('finish');
                return valid;
            }
        }
        case 2: {
            var num = 0;    
            temp = $('#quiztilld').val();
            var time = "";
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var date = new Date(temp);
            var now = new Date();
            var year = date.getFullYear();
            var month = months[date.getMonth()];
            var newdate = date.getDate();
            var hour = $('#quiztillt').val();;
            var minute = "00";
            var second = "00";
            var millisecond = "00";
            var ndate = month + " " + newdate + " " + year + " " + hour + ":" + minute + ":" + second + ":" + millisecond;
            var time = new Date(ndate);
            var totaltoday = new Date();
            if (($('#quiztilld').val()).length == 0 || $('#quiztilld').val() < today) {
                bad($('#quiztilld'));
                num++;
            }
            else {
                good($("#quiztilld"));
            }
            if (time > totallimit || time < totaltoday) {
                bad($("#quiztillt"));
                num++;
            }
            else {
                good($("#quiztillt"));
            }
            if (num != 0) {
                return false;
            }
            else {
                $('.step:nth-child(' + n + ')').addClass('finish');
                return valid;
            }
            break;
        }
        case 3: {
            var num = 0;
            var data = $('#quizoption').val();
            for (i = 1; i <= data; i++) {
                if (($('#' + i).val()).length == 0) {
                    bad($('#' + i));
                    num++;
                }
                else {
                    good($('#' + i))
                }
            }
            if(num != 0){
                return false;
            }
            else {
                $('.step:nth-child(' + n + ')').addClass('finish');
                return valid;
            }
            break;
        }
        case 5: {
            var num = 0;
            if ($("#quiztype").val() == "Image-Select") {
                $('.step:nth-child(' + n + ')').addClass('finish');
                return valid;
            }
            else {
                var dat = $('#quizoption').val();   
                for (i=1; i <= dat; i++) {
                    for (j = 1; j <= 4; j++) {
                        if(($("#ques" + i + "opt" + j).val()).length == 0) {
                            bad($("#ques" + i + "opt" + j));
                            num++;
                        }
                        else {
                            good($("#ques" + i + "opt" + j));
                        }
                    }
                }
                if(num != 0) {
                    return false;
                }
                else {
                    $('.step:nth-child(' + n + ')').addClass('finish');
                    return valid;
                }
            }
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
    if (currentTab ==6) {
        var type = $('#quiztype').val();
        if (type == "Image-Select") {
            $('.tab:nth-child(' + currentTab + ')').fadeOut(300);
            removeStepIndicator(currentTab);
            removeStepIndicator(currentTab-1);
            currentTab -= 2;
            $('.tab:nth-child(' + currentTab + ')').delay(300).fadeIn(300);
            return true;
        }
        else {
            quizfive();
            $('.tab:nth-child(' + currentTab + ')').fadeOut(300);
            currentTab--;
            $('.tab:nth-child(' + currentTab + ')').delay(300).fadeIn(300);
            removeStepIndicator(currentTab);
            return true;
        }
    }
    $('.tab:nth-child(' + currentTab + ')').fadeOut(300);
    currentTab--;
    $('.tab:nth-child(' + currentTab + ')').delay(300).fadeIn(300);
    if (currentTab == 1) {
        $('#previous').fadeOut(200);
        $('#next').html("Next   <i class='fas fa-arrow-right'></i>");
    }
    else {
        $('#next').html("Next   <i class='fas fa-arrow-right'></i>");
        $('#previous').html("<i class='fas fa-arrow-left'></i>     Previous");
    }
    removeStepIndicator(currentTab);
    if (currentTab == 3) { quizthree(); }
    if (currentTab == 4) { quizfour(); }
}
function nextslide() {
    if (!validateForm(currentTab)) return false;
    if (currentTab == 6) {
        $('.steps').remove();
        $('#next').remove();
        $('#previous').remove();
        genlink();
    }
    if (currentTab == 4) {
        var type = $('#quiztype').val();
        if (type == "Image-Select") {
            $('.tab:nth-child(' + currentTab + ')').fadeOut(300);
            fixStepIndicator(currentTab);
            fixStepIndicator(currentTab+1);
            currentTab+=2;
            $('.tab:nth-child(' + currentTab + ')').delay(300).fadeIn(300);
            return true;
        }
        else {
            quizfive();
            $('.tab:nth-child(' + currentTab + ')').fadeOut(300);
            currentTab++;
            $('.tab:nth-child(' + currentTab + ')').delay(300).fadeIn(300);
            fixStepIndicator(currentTab);
            return true;
        }
    }
    $('.tab:nth-child(' + currentTab + ')').fadeOut(300);
    currentTab++;
    $('.tab:nth-child(' + currentTab + ')').delay(300).fadeIn(300);
    fixStepIndicator(currentTab);
    if (currentTab != 1 && currentTab != 5) {
        $('#previous').fadeIn(200);
        $('#previous').html("<i class='fas fa-arrow-left'></i>     Previous");
        $('#next').html("Next   <i class='fas fa-arrow-right'></i>");
    }
    if (currentTab == 3) { quizthree(); }
    if (currentTab == 4) { quizfour(); }    
}
function quizthree() {
    var data = $('#quizoption').val();
    var dat = parseInt(data);
    if (bool == false) {
        temp = dat;
        var q = 1;
        bool = true;
    }
    else {
        if (temp >= dat) {
            q = dat + 1;
            temp = dat;
        }
        else {
            q = temp + 1;
            temp = dat;
        }
    }    
    for (q; q <= dat; q++) {
        var place = "<div class='group'><input type='text' id='" + q + "' required><span class='highlight'></span><span class='bar'></span><label>Name of choice " + q + ":<i class='fas fa-question' data-toggle='tooltip' data-placement='right' title='Question number: " + q + "'></i></label></div>";
        $('#quizque').append(place);
        $('[data-toggle="tooltip"]').tooltip();
    }
    for (e = (dat + 1); e <= 20; e++) {
        $('#' + e).parent().remove();
    }
}
function error() {
    alert('All 5 free services used up!');
}
function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
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
function bad(id) {
    $(id).next().next().removeClass('bar');
    $(id).next().next().next().addClass('badlabel');
    $(id).next().next().addClass('bad');
}
function good(id) {
    $(id).next().next().removeClass('bad');
    $(id).next().next().next().removeClass('badlabel');
    $(id).next().next().addClass('bar');
}
function quizfour() {
    $('#errormsg1').find("p").text(" The selected quiz type is: " + $("#quiztype").val());
    if ($('#hyploc').val() == "yes") {
        $('#local').css('display', 'none');
        hyperlink();
    }
    else {
        $('#hyperlink').css('display', 'none');
        local();
    }
    $('#hyploc').on('change', function () {
        if ($('#hyploc').val() == "yes") {
            $('#local').css('display', 'none');
            hyperlink();
        }
        else {
            $('#hyperlink').css('display', 'none');
            local();
        }
    });
}
function local() {
    var data = $('#quizoption').val();
    var dat = parseInt(data);
    var data = $('#quizoption').val();
    var dat = parseInt(data);
    if (bool1 == false) {
        temp1 = dat;
        var q = 1;
        bool1 = true;
    }
    else {
        if (temp1 >= dat) {
            q = dat + 1;
            temp1 = dat;
        }
        else {
            q = temp1 + 1;
            temp1 = dat;
        }
    }

    for (q; q <= dat; q++) {
        var place = "<div class='row'><div class='col-xs-12 col-md-6' id='wrapper" + q + "'><div class='file-upload-wrapper' data-text='Select your file!'><input type='file' class='file-upload-field' value=''></div></div><div class='col-xs-12 col-md-6'><img data-toggle='tooltip' data-placement='right' title='The image for option " + $('#' + q).val() + "' id='quizimg" + q + "' class='float-right thumbnail img-thumbnail' src='./dependencies/100x100.png' /></div></div>";
        $('#local').append(place);
        $('[data-toggle="tooltip"]').tooltip();
    }
    for (e = (dat + 1); e <= 20; e++) {
        $('#wrapper' + e).parent().remove();
    }
    $('#local').css('display', '');
    $("#last .row").on("change", ".file-upload-field", function () {
        $(this).parent(".file-upload-wrapper").attr("data-text", $(this).val().replace(/.*(\/|\\)/, ''));
        var id = $(this).parent().parent().attr('id');
        var next = $('#' + id).next().find('img').attr('id');
        var reader = new FileReader();
        reader.onloadend = function () {
            var size = byteCount(reader.result);
            if (size < 8000000) {
                $('#' + next).attr('src', reader.result);
            }
            else {
                alert('Raw file size should not exceed 8MB!');
            }
        }
        reader.onerror = function () {
            alert('There was an error reading the file!');
            $(this).val('');
        }
        reader.readAsDataURL(event.target.files[0]);
    });
}
function hyperlink() {
    var data = $('#quizoption').val();
    var dat = parseInt(data);
    if (bool2 == false) {
        temp2 = dat;
        var q = 1;
        bool2 = true;
    }
    else {
        if (temp2 >= dat) {
            q = dat + 1;
            temp2 = dat;
        }
        else {
            q = temp2 + 1;
            temp2 = dat;
        }
    }
    for (q; q <= dat; q++) {
        var place = "<div class='row'><div class='col-xs-12 col-md-10' id='ghyper" + q + "'><div class='group'><input type='text' class='hyper' required><span class='highlight'></span><span class='bar'></span><label>Image for option " + $('#' + q).val() + ":<i class='fas fa-question' data-toggle='tooltip' data-placement='right' title='The image for choice " + $('#' + q).val() + "'></i></label></div></div><div class='col-xs-12 col-md-2'><img src='/dependencies/100x100.png' class='text-center thumbnail img-thumbnail' id='img" + q + "'></div></div>";
        $('#hyperlink').append(place);
        $('[data-toggle="tooltip"]').tooltip();
    }
    for (e = (dat + 1); e <= 20; e++) {
        $('#ghyper' + e).parent().remove();
    }
    $('#hyperlink').css('display', '');
    $('.hyper').on('input', function () {
        var id = $(this).parent().parent().attr('id');
        var next = $('#' + id).next().find('img').attr('id');
        $('#' + next).attr('src', $(this).val());
    });
}
function quizfive() {
    var data = $('#quizoption').val();
    var dat = parseInt(data);
    if (bool3 == false) {
        temp = dat;
        var q = 1;
        bool3 = true;
    }
    else {
        if (temp >= dat) {
            q = dat + 1;
            temp = dat;
        }
        else {
            q = temp + 1;
            temp = dat;
        }
    }
    for(q;q<=dat;q++) {
        for(i=1;i<=4;i++) {
            var part1 = "<div class='row'></div>";
            var place = "<div class='group'><input id='ques" + q + "opt" + i + "' type='text' required><span class='highlight'></span><span class='bar'></span><label>Option " + i + " for question " + $('#' + q).val() + ":<i class='fas fa-question' data-toggle='tooltip' data-placement='right' title='Option " + i + " for question " + $('#' + q).val() + ".'></i></label></div>";            
            $('#quizop').append(place);
            $('[data-toggle="tooltip"]').tooltip();
        }
    }
    for (e=(dat+1); e <= 15; e++) {
        for (i = 1; i <= 4; i++) {
            $("#ques" + e + "opt" + i).remove();
            $('[data-toggle="tooltip"]').tooltip();
        }
    }
}