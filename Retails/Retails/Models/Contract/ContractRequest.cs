using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Retails.Models.Contract
{
    public class ContractRequest
    {
        [Display(Name = "Retailers")]
        public int[] ReailerId { get; set; }

        [Display(Name = "From")]
        public string FromDate { get; set; }

        [Display(Name = "To")]
        public string ToDate { get; set; }

        [Display(Name = "Type of contract")]
        public int ContractTypeId { get; set; }
    }
}