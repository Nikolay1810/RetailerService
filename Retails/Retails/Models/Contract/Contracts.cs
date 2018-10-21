using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Retails.Models.Contract
{
    public class Contracts
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "FromAffiliatedRetailer")]
        public int FromAffiliatedRetailerId { get; set; }

        [Display(Name = "ToAffiliatedRetailer")]
        public int ToAffiliatedRetailerId { get; set; }

        [Display(Name = "Date of contract")]
        public DateTime DateOfContract { get; set; }

        [Display(Name = "ContractType")]
        public int ContractTypeId { get; set; }
    }
}