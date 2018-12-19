<!DOCTYPE HTML>
<html>
    <head>
        <title>Peachy ~ Statistics</title>
        
        <!--    Styles     -->
        
        <link rel='stylesheet' type='text/css' href='css/statistics.css'>
        <link rel="stylesheet" href="/dependencies/offlinefonts.css">
        <link rel="stylesheet" href="/dependencies/bootstrap.min.css">
        <link rel="stylesheet" href="/dependencies/fontawesome-all.min.css">
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>

    </head>

    <body class="bodyanimation">

        <!--    Specality Modal     -->

        <div class="modal fade poppins unselectable" id="modal">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header padding">
                        <h2 class="modal-title"></h2>
                    </div>
                    <div class="modal-body">
                        <div class="spinner1" style="display: none;"></div>
                        <div class="sent text-center" style="display: none;">
                            <h3 id="txt"></h3>
                        </div>
                        <h5>Email statistics to email linked with <strong>this service</strong> or another email?</h5>
                        <div class="form-group">
                            <div class="group">
                                <input type="email" id="lemail" required autofocus value="<?php session_start(); echo $_SESSION['email']?>"onfocus='validateEmail(this)' onblur='validateEmail(this);' value="">                                        
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Email    <i class="fas fa-envelope"></i></label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="no" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                        <button type="button" id="yes" class="btn btn-success" >Send</button>
                    </div>
                </div>
            </div>
        </div>
            
        <!--    Loading     -->
        <div class="spinner" style="margin-top: 10%;"></div>
        <div class="container-fluid text-center padding" id="spinner">
            <h3 class="poppins" style="font-size: 3rem; color: #fff">Loading...</h3>
        </div>
        
        <!--    Navigation     -->
        
        <div id="navigation" class="container-fluid" style="display: none;">
            <button type="button" id="add" class="ripple btn btn-danger btn-fab float-right">
                <i class="fas fa-plus"></i>
            </button>
            <button type="button" id="add1" class="show1 ripple btn btn-fab-child float-right">
                <i class="fas fa-print" data-toggle="tooltip" data-placement="right" title="Print all statistics to PDF."></i>
            </button>
            <button type="button" id="add2" class="show2 ripple btn btn-fab-child float-right">
                <i class="fas fa-envelope" data-toggle="tooltip" data-placement="right" title="Email all statistics."></i>
            </button>
            <button type="button" id="add3" class="show3 ripple btn btn-fab-child float-right" onclick="window.close();">
                <i class="fas fa-sign-in-alt" data-toggle="tooltip" data-placement="right" title="Go back to account managment page."></i>
            </button>
        </div>

        <!--    Statistics Card     -->

        <div class="container-fluid padding">
            <div class="row padding">
                <div class="col-2" id="in" style="display: none;"></div>
                <div class="col-12" id="mainpoint" style="display: none;">
                    <div class="card">
                        <div class="card-header">
                            <div class="padding container-fluid">
                                <h2 class="card-title poppins unselectable">Statistics</h2>
                            </div>
                        </div>
                        <div class="card-body" style="overflow-y: scroll; overflow-x: hidden;">
                            <div class="col-12 poppins unselectable">
                                <h4>Select Data to view:</h4>
                            </div>
                            <div class="row roboto" id="datachoice">
                                <div class="col-xs-12 col-md-6">
                                    <ul>
                                        <li class="padding"><button id="countryb" type="button" class="btn btn-outline-primary btn-lg">Country Vists</button></li>
                                        <li class="padding"><button id="cityb" type="button" class="btn btn-outline-primary btn-lg">City Vists</button></li>
                                        <li class="padding"><button id="ipb" type="button" class="btn btn-outline-primary btn-lg">IP's</button></li>
                                    </ul>
                                </div>
                                <div class="col-xs-12 col-md-6">
                                    <ul>
                                        <li class="padding"><button id="internethostsb" type="button" class="btn btn-outline-primary btn-lg">ISP's Used</button></li>
                                        <li class="padding"><button id="timeb" type="button" class="btn btn-outline-primary btn-lg">Time's of Visit</button></li>
                                        <li class="padding"><button id="voteb" type="button" class="btn btn-outline-primary btn-lg"></button></li>
                                    </ul>
                                </div>                                
                            </div>
                            <div class="data" style="display: none;">
                                <div id="country" style="display: none;"></div>
                                <div id="city" style="display: none;"></div>
                                <div id="ip" style="display: none;">
                                    <table class="table-fit table table-hover unselectable">
                                        <thead class="text-center">
                                            <tr class="row roboto">
                                                <th class="col-4 bold">No.</th>
                                                <th class="col-4 bold">IP</th>
                                                <th class="col-4 bold">Repeats</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-center ip">
                                            <tr class="row roboto" id="none" style="display: none;">
                                                <td colspan="3">No Visits Yet!</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="internethosts" style="display: none;">
                                    <table class="table-fit table table-hover unselectable">
                                        <thead class="text-center">
                                            <tr class="row roboto">
                                                <th class="col-4 bold">No.</th>
                                                <th class="col-4 bold">ISP</th>
                                                <th class="col-4 bold">Repeats</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-center hosts">
                                            <tr class="row roboto" id="none" style="display: none;">
                                                <td colspan="3">No Visits Yet!</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="time" style="display: none;">
                                    <table class="table-fit table table-hover unselectable">
                                        <thead class="text-center">
                                            <tr class="row roboto">
                                                <th class="col-4 bold">No.</th>
                                                <th class="col-4 bold">Time</th>
                                                <th class="col-4 bold">Repeats</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-center times">
                                            <tr class="row roboto" id="none" style="display: none;">
                                                <td colspan="3">No Visits Yet!</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="vote" style="display: none;">
                                    <div class="container-fluid ml-auto padding">
                                        <h3 id="countdown" class="poppins unselectable"></h3>
                                    </div>
                                    <div id="columnchart"></div>
                                </div>
                                <div id="back" class"padding">
                                    <button type="button" class="btn btn-warning btn-block" style="margin-top: 5px;">Back</button>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer text-center">
                            <a class="btn btn-info">Help&nbsp;
                                <i class="fas fa-info-circle"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-2" id="in1" style="display: none;"></div>
            </div>
        </div>
        
        <!--    Print Area      -->

        <div id="print" style="display: none;">
            <div class="card">
                <div class="card-header">
                    <div class="padding poppins">
                        <h2 class="card-title" id="cardtitle"></h2>
                    </div>
                </div>
                <div class="card-body">
                <div class="col-12 poppins unselectable">
                    <h3>Country's:</h3>
                </div>
                <img id="country1" style="height: auto;">
                <br>
                <div class="col-12 poppins unselectable">
                    <h3>City's:</h3>
                </div>
                <img id="city1" style="height: auto;">
                <br>
                <div class="col-12 poppins unselectable">
                    <h3>IP's:</h3>
                </div>
                <div id="ip">
                    <table class="table-fit table table-hover unselectable">
                        <thead class="text-center">
                            <tr class="row roboto">
                                <th class="col-4 bold">No.</th>
                                <th class="col-4 bold">IP</th>
                                <th class="col-4 bold">Repeats</th>
                            </tr>
                        </thead>
                        <tbody class="text-center ip">
                            <tr class="row roboto" id="none2">
                                <td colspan="3">No Visits Yet!</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br>
                <div class="col-12 poppins unselectable">
                    <h3>ISP's:</h3>
                </div>
                <div id="internethosts">
                    <table class="table-fit table table-hover unselectable">
                        <thead class="text-center">
                            <tr class="row roboto">
                                <th class="col-4 bold">No.</th>
                                <th class="col-4 bold">ISP</th>
                                <th class="col-4 bold">Repeats</th>
                            </tr>
                        </thead>
                        <tbody class="text-center hosts">
                            <tr class="row roboto" id="none3">
                                <td colspan="3">No Visits Yet!</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12 poppins unselectable">
                    <h3>Access Time's:</h3>
                </div>
                <div id="time">
                    <table class="table-fit table table-hover unselectable">
                        <thead class="text-center">
                            <tr class="row roboto">
                                <th class="col-4 bold">No.</th>
                                <th class="col-4 bold">Time</th>
                                <th class="col-4 bold">Repeats</th>
                            </tr>
                        </thead>
                        <tbody class="text-center times">
                            <tr class="row roboto" id="none4">
                                <td colspan="3">No Visits Yet!</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12 poppins unselectable">
                    <h3>Vote's:</h3>
                </div>
                <div id="vote">
                    <div class="container-fluid ml-auto padding">
                        <h3 id="countdown" class="poppins unselectable"></h3>
                    </div>
                    <img id="columnchart1" style="height: auto;">
                    
                </div>
            </div>
            </div>
        </div>

    </body>

    <!--    Scripts     -->
    
    <script src="/dependencies/jquery.min.js"></script>
    <script src="/dependencies/popper.min.js"></script>
    <script src="/dependencies/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script>
    <script type='text/javascript' src='js/statistics.js'></script>
    <script type='text/javascript' src='dependencies/paroller.min.js'></script>
    <script>
        document.addEventListener('click', function (e) {
            if (document.activeElement.toString() == '[object HTMLButtonElement]') {
                document.activeElement.blur();
            }
        }); 
    </script>
    
</html>