using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Security.Cryptography;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;

namespace BamycServiceAjax
{
    [ServiceContract(Namespace = "http://13.67.53.208:8088/")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class Address
    {
        // To use HTTP GET, add [WebGet] attribute. (Default ResponseFormat is WebMessageFormat.Json)
        // To create an operation that returns XML,
        //     add [WebGet(ResponseFormat=WebMessageFormat.Xml)],
        //     and include the following line in the operation body:
        //         WebOperationContext.Current.OutgoingResponse.ContentType = "text/xml";
        [OperationContract]
        [WebGet]
        public string Get(string CustomerId)
        {

            List<GetAllAddress_Result> obj = new List<GetAllAddress_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetAllAddress(Convert.ToInt32(CustomerId)).ToList<GetAllAddress_Result>();
            }

            return JsonConvert.SerializeObject(obj);


        }


        //[OperationContract]
        //[WebGet]
        //public string GetDeleteAddress(string CustomerId)
        //{

        //    List<GetDeleteAddress_Result> obj = new List<GetDeleteAddress_Result>();


        //    using (var entities = new SedapExpressEntities())
        //    {
        //        obj = entities.GetDeleteAddress(Convert.ToInt32(CustomerId)).ToList<GetDeleteAddress_Result>();
        //    }

        //    return JsonConvert.SerializeObject(obj);


        //}


        //[OperationContract]
        //[WebGet]
        // public string GetAddressList(string CustomerId)
        //{
        //    List<GetAddressList_Result> obj = new List<GetAddressList_Result>();


        //    using (var entities = new SedapExpressEntities())
        //    {
        //        obj = entities.GetAddressList(Convert.ToInt32(CustomerId)).ToList<GetAddressList_Result>();
        //    }

        //    return JsonConvert.SerializeObject(obj);


        //}
        [OperationContract]
        [WebGet]
        public string GetShippingAddressById(string AddressId)
        {
            List<GetShippingAddressById_Result> obj = new List<GetShippingAddressById_Result>();
            List<Common.AddressAttribute> objList = new List<Common.AddressAttribute>();

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.GetShippingAddressById(Convert.ToInt32(AddressId)).ToList<GetShippingAddressById_Result>();
            }
            //foreach(GetShippingAddressById_Result objresult in obj)
            //{
            //    objList = SerializeXml.DeserializeObject<List<Common.AddressAttribute>>(objresult.CustomAttributes);
            //}

            return JsonConvert.SerializeObject(obj);


        }



        [OperationContract]
        [WebGet]
        public string DeleteShippingAddressById(string AddressId)
        {
            int obj;

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.DeleteShippingAddressById(Convert.ToInt32(AddressId));
            }


            return JsonConvert.SerializeObject(obj);


        }

        [OperationContract]
        [WebGet]
        public string UpdateAddressInfomtion(int AddresId, string Firstname, string Lastname, string Email, string Phone, string flat, string street, string landmark, int CountryId, int AreaId)
        {

            int obj;
            string[] arr = new string[4];
            arr[1] = flat;
            arr[2] = street;
            arr[3] = landmark;
            Common.AddressAttributeValue objC;
            Common.AddressAttribute objAddAttr;

            Common.Attributes objAttr = new Common.Attributes();
            List<Common.AddressAttribute> objList = new List<Common.AddressAttribute>();
            for (int i = 1; i < 4; i++)
            {
                objC = new Common.AddressAttributeValue();
                objC.Value = arr[i];
                objAddAttr = new Common.AddressAttribute();
                objAddAttr.ID = i.ToString();
                objAddAttr.AddressAttributeValue = objC;

                objList.Add(objAddAttr);

            }
            string ser = SerializeXml.SerializeObject(objList);
            ser = ser.Replace("<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n", "").
            Replace("xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"", "").
            Replace("  xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"", "");

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.UpdateShippingAddress(AddresId, Firstname, Lastname, Email, Phone, ser, CountryId, AreaId);
            }

            return JsonConvert.SerializeObject(obj);




        }


        [OperationContract]
        [WebGet]
        public string SaveAddressInfo(string Firstname, string Lastname, string Email, string StreetAddress, int countryId, string StateProvice, string Phone, string Password, int StoreId)
        {
            List<int> obj = new List<int>();

            int result;
            using (var entities = new SedapExpressEntities())
            {
                result = entities.SaveAddressInfo(CreateSaltKey(5), Firstname, Lastname, Email, StreetAddress, countryId, StateProvice, Convert.ToInt32(Phone), Password, Guid.NewGuid(), 0, StoreId);
            }

            return JsonConvert.SerializeObject("success");



        }
        public virtual string CreateSaltKey(int size)
        {
            //generate a cryptographic random number
            using (var provider = new RNGCryptoServiceProvider())
            {
                var buff = new byte[size];
                provider.GetBytes(buff);

                // Return a Base64 string representation of the random number
                return Convert.ToBase64String(buff);
            }
        }
        //[OperationContract]
        //[WebGet]
        //public string UpdateDeleteAddress(int addressid)
        //{
        //    List<int> obj = new List<int>();

        //    int result;
        //    using (var entities = new SedapExpressEntities())
        //    {
        //        result = entities.UpdateDeleteAddress(addressid);
        //    }

        //    return JsonConvert.SerializeObject("success");



        //}


        [OperationContract]
        [WebGet]
        public string CustomerShippingAddress(int CustomerId)
        {

            List<CustomerShippingAddress_Result> obj = new List<CustomerShippingAddress_Result>();


            using (var entities = new SedapExpressEntities())
            {
                obj = entities.CustomerShippingAddress(Convert.ToInt32(CustomerId)).ToList<CustomerShippingAddress_Result>();
            }

            return JsonConvert.SerializeObject(obj);


        }


        [OperationContract]
        [WebGet]
        public string AddNewShippingAddress(int CustomerId, string Firstname, string Lastname, string Email, int Phone, string flat, string street, string landmark, int CountryId, string AreaId)
        {

            List<Nullable<decimal>> obj = new List<Nullable<decimal>>();
            string[] arr = new string[4];
            arr[1] = flat;
            arr[2] = street;
            arr[3] = landmark;
            Common.AddressAttributeValue objC;
            Common.AddressAttribute objAddAttr;

            Common.Attributes objAttr = new Common.Attributes();
            List<Common.AddressAttribute> objList = new List<Common.AddressAttribute>();
            for (int i = 1; i < 4; i++)
            {
                objC = new Common.AddressAttributeValue();
                objC.Value = arr[i];
                objAddAttr = new Common.AddressAttribute();
                objAddAttr.ID = i.ToString();
                objAddAttr.AddressAttributeValue = objC;

                objList.Add(objAddAttr);

            }
            string ser = SerializeXml.SerializeObject(objList);
            ser = ser.Replace("<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n", "").
            Replace("xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"", "").
            Replace("  xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"", "");

            using (var entities = new SedapExpressEntities())
            {
                obj = entities.AddNewShippingAddress(CustomerId, Firstname, Lastname, Email, Phone, ser, CountryId, AreaId).ToList<Nullable<decimal>>();
            }

            return JsonConvert.SerializeObject(obj);


        }


        [OperationContract]
        [WebGet]
        public string GuestAddressRegistration(string Firstname, string Lastname, string Email, int Phone, string flat, string street, string landmark, int StreetAddress, string CountryId, string AreaId, string IP)
        {

            List<int> obj = new List<int>();
            string[] arr = new string[4];
            arr[1] = flat;
            arr[2] = street;
            arr[3] = landmark;
            Common.AddressAttributeValue objC;
            Common.AddressAttribute objAddAttr;

            Common.Attributes objAttr = new Common.Attributes();
            List<Common.AddressAttribute> objList = new List<Common.AddressAttribute>();
            for (int i = 1; i < 4; i++)
            {
                objC = new Common.AddressAttributeValue();
                objC.Value = arr[i];
                objAddAttr = new Common.AddressAttribute();
                objAddAttr.ID = i.ToString();
                objAddAttr.AddressAttributeValue = objC;

                objList.Add(objAddAttr);

            }
            string ser = SerializeXml.SerializeObject(objList);
            ser = ser.Replace("<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n", "").
            Replace("xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"", "").
            Replace("  xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"", "");

            int result = 0;
            using (var entities = new SedapExpressEntities())
            {
                result = entities.GuestAddressRegistration(Firstname, Lastname, Email, Phone, ser, StreetAddress, CountryId, AreaId, IP, Guid.NewGuid());
            }


            return JsonConvert.SerializeObject(result);
        }

        // Add more operations here and mark them with [OperationContract]
    }
}
