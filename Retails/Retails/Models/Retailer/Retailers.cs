using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Retails.Models.Retailer
{
    public class Retailers
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Retailer")]
        public string RetailerName { get; set; }

        public int AffiliatedRetailerId { get; set; }
    }
}