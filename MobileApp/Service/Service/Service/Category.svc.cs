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
    public class Category
    {
        // To use HTTP GET, add [WebGet] attribute. (Default ResponseFormat is WebMessageFormat.Json)
        // To create an operation that returns XML,
        //     add [WebGet(ResponseFormat=WebMessageFormat.Xml)],
        //     and include the following line in the operation body:
        //         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";
        [OperationContract]
        [WebGet]
        public string Get()
        {

            List<GetAllCategories_Result> obj = new List<GetAllCategories_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetAllCategories().ToList<GetAllCategories_Result>();
            }

            return JsonConvert.SerializeObject(obj);


        }

        //[OperationContract]
        //[WebGet]
        //public string getCategoriesList(int count)
        //{

        //    List<GetCategoriesList_Result> obj = new List<GetCategoriesList_Result>();
        //    using (var entities= new SedapExpressEntities())
        //    {
        //        obj = entities.GetCategoriesList(count).ToList<GetCategoriesList_Result>();
        //    }

        //      return JsonConvert.SerializeObject(obj);
        //}

        [OperationContract]
        [WebGet]
        public string GetAllCategoryProducts_Quantity(int CustomerId ,int CategoryId)
        {

            List<GetAllCategoryProducts_Quantity_Result> obj = new List<GetAllCategoryProducts_Quantity_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetAllCategoryProducts_Quantity(CustomerId, CategoryId).ToList<GetAllCategoryProducts_Quantity_Result>();
            }

            return JsonConvert.SerializeObject(obj);


        }
        // Add more operations here and mark them with [OperationContract]
    }
}
