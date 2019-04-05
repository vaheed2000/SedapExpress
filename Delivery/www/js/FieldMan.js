var Selected_Order;
var Selected_OrderId;
var AllOrder_JSON;
var Selected_Status;
var Flag_StatusSubmit = false;
var Selected_Status_Name;
var ProofSignatureId;
var Shipping_Location;
var Base_Url = 'http://13.67.53.208:8088/';
document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);

function onOffline() {
    $.afui.clearHistory();
    $.afui.loadContent("#NoNetwork", false, false, "fade");
    $('#Emptynetwork').css('display', 'block');
    $('#Emptynetwork').css('display', 'block');
}
function onOnline() { }

function LoadLocationPage() {

    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        setTimeout(function () {
            window.location = "home.html";
        }, 1000);
    }
    else {
        setTimeout(function () {
            window.location = "login.html";
        }, 1000);
    }
}

function check(form)/*function to check userid & password*/ {
    //     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) 
    //    { 

    //  $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url + 'Customer.svc/Authentication?Username=' + form.userid.value + '&Password=' + form.pswrd.value,
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
        //   $.afui.hideMask();
    });

    function ajaxSucceess(response) {

        if (JSON.parse(response.d).length != 0) {
            //          window.location="home.html";    
            $.each(JSON.parse(response.d), function (key, value) {

                window.localStorage.setItem("LoginCustomerID", value.Id);
                window.localStorage.setItem('LoginUserName', value.Email);
            });
            window.location = "home.html";
        }
        else {
            alert("Invalid UserName or Password");
        }
    }
    function ajaxError(response) {
        alert(response.responseText);
    }
    //     } 
    //    else{ 
    //         window.location="home.html"; 
    //        
    //    }
}


function TrackOrder() {
    var el, evt;

    if (navigator.msPointerEnabled || !('ontouchend' in window))    // if on Win 8 machine or no touch
        evt = "click";                                             // let touch become a click event
    else                                                            // else, assume touch events available
        evt = "touchend";                                          // not optimum, but works

    el = document.getElementById("Scan");
    el.addEventListener(evt, myEventHandler, false);

    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url + 'Order.svc/DeliveryOrderStatus',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
        $("#Scan").css("display", "none");
        $("#SaveSignature").css("display", "none");
        $("#new").css("display", "none");
        $("#Navigation").css("display", "none");
        $("#Delete").css("display", "none");
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        AllOrder_JSON = response;
        $('#Orderly').empty();
        $.each(JSON.parse(response.d), function (key, value) {
            $('#Orderly').append(TrackOrderHtml(value.StatusCount, value.StatusName, value.OrderStatusID, value.IsUpdateStatus, value.ProcessID));
        });
    }
    function ajaxError(response) {
        alert(errormsg.responseText);
    }
}

function RefreshDashboard() {
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url + 'Order.svc/DeliveryOrderStatus',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
        $("#Scan").css("display", "none");
        $("#SaveSignature").css("display", "none");
        $("#new").css("display", "none");
        $("#Delete").css("display", "none");
        $("#Navigation").css("display", "none");
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        AllOrder_JSON = response;
        $('#Orderly').empty();
        $.each(JSON.parse(response.d), function (key, value) {
            $('#Orderly').append(TrackOrderHtml(value.StatusCount, value.StatusName, value.OrderStatusID, value.IsUpdateStatus, value.ProcessID));
        });
    }
    function ajaxError(response) {
        alert(errormsg.responseText);
    }
}
function TrackOrderHtml(StatusCount, StatusName, OrderStatusID, IsUpdateStatus, ProcessID) {
    Html = "<li><a  onclick='OrderList(this)' data-ProcessID='" + ProcessID + "' data-StatusNo='" + OrderStatusID + "'  data-StatusName='" + StatusName + "' data-IsUpdateStatus='" + IsUpdateStatus + "'><i class='fa fa-arrow-circle-right' aria-hidden='true'></i></a><span>" + StatusCount + "</span><strong>" + StatusName + "</strong></li>";

    return Html;
}

function OrderList(ThisVal) {
    Selected_Order = ThisVal;
    Selected_Status_Name = $(ThisVal).attr("data-StatusName");
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url + 'Order.svc/OrderlyDetails?OrderStatusId=' + $(ThisVal).attr("data-StatusNo"),
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
        $("#Scan").css("display", "none");
        $("#SaveSignature").css("display", "none");
        $("#new").css("display", "none");
        $("#Refresh").css("display", "block");
        $("#Delete").css("display", "none");
        $("#location").css("display", "none");
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        $('#OrderList').empty();
        if (JSON.parse(response.d).length == 0) {
            $.afui.loadContent("#OrderListPage", false, false, "fade");
            $('#EmptyOrderList').css('display', 'block');
            $('#EmptyOrderList').css('display', 'block');
        } else {
            $('#EmptyOrderList').css('display', 'none');
        }
        $("#StatusOrders").attr("data-title", $(ThisVal).attr("data-StatusName"));

        $.afui.loadContent("#StatusOrders", false, false, "fade");

        $.each(JSON.parse(response.d), function (key, value) {

            $('#OrderList').append(OrderListHtml(value.Id, value.OrderTotal, value.CreatedOnUtc, value.PhoneNumber, $(ThisVal).attr("data-StatusNo"), $(ThisVal).attr("data-IsUpdateStatus"), $(ThisVal).attr("data-StatusName"), $(ThisVal).attr("data-ProcessID")));
        });
    }
    function ajaxError(response) { }
}

function OrderListHtml(Id, OrderTotal, CreatedOnUtc, PhoneNumber, StatusNo, IsUpdateStatus, StatusName, ProcessID) {

    var Html;
    var status = StatusNo;
    var date = new Date(CreatedOnUtc);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var day = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth();

    var hours = (hours + 24 - 2) % 24;
    var mid = 'AM';
    if (hours == 0) {
        hours = 12;
    }
    else if (hours > 12) {
        hours = hours % 12;
        mid = 'PM';
    }



    var DialNumber = "tel:" + PhoneNumber;
    Html = '<div class="card" >' +
        '<div class="TopOrderSection">' +
        '   <div class="orderid">' +
        '   <span onclick="TrackOrderDetailsShipping(this)" data-status="' + status + '" ' +
        'data-orderid="' + Id + '" data-isupdatestatus="' + IsUpdateStatus + '" ' +
        'data-statusname="' + StatusName + '" data-ProcessID="' + ProcessID + '">#' + Id + '</span>' +
        '  </div>' +
        ' <div class="orderdetails">' +
        '<div class="ordermobile">' +
        '   <span  data-ProcessID="' + ProcessID + '" data-status="' + status + '" ' +
        'data-orderid="' + Id + '" data-statusname="' + StatusName + '" ' +
        'data-isupdatestatus="1">' + day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ' ' + mid + '</span>' +
        '  </div>' +
        ' <div class="orderdateprice">' +
        '<div class="orderdate">' +




        '   <i class="fa fa-phone" aria-hidden="true"></i><a href="' + DialNumber + '" ' + 'style="margin-left:5px;font-weight:bold">' + PhoneNumber + '</a>' +
        '  </div>' +
        ' <div class="orderprice">' +
        '<span  data-ProcessID="' + ProcessID + '" data-status="' + status + '" ' +
        'data-orderid="' + Id + '" data-statusname="' + StatusName + '" ' +
        'data-isupdatestatus="1">' + OrderTotal + ' RM</span>' +
        '     </div>' +
        ' </div>' +
        '</div>' +
        '          </div>' +
        '     </div>';


    return Html;
}

function TrackOrderProducts(ThisVal, PageStatus) {
    $.afui.showMask('Loading');
    var orderId = $(ThisVal).attr("data-OrderId");
    var StatusNo = $(ThisVal).attr("data-status");
    var IsUpdateStatus = $(ThisVal).attr("data-IsUpdateStatus");
    var StatusName = $(ThisVal).attr("data-StatusName");
    var ProcessID = $(ThisVal).attr("data-ProcessID");
    Selected_OrderId = orderId;
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url + 'Order.svc/OrderProductDetails?OrderId=' + $(ThisVal).attr("data-OrderId"),
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
        if (ProcessID.split(',').length == 1) {
            Flag_StatusSubmit = true;
        }
        else {
            Flag_StatusSubmit = false;
        }
        StatusUpdate("FromOrderId");
        $.afui.hideMask();
    });
    var idcontrol = 0;
    function ajaxSucceess(response) {
        $("#StatusOrdersProducts").attr("data-title", "#" + $(ThisVal).attr("data-OrderId"));

        $.afui.loadContent("#StatusOrdersProducts", false, false, "fade");
        $('#OrderProductList').empty();

        $.each(JSON.parse(response.d), function (key, value) {
            idcontrol++;
            $('#OrderProductList').append(BindTrackOrderProducts(idcontrol, value.ProductId, value.Image, value.Name, value.Price, value.Quantity, value.TotalPrice, value.OfferPercentage, value.Sku, PageStatus, IsUpdateStatus));
        });

        if (PageStatus == 1 && IsUpdateStatus == "1") {
            $('#OrderProductList').append("<br><input type='button' onclick='StatusUpdateSubmit(" + orderId + "," + StatusNo + "," + idcontrol + ")' value='Submit' style='background:#fe4e51 ;color:#fff;font-size:100%'>");

            $("#Scan").css("display", "block");
        }
    }
    function ajaxError(response) {
    }
}

function BindTrackOrderProducts(ControlId, ProductId, Image, Name, Price, Quantity, TotalPrice, OfferPercentage, sku, PageStatus, IsUpdateStatus) {
    var Html;
    var QuantityTextId = "Quantity_" + ProductId;
    var CheckboxId = "SKU_" + sku;
    if (PageStatus == 1 && IsUpdateStatus == "1") {
        Html = "<div class='card'>" +
            "<div class='imags'  ><img  style='margin-left:-10px;width:100px;height:50%' src=" + Image + " /></div>" +
            "<div class='productdetaillist'>" +
            "<ul>" +
            "<li style='margin-left:75px;margin-top: -65px'>" +
            "<strong style='margin-right:0px'>" + Name + "</strong><br>" +
            "<span style='color:#98c92f'>" + Price + " RM</span><span style='color:#a0a0a0'> x </span>" +
            "<span style='color:#a0a0a0'>" + Quantity + "=</span>" +
            "<span style='color:#000000'>" + TotalPrice + " RM</span><br>" +
            "<strong class='checkouttotal' style='margin-left:-5px'>Sku :" + sku + " </strong>" +
            "</li>" +
            "<input id=" + ControlId + "  type='checkbox'>" +
            "<label for=" + ControlId + "></label>" +
            "</ul>" +
            "</div>" +
            "</div>";
    }
    else {
        Html = "<br><div class='card'>" +
            "<div class='imags'  ><img  style='margin-left:-10px;width:100px;height:50%' src=" + Image + " /></div>" +
            "<div class='productdetaillist'>" +
            "<ul>" +
            "<li style='margin-left:80px;margin-top: -65px'>" +
            "<strong style='margin-right:0px'>" + Name + "</strong><br>" +
            "<span style='color:#98c92f'>" + Price + " RM</span><span style='color:#a0a0a0'> x </span>" +
            "<span style='color:#a0a0a0'>" + Quantity + "=</span>" +
            "<span style='color:#000000'>" + TotalPrice + " RM</span><br>" +

            "<strong class='checkouttotal' style='margin-left:-5px'>Sku :" + sku + " </strong>" +
            "</li>" +
            "</ul>" +
            "</div>" +
            "</div>";
    }
    return Html;
}

function StatusUpdateSubmit(OrderId, StatusNo, ControlId) {

    var flag = 0;
    for (i = 1; i <= ControlId; i++) {
        if (document.getElementById(i).checked == false) {
            flag = 1;
        }
        else {
            flag = 0;
        }
    }
    if (flag == 1) {
        alert("Some products remaining");
    }
    else {
        var status = $(Selected_Order).attr("data-ProcessID");
        for (i = 0; i < status.split(',').length; i++) {
            if (i == 2) {
                Flag_StatusSubmit = true;
                $.ajax({
                    type: "GET",
                    method: "GET",
                    url: Base_Url + 'Order.svc/OrderlyStatusUpdate?OrderId=' + OrderId + '&OrderStatusId=' + Number(status.split(',')[i]),
                    success: ajaxSucceess,
                    error: ajaxError
                }).done(function () {
                });
                function ajaxSucceess(response) {
                    OrderList(Selected_Order);
                    $.afui.goBack();
                }
                function ajaxError(response) { }
            }
        }
    }

}

function StatusUpdate(Type) {
    if (Type == "FromOrderId") {
        var status = $(Selected_Order).attr("data-ProcessID");
        for (i = 0; i < status.split(',').length; i++) {
            if (i == 1) {
                $.ajax({
                    type: "GET",
                    method: "GET",
                    url: Base_Url + 'Order.svc/OrderlyStatusUpdate?OrderId=' + Selected_OrderId + '&OrderStatusId=' + Number(status.split(',')[i]),
                    success: ajaxSucceess,
                    error: ajaxError
                }).done(function () {
                });
                function ajaxSucceess(response) { }
                function ajaxError(response) { }
            }
        }
    }
    else if (Type == "BackButton") {
        var status = $(Selected_Order).attr("data-ProcessID");
        for (i = 0; i < status.split(',').length; i++) {
            if (i == 0) {
                $.ajax({
                    type: "GET",
                    method: "GET",
                    url: Base_Url + 'Order.svc/OrderlyStatusUpdate?OrderId=' + Selected_OrderId + '&OrderStatusId=' + Number(status.split(',')[i]),
                    success: ajaxSucceess,
                    error: ajaxError
                }).done(function () {
                });
                function ajaxSucceess(response) { }
                function ajaxError(response) { }
            }
        }
    }
}


function CustomerInformation() {

    //      $.afui.clearHistory();


    $.afui.showMask('Loading');

    $.ajax({

        type: "GET",
        method: "GET",
        url: Base_Url + 'Customer.svc/CustomerInfo?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {


        $.each(JSON.parse(response.d), function (key, value) {
            LoadCountries_InnerCustomer('CustomerInfo_country', value.CountryId.toString().trim(), value.StateProvinceId.toString().trim());
            $("#CustomerInfo_firstname").val(value.FirstName);
            $("#CustomerInfo_lastname").val(value.LastName);
            $("#CustomerInfo_email").val(value.Email);
            $("#CustomerInfo_phone").val(value.Phone);
            $("#CustomerInfo_address").val(value.StreetAddress);
        });





        //                                $("#Quantity_" + ProductId).val(Number($("#Quantity_" + ProductId).val()) + 1);

    }

    function ajaxError(response) {
        //         alert(errormsg.responseText); 
    }

}

function CustomerInfo_Update() {
    var CustomerInfo_firstname = $("#CustomerInfo_firstname").val();
    var CustomerInfo_lastname = $("#CustomerInfo_lastname").val();
    var CustomerInfo_email = $("#CustomerInfo_email").val();
    var CustomerInfo_phone = $("#CustomerInfo_phone").val();
    var CustomerInfo_address = $("#CustomerInfo_address").val();
    //     var CustomerInfo_country = $("#CustomerInfo_country").val();
    //     var CustomerInfo_area = $("#CustomerInfo_area").val();

    var CustomerInfo_country = document.CustomerInfo.CustomerInfo_country;
    var CustomerInfo_area = document.CustomerInfo.CustomerInfo_area;

    if (firstname_validationCustomerInfo(CustomerInfo_firstname)) {
        if (lastname_validationCustomerInfo(CustomerInfo_lastname)) {
            if (ValidateEmailCustomerInfo(CustomerInfo_email)) {
                if (allnumericCustomerInfo(CustomerInfo_phone)) {
                    if (alphanumericCustomerInfo(CustomerInfo_address)) {
                        if (countryselectCustomerInfo(CustomerInfo_country)) {
                            if (areaselectCustomerInfo(CustomerInfo_area)) {
                                CustomerInfoUpdateSave();
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}


function firstname_validationCustomerInfo(CustomerInfo_firstname) {
    var firstname_len = document.forms["CustomerInfo"]["CustomerInfo_firstname"].value;
    if (firstname_len == "") {
        alert("First Name should not be empty");
        CustomerInfo_firstname.focus();
        return false;
    }
    return true;
}

function lastname_validationCustomerInfo(CustomerInfo_lastname) {
    var lastname_len = document.forms["CustomerInfo"]["CustomerInfo_lastname"].value;
    if (lastname_len == "") {
        alert("Last Name should not be empty");
        CustomerInfo_lastname.focus();
        return false;
    }
    return true;
}


function ValidateEmailCustomerInfo(CustomerInfo_email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (CustomerInfo_email.match(mailformat)) {
        return true;
    } else {
        alert("You have entered an invalid email address!");
        CustomerInfo_email.focus();
        return false;
    }
}

function allnumericCustomerInfo(CustomerInfo_phone) {
    var numbers = /^[0-9]+$/;
    if (CustomerInfo_phone.match(numbers)) {
        return true;
    } else {
        alert('Phone code must have numeric characters only');
        CustomerInfo_phone.focus();
        return false;
    }
}

function alphanumericCustomerInfo(CustomerInfo_address) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (CustomerInfo_address.match(letters)) {
        return true;
    } else {
        alert('Address must have alphanumeric characters only');
        CustomerInfo_address.focus();
        return false;
    }
}

function countryselectCustomerInfo(CustomerInfo_country) {
    if (CustomerInfo_country.value == "0") {
        alert('Select your country from the list');
        CustomerInfo_country.focus();
        return false;
    } else {
        return true;
    }
}
function areaselectCustomerInfo(CustomerInfo_area) {
    if (CustomerInfo_area.value == "0") {
        alert('Select your area from the list');
        CustomerInfo_area.focus();
        return false;
    } else {
        return true;
    }
}

function CustomerInfoUpdateSave() {


    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({

            type: "GET",
            method: "GET",
            url: Base_Url + 'Customer.svc/CustomerInfoUpdate?CustomerId=' + window.localStorage.getItem("LoginCustomerID") + '&FirstName=' + $("#CustomerInfo_firstname").val() + '&LastName=' + $("#CustomerInfo_lastname").val() +
            '&StreetAddress=' + $("#CustomerInfo_address").val() + '&CountryId=' + $("#CustomerInfo_country").val() + '&StateProvinceId=' + $("#CustomerInfo_area").val() + '&Phone=' + $("#CustomerInfo_phone").val(),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function () {
            // CustomerInformation();
            $.afui.hideMask();
            ProfileLoad();
        });

        function ajaxSucceess(response) {

            alert('Customer Info SuccessFully Updated');

        }

        function ajaxError(response) {

        }
    }
}

function ProfileLoad() {


    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {

        $.afui.showMask('Loading');

        $.ajax({

            type: "GET",
            method: "GET",
            url: Base_Url + 'Customer.svc/CustomerInfo?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function () {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {


            $.each(JSON.parse(response.d), function (key, value) {

                $("#ProfileName").html(value.FirstName + ' ' + value.LastName);
                $("#ProfileEmail").text(value.Email);
                $("#ProfileEdit").css("visibility", "visible");
                if (value.Picture != '0') {
                    $(".avathar").css("background-image", "url('" + value.Picture + "')");
                }
                else {
                    $(".avathar").css("background-image", "url('img/User.png')");


                }


            });





            //                                $("#Quantity_" + ProductId).val(Number($("#Quantity_" + ProductId).val()) + 1);

        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
    else {
        $("#ProfileName").html('');
        $("#ProfileEmail").text('');

        $(".avathar").css("background-image", "url('img/User.png')");
        $("#ProfileEdit").css("visibility", "hidden");
    }

}

function LoadCountries_InnerCustomer(IdVal1, SelectedCountry_Val1, SelectedArea_Val1) {
    $.afui.showMask('Loading');

    $.ajax({

        type: "GET",
        method: "GET",
        url: Base_Url + 'Location.svc/Get',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {

        $("#CustomerInfo_country").val(SelectedCountry_Val1.trim()).attr("selected", "selected");;
        LoadArea_InnerCustomer('CustomerInfo_area', SelectedCountry_Val1.trim(), SelectedArea_Val1.trim());
    });

    function ajaxSucceess(response) {
        $('#' + IdVal1).empty();
        $('#' + IdVal1).append("<option value = '0'>Country</option>");
        $.each(JSON.parse(response.d), function (key, value) {


            $('#' + IdVal1).append("<option value ='" + value.Id + "'>" + value.Name + " </option>");



        });

    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);
    }
}

function LoadArea_InnerCustomer(IdVal1, SelectedCountry_Val1, SelectedArea_Val1) {



    $.ajax({

        type: "GET",
        method: "GET",
        url: Base_Url + 'Location.svc/GetAllArea?CountryId=' + SelectedCountry_Val1,
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
        $("#CustomerInfo_area").val(SelectedArea_Val1.trim()).attr("selected", "selected");;
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        $('#' + IdVal1).empty();
        $('#' + IdVal1).append("<option value = '0'>Location</option>");
        $.each(JSON.parse(response.d), function (key, value) {


            $('#' + IdVal1).append("<option value = '" + value.Id + "'>" + value.Name + " </option>");


        });

    }

    function ajaxError(response) {
        //         alert(errormsg.responseText); 
    }
}


function countryselectCustomerInfo(CustomerInfo_country) {
    if (CustomerInfo_country.value == "0") {
        alert('Select your country from the list');
        CustomerInfo_country.focus();
        return false;
    } else {
        return true;
    }
}
function areaselectCustomerInfo(CustomerInfo_area) {
    if (CustomerInfo_area.value == "0") {
        alert('Select your area from the list');
        CustomerInfo_area.focus();
        return false;
    } else {
        return true;
    }
}
function RegistrationCountry() {
    $.afui.showMask('Loading');

    $.ajax({

        type: "GET",
        method: "GET",
        url: Base_Url + 'Location.svc/Get',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
        //             
        //                $("#txtShipping_country").val(SelectedCountry_Val.trim()).attr("selected", "selected");;  
        //         LoadArea_Inner('txtShipping_area',SelectedCountry_Val.trim(),SelectedArea_Val.trim());
    });

    function ajaxSucceess(response) {


        $.each(JSON.parse(response.d), function (key, value) {

            $('#registration_country').append("<option value ='" + value.Id + "'>" + value.Name + " </option>");




        });

    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);
    }
}


function RegistrationArea() {

    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url + 'Location.svc/GetAllArea?CountryId=475', //+ $("#registration_country").val(),
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
        //              $("#txtShipping_area").val(SelectedArea_Val.trim()).attr("selected", "selected");; 
        //         $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        //         $('#'+IdVal).empty();
        //         $('#'+IdVal).append("<option value = '0'>Location</option>");
        $.each(JSON.parse(response.d), function (key, value) {


            $('#registration_area').append("<option value = '" + value.Id + "'>" + value.Name + " </option>");


        });

    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);  
    }
}
function LoginMenu() {
    localStorage.removeItem('LoginCustomerID');
    window.location = "login.html";
}

function TrackOrderDetailsBilling(ThisVal) {
    $.afui.showMask('Loading');
    $.ajax({

        type: "GET",
        method: "GET",
        url: Base_Url + 'Order.svc/GetOrderBillingAddress?OrderId=' + $(ThisVal).attr("data-OrderId"),
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
        $.afui.hideMask();

    });

    function ajaxSucceess(response) {
        $.afui.loadContent("#TrackOrderDetails", false, false, "fade");
        $('#TrackOrderDetailInformationBilling').empty();

        $.each(JSON.parse(response.d), function (key, value) {

            $('#TrackOrderDetailInformationBilling').append(TrackOrderDetailHtmlBilling(value.Name, value.Email, value.Phone, value.State, value.Country));

            TrackOrderDetailsShipping($(ThisVal).attr("data-OrderId"));
        });

    }

    function ajaxError(response) {
        //         alert(errormsg.responseText); 
    }

}

function TrackOrderDetailsShipping(ThisVal) {
    var Id = $(ThisVal).attr("data-OrderId");
    var orderId = $(ThisVal).attr("data-OrderId");
    var StatusNo = $(ThisVal).attr("data-status");
    var IsUpdateStatus = $(ThisVal).attr("data-IsUpdateStatus");
    var StatusName = $(ThisVal).attr("data-StatusName");
    var ProcessID = $(ThisVal).attr("data-ProcessID");
    Selected_OrderId = orderId;
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url + 'Order.svc/GetOrderShippingAddress?OrderId=' + $(ThisVal).attr("data-OrderId"),
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
        TrackOrderAmountTotal(Selected_OrderId);
        TrackOrderProductsDetails(Selected_OrderId);
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        $.afui.loadContent("#TrackOrderDetails", false, false, "fade");
        $('#TrackOrderDetailInformationShipping').empty();


        $.each(JSON.parse(response.d), function (key, value) {

            $('#TrackOrderDetailInformationShipping').append(TrackOrderDetailHtmlShipping(value.Name, value.Email, value.Phone, value.State, value.Country));
            Shipping_Location = value.State;
        });

    }

    function ajaxError(response) {
        //         alert(errormsg.responseText); 
    }


}


function TrackOrderAmountTotal(Id) {
    $.afui.showMask('Loading');
    $.ajax({

        type: "GET",
        method: "GET",
        url: Base_Url + 'Order.svc/OrderAmountTotal?OrderId=' + Id,
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
        GetAllOrderSignature(Selected_OrderId);
        GetAllOrderProof(Selected_OrderId);
    });

    function ajaxSucceess(response) {


        $.each(JSON.parse(response.d), function (key, value) {

            $('#SubTotalTrackOrder').text(value.SubTotal + " RM");
            $('#ShippingChargesTrackOrder').text(value.Shippingcost + " RM");
            $('#GrandTotalTrackOrder').text(value.GrandTotal + " RM");

        });

    }

    function ajaxError(response) {
        //         alert(errormsg.responseText); 
    }

}


function TrackOrderDetailHtmlShipping(Name, Email, Phone, State, Country) {

    var Html;
    Html = "<div class='shippingtitle'>" +
        "<strong>Shipping Address</strong>" +


        "</div> " +
        " <div class='ShippingAddress'>" +
        " <span>" + Name + "</span>" +
        " <span>" + Email + "</span>" +
        "<span>" + Phone + " </span>" +
        //                          " <span>Flat No: cfjgf tsryrs</span>"+
        //                         "<span> Building Address: bvgmcg y sr jr u</span>"+
        //                             "   <span> Street/ Land Mark: truuy yesy </span>"+
        " <span> " + State + "</span>" +
        "  <span>" + Country + " </span>" +
        //            " <strong>Payment Method:</strong><span> Pay with Card upon delivery </span><br>"+
        //                  " <strong>Payment Status:</strong><span> Pending </span><br><br><br><br>"+
        " </div>";
    return Html;
}

function TrackOrderDetailHtmlPayment(Paymentmethod) {

    var Html;
    Html = "<div class='shippingtitle'>" +
        "<strong>Payment Method</strong>" +
        "</div> " +
        "<div class='ShippingAddress'>" +
        " <span>" + Paymentmethod + "</span>" +
        " </div>";
    return Html;
}

function TrackOrderProductsDetails(Id) {

    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url + 'Order.svc/OrderProductDetails?OrderId=' + Id,
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {

        $('#TrackOrderProductDetails').empty();
        var Paymentmethod;
        $.each(JSON.parse(response.d), function (key, value) {
            Paymentmethod = value.PaymentMethodSystemName;

            $('#TrackOrderProductDetails').append(BindTrackOrderProductsDetails(value.ProductId, value.Image, value.Name, value.Price, value.Quantity, value.TotalPrice, value.OfferPercentage));
        });
        var PaymentmethodType;
        if (Paymentmethod == 'Payments.PayInStore') {
            Paymentmethod = 'Payed by <b>Card</b>';
            PaymentmethodType = 'Card';
        }
        else {
            Paymentmethod = 'Payed by <b>Cash</b>';
            PaymentmethodType = 'Cash';
        }

        $('#TrackOrderDetailInformationPayment').empty();
        $('#TrackOrderDetailInformationPayment').append(TrackOrderDetailHtmlPayment(Paymentmethod));

        $("#Signature").css("display", "none");
        $("#Proofer").css("display", "none");
        if (Selected_Status_Name == 'Prepared') {
            $("#StatusUpdateSubmit_Delivery_button").val("Confirm for Deliver");
        }
        if (Selected_Status_Name=='Delivering') {
            $("#StatusUpdateSubmit_Delivery_button").val("Delivered");
        }
        if (Selected_Status_Name == 'Delivered') {
            $("#StatusUpdateSubmit_Delivery_button").css("display","none");
        }

        
        //if (PaymentmethodType == 'Cash') {
        //    $("#Proofer").css("display", "none");
        //    $("#Signature").css("display", "block");
        //}
        //else {
        //    $("#Proofer").css("display", "block");
        //    $("#Signature").css("display", "block");
        //}
     
    //if(Selected_Status_Name=='Delivering'){
    //  $("#PictureProof_Plus").css("display", "block"); 
    //  $("#SignatureProof_Plus").css("display", "block");
    //  $("#Proofer").css("display", "none"); 
    //  $("#TrackOrderDetailInformationPayment").css("display", "none");         
    //  $("#Signature").css("display", "none");
    //  $("#StatusUpdateSubmit_Delivery_button").css("display", "none");
    //  $("#Refresh").css("display","block");
    //    }
    //else if(Selected_Status_Name=='Shipped')
    //{
    // $("#Navigation").css("display","block");
    // $("#Proofer").css("display", "block"); 
    // $("#TrackOrderDetailInformationPayment").css("display", "block"); 
    // $("#Signature").css("display", "block");
    // $("#StatusUpdateSubmit_Delivery_button").css("display", "block");
    // $("#Refresh").css("display","none");   
    //}
    //else
    //{
    // $("#PictureProof_Plus").css("display", "none"); 
    // $("#SignatureProof_Plus").css("display", "none");
    // $("#StatusUpdateSubmit_Delivery_button").css("display", "none"); 
    //  $("#Refresh").css("display","block");  
    //    $('#TrackOrderDetailInformationPayment').empty();
    //    $('#TrackOrderDetailInformationPayment').append(TrackOrderDetailHtmlPayment(Paymentmethod)); 

}
function ajaxError(response) {
}
     
 }
   

function BindTrackOrderProductsDetails(ProductId, Image, Name, Price, Quantity, TotalPrice, OfferPercentage) {
    var Html;
    var QuantityTextId = "Quantity_" +

        ProductId;
    Html = "<li>" +
        "<div class='productdetalimage'><img  src=" + Image + " /></div>" +
        "<div class='productdetaillist'>" +
        "<ul>" +
        "<li><strong>" + Name + "</strong> </li>" +
        " <li>" +
        " <div class='productprice productoldprice productdetail'><span>" + Price + " RM</span></div><div class='Multiple'><span> x </span></div>" +
        " <div class='brandname'><span>" + Quantity + "</span></div>" +
        " <strong class='checkouttotal'> = " + TotalPrice + " RM</strong>" +
        "  </li>" +
        "</ul>" +
        " </div>" +
        "</li>";
    return Html;

}
function Delivered() {
    $.afui.loadContent("#signature-pad", false, false, "fade");

    $("#SaveSignature").css("display", "block");
    $("#Refresh").css("display", "none");
    $("#new").css("display", "block");
    $("#Delete").css("display", "none");
    $("#Navigation").css("display", "none");
    newCanvas();

}
function Proof() {
    $.afui.loadContent("#Proof", false, false, "fade");
}

function onDeviceReady() {
    alert("signature saved");
    window.canvas2ImagePlugin.saveImageDataToLibrary(
        function (msg) {
            console.log(msg);
        },
        function (err) {
            console.log(err);
        },
        document.getElementById('#canvas')
    );

}
function PaymentMethodSelect() {

    if ($('#paymentmethod_0').is(':checked')) {

        $("#Proofer").css("display", "block");
        $("#Signature").css("display", "block");
    }
    else {
        $("#Proofer").css("display", "none");
    }
}


function GetAllOrderSignature(Id) {

    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url + 'Order.svc/GetOrderSignature?OrderId=' + Id + '&Type=Signature',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
    });

    function ajaxSucceess(response) {
        $('#PictureSignature').empty();
        $.each(JSON.parse(response.d), function (key, value) {

            $('#PictureSignature').append(PictureDisplay(value.Image, value.Id));
        });


    }
    function ajaxError(response) {
        alert(response.responseText);
    }

}
function GetAllOrderProof(Id) {

    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url + 'Order.svc/GetOrderSignature?OrderId=' + Id + '&Type=Proof',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        $('#PictureProof').empty();
        $.each(JSON.parse(response.d), function (key, value) {

            $('#PictureProof').append(ProofDisplay(value.Image, value.Id));
        });
    }
    function ajaxError(response) {
    }

}
function PictureDisplay(Image, Id) {
    ProofSignatureId = Id;
    var Id_Val = "Sign_" + Id;
    var html = '<li>' +
        '<a Id="' + Id_Val + '" onclick="OpenSignature(this)" ><img src="' + Image + '" alt="Signature" /></a>' +
        '</li>';
    return html;
}
function ProofDisplay(Image, Id) {
    ProofSignatureId = Id;
    var Id_Val = "Proof_" + Id;
    var html = '<li>' +
        '<a Id="' + Id_Val + '" onclick="OpenProof(this)" ><img src="' + Image + '" alt="Proof" /></a>' +
        '</li>';
    return html;
}
function OpenSignature(ThisVal) {
    $("#Navigation").css("display", "none");
    $("#ImagePopup").attr("data-title", $("#" + $(ThisVal).attr("Id") + " img").attr("alt"));
    $("#Scan").css("display", "none");
    $("#SaveSignature").css("display", "none");
    $("#new").css("display", "none");
    $("#Delete").css("display", "block");
    $("#Refresh").css("display", "none");
    $("#imagedisplay").attr("src", $("#" + $(ThisVal).attr("Id") + " img").attr("src"));
    $.afui.loadContent("#ImagePopup", false, false, "fade");

}
function OpenProof(ThisVal) {
    $("#Navigation").css("display", "none");
    $("#ImagePopup").attr("data-title", $("#" + $(ThisVal).attr("Id") + " img").attr("alt"));
    $("#Scan").css("display", "none");
    $("#SaveSignature").css("display", "none");
    $("#new").css("display", "none");
    $("#Delete").css("display", "block");
    $("#Refresh").css("display", "none");
    $("#imagedisplay").attr("src", $("#" + $(ThisVal).attr("Id") + " img").attr("src"));
    $.afui.loadContent("#ImagePopup", false, false, "fade");
}
function StatusUpdateSubmit_Delivery(Selected_OrderId) {
    var status = $(Selected_Order).attr("data-ProcessID");
   
            Flag_StatusSubmit = true;
            $.ajax({
                type: "GET",
                method: "GET",
                url: Base_Url + 'Order.svc/OrderlyStatusUpdate?OrderId=' + Selected_OrderId + '&OrderStatusId=' + Number(status),
                success: ajaxSucceess,
                error: ajaxError
            }).done(function () {
                $.afui.clearHistory();
                RefreshDashboard();
                $.afui.loadContent("#HomePage", false, false, "fade");
            });
            function ajaxSucceess(response) {
                //OrderList(Selected_Order);
              //  $.afui.goBack();
            }
            function ajaxError(response) { }
        

}
function DeleteProofSignature() {
    $("#Delete").css("display", "none");
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url + 'Order.svc/DeleteProofAndSignature?Id=' + ProofSignatureId,
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {

        GetAllOrderSignature(Selected_OrderId);
        GetAllOrderProof(Selected_OrderId);
        $.afui.goBack();
    });
    function ajaxSucceess(response) {
        GetAllOrderSignature(Selected_OrderId);
        GetAllOrderProof(Selected_OrderId);
    }
    function ajaxError(response) { }
}
function DashboardEmpty() {
    $.afui.goBack();
}
