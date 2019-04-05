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
    public class Customer
    {
        // To use HTTP GET, add [WebGet] attribute. (Default ResponseFormat is WebMessageFormat.Json)
        // To create an operation that returns XML,
        //     add [WebGet(ResponseFormat=WebMessageFormat.Xml)],
        //     and include the following line in the operation body:
        //         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";
        //[OperationContract]
        //public CustomerData Get()
        //{
        //    string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        //    using (SqlConnection con = new SqlConnection(constr))
        //    {
        //        using (SqlCommand cmd = new SqlCommand("SELECT * FROM customer"))
        //        {
        //            using (SqlDataAdapter sda = new SqlDataAdapter())
        //            {
        //                cmd.Connection = con;
        //                sda.SelectCommand = cmd;
        //                using (DataTable dt = new DataTable())
        //                {
        //                    CustomerData customers = new CustomerData();
        //                    sda.Fill(customers.CustomersTable);
        //                    return customers;
        //                }
        //            }
        //        }
        //    }
        //}

        //[OperationContract]
        //public CustomerData Get(int CustomerId)
        //{
        //    string query = "select * from Customer where CustomerId=" + CustomerId;

        //    string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
        //    using (SqlConnection con = new SqlConnection(constr))
        //    {
        //        using (SqlCommand cmd = new SqlCommand(query))
        //        {
        //            using (SqlDataAdapter sda = new SqlDataAdapter())
        //            {
        //                cmd.Connection = con;
        //                sda.SelectCommand = cmd;
        //                using (DataTable dt = new DataTable())
        //                {
        //                    CustomerData customers = new CustomerData();
        //                    sda.Fill(customers.CustomersTable);
        //                    return customers;
        //                }
        //            }
        //        }
        //    }
        //}
        // Add more operations here and mark them with [OperationContract]

        [OperationContract]
        [WebGet]
        public string CustomerLoginRegistration(string Firstname, string Lastname, string Email, int Phone, string StreetAddress, int CountryId, string AreaId, string Password)
        {
            Security objSecurity = new Security();
            string saltKey;
            List<string> obj = new List<string>();
           
            saltKey = objSecurity.CreateSaltKey(5);
            using (var entities = new SedapExpressEntities())
            {
                obj = entities.CustomerLoginRegistration(Firstname, Lastname, Email, Phone, StreetAddress, CountryId, AreaId, objSecurity.CreatePasswordHash(Password, saltKey), saltKey, Guid.NewGuid()).ToList<string>();
            }


            return JsonConvert.SerializeObject(obj);



        }

        [OperationContract]
        [WebGet]
        public String Authentication(string Username, string Password)
        {
            List<GetCustomerByUsername_Result> objList = new List<GetCustomerByUsername_Result>();
            GetCustomerByUsername_Result objCust = new GetCustomerByUsername_Result();
            Security objSecurity = new Security();
            string Encry_Password;

            using (var entities = new SedapExpressEntities())
            {
                objList = entities.GetCustomerByUsername(Username).ToList<GetCustomerByUsername_Result>();

            }
            if (objList.Count!=0)
            {
                foreach (GetCustomerByUsername_Result obj in objList)
                {
                    Encry_Password = objSecurity.CreatePasswordHash(Password, obj.PasswordSalt);
                    if(Encry_Password!=obj.Password)
                    {
                        objList = new List<GetCustomerByUsername_Result>();
                    }

                }
               
            }



            return JsonConvert.SerializeObject(objList);

        }


        [OperationContract]
        [WebGet]
        public String UpdatePassword(string Username, string Password,string newpassword)
        {
            List<GetCustomerByUsername_Result> objList = new List<GetCustomerByUsername_Result>();
            GetCustomerByUsername_Result objCust = new GetCustomerByUsername_Result();
            Security objSecurity = new Security();
            string Encry_Password, Encry_NewPassword;

            using (var entities = new SedapExpressEntities())
            {
                objList = entities.GetCustomerByUsername(Username).ToList<GetCustomerByUsername_Result>();

            }
            if (objList.Count != 0)
            {
                foreach (GetCustomerByUsername_Result obj in objList)
                {
                    Encry_Password = objSecurity.CreatePasswordHash(Password, obj.PasswordSalt);
                    if (Encry_Password == obj.Password)
                    {

                        using (var entities = new SedapExpressEntities())
                        {
                            Encry_NewPassword = objSecurity.CreatePasswordHash(newpassword, obj.PasswordSalt);
                            entities.UpdatePassword(Encry_NewPassword, Username);
                            using (var entitiesnew = new SedapExpressEntities())
                            {
                                objList = entities.GetCustomerByUsername(Username).ToList<GetCustomerByUsername_Result>();

                            }

                        }
                    }


                    else
                    {

                        objList = new List<GetCustomerByUsername_Result>();
                    }
                }

            }

            return JsonConvert.SerializeObject(objList);



        }

        //    [OperationContract]
        //    [WebGet]
        //    public string GetCustomerInfo(string CustomerId)
        //    {
        //        List<> obj = new List<();


        //        using (var entities = new SedapExpressEntities())
        //        {
        //            obj = entities.GetCustomerInfo_list(Convert.ToInt32(CustomerId)).ToList<>();
        //        }

        //        return JsonConvert.SerializeObject(obj);


        //    }
        //[OperationContract]
        //[WebGet]
        //public string GetCustomerlist(int CustomerId)
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
        //public string GetUpdateDeleteStatus(int CustomerId)
        //{
        //    List<Nullable<bool>> obj = new List<Nullable<bool>>();


        //    using (var entities = new SedapExpressEntities())
        //    {
        //        obj = entities.GetUpdateDeleteStatus(CustomerId).ToList<Nullable<bool>>();
        //    }

        //    return JsonConvert.SerializeObject("success");


        //}

       

        [OperationContract]
        [WebGet]
        public string AddLogOutUser(string  IpAddress)
        {
            List<Nullable<int>> obj = new List<Nullable<int>>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities. AddLogOutUser(Guid.NewGuid(),IpAddress ).ToList<Nullable<int>>();
            }

            return JsonConvert.SerializeObject(obj);


        }


        [OperationContract]
        [WebGet]
        public string GetCustomerNameByCustomerId(int CustomerId)
        {
            List<string> obj = new List<string>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetCustomerNameByCustomerId(CustomerId).ToList<string>();
            }

            return JsonConvert.SerializeObject(obj);


        }

        [OperationContract]
        [WebGet]
        public string CustomerInfo(string CustomerId)
        {
            List<CustomerInfo_Result> obj = new List<CustomerInfo_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.CustomerInfo(Convert.ToInt32(CustomerId)).ToList<CustomerInfo_Result>();
            }

            return JsonConvert.SerializeObject(obj);


        }

        [OperationContract]
            [WebGet]
            public string CustomerInfoUpdate(string CustomerId,string FirstName,string LastName,string StreetAddress,int CountryId,int StateProvinceId,string Phone)
            {                                                  
              int obj;                     
                                                               
                                                              
                using (var entities = new SedapExpressEntities())
                {
                    obj = entities.CustomerInfoUpdate(Convert.ToInt32(CustomerId), FirstName, LastName, StreetAddress, CountryId, StateProvinceId, Phone);
                }

                return JsonConvert.SerializeObject(obj);


            }

    }
}