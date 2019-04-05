 using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace BamycServiceAjax
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface ICustomer
    {

        [OperationContract]
        CustomerData Get();

        [OperationContract]
        CustomerData Get(int CustomerId);

        [OperationContract]
        public string UserPasswordValidation(string Username,string Password);
    }


    // Use a data contract as illustrated in the sample below to add composite types to service operations.

    [DataContract]
    public class CustomerData
    {
        public CustomerData()
        {
            this.CustomersTable = new DataTable("CustomersData");
        }

        [DataMember]
        public DataTable CustomersTable { get; set; }
    }
    public class Customerinfo
    {
        public Customerinfo()
        {
            this.GetCustomerInfo_list = new DataTable("Customerinfo");
        }

        [DataMember]
        public DataTable GetCustomerInfo_list { get; set; }
    }
   
}
