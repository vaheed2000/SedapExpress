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
    public class ShoppingCart
    {
        // To use HTTP GET, add [WebGet] attribute. (Default ResponseFormat is WebMessageFormat.Json)
        // To create an operation that returns XML,
        //     add [WebGet(ResponseFormat=WebMessageFormat.Xml)],
        //     and include the following line in the operation body:
        //         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";
        [OperationContract]
        [WebGet]
        public string GetAllCartedItems(int? CustomerId)
        {
            List<GetAllCartedItems_Result> obj = new List<GetAllCartedItems_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetAllCartedItems(CustomerId).ToList<GetAllCartedItems_Result>();
            }

            return JsonConvert.SerializeObject(obj);


        }

        [OperationContract]
        [WebGet]
        public string ShoppingCartAddItem(int ProductId ,int ShoppingcartId ,int? CustomerId,int Quantity,int StoreId,string From)
        {
            List<int> obj = new List<int>();
            int result;

            using (var entities = new SedapExpressEntities())
            {
                result = entities.ShoppingCartAddItem(ProductId, ShoppingcartId, CustomerId, Quantity, StoreId, From);
            }

            return JsonConvert.SerializeObject(result);


        }

        [OperationContract]
        [WebGet]
        public string ShoppingCartCount(int? CustomerId)
        {
            string CartCount=string.Empty;
            List<Nullable<int>> obj = new List<Nullable<int>>();

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.ShoppingCartCount(CustomerId).ToList<Nullable<int>>();
            }
            foreach(int val in obj)
            {
                CartCount = val.ToString();
            }
            return JsonConvert.SerializeObject(CartCount);


        }


        [OperationContract]
        [WebGet]
        public string DeleteProductFromCart(int? CustomerId, int ProductId)
        {
            int result;
            List<int> obj = new List<int>();

            using (var entities = new SedapExpressEntities())
            {
                result = entities.DeleteProductFromCart(CustomerId, ProductId);
            }

            return JsonConvert.SerializeObject(result);

        }


        [OperationContract]
        [WebGet]
        public string CartItemUpdate(int? CustomerId, int ProductId,int Type)
        {
            List<Nullable<int>> obj = new List<Nullable<int>>();

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.CartItemNumberUpdate(CustomerId, ProductId, Type).ToList<Nullable<int>>();
            }

            return JsonConvert.SerializeObject(obj);

        }


        [OperationContract]
        [WebGet]
        public string CartAmountTotal(int? CustomerId)
        {
           
            List<CartAmountTotal_Result> obj = new List<CartAmountTotal_Result>();

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.CartAmountTotal(CustomerId).ToList<CartAmountTotal_Result>();
            }

            return JsonConvert.SerializeObject(obj);

        }

        [OperationContract]
        [WebGet]
        public string ShoppingCartSynchronization(int LogInCustomerId, int LogOutCustomerId,int shoppingcarttypeId)
        {
            int result;
            List<int> obj = new List<int>();

            using (var entities = new SedapExpressEntities())
            {
                result = entities.ShoppingCartSynchronization(LogInCustomerId, LogOutCustomerId, shoppingcarttypeId);
            }

            return JsonConvert.SerializeObject(result);

        }
        // Add more operations here and mark them with [OperationContract]
    }
}
