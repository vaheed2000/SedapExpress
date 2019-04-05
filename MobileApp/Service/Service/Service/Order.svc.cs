using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
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
    public class Order
    {
        // To use HTTP GET, add [WebGet] attribute. (Default ResponseFormat is WebMessageFormat.Json)
        // To create an operation that returns XML,
        //     add [WebGet(ResponseFormat=WebMessageFormat.Xml)],
        //     and include the following line in the operation body:
        //         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";
        //[OperationContract]
        //[WebGet]
        //public string GetAllOrderlist(int CustomerId)
        //{
        //    List<GetCustomerInformation_Result> obj = new List<GetCustomerInformation_Result>();


        //    using (var entities = new SedapExpressEntities())
        //    {
        //        obj = entities.GetCustomerInformation(CustomerId).ToList<GetCustomerInformation_Result>();
        //    }

        //    return JsonConvert.SerializeObject(obj);


        //}


        //[OperationContract]
        //[WebGet]
        //public string GetOrderDetails (int OrderId)
        //{
        //    List<GetOrderDetails_Result> obj = new List<GetOrderDetails_Result>();


        //    using (var entities = new SedapExpressEntities())
        //    {
        //        obj = entities.GetOrderDetails(OrderId).ToList<GetOrderDetails_Result>();
        //    }

        //    return JsonConvert.SerializeObject(obj);


        //}


        //[OperationContract]
        //[WebGet]
        //public string GetOrderList(int CustomerId)
        //{
        //    List<GetAllOrderList_Result> obj = new List<GetAllOrderList_Result>();


        //    using (var entities = new SedapExpressEntities())
        //    {
        //        obj = entities.GetAllOrderList(CustomerId).ToList<GetAllOrderList_Result>();
        //    }

        //    return JsonConvert.SerializeObject(obj);


        //}
  

        [OperationContract]
        [WebGet]
        public string GetOrderBillingAddress(int OrderId)
        {
            List<GetOrderBillingAddress_Result> obj = new List<GetOrderBillingAddress_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetOrderBillingAddress(OrderId).ToList<GetOrderBillingAddress_Result>();
            }

            return JsonConvert.SerializeObject(obj);

        }


        [OperationContract]
        [WebGet]
        public string GetOrderShippingAddress(int OrderId)
        {
            List<GetOrderShippingAddress_Result> obj = new List<GetOrderShippingAddress_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetOrderShippingAddress(OrderId).ToList<GetOrderShippingAddress_Result>();
            }

            return JsonConvert.SerializeObject(obj);

        }


        [OperationContract]
        [WebGet]
        public string getOrderedProducts(int OrderId)
        {
            List<getOrderedProducts_Result> obj = new List<getOrderedProducts_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.getOrderedProducts(OrderId).ToList<getOrderedProducts_Result>();
            }

            return JsonConvert.SerializeObject(obj);

        }

        [OperationContract]
        [WebGet]
        public string TrackOrderDetails(int CustomerId)
        {
            List<TrackOrderDetails_Result> obj = new List<TrackOrderDetails_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.TrackOrderDetails(CustomerId).ToList<TrackOrderDetails_Result>();
            }

            return JsonConvert.SerializeObject(obj);

        }

        [OperationContract]
        [WebGet]
         public string CheckOut(int Customerid, int ShippingAddressId, string PaymentMethod)
         {

             List<int?> obj=new List<int?>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.CheckOut(Guid.NewGuid(), Guid.NewGuid(), Customerid, ShippingAddressId, PaymentMethod).ToList<int?>();
            }

            return JsonConvert.SerializeObject(obj);

          }

        [OperationContract]
        [WebGet]
        public string OrderProductDetails(int OrderId)
        {
            List<OrderProductDetails_Result> obj = new List<OrderProductDetails_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.OrderProductDetails(OrderId).ToList<OrderProductDetails_Result>();
            }

            return JsonConvert.SerializeObject(obj);


        }


        [OperationContract]
        [WebGet]
        public string OrderAmountTotal(int OrderId)
        {
            List<OrderAmountTotal_Result> obj = new List<OrderAmountTotal_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.OrderAmountTotal(OrderId).ToList<OrderAmountTotal_Result>();
            }

            return JsonConvert.SerializeObject(obj);


        }

        [OperationContract]
        [WebGet]
        public string Orderly()
        {
            List<GetOrderStatus_Result> obj = new List<GetOrderStatus_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetOrderStatus().ToList<GetOrderStatus_Result>();
            }

            return JsonConvert.SerializeObject(obj);
        }


        [OperationContract]
        [WebGet]
        public string OrderlyDetails(int OrderStatusId)
        {
            List<OrderlyDetails_Result> obj = new List<OrderlyDetails_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.OrderlyDetails(OrderStatusId).ToList<OrderlyDetails_Result>();
            }

            return JsonConvert.SerializeObject(obj);
        }


        [OperationContract]
        [WebGet]
        public string OrderlyStatusUpdate(int OrderId,int OrderStatusId)
        {
            int obj;


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.UpdateOrderStatus(OrderId, OrderStatusId);
            }

            return JsonConvert.SerializeObject(obj);
        }

        [OperationContract]
        [WebGet]
        public string UpdateOrderInvoice(int OrderId, long InvoicNo)
        {
            int obj;


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.UpdateOrderInvoic(OrderId, InvoicNo);
            }

          

                return JsonConvert.SerializeObject(obj);
        }

        private DataTable GetLocalStoreData(string Query)
        {

            DataTable dt = new DataTable();
            try
            { 
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["BamycStore"].ToString());
                SqlCommand cmd = new SqlCommand(Query, conn);
                conn.Open();

                // create data adapter
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                // this will query your database and return the result to your datatable
                da.Fill(dt);
                conn.Close();
                da.Dispose();
            }
            catch (Exception ex)
            {
               // Common.WriteErrorLog("Error : " + ex.Message);
            }
            return dt;
        }

        [OperationContract]
        [WebGet]
        public string DeliveryOrderStatus()
        {
            List<DeliveryOrderStatus_Result> obj = new List<DeliveryOrderStatus_Result>();

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.DeliveryOrderStatus().ToList<DeliveryOrderStatus_Result>();
            }

            return JsonConvert.SerializeObject(obj);
        }

        [OperationContract]
        [WebGet]
        public string SetDeliveryProof(int OrderId, string FileName, string Type)
        {
            int obj;

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.SetDeliveryProof(OrderId, FileName, Type);
            }

            return JsonConvert.SerializeObject(obj);
        }

        //[OperationContract]
        //[WebGet]
        //public string GetOrderProof(int OrderId,string Type)
        //{
        //    List<GetOrderProof_Result1> obj = new List<GetOrderProof_Result1>();

        //    using (var entities = new SedapExpressEntities())
        //    {
        //        obj = entities.GetOrderProof(OrderId, Type).ToList<GetOrderProof_Result1>();
        //    }

        //    return JsonConvert.SerializeObject(obj);
        //}

        [OperationContract]
        [WebGet]
        public string GetOrderSignature(int OrderId, string Type)
        {
            List<GetOrderSignature_Result> obj = new List<GetOrderSignature_Result>();

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetOrderSignature(OrderId, Type).ToList<GetOrderSignature_Result>();
            }

            return JsonConvert.SerializeObject(obj);
        }


        [OperationContract]
          [WebInvoke(Method = "POST")]
          public string AddDeliveryDetails(int OrderId, string Type, string Image)
          {
              int obj;

              using (var entities = new SedapExpressEntities())
              {
                  obj = entities.AddDeliveryDetails(OrderId, Type, Image);
              }

              return JsonConvert.SerializeObject(obj);
          }

          [OperationContract]
          [WebGet]
          public string DeleteProofAndSignature(int Id)
          {
              int obj ;

              using (var entities = new SedapExpressEntities())
              {
                  obj = entities.DeleteProofAndSignature(Id);
              }

              return JsonConvert.SerializeObject(obj);
          }


          [OperationContract]
          [WebGet]
          public string UpdateOrderedProductDetails(int OrderId, string Sku, int ItemWeight, int Quantity, int Price, int TotalPrice)
          {
         
              int obj;

              using (var entities = new SedapExpressEntities())
              {
                  obj = entities.UpdateOrderedProductDetails(OrderId, Sku,ItemWeight,Quantity,Price,TotalPrice);
              }

              return JsonConvert.SerializeObject(obj);
          }


          [OperationContract]
          [WebGet]
          public string TrackingInformations(int CustomerId,int OrderId,string Latitude,string Longitude,string Altitude,string Accuracy,
		  string Altitude_Accuracy,string Heading,string Speed,string Timestamp,string IMEI)
          {

              int obj;

              using (var entities = new SedapExpressEntities())
              {
                  obj = entities.TrackingInformations(CustomerId,OrderId,Latitude,Longitude,Altitude,Accuracy,
		                      Altitude_Accuracy,Heading,Speed,Timestamp,IMEI);
              }

              return JsonConvert.SerializeObject(obj);
          }

          [OperationContract]
          [WebGet]
          public string DutyAddUpdate(int CustomerId, string DutyStatus, string DutyON, string DutyOFF)
          {

              int obj;

              using (var entities = new SedapExpressEntities())
              {
                  obj = entities.DutyAddUpdate(CustomerId, DutyStatus, DutyON, DutyOFF);
              }

              return JsonConvert.SerializeObject(obj);
          }


        // Add more operations here and mark them with [OperationContract]


    }

}