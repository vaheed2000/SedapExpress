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
    public class Location
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

            List<GetAllCountries_Result> obj = new List<GetAllCountries_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetAllCountries().ToList<GetAllCountries_Result>();
            }

            return JsonConvert.SerializeObject(obj);

        
        }
        
        [OperationContract]
        [WebGet]
        public string GetAllArea(string CountryId)
        {

            List<GetAllAreas_Result> obj = new List<GetAllAreas_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetAllAreas(CountryId).ToList<GetAllAreas_Result>();
            }

            return JsonConvert.SerializeObject(obj);


        }

        //[OperationContract]
        //public AreaData GetArea(int CountryId)
        //{
        //    string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        //    using (SqlConnection con = new SqlConnection(constr))
        //    {
        //        using (SqlCommand cmd = new SqlCommand("select * from StateProvince where CountryId=" + CountryId))
        //        {
        //            using (SqlDataAdapter sda = new SqlDataAdapter())
        //            {
        //                cmd.Connection = con;
        //                sda.SelectCommand = cmd;
        //                using (DataTable dt = new DataTable())
        //                {
        //                    AreaData area = new AreaData();
        //                    sda.Fill(area.AreaTable);
        //                    return area;
        //                }
        //            }
        //        }
        //    }
        //}

        // Add more operations here and mark them with [OperationContract]
    }
}
