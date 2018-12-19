(function ($) {
    const loginwindow = "<div class='modal fade poppins' id='login'><div class='modal-dialog modal-lg modal-dialog-centered'><div class='modal-content'><div class='modal-header'><h4 class='modal-title'>Login</h4> <button type='button' class='close' onclick='$.votify_close();'>&times;</button></div><div class='modal-body'><div class='container-fluid'><div class='unselectable' style='display: none;'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></div><div class='container-fluid' id='lform'><div class='form-group'><div class='group'> <input type='email' id='lemail' required autocomplete='email' autofocus onfocus='$(this).votify_validate();' onblur='$(this).votify_validate();'> <span class='highlight'></span> <span class='bar'></span> <label>Email <i class='fas fa-envelope'></i> </label></div></div><div class='form-group'><div class='group'> <input type='password' id='lpwd' required> <span class='highlight'></span> <span class='bar'></span> <label>Password <i class='fas fa-key'></i> </label></div></div><div class='row'><p class='ml-auto'> <button id='lsubmit' class='btn btn-primary'>Login</button></p></div></div></div></div><div class='modal-footer'><div class='alert alert-danger' id='lincorrect' style='display: none;'> <strong id='lerrormsg'>Error!</strong></div><div class='col-3'></div> <button type='button' class='btn btn-danger' onclick='$.votify_close();'>Close</button></div></div></div></div>";
    const signupwindow = "<div class='modal fade poppins' id='signup'><div class='modal-dialog modal-lg modal-dialog-centered'><div class='modal-content'><div class='modal-header'><h4 class='modal-title'>Sign Up</h4> <button type='button' class='close' onclick='$.votify_close();'>&times;</button></div><div class='modal-body'><div class='container-fluid'><div class='unselectable' style='display: none;'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></div><div class='container-fluid' id='lform'><div class='form-group'><div class='group'> <input type='email' id='lemail' required autocomplete='email' autofocus onfocus='$(this).votify_validate();' onblur='$(this).votify_validate();'> <span class='highlight'></span> <span class='bar'></span> <label>Email <i class='fas fa-envelope'></i> </label></div></div><div class='form-group'><div class='group'> <input type='password' id='lpwd' required> <span class='highlight'></span> <span class='bar'></span> <label>Password <i class='fas fa-key'></i> </label></div></div><div class='row'><p class='ml-auto'> <button id='lsubmit' class='btn btn-primary'>Create Account</button></p></div></div></div></div><div class='modal-footer'><div class='alert alert-danger' id='lincorrect' style='display: none;'> <strong id='lerrormsg'>Error!</strong></div><div class='col-3'></div> <button type='button' class='btn btn-danger' onclick='$.votify_close();'>Close</button></div></div></div></div>";
    $.fn.voteify_start = function(options) {
        var settings = $.extend({
            checkstate: true,
            method: "none"
        }, options);
        return this.each(function() {
            if(settings.checkstate === true) {
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
            }
            if(settings.method === "login") {
                $(this).empty();
                $(this).append(loginwindow);
            }
            if(settings.method === "signup") {
                $(this).empty();
                $(this).append(signupwindow);
            }
        });
    }
    $.votify_close = function() {
        $(".modal").modal("hide");
        return 1;
    }
}(jQuery));
