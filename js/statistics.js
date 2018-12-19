var allowed = false;
var tnum = 0;
var success = false;
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return 0;
    }
    return results[1] || 0;
}
var id = $.urlParam('id');
var type = $.urlParam('type');
$('#cardtitle').text("Statistics of " + type + " with id: " + id);
$.post('./php/accounts/allowed.php', { id: id }, function (data) {
    if(data == "yes") {
        showstats();
        $('#navigation').css('display', '');
    }
    else {
        alert('Invalid Link!');
        window.close();
    }
});
function showstats() {
    setTimeout(function () {
        if (!success) {
            alert("No Data to show!");
            window.close();
        }
    }, 5000);
    $.getJSON('./stats/' + type + '/users/' + id + '.json', function(result) {
        success = true;
        $('.spinner').css('display', 'none');
        $('#spinner').css('display', 'none');
        var num = Object.keys(result).length;
        $('#mainpoint').css('display', 'inline');
        google.charts.load('current', { 'packages': ['geochart'], 'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'});
        google.charts.setOnLoadCallback(drawRegionsMap_country);
        google.charts.setOnLoadCallback(drawRegionsMap_city);
        var country = new Array();
        var city = new Array();
        var counts1 = new Array();
        var counts2 = new Array();
        for(var i=1;i<=num;i++) {
            country[i-1] = result["val" + num].country;
            city[i-1] = result["val" + num].city;
        }
        country.forEach(function (x) { counts1[x] = (counts1[x] || 0) + 1; });
        city.forEach(function (x) { counts2[x] = (counts2[x] || 0) + 1; });
        function drawRegionsMap_country() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Country');
            data.addColumn('number', 'Visits');
            for (i = 0; i < country.length; i++) {
                data.addRow([country[i], counts1[country[i]]]);
            }
            var options = {
                colorAxis: { colors: ['#b3ffcc', '#00802b'] },
                backgroundColor: '#81d4fa',
                datalessRegionColor: '#e6e6ff',
                defaultColor: '#f5f5f5',
                chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
                width: $('.card-body').width()
            };
            var chart_div = document.getElementById('country');
            var chart = new google.visualization.GeoChart(chart_div);
            google.visualization.events.addListener(chart, 'ready', function () {
                chart_div.innerHTML = '<img src="' + chart.getImageURI() + '">';
            });
            chart.draw(data, options);
        }
        function drawRegionsMap_city() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'City');
            data.addColumn('number', 'Visits');
            for (i = 0; i < city.length; i++) {
                data.addRow([city[i], counts2[city[i]]]);
            }
            var options = {
                sizeAxis: { minValue: 0, maxValue: 100 },
                displayMode: "markers",
                colorAxis: { colors: ['#b3ffcc', '#00802b'] },
                backgroundColor: '#81d4fa',
                datalessRegionColor: '#e6e6ff',
                defaultColor: '#f5f5f5',
                chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
                width: $('.card-body').width()
            };
            var chart_div = document.getElementById('city');
            var chart = new google.visualization.GeoChart(chart_div);
            google.visualization.events.addListener(chart, 'ready', function () {
                chart_div.innerHTML = '<img src="' + chart.getImageURI() + '">';
            });
            chart.draw(data, options);
        }
        $.getJSON('./data/' + type + '/' + id + '.json', function(data) {
            var time = data.time;
            var optiont = data.option;
            var countDownDate = new Date(time);
            var countdownfunction = setInterval(function () {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
                    + minutes + "m " + seconds + "s";
                if (distance <= 0) {
                    clearInterval(countdownfunction);
                    document.getElementById("countdown").innerHTML = "Time up!";
                }
            }, 1000);
            console.log(type);
            if(type=="poll") {
                $('#voteb').text("Vote Statistics");
                $.getJSON('./stats/' + type + '/values/' + id + '.json', function (result1) {
                    var colours = ["color: #B03A2E", "color: #880E4F", "color: #F64C72", "color: #76448A", "color: #A4B3B6", "color: #2874A6", "color: #00FFFF", "color: #FFCB9A", "color: #039BE5", "color: #FC4445", "color: #148F77", "color: #B9770E", "color: #ADADAD", "color: #00FF00", "color: #BC968A", "color: #FF7043", "color: #AFD275", "color: #A04000", "color: #717D7E", "color: #212F3D"];
                    var result2 = eval(result1);
                    var num = Object.keys(optiont).length;
                    tnum = num;
                    google.charts.load("current", { packages: ["corechart"] });
                    google.charts.setOnLoadCallback(drawChart);
                    function drawChart() {
                        var data = new google.visualization.DataTable();
                        data.addColumn({ type: 'string', id: 'Option / Topic', label: 'Option / Topic' });
                        data.addColumn({ type: 'number', id: 'Votes', label: 'Votes' });
                        data.addColumn({ type: "string", role: "style" });
                        for (var i = 0; i < num; i++) {
                            data.addRow([optiont["opt" + (i + 1)], result2.option[i + 1], colours[i]]);
                        }
                        var view = new google.visualization.DataView(data);
                        view.setColumns([0, 1,
                            {
                                calc: "stringify",
                                sourceColumn: 1,
                                type: "string",
                                role: "annotation"
                            },
                            {
                                calc: "stringify",
                                sourceColumn: 0,
                                type: "string",
                                role: "annotation"
                            },
                            2]);
                        var options = {
                            title: "Vote Statistics",
                            legend: { position: 'top', textStyle: { color: 'blue', fontSize: 16 } },
                            tooltip: { trigger: 'selection' },
                            bar: { groupWidth: '50%' },
                            chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
                            width: $('.card-body').width()
                        };
                        var chart_div = document.getElementById('columnchart');
                        var chart = new google.visualization.ColumnChart(chart_div);
                        google.visualization.events.addListener(chart, 'ready', function () {
                            chart_div.innerHTML = '<img src="' + chart.getImageURI() + '">';
                        });
                        chart.draw(view, options);
                    }
                });
            }
            else if (type=="msgboard"){
                $('#voteb').parent().remove();
            }
        });
        if(num==0) {
            $('#none').css('display', '');
        }
        else {
            var time = new Array();
            var timec = new Array();
            var timen = new Array();
            var isp = new Array();
            var ispc = new Array();
            var ispn = new Array();
            var ip = new Array();
            var ipc = new Array();
            var ipn = new Array();
            for (var i = 1; i <= num; i++) {
                ip[i - 1] = result["val" + i].ip;
                time[i - 1] = result["val" + i].time;
                isp[i - 1] = result["val" + i].isp;
            }
            ip.forEach(function (x) { ipc[x] = (ipc[x] || 0) + 1; });
            isp.forEach(function (x) { ispc[x] = (ispc[x] || 0) + 1; });
            time.forEach(function (x) { timec[x] = (timec[x] || 0) + 1; });
            $.each(ip, function (i, el) {
                if ($.inArray(el, ipn) === -1) ipn.push(el);
            });
            $.each(isp, function (i, el) {
                if ($.inArray(el, ispn) === -1) ispn.push(el);
            });
            $.each(time, function (i, el) {
                if ($.inArray(el, timen) === -1) timen.push(el);
            });
            for (var i = 1; i <= ipn.length; i++) {
                var ipp = "<tr class='row roboto'><td class='light col-4'>" + i + "</td><td class='light col-4'>" + ipn[i - 1] + "</td><td class='light col-4'>" + ipc[ipn[i - 1]] + "</td></tr>"
                var isps = "<tr class='row roboto'><td class='light col-4'>" + i + "</td><td class='light col-4'>" + ispn[i - 1] + "</td><td class='light col-4'>" + ispc[ispn[i - 1]] + "</td></tr>"
                $('.ip').append(ipp);
                $('.hosts').append(isps);
            }
            for(var i=1; i<=timen.length; i++) {
                var times = "<tr class='row roboto'><td class='light col-4'>" + i + "</td><td class='light col-4'>" + timen[i - 1] + "</td><td class='light col-4'>" + timec[timen[i - 1]] + "</td></tr>"
                $('.times').append(times);
            }
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
    var h = window.innerHeight;
    h *= 0.9;
    h += "px";
    $('.card').css('height', h);
    $('.card').css('height-max', h);
    $('#country1').css('width', $('#country').css('width'));
    $('#city1').css('width', $('#city').css('width'));
    $('#columnchart1').css('width', $('#columnchart').css('width'));
}
$(window).resize(function(){
    resize();   
});
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    resize();
});
$('#add2').click(function() {
    $('#modal').modal({ backdrop: 'static', keyboard: false });
    $('#yes').click(function () {
        if(validateEmail(document.getElementById('lemail')) == true) {
            if (tnum == 0) {}
            else {
                $('#none2').remove();
                $('#none3').remove();
                $('#none4').remove();
            }
            $('#country1').attr('src', $('#country').find('img').attr('src'));
            $('#city1').attr('src', $('#city').find('img').attr('src'));
            $('#columnchart1').attr('src', $('#columnchart').find('img').attr('src'));         
            var divContents = $("#print").html();
            var front = '<html><head><title>Statistics of ' + type + ': ' + id + '</title>' + "<link rel='stylesheet' type='text/css' href='css/statistics.css'><link href='https://fonts.googleapis.com/css?family=Pacifico|Roboto+Slab:700|Poppins:400,500,700' rel='stylesheet'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'><link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.0.12/css/all.css'><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'>";
            var start = '</head><body>';
            var end = "</body></html>";
            var total = front + start + divContents + end;
            var email = $('#lemail').val();
            $('.spinner1').css('display', '');
            $('.sent').css('display', '');
            $('.form-group').css('display', 'none');
            $('h5').css('display', 'none');
            $('#txt').text('Sending...');
            $.post('./php/sendstats.php', { data: total, id: id, type: type, email: email }, function(data){
                $('.spinner1').css('display', 'none');
                $('.sent').css('display', 'none');
                $('.form-group').css('display', '');
                $('h5').css('display', '');
                $('#txt').text('');
                $('#modal').modal('toggle');
            });
        }
    });
});
$('#add1').click(function() {
    var id = $.urlParam('id');
    var type = $.urlParam('type');
    if (tnum == 0) {}
    else {
        $('#none2').remove();
        $('#none3').remove();
        $('#none4').remove();
    }
    $('#country1').attr('src', $('#country').find('img').attr('src'));
    $('#city1').attr('src', $('#city').find('img').attr('src'));
    $('#columnchart1').attr('src', $('#columnchart').find('img').attr('src'));
    var divContents = $("#print").html();
    var h = window.innerHeight;
    var w = window.innerWidth;
    var string = "height=" + h + ",width=" + w;
    var printWindow = window.open('', '', string);
    var front = '<html><head><title>Statistics of ' + type + ': ' + id + '</title>' + "<link rel='stylesheet' type='text/css' href='css/statistics.css'><link href='https://fonts.googleapis.com/css?family=Pacifico|Roboto+Slab:700|Poppins:400,500,700' rel='stylesheet'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'><link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.0.12/css/all.css'><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'>";
    var start = '</head><body>';
    var end = "</body></html>";
    var total = front + start + divContents + end;
    printWindow.document.write(total);
    printWindow.document.getElementById('country1').style.width = window.innerWidth;
    printWindow.document.getElementById('city1').style.width = window.innerWidth;
    printWindow.document.getElementById('columnchart1').style.width = window.innerWidth;
    /*printWindow.document.write('<html><head><title>Statistics of ' + type + ': ' + id + '</title>' + "<link rel='stylesheet' type='text/css' href='css/statistics.css'><link href='https://fonts.googleapis.com/css?family=Pacifico|Roboto+Slab:700|Poppins:400,500,700' rel='stylesheet'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'>");
    printWindow.document.write('</head><body>');
    printWindow.document.write(divContents);
    printWindow.document.write("</body></html>");*/
    printWindow.document.close();
    printWindow.setTimeout(function() {
        printWindow.print();
    }, 1000);
});
$(".card-body").scroll(function () {
    if ($(this).scrollTop() >= 50) {
        $('#plus').fadeIn(200);
    } else {
        $('#plus').fadeOut(200);
    }
});
$('#plus').click(function () {
    $(".card-body").animate({
        scrollTop: 0
    }, 500);
});
$('.btn-lg').click(function() {
    var temp = $(this).attr('id');
    var data = temp.slice(0, -1);
    display(data);
});
function display(location) {
    $('.data').fadeToggle();
    $('h4').text(location + ":");
    $('#datachoice').fadeToggle();
    $('.data').children().css('display', 'none');
    $('#back').css('display', '');
    $('.btn-warning').css('display', '');
    $('#' + location).css('display', '');
}
$('.btn-warning').click(function() {
    $('.data').fadeToggle();
    $('#datachoice').fadeToggle();
    $('h4').text("Select Data to view:");
}); 
function truestate() {
    $('#add').animate({ borderSpacing: 45 }, {
        step: function (now, fx) {
            $(this).css('transform', 'rotate(' + now + 'deg)');
        },
        duration: 250
    }, 'linear');
    $('#add1').animate({ bottom: "7rem" }, 200);
    $('#add1').animate({ bottom: "5rem" }, 100);
    $('#add1').animate({ bottom: "6rem" }, 50);
    $('#add2').animate({ bottom: "12rem" }, 170);
    $('#add2').animate({ bottom: "10rem" }, 70);
    $('#add2').animate({ bottom: "11rem" }, 20);
    $('#add3').animate({ bottom: "17rem" }, 150);
    $('#add3').animate({ bottom: "15rem" }, 50);
    $('#add3').animate({ bottom: "16rem" }, 0);
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
var state = true;
$('#add').click(function () {
    if (state == true) {
        truestate();
    }
    else {
        falsestate();
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