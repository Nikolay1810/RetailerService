using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Ardas.Models.Retailer
{
    public class RetailerRequest
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Retailer name")]
        public string RetailerName { get; set; }


        public bool isRoot { get; set; }

        public int AffiliatedRetailerId { get; set; }
    }
}