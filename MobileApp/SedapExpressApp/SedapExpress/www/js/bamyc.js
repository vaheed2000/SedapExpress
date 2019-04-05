var ipAddress;
var ProdId = new Array();
var categoryid;
 var Base_Url = 'http://mannam.netroxe.com:8088/';
 //var Base_Url = 'http://service.sedapexpress.my/';
function setLogoutCookies() {
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Customer.svc/AddLogOutUser?IpAddress=' + ipAddress,
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {});
 
    function ajaxSucceess(response) {
        window.localStorage.setItem("LogOutCustomerId", JSON.parse(response.d));
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);
    }
}

function LoadLocationPage() {
   
    navigator.splashscreen.showMask();
   
    window.setTimeout(function () {
        navigator.splashscreen.hide();

        window.location = 'home.html';
    }, 10000);

   
}

function AddNewAddress() {
    $.afui.loadContent("#CheckoutAddressList", false, false, "fade");
}

function LoadCountries(IdVal) {
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Location.svc/Get',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {});

    function ajaxSucceess(response) {
        $.each(JSON.parse(response.d), function(key, value) {
            $('#' + IdVal).append("<option value = '" + value.Id + " '>" + value.Name + " </option>");
        });
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);
    }
}

function LoadArea(IdVal, IdVal_Country) {
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Location.svc/GetAllArea?CountryId=' + $("#" + IdVal_Country).val(),
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {});

    function ajaxSucceess(response) {
        $.each(JSON.parse(response.d), function(key, value) {
            $('#' + IdVal).append("<option value = '" + value.Id + " '>" + value.Name + " </option>");
        });
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);
    }
}

function LoadCountries_Inner(IdVal, SelectedCountry_Val, SelectedArea_Val) {
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Location.svc/Get',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        $("#txtShipping_country").val(SelectedCountry_Val.trim()).attr("selected", "selected");;
        LoadArea_Inner('txtShipping_area', SelectedCountry_Val.trim(), SelectedArea_Val.trim());
    });

    function ajaxSucceess(response) {
        $('#' + IdVal).empty();
        $('#' + IdVal).append("<option value = '0'>Country</option>");
        $.each(JSON.parse(response.d), function(key, value) {
            $('#' + IdVal).append("<option value ='" + value.Id + "'>" + value.Name + " </option>");
        });
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);
    }
}

function CancelPopUp_Terms() {
    document.getElementById("toggle_today_summary_accept_Checkout").checked = false;
}

function DonePopUp_Terms() {
    document.getElementById("toggle_today_summary_accept_Checkout").checked = true;
}

function LoadArea_Inner(IdVal, SelectedCountry_Val, SelectedArea_Val) {
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Location.svc/GetAllArea?CountryId=' + SelectedCountry_Val,
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        $("#txtShipping_area").val(SelectedArea_Val.trim()).attr("selected", "selected");;
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        $('#' + IdVal).empty();
        $('#' + IdVal).append("<option value = '0'>Location</option>");
        $.each(JSON.parse(response.d), function(key, value) {
            $('#' + IdVal).append("<option value = '" + value.Id + "'>" + value.Name + " </option>");
        });
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);
    }
}

function LoadHomePage() {
    window.localStorage.setItem('carttotalamount', 50);
    window.location = "home.html"
    UpdateWishlistCount();  
    UpdateCartCount();
    LoadCategories();
}

function LoadCategories() {
    $.afui.showMask('Loading');
    $.ajax({  
        type: "GET",
        method: "GET",
        url: Base_Url+'Category.svc/Get',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        $('#CategoryList').empty();
        $.each(JSON.parse(response.d), function(key, value) {
            var Cat_Id = "Category_" + value.Id;
            var Cat_Page = "#CategoryPage_" + value.Id;
            $('#CategoryList').append('<li><a  Id="' + Cat_Id + '" class="MenuActive"  href="' + Cat_Page + '" onclick=" CategoryProducts(' + value.Id + ');" data-transition="fade">' + '<i class="fa fa-bullhorn" aria-hidden="true"></i>' + value.Name + '</a></li>');
            var PageViewId = "CategoryPage_" + value.Id;
            var PageListId = "CategoryProductList_" + value.Id;
            $("#CategoryViewPages").append('<div class="panel" id="' + PageViewId + '"' +
                'data-title="' + value.Name + '">' +
                '<ul id="' + PageListId + '" class="productlist"></ul></div>');
        });
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);
    }
}

function SearchProducts() {
    $.afui.showMask('Loading');
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        if ($("#search").val().trim() != '') {
            $.ajax({
                type: "GET",
                method: "GET",
                url: Base_Url+'Product.svc/AllSearchedProduct?ProductName=' + $("#search").val().trim() + '&PageSize=1&PageNumber=1&CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
                success: ajaxSucceess,
                error: ajaxError
            }).done(function() {
                SearchProducts_CartUpdate();
            });

            function ajaxSucceess(response) {
                $('#SearchProducts').empty();
                if (JSON.parse(response.d).length == 0) {
                    $('#EmptySearch').css('display', 'block');
                } else {
                    $('#EmptySearch').css('display', 'none');
                }
                $.each(JSON.parse(response.d), function(key, value) { 

                    $('#SearchProducts').append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage, 0, 'SearchProducts'));

                    if (value.Quantity != 0) {
                        $("#Wish_L_" + value.ProductId + "_0_SearchProducts i").attr("class", "fa fa-heart");
                        $("#Wish_L_" + value.ProductId + "_0_SearchProducts").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_0_SearchProducts')");
                    }
                });
            }

            function ajaxError(response) {
                //         alert(errormsg.responseText);
            }
        } else {
            alert('enter a valid search text');
            $.afui.hideMask();
        }
    } else {
        if ($("#search").val().trim() != '') {
            $.ajax({

                type: "GET",
                method: "GET",
                url: Base_Url+'Product.svc/AllSearchedProduct?ProductName=' + $("#search").val().trim() + '&PageSize=1&PageNumber=1&CustomerId=' + window.localStorage.getItem('LogOutCustomerId'),
                success: ajaxSucceess,
                error: ajaxError
            }).done(function() {
                SearchProducts_CartUpdate();
            });

            function ajaxSucceess(response) {
                $('#SearchProducts').empty();
                if (JSON.parse(response.d).length == 0) {
                    $('#EmptySearch').css('display', 'block');
                } else {
                    $('#EmptySearch').css('display', 'none');
                }
                $.each(JSON.parse(response.d), function(key, value) {
                    $('#SearchProducts').append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage, 0, 'SearchProducts'));

                    if (value.Quantity != 0) {
                        $("#Wish_L_" + value.ProductId + "_0_SearchProducts i").attr("class", "fa fa-heart");
                        $("#Wish_L_" + value.ProductId + "_0_SearchProducts").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_0_SearchProducts')");
                    }
                });
            }

            function ajaxError(response) {
                //         alert(errormsg.responseText);
            }
        } else {
            alert('enter a valid search text');
            $.afui.hideMask();
        }
    }
}

function SearchProducts_CartUpdate() {
    $.afui.showMask('Loading');

    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        if ($("#search").val().trim() != '') {
            $.ajax({

                type: "GET",
                method: "GET",
                url: Base_Url+'Product.svc/GetAllSearchedProducts_CartUpdate?ProductName=' + $("#search").val().trim() + '&PageSize=1&PageNumber=1&CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
                success: ajaxSucceess,
                error: ajaxError
            }).done(function() {
                $.afui.hideMask();
            });

            function ajaxSucceess(response) {
                $.each(JSON.parse(response.d), function(key, value) {
                    $("#Cart_L_" + value.ProductId + "_0_SearchProducts").html(value.Quantity);
                    $("#Cart_L_" + value.ProductId + "_0_SearchProducts").css("display", "block")
                });
            }

            function ajaxError(response) {
                //         alert(errormsg.responseText);
            }
        } else {
            alert('enter a valid search text');
            $.afui.hideMask();
        }
    } else {
        if ($("#search").val().trim() != '') {
            $.ajax({

                type: "GET",
                method: "GET",
                url: Base_Url+'Product.svc/GetAllSearchedProducts_CartUpdate?ProductName=' + $("#search").val().trim() + '&PageSize=1&PageNumber=1&CustomerId=' + window.localStorage.getItem('LogOutCustomerId'),
                success: ajaxSucceess,
                error: ajaxError
            }).done(function() {
                $.afui.hideMask();
            });

            function ajaxSucceess(response) {
                $.each(JSON.parse(response.d), function(key, value) {
                    $("#Cart_L_" + value.ProductId + "_0_SearchProducts").html(value.Quantity);
                    $("#Cart_L_" + value.ProductId + "_0_SearchProducts").css("display", "block")
                });
            }

            function ajaxError(response) {
                //         alert(errormsg.responseText);
            }
        } else {
            alert('enter a valid search text');
            $.afui.hideMask();
        }
    }
}

function CategoryProducts(CategoryId) {
    $.afui.clearHistory();
    $("#Category_" + CategoryId).attr("class", "MenuActive");
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Product.svc/GetAllCategoryProducts?CategoryId=' + CategoryId + '&PageSize=10000&PageNumber=1',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        GetAllCategoryProducts_Quantity(CategoryId); 
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        $('#CategoryProductList_' + CategoryId).empty();
        $('#Promotions').empty();
        $.each(JSON.parse(response.d), function(key, value) {
            $('#CategoryProductList_' + CategoryId).append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage, CategoryId, 'Category'));
            $('#Promotions').append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage, CategoryId, 'Promotion'));
        })
    }

    function ajaxError(response) {
        // alert(errormsg.responseText);  
    }
}

function RecentlyViewedProducts() {
    $.afui.clearHistory();
    if (window.localStorage.getItem('RecentlyViewed') != 'null' && window.localStorage.getItem('RecentlyViewed') != null) {
        if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
            $("#EmptyRecent").css("display", "none");
            $.afui.showMask('Loading');
            $.ajax({
                type: "GET",
                method: "GET",
                url: Base_Url+'Product.svc/GetProductById?ProductIds=' + window.localStorage.getItem('RecentlyViewed') + '&CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
                success: ajaxSucceess,
                error: ajaxError
            }).done(function() {
                RecentlyViewedProducts_CartUpdate();
                $.afui.hideMask();
            });

            function ajaxSucceess(response) {
                $('#RecentlyViewedProduct').empty();
                $.each(JSON.parse(response.d), function(key, value) {
                    $('#RecentlyViewedProduct').append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage, 0, 'Recent'));
                    if (value.Quantity != 0) {
                        $("#Wish_L_" + value.ProductId + "_0_Recent i").attr("class", "fa fa-heart");
                        $("#Wish_L_" + value.ProductId + "_0_Recent").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_0_Recent')");
                    }
                });
            }

            function ajaxError(response) {
                //         alert(errormsg.responseText);
            }
        } else {
            $("#EmptyRecent").css("display", "none");
            $.afui.showMask('Loading');
            $.ajax({
                type: "GET",
                method: "GET",
                url: Base_Url+'Product.svc/GetProductById?ProductIds=' + window.localStorage.getItem('RecentlyViewed') + '&CustomerId=' + window.localStorage.getItem('LogOutCustomerId'),
                success: ajaxSucceess,
                error: ajaxError
            }).done(function() {
                RecentlyViewedProducts_CartUpdate();
                $.afui.hideMask();
            });

            function ajaxSucceess(response) {
                $('#RecentlyViewedProduct').empty();
                $.each(JSON.parse(response.d), function(key, value) {
                    $('#RecentlyViewedProduct').append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage, 0, 'Recent'));
                    if (value.Quantity != 0) {
                        $("#Wish_L_" + value.ProductId + "_0_Recent i").attr("class", "fa fa-heart");
                        $("#Wish_L_" + value.ProductId + "_0_Recent").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_0_Recent')");
                    }
                });
            }

            function ajaxError(response) {
                //         alert(errormsg.responseText);
            }
        }
    }
}

function RecentlyViewedProducts_CartUpdate() {
    $.afui.clearHistory();
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $("#EmptyRecent").css("display", "none");
        $.afui.showMask('Loading');
        $.ajax({

            type: "GET",
            method: "GET",
            url: Base_Url+'Product.svc/GetProductById_CartUpdate?ProductIds=' + window.localStorage.getItem('RecentlyViewed') + '&CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {
                $("#Cart_L_" + value.ProductId + "_0_Recent").html(value.Quantity);
                $("#Cart_L_" + value.ProductId + "_0_Recent").css("display", "block");
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText);
        }
    } else {
        $("#EmptyRecent").css("display", "none");
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Product.svc/GetProductById_CartUpdate?ProductIds=' + window.localStorage.getItem('RecentlyViewed') + '&CustomerId=' + window.localStorage.getItem('LogOutCustomerId'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {
                $("#Cart_L_" + value.ProductId + "_0_Recent").html(value.Quantity);
                $("#Cart_L_" + value.ProductId + "_0_Recent").css("display", "block");
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText);
        }
    }
}

function WishListProducts() {
    $.afui.clearHistory();
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Wishlist.svc/GetAllWishlistItems?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            UpdateWishlistCount();  
        });

        function ajaxSucceess(response) { 
            $('#WishListProduct').empty();
            if (JSON.parse(response.d).length == 0) {
                $('#EmptyWishList').css('display', 'block');
                $('#EmptyWishList').css('display', 'block');
            } else {
                $('#EmptyWishList').css('display', 'none');
            }
            $.each(JSON.parse(response.d), function(key, value) {
                $('#WishListProduct').append(ProductHtmlCart(value.ProductId, value.Image, value.OfferPercentage, value.Name, value.OldPrice, value.Price, "WishList", value.Quantity, value.ShoppingCartId));
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    } 
    else {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Wishlist.svc/GetAllWishlistItems?CustomerId=' + window.localStorage.getItem('LogOutCustomerId'),
            success: ajaxSucceess,
            error: ajaxError 
        }).done(function() {
            UpdateWishlistCount(); 
        });

        function ajaxSucceess(response) {
            $('#WishListProduct').empty();
            if (JSON.parse(response.d).length == 0) {
                $('#EmptyWishList').css('display', 'block');
            } else {
                $('#EmptyWishList').css('display', 'none');
            }
            $.each(JSON.parse(response.d), function(key, value) {
                $('#WishListProduct').append(ProductHtmlCart(value.ProductId, value.Image, value.OfferPercentage, value.Name, value.OldPrice, value.Price, "WishList", value.Quantity, value.ShoppingCartId));
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText);
        } 
    }
}

function HomePage() { 
    $.afui.clearHistory(); 
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        var BestSellingUrl = Base_Url+'Product.svc/BestSellingProduct?Count=6&CustomerId='+ window.localStorage.getItem('LogOutCustomerId');
        var LowPriceUrl = Base_Url+'Product.svc/LowPriceProducts?Count=6&CustomerId='+ window.localStorage.getItem('LogOutCustomerId');
        var HighPriceUrl = Base_Url+'Product.svc/HighPriceProducts?Count=6&CustomerId='+ window.localStorage.getItem('LogOutCustomerId');
        var OfferPriceUrl = Base_Url+'Product.svc/GetOfferProduct?count=6&CustomerId='+ window.localStorage.getItem('LogOutCustomerId');
        LoadProducts('BestSellingProducts', BestSellingUrl);
        LoadProducts('LowPrice', LowPriceUrl);
        LoadProducts('HighPrice', HighPriceUrl);
        LoadProducts('OfferPrice', OfferPriceUrl);
    } else {
        var BestSellingUrl = Base_Url+'Product.svc/BestSellingProduct?Count=6&CustomerId='+ window.localStorage.getItem('LogOutCustomerId');
        var LowPriceUrl = Base_Url+'Product.svc/LowPriceProducts?Count=6&CustomerId='+ window.localStorage.getItem('LogOutCustomerId');
        var HighPriceUrl = Base_Url+'Product.svc/HighPriceProducts?Count=6&CustomerId='+ window.localStorage.getItem('LogOutCustomerId');
        var OfferPriceUrl = Base_Url+'Product.svc/GetOfferProduct?count=6&CustomerId='+ window.localStorage.getItem('LogOutCustomerId');   
        console.log(OfferPriceUrl);  
        LoadProducts('BestSellingProducts', BestSellingUrl);
        LoadProducts('LowPrice', LowPriceUrl);
        LoadProducts('HighPrice', HighPriceUrl);
        LoadProducts('OfferPrice', OfferPriceUrl);
    }
}

function CartProducts() {
    $.afui.clearHistory();
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'ShoppingCart.svc/GetAllCartedItems?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            //         $.afui.hideMask();
            UpdateCartCount();
            CartAmountTotal();
            CancelPopUp_Terms();
        });

        function ajaxSucceess(response) {
            if (JSON.parse(response.d).length == 0) {
                $.afui.removeBadge("#CartBadge");
                $("#EmptyCart").css("display", "block");
                $("#CartPageElement").css("display", "none");
            } else {
                $("#EmptyCart").css("display", "none");
                $("#CartPageElement").css("display", "block");
            }
            $('#CartProducts').empty();
            $.each(JSON.parse(response.d), function(key, value) {

                $('#CartProducts').append(ProductHtmlCart(value.ProductId, value.Image, value.OfferPercentage, value.Name, value.OldPrice, value.Price, "Cart", value.Quantity, 0, ''));
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }

    } else {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'ShoppingCart.svc/GetAllCartedItems?CustomerId=' + window.localStorage.getItem('LogOutCustomerId'), 
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            //         $.afui.hideMask(); 
            CartAmountTotal();
             UpdateCartCount();
        });

        function ajaxSucceess(response) {
            if (JSON.parse(response.d).length == 0) {
                $.afui.removeBadge("#CartBadge");
                $("#EmptyCart").css("display", "block");
                $("#CartPageElement").css("display", "none");
            } else {
                $("#EmptyCart").css("display", "none");
                $("#CartPageElement").css("display", "block");
            }
            $('#CartProducts').empty();
            $.each(JSON.parse(response.d), function(key, value) {

                $('#CartProducts').append(ProductHtmlCart(value.ProductId, value.Image, value.OfferPercentage, value.Name, value.OldPrice, value.Price, "Cart", value.Quantity, 0, ''));
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function CartAmountTotal() {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({

            type: "GET",
            method: "GET",
            url: Base_Url+'ShoppingCart.svc/CartAmountTotal?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {
                $('#SubTotal').text(value.SubTotal + " RM");
                $('#ShippingCharge').text(value.Shippingcost + " RM");
                $('#GrandTotal').text(value.GrandTotal + " RM");
                $('#TotalAmount').text(value.GrandTotal + " RM");
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    } else {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'ShoppingCart.svc/CartAmountTotal?CustomerId=' + window.localStorage.getItem('LogOutCustomerId'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {
                $('#SubTotal').text(value.SubTotal + " RM");
                $('#ShippingCharge').text(value.Shippingcost + " RM");
                $('#GrandTotal').text(value.GrandTotal + " RM");
                $('#TotalAmount').text(value.GrandTotal + " RM");
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function DeleteProductFromCart(This_val) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'ShoppingCart.svc/DeleteProductFromCart?CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&ProductId=' + $(This_val).attr("Id"),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            UpdateCartCount();
            CartProducts();
        });

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(errormsg.responseText);
        }
    } else {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'ShoppingCart.svc/DeleteProductFromCart?CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&ProductId=' + $(This_val).attr("Id"),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            UpdateCartCount();
            CartProducts();
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(errormsg.responseText);
        }
    }
}

function DeleteProductFromWishList(This_val) {

    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Wishlist.svc/DeleteProductFromWishlist?CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&ProductId=' + $(This_val).attr("Id"),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            UpdateWishlistCount();
            WishListProducts();
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(errormsg.responseText);
        }
    } else {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Wishlist.svc/DeleteProductFromWishlist?CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&ProductId=' + $(This_val).attr("Id"),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            UpdateWishlistCount();
            WishListProducts();
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(errormsg.responseText);
        }
    }
}

function ProductHtml(ProductId, Name, Image, OldPrice, Price, OfferPercentage, CategoryId, Page) {
    var HTML;
    var WishListProductId = "Wish_L_" + ProductId + "_" + CategoryId + "_" + Page;
    var CartProductId = "Cart_L_" + ProductId + "_" + CategoryId + "_" + Page;
    HTML = "<li>" +
        "<div class='productwrapper_list'>" +
        "<div class='productoffer'>" + OfferPercentage + "%</div>" +
        "<div class='wishlisticon productlist'><a href='#' id='" + WishListProductId + "' onclick='AddToWishList(this);' class='active'><i class='fa fa-heart-o' aria-hidden='true'></i></a></div>" +
        "<div class='prodectimagesection' id='ProductImage'><a  data-productid='" + ProductId + "' onclick='ProductDescription(this)'  href='#'><img src=" + Image + "><div id='" + CartProductId + "' class='QuantityCount'></div></a></div>" +
        "<div class='productname'  data-productid='" +
        ProductId + "' onclick='ProductDescription(this)' >" + Name + "</div>" +
        "<div class='productprice productoldprice'><span class='old'>" + OldPrice + " RM</span> <span>" + Price +
        " RM</span></div>" +
        "<div class='productaddtocart' id='productaddtocart'><a  onclick='AddToCart(this)' data-productid='" + ProductId + "' data-CategoryId='" + CategoryId + "'>Add to Cart</a></div>" +
        "</div>" +
        "</li>";
    return HTML;
}

function QtyAdd(ProductId) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $("#Quantity_" + ProductId).val(Number($("#Quantity_" + ProductId).val()) + 1);
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url +'ShoppingCart.svc/CartItemUpdate?CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&ProductId=' + ProductId + '&Type=1',
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            CartAmountTotal();
            //         $.afui.hideMask();   
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {})
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText);  
        }
    } else {
        $("#Quantity_" + ProductId).val(Number($("#Quantity_" + ProductId).val()) + 1);
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url +'ShoppingCart.svc/CartItemUpdate?CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&ProductId=' + ProductId + '&Type=1',
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            CartAmountTotal();
            //         $.afui.hideMask();   
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {})
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText);  
        }
    }
}

function QtySub(ProductId) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        if (Number($("#Quantity_" + ProductId).val()) > 1) {
            $("#Quantity_" + ProductId).val(Number($("#Quantity_" + ProductId).val()) - 1);
            $.afui.showMask('Loading');
            $.ajax({
                type: "GET",
                method: "GET",
                url: Base_Url +'ShoppingCart.svc/CartItemUpdate?CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&ProductId=' + ProductId + '&Type=-1',
                success: ajaxSucceess,
                error: ajaxError
            }).done(function() {
                CartAmountTotal();
            });

            function ajaxSucceess(response) {
                $.each(JSON.parse(response.d), function(key, value) {})
            }

            function ajaxError(response) {
                //         alert(errormsg.responseText); 
            }
        }
    } else {
        if (Number($("#Quantity_" + ProductId).val()) > 1) {
            $("#Quantity_" + ProductId).val(Number($("#Quantity_" + ProductId).val()) - 1);
            $.afui.showMask('Loading');
            $.ajax({
                type: "GET",
                method: "GET",
                url: Base_Url +'ShoppingCart.svc/CartItemUpdate?CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&ProductId=' + ProductId + '&Type=-1',
                success: ajaxSucceess,
                error: ajaxError
            }).done(function() {
                CartAmountTotal();
            });

            function ajaxSucceess(response) {
                $.each(JSON.parse(response.d), function(key, value) {})
            }

            function ajaxError(response) {
                //         alert(errormsg.responseText); 
            }
        }

    }
}

function QtyAdd_ProductDesc(ProductId) {
    $("#Quantity_ProductDesc" + ProductId).val(Number($("#Quantity_ProductDesc" + ProductId).val()) + 1);
}

function QtySub_ProductDesc(ProductId) {
    if (Number($("#Quantity_ProductDesc" + ProductId).val()) > 1) {
        $("#Quantity_ProductDesc" + ProductId).val(Number($("#Quantity_ProductDesc" + ProductId).val()) - 1);
    }
}

function QtyAdd_WishList(ProductId) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $("#WishQuantity_" + ProductId).val(Number($("#WishQuantity_" + ProductId).val()) + 1);
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url +'Wishlist.svc/WishItemUpdate?CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&ProductId=' + ProductId + '&Type=1',
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
            UpdateWishlistCount();
        });
 
        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {})
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText);    
        }
    } else {
        $("#WishQuantity_" + ProductId).val(Number($("#WishQuantity_" + ProductId).val()) + 1);
        $.afui.showMask('Loading');
        $.ajax({

            type: "GET",
            method: "GET",
            url: Base_Url +'Wishlist.svc/WishItemUpdate?CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&ProductId=' + ProductId + '&Type=1',
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            CartAmountTotal();
             UpdateWishlistCount();
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {})
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText);  
        }
    }
}

function QtySub_WishList(ProductId) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        if (Number($("#WishQuantity_" + ProductId).val()) > 1) {
            $("#WishQuantity_" + ProductId).val(Number($("#WishQuantity_" + ProductId).val()) - 1);
            $.afui.showMask('Loading');
            $.ajax({
                type: "GET",
                method: "GET",
                url: Base_Url +'Wishlist.svc/WishItemUpdate?CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&ProductId=' + ProductId + '&Type=-1',
                success: ajaxSucceess,
                error: ajaxError
            }).done(function() {
                CartAmountTotal();
                $.afui.hideMask();
            });

            function ajaxSucceess(response) {
                $.each(JSON.parse(response.d), function(key, value) {})
            }

            function ajaxError(response) {
                //         alert(errormsg.responseText); 
            }
        }
    } else {
        if (Number($("#WishQuantity_" + ProductId).val()) > 1) {
            $("#WishQuantity_" + ProductId).val(Number($("#WishQuantity_" + ProductId).val()) - 1);
            $.afui.showMask('Loading');
            $.ajax({
                type: "GET",
                method: "GET",
                url: Base_Url +'Wishlist.svc/WishItemUpdate?CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&ProductId=' + ProductId + '&Type=-1',

                //         '+$(This_val).attr("Id"),    
                //         '+window.localStorage.getItem('Id'),   
                success: ajaxSucceess,
                error: ajaxError
            }).done(function() {
                CartAmountTotal();
                $.afui.hideMask();
            });
  
            function ajaxSucceess(response) {
                $.each(JSON.parse(response.d), function(key, value) {})
            }

            function ajaxError(response) {
                //         alert(errormsg.responseText); 
            }
        }
    }
}

function AddToWishList(This_val) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Wishlist.svc/AddToWishlist?ProductId=' + $(This_val).attr("Id").split('_')[2] + '&CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&Quantity=1',
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() { 
//            AddToWishListDesc($(This_val).attr("Id").split('_')[2]); 
//            AddToWishListDesc(This_val);
            $("#" + $(This_val).attr("Id") + " i").attr("class", "fa fa-heart");
            $("#" + $(This_val).attr("Id")).attr("onclick", "DeleteProductFromWishList_List(" + $(This_val).attr("Id").split('_')[2] + ",'" + $(This_val).attr("Id") + "')");
            $("#" + $(This_val).attr("Id")).attr("data-message", "Removed from WishList");
            UpdateWishlistCount(); 
        });

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    } else {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Wishlist.svc/AddToWishlist?ProductId=' + $(This_val).attr("Id").split('_')[2] + '&CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&Quantity=1',
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $("#" + $(This_val).attr("Id") + " i").attr("class", "fa fa-heart");
            $("#" + $(This_val).attr("Id")).attr("onclick", "DeleteProductFromWishList_List(" + $(This_val).attr("Id").split('_')[2] + ",'" + $(This_val).attr("Id") + "')");
            $("#" + $(This_val).attr("Id")).attr("data-message", "Removed from WishList");
            UpdateWishlistCount();
        });

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function AddToWishListDesc(This_val) { 
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Wishlist.svc/AddToWishlist?ProductId=' + $(This_val).attr("Id") + '&CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&Quantity=1',
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() { 
//            AddToWishList($(This_val).attr("Id")); 
//             AddToWishList(This_val);
            $("#" + $(This_val).attr("Id") + " i").attr("class", "fa fa-heart");
            $("#" + $(This_val).attr("Id")).attr("onclick", "DeleteProductFromWishList_List_Desc(" + $(This_val).attr("Id") + ",'" + $(This_val).attr("Id") + "')");
            $("#" + $(This_val).attr("Id")).attr("data-message", "Removed from WishList");
            UpdateWishlistCount();
        });

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    } else {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Wishlist.svc/AddToWishlist?ProductId=' + $(This_val).attr("Id") + '&CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&Quantity=1',
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $("#" + $(This_val).attr("Id") + " i").attr("class", "fa fa-heart");
            $("#" + $(This_val).attr("Id")).attr("onclick", "DeleteProductFromWishList_List_Desc(" + $(This_val).attr("Id") + ",'" + $(This_val).attr("Id") + "')");
            $("#" + $(This_val).attr("Id")).attr("data-message", "Removed from WishList");
            UpdateWishlistCount();
        });

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function ProductHtmlCart(ProductId, Image, OfferPercentage, Name, OldPrice, Price, Type, Quantity, ShoppingCartId) {
    var HTML;
    if (Type == "Cart") {
        var QuantityTextId = "Quantity_" + ProductId;
        HTML = "<li>" +
            "<div class='productdetalimage' ><img data-productid='" + ProductId + "' onclick='ProductDescription(this)' src=" + Image + " />" +
            "<div class='productoffer'>" + OfferPercentage + "%</div>" +
            "</div>" +
            "<div class='productdetaillist'>" +
            "<ul>" +
            "<li><strong>" + Name + "</strong>" +
            "  <a href='#'id='" + ProductId + "' class='deleteshipping'onclick='DeleteProductFromCart(this);'>" +
            "<i class='fa fa-trash-o' aria-hidden='true'></i></a></li>" +
            "<li>" +
            "<div class='detailquantity list'>" +
            "<a href='#' data-productid='" + ProductId + "' " +
            "onclick='QtyAdd(" + ProductId + ");'>+</a>" +
            "<input type='text' data-productid='" + ProductId + "' value='" + Quantity + "' id='" + QuantityTextId + "'>" +
            "<a href='#'  data-productid='" + ProductId + "' onclick='QtySub(" + ProductId + ")'>-</a>" +
            " </div>" +
            "<div class='productprice productoldprice productdetail cart'><span class='old'>" + OldPrice + "RM</span> <span>" + Price + "RM</span></div>" +
            "</li>" +
            "</ul>" +
            "</div>" +
            "</li>";
    } else if (Type == "WishList")

    {
        var QuantityTextIdWishList = "WishQuantity_" + ProductId;
        var QuantityTextId = "Quantity_" + ProductId;
        HTML = "<li>" +
            "<div class='productdetalimage' ><img data-productid='" + ProductId + "' onclick='ProductDescription(this)' src=" + Image + " />" +
            "<div class='productoffer'>" + OfferPercentage + "%</div>" +
            "</div>" +
            "<div class='productdetaillist'>" +
            "<ul>" +
            "<li><strong>" + Name + "</strong>" +
            "  <a href='#' id='" + ProductId + "' class='deleteshipping'onclick='DeleteProductFromWishList(this);'>" +
            "<i class='fa fa-trash-o' aria-hidden='true'></i></a>" +
            "<a  data-toast  data-message='Added to Cart' data-position='bc' data-productid='" + ProductId + "' class='addtocartfromwishlist' " + "onclick='AddToCart(this)'>" +
            "<i class='fa fa-cart-plus' aria-hidden='true'></i></a></li>" +
            "</li>" +
            "<li>" +
            "<div class='detailquantity list'>" +
            "<a href='#' data-productid='" + ProductId + "' " +
            "onclick='QtyAdd_WishList(" + ProductId + ");'>+</a>" +
            "<input type='text' data-productid='" + ProductId + "' value='" + Quantity + "' id='" + QuantityTextIdWishList + "'>" +
            "<a href='#'  data-productid='" + ProductId + "' " +
            "onclick='QtySub_WishList(" + ProductId + ")'>-</a>" +
            "</div>" +
            "<div class='productprice productoldprice productdetail cart'><span class='old'>" + OldPrice + "RM</span> <span>" + Price + "RM</span></div>" +
            "</li>" +
            "</ul>" +
            "</div>" +
            "</li>";
    } else {}
    return HTML;
}

function ProductDescription(ThisVal) { 
    $.afui.showMask('Loading');
    var Name;
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Product.svc/GetProductDetails?ProductId=' + $(ThisVal).attr("data-productid") + '&CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.loadContent("#ProductDetails", false, false, "fade");

            BestSellingProducts('ProductDetailsBestSellingProducts');
            HomePage();  
        });

        function ajaxSucceess(response) {
            $('#ProductDetailsContent').empty();
            $.each(JSON.parse(response.d), function (key, value) {
                $("#ProductDetails").attr("data-title", "Details");
                value.Name
                if (window.localStorage.getItem('RecentlyViewed') != 'null' && window.localStorage.getItem('RecentlyViewed') != null) {
                    var ProductIds = window.localStorage.getItem('RecentlyViewed');
                    if (ProductIds.search(value.ProductId.toString()) == -1) {
                        ProductIds = ProductIds + ',' + value.ProductId.toString();
                        window.localStorage.setItem('RecentlyViewed', ProductIds);
                    }
                } else {
                    window.localStorage.setItem('RecentlyViewed', value.ProductId.toString());
                }
                $('#ProductDetailsContent').append(ProdDescHTML(value.ProductId, value.Image, value.OfferPercentage, value.Name, value.OldPrice, value.Price, value.Quantity, value.ShortDescription));
            });
        }

        function ajaxError(response) {
            //        alert(response.responseText);  
        }
    } else {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Product.svc/GetProductDetails?ProductId=' + $(ThisVal).attr("data-productid") + '&CustomerId=' + window.localStorage.getItem('LogOutCustomerId'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.loadContent("#ProductDetails", false, false, "fade");
            BestSellingProducts('ProductDetailsBestSellingProducts');
        });

        function ajaxSucceess(response) {
            $('#ProductDetailsContent').empty();
            $.each(JSON.parse(response.d), function(key, value) {
                if (window.localStorage.getItem('RecentlyViewed') != 'null' && window.localStorage.getItem('RecentlyViewed') != null) {
                    var ProductIds = window.localStorage.getItem('RecentlyViewed');
                    if (ProductIds.search(value.ProductId.toString()) == -1) {
                        ProductIds = ProductIds + ',' + value.ProductId.toString();
                        window.localStorage.setItem('RecentlyViewed', ProductIds);
                    }
                } else {
                    window.localStorage.setItem('RecentlyViewed', value.ProductId.toString());
                }
                $('#ProductDetailsContent').append(ProdDescHTML(value.ProductId, value.Image, value.OfferPercentage, value.Name, value.OldPrice, value.Price, value.Quantity, value.ShortDescription));
            });
        }

        function ajaxError(response) {
            //        alert(response.responseText);  
        }
    }
}

function ProductDescription_Search(Id) {
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Product.svc/GetProductDetails?ProductId=' + Id,
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        $.afui.loadContent("#ProductDetails", false, false, "fade");
        BestSellingProducts('ProductDetailsBestSellingProducts');

    });

    function ajaxSucceess(response) {
        $('#ProductDetailsContent').empty();
        $.each(JSON.parse(response.d), function(key, value) {
            if (window.localStorage.getItem('RecentlyViewed') != 'null' && window.localStorage.getItem('RecentlyViewed') != null) {
                var ProductIds = window.localStorage.getItem('RecentlyViewed');
                if (ProductIds.search(value.ProductId.toString()) == -1) {
                    ProductIds = ProductIds + ',' + value.ProductId.toString();
                    window.localStorage.setItem('RecentlyViewed', ProductIds);
                }
            } else {
                window.localStorage.setItem('RecentlyViewed', value.ProductId.toString());
            }
            $('#ProductDetailsContent').append(ProdDescHTML(value.ProductId, value.Image, value.OfferPercentage, value.Name, value.OldPrice, value.Price, value.Quantity, value.ShortDescription));
        });
    }

    function ajaxError(response) {
        //        alert(response.responseText);  
    }
}

function ProdDescHTML(ProductId, Image, OfferPercentage, Name, OldPrice, Price, Quantity, ShortDescription) {
    var ProdHtml;
    var QuantityTextId = "Quantity_ProductDesc" + ProductId;
    var WishListHtml;
    if (Quantity == 0) {
        WishListHtml = "<a href='#' id='" + ProductId + "' onclick='AddToWishListDesc(this);' class='active'>" +
            "<i class='fa fa-heart-o' aria-hidden='true'></i></a>";
    } else {
        WishListHtml = "<a href='#' id='" + ProductId + "' onclick='DeleteProductFromWishList_List_Desc(" + ProductId + "," + ProductId + ");'" +
            " class='active'>" +
            "<i class='fa fa-heart' aria-hidden='true'></i></a>";
    }
    ProdHtml = "<div class='productdetalimage'><img src='" + Image + "' />" +
        "<div class='productoffer'>" + OfferPercentage + "%</div></div>" +
        "<div class='productdetaillist'>" +
        " <ul>" +
        " <li><strong>" + Name + "</strong></li>" +
        " <li>" +
        " <div class='detailquantity'><a href='#' data-productid='" + ProductId + "' onclick='QtySub_ProductDesc(" + ProductId + ")'>-</a>" +
        " <input type='text'  data-productid='" + ProductId + "' value='1' id='" + QuantityTextId + "' />" +
        "<a href='#' data-productid='" + ProductId + "' " +
        "onclick='QtyAdd_ProductDesc(" + ProductId + ");'>+</a></div>" +
        "<div class='productprice productoldprice productdetail'>" +
        "<span class='old'>" + OldPrice + " RM</span>" +
        "<span>" + Price + " RM</span></div>" +
        "</li>" +
        "<li class='cartdetail'>" +
       // "<div class='emailafriend'><a href='#'>" +
      //  "<i class='fa fa-envelope-o' aria-hidden='true'></i>" +
      //  "<span>Email to Friend</span></a></div>" +
        "<div class='detailaddtocart' ><a href='#' data-toast  data-message='Added to cart' data-position='bc' data-productid='" + ProductId + "' onclick='AddToCart_Desc(this)' ><img  src='images/detailaddtocart.png' />" +
        "    <span>Add to cart</span></a></div>" +
        "</li>" +
        "<li>" +
//        "<div class='detailsocialmedia'><a href='#'><img src='images/facebook.png' /></a>" +
//        "      <a href='#'><img src='images/twitter.png' /></a><a href='#'>" +
//        "  <img src='images/printrest.png' /></a><a href='#'>" +
//        "        <img src='images/socialmedia.png' /></a><a href='#'>" +
//        "              <img src='images/googlepluse.png' /></a></div>" +    
        "<div class='wishlisticon'>" + WishListHtml + "</div>" +
        "</li>" +
        "</ul>" +
        "</div>" +
        "<div class='clear'></div>" +
        "<div class='discwrapper'>" +
        "<h2>description</h2>" +
        "<p> " + ShortDescription + "</p>" +
        "</div>";
    return ProdHtml;
}

function BestSellingProducts(ElementId) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.ajax({

            type: "GET",
            method: "GET",
            url: Base_Url+'Product.svc/BestSellingProduct?Count=6&CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            BestSellingProducts_CartUpdate();   
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $('#' + ElementId).empty();
            $.each(JSON.parse(response.d), function(key, value) {
                $('#' + ElementId).append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage, 0, "BestSellingProducts_Desc"));
                if (value.Quantity != 0) {
                    $("#Wish_L_" + value.ProductId + "_0_BestSellingProducts_Desc i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_0_BestSellingProducts_Desc").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_0_BestSellingProducts_Desc')");
                }
            }); 
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText);
        }
    } else {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Product.svc/BestSellingProduct?Count=6&CustomerId=' + window.localStorage.getItem('LogOutCustomerId'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            BestSellingProducts_CartUpdate();
            $.afui.hideMask();
        });


        function ajaxSucceess(response) {
            $('#' + ElementId).empty();
            $.each(JSON.parse(response.d), function(key, value) {
                $('#' + ElementId).append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage, 0, "BestSellingProducts_Desc"));
                if (value.Quantity != 0) {
                    $("#Wish_L_" + value.ProductId + "_0_BestSellingProducts_Desc i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_0_BestSellingProducts_Desc").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_0_BestSellingProducts_Desc')");
                }
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText);
        }
    }
}

function BestSellingProducts_CartUpdate() {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Product.svc/BestSellingProduct?Count=6&CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $('#' + ElementId).empty();
            $.each(JSON.parse(response.d), function(key, value) {
                $("#Cart_L_" + value.ProductId + "_0_BestSellingProducts_Desc").html(value.Quantity);
                $("#Cart_L_" + value.ProductId + "_0_BestSellingProducts_Desc").css("display", "block");
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText);
        }
    } else {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Product.svc/BestSellingProduct?Count=6&CustomerId=' + window.localStorage.getItem('LogOutCustomerId'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $('#' + ElementId).empty();
            $.each(JSON.parse(response.d), function(key, value) {
                $("#Cart_L_" + value.ProductId + "_0_BestSellingProducts_Desc").html(value.Quantity);
                $("#Cart_L_" + value.ProductId + "_0_BestSellingProducts_Desc").css("display", "block")
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText);
        }
    }
}

function LoadProducts(ElementId, url) {
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: url,
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
            if (ElementId == 'BestSellingProducts') {
                var BestSellingUrl = Base_Url+'Product.svc/BestSellingProducts_CartUpdate?Count=6&CustomerId=' + window.localStorage.getItem('LoginCustomerID');
                LoadProducts_CartUpdate('BestSellingProducts', BestSellingUrl);
            } else if (ElementId == 'LowPrice') {
                var LowPriceUrl = Base_Url+'Product.svc/LowPriceProducts_CartUpdate?Count=6&CustomerId=' + window.localStorage.getItem('LoginCustomerID');
                LoadProducts_CartUpdate('LowPrice', LowPriceUrl);
            } else if (ElementId == 'HighPrice') {

                var HighPriceUrl = Base_Url+'Product.svc/HighPriceProducts_CartUpdate?Count=6&CustomerId=' + window.localStorage.getItem('LoginCustomerID');
                LoadProducts_CartUpdate('HighPrice', HighPriceUrl);
            } else if (ElementId == 'OfferPrice') {
                var OfferPriceUrl = Base_Url+'Product.svc/GetOfferProduct_CartUpdate?count=6&CustomerId=' + window.localStorage.getItem('LoginCustomerID');
                LoadProducts_CartUpdate('OfferPrice', OfferPriceUrl);
            }
        } else {
            if (ElementId == 'BestSellingProducts') {
                var BestSellingUrl = Base_Url+'Product.svc/BestSellingProducts_CartUpdate?Count=6&CustomerId=' + window.localStorage.getItem('LogOutCustomerId');
                LoadProducts_CartUpdate('BestSellingProducts', BestSellingUrl);
            } else if (ElementId == 'LowPrice') {
                var LowPriceUrl = Base_Url+'Product.svc/LowPriceProducts_CartUpdate?Count=6&CustomerId=' + window.localStorage.getItem('LogOutCustomerId');

                LoadProducts_CartUpdate('LowPrice', LowPriceUrl);
            } else if (ElementId == 'HighPrice') {
                var HighPriceUrl = Base_Url+'Product.svc/HighPriceProducts_CartUpdate?Count=6&CustomerId=' + window.localStorage.getItem('LogOutCustomerId');
                LoadProducts_CartUpdate('HighPrice', HighPriceUrl);
            } else if (ElementId == 'OfferPrice') {
                var OfferPriceUrl = Base_Url+'Product.svc/GetOfferProduct_CartUpdate?count=6&CustomerId=' + window.localStorage.getItem('LogOutCustomerId');
                LoadProducts_CartUpdate('OfferPrice', OfferPriceUrl);
            }
        }
    });

    function ajaxSucceess(response) {
        $('#' + ElementId).empty();
        $.each(JSON.parse(response.d), function(key, value) {
            $('#' + ElementId).append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage, 0, ElementId));
            if (ElementId == 'BestSellingProducts') {
                if (value.Quantity != 0) {
                    $("#Wish_L_" + value.ProductId + "_0_BestSellingProducts i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_0_BestSellingProducts").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_0_BestSellingProducts')");
                }
            } else if (ElementId == 'LowPrice') {
                if (value.Quantity != 0) {
                    $("#Wish_L_" + value.ProductId + "_0_LowPrice i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_0_LowPrice").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_0_LowPrice')");
                }
            } else if (ElementId == 'HighPrice') { 
                if (value.Quantity != 0) {
                    $("#Wish_L_" + value.ProductId + "_0_HighPrice i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_0_HighPrice").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_0_HighPrice')");
                }
            } else if (ElementId == 'OfferPrice') {
                if (value.Quantity != 0) {
                    $("#Wish_L_" + value.ProductId + "_0_OfferPrice i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_0_OfferPrice").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_0_OfferPrice')");
                }
            }
        })
    }

    function ajaxError(response) {}
}

function LoadProducts_CartUpdate(ElementId, url) {
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: url,
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        $.each(JSON.parse(response.d), function(key, value) {
            if (ElementId == 'BestSellingProducts') {
                $("#Cart_L_" + value.ProductId + "_0_BestSellingProducts").html(value.Quantity);
                $("#Cart_L_" + value.ProductId + "_0_BestSellingProducts").css("display", "block");
            } else if (ElementId == 'LowPrice') {
                $("#Cart_L_" + value.ProductId + "_0_LowPrice").html(value.Quantity);
                $("#Cart_L_" + value.ProductId + "_0_LowPrice").css("display", "block");
            } else if (ElementId == 'HighPrice') {
                $("#Cart_L_" + value.ProductId + "_0_HighPrice").html(value.Quantity);
                $("#Cart_L_" + value.ProductId + "_0_HighPrice").css("display", "block");
            } else if (ElementId == 'OfferPrice') {
                $("#Cart_L_" + value.ProductId + "_0_OfferPrice").html(value.Quantity);
                $("#Cart_L_" + value.ProductId + "_0_OfferPrice").css("display", "block");
            }
        })
    }

    function ajaxError(response) {}
}

function AddToCart(This_Val) {
    var l = ProdId.length;
    var i;
    for (i = 0; i < l; i++) {
        if (ProdId[i] == $(This_Val).attr("data-productid")) {
            alert("Product already exist in cart");

        } else {
            ProdId[l + 1] = $(This_Val).attr("data-productid");
        }
    }
    var From;
    var Quantity;
    if ($(This_Val).attr("class") == "addtocartfromwishlist") {
        From = "Wishlist";
        Quantity = $("#WishQuantity_" + $(This_Val).attr("data-productid")).val();
        Quantity
    }
    else {
        From = "";
        Quantity = "1";
    }
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'ShoppingCart.svc/ShoppingCartAddItem?ProductId=' + $(This_Val).attr("data-productid") + '&ShoppingcartId=1&CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&Quantity=' + Quantity + '&StoreId=1&From=' + From,
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            var OldValue = Number($("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Promotion").html())
            
            var Recent_OldValue = Number($("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Recent").html())
            
            var BestSellingProducts_Desc_OldValue = Number($("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_BestSellingProducts_Desc").html())
            
            var BestSelling_OldValue = Number($("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_BestSellingProducts").html())
            
            var LowPrice_OldValue = Number($("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_LowPrice").html())
            
            var HighPrice_OldValue = Number($("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_HighPrice").html())
            
            var OfferPrice_OldValue = Number($("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_OfferPrice").html())
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Promotion").html(OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Promotion").css("display", "block");
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Category").html(OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Category").css("display", "block");
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Recent").html(Recent_OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Recent").css("display", "block");
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_BestSellingProducts").html(BestSelling_OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_BestSellingProducts").css("display", "block");
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") +
                "_LowPrice").html(LowPrice_OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_LowPrice").css("display", "block");
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_HighPrice").html(HighPrice_OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_HighPrice").css("display", "block");
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_ OfferPrice").html(OfferPrice_OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_OfferPrice").css("display", "block");
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_OfferPrice").html(OfferPrice_OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_OfferPrice").css("display", "block");
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_BestSellingProducts_Desc").html(BestSellingProducts_Desc_OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_BestSellingProducts_Desc").css("display", "block");
            UpdateCartCount();
        });

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(response.responseText);
        }
    } else {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'ShoppingCart.svc/ShoppingCartAddItem?ProductId=' + $(This_Val).attr("data-productid") + '&ShoppingcartId=1&CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&Quantity=1&StoreId=1&From=' + From,
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            var OldValue = Number($("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Promotion").html())
            
            var Recent_OldValue = Number($("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Recent").html())
            
            var BestSellingProducts_Desc_OldValue = Number($("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_BestSellingProducts_Desc").html())
            
            var BestSelling_OldValue = Number($("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_BestSellingProducts").html())
            
            var LowPrice_OldValue = Number($("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_LowPrice").html())
            
            var HighPrice_OldValue = Number($("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_HighPrice").html())
            
            var OfferPrice_OldValue = Number($("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_OfferPrice").html())
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Promotion").html(OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Promotion").css("display", "block");
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Category").html(OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Category").css("display", "block");
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Recent").html(Recent_OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_Recent").css("display", "block");
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_BestSellingProducts").html(BestSelling_OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_BestSellingProducts").css("display", "block");
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") +
                "_LowPrice").html(LowPrice_OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_LowPrice").css("display", "block");
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_HighPrice").html(HighPrice_OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_HighPrice").css("display", "block");
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_ OfferPrice").html(OfferPrice_OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_OfferPrice").css("display", "block");
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_OfferPrice").html(OfferPrice_OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_OfferPrice").css("display", "block");
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_BestSellingProducts_Desc").html(BestSellingProducts_Desc_OldValue + 1);
            
            $("#Cart_L_" + $(This_Val).attr("data-productid") + "_" + $(This_Val).attr("data-CategoryId") + "_BestSellingProducts_Desc").css("display", "block");
            UpdateCartCount();
        });

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(response.responseText);
        }   
    }
}

function AddToCart_Desc(This_Val) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'ShoppingCart.svc/ShoppingCartAddItem?ProductId=' + $(This_Val).attr("data-productid") + '&ShoppingcartId=1&CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&Quantity=' + $("#Quantity_ProductDesc" + $(This_Val).attr("data-productid")).val() + '&StoreId=1',
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            UpdateCartCount();
        });  

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(response.responseText);
        }
    } else {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'ShoppingCart.svc/ShoppingCartAddItem?ProductId=' + $(This_Val).attr("data-productid") + '&ShoppingcartId=1&CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&Quantity=' + $("#Quantity_ProductDesc" + $(This_Val).attr("data-productid")).val() + '&StoreId=1',
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            UpdateCartCount();
        });

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(response.responseText);
        }
    }
}

function UpdateCartCount() {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'ShoppingCart.svc/ShoppingCartCount?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {});

        function ajaxSucceess(response) {
            if (JSON.parse(response.d) == 0) {
                $.afui.removeBadge("#CartBadge");
            } else {
                $.afui.updateBadge("#CartBadge", JSON.parse(response.d), "tr", "#f57365");
            }
        }

        function ajaxError(response) {
            //         alert(response.responseText);
        }
    } else {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'ShoppingCart.svc/ShoppingCartCount?CustomerId=' + window.localStorage.getItem('LogOutCustomerId'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {});

        function ajaxSucceess(response) {
            if (JSON.parse(response.d) == 0) {
                $.afui.removeBadge("#CartBadge");
            } else {
                $.afui.updateBadge("#CartBadge", JSON.parse(response.d), "tr", "#f57365");
            }
        }

        function ajaxError(response) {
            //         alert(response.responseText);
        }
    }
}

function UpdateWishlistCount() {  
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Wishlist.svc/GetWishlistCount?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError  
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            if (JSON.parse(response.d) == 0) {
                $.afui.removeBadge("#WishListBadge");
            } else {
                $.afui.updateBadge("#WishListBadge", JSON.parse(response.d), "tr", "#f57365");
            }
        }

        function ajaxError(response) {
            //         alert(response.responseText);
        }
    } else {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Wishlist.svc/GetWishlistCount?CustomerId=' + window.localStorage.getItem('LogOutCustomerId'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            if (JSON.parse(response.d) == 0) {
                $.afui.removeBadge("#WishListBadge");
            } else {
                $.afui.updateBadge("#WishListBadge", JSON.parse(response.d), "tr", "#f57365");
            }
        }

        function ajaxError(response) {
            //         alert(response.responseText);
        }
    }
}

function CheckCustomerLoginState() {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $("#LoginList").css("display", "block");
        $("#NotloginList").css("display", "none");
    } else {
        $("#LoginList").css("display", "none");
        $("#NotloginList").css("display", "block");
    }
}

function Register() {
    var registration_firstname = document.registration.registration_firstname;
    var registration_lastname = document.registration.registration_lastname;
    var registration_email = document.registration.registration_email;
    var registration_phone = document.registration.registration_phone;
    var registration_address = document.registration.registration_address;
    var registration_country = document.registration.registration_country;
    var registration_area = document.registration.registration_area;
    var registration_password = document.registration.registration_password;
    var registration_confirmpassword = document.registration.registration_confirmpassword;
    if (firstname_validation1(registration_firstname)) {
        if (lastname_validation1(registration_lastname)) {
            if (ValidateEmail1(registration_email)) {
                if (allnumeric1(registration_phone)) {
                    if (alphanumeric1(registration_address)) {
                        if (countryselect1(registration_country)) {
                            if (areaselect1(registration_area)) {
                                if (password_validation1(registration_password, 7, 12)) {
                                    if (confirmpassword_validation1(registration_confirmpassword, 7, 12)) {

                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

function firstname_validation1(registration_firstname) {
    var firstname_len = document.forms["registration"]["registration_firstname"].value;
    if (firstname_len == "") {
        alert("First Name should not be empty ");
        registration_firstname.focus();
        return false;
    }
    return true;
}

function lastname_validation1(registration_lastname) {
    var lastname_len = document.forms["registration"]["registration_lastname"].value;
    if (lastname_len == "") {
        alert("Last Name should not be empty");
        registration_lastname.focus();
        return false;
    }
    return true;
}

function ValidateEmail1(registration_email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (registration_email.value.match(mailformat)) {
        return true;
    } else {
        alert("You have entered an invalid email address!");
        registration_email.focus();
        return false;
    }
}

function allnumeric1(registration_phone) {
    var numbers = /^[0-9]+$/;
    if (registration_phone.value.match(numbers)) {
        return true;
    } else {
        alert('Phone code must have numeric characters only');
        registration_phone.focus();
        return false;
    }
}

function alphanumeric1(registration_address) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (registration_address.value.match(letters)) {
        return true;
    } else {
        alert('Address must have alphanumeric characters only');
        registration_address.focus();
        return false;
    }
}

function countryselect1(registration_country) {
    if (registration_country.value == "0") {
        alert('Select your country from the list');
        registration_country.focus();
        return false;
    } else {
        return true;
    }
}

function areaselect1(registration_area) {
    if (registration_area.value == "0") {
        alert('Select your area from the list');
        registration_area.focus();
        return false;
    } else {
        return true;
    }
}

function password_validation1(registration_password, min, max) {
    var password_len = registration_password.value.length;
    if (password_len.value == 0 || password_len >= max || password_len < min) {
        alert("Password should not be empty / length be between " + min + " to " + max);
        registration_password.focus();
        return false;
    }
    return true;
}

function confirmpassword_validation1(registration_confirmpassword, min, max) {
    var password = document.getElementById("registration_password").value;
    var confirmpassword = document.getElementById("registration_confirmpassword").value;
    if (password != confirmpassword) {
        document.getElementById("registration_password").style.borderColor = "";
        document.getElementById("registration_confirmpassword").style.borderColor = "";
        alert("Password Mismatch");
    } else {
        alert("Registered Successfully, activate your account through your registered Email Id");
        RegisterNew();
    }
}

function RegisterNew() {
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Customer.svc/CustomerLoginRegistration?Firstname=' + $("#registration_firstname").val().trim() + '&Lastname=' + $("#registration_lastname").val().trim() + '&Email=' + $("#registration_email").val().trim() + '&Phone=' + $("#registration_phone").val().trim() + '&StreetAddress=' + $("#registration_address").val().trim() + '&CountryId=' + $("#registration_country").val().trim() + '&AreaId=' + $("#registration_area").val().trim() + '&Password=' + $("#registration_password").val().trim(),
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        if (JSON.parse(response.d).length != 0) {
            window.location = "Login.html";
        }
    };

    function ajaxError(response) {
        //         alert(errormsg.responseText); 
    }
}

function AddRegisteredCustomer() {
    $("#RegisterTab").attr("class", "panel ");
    $("#HomePage").attr("class", "panel active");
    $("#ApplicationTitle").html("Home");
}

function ClearRegisteredData() {
   // window.location = "Register.html";
}
 
   
function LoginMenu() {
    window.location = "Login.html";    
    $.afui.drawer.hide();
}

function HideLoginPanel() { //HideAllPanels();
 window.history.back()      
//window.location = "home.html";  
 HomePage(); CategoryProducts(31);
}  
 
function HideRegisterPanel() { //HideAllPanels();
    window.location = "home.html";
    window.history.back() 
}
 
function Login(form) { 
    var Flag = false;
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Customer.svc/Authentication?Username=' + form.username.value + '&Password=' + form.passid.value,
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        if (Flag == true) {
            ProfileLoad();
            ShoppingCartSynchronization();
            WishlistSynchronization();
        }
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        if (JSON.parse(response.d).length != 0) {
            Flag = true;
            $.each(JSON.parse(response.d), function(key, value) {

                window.localStorage.setItem("LoginCustomerID", value.Id);
                window.localStorage.setItem('LoginUserName', value.Email);
            });
            $("#LoginList").css("display", "block");
            $("#NotloginList").css("display", "none");
            $(".HeaderSection").css("visibility", "visible");
            $(".FooterSection").css("visibility", "visible");
            $.afui.clearHistory();
            document.getElementById("Login").reset();
            window.location = "home.html";
        } else {
            alert("Invalid UserName or Password");
        }
    }

    function ajaxError(response) {
        //      alert(response.responseText); 
    }
}

function PasswordResetLogin(UserName, Password) {

    $.afui.clearHistory();
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Customer.svc/Authentication?Username=' + UserName + '&Password=' + Password,
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        if (JSON.parse(response.d).length != 0) {
            $.each(JSON.parse(response.d), function(key, value) {
                window.localStorage.setItem("LoginCustomerID", value.Id);
                window.localStorage.setItem('LoginUserName', value.Email);
            })
            UpdateCartCount();
            UpdateWishlistCount();
            window.location = "home.html";
        } else {
            alert("Invalid UserName or Password");
        }
    }

    function ajaxError(response) {
        window.location = "home.html";
        //  alert(response.responseText);
    }
}

function ChangePasword(form) {
     $.afui.clearHistory();
    if ($("#NewPassword").val().trim() != $("#ConfirmPassword").val().trim()) {
        alert("new and confirmation password mismatch");
    } else {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Customer.svc/UpdatePassword?Username=' + window.localStorage.getItem("LoginUserName") + '&Password=' + $("#Password").val().trim() + '&newpassword=' + $("#NewPassword").val().trim(),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() { 
            document.getElementById("ChangePass").reset();
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            if (JSON.parse(response.d).length != 0) {
                alert("Password Reset Successfully");
                PasswordResetLogin(window.localStorage.getItem("LoginUserName"), $("#NewPassword").val().trim());
            }
        }

        function ajaxError(response) {
            //                    alert(response.responseText);
        }
    }
}

function Logout() {
    window.localStorage.setItem('RecentlyViewed', null);
    $.afui.drawer.hide();

    $("#LoginList").css("display", "none");
    $("#NotloginList").css("display", "block");
    window.location = "home.html";
    window.localStorage.setItem('LoginCustomerID', null);
    $('#CartProducts').empty();
    $('#WishListProduct').empty();
    $.afui.removeBadge("#CartBadge");
    $.afui.removeBadge("#WishListBadge");
    $.afui.clearHistory();
    ProfileLoad();
    UpdateWishlistCount();
    UpdateCartCount();
    HomePage();
}

function MyAccount() {
    $("#LoginHide").css("display", "none");
    $("#asdsd").css("display", "block");
}

function HideAllPanels() {
    $("#login").attr("class", "panel login");
    $("#HomePage").attr("class", "panel");
    $("#SearchTab").attr("class", "panel");
    $("#RegisterTab").attr("class", "panel");
    $("#PromotionPage").attr("class", "panel");
    $("#RecentlyViewedPage").attr("class", "panel");
    $("#WishlistPage").attr("class", "panel");
    $("#MyCartPage").attr("class", "panel");
}


function LoadCheckoutPage() {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'ShoppingCart.svc/GetAllCartedItems?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            DefaultShippingAddress();
            CheckoutAmountTotal();
        });

        function ajaxSucceess(response) {
            $('#CheckoutProductDetails').empty();
            $.each(JSON.parse(response.d), function(key, value) {
                $('#CheckoutProductDetails').append(BindCheckoutProducts(value.ProductId, value.Image, value.Name, value.Price, value.Quantity, value.TotalPrice, value.OfferPercentage));
            });
            $.afui.loadContent("#Checkout", false, false, "fade");
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText);   
        }
    } else {
        window.location = "Login.html";
    }
}

function BindCheckoutProducts(ProductId, Image, Name, Price, Quantity, TotalPrice, OfferPercentage) {
    var Html;
    var QuantityTextId = "Quantity_" + ProductId;
    Html = "<li>" +
        "<div class='productdetalimage'><img  src=" + Image + " />" +
        " <div class='productoffer'>" + OfferPercentage + "%</div>" +
        "</div>" +
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

function CheckoutAmountTotal() {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'ShoppingCart.svc/CartAmountTotal?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {
                $('#SubTotalCheckout').text(value.SubTotal + " RM");
                $('#ShippingChargesCheckout').text(value.Shippingcost + " RM");
                $('#GrandTotalCheckout').text(value.GrandTotal + " RM");
                $('#TotalAmountPlaceOrder').text(value.GrandTotal + " RM");
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function ShippingAddressList() {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Address.svc/CustomerShippingAddress?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $('#Shippingdetails_addlist').empty();
            $.each(JSON.parse(response.d), function(key, value) {
                $('#Shippingdetails_addlist').append(ShippingAddressListHtml(value.Id, value.FirstName, value.Email, value.Phone_Number, value.Area, value.Country));
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function ShippingAddressListHtml(AddressId, FirstName, Email, Phone_Number, Area, Country) {
    var Html;
    Html = "<div class='shippingtitle'>" +
        "<strong>" + FirstName + "</strong>" +
        " <a href='#'  class='shippingaddresslist' id='" + AddressId + "' onclick='DeleteShippingAddress(this)'><i class='fa fa-trash-o' aria-hidden='true'></i></a>" +
        "<a href='#EditAddress'  id='" + AddressId + "' onclick='EditShippingAddress(this)' class='shippingaddresslist'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>" +
        "</div>" +
        " <div class='ShippingAddress'>" +
        " <span>" + Email + "</span>" +
        "<span>" + Phone_Number + "</span>" +
        "<span>" + Area + "</span>" +
        "<span>" + Country + "</span>" +
        "</div>";
    return Html;
}

function EditShippingAddress(This_Val) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        window.localStorage.setItem("AddressId", $(This_Val).attr("Id"));
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Address.svc/GetShippingAddressById?AddressId=' + $(This_Val).attr("Id"),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {
                var output = $.parseXML(value.CustomAttributes);
                $('AddressAttribute', output).each(function(i, e) {
                    if ($(e).attr('ID') == "1")
                        $("#txtShipping_FlatNo").val($(e).find("AddressAttributeValue").find("Value").text());
                    if ($(e).attr('ID') == "2")
                        $("#txtBuildingaddress").val($(e).find("AddressAttributeValue").find("Value").text());
                    if ($(e).attr('ID') == "3")
                        $("#txtStreetLandMark").val($(e).find("AddressAttributeValue").find("Value").text());
                });
                LoadCountries_Inner('txtShipping_country', value.CountryId.toString().trim(), value.StateProvinceId.toString().trim());
                $("#txtShipping_FirstName").val(value.FirstName);
                $("#txtShipping_LastName").val(value.LastName);
                $("#txtShipping_Email").val(value.Email);
                $("#txtShipping_Phone_Number").val(value.Phone_Number);
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function DeleteShippingAddress(This_Val) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Address.svc/DeleteShippingAddressById?AddressId=' + $(This_Val).attr("Id"),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
            ShippingAddressList();
        });

        function ajaxSucceess(response) {};
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText); 
    }
}

function TrackOrder() {
    $.afui.clearHistory();
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Order.svc/TrackOrderDetails?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $('#TrackOrderShippingDetails').empty();
            $.each(JSON.parse(response.d), function(key, value) {
                $('#TrackOrderShippingDetails').append(TrackOrderHtml(value.Id, value.OrderStatusId, value.CreatedOnUtc, value.OrderTotal));
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function TrackOrderProducts(Id) {
    $.afui.loadContent("#TrackOrderDetails", false, false, "fade");
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Order.svc/OrderProductDetails?OrderId=' + Id,
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {});

        function ajaxSucceess(response) {
            $('#TrackOrderProductDetails').empty();
            var Paymentmethod;
            $.each(JSON.parse(response.d), function(key, value) {
                Paymentmethod = value.PaymentMethodSystemName;
                $('#TrackOrderProductDetails').append(BindTrackOrderProducts(value.ProductId, value.Image, value.Name, value.Price, value.Quantity, value.TotalPrice, value.OfferPercentage));
            });
            if (Paymentmethod == 'Payments.PayInStore')
                Paymentmethod = 'Payed by <b>Card</b>';
            else
                Paymentmethod = 'Payed by <b>Cash</b>';
            $('#TrackOrderDetailInformationPayment').empty();
            $('#TrackOrderDetailInformationPayment').append(TrackOrderDetailHtmlPayment(Paymentmethod));
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText);   
        }

    } else {
        $.afui.loadContent("#login", false, false, "fade");
    }
}

function BindTrackOrderProducts(ProductId, Image, Name, Price, Quantity, TotalPrice, OfferPercentage) {
    var Html;
    var QuantityTextId = "Quantity_" + ProductId;
    Html = "<li>" +
        "<div class='productdetalimage'><img  src=" + Image + " />" +
        " <div class='productoffer'>" + OfferPercentage + "%</div>" +
        "</div>" +
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

function TrackOrderHtml(Id, OrderStatusId, CreatedOnUtc, OrderTotal) {
    var Html;
    var Status;
    var Content;
    if (OrderStatusId == 10) {
        Status = 'Pending';
    } else if (OrderStatusId == 20) {
        Status = 'Picking';
    } else if (OrderStatusId == 30) {
        Status = 'Picked';
    } else if (OrderStatusId == 40) {
        Status = 'Packing';
    } else if (OrderStatusId == 50) {
        Status = 'Packed';
    } else if (OrderStatusId == 60) {
        Status = 'Shipping';
    } else if (OrderStatusId == 70) {
        Status = 'Shipped';
    } else if (OrderStatusId == 80) {
        Status = 'Delivering';
    } else if (OrderStatusId == 90) {
        Status = 'Delivered';
    }
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
    } else if (hours > 12) {
        hours = hours % 12;
        mid = 'PM';
    }
    Html = "<div class='card' style='height:100px;' onclick='TrackOrderDetailsBilling(" + Id + ")'>" +
        "<div class='TopOrderSection'>" +
        "<div class='ordernumber'>#" + Id + "</div>" +
        "<div class='orderStatus'><span class='" + Status + "'>" + Status + "</span></div>" +
        " </div>" +
        " <div class='BottomOrderSection'>" +
        "<div class='orderdate'><strong>Ordered :</strong>" + day + "-" + month + "-" + year + " " + hours + ":" + minutes + " " + mid + "</div>" +
        "<div class='orderamount'>Total : <span> " + OrderTotal + " RM</span></div>" +
        "</div>  " +
        "</div>";
    return Html;

}

function TrackOrderDetailsBilling(Id) {

    launchnavigator.navigate("London, UK");
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Order.svc/GetOrderBillingAddress?OrderId=' + Id,
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $('#TrackOrderDetailInformationBilling').empty();
            $.each(JSON.parse(response.d), function(key, value) {
                $('#TrackOrderDetailInformationBilling').append(TrackOrderDetailHtmlBilling(value.Name, value.Email, value.Phone, value.State, value.Country));
                TrackOrderDetailsShipping(Id);
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function TrackOrderDetailsShipping(Id) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Order.svc/GetOrderShippingAddress?OrderId=' + Id,
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            TrackOrderProducts(Id);
            TrackOrderAmountTotal(Id);
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $('#TrackOrderDetailInformationShipping').empty();
            $.each(JSON.parse(response.d), function(key, value) {
                $('#TrackOrderDetailInformationShipping').append(TrackOrderDetailHtmlShipping(value.Name, value.Email, value.Phone, value.State, value.Country));
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function TrackOrderAmountTotal(Id) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({

            type: "GET",
            method: "GET",
            url: Base_Url+'Order.svc/OrderAmountTotal?OrderId=' + Id,
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {
                $('#SubTotalTrackOrder').text(value.SubTotal + " RM");
                $('#ShippingChargesTrackOrder').text(value.Shippingcost + " RM");
                $('#GrandTotalTrackOrder').text(value.GrandTotal + " RM");
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function TrackOrderDetailHtmlBilling(Name, Email, Phone, State, Country) {
    var Html;
    Html = "<div class='shippingtitle'>" +
        "<strong>Billing Address</strong>" +


        "</div> " +
        " <div class='ShippingAddress'>" +
        " <span>" + Name + "</span>" +
        " <span>" + Email + "</span>" +
        "<span>" + Phone + " </span>" +
        " <span> " + State + "</span>" +
        "  <span>" + Country + " </span>" +
        " </div>";
    return Html;
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
        " <span> " + State + "</span>" +
        "  <span>" + Country + " </span>" +
        " </div>";
    return Html;
}

function TrackOrderDetailHtmlPayment(Paymentmethod) {
    var Html;
    Html = "<div class='shippingtitle'>" +
        "<strong>Payment Method</strong>" +
        "</div> " +
        " <div class='ShippingAddress'>" +
        " <span>" + Paymentmethod + "</span>" +
        " </div>";
    return Html;
}

function ShoppingCartSynchronization() {
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'ShoppingCart.svc/ShoppingCartSynchronization?LogInCustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&LogOutCustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&shoppingcarttypeId=1',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        UpdateCartCount();
        UpdateWishlistCount();
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {}

    function ajaxError(response) {
        //  alert(response.responseText);
    }
}

function WishlistSynchronization() {
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'ShoppingCart.svc/ShoppingCartSynchronization?LogInCustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&LogOutCustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&shoppingcarttypeId=2',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        UpdateCartCount();
        UpdateWishlistCount();
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {}

    function ajaxError(response) {
        //  alert(response.responseText);
    }

}

function CheckOutBack() {
    if ($.afui.getTitle() == "Checkout") { 
        CancelPopUp_Terms();
        CartProducts();
        $.afui.loadContent("#MyCartPage", false, false, "fade"); 
    }
    else if ($.afui.getTitle() == "Registration") {
     
        $.afui.loadContent("#LoginPage", false, false, "fade");
    }
    else if ($.afui.getTitle() == "Details") {
        CancelPopUp_Terms();
        CartProducts();
        $.afui.loadContent("#HomePage", false, false, "fade");
    }
    else if ($.afui.getTitle() == "Shipping Address") {
//        LoadCheckoutPage();
//        $.afui.loadContent("#Checkout", false, false, "fade"); 
           $.afui.goBack();
    } else if ($.afui.getTitle() == "Add address") {
//        ShippingAddressList();
//        $.afui.loadContent("#CheckoutAddressList", false, false, "fade");
           $.afui.goBack();
    } else if ($.afui.getTitle() == "Edit address") {
//        ShippingAddressList();
//        $.afui.loadContent("#CheckoutAddressList", false, false, "fade");
           $.afui.goBack();
    }
}

function MyAccountMenu() {
    if ($("#MyAccountSubMenu").css("display") == "none") {
        $("#MyAccountSubMenu").css("display", "block");
    } else {
        $("#MyAccountSubMenu").css("display", "none");
    }
}

function DefaultShippingAddress() {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        var Flag = 1;
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Address.svc/CustomerShippingAddress?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $('#DefaultShippingAddress').empty();
            if (JSON.parse(response.d).length == 0) {
                $('#DefaultShippingAddress').append("<a class='DefaultNewAddress' href='#CheckoutAddNewAddress'>New Address</a>");
            }
            $.each(JSON.parse(response.d), function(key, value) {
                if (Flag <= 1) {
                    window.localStorage.setItem("ShippingAddressId", value.Id);
                    $('#DefaultShippingAddress').append(DefaultShippingAddressHtml(value.Id, value.FirstName, value.Email, value.Phone_Number, value.Area, value.Country));
                    Flag++;
                }
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function DefaultShippingAddressHtml(AddressId, FirstName, Email, Phone_Number, Area, Country) {
    var Html;
    Html = "<strong>" + FirstName + "</strong>" +

        "</div>" +
        " <div class='ShippingAddress'>" +
        " <span>" + Email + "</span>" +
        "<span>" + Phone_Number + "</span>" +
        "<span>" + Area + "</span>" +
        "<span>" + Country + "</span>";
    return Html;
}

function AddNewShippingAddressValidation() {
    var txtnew_firstname = document.AddShippingAddress.txtnew_firstname;
    var txtnew_lastname = document.AddShippingAddress.txtnew_lastname;
    var txtnew_email = document.AddShippingAddress.txtnew_email;
    var txtnew_phone = document.AddShippingAddress.txtnew_phone;
    var txtnew_FlatNo = document.AddShippingAddress.txtnew_FlatNo;
    var txtnew_streetaddress = document.AddShippingAddress.txtnew_streetaddress;
    var txtnew_StreetLandMark = document.AddShippingAddress.txtnew_StreetLandMark;
    var txt_newAddNewAddressCountry = document.AddShippingAddress.txt_newAddNewAddressCountry;
    var txtnew_AddNewAddressArea = document.AddShippingAddress.txtnew_AddNewAddressArea;
    if (firstname_validation(txtnew_firstname)) {
        if (lastname_validation(txtnew_lastname)) {
            if (ValidateEmail(txtnew_email)) {
                if (allnumeric(txtnew_phone)) {
                    if (alphanumeric(txtnew_FlatNo)) {
                        if (alphanumeric1(txtnew_streetaddress)) {
                            if (alphanumeric2(txtnew_StreetLandMark)) {
                                if (countryselect(txt_newAddNewAddressCountry)) {
                                    if (areaselect_add(txtnew_AddNewAddressArea)) {}
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return false;
}

function firstname_validation(txtnew_firstname) {
    var firstname_len = document.forms["AddShippingAddress"]["txtnew_firstname"].value;
    if (firstname_len == "") {
        alert("First Name should not be empty");
        txtnew_firstname.focus();
        return false;
    }
    return true;
}

function lastname_validation(txtnew_lastname) {
    var lastname_len = document.forms["AddShippingAddress"]["txtnew_lastname"].value;
    if (lastname_len == "") {
        alert("Last Name should not be empty");
        lastname.focus();
        return false;
    }
    return true;
}

function ValidateEmail(txtnew_email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (txtnew_email.value.match(mailformat)) {
        return true;
    } else {
        alert("You have entered an invalid email address!");
        txtnew_email.focus();
        return false;
    }
}

function allnumeric(txtnew_phone) {
    var numbers = /^[0-9]+$/;
    if (txtnew_phone.value.match(numbers)) {
        return true;
    } else {
        alert('Phone number  must have numeric characters only');
        txtnew_phone.focus();
        return false;
    }
}

function alphanumeric(txtnew_FlatNo) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (txtnew_FlatNo.value.match(letters)) {
        return true;
    } else {
        alert('Flat No must not empty');
        txtnew_FlatNo.focus();
        return false;
    }
}

function alphanumeric1(txtnew_streetaddress) {
    //var letters = /^[0-9a-zA-Z]+$/;
    //if (txtnew_streetaddress.value.match(letters)) {
    //    return true;
    //} else {
    //    alert('Street address must not empty');
    //    txtnew_streetaddress.focus();
    //    return false;
    //}
    return true;
}

function alphanumeric2(txtnew_StreetLandMark) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (txtnew_StreetLandMark.value.match(letters)) {
        return true;
    } else {
        alert('Landmark must not be empty');
        txtnew_StreetLandMark.focus();
        return false;
    }
}

function countryselect(txt_newAddNewAddressCountry) {
    if (txt_newAddNewAddressCountry.value == "0") {
        alert('Select your country from the list');
        txt_newAddNewAddressCountry.focus();
        return false;
    } else {
        return true;
    }
}

function areaselect_add(txtnew_AddNewAddressArea) {
    if (txtnew_AddNewAddressArea.value == "0") {
        alert('Select your area from the list');
        txtnew_AddNewAddressArea.focus();
        return false;
    } else {
        AddNewShippingAddress();
        return true;
    }
}

function AddNewShippingAddress() {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Address.svc/AddNewShippingAddress?CustomerId=' + window.localStorage.getItem("LoginCustomerID") + '&Firstname=' + $("#txtnew_firstname").val().trim() + '&Lastname=' + $("#txtnew_lastname").val().trim() + '&Email=' + $("#txtnew_email").val().trim() + '&Phone=' + $("#txtnew_phone").val().trim() + '&flat=' + $("#txtnew_FlatNo").val().trim() + '&street=' + $("#txtnew_streetaddress").val().trim() + '&landmark=' + $("#txtnew_StreetLandMark").val().trim() + '&CountryId=' + $("#txt_newAddNewAddressCountry").val().trim() + '&AreaId=' + $("#txtnew_AddNewAddressArea").val().trim(),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
            ShippingAddressList();
        });

        function ajaxSucceess(response) {
            if (JSON.parse(response.d).length != 0) {
                $.afui.loadContent("#CheckoutAddressList", false, false, "fade");
            }
        };
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText); 
    }
}

function DeleteShippingAddress(This_Val) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Address.svc/DeleteShippingAddressById?AddressId=' + $(This_Val).attr("Id"),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
            ShippingAddressList();
        });

        function ajaxSucceess(response) {};
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText); 
    }
}

function UpdateShippingAddressValidation() {
    var txtShipping_FirstName = document.editaddress.txtShipping_FirstName;
    var txtShipping_LastName = document.editaddress.txtShipping_LastName;
    var txtShipping_Email = document.editaddress.txtShipping_Email;
    var txtShipping_Phone_Number = document.editaddress.txtShipping_Phone_Number;
    var txtShipping_FlatNo = document.editaddress.txtShipping_FlatNo;
    var txtBuilding_address = document.editaddress.txtBuilding_address;
    var txtStreet_LandMark = document.editaddress.txtStreet_LandMark;
    var txtShipping_country = document.editaddress.txtShipping_country;
    var txtShipping_area = document.editaddress.txtShipping_area;
    if (checkoutupdate_firstname_validation(txtShipping_FirstName)) {
        if (checkoutupdate_lastname_validation(txtShipping_LastName)) {
            if (checkoutupdate_ValidateEmail(txtShipping_Email)) {
                if (checkoutupdate_allnumeric(txtShipping_Phone_Number)) {
                    if (checkoutupdate_alphanumeric(txtShipping_FlatNo)) {
                        if (checkoutupdate_alphanumeric1(txtBuilding_address)) {
                            if (checkoutupdate_alphanumeric2(txtStreet_LandMark)) {
                                if (checkoutupdate_countryselect(txtShipping_country)) {
                                    if (checkoutupdate_areaselect_update(txtShipping_area)) {}
                                }
                            }
                        }
                    }
                }
            } 
        }
    }

    return false;
}

function checkoutupdate_firstname_validation(txtShipping_FirstName) {
    var firstname_len = document.forms["editaddress"]["txtShipping_FirstName"].value;
    if (firstname_len == "") {
        alert("First Name should not be empty ");
        txtShipping_FirstName.focus();
        return false;
    }
    return true;
}

function checkoutupdate_lastname_validation(txtShipping_LastName) {
    var lastname_len = document.forms["editaddress"]["txtShipping_LastName"].value;
    if (lastname_len == "") {
        alert("Last Name should not be empty ");
        txtShipping_LastName.focus();
        return false;
    }
    return true;
}

function checkoutupdate_ValidateEmail(txtShipping_Email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (txtShipping_Email.value.match(mailformat)) {
        return true;
    } else {
        alert("You have entered an invalid email address!");
        txtShipping_Email.focus();
        return false;
    }
}

function checkoutupdate_allnumeric(txtShipping_Phone_Number) {
    var numbers = /^[0-9]+$/;
    if (txtShipping_Phone_Number.value.match(numbers)) {
        return true;
    } else {
        alert('Phone number  must have numeric characters only');
        txtShipping_Phone_Number.focus();
        return false;
    }
}

function checkoutupdate_alphanumeric(txtShipping_FlatNo) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (txtShipping_FlatNo.value.match(letters)) {
        return true;
    } else {
        alert('Flat No must not empty');
        txtShipping_FlatNo.focus();
        return false;
    }
}

function checkoutupdate_alphanumeric1(txtBuilding_address) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (txtBuilding_address.value.match(letters)) {
        return true;
    } else {
        alert('Street address must not empty');
        txtBuilding_address.focus();
        return false;
    }
}

function checkoutupdate_alphanumeric2(txtStreet_LandMark) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (txtStreet_LandMark.value.match(letters)) {
        return true;
    } else {
        alert('Landmark must not be empty');
        txtStreet_LandMark.focus();
        return false;
    }
}

function checkoutupdate_countryselect(txtShipping_country) {
    if (txtShipping_country.value == "0") {
        alert('Select your country from the list');
        txtShipping_country.focus();
        return false;
    } else {
        return true;
    }
}

function checkoutupdate_areaselect_update(txtShipping_area) {
    if (txtShipping_area.value == "0") {
        alert('Select your area from the list');
        txtShipping_area.focus();
        return false;
    } else {
        UpdateShippingAddress();
        return true;
    }
}

function UpdateShippingAddress() {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Address.svc/UpdateAddressInfomtion?AddresId=' + window.localStorage.getItem("AddressId") + '&Firstname=' + $("#txtShipping_FirstName").val().trim() + '&Lastname=' + $("#txtShipping_LastName").val().trim() + '&Email=' + $("#txtShipping_Email").val().trim() + '&Phone=' + $("#txtShipping_Phone_Number").val().trim() + '&flat=' + $("#txtShipping_FlatNo").val().trim() + '&street=' + $("#txtBuilding_address").val().trim() + '&landmark=' + $("#txtStreet_LandMark").val().trim() + '&CountryId=' + $("#txtShipping_country").val().trim() + '&AreaId=' + $("#txtShipping_area").val().trim(),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            ShippingAddressList();
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {

            $.afui.loadContent("#CheckoutAddressList", false, false, "fade");
        }

        function ajaxError(response) {}
    }
}

function NewAddressCountry() {
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Location.svc/Get',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {});

    function ajaxSucceess(response) {
        $.each(JSON.parse(response.d), function(key, value) {
            $('#txt_newAddNewAddressCountry').append("<option value ='" + value.Id + "'>" + value.Name + " </option>");
        });
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);
    }
}

function NewAddressArea() {
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Location.svc/GetAllArea?CountryId=' + $("#txt_newAddNewAddressCountry").val(),
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {});

    function ajaxSucceess(response) {
        $.each(JSON.parse(response.d), function(key, value) {
            $('#txtnew_AddNewAddressArea').append("<option value = '" + value.Id + "'>" + value.Name + " </option>");
        });
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);  
    }
}

function RegistrationCountry() {
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Location.svc/Get',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function () {
            $.afui.hideMask();
        });

    function ajaxSucceess(response) {
        $('#registration_country').empty();
        $('#registration_country').append("<option value ='0' selected='selected'>Country</option>");
        $.each(JSON.parse(response.d), function(key, value) {
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
        url: Base_Url+'Location.svc/GetAllArea?CountryId=' + $("#registration_country").val(),
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {}); 

    function ajaxSucceess(response) {
        $.each(JSON.parse(response.d), function(key, value) {
            $('#registration_area').append("<option value = '" + value.Id + "'>" + value.Name + " </option>");
        });
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);    
    }
}

function CheckOut() {
    HomePage();
    if (document.getElementById('toggle_today_summary_accept_Checkout').checked) {
        var PaymentMethod;
        if ($('#paymentmethod_0').is(':checked')) {
            PaymentMethod = $('#paymentmethod_0').val();
        }
        if ($('#paymentmethod_1').is(':checked')) {
            PaymentMethod = $('#paymentmethod_1').val();
        }
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Order.svc/CheckOut?Customerid=' +
                window.localStorage.getItem("LoginCustomerID") + '&ShippingAddressId=' +
                window.localStorage.getItem("ShippingAddressId") +
                '&PaymentMethod=' + PaymentMethod,
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {


            CartProducts();
            UpdateCartCount();
            $(".view.splitview.active").css("background", "#dcdcdc");
            $("#MainPage").css("background", "#dcdcdc");
            $.afui.loadContent("#ThankyouPage", false, false, "fade");
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {
                $("#OrderNumber").text(JSON.parse(response.d));
                $("#OrderLink").attr("onclick", "TrackOrderDetailsBilling(" + JSON.parse(response.d) + ")")
                $.afui.loadContent("#ThankyouPage", false, false, "fade");
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText);  
        }
    } else {
        alert('Accept terms and conditions');
    }
}

function LoadCountries_Inner1(IdVal1, SelectedCountry_Val1, SelectedArea_Val1) {
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Location.svc/Get',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        $("#Address_txtShipping_country").val(SelectedCountry_Val1.trim()).attr("selected", "selected");;
        LoadArea_Inner1('Address_txtShipping_area', SelectedCountry_Val1.trim(), SelectedArea_Val1.trim());
    });

    function ajaxSucceess(response) {
        $('#' + IdVal1).empty();
        $('#' + IdVal1).append("<option value = '0'>Country</option>");
        $.each(JSON.parse(response.d), function(key, value) {
            $('#' + IdVal1).append("<option value ='" + value.Id + "'>" + value.Name + " </option>");
        });
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);
    }
}

function LoadArea_Inner1(IdVal1, SelectedCountry_Val1, SelectedArea_Val1) {
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Location.svc/GetAllArea?CountryId=' + SelectedCountry_Val1,
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        $("#Address_txtShipping_area").val(SelectedArea_Val1.trim()).attr("selected", "selected");;
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {  
        $('#' + IdVal1).empty();
        $('#' + IdVal1).append("<option value = '0'>Location</option>");
        $.each(JSON.parse(response.d), function(key, value) {
            $('#' + IdVal1).append("<option value = '" + value.Id + "'>" + value.Name + " </option>");
        });
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText); 
    }
}
 
function LoadCountries_InnerCustomer(IdVal1, SelectedCountry_Val1, SelectedArea_Val1) {
    $.afui.showMask('Loading');
    $.ajax({ 
        type: "GET", 
        method: "GET",
        url: Base_Url+'Location.svc/Get',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        $("#CustomerInfo_country").val(SelectedCountry_Val1.trim()).attr("selected", "selected");;
        LoadArea_InnerCustomer('CustomerInfo_area', SelectedCountry_Val1.trim(), SelectedArea_Val1.trim());
    });  

    function ajaxSucceess(response) {
        $('#' + IdVal1).empty();
        $('#' + IdVal1).append("<option value = '0'>Country</option>");
        $.each(JSON.parse(response.d), function(key, value) {
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
        url: Base_Url+'Location.svc/GetAllArea?CountryId=' + SelectedCountry_Val1,
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        $("#CustomerInfo_area").val(SelectedArea_Val1.trim()).attr("selected", "selected");;
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        $('#' + IdVal1).empty();
        $('#' + IdVal1).append("<option value = '0'>Location</option>");
        $.each(JSON.parse(response.d), function(key, value) {
            $('#' + IdVal1).append("<option value = '" + value.Id + "'>" + value.Name + " </option>");
        });
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText); 
    }
}

function LoadHomePage() {
    window.localStorage.setItem('carttotalamount', 50);
    window.location = "index.html";
    UpdateWishlistCount();
    UpdateCartCount();
}

function Address_AddNewShippingAddressValidation() {
    var Address_txtnew_firstname = document.Address_AddShippingAddress.Address_txtnew_firstname;
    var Address_txtnew_lastname = document.Address_AddShippingAddress.Address_txtnew_lastname;
    var Address_txtnew_email = document.Address_AddShippingAddress.Address_txtnew_email;
    var Address_txtnew_phone = document.Address_AddShippingAddress.Address_txtnew_phone;
    var Address_txtnew_FlatNo = document.Address_AddShippingAddress.Address_txtnew_FlatNo;
    var Address_txtnew_streetaddress = document.Address_AddShippingAddress.Address_txtnew_streetaddress;
    var Address_txtnew_StreetLandMark = document.Address_AddShippingAddress.Address_txtnew_StreetLandMark;
    var Address_txt_newAddNewAddressCountry = document.Address_AddShippingAddress.Address_txt_newAddNewAddressCountry;
    var Address_txtnew_AddNewAddressArea = document.Address_AddShippingAddress.Address_txtnew_AddNewAddressArea;
    if (new_address_firstname_validation(Address_txtnew_firstname)) {
        if (new_address_lastname_validation(Address_txtnew_lastname)) {
            if (new_address_ValidateEmail(Address_txtnew_email)) {
                if (new_address_allnumeric(Address_txtnew_phone)) {
                    if (new_address_alphanumeric(Address_txtnew_FlatNo)) {
                        if (new_address_alphanumeric1(Address_txtnew_streetaddress)) {
                            if (new_address_alphanumeric2(Address_txtnew_StreetLandMark)) {
                                if (new_address_countryselect(Address_txt_newAddNewAddressCountry)) {
                                    if (new_address_areaselect_add(Address_txtnew_AddNewAddressArea)) {}
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return false;
}

function new_address_firstname_validation(Address_txtnew_firstname) {
    var firstname_len = document.forms["Address_AddShippingAddress"]["Address_txtnew_firstname"].value;
    if (firstname_len == "") {
        alert("First Name should not be empty");
        Address_txtnew_firstname.focus();
        return false;
    }
    return true;
}

function new_address_lastname_validation(Address_txtnew_lastname) {
    var lastname_len = document.forms["Address_AddShippingAddress"]["Address_txtnew_lastname"].value;
    if (lastname_len == "") {
        alert("Last Name should not be empty ");
        Address_lastname.focus();
        return false;
    }
    return true;
}

function new_address_ValidateEmail(Address_txtnew_email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (Address_txtnew_email.value.match(mailformat)) {
        return true;
    } else {
        alert("You have entered an invalid email address!");
        Address_txtnew_email.focus();
        return false;
    }
}

function new_address_allnumeric(Address_txtnew_phone) {
    var numbers = /^[0-9]+$/;
    if (Address_txtnew_phone.value.match(numbers)) {
        return true;
    } else {
        alert('Phone number  must have numeric characters only');
        Address_txtnew_phone.focus();
        return false;
    }
}

function new_address_alphanumeric(Address_txtnew_FlatNo) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (Address_txtnew_FlatNo.value.match(letters)) {
        return true;
    } else {
        alert('Flat No must not empty');
        Address_txtnew_FlatNo.focus();
        return false;
    }
}

function new_address_alphanumeric1(Address_txtnew_streetaddress) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (Address_txtnew_streetaddress.value.match(letters)) {
        return true;
    } else {
        alert('Street address must not empty');
        Address_txtnew_streetaddress.focus();
        return false;
    }
}

function new_address_alphanumeric2(Address_txtnew_StreetLandMark) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (Address_txtnew_StreetLandMark.value.match(letters)) {
        return true;
    } else {
        alert('Landmark must not be empty');
        Address_txtnew_StreetLandMark.focus();
        return false;
    }
}

function new_address_countryselect(Address_txt_newAddNewAddressCountry) {
    if (Address_txt_newAddNewAddressCountry.value == "0") {
        alert('Select your country from the list');
        Address_txt_newAddNewAddressCountry.focus();
        return false;
    } else {
        return true;
    }
}

function new_address_areaselect_add(Address_txtnew_AddNewAddressArea) {
    if (Address_txtnew_AddNewAddressArea.value == "0") {
        alert('Select your area from the list');
        Address_txtnew_AddNewAddressArea.focus();
        return false;
    } else {
        Address_AddNewShippingAddress();
        return true;
    }
}

function Address_AddNewShippingAddress() {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({

            type: "GET",
            method: "GET",
            url: Base_Url+'Address.svc/AddNewShippingAddress?CustomerId=' + window.localStorage.getItem("LoginCustomerID") + '&Firstname=' + $("#Address_txtnew_firstname").val().trim() + '&Lastname=' + $("#Address_txtnew_lastname").val().trim() + '&Email=' + $("#Address_txtnew_email").val().trim() + '&Phone=' + $("#Address_txtnew_phone").val().trim() + '&flat=' + $("#Address_txtnew_FlatNo").val().trim() + '&street=' + $("#Address_txtnew_streetaddress").val().trim() + '&landmark=' + $("#Address_txtnew_StreetLandMark").val().trim() + '&CountryId=' + $("#Address_txt_newAddNewAddressCountry").val().trim() + '&AreaId=' + $("#Address_txtnew_AddNewAddressArea").val().trim(),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
            Address_ShippingAddressList();
        });

        function ajaxSucceess(response) {
            if (JSON.parse(response.d).length != 0) {
                document.getElementById("Address_AddShippingAddress").reset();
                $.afui.loadContent("#Address_CheckoutAddressList", false, false, "fade");
            }
        };
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText); 
    }
}

function Address_DeleteShippingAddress(This_Val) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Address.svc/DeleteShippingAddressById?AddressId=' + $(This_Val).attr("Id"),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            Address_ShippingAddressList();
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {};
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText); 
    }
}

function Address_UpdateShippingAddressValidation() {
    var Address_txtShipping_FirstName = document.Address_editaddress.Address_txtShipping_FirstName;
    var Address_txtShipping_LastName = document.Address_editaddress.Address_txtShipping_LastName;
    var Address_txtShipping_Email = document.Address_editaddress.Address_txtShipping_Email;
    var Address_txtShipping_Phone_Number = document.Address_editaddress.Address_txtShipping_Phone_Number;
    var Address_txtShipping_FlatNo = document.Address_editaddress.Address_txtShipping_FlatNo;
    var Address_txtBuilding_address = document.Address_editaddress.Address_txtBuilding_address;
    var Address_txtStreet_LandMark = document.Address_editaddress.Address_txtStreet_LandMark;
    var Address_txtShipping_country = document.Address_editaddress.Address_txtShipping_country;
    var Address_txtShipping_area = document.Address_editaddress.Address_txtShipping_area;
    if (address_update_firstname_validation(Address_txtShipping_FirstName)) {
        if (address_update_lastname_validation(Address_txtShipping_LastName)) {
            if (address_update_ValidateEmail(Address_txtShipping_Email)) {
                if (address_update_allnumeric(Address_txtShipping_Phone_Number)) {
                    if (address_update_alphanumeric(Address_txtShipping_FlatNo)) {
                        if (address_update_alphanumeric1(Address_txtBuilding_address)) {
                            if (address_update_alphanumeric2(Address_txtStreet_LandMark)) {
                                if (address_update_countryselect(Address_txtShipping_country)) {
                                    if (address_update_areaselect_update(Address_txtShipping_area)) {}
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return false;
}

function address_update_firstname_validation(Address_txtShipping_FirstName) {
    var firstname_len = document.forms["Address_editaddress"]["Address_txtShipping_FirstName"].value;
    if (firstname_len == "") {
        alert("First Name should not be empty");
        Address_txtShipping_FirstName.focus();
        return false;
    }
    return true;
}

function address_update_lastname_validation(Address_txtShipping_LastName) {
    var lastname_len = document.forms["Address_editaddress"]["Address_txtShipping_LastName"].value;
    if (lastname_len == "") {
        alert("Last Name should not be empty");
        Address_txtShipping_LastName.focus();
        return false;
    }
    return true;
}

function address_update_ValidateEmail(Address_txtShipping_Email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (Address_txtShipping_Email.value.match(mailformat)) {
        return true;
    } else {
        alert("You have entered an invalid email address!");
        Address_txtShipping_Email.focus();
        return false;
    }
}

function address_update_allnumeric(Address_txtShipping_Phone_Number) {
    var numbers = /^[0-9]+$/;
    if (Address_txtShipping_Phone_Number.value.match(numbers)) {
        return true;
    } else {
        alert('Phone number  must have numeric characters only');
        Address_txtShipping_Phone_Number.focus();
        return false;
    }
}

function address_update_alphanumeric(Address_txtShipping_FlatNo) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (Address_txtShipping_FlatNo.value.match(letters)) {
        return true;
    } else {
        alert('Flat No must not empty');
        Address_txtShipping_FlatNo.focus();
        return false;
    }
}

function address_update_alphanumeric1(Address_txtBuilding_address) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (Address_txtBuilding_address.value.match(letters)) {
        return true;
    } else {
        alert('Street address must not empty');
        Address_txtBuilding_address.focus();
        return false;
    }
}

function address_update_alphanumeric2(Address_txtStreet_LandMark) {
    var letters = /^[0-9a-zA-Z]+$/;
    if (Address_txtStreet_LandMark.value.match(letters)) {
        return true;
    } else {
        alert('Landmark must not be empty');
        Address_txtStreet_LandMark.focus();
        return false;
    }
}

function address_update_countryselect(Address_txtShipping_country) {
    if (Address_txtShipping_country.value == "0") {
        alert('Select your country from the list');
        Address_txtShipping_country.focus();
        return false;
    } else {
        return true;
    }
}

function address_update_areaselect_update(Address_txtShipping_area) {
    if (Address_txtShipping_area.value == "0") {
        alert('Select your area from the list');
        Address_txtShipping_area.focus();
        return false;
    } else {
        Address_UpdateShippingAddress();
        return true;
    }
}

function Address_EditShippingAddress(This_Val) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        window.localStorage.setItem("AddressId", $(This_Val).attr("Id"));
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Address.svc/GetShippingAddressById?AddressId=' + $(This_Val).attr("Id"),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {
                var output = $.parseXML(value.CustomAttributes);
                $('AddressAttribute', output).each(function(i, e) {
                    if ($(e).attr('ID') == "1")
                        $("#Address_txtShipping_FlatNo").val($(e).find("AddressAttributeValue").find("Value").text());
                    if ($(e).attr('ID') == "2")
                        $("#Address_txtBuildingaddress").val($(e).find("AddressAttributeValue").find("Value").text());
                    if ($(e).attr('ID') == "3")
                        $("#Address_txtStreetLandMark").val($(e).find("AddressAttributeValue").find("Value").text());
                });
                LoadCountries_Inner1('Address_txtShipping_country', value.CountryId.toString().trim(), value.StateProvinceId.toString().trim());
                $("#Address_txtShipping_FirstName").val(value.FirstName);
                $("#Address_txtShipping_LastName").val(value.LastName);
                $("#Address_txtShipping_Email").val(value.Email);
                $("#Address_txtShipping_Phone_Number").val(value.Phone_Number);
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function Address_UpdateShippingAddress() {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Address.svc/UpdateAddressInfomtion?AddresId=' + window.localStorage.getItem("AddressId") + '&Firstname=' + $("#Address_txtShipping_FirstName").val().trim() + '&Lastname=' + $("#Address_txtShipping_LastName").val().trim() + '&Email=' + $("#Address_txtShipping_Email").val().trim() + '&Phone=' + $("#Address_txtShipping_Phone_Number").val().trim() + '&flat=' + $("#Address_txtShipping_FlatNo").val().trim() + '&street=' + $("#Address_txtBuilding_address").val().trim() + '&landmark=' + $("#Address_txtStreet_LandMark").val().trim() + '&CountryId=' + $("#Address_txtShipping_country").val().trim() + '&AreaId=' + $("#Address_txtShipping_area").val().trim(),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            Address_ShippingAddressList();
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {

            $.afui.loadContent("#Address_CheckoutAddressList", false, false, "fade");
        }

        function ajaxError(response) {}
    }
}

function Address_ShippingAddressList() {
    $.afui.clearHistory();
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Address.svc/CustomerShippingAddress?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $('#Address_Shippingdetails_addlist').empty();
            $.each(JSON.parse(response.d), function(key, value) {
                $('#Address_Shippingdetails_addlist').append(Address_ShippingAddressListHtml(value.Id, value.FirstName, value.Email, value.Phone_Number, value.Area, value.Country));
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function Address_ShippingAddressListHtml(AddressId, FirstName, Email, Phone_Number, Area, Country) {
    var Html;
    Html = "<div class='shippingtitle'>" +
        "<strong>" + FirstName + "</strong>" +
        " <a href='#'  class='shippingaddresslist' id='" + AddressId + "' onclick='Address_DeleteShippingAddress(this)'><i class='fa fa-trash-o' aria-hidden='true'></i></a>" +
        "<a href='#Address_EditAddress'  id='" + AddressId + "' onclick='Address_EditShippingAddress(this)' class='shippingaddresslist'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>" +
        "</div>" +
        " <div class='ShippingAddress'>" +
        " <span>" + Email + "</span>" +
        "<span>" + Phone_Number + "</span>" +
        "<span>" + Area + "</span>" +
        "<span>" + Country + "</span>" +
        "</div>";
    return Html;
}

function Address_NewAddressCountry() {
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Location.svc/Get',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {});

    function ajaxSucceess(response) {
        $.each(JSON.parse(response.d), function(key, value) {
            $('#Address_txt_newAddNewAddressCountry').append("<option value ='" + value.Id + "'>" + value.Name + " </option>");
        });
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);
    }
}

function Address_NewAddressArea() {
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Location.svc/GetAllArea?CountryId=' + $("#Address_txt_newAddNewAddressCountry").val(),
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {});

    function ajaxSucceess(response) {
        $.each(JSON.parse(response.d), function(key, value) {
            $('#Address_txtnew_AddNewAddressArea').append("<option value = '" + value.Id + "'>" + value.Name + " </option>");
        });
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);  
    }
}

function ProfileLoad() {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Customer.svc/CustomerInfo?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {
                $("#ProfileName").html(value.FirstName + ' ' + value.LastName);
                $("#ProfileEmail").text(value.Email);
                $("#ProfileEdit").css("visibility", "visible");
                if (value.Picture != '0') {
                    $(".avathar").css("background-image", "url('" + value.Picture + "')");
                } else {
                    $(".avathar").css("background-image", "url('img/User.png')");
                }
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    } else {
        $("#ProfileName").html('');
        $("#ProfileEmail").text('');
        $(".avathar").css("background-image", "url('img/User.png')");
        $("#ProfileEdit").css("visibility", "hidden");
    }
}

function CustomerInformation() {
    $.afui.clearHistory();
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Customer.svc/CustomerInfo?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        $.each(JSON.parse(response.d), function(key, value) {
            LoadCountries_InnerCustomer('CustomerInfo_country', value.CountryId.toString().trim(), value.StateProvinceId.toString().trim());
            $("#CustomerInfo_firstname").val(value.FirstName);
            $("#CustomerInfo_lastname").val(value.LastName);
            $("#CustomerInfo_email").val(value.Email);
            $("#CustomerInfo_phone").val(value.Phone);
            $("#CustomerInfo_address").val(value.StreetAddress);
        });
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
//    var CustomerInfo_country = $("#CustomerInfo_country").val();
//    var CustomerInfo_area = $("#CustomerInfo_area").val();

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
    }
    else  {
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
            url: Base_Url+'Customer.svc/CustomerInfoUpdate?CustomerId=' + window.localStorage.getItem("LoginCustomerID") + '&FirstName=' + $("#CustomerInfo_firstname").val() + '&LastName=' + $("#CustomerInfo_lastname").val() +
                '&StreetAddress=' + $("#CustomerInfo_address").val() + '&CountryId=' + $("#CustomerInfo_country").val() + '&StateProvinceId=' + $("#CustomerInfo_area").val() + '&Phone=' + $("#CustomerInfo_phone").val(),
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
            ProfileLoad();
        });

        function ajaxSucceess(response) {
            alert('Customer Info SuccessFully Updated');
        }

        function ajaxError(response) {}
    }
}

function GetAllCategoryProducts_Quantity(CategoryId) {  
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Category.svc/GetAllCategoryProducts_Quantity?CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&CategoryId=' + CategoryId,
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {
                if (value.ShoppingCartTypeId == 1) {
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_Promotion").html(value.Quantity);
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_Promotion").css("display", "block");
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_Category").html(value.Quantity);
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_Category").css("display", "block");
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_Recent").html(value.Quantity);
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_Recent").css("display", "block");
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_BestSellingProducts_Desc").html(value.Quantity);
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_BestSellingProducts_Desc").css("display", "block");
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_BestSellingProducts").html(value.Quantity);
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_BestSellingProducts").css("display", "block");
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_LowPrice").html(value.Quantity);
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_LowPrice").css("display", "block");
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_HighPrice").html(value.Quantity);
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_HighPrice").css("display", "block");
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_OfferPrice").html(value.Quantity);
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_OfferPrice").css("display", "block");
                } else {
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_Promotion i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_Promotion").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_" + CategoryId + "_Promotion')");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_Category i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_Category").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_" + CategoryId + "_Category')");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_Recent i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_Recent").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_" + CategoryId + "_Recent')");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_BestSellingProducts i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_BestSellingProducts").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_" + CategoryId + "_BestSellingProducts')");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_LowPrice i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_LowPrice").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_" + CategoryId + "_LowPrice')");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_HighPrice i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_HighPrice").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_" + CategoryId + "_HighPrice')");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_OfferPrice i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_OfferPrice").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_" + CategoryId + "_OfferPrice')");
                }
            });
        }
  
        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    } else {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Category.svc/GetAllCategoryProducts_Quantity?CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&CategoryId=' + CategoryId,
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {
                if (value.ShoppingCartTypeId == 1) {
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_Promotion").html(value.Quantity);
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_Promotion").css("display", "block");
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_Category").html(value.Quantity);
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_Category").css("display", "block");
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_Recent").html(value.Quantity);
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_Recent").css("display", "block");
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_BestSellingProducts_Desc").html(value.Quantity);
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_BestSellingProducts_Desc").css("display", "block");
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_ElementId").html(value.Quantity);
                    $("#Cart_L_" + value.ProductId + "_" + CategoryId + "_ElementId").css("display", "block");
                } else {
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_Promotion i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_Promotion").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_" + CategoryId + "_Promotion')");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_Category i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_Category").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_" + CategoryId + "_Category')");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_BestSellingProducts i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_BestSellingProducts").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_" + CategoryId + "_BestSellingProducts')");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_LowPrice i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_LowPrice").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_" + CategoryId + "_LowPrice')");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_HighPrice i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_HighPrice").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_" + CategoryId + "_HighPrice')");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_OfferPrice i").attr("class", "fa fa-heart");
                    $("#Wish_L_" + value.ProductId + "_" + CategoryId + "_OfferPrice").attr("onclick", "DeleteProductFromWishList_List(" + value.ProductId + ",'Wish_L_" + value.ProductId + "_" + CategoryId + "_OfferPrice')");
                }
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function GetProductDetails_Quantity(ThisVal) {
    $.afui.clearHistory();
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {});
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }

    } else {
        $.afui.showMask('Loading');
        $.ajax({

            type: "GET",
            method: "GET",
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $.each(JSON.parse(response.d), function(key, value) {});
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function LoadCategoriesNames() {
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Category.svc/Get',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        $('#popular').empty();
        $.each(JSON.parse(response.d), function(key, value) {
            var Cat_Id = "Category_" + value.Id;
            var Cat_Page = "#CategoryPage_" + value.Id;
            $('#popular').append('<li><a  Id="' + Cat_Id + '" class="MenuActive"  href="' + Cat_Page + '" onclick=" CategoryProducts(' + value.Id + ');" data-transition="fade"><img  src="' + value.Picture + '"/><br>' + value.Name + '</a></li>');
        });
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);
    }
}

function SearchProductsList() {
    $.afui.showMask('Loading');
    $.ajax({
        type: "GET",
        method: "GET",
        url: Base_Url+'Product.svc/SearchProductsList',
        success: ajaxSucceess,
        error: ajaxError
    }).done(function() {
        $.afui.hideMask();
    });

    function ajaxSucceess(response) {
        $('#searchproductslist').empty();
        $.each(JSON.parse(response.d), function(key, value) {
            $('#searchproductslist').append("<option Id='Search_" + value.Id + "' value='" + value.Name + "'></option>");
        });
    }

    function ajaxError(response) {
        //         alert(errormsg.responseText);
    }
}

function SelectSearchProduct() {
    var val = document.getElementById("search").value;
    var opts = document.getElementById('searchproductslist').childNodes;
    for (var i = 0; i < opts.length; i++) {
        if (opts[i].value === val) {
            ProductDescription_Search(opts[i].id.split('_')[1]);
            break;
        }
    }
}
$(document).keypress(function(e) {
    if ($.afui.getTitle() == 'Search') {

        if (e.which == 13) {
            SearchProducts();
        }
    }
});

function DeleteProductFromWishList_List(Id, ControlId) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Wishlist.svc/DeleteProductFromWishlist?CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&ProductId=' + Id,
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $("#" + ControlId + " i").attr("class", "fa fa-heart-o");
            $("#" + ControlId).attr("onclick", "AddToWishList(this);");
            $("#" + ControlId).attr("data-message", "Added to WishList");
            UpdateWishlistCount();
            WishListProducts();
        });

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(errormsg.responseText);
        }
    } else {
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Wishlist.svc/DeleteProductFromWishlist?CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&ProductId=' + Id,
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $("#" + ControlId + " i").attr("class", "fa fa-heart-o");
            $("#" + ControlId).attr("onclick", "AddToWishList(this);");
            $("#" + ControlId).attr("data-message", "Added to WishList");
            UpdateWishlistCount();
            WishListProducts();

        });

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(errormsg.responseText);
        }
    }
}

function DeleteProductFromWishList_List_Desc(Id, ControlId) {
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Wishlist.svc/DeleteProductFromWishlist?CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&ProductId=' + Id,
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $("#" + ControlId + " i").attr("class", "fa fa-heart-o");
            $("#" + ControlId).attr("onclick", "AddToWishListDesc(this);");
            $("#" + ControlId).attr("data-message", "Added to WishList");
            UpdateWishlistCount();
            WishListProducts();
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(errormsg.responseText);
        }
    } else {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Wishlist.svc/DeleteProductFromWishlist?CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&ProductId=' + Id,
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $("#" + ControlId + " i").attr("class", "fa fa-heart-o");
            $("#" + ControlId).attr("onclick", "AddToWishListDesc(this);");
            $("#" + ControlId).attr("data-message", "Added to WishList");
            UpdateWishlistCount();
            WishListProducts();
            $.afui.hideMask();

        });

        function ajaxSucceess(response) {}

        function ajaxError(response) {
            //         alert(errormsg.responseText);
        }
    }
}

function TrackOrderDetailsBilling_FromThankyou(Id) {
    $.afui.clearHistory();
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        $.afui.showMask('Loading');
        $.ajax({
            type: "GET",
            method: "GET",
            url: Base_Url+'Order.svc/GetOrderBillingAddress?OrderId=' + Id,
            success: ajaxSucceess,
            error: ajaxError
        }).done(function() {
            $.afui.hideMask();
        });

        function ajaxSucceess(response) {
            $('#TrackOrderDetailInformationBilling').empty();
            $.each(JSON.parse(response.d), function(key, value) {
                $('#TrackOrderDetailInformationBilling').append(TrackOrderDetailHtmlBilling(value.Name, value.Email, value.Phone, value.State, value.Country));
                TrackOrderDetailsShipping(Id);
            });
        }

        function ajaxError(response) {
            //         alert(errormsg.responseText); 
        }
    }
}

function CustomBack(Title) {
    if (Title == 'Track Order Details') {
        $.afui.clearHistory();
        $.afui.loadContent("#TrackOrder", false, false, "fade");
        TrackOrder();
    }
}

function TermsAndConditions() {
    $.afui.popup({
        title: "Terms and Conditions",
        message: $("#div_Terms").html(),
        cancelText: "Cancel",
        cancelCallback: function() { 
            CancelPopUp_Terms();
        },
        doneText: "Accept",
        doneCallback: function() {
            DonePopUp_Terms();
        },
        cancelOnly: false
    });

}