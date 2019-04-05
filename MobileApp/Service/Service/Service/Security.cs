using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace BamycServiceAjax
{
    public class Security
    {

        ///    
        /// ///
        /// Create a password hash      
        /// ///        
        /// /// {assword        
        /// Salk key        
        /// Password format (hash algorithm)       
        /// Password hash   

        public virtual string CreatePasswordHash(string password, string saltkey, string passwordFormat = "SHA512")
        {
           
            string saltAndPassword = String.Concat(password, saltkey);
         

            if (string.IsNullOrEmpty(passwordFormat))
                throw new ArgumentNullException(nameof(passwordFormat));

            var algorithm = (HashAlgorithm)CryptoConfig.CreateFromName(passwordFormat);
            if (algorithm == null)
                throw new ArgumentException("Unrecognized hash name");

            var hashByteArray = algorithm.ComputeHash(Encoding.UTF8.GetBytes(saltAndPassword));
            return BitConverter.ToString(hashByteArray).Replace("-", string.Empty);
        }
        /// <summary>
        /// Create salt key
        /// </summary>
        /// <param name="size">Key size</param>
        /// <returns>Salt key</returns>
        public virtual string CreateSaltKey(int size)
        {
            // Generate a cryptographic random number
            var rng = new RNGCryptoServiceProvider();
            var buff = new byte[size];
            rng.GetBytes(buff);

            // Return a Base64 string representation of the random number
            return Convert.ToBase64String(buff);
        }


      
    }
}