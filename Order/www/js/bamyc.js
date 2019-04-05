var ipAddress;

function setLogoutCookies(){ 
       
     $.ajax({
   
         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/Customer.svc/AddLogOutUser?IpAddress='+ipAddress,
         success: ajaxSucceess,
         error: ajaxError 
     }).done(function() {
     }); 
 
     function ajaxSucceess(response) {

                 
         window.localStorage.setItem("LogOutCustomerId", JSON.parse(response.d));
     }

     function ajaxError(response) {
         //         alert(errormsg.responseText);
     }
}  

function LoadLocationPage() {
 
  if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) 
      {   setTimeout(function() {
          window.location="home.html";
            }, 1000); 
       }    
    else{
     setTimeout(function() {   
          window.location = "login.html"; 
     }, 1000);   
 }   
} 
 function AddNewAddress() {
     $.afui.loadContent("#CheckoutAddressList", false, false, "fade");
 }

// function EditAddress() {
//     $.afui.loadContent("#CheckoutAddressList", false, false, "fade");
// }
 
 function LoadCountries(IdVal) {
     
  
         $.ajax({ 

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/Location.svc/Get',
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
       
     });

     function ajaxSucceess(response) {
 
     $.each(JSON.parse(response.d), function(key, value) {


                 $('#'+IdVal).append("<option value = '" + value.Id + " '>" + value.Name + " </option>");



             });

     }

     function ajaxError(response) {
         //         alert(errormsg.responseText);
     }
 }

 function LoadArea(IdVal,IdVal_Country) {
  
     
       
  
         $.ajax({

         type: "GET",
         method: "GET",
            url: 'http://restapi.bamyc.com/Location.svc/GetAllArea?CountryId=' + $("#"+IdVal_Country).val(),
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
         
     });

     function ajaxSucceess(response) {
   $.each(JSON.parse(response.d), function(key, value) {


                 $('#'+IdVal).append("<option value = '" + value.Id + " '>" + value.Name + " </option>");


             });

     }

     function ajaxError(response) {
         //         alert(errormsg.responseText);
     }
 } 
 

 function LoadCountries_Inner(IdVal,SelectedCountry_Val,SelectedArea_Val) {
      $.afui.showMask('Loading');
  
         $.ajax({ 

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/Location.svc/Get',
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
             
                $("#txtShipping_country").val(SelectedCountry_Val.trim()).attr("selected", "selected");;  
         LoadArea_Inner('txtShipping_area',SelectedCountry_Val.trim(),SelectedArea_Val.trim());
     });

     function ajaxSucceess(response) {
 $('#'+IdVal).empty();
         $('#'+IdVal).append("<option value = '0'>Country</option>");
     $.each(JSON.parse(response.d), function(key, value) {


                 $('#'+IdVal).append("<option value ='"+value.Id+"'>" + value.Name + " </option>");



             });

     }

     function ajaxError(response) {
         //         alert(errormsg.responseText);
     }
 }

 function LoadArea_Inner(IdVal,SelectedCountry_Val,SelectedArea_Val) {
  
   
  
         $.ajax({

         type: "GET",
         method: "GET",
            url: 'http://restapi.bamyc.com/Location.svc/GetAllArea?CountryId=' + SelectedCountry_Val,
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
              $("#txtShipping_area").val(SelectedArea_Val.trim()).attr("selected", "selected");; 
         $.afui.hideMask();
     });

     function ajaxSucceess(response) {
         $('#'+IdVal).empty();
         $('#'+IdVal).append("<option value = '0'>Location</option>");
   $.each(JSON.parse(response.d), function(key, value) {


                 $('#'+IdVal).append("<option value = '" + value.Id+ "'>" + value.Name + " </option>");


             });

     }

     function ajaxError(response) {
         //         alert(errormsg.responseText);
     }
 } 
 
 function LoadHomePage() {
     window.localStorage.setItem('carttotalamount', 50);
     window.location = "home.html"

 }
 


 
 function LoadCategories() {
     $.afui.showMask('Loading');
     $.ajax({

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/Category.svc/Get',
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
             $('#CategoryList').append('<li><a  Id="' + Cat_Id + '" class="MenuActive"  href="' + Cat_Page + '" onclick=" CategoryProducts(' + value.Id + ');" data-transition="fade">' + '<i class="fa fa-bullhorn" aria-hidden="true"></i>'+value.Name + '</a></li>');
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
     if($("#search").val().trim()!='')
     {
     $.ajax({

         type: "GET",
         method: "GET",
         //         url: 'http://restapi.bamyc.com/Product.svc/AllSearchedProduct?ProductName=coc&PageSize=1&PageNumber=1',

         url: 'http://restapi.bamyc.com/Product.svc/AllSearchedProduct?ProductName=' + $("#search").val().trim() + '&PageSize=1&PageNumber=1',
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
         $.afui.hideMask();
     });

  
          function ajaxSucceess(response) {
             $('#SearchProducts').empty();
             if (JSON.parse(response.d).length == 0) {
                 $('#EmptySearch').css('display','block');  
             }else{
                 $('#EmptySearch').css('display','none');
             }
            $.each(JSON.parse(response.d), function(key, value) {
            $('#SearchProducts').append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage));
             });
           }

         
     /*  function ajaxSucceess(response) {     

         $('#SearchProducts').empty();
         $.each(JSON.parse(response.d), function(key, value) {
             $('#SearchProducts').append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage));

         });  

     }*/

     function ajaxError(response) {
         alert(errormsg.responseText);
     }
     }
     else{
         alert('enter a valid search text');
            $.afui.hideMask();
     }
 }

 function CategoryProducts(CategoryId) {
     $.afui.clearHistory();
     $("#Category_" + CategoryId).attr("class", "MenuActive");
     $.afui.showMask('Loading');
     $.ajax({

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/Product.svc/GetAllCategoryProducts?CategoryId=' + CategoryId + '&PageSize=20&PageNumber=1',
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
           GetAllCategoryProducts_Quantity(CategoryId);
         $.afui.hideMask();
     });

     function ajaxSucceess(response) {
         $('#CategoryProductList_'+CategoryId).empty();
         $('#Promotions').empty();
         $.each(JSON.parse(response.d), function(key, value) {
             $('#CategoryProductList_' + CategoryId).append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage,CategoryId,'Category'));
    $('#Promotions').append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage,CategoryId,'Promotion'));
         })

     }

     function ajaxError(response) {
         // alert(errormsg.responseText);  
     }

 }

  function RecentlyViewedProducts() {
     $.afui.clearHistory();
    
      if (window.localStorage.getItem('RecentlyViewed') != 'null' && window.localStorage.getItem('RecentlyViewed') != null) {
           $("#EmptyRecent").css("display","none");
     $.afui.showMask('Loading');
     $.ajax({

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/Product.svc/GetProductById?ProductIds='+window.localStorage.getItem('RecentlyViewed'),

         success: ajaxSucceess,  
         error: ajaxError 
     }).done(function() {
         $.afui.hideMask();
     });

     function ajaxSucceess(response) {
 $('#RecentlyViewedProduct').empty();
         $.each(JSON.parse(response.d), function(key, value) {
             $('#RecentlyViewedProduct').append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage,0,''));
         });

     }

     function ajaxError(response) {
         //         alert(errormsg.responseText);
     }
      }
     else{
          $('#RecentlyViewedProduct').empty();
         $("#EmptyRecent").css("display","block");
     }

 }

function WishListProducts() {
     $.afui.clearHistory();
     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null)
     { 
//         $.afui.showMask('Loading');
         $.ajax({

             type: "GET",
             method: "GET",
             //       url: 'http://restapi.bamyc.com/Product.svc/GetAllCategoryProducts?CategoryId=31',


             url: 'http://restapi.bamyc.com/Wishlist.svc/GetAllWishlistItems?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),  
             success: ajaxSucceess,
             error: ajaxError
         }).done(function() { 
               UpdateWishlistCount();
//             $.afui.hideMask(); 
         }); 

         function ajaxSucceess(response) {
             $('#WishListProduct').empty();
             if (JSON.parse(response.d).length == 0) {
                 $('#EmptyWishList').css('display','block');
             }else{
                 $('#EmptyWishList').css('display','none');
             }
             $.each(JSON.parse(response.d), function(key, value) {
                 $('#WishListProduct').append(ProductHtmlCart(value.ProductId, value.Image, value.OfferPercentage, value.Name, value.OldPrice, value.Price, "WishList",value.Quantity,value.ShoppingCartId));
             });

         }

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }
     
     else 
       { 
//           $.afui.showMask('Loading');
         $.ajax({
 
             type: "GET",
             method: "GET",
             //       url: 'http://restapi.bamyc.com/Product.svc/GetAllCategoryProducts?CategoryId=31',


           url: 'http://restapi.bamyc.com/Wishlist.svc/GetAllWishlistItems?CustomerId=' + window.localStorage.getItem('LogOutCustomerId'),
             success: ajaxSucceess,
             error: ajaxError
         }).done(function() { 
//             $.afui.hideMask();
         }); 

         function ajaxSucceess(response) { 
        
             $('#WishListProduct').empty();
             if (JSON.parse(response.d).length == 0) {
                 $('#EmptyWishList').css('display','block');
             }
             else{
                 $('#EmptyWishList').css('display','none');
             }
             $.each(JSON.parse(response.d), function(key, value) {
                 $('#WishListProduct').append(ProductHtmlCart(value.ProductId, value.Image, value.OfferPercentage, value.Name, value.OldPrice, value.Price, "WishList",value.Quantity,value.ShoppingCartId));
             });
   
         }

         function ajaxError(response) {
             //         alert(errormsg.responseText);
         }
          
         
     }
      
 }  
 function HomePage() {
     $.afui.clearHistory();
 }

 function CartProducts() {
    
     $.afui.clearHistory();
//alert(window.localStorage.getItem('LoginCustomerID'));
     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
        
         $.ajax({

             type: "GET",
             method: "GET",
             url: 'http://restapi.bamyc.com/ShoppingCart.svc/GetAllCartedItems?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
             success: ajaxSucceess, 
             error: ajaxError
         }).done(function() {
             //         $.afui.hideMask();
                UpdateCartCount(); 
             CartAmountTotal();
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
             
                  $('#CartProducts').append(ProductHtmlCart(value.ProductId, value.Image, value.OfferPercentage, value.Name, value.OldPrice, value.Price, "Cart",value.Quantity,0,''));
             });
         }
 

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }

     } 
     else {
       
       // $.afui.showMask('Loading');
         $.ajax({

             type: "GET",
             method: "GET",
             url: 'http://restapi.bamyc.com/ShoppingCart.svc/GetAllCartedItems?CustomerId='+window.localStorage.getItem('LogOutCustomerId'), //+ //window.localStorage.getItem('LoginCustomerID'),
             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
             //         $.afui.hideMask(); 
             CartAmountTotal();
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
                 
                 $('#CartProducts').append(ProductHtmlCart(value.ProductId, value.Image, value.OfferPercentage, value.Name, value.OldPrice, value.Price, "Cart",value.Quantity,0,''));
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
             url: ' http://restapi.bamyc.com/ShoppingCart.svc/CartAmountTotal?CustomerId=' + window.localStorage.getItem('LoginCustomerID'), 

             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
             $.afui.hideMask(); 
         });

         function ajaxSucceess(response) {    


             $.each(JSON.parse(response.d), function(key, value) {
                 $('#SubTotal').text(value.SubTotal + " AED");
                 $('#ShippingCharge').text(value.Shippingcost + " AED");
                 $('#GrandTotal').text(value.GrandTotal + " AED");
                  $('#TotalAmount').text(value.GrandTotal + " AED");
             }); 

         }

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }
      
     else{ 
         $.afui.showMask('Loading');
         $.ajax({

             type: "GET",
             method: "GET",
             url: ' http://restapi.bamyc.com/ShoppingCart.svc/CartAmountTotal?CustomerId=' + window.localStorage.getItem('LogOutCustomerId'),

             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
             $.afui.hideMask(); 
         });

         function ajaxSucceess(response) {
 

             $.each(JSON.parse(response.d), function(key, value) {
                
 
                 $('#SubTotal').text(value.SubTotal + " AED");
                 $('#ShippingCharge').text(value.Shippingcost + " AED");
                 $('#GrandTotal').text(value.GrandTotal + " AED");
                   $('#TotalAmount').text(value.GrandTotal + " AED");
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
         url: 'http://restapi.bamyc.com/ShoppingCart.svc/DeleteProductFromCart?CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&ProductId=' + $(This_val).attr("Id"),
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
         UpdateCartCount();
         CartProducts();
         
     });

     function ajaxSucceess(response) {



     }

     function ajaxError(response) {
         //         alert(errormsg.responseText);
     }
     //         }
      }
     else
         {
              $.afui.showMask('Loading');
     $.ajax({

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/ShoppingCart.svc/DeleteProductFromCart?CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&ProductId=' + $(This_val).attr("Id"),
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {

         UpdateCartCount();
         CartProducts();
         $.afui.hideMask();
     });

     function ajaxSucceess(response) {



     }
 
     function ajaxError(response) {
         //         alert(errormsg.responseText);
     }
         }
 }
 function DeleteProductFromWishList(This_val) 
  {
      
    if(window.localStorage.getItem('LoginCustomerID')!='null' && window.localStorage.getItem('LoginCustomerID')!=null)
     {
     $.afui.showMask('Loading');
     $.ajax({
            
         type: "GET",
         method: "GET",  
        url: 'http://restapi.bamyc.com/Wishlist.svc/DeleteProductFromWishlist?CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&ProductId=' + $(This_val).attr("Id"),
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
     
         UpdateWishlistCount();
         WishListProducts();
         $.afui.hideMask();

     });

     function ajaxSucceess(response) {



     }

     function ajaxError(response) {
         //         alert(errormsg.responseText);
     }
     }
     else
         {
              $.afui.showMask('Loading');
     $.ajax({

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/Wishlist.svc/DeleteProductFromWishlist?CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&ProductId=' + $(This_val).attr("Id"),
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
         UpdateWishlistCount();
         WishListProducts();
         $.afui.hideMask();

     });

     function ajaxSucceess(response) {



     }

     function ajaxError(response) {
         //         alert(errormsg.responseText);
     } 
             
             
         }
 }


function ProductHtml(ProductId, Name, Image, OldPrice, Price, OfferPercentage, CategoryId,Page) {
     var HTML;
   
 var WishListProductId="Wish_L_"+ProductId+"_"+CategoryId+"_"+Page;
      var CartProductId="Cart_L_"+ProductId+"_"+CategoryId+"_"+Page;
         HTML = "<li>" +
             "<div class='productwrapper_list'>" +
            // "<div class='wishlisticon Product'><a href='#' class='active'>"+
            //    "<i class='fa fa-heart-o' aria-hidden='true'></i></a></div>"+
             "<div class='productoffer'>" + OfferPercentage + "%</div>" +
             "<div class='wishlisticon productlist'><a href='#' data-toast='' data-message='Added to WishList' data-position='bc' id='"+WishListProductId+"' onclick='AddToWishList(this);' class='active'><i class='fa fa-heart-o' aria-hidden='true'></i></a></div>"+
             
                       "<div class='prodectimagesection'><a  data-productid='" + ProductId + "' onclick='ProductDescription(this)'  href='#'><img src=" + Image + "><div id='"+CartProductId+"' class='QuantityCount'></div></a></div>" +  
             "<div class='productname'  data-productid='" + ProductId + "' onclick='ProductDescription(this)' >" + Name + "</div>" +
             "<div class='productprice productoldprice'><span class='old'>" + OldPrice + " AED</span> <span>" + Price + " AED</span></div>" +
             "<div class='productaddtocart' id='productaddtocart'><a  data-toast  data-message='Added to cart' data-position='bc' onclick='AddToCart(this)' data-productid='" + ProductId + "'>Add to Cart</a></div>" +
             "</div>" +
             "</li>";
     
 
     return HTML;
 }
 function ProductHtml(ProductId, Name, Image, OldPrice, Price, OfferPercentage, CategoryId,Page) {
     var HTML;
   
 var WishListProductId="Wish_L_"+ProductId+"_"+CategoryId+"_"+Page;
      var CartProductId="Cart_L_"+ProductId+"_"+CategoryId+"_"+Page;
         HTML = "<li>" +
             "<div class='productwrapper_list'>" +
            // "<div class='wishlisticon Product'><a href='#' class='active'>"+
            //    "<i class='fa fa-heart-o' aria-hidden='true'></i></a></div>"+
             "<div class='productoffer'>" + OfferPercentage + "%</div>" +
             "<div class='wishlisticon productlist'><a href='#' data-toast='' data-message='Added to WishList' data-position='bc' id='"+WishListProductId+"' onclick='AddToWishList(this);' class='active'><i class='fa fa-heart-o' aria-hidden='true'></i></a></div>"+
             
                       "<div class='prodectimagesection'><a  data-productid='" + ProductId + "' onclick='ProductDescription(this)'  href='#'><img src=" + Image + "><div id='"+CartProductId+"' class='QuantityCount'></div></a></div>" +  
             "<div class='productname'  data-productid='" + ProductId + "' onclick='ProductDescription(this)' >" + Name + "</div>" +
             "<div class='productprice productoldprice'><span class='old'>" + OldPrice + " AED</span> <span>" + Price + " AED</span></div>" +
             "<div class='productaddtocart' id='productaddtocart'><a  data-toast  data-message='Added to cart' data-position='bc' onclick='AddToCart(this)' data-productid='" + ProductId + "'>Add to Cart</a></div>" +
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
         url: 'http:////restapi.bamyc.com/ShoppingCart.svc/CartItemUpdate?CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&ProductId=' + ProductId + '&Type=1',

         //         '+$(This_val).attr("Id"),    
         //         '+window.localStorage.getItem('Id'), 

         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
         CartAmountTotal();
         //         $.afui.hideMask();   
     });
    
     function ajaxSucceess(response) {

         $.each(JSON.parse(response.d), function(key, value) {


         })
     }

     function ajaxError(response) {
         //         alert(errormsg.responseText);  
     }
 }
     else 
        {
     $("#Quantity_" + ProductId).val(Number($("#Quantity_" + ProductId).val()) + 1);
     $.afui.showMask('Loading');
     $.ajax({

         type: "GET",
         method: "GET",
         url: 'http:////restapi.bamyc.com/ShoppingCart.svc/CartItemUpdate?CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&ProductId=' + ProductId + '&Type=1',

         //         '+$(This_val).attr("Id"),    
         //         '+window.localStorage.getItem('Id'), 

         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
         CartAmountTotal();
         //         $.afui.hideMask();   
     });

     function ajaxSucceess(response) {

         $.each(JSON.parse(response.d), function(key, value) {


         })
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
             url: 'http:////restapi.bamyc.com/ShoppingCart.svc/CartItemUpdate?CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&ProductId=' + ProductId + '&Type=-1',

             //         '+$(This_val).attr("Id"),    
             //         '+window.localStorage.getItem('Id'), 

             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
             CartAmountTotal();
             //         $.afui.hideMask();   
         });

         function ajaxSucceess(response) {

             $.each(JSON.parse(response.d), function(key, value) {


                 //   $("#Quantity").val(alert(response.d)); 

                 //  $("#Quantity").val(response.d);  



             })
         }

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }}
     
     else{
         
        if (Number($("#Quantity_" + ProductId).val()) > 1) {
         $("#Quantity_" + ProductId).val(Number($("#Quantity_" + ProductId).val()) - 1);
         $.afui.showMask('Loading');

         $.ajax({

             type: "GET",
             method: "GET",
             url: 'http:////restapi.bamyc.com/ShoppingCart.svc/CartItemUpdate?CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&ProductId=' + ProductId + '&Type=-1',

             //         '+$(This_val).attr("Id"),    
             //         '+window.localStorage.getItem('Id'),   

             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
             CartAmountTotal();
             //         $.afui.hideMask();   
         });

         function ajaxSucceess(response) {

             $.each(JSON.parse(response.d), function(key, value) {


                 //   $("#Quantity").val(alert(response.d)); 

                 //  $("#Quantity").val(response.d);  



             })
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
        
    }}
function QtyAdd_WishList(ProductId) {
     
     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) { 
         
     $("#WishQuantity_" + ProductId).val(Number($("#WishQuantity_" + ProductId).val()) + 1);
     $.afui.showMask('Loading');
     $.ajax({

         type: "GET",
         method: "GET",
         url: 'http:////restapi.bamyc.com/Wishlist.svc/WishItemUpdate?CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&ProductId=' + ProductId + '&Type=1',
    
 
         //         '+$(This_val).attr("Id"),    
         //         '+window.localStorage.getItem('Id'), 

         success: ajaxSucceess,    
         error: ajaxError  
     }).done(function() {
         $.afui.hideMask();   
        UpdateWishlistCount();
     });

     function ajaxSucceess(response) {

         $.each(JSON.parse(response.d), function(key, value) {

         
         })
     }

     function ajaxError(response) {
         //         alert(errormsg.responseText);  
     }
 }
     else 
        {
     $("#WishQuantity_" + ProductId).val(Number($("#WishQuantity_" + ProductId).val()) + 1);
     $.afui.showMask('Loading');
     $.ajax({

         type: "GET",
         method: "GET",
         url: 'http:////restapi.bamyc.com/Wishlist.svc/WishItemUpdate?CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&ProductId=' + ProductId + '&Type=1',

         //         '+$(This_val).attr("Id"),    
         //         '+window.localStorage.getItem('Id'), 

         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
         CartAmountTotal();
         //         $.afui.hideMask();   
     });

     function ajaxSucceess(response) {

         $.each(JSON.parse(response.d), function(key, value) {


         })
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
             url: 'http:////restapi.bamyc.com/Wishlist.svc/WishItemUpdate?CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&ProductId=' + ProductId + '&Type=-1',

             //         '+$(This_val).attr("Id"),    
             //         '+window.localStorage.getItem('Id'), 

             success: ajaxSucceess,  
             error: ajaxError
         }).done(function() { 
             CartAmountTotal();
                      $.afui.hideMask();   
         });

         function ajaxSucceess(response) {

             $.each(JSON.parse(response.d), function(key, value) {


                 //$("#Quantity").val(alert(response.d)); 

                 //  $("#Quantity").val(response.d);   



             })
         }

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }}
     
     else{
         
        if (Number($("#WishQuantity_" + ProductId).val()) > 1) {
         $("#WishQuantity_" + ProductId).val(Number($("#WishQuantity_" + ProductId).val()) - 1);
         $.afui.showMask('Loading');

         $.ajax({

             type: "GET",
             method: "GET",
             url: 'http:////restapi.bamyc.com/Wishlist.svc/WishItemUpdate?CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&ProductId=' + ProductId + '&Type=-1',

             //         '+$(This_val).attr("Id"),    
             //         '+window.localStorage.getItem('Id'),   

             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
             CartAmountTotal();
                      $.afui.hideMask();   
         });

         function ajaxSucceess(response) {

             $.each(JSON.parse(response.d), function(key, value) {


                 //   $("#Quantity").val(alert(response.d)); 

                 //  $("#Quantity").val(response.d);  



             })
         }

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     } 
         
     }
 }
function AddToWishList(This_val)
{
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
//         $.afui.showMask('Loading');
         $.ajax({
 
             type: "GET",
             method: "GET",
             url: 'http://restapi.bamyc.com/Wishlist.svc/AddToWishlist?ProductId='+ $(This_val).attr("Id").split('_')[2] +       '&CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&Quantity=1',
             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
               $("#"+$(This_val).attr("Id")+" i").attr("class","fa fa-heart");
                   $("#"+$(This_val).attr("Id")).removeAttr("onclick");
                
                      $("#"+$(This_val).attr("Id")+" i").attr("class","fa fa-heart");
                   $("#"+$(This_val).attr("Id")).removeAttr("onclick");
          UpdateWishlistCount();
          
             //         $.afui.hideMask();   
         });

         function ajaxSucceess(response) {

          
         }

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }  
     
     else{
         
//         $.afui.showMask('Loading');
//         $.afui.showMask('Loading');
         $.ajax({
 
             type: "GET",
             method: "GET",
             url: 'http://restapi.bamyc.com/Wishlist.svc/AddToWishlist?ProductId='+ $(This_val).attr("Id").split('_')[2] +       '&CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&Quantity=1',
             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
               $("#"+$(This_val).attr("Id")+" i").attr("class","fa fa-heart");
                   $("#"+$(This_val).attr("Id")).removeAttr("onclick");
                
                      $("#"+$(This_val).attr("Id")+" i").attr("class","fa fa-heart");
                   $("#"+$(This_val).attr("Id")).removeAttr("onclick");
          UpdateWishlistCount();
          
             //         $.afui.hideMask();   
         });

         function ajaxSucceess(response) {

          
         }

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }  
     
    
}


function AddToWishListDesc(This_val)
{
    
  
    if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
//         $.afui.showMask('Loading');
         $.ajax({
 
             type: "GET",
             method: "GET",
             url: 'http://restapi.bamyc.com/Wishlist.svc/AddToWishlist?ProductId='+ $(This_val).attr("Id") +       '&CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&Quantity=1',
             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
               $("#"+$(This_val).attr("Id")+" i").attr("class","fa fa-heart");
                   $("#"+$(This_val).attr("Id")).removeAttr("onclick");
                
                      $("#"+$(This_val).attr("Id")+" i").attr("class","fa fa-heart");
                   $("#"+$(This_val).attr("Id")).removeAttr("onclick");
          UpdateWishlistCount();
          
             //         $.afui.hideMask();   
         });

         function ajaxSucceess(response) {

          
         }

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }  
     
     else{
         
//         $.afui.showMask('Loading');

        $.ajax({
 
             type: "GET",
             method: "GET",
             url: 'http://restapi.bamyc.com/Wishlist.svc/AddToWishlist?ProductId='+ $(This_val).attr("Id") +       '&CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&Quantity=1',
             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
               $("#"+$(This_val).attr("Id")+" i").attr("class","fa fa-heart");
                   $("#"+$(This_val).attr("Id")).removeAttr("onclick");
                
                      $("#"+$(This_val).attr("Id")+" i").attr("class","fa fa-heart");
                   $("#"+$(This_val).attr("Id")).removeAttr("onclick");
          UpdateWishlistCount();
          
             //         $.afui.hideMask();   
         });

         function ajaxSucceess(response) {

          
         }

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }
}
function ProductHtmlCart(ProductId, Image, OfferPercentage, Name, OldPrice, Price, Type,Quantity,ShoppingCartId) {
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
             "<i class='fa fa-trash-o' aria-hidden='true'></i></a></li>"

             +  
             "<li>" +
             "<div class='detailquantity list'>"+
             
               
             "<a href='#' data-productid='" + ProductId + "' "+
             "onclick='QtyAdd(" + ProductId + ");'>+</a>"+
          
             
             
             "<input type='text' data-productid='" + ProductId + "' value='" + Quantity + "' id='" + QuantityTextId + "'>" +
                 
              "<a href='#'  data-productid='" + ProductId + "' onclick='QtySub(" + ProductId + ")'>-</a>" +
                 
                " </div>" +
             "<div class='productprice productoldprice productdetail cart'><span class='old'>" + OldPrice + "AED</span> <span>" + Price + "AED</span></div>" +
             "</li>" +
             "</ul>" +
             "</div>" + 
             "</li>";
     } 
       else if (Type == "WishList")

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
             "<i class='fa fa-trash-o' aria-hidden='true'></i></a>"+
//               "<a data-toast  data-message='Added to Cart' data-position='bc' href='#' id='" + ShoppingCartId + "' class='addtocartfromwishlist' "+ "onclick='AddtoCartFromWishList(this);'>" +
//             "<i class='fa fa-cart-plus' aria-hidden='true'></i></a></li>"
         
          "<a  data-toast  data-message='Added to Cart' data-position='bc' data-productid='" + ProductId + "' class='addtocartfromwishlist' "+ "onclick='AddToCart(this)'>" +
             "<i class='fa fa-cart-plus' aria-hidden='true'></i></a></li>"
             +   
             "</li>"  
 
             +     
             "<li>" +
             "<div class='detailquantity list'>"+
                "<a href='#' data-productid='" + ProductId + "' "+
             "onclick='QtyAdd_WishList(" + ProductId + ");'>+</a>"+
             
             "<input type='text' data-productid='" + ProductId + "' value='" + Quantity + "' id='" + QuantityTextIdWishList + "'>" +
             
                 
                 "<a href='#'  data-productid='" + ProductId + "' "+
             "onclick='QtySub_WishList(" + ProductId + ")'>-</a>" +
                 
           
             
             "</div>" +
             "<div class='productprice productoldprice productdetail cart'><span class='old'>" + OldPrice + "AED</span> <span>" + Price + "AED</span></div>" +
             "</li>" +
           
             "</ul>" +
             "</div>" + 
             "</li>";
     } else {
         //             HTML = "<li>" +
         //         "<div class='productwrapper_list'>" +
         //         "<div class='productoffer'>" + OfferPercentage + "%</div>" +
         //         "<div class='prodectimagesection'><a  data-productid='"+ProductId+"' onclick='ProductDescription(this)'  href='#'><img src=" + Image + "></a></div>" +
         //         "<div class='productname'  data-productid='"+ProductId+"' onclick='ProductDescription(this)' >" + Name + "</div>" +
         //         "<div class='productprice productoldprice'><span class='old'>" + OldPrice + " AED</span> <span>" + Price + " AED</span></div>"
         //         //+"<div class='starrating'><span class='four'></span></div>"
         //         +
         //         "<div class='productaddtocart' id='productaddtocart'><a onclick='AddToCart(this)' data-productid='"+ProductId+"'>Add to Cart</a></div>" +
         //         "</div>" +
         //         "</li>";
     }

     //      "<div class='productaddtocart' id='productaddtocart'><a onclick='addtocart()' data-productid='"+ProductId+"'>Add to Cart</a></div>" +
     //         "</div>" +
     //         "</li>";
     return HTML;
 }

 function ProductDescription(ThisVal) {
     $.afui.showMask('Loading');
     $.ajax({

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/Product.svc/GetProductDetails?ProductId=' + $(ThisVal).attr("data-productid"),

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
              var ProductIds=window.localStorage.getItem('RecentlyViewed');
              
              if( ProductIds.search(value.ProductId.toString())==-1 ){
              ProductIds=ProductIds+','+value.ProductId.toString();
              window.localStorage.setItem('RecentlyViewed',ProductIds);
} 

              
          }else
              {
                   window.localStorage.setItem('RecentlyViewed',value.ProductId.toString());
              }
             
             
             
          
           $('#ProductDetailsContent').append(ProdDescHTML(value.ProductId, value.Image, value.OfferPercentage, value.Name, value.OldPrice, value.Price,value.Quantity,value.ShortDescription)); 
  



         });
     }

     function ajaxError(response) {
         //        alert(response.responseText);  
     }

 }


 function ProdDescHTML(ProductId, Image, OfferPercentage, Name, OldPrice, Price,Quantity,ShortDescription) {
    
     var ProdHtml;
     var QuantityTextId = "Quantity_ProductDesc" + ProductId;
     ProdHtml = "<div class='productdetalimage'><img src='"+Image+"' />" 
         +"<div class='productoffer'>"+OfferPercentage+"%</div></div>"
+"<div class='productdetaillist'>" 
 +" <ul>"
   +" <li><strong>"+Name+"</strong></li>"
   //+" <li>"
  //  +"  <div class='brandname'>Brand name here</div>"
  //  +"  <div class='starrating productdetalstar'><span class='five'></span></div>"
 //  +" </li>"
   +" <li>" 
     +" <div class='detailquantity'><a href='#' data-productid='" + ProductId + "' onclick='QtySub_ProductDesc(" + ProductId + ")'>-</a>"
       +" <input type='text'  data-productid='" + ProductId + "' value='1' id='" + QuantityTextId + "' />"  
        +"<a href='#' data-productid='" + ProductId + "' "+
             "onclick='QtyAdd_ProductDesc(" + ProductId + ");'>+</a></div>"   
      +"<div class='productprice productoldprice productdetail'>"  
          +"<span class='old'>"+OldPrice+" AED</span>"  
          +"<span>"+Price+" AED</span></div>"
    +"</li>"
    +"<li class='cartdetail'>"
      +"<div class='emailafriend'><a href='#'>"
      +"<i class='fa fa-envelope-o' aria-hidden='true'></i>" 
          +"<span>Email to Friend</span></a></div>"
      +"<div class='detailaddtocart' ><a href='#' data-toast  data-message='Added to cart' data-position='bc' data-productid='" + ProductId + "' onclick='AddToCart_Desc(this)' ><img  src='images/detailaddtocart.png' />" 
      +"    <span>Add to cart</span></a></div>"     
    +"</li>"  
    +"<li>" 
      +"<div class='detailsocialmedia'><a href='#'><img src='images/facebook.png' /></a>"
    +"      <a href='#'><img src='images/twitter.png' /></a><a href='#'>"
            +"  <img src='images/printrest.png' /></a><a href='#'>"
          +"        <img src='images/socialmedia.png' /></a><a href='#'>"
        +"              <img src='images/googlepluse.png' /></a></div>"
      +"<div class='wishlisticon'><a href='#' data-toast  data-message='Added to WishList' data-position='bc' id='" + ProductId + "' onclick='AddToWishListDesc(this);' class='active'>"
          +"<i class='fa fa-heart-o' aria-hidden='true'></i></a></div>"
    +"</li>"
  +"</ul>"
+"</div>"
+"<div class='clear'></div>"
+"<div class='discwrapper'>"
  +"<h2>description</h2>"
  +"<p> " +ShortDescription+"</p>" 
+"</div>";
     return ProdHtml; 
 }


 function BestSellingProducts(ElementId) {

     $.ajax({

         type: "GET",
         method: "GET",
         //         url: 'http://restapi.bamyc.com/Product.svc/AllSearchedProduct?ProductName=coc&PageSize=1&PageNumber=1',

         url: 'http://restapi.bamyc.com/Product.svc/BestSellingProduct?Count=6',
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
         $.afui.hideMask();
     });

     function ajaxSucceess(response) {

         $('#' + ElementId).empty();
         $.each(JSON.parse(response.d), function(key, value) {
             $('#' + ElementId).append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage,0,""));

         });

     }

     function ajaxError(response) {
         alert(errormsg.responseText);
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
         $.afui.hideMask();
     });

     function ajaxSucceess(response) {
         $('#' + ElementId).empty();

         $.each(JSON.parse(response.d), function(key, value) {


             $('#' + ElementId).append(ProductHtml(value.ProductId, value.Name, value.Image, value.OldPrice, value.Price, value.OfferPercentage,0,''));
         })

     }

     function ajaxError(response) {
          }

 }



 function AddToCart(This_Val) {
     //     $.afui.showMask('Loading');
     //    if(LoginCustomerID!=null)
     //        {
 if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
     $.ajax({

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/ShoppingCart.svc/ShoppingCartAddItem?ProductId=' + $(This_Val).attr("data-productid") + '&ShoppingcartId=1&CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&Quantity=1&StoreId=1',
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {

         UpdateCartCount();
     });

     function ajaxSucceess(response) {


     }
     //}
     //else{}  

     function ajaxError(response) {
         //         alert(response.responseText);
     }
 }
     else{
          $.ajax({

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/ShoppingCart.svc/ShoppingCartAddItem?ProductId=' + $(This_Val).attr("data-productid") + '&ShoppingcartId=1&CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&Quantity=1&StoreId=1',
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {

         UpdateCartCount();
     });

     function ajaxSucceess(response) {


     }
     //}
     //else{}  

     function ajaxError(response) {
         //         alert(response.responseText);
     }
         
     }

 }
function AddToCart_Desc(This_Val) {
     //     $.afui.showMask('Loading');
     //    if(LoginCustomerID!=null)
     //        {
 if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
     $.ajax({

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/ShoppingCart.svc/ShoppingCartAddItem?ProductId=' + $(This_Val).attr("data-productid") + '&ShoppingcartId=1&CustomerId=' + window.localStorage.getItem('LoginCustomerID') + '&Quantity='+$("#Quantity_ProductDesc"+$(This_Val).attr("data-productid")).val()+'&StoreId=1',
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {

         UpdateCartCount();
     });

     function ajaxSucceess(response) {


     }
     //}
     //else{}  

     function ajaxError(response) {
         //         alert(response.responseText);
     }
 }
     else{
          $.ajax({

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/ShoppingCart.svc/ShoppingCartAddItem?ProductId=' + $(This_Val).attr("data-productid") + '&ShoppingcartId=1&CustomerId=' + window.localStorage.getItem('LogOutCustomerId') + '&Quantity='+$("#Quantity_ProductDesc"+$(This_Val).attr("data-productid")).val()+'&StoreId=1',
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {

         UpdateCartCount();
     });

     function ajaxSucceess(response) {


     }  
     //}
     //else{}  

     function ajaxError(response) {
         //         alert(response.responseText);
     }
         
     }

 }
   
function AddtoCartFromWishList(This_Val)
{
    

   if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
     $.ajax({

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/Wishlist.svc/AddToCartFromWishlist?ShoppingCartId='+
         $(This_Val).attr("Id"),
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {

         UpdateCartCount();
         WishListProducts();
     });

     function ajaxSucceess(response) {


     }
     //}
     //else{}  

     function ajaxError(response) {
         //         alert(response.responseText);
     }
 }
     else{
          $.ajax({

         type: "GET",
         method: "GET",
          url: 'http://restapi.bamyc.com/Wishlist.svc/AddToCartFromWishlist?ShoppingCartId='+
         $(This_Val).attr("ShoppingCartId"),
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() { 

         UpdateCartCount();
     });

     function ajaxSucceess(response) {


     }
     //}
     //else{}  

     function ajaxError(response) {
         //         alert(response.responseText);
     }
         
     } 
      
}
 function UpdateCartCount() {
     // alert(window.localStorage.getItem("LoginCustomerID"));
     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {

         $.ajax({

             type: "GET",
             method: "GET",
             url: 'http://restapi.bamyc.com/ShoppingCart.svc/ShoppingCartCount?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
           
//             $.afui.hideMask();
         });

         function ajaxSucceess(response) {

             if (JSON.parse(response.d) == 0) {

                 $.afui.removeBadge("#CartBadge");
             } else {

                 $.afui.updateBadge("#CartBadge", JSON.parse(response.d), "tr", "green");
             }
         }

         function ajaxError(response) {
             //         alert(response.responseText);


         }
     }
     
     else 
         {
             
         $.ajax({
             type: "GET",
             method: "GET",
             url: 'http://restapi.bamyc.com/ShoppingCart.svc/ShoppingCartCount?CustomerId=' + window.localStorage.getItem('LogOutCustomerId'),
             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
             
//             $.afui.hideMask();
         });

         function ajaxSucceess(response) {

             if (JSON.parse(response.d) == 0) {

                 $.afui.removeBadge("#CartBadge");
             } else {

                 $.afui.updateBadge("#CartBadge", JSON.parse(response.d), "tr", "green");
             }
         }

         function ajaxError(response) {
             //         alert(response.responseText);


         }
             
             
             
         }  
 }

 function UpdateWishlistCount() {
     // alert(window.localStorage.getItem("LoginCustomerID"));
     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {

         $.ajax({

             type: "GET",
             method: "GET",
             url: 'http://restapi.bamyc.com/Wishlist.svc/GetWishlistCount?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
             
             $.afui.hideMask();
         });

         function ajaxSucceess(response) {
 
             if (JSON.parse(response.d) == 0) {

                 $.afui.removeBadge("#WishListBadge");
             } else {

                 $.afui.updateBadge("#WishListBadge", JSON.parse(response.d), "tr", "green");
             }
         }

         function ajaxError(response) {
             //         alert(response.responseText);


         }
     }
     
     else 
         {
         $.ajax({
             type: "GET",
             method: "GET",
             url: 'http://restapi.bamyc.com/Wishlist.svc/GetWishlistCount?CustomerId=' + window.localStorage.getItem('LogOutCustomerId'),
             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
             $.afui.hideMask();
         });

         function ajaxSucceess(response) {
             if (JSON.parse(response.d) == 0) {

                 $.afui.removeBadge("#WishListBadge");
             } else {

                 $.afui.updateBadge("#WishListBadge", JSON.parse(response.d), "tr", "green");
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
 //function CartAnimation(ThisVal) {
 //    var cart = $('#CartBasket');
 //    var imgtodrag = $(ThisVal).parent('.productaddtocart').parent('.productwrapper_list').children('.prodectimagesection').find("img").eq(0);
 //    if (imgtodrag) {
 //        var imgclone = imgtodrag.clone()
 //            .offset({
 //                top: imgtodrag.offset().top,
 //                left: imgtodrag.offset().left
 //            })
 //            .css({
 //                'opacity': '0.5',
 //                'position': 'absolute',
 //                'height': '150px',
 //                'width': '150px',
 //                'z-index': '100'
 //            })
 //            .appendTo($('body'))
 //            .animate({
 //                'top': cart.offset().top + 10,
 //                'left': cart.offset().left + 10,
 //                'width': 75,
 //                'height': 75
 //            }, 1000, 'easeInOutExpo');
 //
 //        setTimeout(function () {
 //            //cart.effect("shake", {
 //            //    times: 2
 //            //}, 200);
 //        }, 1500);
 //
 //        imgclone.animate({
 //            'width': 0,
 //            'height': 0
 //        }, function () {
 //            // $(ThisVal).detach()
 //        });
 //    }
 //}
 //
 //  


  

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
     var firstname_len =  document.forms["registration"]["registration_firstname"].value;
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
     if (registration_country.value== "0") {
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
//         LoginSuccess()
     } else {
         
         alert("Registered Successfully, activate your account through your registered Email Id");
         RegisterNew();

    
     }
 }

function RegisterNew()
{
    
 
     
         $.afui.showMask('Loading');  
         $.ajax({

             type: "GET",
             method: "GET", 

            
              url: 'http://restapi.bamyc.com/Customer.svc/CustomerLoginRegistration?Firstname='+ $("#registration_firstname").val().trim() + '&Lastname='+ $("#registration_lastname").val().trim() + '&Email='+ $("#registration_email").val().trim() + '&Phone='+ $("#registration_phone").val().trim() +'&StreetAddress='+ $("#registration_address").val().trim() +'&CountryId='+ $("#registration_country").val().trim() + '&AreaId='+ $("#registration_area").val().trim() + '&Password='+ $("#registration_password").val().trim() , 
             
             success: ajaxSucceess,  
             error: ajaxError  
         }).done(function() { 
             $.afui.hideMask(); 
             
         });
          function ajaxSucceess(response) {  
       
              if (JSON.parse(response.d).length != 0)

             { 
             
                 $.afui.loadContent("#Login", false, false, "fade");

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
     document.getElementById("Register").reset();
 }

 function LoginMenu() {
     

     $.afui.loadContent("#login", false, false, "fade");
     $.afui.drawer.hide();
     //  $("#login").attr("class","panel login active");
 }

 function HideLoginPanel() { //HideAllPanels();
     
     
     //  $("#HomePage").attr("class","panel active");
     $.afui.loadContent("#HomePage", false, false, "fade");
 }

 function HideRegisterPanel() { //HideAllPanels();
     
     
     //  $("#HomePage").attr("class","panel active");
     $.afui.loadContent("#login", false, false, "fade");
 }

 function Login(form) {
     
   
     $.afui.showMask('Loading');
     $.ajax({

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/Customer.svc/Authentication?Username=' + form.username.value + '&Password=' + form.passid.value,

         //  url: 'http://restapi.bamyc.com/Customer.svc/Authentication?Username="form.username.value" &Password="form.passid.value",
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
         ProfileLoad();
                 $.afui.hideMask();
     });

     function ajaxSucceess(response) {

         if (JSON.parse(response.d).length != 0)

         {
             $.each(JSON.parse(response.d), function(key, value) {

                 window.localStorage.setItem("LoginCustomerID", value.Id);
                 window.localStorage.setItem('LoginUserName', value.Email);
             });
           ShoppingCartSynchronization();
           WishlistSynchronization(); 
    
              $.afui.clearHistory();
             document.getElementById("Login").reset();
             $.afui.loadContent("#HomePage", false, false, "fade");
             $("#LoginList").css("display", "block");
             $("#NotloginList").css("display", "none");

             $(".HeaderSection").css("visibility", "visible");
             $(".FooterSection").css("visibility", "visible");
             /*$.each(JSON.parse(response.d), function(key, value) {
             
             

          
         });*/
         } else {
             alert("Invalid UserName or Password");  
         }



     }
       function ajaxError(response) {
      //   $.afui.loadContent("#HomePage", false, false, "fade");
       alert(response.responseText);
     }
 }


 function PasswordResetLogin(UserName, Password) {


     $.ajax({

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/Customer.svc/Authentication?Username=' + UserName + '&Password=' + Password,

         //  url: 'http://restapi.bamyc.com/Customer.svc/Authentication?Username="form.username.value" &Password="form.passid.value",
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
         $.afui.hideMask();
     });

     function ajaxSucceess(response) {

         if (JSON.parse(response.d).length != 0)

         {
             $.each(JSON.parse(response.d), function(key, value) {

                 window.localStorage.setItem("LoginCustomerID", value.Id);
                 window.localStorage.setItem('LoginUserName', value.Email);
             })

             UpdateCartCount();
             UpdateWishlistCount();
             

             $.afui.loadContent("#HomePage", false, false, "fade");




         } else {
             alert("Invalid UserName or Password");
         }



     }

     function ajaxError(response) {
         $.afui.loadContent("#HomePage", false, false, "fade");
         //  alert(response.responseText);
     }

 }


 function ChangePasword(form) {
     if ($("#NewPassword").val().trim() != $("#ConfirmPassword").val().trim()) {
         alert("new and confirmation password mismatch");
     } else {
         $.afui.showMask('Loading');
         $.ajax({

             type: "GET",
             method: "GET",
             url: 'http://restapi.bamyc.com/Customer.svc/UpdatePassword?Username=' + window.localStorage.getItem("LoginUserName") + '&Password=' + $("#Password").val().trim() + '&newpassword=' + $("#NewPassword").val().trim(),


             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
             $.afui.hideMask();
         });

         function ajaxSucceess(response) {
             //        alert(JSON.parse(response.d).length);  

             if (JSON.parse(response.d).length != 0)

             {
                 alert("Password Reset Successfully");
                 PasswordResetLogin(window.localStorage.getItem("LoginUserName"), $("#NewPassword").val().trim());

             }
         }

         function ajaxError(response) {

             //                    alert(response.responseText);
         }
     }
 }
 //function addtocart()
 //{if(LoginCustomerID!=null)
 //    {
 //    var value = parseInt(document.getElementById('number').value, 10);
 //    value = isNaN(value) ? 0 : value;
 //    value++;
 //    document.getElementById('number').value = value;
 //}else{}  
 //}


 function Logout() {
  
     window.localStorage.setItem('RecentlyViewed',null);
     $.afui.drawer.hide();
     
     $("#LoginList").css("display", "none");
     $("#NotloginList").css("display", "block");
     $.afui.loadContent("#HomePage", false, false, "fade");
     window.localStorage.setItem('LoginCustomerID', null);

     $('#CartProducts').empty();
     $.afui.removeBadge("#CartBadge");
     $('#WishListProduct').empty();  
     ProfileLoad();  
     UpdateWishlistCount();
     $.afui.clearHistory();
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
     
 // $.afui.showBackButton("Checkout", false);
// $.afui.loadContent("#HomePage", false, false, "fade");
       $.afui.loadContent("#Checkout", false, false, "fade");
   //  
  


     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
         $.ajax({

             type: "GET",
             method: "GET",
             url: 'http://restapi.bamyc.com/ShoppingCart.svc/GetAllCartedItems?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
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
         }



         function ajaxError(response) {
             //         alert(errormsg.responseText);   
         }

     } 
else
{ 
    $.afui.loadContent("#login", false, false, "fade");
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
          " <div class='productprice productoldprice productdetail'><span>" + Price + " AED</span></div><div class='Multiple'><span> x </span></div>" +
         " <div class='brandname'><span>" + Quantity + "</span></div>" +
        
          " <strong class='checkouttotal'> = " + TotalPrice + " AED</strong>" +
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
             url: ' http://restapi.bamyc.com/ShoppingCart.svc/CartAmountTotal?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),

             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
             $.afui.hideMask();
         });

         function ajaxSucceess(response) {
 

             $.each(JSON.parse(response.d), function(key, value) {
                 //             $('#CartProducts').append(ProductHtmlCart(value.ProductId,value.Image,value.OfferPercentage, value.Name,  value.OldPrice, value.Price, "Cart"));


                 $('#SubTotalCheckout').text(value.SubTotal + " AED");
                 $('#ShippingChargesCheckout').text(value.Shippingcost + " AED");
                 $('#GrandTotalCheckout').text(value.GrandTotal + " AED");
                $('#TotalAmountPlaceOrder').text(value.GrandTotal + " AED"); 

 
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

               url: 'http://restapi.bamyc.com/Address.svc/CustomerShippingAddress?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),  

             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
             $.afui.hideMask();
         });

         function ajaxSucceess(response) {
 $('#Shippingdetails_addlist').empty(); 

             $.each(JSON.parse(response.d), function(key, value) {
               


                  $('#Shippingdetails_addlist').append(ShippingAddressListHtml(value.Id,value.FirstName, value.Email, value.Phone_Number, value.Area, value.Country));
                 
               
 
             });
 
         }

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }
 }

//function EditShippingAddress(This_Val){
//    alert($(This_Val).attr("Id"));
//}
//function DeleteShippingAddress(This_Val)
//{
//      alert($(This_Val).attr("Id"));
//    
//}
function ShippingAddressListHtml(AddressId,FirstName,Email, Phone_Number, Area,Country)
 
{
     var Html;  
 
     Html = "<div class='shippingtitle'>" + 
         "<strong>" + FirstName + "</strong>" +
         " <a href='#'  class='shippingaddresslist' id='"+AddressId+"' onclick='DeleteShippingAddress(this)'><i class='fa fa-trash-o' aria-hidden='true'></i></a>" +
         "<a href='#EditAddress'  id='"+AddressId+"' onclick='EditShippingAddress(this)' class='shippingaddresslist'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>" +
         "</div>" + 
         " <div class='ShippingAddress'>" +
         " <span>" + Email + "</span>" +  
         "<span>" + Phone_Number + "</span>" +  
//         "<span>T-54</span>" +  
//         " <span>Technosware Kazhakuttam</span>" + 
//         "<span>Near Railway Station</span>" +
         "<span>" + Area + "</span>" +
         "<span>" + Country + "</span>" +
         "</div>";
     return Html;  
    
 }    
    

   function  EditShippingAddress(This_Val) {  
     

     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');  
           window.localStorage.setItem("AddressId",$(This_Val).attr("Id"));
        
         $.ajax({ 
           
             type: "GET",
             method: "GET",

               url: 'http://restapi.bamyc.com/Address.svc/GetShippingAddressById?AddressId='+$(This_Val).attr("Id"),
     
             success: ajaxSucceess, 
             error: ajaxError  
         }).done(function() {
             $.afui.hideMask();
         });

         function ajaxSucceess(response) { 


             $.each(JSON.parse(response.d), function(key, value) { 
     var output=$.parseXML(value.CustomAttributes);
                 $('AddressAttribute', output).each(function(i, e) {
                     if($(e).attr('ID')=="1")                         
    $("#txtShipping_FlatNo").val($(e).find("AddressAttributeValue").find("Value").text());
                     
                     if($(e).attr('ID')=="2")                         
    $("#txtBuildingaddress").val($(e).find("AddressAttributeValue").find("Value").text());
                     
                     if($(e).attr('ID')=="3")                         
    $("#txtStreetLandMark").val($(e).find("AddressAttributeValue").find("Value").text());
                     
                      
                    
});
             LoadCountries_Inner('txtShipping_country',value.CountryId.toString().trim(),value.StateProvinceId.toString().trim());
                 
                   $("#txtShipping_FirstName").val(value.FirstName); 
                   $("#txtShipping_LastName").val(value.LastName); 
                   $("#txtShipping_Email").val(value.Email); 
                   $("#txtShipping_Phone_Number").val(value.Phone_Number); 
                  
 
//                                $("#Quantity_" + ProductId).val(Number($("#Quantity_" + ProductId).val()) + 1);
  
             });   
 
         }

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }
 }
   

  function  DeleteShippingAddress(This_Val) {  
     

     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
         $.ajax({ 

             type: "GET",
             method: "GET",

               url: 'http://restapi.bamyc.com/Address.svc/DeleteShippingAddressById?AddressId='+$(This_Val).attr("Id"),
     
             success: ajaxSucceess, 
             error: ajaxError  
         }).done(function() { 
             $.afui.hideMask();
             ShippingAddressList();  
         });     
 
         function ajaxSucceess(response) { 
     
             };    
          }  
 
         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         } 
     }  
function TrackOrder() {
     
     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
         $.ajax({

             type: "GET",
             method: "GET",

               url: 'http://restapi.bamyc.com/Order.svc/TrackOrderDetails?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),

             success: ajaxSucceess,
             error: ajaxError
         }).done(function() { 
             $.afui.hideMask();
         });

         function ajaxSucceess(response) { 
          $('#TrackOrderShippingDetails').empty();  

             $.each(JSON.parse(response.d), function(key, value) {

                  $('#TrackOrderShippingDetails').append(TrackOrderHtml(value.Id, value.OrderStatusId, value.CreatedOnUtc, value.OrderTotal ));
               
             });
  
         }

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }
 }    

 function TrackOrderProducts(Id) {
     
 // $.afui.showBackButton("Checkout", false);
// $.afui.loadContent("#HomePage", false, false, "fade");
       $.afui.loadContent("#TrackOrderDetails", false, false, "fade");
   //  
  


     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
         $.ajax({

             type: "GET",
             method: "GET",
            url: 'http://restapi.bamyc.com/Order.svc/OrderProductDetails?OrderId='+Id, 
             
             success: ajaxSucceess,
             error: ajaxError 
         }).done(function() {

  
         });

         function ajaxSucceess(response) {
             $('#TrackOrderProductDetails').empty(); 
var Paymentmethod;
             $.each(JSON.parse(response.d), function(key, value) {
                 Paymentmethod=value.PaymentMethodSystemName;
                  
                 $('#TrackOrderProductDetails').append(BindTrackOrderProducts(value.ProductId, value.Image, value.Name, value.Price, value.Quantity, value.TotalPrice, value.OfferPercentage));
             });
             if(Paymentmethod=='Payments.PayInStore')
                 Paymentmethod='Payed by <b>Card</b>';
              else
                  Paymentmethod='Payed by <b>Cash</b>';
             
             $('#TrackOrderDetailInformationPayment').empty();  $('#TrackOrderDetailInformationPayment').append(TrackOrderDetailHtmlPayment(Paymentmethod));
         }



         function ajaxError(response) {
             //         alert(errormsg.responseText);   
         }

     } 
else
{ 
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
         " <div class='brandname'>Qty-" + Quantity + "</div>" +
         " <div class='productprice productoldprice productdetail'><span>" + Price + " AED</span></div>" +
          " <strong class='checkouttotal'>Total - " + TotalPrice + " AED</strong>" +
         "  </li>" +
        
         "</ul>" +
         " </div>" +
         "</li>";
     return Html;
 }
function TrackOrderHtml(Id,OrderStatusId, CreatedOnUtc, OrderTotal)
  {  var Html; 
   var Status;
var Content;
    if(OrderStatusId == 10){
       Status= 'Pending';
    }
   else  if(OrderStatusId == 20){
       Status= 'Picking';
    }
     else  if(OrderStatusId == 30){
       Status= 'Picked';
    }
     else  if(OrderStatusId == 40){
       Status= 'Packing';
    }
     else  if(OrderStatusId == 50){
       Status= 'Packed';
    }
     else  if(OrderStatusId ==60){
       Status= 'Shipping';
    }
     else  if(OrderStatusId == 70){
       Status= 'Shipped';
    }
     else  if(OrderStatusId == 80){
       Status= 'Delivering';
    }
     else  if(OrderStatusId == 90){
       Status= 'Delivered';
    }
             
Content="<strong>Order Status:</strong><span class='"+Status+"'>"+Status+"</span><br>"+
                "<strong>Order Date:</strong><span>"+CreatedOnUtc+"</span><br>"+
                  " <strong>Order Total :</strong><span>" +OrderTotal+" AED</span><br>";

Html='<div class="shippingtitle">'+      
               '<strong>Order Number :</strong><span>'+Id+'</span></strong>'+ 
               '<a href="#" onclick="TrackOrderDetailsBilling('+Id+')" class="shippingaddresslist">'+
                     '<i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a> '+
           ' </div>'+ 
                '<div class="ShippingAddress trackorder" id="DefaultShippingAddress">'+Content+' </div>';
     
    
     return Html;   
    
 }    

 

 function TrackOrderDetailsBilling(Id)
{
      
    
     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
         $.ajax({

             type: "GET",
             method: "GET",

               url: 'http://restapi.bamyc.com/Order.svc/GetOrderBillingAddress?OrderId='+Id, 

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
    
      function TrackOrderDetailsShipping(Id)
{
      
    
     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
    $.ajax({

             type: "GET",
             method: "GET",

               url: 'http://restapi.bamyc.com/Order.svc/GetOrderShippingAddress?OrderId='+Id, 

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
//             url: ' http://restapi.bamyc.com/ShoppingCart.svc/CartAmountTotal?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),
  url: 'http://restapi.bamyc.com/Order.svc/OrderAmountTotal?OrderId='+Id,
             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
             $.afui.hideMask();
         }); 

         function ajaxSucceess(response) {


             $.each(JSON.parse(response.d), function(key, value) {  
          


                 $('#SubTotalTrackOrder').text(value.SubTotal + " AED");
                 $('#ShippingChargesTrackOrder').text(value.Shippingcost + " AED");
                 $('#GrandTotalTrackOrder').text(value.GrandTotal + " AED");
              
 
             });

         }

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }
 } 
function TrackOrderDetailHtmlBilling(Name,Email,Phone,State,Country)
{
    var Html;
    Html=   "<div class='shippingtitle'>"+ 
                     "<strong>Billing Address</strong>"+
                     
                   
                     "</div> "+       
                        " <div class='ShippingAddress'>"+
                      " <span>"+Name+"</span>"+
                    " <span>"+Email+"</span>"+ 
                        "<span>"+Phone+" </span>"+
//                          " <span>Flat No: cfjgf tsryrs</span>"+
//                         "<span> Building Address: bvgmcg y sr jr u</span>"+
//                             "   <span> Street/ Land Mark: truuy yesy </span>"+
                          " <span> "+State+"</span>"+
                          "  <span>"+Country+" </span>"+
//            " <strong>Payment Method:</strong><span> Pay with Card upon delivery </span><br>"+
//                  " <strong>Payment Status:</strong><span> Pending </span><br><br><br><br>"+
                    " </div>";
        return Html; 
     
}   

function TrackOrderDetailHtmlShipping(Name,Email,Phone,State,Country)
{
  
   var Html;
    Html=   "<div class='shippingtitle'>"+ 
                    "<strong>Shipping Address</strong>"+
                     
                   
                     "</div> "+       
                        " <div class='ShippingAddress'>"+
                      " <span>"+Name+"</span>"+ 
                    " <span>"+Email+"</span>"+ 
                        "<span>"+Phone+" </span>"+
//                          " <span>Flat No: cfjgf tsryrs</span>"+
//                         "<span> Building Address: bvgmcg y sr jr u</span>"+
//                             "   <span> Street/ Land Mark: truuy yesy </span>"+
                          " <span> "+State+"</span>"+
                          "  <span>"+Country+" </span>"+
//            " <strong>Payment Method:</strong><span> Pay with Card upon delivery </span><br>"+
//                  " <strong>Payment Status:</strong><span> Pending </span><br><br><br><br>"+
                    " </div>";
        return Html; 
}

function TrackOrderDetailHtmlPayment(Paymentmethod)
{
  
   var Html;
    Html=   "<div class='shippingtitle'>"+ 
                    "<strong>Payment Method</strong>"+
                     
                   
                     "</div> "+       
                        " <div class='ShippingAddress'>"+
                      " <span>"+Paymentmethod+"</span>"+ 
                   
                    " </div>";
        return Html; 
}

function ShoppingCartSynchronization()
     {
        
     $.ajax({

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/ShoppingCart.svc/ShoppingCartSynchronization?LogInCustomerId='+window.localStorage.getItem('LoginCustomerID')+'&LogOutCustomerId='+window.localStorage.getItem('LogOutCustomerId')+'&shoppingcarttypeId=1', 

         //  url: 'http://restapi.bamyc.com/Customer.svc/Authentication?Username="form.username.value" &Password="form.passid.value",
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
         UpdateCartCount();
         UpdateWishlistCount();
         $.afui.hideMask();
     });

     function ajaxSucceess(response) {

         
     }
     function ajaxError(response) {
      //   $.afui.loadContent("#HomePage", false, false, "fade");
         //  alert(response.responseText);
     }

 }

function WishlistSynchronization()
     {
        
     $.ajax({

         type: "GET",
         method: "GET",
        url: 'http://restapi.bamyc.com/ShoppingCart.svc/ShoppingCartSynchronization?LogInCustomerId='+window.localStorage.getItem('LoginCustomerID')+'&LogOutCustomerId='+window.localStorage.getItem('LogOutCustomerId')+'&shoppingcarttypeId=2',   

         //  url: 'http://restapi.bamyc.com/Customer.svc/Authentication?Username="form.username.value" &Password="form.passid.value",
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
         UpdateCartCount();
         UpdateWishlistCount();  
         $.afui.hideMask();
     });

     function ajaxSucceess(response) {

         
     }
     function ajaxError(response) {
      //   $.afui.loadContent("#HomePage", false, false, "fade");
         //  alert(response.responseText);
     }

 }


function CheckOutBack()
{
    
    if($.afui.getTitle()=="Checkout"){
        CartProducts();
         $.afui.loadContent("#MyCartPage", false, false, "fade");
       }
       else if($.afui.getTitle()=="Shipping Address"){
           LoadCheckoutPage();
        $.afui.loadContent("#Checkout", false, false, "fade");
       }
    else if($.afui.getTitle()=="Add address"){
        ShippingAddressList();
        $.afui.loadContent("#CheckoutAddressList", false, false, "fade");
       }
            else if($.afui.getTitle()=="Edit address"){
                ShippingAddressList();
        $.afui.loadContent("#CheckoutAddressList", false, false, "fade");
       }
}
function MyAccountMenu()
{ 
    if($("#MyAccountSubMenu").css("display")=="none")
        {
            $("#MyAccountSubMenu").css("display","block");
        }
    else{
         $("#MyAccountSubMenu").css("display","none");
    }
}

function DefaultShippingAddress()
{
         
     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
         var Flag=1;
         $.ajax({

             type: "GET",
             method: "GET",

               url: 'http://restapi.bamyc.com/Address.svc/CustomerShippingAddress?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),  

             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
             $.afui.hideMask();
         }); 

         function ajaxSucceess(response) { 
       $('#DefaultShippingAddress').empty();
   if(JSON.parse(response.d).length==0){
        $('#DefaultShippingAddress').append("<a class='DefaultNewAddress' href='#CheckoutAddNewAddress'>New Address</a>");
   }
             $.each(JSON.parse(response.d), function(key, value) {
             if(Flag<=1)
 {             
                 window.localStorage.setItem("ShippingAddressId", value.Id);  $('#DefaultShippingAddress').append(DefaultShippingAddressHtml(value.Id,value.FirstName, value.Email, value.Phone_Number, value.Area, value.Country));
     Flag++; 
 }  
       
  
             }); 
   
  
         } 

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }
 }

function DefaultShippingAddressHtml(AddressId,FirstName,Email, Phone_Number, Area,Country)
{
    var Html;  

     Html = "<strong>" + FirstName + "</strong>" +
        
         "</div>" + 
         " <div class='ShippingAddress'>" + 
         " <span>" + Email + "</span>" +  
         "<span>" + Phone_Number + "</span>" +  
//         "<span>T-54</span>" +
//         " <span>Technosware Kazhakuttam</span>" + 
//         "<span>Near Railway Station</span>" +
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
                             if (areaselect_add(txtnew_AddNewAddressArea)) {
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
 


 function firstname_validation(txtnew_firstname) {
     var firstname_len =  document.forms["AddShippingAddress"]["txtnew_firstname"].value;
     if (firstname_len ==  "") { 
         alert("First Name should not be empty");
         txtnew_firstname.focus();
         return false; 
     } 
     return true;
 } 

 function lastname_validation(txtnew_lastname) {
     var lastname_len = document.forms["AddShippingAddress"]["txtnew_lastname"].value;
     if (lastname_len =="") {
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
     var letters = /^[0-9a-zA-Z]+$/;
     if (txtnew_streetaddress.value.match(letters)) {
         return true;
     } else {
         alert('Street address must not empty');  
         txtnew_streetaddress.focus();
         return false;
     }
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
     if (txt_newAddNewAddressCountry.value== "0") {
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


 
 
function AddNewShippingAddress()
{ 
          
    

     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
        
         $.ajax({
 
             type: "GET", 
             method: "GET",

               url: 'http://restapi.bamyc.com/Address.svc/AddNewShippingAddress?CustomerId='+  window.localStorage.getItem("LoginCustomerID") +'&Firstname='+ $("#txtnew_firstname").val().trim() + '&Lastname='+ $("#txtnew_lastname").val().trim() +'&Email='+ $("#txtnew_email").val().trim() + '&Phone='+ $("#txtnew_phone").val().trim() + '&flat='+ $("#txtnew_FlatNo").val().trim() + '&street=' + $("#txtnew_streetaddress").val().trim() + '&landmark=' + $("#txtnew_StreetLandMark").val().trim() + '&CountryId='+ $("#txt_newAddNewAddressCountry").val().trim() + '&AreaId='+ $("#txtnew_AddNewAddressArea").val().trim(), 
             
       
             success: ajaxSucceess, 
             error: ajaxError  
         }).done(function() { 
             $.afui.hideMask();
            ShippingAddressList();  
         });
          function ajaxSucceess(response) {   
      
              if (JSON.parse(response.d).length != 0)

             {  
                 $.afui.loadContent("#CheckoutAddressList", false, false, "fade");

             } 
              
              
              
             };    
          }  

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     } 

 function  DeleteShippingAddress(This_Val) {  
     

     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
         $.ajax({

             type: "GET",
             method: "GET",

               url: 'http://restapi.bamyc.com/Address.svc/DeleteShippingAddressById?AddressId='+$(This_Val).attr("Id"),
     
             success: ajaxSucceess, 
             error: ajaxError  
         }).done(function() { 
             $.afui.hideMask();
             ShippingAddressList();  
         });   
 
         function ajaxSucceess(response) { 
     
             };    
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
                             if (checkoutupdate_areaselect_update(txtShipping_area)) {
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
     var lastname_len =  document.forms["editaddress"]["txtShipping_LastName"].value;
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
     if (txtShipping_country.value== "0") {
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


 



function UpdateShippingAddress()   
{
     

     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
         $.ajax({

             type: "GET",
             method: "GET",
 

     
            url: ' http://restapi.bamyc.com/Address.svc/UpdateAddressInfomtion?AddresId='+window.localStorage.getItem("AddressId") +'&Firstname='+ $("#txtShipping_FirstName").val().trim() + '&Lastname='+ $("#txtShipping_LastName").val().trim() + '&Email='+ $("#txtShipping_Email").val().trim() + '&Phone='+ $("#txtShipping_Phone_Number").val().trim() + '&flat='+ $("#txtShipping_FlatNo").val().trim() + '&street='+ $("#txtBuilding_address").val().trim() + '&landmark='+ $("#txtStreet_LandMark").val().trim() + '&CountryId='+ $("#txtShipping_country").val().trim() + '&AreaId='+ $("#txtShipping_area").val().trim(),  
             success: ajaxSucceess, 
             error: ajaxError      
         }).done(function() {
             ShippingAddressList();
             $.afui.hideMask();
         });
         
         function ajaxSucceess(response) { 

                 $.afui.loadContent("#CheckoutAddressList", false, false, "fade"); 
//             $.each(JSON.parse(response.d), function(key, value) { 
//    
//           
//             });   
 
         }

         function ajaxError(response) {
         
         }
     }
 }
   

function NewAddressCountry() {
      $.afui.showMask('Loading');
  
         $.ajax({ 

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/Location.svc/Get',
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
//             
//                $("#txtShipping_country").val(SelectedCountry_Val.trim()).attr("selected", "selected");;  
//         LoadArea_Inner('txtShipping_area',SelectedCountry_Val.trim(),SelectedArea_Val.trim());
     });

     function ajaxSucceess(response) {
 
        
     $.each(JSON.parse(response.d), function(key, value) {

      $('#txt_newAddNewAddressCountry').append("<option value ='"+value.Id+"'>" + value.Name + " </option>");

  


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
            url: 'http://restapi.bamyc.com/Location.svc/GetAllArea?CountryId=' + $("#txt_newAddNewAddressCountry").val(),
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
//              $("#txtShipping_area").val(SelectedArea_Val.trim()).attr("selected", "selected");; 
//         $.afui.hideMask();
     });

     function ajaxSucceess(response) { 
//         $('#'+IdVal).empty();
//         $('#'+IdVal).append("<option value = '0'>Location</option>");
   $.each(JSON.parse(response.d), function(key, value) {


                 $('#txtnew_AddNewAddressArea').append("<option value = '" + value.Id+ "'>" + value.Name + " </option>");

  
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
         url: 'http://restapi.bamyc.com/Location.svc/Get',
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
//             
//                $("#txtShipping_country").val(SelectedCountry_Val.trim()).attr("selected", "selected");;  
//         LoadArea_Inner('txtShipping_area',SelectedCountry_Val.trim(),SelectedArea_Val.trim());
     });

     function ajaxSucceess(response) {
 
        
     $.each(JSON.parse(response.d), function(key, value) {

      $('#registration_country').append("<option value ='"+value.Id+"'>" + value.Name + " </option>");

  


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
            url: 'http://restapi.bamyc.com/Location.svc/GetAllArea?CountryId=' + $("#registration_country").val(),
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() { 
//              $("#txtShipping_area").val(SelectedArea_Val.trim()).attr("selected", "selected");; 
//         $.afui.hideMask();
     });

     function ajaxSucceess(response) { 
//         $('#'+IdVal).empty();
//         $('#'+IdVal).append("<option value = '0'>Location</option>");
   $.each(JSON.parse(response.d), function(key, value) {


                 $('#registration_area').append("<option value = '" + value.Id+ "'>" + value.Name + " </option>");

  
             }); 

     }

     function ajaxError(response) {
         //         alert(errormsg.responseText);  
     }
 }


function CheckOut()
{ 
    if(document.getElementById('toggle_today_summary_accept_Checkout').checked)
    {  
        var PaymentMethod;
      if($('#paymentmethod_0').is(':checked')) {
   PaymentMethod=$('#paymentmethod_0').val();
} 
 if($('#paymentmethod_1').is(':checked')) {
     PaymentMethod=$('#paymentmethod_1').val();
}
    $.ajax({
    type: "GET",
    method: "GET",
    url:'http://restapi.bamyc.com/Order.svc/CheckOut?Customerid='+
        window.localStorage.getItem("LoginCustomerID") + '&ShippingAddressId='+
        window.localStorage.getItem("ShippingAddressId")+
        '&PaymentMethod=' + PaymentMethod,
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
        
       
        CartProducts();
        UpdateCartCount(); 
        $(".view.splitview.active").css("background","#dcdcdc");
        $("#MainPage").css("background","#dcdcdc");
          $.afui.loadContent("#ThankyouPage", false, false, "fade");
//              $("#txtShipping_area").val(SelectedArea_Val.trim()).attr("selected", "selected");; 
//         $.afui.hideMask();
     });

     function ajaxSucceess(response) {  
//         $('#'+IdVal).empty();
//         $('#'+IdVal).append("<option value = '0'>Location</option>");
   $.each(JSON.parse(response.d), function(key, value) {
     $("#OrderNumber").text(JSON.parse(response.d));
       $("#OrderLink").attr("onclick","TrackOrderDetailsBilling("+JSON.parse(response.d)+")")
       
             }); 

     }

     function ajaxError(response) {
         //         alert(errormsg.responseText);  
     } 
    }
    else{
    alert('Accept Terms And Conditions');
    }
}

function LoadCountries_Inner1(IdVal1,SelectedCountry_Val1,SelectedArea_Val1) {
      $.afui.showMask('Loading');
  
         $.ajax({ 

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/Location.svc/Get',
         success: ajaxSucceess,
         error: ajaxError 
     }).done(function() {
             
                $("#Address_txtShipping_country").val(SelectedCountry_Val1.trim()).attr("selected", "selected");;  
         LoadArea_Inner1('Address_txtShipping_area',SelectedCountry_Val1.trim(),SelectedArea_Val1.trim());
     });

     function ajaxSucceess(response) {
 $('#'+IdVal1).empty();
         $('#'+IdVal1).append("<option value = '0'>Country</option>");
     $.each(JSON.parse(response.d), function(key, value) {


                 $('#'+IdVal1).append("<option value ='"+value.Id+"'>" + value.Name + " </option>");



             }); 

     }

     function ajaxError(response) {
         //         alert(errormsg.responseText);
     }
 }

 function LoadArea_Inner1(IdVal1,SelectedCountry_Val1,SelectedArea_Val1) {
  
   
  
         $.ajax({

         type: "GET",
         method: "GET",
            url: 'http://restapi.bamyc.com/Location.svc/GetAllArea?CountryId=' + SelectedCountry_Val1,
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
              $("#Address_txtShipping_area").val(SelectedArea_Val1.trim()).attr("selected", "selected");; 
         $.afui.hideMask();
     });

     function ajaxSucceess(response) {
         $('#'+IdVal1).empty();
         $('#'+IdVal1).append("<option value = '0'>Location</option>");
   $.each(JSON.parse(response.d), function(key, value) {


                 $('#'+IdVal1).append("<option value = '" + value.Id+ "'>" + value.Name + " </option>");


             });
  
     }
 
     function ajaxError(response) { 
         //         alert(errormsg.responseText); 
     }
 } 


function LoadCountries_InnerCustomer(IdVal1,SelectedCountry_Val1,SelectedArea_Val1) {
      $.afui.showMask('Loading');
  
         $.ajax({ 

         type: "GET",
         method: "GET",
         url: 'http://restapi.bamyc.com/Location.svc/Get',
         success: ajaxSucceess,
         error: ajaxError 
     }).done(function() {
             
                $("#CustomerInfo_country").val(SelectedCountry_Val1.trim()).attr("selected", "selected");;  
         LoadArea_InnerCustomer('CustomerInfo_area',SelectedCountry_Val1.trim(),SelectedArea_Val1.trim());
     });

     function ajaxSucceess(response) {
 $('#'+IdVal1).empty();
         $('#'+IdVal1).append("<option value = '0'>Country</option>");
     $.each(JSON.parse(response.d), function(key, value) {


                 $('#'+IdVal1).append("<option value ='"+value.Id+"'>" + value.Name + " </option>");



             }); 

     }

     function ajaxError(response) {
         //         alert(errormsg.responseText);
     }
 }

 function LoadArea_InnerCustomer(IdVal1,SelectedCountry_Val1,SelectedArea_Val1) {
  
   
  
         $.ajax({

         type: "GET",
         method: "GET",
            url: 'http://restapi.bamyc.com/Location.svc/GetAllArea?CountryId=' + SelectedCountry_Val1,
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
              $("#CustomerInfo_area").val(SelectedArea_Val1.trim()).attr("selected", "selected");; 
         $.afui.hideMask();
     });

     function ajaxSucceess(response) {
         $('#'+IdVal1).empty();
         $('#'+IdVal1).append("<option value = '0'>Location</option>");
   $.each(JSON.parse(response.d), function(key, value) {


                 $('#'+IdVal1).append("<option value = '" + value.Id+ "'>" + value.Name + " </option>");


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
                             if (new_address_areaselect_add(Address_txtnew_AddNewAddressArea)) {
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



 function new_address_firstname_validation(Address_txtnew_firstname) {
     var firstname_len = document.forms["Address_AddShippingAddress"]["Address_txtnew_firstname"].value;
     if (firstname_len == "")
     { 
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
     if (Address_txt_newAddNewAddressCountry.value== "0") {
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
 

  
 
function Address_AddNewShippingAddress()
{
    
 
     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
         $.ajax({

             type: "GET",
             method: "GET",

               url: 'http://restapi.bamyc.com/Address.svc/AddNewShippingAddress?CustomerId='+ window.localStorage.getItem("LoginCustomerID") +'&Firstname='+ $("#Address_txtnew_firstname").val().trim() + '&Lastname='+ $("#Address_txtnew_lastname").val().trim() +'&Email='+ $("#Address_txtnew_email").val().trim() + '&Phone='+ $("#Address_txtnew_phone").val().trim() + '&flat='+ $("#Address_txtnew_FlatNo").val().trim() + '&street=' + $("#Address_txtnew_streetaddress").val().trim() + '&landmark=' + $("#Address_txtnew_StreetLandMark").val().trim() + '&CountryId='+ $("#Address_txt_newAddNewAddressCountry").val().trim() + '&AreaId='+ $("#Address_txtnew_AddNewAddressArea").val().trim(), 
             
           
             success: ajaxSucceess, 
             error: ajaxError  
         }).done(function() { 
             $.afui.hideMask();  
            Address_ShippingAddressList();  
         }); 
          function ajaxSucceess(response) {  
         
              if (JSON.parse(response.d).length != 0) 
 
             {  
                 document.getElementById("Address_AddShippingAddress").reset(); 
                 $.afui.loadContent("#Address_CheckoutAddressList", false, false, "fade");
  
             } 
              
              
              
             };    
          }  

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     } 
 
 function  Address_DeleteShippingAddress(This_Val) {  
     

     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
         $.ajax({
 
             type: "GET",
             method: "GET",

               url: 'http://restapi.bamyc.com/Address.svc/DeleteShippingAddressById?AddressId='+$(This_Val).attr("Id"),
     
             success: ajaxSucceess, 
             error: ajaxError  
         }).done(function() { 
             Address_ShippingAddressList(); 
             $.afui.hideMask();
               
         });   
 
         function ajaxSucceess(response) { 
     
             };    
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
                             if (address_update_areaselect_update(Address_txtShipping_area)) {
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
     var lastname_len =document.forms["Address_editaddress"]["Address_txtShipping_LastName"].value;
     if (lastname_len== "") {
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
     if (Address_txtShipping_country.value== "0") {
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

 function  Address_EditShippingAddress(This_Val) {  
     

     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');  
           window.localStorage.setItem("AddressId",$(This_Val).attr("Id"));
        
         $.ajax({ 
           
             type: "GET",
             method: "GET",

               url: 'http://restapi.bamyc.com/Address.svc/GetShippingAddressById?AddressId='+$(This_Val).attr("Id"),
     
             success: ajaxSucceess, 
             error: ajaxError  
         }).done(function() {
             $.afui.hideMask();
         });

         function ajaxSucceess(response) { 


             $.each(JSON.parse(response.d), function(key, value) { 
     var output=$.parseXML(value.CustomAttributes);
                 $('AddressAttribute', output).each(function(i, e) {
                     if($(e).attr('ID')=="1")                         
    $("#Address_txtShipping_FlatNo").val($(e).find("AddressAttributeValue").find("Value").text());
                     
                     if($(e).attr('ID')=="2")                          
    $("#Address_txtBuildingaddress").val($(e).find("AddressAttributeValue").find("Value").text());
                      
                     if($(e).attr('ID')=="3")                         
    $("#Address_txtStreetLandMark").val($(e).find("AddressAttributeValue").find("Value").text());
                     
                      
                    
});
             LoadCountries_Inner1('Address_txtShipping_country',value.CountryId.toString().trim(),value.StateProvinceId.toString().trim()); 
                 
                   $("#Address_txtShipping_FirstName").val(value.FirstName); 
                   $("#Address_txtShipping_LastName").val(value.LastName);   
                   $("#Address_txtShipping_Email").val(value.Email); 
                   $("#Address_txtShipping_Phone_Number").val(value.Phone_Number); 
                  
 
//                                $("#Quantity_" + ProductId).val(Number($("#Quantity_" + ProductId).val()) + 1);
  
             });   
 
         }

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }
 }
 



function Address_UpdateShippingAddress()   
{
     

     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
         $.ajax({

             type: "GET", 
             method: "GET",
          url: ' http://restapi.bamyc.com/Address.svc/UpdateAddressInfomtion?AddresId='+window.localStorage.getItem("AddressId") +'&Firstname='+ $("#Address_txtShipping_FirstName").val().trim() + '&Lastname='+ $("#Address_txtShipping_LastName").val().trim() + '&Email='+ $("#Address_txtShipping_Email").val().trim() + '&Phone='+ $("#Address_txtShipping_Phone_Number").val().trim() + '&flat='+ $("#Address_txtShipping_FlatNo").val().trim() + '&street='+ $("#Address_txtBuilding_address").val().trim() + '&landmark='+ $("#Address_txtStreet_LandMark").val().trim() + '&CountryId='+ $("#Address_txtShipping_country").val().trim() + '&AreaId='+ $("#Address_txtShipping_area").val().trim(), 
			 success: ajaxSucceess, 
             error: ajaxError      
         }).done(function() { 
                Address_ShippingAddressList(); 
             $.afui.hideMask();
         }); 
         
         function ajaxSucceess(response) { 
  
                 $.afui.loadContent("#Address_CheckoutAddressList", false, false, "fade"); 
//             $.each(JSON.parse(response.d), function(key, value) { 
//    
//           
//             });   
 
         }

         function ajaxError(response) {
         
         }
     }
 }
        


 function Address_ShippingAddressList() {
      
     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
         $.ajax({

             type: "GET",
             method: "GET",

               url: 'http://restapi.bamyc.com/Address.svc/CustomerShippingAddress?CustomerId=' + window.localStorage.getItem('LoginCustomerID'),  

             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
             $.afui.hideMask();
         });

         function ajaxSucceess(response) {
 $('#Address_Shippingdetails_addlist').empty(); 

             $.each(JSON.parse(response.d), function(key, value) {
               


                  $('#Address_Shippingdetails_addlist').append(Address_ShippingAddressListHtml(value.Id,value.FirstName, value.Email, value.Phone_Number, value.Area, value.Country));
                 
               
 
             });
 
         }

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }
 }


function Address_ShippingAddressListHtml(AddressId,FirstName,Email, Phone_Number, Area,Country)
 
{
     var Html;  
 
     Html = "<div class='shippingtitle'>" + 
         "<strong>" + FirstName + "</strong>" +
         " <a href='#'  class='shippingaddresslist' id='"+AddressId+"' onclick='Address_DeleteShippingAddress(this)'><i class='fa fa-trash-o' aria-hidden='true'></i></a>" +
         "<a href='#Address_EditAddress'  id='"+AddressId+"' onclick='Address_EditShippingAddress(this)' class='shippingaddresslist'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>" +
         "</div>" + 
         " <div class='ShippingAddress'>" +
         " <span>" + Email + "</span>" +  
         "<span>" + Phone_Number + "</span>" +  
//         "<span>T-54</span>" +  
//         " <span>Technosware Kazhakuttam</span>" + 
//         "<span>Near Railway Station</span>" +
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
         url: 'http://restapi.bamyc.com/Location.svc/Get',
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
//             
//                $("#txtShipping_country").val(SelectedCountry_Val.trim()).attr("selected", "selected");;  
//         LoadArea_Inner('txtShipping_area',SelectedCountry_Val.trim(),SelectedArea_Val.trim());
     });

     function ajaxSucceess(response) {
 
        
     $.each(JSON.parse(response.d), function(key, value) {

      $('#Address_txt_newAddNewAddressCountry').append("<option value ='"+value.Id+"'>" + value.Name + " </option>");

  


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
            url: 'http://restapi.bamyc.com/Location.svc/GetAllArea?CountryId=' + $("#Address_txt_newAddNewAddressCountry").val(),
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
//              $("#txtShipping_area").val(SelectedArea_Val.trim()).attr("selected", "selected");; 
//         $.afui.hideMask();
     });

     function ajaxSucceess(response) { 
//         $('#'+IdVal).empty();
//         $('#'+IdVal).append("<option value = '0'>Location</option>");
   $.each(JSON.parse(response.d), function(key, value) {


                 $('#Address_txtnew_AddNewAddressArea').append("<option value = '" + value.Id+ "'>" + value.Name + " </option>");

  
             }); 

     } 

     function ajaxError(response) { 
         //         alert(errormsg.responseText);  
     }
 } 
 
function ProfileLoad(){
 
      
       if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
     
         $.afui.showMask('Loading'); 
        
         $.ajax({ 
           
             type: "GET",
             method: "GET",
             url: 'http://restapi.bamyc.com/Customer.svc/CustomerInfo?CustomerId='+window.localStorage.getItem('LoginCustomerID'),
             success: ajaxSucceess, 
             error: ajaxError  
         }).done(function() {
             $.afui.hideMask();
         });

         function ajaxSucceess(response) { 


             $.each(JSON.parse(response.d), function(key, value) { 
  
                   $("#ProfileName").html(value.FirstName +' '+value.LastName); 
                   $("#ProfileEmail").text(value.Email); 
                 $("#ProfileEdit").css("visibility","visible");
                   if(value.Picture!='0')
                     {
                      $(".avathar").css("background-image","url('"+value.Picture+"')");
                      }
                    else{
                         $(".avathar").css("background-image","url('img/User.png')");
                    
                  
                    }
                      
                     
});
             
                 
                 
                  
 
//                                $("#Quantity_" + ProductId).val(Number($("#Quantity_" + ProductId).val()) + 1);
  
             }  

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
       }
    else{
          $("#ProfileName").html(''); 
                   $("#ProfileEmail").text(''); 
                   
                   $(".avathar").css("background-image","url('img/User.png')");
                   $("#ProfileEdit").css("visibility","hidden");
    }
   
 }
      
 function CustomerInformation(){

      $.afui.clearHistory();
     
     
         $.afui.showMask('Loading'); 
        
         $.ajax({ 
           
             type: "GET",
             method: "GET",
             url: 'http://restapi.bamyc.com/Customer.svc/CustomerInfo?CustomerId='+window.localStorage.getItem('LoginCustomerID'),
             success: ajaxSucceess, 
             error: ajaxError  
         }).done(function() {
             $.afui.hideMask();
         });

         function ajaxSucceess(response) { 


             $.each(JSON.parse(response.d), function(key, value) { 
   LoadCountries_InnerCustomer('CustomerInfo_country',value.CountryId.toString().trim(),value.StateProvinceId.toString().trim()); 
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
     
function CustomerInfo_Update()
  {
     var CustomerInfo_firstname =  $("#CustomerInfo_firstname").val(); 
     var CustomerInfo_lastname = $("#CustomerInfo_lastname").val();
     var CustomerInfo_email =  $("#CustomerInfo_email").val();
     var CustomerInfo_phone = $("#CustomerInfo_phone").val();
     var CustomerInfo_address = $("#CustomerInfo_address").val();
     var CustomerInfo_country = $("#CustomerInfo_country").val();
     var CustomerInfo_area = $("#CustomerInfo_area").val();
        
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
     if (CustomerInfo_country.value== "0") {
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

function CustomerInfoUpdateSave()   
{
     

     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
         $.ajax({

             type: "GET", 
             method: "GET",
             url: 'http://restapi.bamyc.com/Customer.svc/CustomerInfoUpdate?CustomerId='+ window.localStorage.getItem("LoginCustomerID") + '&FirstName=' + $("#CustomerInfo_firstname").val() + '&LastName=' + $("#CustomerInfo_lastname").val() +
        '&StreetAddress='+ $("#CustomerInfo_address").val() + '&CountryId=' + $("#CustomerInfo_country").val() + '&StateProvinceId=' + $("#CustomerInfo_area").val() + '&Phone=' + $("#CustomerInfo_phone").val(), 
			 success: ajaxSucceess, 
             error: ajaxError      
         }).done(function() {
            // CustomerInformation();
             $.afui.hideMask();
         }); 
         
         function ajaxSucceess(response) {  
  
                 alert('Customer Info SuccessFully Updated');   
 
         }

         function ajaxError(response) {
         
         }
     }
 }
       
function GetAllCategoryProducts_Quantity(CategoryId)
{
    

     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
        
        
         $.ajax({           

             type: "GET",
             method: "GET",
             url: 'http://restapi.bamyc.com/Category.svc/GetAllCategoryProducts_Quantity?CustomerId=' + window.localStorage.getItem('LoginCustomerID')+'&CategoryId='+CategoryId,
             success: ajaxSucceess, 
             error: ajaxError
         }).done(function() {
             $.afui.hideMask(); 
         });
  
         function ajaxSucceess(response) {

            $.each(JSON.parse(response.d), function(key, value) {
            if(value.ShoppingCartTypeId==1)
                {
                 $("#Cart_L_"+value.ProductId+"_"+CategoryId+"_Promotion").html(value.Quantity);
                  $("#Cart_L_"+value.ProductId+"_"+CategoryId+"_Promotion").css("display","block"); 
                    
                    $("#Cart_L_"+value.ProductId+"_"+CategoryId+"_Category").html(value.Quantity);
                  $("#Cart_L_"+value.ProductId+"_"+CategoryId+"_Category").css("display","block");
                }
                else{
                   $("#Wish_L_"+value.ProductId+"_"+CategoryId+ "_Promotion i").attr("class","fa fa-heart");
                   $("#Wish_L_"+value.ProductId+"_"+CategoryId+ "_Promotion").removeAttr("onclick");
                
                      $("#Wish_L_"+value.ProductId+"_"+CategoryId+ "_Category i").attr("class","fa fa-heart");
                   $("#Wish_L_"+value.ProductId+"_"+CategoryId+ "_Category").removeAttr("onclick");
                }
                
             });
         }
 

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }

     } 
     else {
       
        $.afui.showMask('Loading');
         $.ajax({

             type: "GET",
             method: "GET",
            url: 'http://restapi.bamyc.com/Category.svc/GetAllCategoryProducts_Quantity?CustomerId=' + window.localStorage.getItem('LogOutCustomerId')+'&CategoryId='+CategoryId,
             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
                      $.afui.hideMask(); 
           
         });

         function ajaxSucceess(response) {

                      
             $.each(JSON.parse(response.d), function(key, value) {
                 
               if(value.ShoppingCartTypeId==1)
                {
                 $("#Cart_L_"+value.ProductId+"_"+CategoryId+"_Promotion").html(value.Quantity);
                  $("#Cart_L_"+value.ProductId+"_"+CategoryId+"_Promotion").css("display","block"); 
                    
                    $("#Cart_L_"+value.ProductId+"_"+CategoryId+"_Category").html(value.Quantity);
                  $("#Cart_L_"+value.ProductId+"_"+CategoryId+"_Category").css("display","block");
                }
                else{
                   $("#Wish_L_"+value.ProductId+"_"+CategoryId+ "_Promotion i").attr("class","fa fa-heart");
                   $("#Wish_L_"+value.ProductId+"_"+CategoryId+ "_Promotion").removeAttr("onclick");
                
                      $("#Wish_L_"+value.ProductId+"_"+CategoryId+ "_Category i").attr("class","fa fa-heart");
                   $("#Wish_L_"+value.ProductId+"_"+CategoryId+ "_Category").removeAttr("onclick");
                }
             });
         }

  
         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }
     }
 }


function GetProductDetails_Quantity(ThisVal)
{ 
     $.afui.clearHistory();

     if (window.localStorage.getItem('LoginCustomerID') != 'null' && window.localStorage.getItem('LoginCustomerID') != null) {
         $.afui.showMask('Loading');
        
         $.ajax({

             type: "GET",
             method: "GET",
//             url: 'http://restapi.bamyc.com/Product.svc/GetProductDetails_Quantity?ProductId=' + $(ThisVal).attr("data-productid")'&CustomerId='+window.localStorage.getItem('LoginCustomerID'),
             success: ajaxSucceess,    
             error: ajaxError 
         }).done(function() {
             $.afui.hideMask(); 
         });
  
         function ajaxSucceess(response) {
 
             $.each(JSON.parse(response.d), function(key, value) {
                 
                
             });
         }
  

         function ajaxError(response) {
             //         alert(errormsg.responseText); 
         }

     } 
     else {
       
        $.afui.showMask('Loading');
         $.ajax({

             type: "GET",
             method: "GET",
//             url: 'http://restapi.bamyc.com/Product.svc/GetProductDetails_Quantity?ProductId=' + $(ThisVal).attr("data-productid")'&CustomerId='+window.localStorage.getItem('LoginCustomerID'),
             success: ajaxSucceess,
             error: ajaxError
         }).done(function() {
                      $.afui.hideMask(); 
           
         });

         function ajaxSucceess(response) {

                      
             $.each(JSON.parse(response.d), function(key, value) {
                 
                
             });
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
         url: 'http://restapi.bamyc.com/Category.svc/Get',
         success: ajaxSucceess,
         error: ajaxError
     }).done(function() {
         $.afui.hideMask();
     });

     function ajaxSucceess(response) {

         $('#popular').empty();
       $.each(JSON.parse(response.d), function(key, value) { 

//             var Cat_Id = "Category_" + value.Id;
//             var Cat_Page = "#CategoryPage_" + value.Id;
             $('#popular').append("<li><img  src='images/Popular.png' /><strong id='Strong'>"+value.Name+"</strong></li>");
             });
     } 

     function ajaxError(response) {
         //         alert(errormsg.responseText);
     }
 }

// // function createCookie(name, value, days) {
 //     if (days) {
 //         var date = new Date();
 //         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
 //         var expires = "; expires=" + date.toGMTString();
 //     } else var expires = "";
 //     document.cookie = name + "=" + value + expires + "; path=/";
 // }
 //   
 // function readCookie(name) {
 //     var nameEQ = name + "=";
 //     var ca = document.cookie.split(';');
 //     for (var i = 0; i < ca.length; i++) {
 //         var c = ca[i];
 //         while (c.charAt(0) == ' ') c = c.substring(1, c.length);
 //         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
 //     }
 //     return null;  
 // }

 /*$(window).scroll(function () {
     
       
     
    if ($(window).scrollTop() == $("#MainPage").height() - $(window).height()) {
        
          alert($(window).scrollTop());
         alert($(document).height());  
         alert($(window).height()); 
 }
 });*/

 //$(window).scroll(function() {
 ////     alert('X');
 //    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
 //       alert('A');
 //    } else {
 //         alert('B');    
 //    }
 //});