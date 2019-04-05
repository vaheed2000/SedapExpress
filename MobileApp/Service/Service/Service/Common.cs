using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace BamycServiceAjax
{
    public class Common
    {
        [XmlRoot(ElementName = "AddressAttributeValue"), XmlType("AddressAttributeValue")]
        public class AddressAttributeValue
        {
            [XmlElement(ElementName = "Value")]
            public string Value { get; set; }
        }

        [XmlRoot(ElementName = "AddressAttribute"), XmlType("AddressAttribute")]
        public class AddressAttribute
        {
            [XmlElement(ElementName = "AddressAttributeValue")]
            public AddressAttributeValue AddressAttributeValue { get; set; }
            [XmlAttribute(AttributeName = "ID")]
            public string ID { get; set; }
        }

        [XmlRoot(ElementName = "Attributes"), XmlType("Attributes")]
        public class Attributes
        {
            [XmlElement(ElementName = "AddressAttribute")]
            public List<AddressAttribute> AddressAttribute { get; set; }
        }
    }
}