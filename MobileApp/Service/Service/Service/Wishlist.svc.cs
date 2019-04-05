using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;

namespace BamycServiceAjax
{
    [ServiceContract(Namespace = "http://13.67.53.208:8088/")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class Wishlist
    {
        // To use HTTP GET, add [WebGet] attribute. (Default ResponseFormat is WebMessageFormat.Json)
        // To create an operation that returns XML,
        //     add [WebGet(ResponseFormat=WebMessageFormat.Xml)],
        //     and include the following line in the operation body:
        //         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";
        [OperationContract]
        [WebGet]
        public string GetAllWishlistItems(int? CustomerId)
        {
            List<GetAllWishlistItems_Result> obj = new List<GetAllWishlistItems_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetAllWishlistItems(CustomerId).ToList<GetAllWishlistItems_Result>();
            }

            return JsonConvert.SerializeObject(obj);
        }

        [OperationContract]
        [WebGet]
        public string AddToWishlist(int ProductId, int? CustomerId, int Quantity)
        {
            List<int> obj = new List<int>();
            int result;

            using (var entities = new SedapExpressEntities())
            {
                result = entities.AddToWishlist(ProductId, CustomerId, Quantity);
            }

            return JsonConvert.SerializeObject(result);
        }

        [OperationContract]
        [WebGet]
        public string ShoppingCartCount(int? CustomerId)
        {
            string CartCount = string.Empty;
            List<Nullable<int>> obj = new List<Nullable<int>>();

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.ShoppingCartCount(CustomerId).ToList<Nullable<int>>();
            }
            foreach (int val in obj)
            {
                CartCount = val.ToString();
            }
            return JsonConvert.SerializeObject(CartCount);


        }

        [OperationContract]
        [WebGet]
        public string AddToCartFromWishlist(int ShoppingCartId)
        {
            int result;
            List<int> obj = new List<int>();

            using (var entities = new SedapExpressEntities())
            {
                result = entities.AddToCartFromWishlist(ShoppingCartId);
            }

            return JsonConvert.SerializeObject(result);

        }

        [OperationContract]
        [WebGet]
        public string GetWishlistCount(int CustomerId)
        {
            string CartCount = string.Empty;
            List<Nullable<int>> obj = new List<Nullable<int>>();

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetWishlistCount(CustomerId).ToList<Nullable<int>>();
            }
            foreach (int val in obj)
            {
                CartCount = val.ToString();
            }
            return JsonConvert.SerializeObject(CartCount);

        }

        [OperationContract]
        [WebGet]
        public string DeleteProductFromWishlist(int? CustomerId, int ProductId)
        {
            List<int> obj = new List<int>();
            int result;

            using (var entities = new SedapExpressEntities())
            {
                result = entities.DeleteProductFromWishlist(CustomerId, ProductId);
            }

            return JsonConvert.SerializeObject(result);
        }

        [OperationContract]
        [WebGet]
        public string WishItemUpdate(int? CustomerId, int ProductId, int Type)
        {
            List<Nullable<int>> obj = new List<Nullable<int>>();

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.WishListItemNumberUpdate(CustomerId, ProductId, Type).ToList<Nullable<int>>();
            }

            return JsonConvert.SerializeObject(obj);

        }


        [OperationContract]
        [WebGet]
        public string WishlistSynchronization(int LogInCustomerId, int LogOutCustomerId, int shoppingcarttypeId)
        {
            int result;
            List<int> obj = new List<int>();

            using (var entities = new SedapExpressEntities())
            {
                result = entities.WishlistSynchronization(LogInCustomerId, LogOutCustomerId, shoppingcarttypeId);
            }

            return JsonConvert.SerializeObject(result);

        }

    }
}
