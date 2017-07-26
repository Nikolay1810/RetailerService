using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Ardas.Models.Contract
{
    public class ContractResponse
    {
        [Key]
        public int Id { get; set; }

        public int FromAffiliatedRetailerId { get; set; }

        public int ToAffiliatedRetailerId { get; set; }

        [Display(Name = "FromAffiliatedRetailer")]
        public string FromAffiliatedRetailer { get; set; }

        [Display(Name = "ToAffiliatedRetailer")]
        public string ToAffiliatedRetailer { get; set; }

        [Display(Name = "Date of contract")]
        public string DateOfContract { get; set; }

        public DateTime copyDate { get; set; }

        public int ContractTypeId { get; set; }

        [Display(Name = "ContractType")]
        public string TypeName { get; set; }
    }
}