using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Retails.Models.Root
{
    public class RootRetailers
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Root retailers")]
        public string DisplayName { get; set; }
    }
}