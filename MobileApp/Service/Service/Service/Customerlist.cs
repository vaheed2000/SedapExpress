using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BamycServiceAjax
{
    public class Customerlist
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email{ get; set; }
        public string StreetAddress{ get; set; }
        public string Country{ get; set; }
        public string Area{ get; set; }
        public int Phone{ get; set; }
        public string Password { get; set; }
    }
}