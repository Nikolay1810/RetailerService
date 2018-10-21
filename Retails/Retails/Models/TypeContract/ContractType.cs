using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Retails.Models.TypeContract
{
    [Table("ContractType")]
    public class ContractType
    {
        [Key]
        public int Id { get; set; }

        public string TypeName { get; set; }
    }
}