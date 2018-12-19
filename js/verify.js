$(document).ready(function() {
    var code = $.urlParam('code');
    $("#continue").click(function(){
        var num = 0;
        if(($('#name').val()).length == 0 ) {
            bad($('#name'));
            num++;
        }
        if(($('#dob').val()).length == 0) {
            bad($('#dob'));
            num++;
        }
        if(num == 0) {
            $('#start').fadeOut(0);
            $('#load').fadeIn(0);
            var name = $('#name').val();
            var dob = $('#dob').val();
            var date = new Date(dob);
            $.post('/php/verify.php', { code: code, name: name, dob: date }, function (data) {
                console.log(data);
                if (data == "Account Verified") {
                    $('#load').fadeOut(0);
                    $('#end').css('display', '');
                    $('h1').html(data + ",&nbsp You are now being redirected");
                    setTimeout(function () { 
                        window.location.replace('./');
                    }, 4000);
                }
                else {
                    $('#load').fadeOut(500);
                    $('#end').css('display', '');
                    $('h1').html("Invalid verify link!");
                    setTimeout(function () {
                                window.location.replace('./');
                            }, 4000);
                }
            });
        }
    }); 
});
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return 0;
    }
    return results[1] || 0;
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