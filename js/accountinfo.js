var idleTime = 0;
var bool = false;
function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 5) {
        alert("Timeout!");
        window.location.replace('./');
    }
}
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return 0;
    }
    return results[1] || 0;
}
var state = true;
$('#add').click(function () {
    if (state == true) {
        truestate();
    }
    else {
        falsestate();
    }
});
var id = "";
$(window).resize(function () {
    resize();
});
function checkaccess() {
    var key = $.urlParam('key')
    $.post('./php/accounts/accountview.php', { key: key }, function(data) {
        if(data=="false") {
            alert('Invalid Link!');
            window.location.replace('./');
        }
        var result = JSON.parse(data);
        $('#spinner').css('display', 'none');
        $('.spinner').css('display', 'none');
        $('#navigation').css('display', '');
        var num = Object.keys(result).length;
        if(num==0) {
            $('#none').css('display', '');
            $('.card').css('display', '');
            $('#table').css('display', '');
        }
        else {
            var j = 2;
            for (i = 0; i < num; i++) {
                for (j = 2; j < 5; j++) {
                    switch (j) {
                        case 2: {
                            $("#" + (i + 1)).find("td:nth-child(" + j + ")").text(result["value" + i][1]);
                            $("#" + (i + 1)).find("td:nth-child(" + j + ")").attr('id', result["value" + i][1]);
                            $("#" + (i + 1)).find("td:nth-child(" + j + ")").addClass(result["value" + i][1]);
                            break;
                        }
                        case 3: {
                            $("#" + (i + 1)).find("td:nth-child(" + j + ")").text(result["value" + i][3]);
                            $("#" + (i + 1)).find("td:nth-child(" + j + ")").attr('id', result["value" + i][1]);
                            $("#" + (i + 1)).find("td:nth-child(" + j + ")").addClass(result["value" + i][1]);
                            break;
                        }
                        case 4: {
                            $("#" + (i + 1)).find("td:nth-child(" + j + ")").text(result["value" + i][2]);
                            $("#" + (i + 1)).find("td:nth-child(" + j + ")").attr('id', result["value" + i][1]);
                            $("#" + (i + 1)).find("td:nth-child(" + j + ")").addClass(result["value" + i][1]);
                            break;
                        }
                    }
                }
                $("#" + (i + 1)).css('display', '');
            }
            $('.card').css('display', '');
            $('#table').css('display', '');
            edits();
        }
    });
}
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
$(document).ready(function() {
    var idleInterval = setInterval(timerIncrement, 60000);
    $(this).mousemove(function (e) {
        idleTime = 0;
    });
    $(this).keypress(function (e) {
        idleTime = 0;
    });
    $('[data-toggle="tooltip"]').tooltip(); 
    resize();
    checkaccess();
});
function truestate() {
    $('#add').animate({ borderSpacing: 45 }, {
        step: function (now, fx) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 250
    }, 'linear');
    $('#add2').animate({ bottom: "7rem" }, 170);
    $('#add2').animate({ bottom: "5rem" }, 70);
    $('#add2').animate({ bottom: "6rem" }, 20);
    $('#add3').animate({ bottom: "12rem" }, 150);
    $('#add3').animate({ bottom: "10rem" }, 50);
    $('#add3').animate({ bottom: "11rem" }, 0);
    state = false;
}
function falsestate() {
    $('#add').animate({ borderSpacing: 0 }, {
        step: function (now, fx) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 250
    }, 'linear');
    $('#add1').animate({ bottom: "1rem" }, 300);
    $('#add2').animate({ bottom: "1rem" }, 300);
    $('#add3').animate({ bottom: "1rem" }, 300);
    state = true;
}
function edits() {
    $("td").bind("contextmenu", function (event) {
        id = event.target.id;
        event.preventDefault();
        $(".custom-menu").finish().toggle(100).
            css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });
    });

    $(document).bind("mousedown", function (e) {
        if (!$(e.target).parents(".custom-menu").length > 0) {
            $(".custom-menu").hide(100);
        }
    });
    $(".custom-menu li").click(function () {
        switch ($(this).attr("data-action")) {
            case "1": {
                var key = $.urlParam('key');
                var type = $('.' + id + ":nth-child(3)").text();
                var win = window.open("./statistics.php?id=" + id + "&type=" + type, '_blank');
                win.focus();
                break;
            }
            case "2": {
                var type = $('.' + id + ":nth-child(3)").text();
                $('textarea').css('display', '');
                switch(type) {
                    case "poll": {
                        $('textarea').text(window.location.protocol + "//" + window.location.hostname + "/pollview.html?type=poll&id=" + id);
                        break;
                    }
                    case "msgboard": {
                        $('textarea').text(window.location.protocol + "//" + window.location.hostname + "/msgview.html?type=msgboard&id=" + id);
                        break;
                    }
                    case "quiz": {
                        $('textarea').text(window.location.protocol + "//" + window.location.hostname + "/quizview.html?type=quiz&id=" + id);
                        break;
                    }
                }
                $('textarea').select();
                document.execCommand('copy');
                $('textarea').css('display', 'none');
                break;
            }
            case "3": {
                $('#modal').modal({ backdrop: 'static', keyboard: false });
                $('.modal-title').text('Expire ' + id + ' now?');
                $('.modal-body').text("Expire service ( id: " + id + " ) ?");
                $('#yes').text('Change');
                $('#no').text("Cancel");
                $('#yes').click(function(){
                    var time = new Date();
                    $.post('./php/expire.php', { id: id, time: time });
                    $('.modal-title').text('');
                    $('.modal-body').text("");
                    $('#yes').text('');
                    $('#no').text("");
                    $('.'+id + ":nth-child(4)").text(time);
                });
                break;
            }
            case "4": {
                $('#modal').modal({ backdrop: 'static', keyboard: false });
                $('.modal-title').text('Close ' + id + ' ?');
                $('.modal-body').html("Close service ( id: " + id + " ) ?<br><br><strong>ALL DATA IS ERASED</strong>    We advise you to view, then email the statistics of this service for future reference!");
                $('#yes').text('Delete');
                $('#no').text("Cancel");
                $('#yes').click(function () {
                    var time = new Date();
                    $.post('./php/delete.php', { id: id })
                    .done(function(){
                        $('.modal-title').text('');
                        $('.modal-body').text("");
                        var abc = $('.' + id).parent().remove(); 
                    });
                });
            }
        }
        $(".custom-menu").hide(100);
    });
    $('td').longpress(function(event) {
        id = event.target.id;
        event.preventDefault();
        $(".custom-menu").finish().toggle(100).
            css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });
    });
}
$('#add2').click(function() {
    $('table').fadeToggle();
    $('#settings').fadeToggle();
    $('.alert-info').toggleClass('alert-warning');
    $('.alert-warning').toggleClass('alert-info');
    switch(bool) {
        case false: {
            $('.alert-info').addClass('alert-warning');
            $('.alert-warning').removeClass('alert-info');
            $('#iadd2').attr('class', 'fas fa-info');
            $('#info').html('Use a strong password, comprised of upper and lower case, numbers and symbols.');
            bool = true;
            break;
        }
        case true: {
            $('.alert-warning').addClass('alert-info');
            $('.alert-info').removeClass('alert-warning');
            $('#iadd2').attr('class', 'fas fa-cog');
            $('#info').html('Right click or press and hold on service to edit.');
            bool = false;
            break;
        }
    }
    $('.btn-warning').click(function() {
        if (checkpwd(document.getElementById('pwdc'),0) == true && checkpwd(document.getElementById('pwdn'),1)==true) {
            $.post('./php/accounts/changepwd.php', { pwd: $('#pwdc').val(), newpwd: $('#pwdn').val() }, function(data) {
                console.log(data);
                if(data=="valid") {
                    $('table').fadeToggle();
                    $('#settings').fadeToggle();
                    $('#pwdc').val('');
                    $('#pwdn').val('');
                }
                else {
                    $('#pwdc').next().next().removeClass('bar');
                    $('#pwdc').next().next().next().addClass('badlabel');
                    $('#pwdc').next().next().addClass('bad');
                    alert("Current Password Incorrect!");
                }
            });
        }
    });
});
function checkpwd(pwdField,test) {
    if (pwdField.value.length == 0) {
        if(test==0) {
            $('#pwdc').next().next().removeClass('bar');
            $('#pwdc').next().next().next().addClass('badlabel');
            $('#pwdc').next().next().addClass('bad');
        }
        else {
            $('#pwdn').next().next().removeClass('bar');
            $('#pwdn').next().next().next().addClass('badlabel');
            $('#pwdn').next().next().addClass('bad');
        }
        return true;
    }
    if(test==0) {
        $('#pwdc').next().next().removeClass('bad');
        $('#pwdc').next().next().next().removeClass('badlabel');
        $('#pwdc').next().next().addClass('bar');
    }
    else{
        $('#pwdn').next().next().removeClass('bad');
        $('#pwdn').next().next().next().removeClass('badlabel');
        $('#pwdn').next().next().addClass('bar');
    }
    return true;
}