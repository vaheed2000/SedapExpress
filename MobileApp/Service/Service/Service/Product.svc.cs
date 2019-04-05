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
    public class Product
    {
        // To use HTTP GET, add [WebGet] attribute. (Default ResponseFormat is WebMessageFormat.Json)
        // To create an operation that returns XML,
        //     add [WebGet(ResponseFormat=WebMessageFormat.Xml)],
        //     and include the following line in the operation body:
        //         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";

        [OperationContract]
        [WebGet]
        public String GetAllCategoryProducts(string CategoryId, string PageSize, string PageNumber)
        {
            List<GetAllCategoryProducts_Result> obj = new List<GetAllCategoryProducts_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetAllCategoryProducts(Convert.ToInt32(CategoryId), Convert.ToInt32(PageSize), Convert.ToInt32(PageNumber)).ToList<GetAllCategoryProducts_Result>();

            }
            return JsonConvert.SerializeObject(obj);

        }
        //[OperationContract]
        //[WebGet]
        //public string GetAllSearchProducts(string CategoryId,int currentStoreId, string searchTerms, bool searchInDescriptions, 
        //    bool searchInProductTags, int workingLanguageId, int pageNumber, int pageSize)
        //{
        //    try
        //    {
        //        List<Product> ObjList = new List<Product>();
        //        DataTable dt = new DataTable();
        //        using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["BamycLive"].ToString()))
        //        {
        //            using (SqlCommand cmd = new SqlCommand("ProductLoadAllPaged", con))
        //            {
        //                cmd.CommandType = CommandType.StoredProcedure;
        //                cmd.Parameters.Add("@CategoryIds", SqlDbType.NVarChar).Value = CategoryId;
        //                cmd.Parameters.Add("@ManufacturerId", SqlDbType.Int).Value = 0;
        //                cmd.Parameters.Add("@StoreId", SqlDbType.Int).Value = currentStoreId;
        //                cmd.Parameters.Add("@VendorId", SqlDbType.Int).Value = 0;
        //                cmd.Parameters.Add("@WarehouseId", SqlDbType.Int).Value = 0;
        //                cmd.Parameters.Add("@ProductTypeId", SqlDbType.Int).Value = DBNull.Value;
        //                cmd.Parameters.Add("@VisibleIndividuallyOnly", SqlDbType.Bit).Value = true;
        //                cmd.Parameters.Add("@MarkedAsNewOnly", SqlDbType.Bit).Value = false;
        //                cmd.Parameters.Add("@ProductTagId", SqlDbType.Int).Value = 0;
        //                cmd.Parameters.Add("@FeaturedProducts", SqlDbType.Bit).Value = DBNull.Value;
        //                cmd.Parameters.Add("@PriceMin", SqlDbType.Decimal).Value = DBNull.Value;
        //                cmd.Parameters.Add("@PriceMax", SqlDbType.Decimal).Value = DBNull.Value;
        //                cmd.Parameters.Add("@Keywords", SqlDbType.NVarChar).Value = searchTerms;
        //                cmd.Parameters.Add("@SearchDescriptions", SqlDbType.Bit).Value = false;
        //                cmd.Parameters.Add("@SearchSku", SqlDbType.Bit).Value = false;
        //                cmd.Parameters.Add("@SearchProductTags", SqlDbType.Bit).Value = false;
        //                cmd.Parameters.Add("@UseFullTextSearch", SqlDbType.Bit).Value = false;
        //                cmd.Parameters.Add("@FullTextMode", SqlDbType.Int).Value = 0;
        //                cmd.Parameters.Add("@FilteredSpecs", SqlDbType.NVarChar).Value = "";
        //                cmd.Parameters.Add("@LanguageId", SqlDbType.Int).Value = workingLanguageId;
        //                cmd.Parameters.Add("@OrderBy", SqlDbType.Int).Value = 0;
        //                cmd.Parameters.Add("@AllowedCustomerRoleIds", SqlDbType.NVarChar).Value = "1,2,3";
        //                cmd.Parameters.Add("@PageIndex", SqlDbType.Int).Value = pageNumber;
        //                cmd.Parameters.Add("@PageSize", SqlDbType.Int).Value = pageSize;
        //                cmd.Parameters.Add("@ShowHidden", SqlDbType.Bit).Value = false;
        //                cmd.Parameters.Add("@OverridePublished", SqlDbType.Bit).Value = DBNull.Value;
        //                cmd.Parameters.Add("@LoadFilterableSpecificationAttributeOptionIds", SqlDbType.Bit).Value = false;
        //                SqlParameter outputParam_1 = new SqlParameter("@FilterableSpecificationAttributeOptionIds", SqlDbType.NVarChar, 255);
        //                outputParam_1.Direction = ParameterDirection.Output;
        //                cmd.Parameters.Add(outputParam_1);
        //                SqlParameter outputParam_2 = new SqlParameter("@TotalRecords", SqlDbType.Int);
        //                outputParam_2.Direction = ParameterDirection.Output;
        //                cmd.Parameters.Add(outputParam_2);
        //                con.Open();
        //                //SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
        //                DataSet ds = new DataSet();
        //                using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
        //                {
                             
        //                        sda.Fill(ds);
                                
                            
        //                }
        //             //   dt.Load(dr);
        //            }
        //        }
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message;
        //    }
        //}

        [OperationContract]
        [WebGet]
        public String AllSearchedProduct(string ProductName, int PageSize, int PageNumber,int? CustomerId)
        {
            List<GetAllSearchedProducts_Result> obj = new List<GetAllSearchedProducts_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetAllSearchedProducts(ProductName, PageSize, PageNumber, CustomerId).ToList<GetAllSearchedProducts_Result>();

            }

            return JsonConvert.SerializeObject(obj);

        }

        [OperationContract]
        [WebGet]
        public String GetAllSearchedProducts_CartUpdate(string ProductName, int PageSize, int PageNumber, int? CustomerId)
        {
            List<GetAllSearchedProducts_CartUpdate_Result> obj = new List<GetAllSearchedProducts_CartUpdate_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetAllSearchedProducts_CartUpdate(ProductName, PageSize, PageNumber, CustomerId).ToList<GetAllSearchedProducts_CartUpdate_Result>();

            }

            return JsonConvert.SerializeObject(obj);

        }

        [OperationContract]
        [WebGet]
        public String GetProductDetails(int ProductId, int? CustomerId)
        {
            List<GetProductDetails_Result> obj = new List<GetProductDetails_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetProductDetails(ProductId, CustomerId).ToList<GetProductDetails_Result>();

            }

            return JsonConvert.SerializeObject(obj);

        }


        [OperationContract]
        [WebGet]
        public string BestSellingProduct(int Count,int? CustomerId)
        {
            List<BestSellingProducts_Result> obj = new List<BestSellingProducts_Result>();

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.BestSellingProducts(Count, CustomerId).ToList<BestSellingProducts_Result>();
            }

            return JsonConvert.SerializeObject(obj);
        }

        [OperationContract]
        [WebGet]
        public string BestSellingProducts_CartUpdate(int Count, int? CustomerId)
        {
            List<BestSellingProducts_CartUpdate_Result> obj = new List<BestSellingProducts_CartUpdate_Result>();

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.BestSellingProducts_CartUpdate(Count, CustomerId).ToList<BestSellingProducts_CartUpdate_Result>();
            }

            return JsonConvert.SerializeObject(obj);
        }


        [OperationContract]
        [WebGet]
        public string HighPriceProducts(int Count,int? CustomerId)
        {
            List<HighPriceProducts_Result> obj = new List<HighPriceProducts_Result>();

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.HighPriceProducts(Count, CustomerId).ToList<HighPriceProducts_Result>();
            }

            return JsonConvert.SerializeObject(obj);
        }

        [OperationContract]
        [WebGet]
        public string HighPriceProducts_CartUpdate(int Count, int? CustomerId)
        {
            List<HighPriceProducts_CartUpdate_Result> obj = new List<HighPriceProducts_CartUpdate_Result>();

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.HighPriceProducts_CartUpdate(Count, CustomerId).ToList<HighPriceProducts_CartUpdate_Result>();
            }

            return JsonConvert.SerializeObject(obj);
        }

        [OperationContract]
        [WebGet]
        public string LowPriceProducts(int Count, int? CustomerId)
        {
            List<LowPriceProducts_Result> obj = new List<LowPriceProducts_Result>();

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.LowPriceProducts(Count, CustomerId).ToList<LowPriceProducts_Result>();
            }

            return JsonConvert.SerializeObject(obj);
        }

        [OperationContract]
        [WebGet]
        public string LowPriceProducts_CartUpdate(int Count, int? CustomerId)
        {
            List<LowPriceProducts_CartUpdate_Result> obj = new List<LowPriceProducts_CartUpdate_Result>();

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.LowPriceProducts_CartUpdate(Count, CustomerId).ToList<LowPriceProducts_CartUpdate_Result>();
            }

            return JsonConvert.SerializeObject(obj);
        }


        [OperationContract]
        [WebGet]
        public string GetOfferProduct(int Count, int? CustomerId)
        {

            List<GetOfferProduct_Result> obj = new List<GetOfferProduct_Result>();
            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetOfferProduct(Count, CustomerId).ToList<GetOfferProduct_Result>();
            }

            return JsonConvert.SerializeObject(obj);
        }

        [OperationContract]
        [WebGet]
        public string GetOfferProduct_CartUpdate(int Count, int? CustomerId)
        {

            List<GetOfferProduct_CartUpdate_Result> obj = new List<GetOfferProduct_CartUpdate_Result>();
            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetOfferProduct_CartUpdate(Count, CustomerId).ToList<GetOfferProduct_CartUpdate_Result>();
            }

            return JsonConvert.SerializeObject(obj);
        }

        [OperationContract]
        [WebGet]
        public String GetProductById(string ProductIds, int CustomerId)
        {
            List<GetProductById_Result> obj = new List<GetProductById_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetProductById(ProductIds, CustomerId).ToList<GetProductById_Result>();

            }
            return JsonConvert.SerializeObject(obj);

        }

        [OperationContract]
        [WebGet]
        public String GetProductById_CartUpdate(string ProductIds, int CustomerId)
        {
            List<GetProductById_CartUpdate_Result> obj = new List<GetProductById_CartUpdate_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetProductById_CartUpdate(ProductIds, CustomerId).ToList<GetProductById_CartUpdate_Result>();

            }
            return JsonConvert.SerializeObject(obj);

        }



        [OperationContract]
        [WebGet]
        public String GetProductDetails_Quantity(int ProductId ,int? CustomerId)
        {
            List<GetProductDetails_Quantity_Result> obj = new List<GetProductDetails_Quantity_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetProductDetails_Quantity(ProductId, CustomerId).ToList<GetProductDetails_Quantity_Result>();

            }
            return JsonConvert.SerializeObject(obj);

        }

        [OperationContract]
        [WebGet]
        public String SearchProductsList()
        {
            List<SearchProductsList_Result> obj = new List<SearchProductsList_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.SearchProductsList().ToList<SearchProductsList_Result>();

            }
            return JsonConvert.SerializeObject(obj);

        }
        // Add more operations here and mark them with [OperationContract]
    }
}
