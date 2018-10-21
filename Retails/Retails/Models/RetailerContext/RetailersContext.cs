using Retails.Models.Affiliated;
using Retails.Models.Contract;
using Retails.Models.NestedAffiliated;
using Retails.Models.Retailer;
using Retails.Models.Root;
using Retails.Models.TypeContract;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Retails.Models.RetailerContext
{
    public class RetailersContext : DbContext
    {
        public RetailersContext() : base("RetailersContext")
        {
        
        }
        public DbSet<RootRetailers> RootRetailers { get; set; }
        public DbSet<AffiliatedRetailers> AffiliatedRetailers { get; set; }
        public DbSet<Retailers> Retailers { get; set; }
        public DbSet<NestedAffiliatedRetailers> NestedAffiliatedRetailers { get; set; }
        public DbSet<ContractType> ContractType { get; set; }
        public DbSet<Contracts> Contracts { get; set; }
    }
}