using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Ardas.Models.Affiliated
{
    public class AffiliatedRetailers
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Affiliated retailers")]
        public string Name { get; set; }

        public int RootRetailerId { get; set; }
    }
}