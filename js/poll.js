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
    $.scrollify({
        section: ".scrollTo",
        scrollSpeed: 800,
        after: function () {
            if ($.scrollify.current().hasClass("two")) {
                $('#getstarted h2:nth-child(1)').animate({ opacity: 1 }, 400);
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
    $('label').click(function() {
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
    $('#imgwant').on('change', function(){
        pollfour();
    });
});
var option = new Array();
var img = new Array();
var title;
var bool = false;
var bool1 = false;
var bool2 = false;
var currentTab = 1;
var temp = 1;
var dp1 = $('#polltilld');
var today = new Date().toISOString().split('T')[0];
var limit = new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
dp1.attr('min', today);
dp1.attr('max', limit);
var totallimit = new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000);
function genlink() {
    var num = $('#polloption').val();
    var title = $('#polltitle').val();
    temp = $('#polltilld').val();
    var time = "";
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date(temp);
    var now = new Date();
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var newdate = date.getDate();
    var hour = $('#polltillt').val();;
    var minute = "00";
    var second = "00"; 
    var millisecond = "00";
    var ndate = month + " " + newdate + " " + year + " " + hour + ":" + minute + ":" + second + ":" + millisecond;
    var time = new Date(ndate);
    var imgwant = $('#imgwant').val();
    var hyploc = $('#hyploc').val()
    for(i=0;i<num;i++) {
        option[i] = $('#' + (i+1)).val();
        if(imgwant == "yes") {
            if(hyploc == "yes") {
                img[i] = $('#img' + (i+1)).attr('src');
            }
            else {
                img[i] = $('#pollimg' + (i + 1)).attr('src');
            }  
        }
    }
    var link = "";
    if(imgwant=="no") {
        $.post('./php/create.php', { title: title, time: time, type: "poll", 'option[]': option, imgwant: "no" }, function (data) {
            link = data;
        })
            .done(function () {
                $('.spinner').css('display', 'none');
                $('textarea').css('display', '');
                $('textarea').text(window.location.protocol + "//" + window.location.hostname + "/pollview.html?type=poll&id=" + link);
                $('#generating').text('Use this link to access the poll!');
                $('#copyclip').css('display', 'inline');
            });
    }
    else if(imgwant=="yes" && hyploc == "no") {
        $.post('./php/create.php', { title: title, time: time, type: "poll", 'option[]': option, imgwant: "file"}, function(data) {
            link = data;
            for (var i = 0; i < num; i++) {
                var post = $.post('./php/temp_upload.php', { img: img[i], id: data, type: "poll", index: i }, function(data){console.log(data);});
            }
        })
        .done(function() {
            $('.spinner').css('display', 'none');
            $('textarea').css('display', '');
            $('textarea').text(window.location.protocol + "//" + window.location.hostname + "/pollview.html?type=poll&id=" + link);
            $('#generating').text('Use this link to access the poll!');
            $('#copyclip').css('display', 'inline');
        });
    }
    else if(imgwant="yes" && hyploc == "yes"){
        $.post('./php/create.php', { title: title, time: time, type: "poll", 'option[]': option, 'img[]': img, imgwant: "yes" }, function(data){
            link = data;
        })
            .done(function () {
                $('.spinner').css('display', 'none');
                $('textarea').css('display', '');
                $('textarea').text(window.location.protocol + "//" + window.location.hostname + "/pollview.html?type=poll&id=" + link);
                $('#generating').text('Use this link to access the poll!');
                $('#copyclip').css('display', 'inline');
            });
    }
    $('#copyclip').click(function() {
        $("textarea").select();
        document.execCommand('copy');
    });
    $('textarea').click(function() {
        $("textarea").select();
        document.execCommand('copy');
    });
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
function resize(){
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
    var h = $(window).height();
    $('.scrollTo').css("height", h);
    h *= 0.5;
    h += "px";
    $('#holder').css('height', h);
    $('#holder').css('height-max', h);
};
$(document).ready(function () {
    $("[data-paroller-factor]").paroller();
    resize();
    $(document).scroll(function () {
        if($('#mainpoint').css('display') != "none") {
            $('#addx').css('display', 'none');
        }
        else {
            if ($(this).scrollTop() >= 50) {
                $('#addx').fadeIn(200);
            } else {
                $('#addx').fadeOut(200);
            }
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
   /* window.sr = ScrollReveal({ reset: true });
    sr.reveal('#one', { duration: 1000 });
    sr.reveal('#two', { duration: 1000 });
    sr.reveal('#three', { duration: 1000 });
    sr.reveal('#four', { duration: 1000 });    
    sr.reveal('#five', { duration: 1000 });    */
    $('[data-toggle="tooltip"]').tooltip(); 
    $(document).keypress(function(event){
        if(event.which==13) {
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
                alert(data);
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
        if(loginvar == "full") {
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
    $('#exit').click(function(){ window.location.reload(); });
    showTab(currentTab);
}
function showTab(n) {
    $('.tab').css('display', 'none');
    $('.tab:nth-child(' + n +')').css('display', 'block');
    $('.step:nth-child(' + n + ')').addClass('active');
}
function validateForm(n) {
    var valid = true;
    switch (currentTab) {
        case 1: {
            if ($('#polloption').val() > 20 || $('#polloption').val() <= 0) {
                $('#polloption').next().next().removeClass('bar');
                $('#polloption').next().next().addClass('bad');
                $('#polloption').next().next().next().addClass('badlabel');
                $('.tab:first-child').find('.alert').css('display', 'block');
                return false;
            }
            else {
                $('#polloption').next().next().removeClass('bad');
                $('#polloption').next().next().next().removeClass('badlabel');
                $('#polloption').next().next().addClass('bar');
                $('.tab:first-child').find('.alert').css('display', 'none');
                $('.step:nth-child(' + n + ')').addClass('finish');
                return valid;
            }
        }
        case 2: {
            var num = 0;
            if (($('#polltitle').val()).length == 0) {
                $('#polltitle').next().next().removeClass('bar');
                $('#polltitle').next().next().next().addClass('badlabel');
                $('#polltitle').next().next().addClass('bad');
                num++;
            }
            else {
                $('#polltitle').next().next().removeClass('bad');
                $('#polltitle').next().next().next().removeClass('badlabel');
                $('#polltitle').next().next().addClass('bar');
            }
            temp = $('#polltilld').val();
            var time = "";
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var date = new Date(temp);
            var now = new Date();
            var year = date.getFullYear();
            var month = months[date.getMonth()];
            var newdate = date.getDate();
            var hour = $('#polltillt').val();;
            var minute = "00";
            var second = "00";
            var millisecond = "00";
            var ndate = month + " " + newdate + " " + year + " " + hour + ":" + minute + ":" + second + ":" + millisecond;
            var time = new Date(ndate);
            var totaltoday = new Date();
            if (($('#polltilld').val()).length == 0 || $('#polltilld').val() < today) {
                $('#polltilld').next().next().removeClass('bar');
                $('#polltilld').next().next().addClass('bad');
                $('#polltilld').next().next().next().addClass('badlabel');
                num++;
            }
            else {
                $('#polltilld').next().next().removeClass('bad');
                $('#polltilld').next().next().next().removeClass('badlabel');
                $('#polltilld').next().next().addClass('bar');
            }
            if (time > totallimit || time < totaltoday) {
                $('#polltillt').next().next().removeClass('bar');
                $('#polltillt').next().next().addClass('bad');
                $('#polltillt').next().next().next().addClass('badlabel');
                num++;
            }
            else {
                $('#polltillt').next().next().removeClass('bad');
                $('#polltillt').next().next().next().removeClass('badlabel');
                $('#polltillt').next().next().addClass('bar');
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
        case 3: {
            var num = 0;
            var data = $('#polloption').val();
            for(i=1;i<=data;i++) {
                if(($('#' + i).val()).length == 0) {
                    $('#' + i).next().next().removeClass('bar');
                    $('#' + i).next().next().next().addClass('badlabel');
                    $('#' + i).next().next().addClass('bad');
                    num++;
                }
                else {
                    $('#' + i).next().next().next().removeClass('badlabel');
                    $('#' + i).next().next().removeClass('bad');
                    $('#' + i).next().next().addClass('bar');
                }
            }
            if(num!=0) {
                return false;
            }
            else {
                $('.step:nth-child(' + n + ')').addClass('finish');
                return valid;
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
        $('#previous').fadeOut(200);
        $('#next').html("Next   <i class='fas fa-arrow-right'></i>");
    }
    else {
        $('#next').html("Next   <i class='fas fa-arrow-right'></i>");
        $('#previous').html("<i class='fas fa-arrow-left'></i>     Previous");  
    }
    if (currentTab == 3) { pollthree(); }
    if (currentTab == 4) { pollfour(); }
    removeStepIndicator(currentTab);
}
function nextslide() {
    if (!validateForm(currentTab)) return false;
    if (currentTab == 4) {
        $('#previous').html("<i class='fas fa-arrow-left'></i>      Go Back to check");
        $('#next').html('Confirm and generate link');
    }
    if(currentTab==5) {
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
        $('#previous').fadeIn(200);
        $('#previous').html("<i class='fas fa-arrow-left'></i>     Previous");
        $('#next').html("Next   <i class='fas fa-arrow-right'></i>");
    }
    if (currentTab == 3) { pollthree(); }
    if (currentTab == 4) { pollfour(); }
}
function pollthree() {
    var data = $('#polloption').val();
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
        var place = "<div class='group'><input type='text' id='" + q + "' required><span class='highlight'></span><span class='bar'></span><label>Name of choice " + q + ":<i class='fas fa-question' data-toggle='tooltip' data-placement='right' title='The name of choice " + q + "'></i></label></div>";
        $('#pollchoice').append(place);
        $('[data-toggle="tooltip"]').tooltip();
    }
    for (e = (dat + 1); e <= 20; e++) {
        $('#' + e).parent().remove();
    }
}
function pollfour() {
    if($('#imgwant').val()=="no"){
        $('.groupl:nth-child(2)').css('display', 'none');
        $('.groupl:nth-child(3)').css('display', 'none');
        $('.groupl:nth-child(4)').css('display', 'none');
    }
    else {
        $('.groupl:nth-child(2)').css('display', '');
        $('.groupl:nth-child(3)').css('display', '');
        $('.groupl:nth-child(4)').css('display', '');
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
}
function local() {
    var data = $('#polloption').val();
    var dat = parseInt(data);
    var data = $('#polloption').val();
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
        var place = "<div class='row'><div class='col-xs-12 col-md-6' id='wrapper" + q + "'><div class='file-upload-wrapper' data-text='Select your file!'><input type='file' class='file-upload-field' value=''></div></div><div class='col-xs-12 col-md-6'><img data-toggle='tooltip' data-placement='right' title='The image for option " + $('#' + q).val() + "' id='pollimg" + q + "' class='float-right thumbnail img-thumbnail' src='./dependencies/100x100.png' /></div></div>";
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
    var data = $('#polloption').val();
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