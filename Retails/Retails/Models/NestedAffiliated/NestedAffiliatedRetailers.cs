using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Retails.Models.NestedAffiliated
{
    public class NestedAffiliatedRetailers
    {
        [Key]
        public int Id { get; set; }

        public int RetailerId { get; set; }

        public int AffiliatedRetailerId { get; set; }
    }
}