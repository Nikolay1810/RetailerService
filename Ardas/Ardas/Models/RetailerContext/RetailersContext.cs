using Ardas.Models.Affiliated;
using Ardas.Models.Contract;
using Ardas.Models.NestedAffiliated;
using Ardas.Models.Retailer;
using Ardas.Models.Root;
using Ardas.Models.TypeContract;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Ardas.Models.RetailerContext
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