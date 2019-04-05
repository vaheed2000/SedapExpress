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
    public interface ILocation
    {
        //[OperationContract]
        //CountryData Get();
        //[OperationContract]
        //AreaData GetArea(int CountryId);
    }


    // Use a data contract as illustrated in the sample below to add composite types to service operations.

    [DataContract]
    public class CountryData
    {
        public CountryData()
        {
            this.CountryTable = new DataTable("CountryData");
        }

        [DataMember]
        public DataTable CountryTable { get; set; }
    }

    [DataContract]
    public class AreaData
    {
        public AreaData()
        {
            this.AreaTable = new DataTable("AreaData");
        }
        [DataMember]
        public DataTable AreaTable { get; set; }
    }
}
