using Ardas.Models.Affiliated;
using Ardas.Models.NestedAffiliated;
using Ardas.Models.Retailer;
using Ardas.Models.RetailerContext;
using Ardas.Models.Root;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Ardas.Controllers.Home
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult RootRetailerBySpecified()
        {
            return View();
        }

        public ActionResult AddRetailer()
        {
            return View();
        }

        public ActionResult AddAffiliatedRetailers()
        {
            return View();
        }

        [HttpPost]
        public string GetRootRetailer()
        {
            List<RootRetailers> rootRetailersList = new List<RootRetailers>();
            try
            {
                using (var dbContext = new RetailersContext())
                {
                    rootRetailersList.AddRange(dbContext.RootRetailers.ToList());
                }
            }
            catch (Exception ex)
            {

            }
            var jsSerializer = new JavaScriptSerializer();
            return jsSerializer.Serialize(rootRetailersList);
        }

        [HttpPost]
        public string GetAffiliatedRetailers(string args)
        {
            List<AffiliatedRetailers> sortedAffiliatedRetailerList = new List<AffiliatedRetailers>();
            var jsSerializer = new JavaScriptSerializer();

            try
            {
                if (!string.IsNullOrEmpty(args))
                {
                    var argAsObject = jsSerializer.Deserialize<RootRetailers>(args);
                    
                    using (var dbContext = new RetailersContext())
                    {
                        List<AffiliatedRetailers> affiliatedRetailerList = new List<AffiliatedRetailers>();
                        affiliatedRetailerList.AddRange(dbContext.AffiliatedRetailers.Where(u=>u.RootRetailerId == argAsObject.Id).ToList());

                        var nestedAffiliatedRetailerList = dbContext.NestedAffiliatedRetailers.ToList();
                        if (nestedAffiliatedRetailerList.Count != 0)
                        {
                            foreach (var affiliatedRetailer in affiliatedRetailerList)
                            {
                                var nestedAffiliatedRetailer = nestedAffiliatedRetailerList.FirstOrDefault(u => u.AffiliatedRetailerId == affiliatedRetailer.Id);
                                if (nestedAffiliatedRetailer == null)
                                {
                                    sortedAffiliatedRetailerList.Add(affiliatedRetailer);
                                }
                            }
                        }
                        else
                        {
                            sortedAffiliatedRetailerList.AddRange(affiliatedRetailerList);
                        }
                    }
                }
                
            }
            catch(Exception ex)
            {

            }
            return jsSerializer.Serialize(sortedAffiliatedRetailerList);
        }


        [HttpPost]
        public string GetRetailers(string args)
        {
            List<Retailers> retailerList = new List<Retailers>();
            var jsSerializer = new JavaScriptSerializer();

            try
            {
                if (!string.IsNullOrEmpty(args))
                {
                    var argAsObject = jsSerializer.Deserialize<AffiliatedRetailers>(args);

                    using (var dbContext = new RetailersContext())
                    {
                        retailerList.AddRange(dbContext.Retailers.Where(u => u.AffiliatedRetailerId == argAsObject.Id).ToList());
                    }
                }

            }
            catch (Exception ex)
            {

            }
            return jsSerializer.Serialize(retailerList);
        }

        [HttpPost]
        public string GetNestedAffiliated(string args)
        {
            List<AffiliatedRetailers> sortedAffiliatedRetailerList = new List<AffiliatedRetailers>();
            var jsSerializer = new JavaScriptSerializer();

            try
            {
                if (!string.IsNullOrEmpty(args))
                {
                    var argAsObject = jsSerializer.Deserialize<Retailers>(args);

                    using (var dbContext = new RetailersContext())
                    {
                        List<NestedAffiliatedRetailers> nestedAffiliatedRetailerList = new List<NestedAffiliatedRetailers>();
                        nestedAffiliatedRetailerList.AddRange(dbContext.NestedAffiliatedRetailers.Where(u => u.RetailerId == argAsObject.Id).ToList());

                        var affiliatedRetailerList = dbContext.AffiliatedRetailers.ToList();
                        if (affiliatedRetailerList.Count != 0)
                        {
                            foreach (var nestedAffiliatedRetailer in nestedAffiliatedRetailerList)
                            {
                                var affiliatedRetailer = affiliatedRetailerList.FirstOrDefault(u => u.Id == nestedAffiliatedRetailer.AffiliatedRetailerId);
                                sortedAffiliatedRetailerList.Add(affiliatedRetailer);
                            }
                        }
                    }
                }

            }
            catch (Exception ex)
            {

            }
            return jsSerializer.Serialize(sortedAffiliatedRetailerList);
        }

        [HttpPost]
        public string GetAllRetailers()
        {
            List<Retailers> retailersList = new List<Retailers>();
            var jsSerializer = new JavaScriptSerializer();
            try
            {
                using (var dbContext = new RetailersContext())
                {
                    retailersList.AddRange(dbContext.Retailers.ToList());
                }
            }
            catch (Exception ex)
            {

            }
            return jsSerializer.Serialize(retailersList);
        }

        [HttpPost]
        public string GetAllAffiliatedRetailers()
        {
            List<AffiliatedRetailers> affiliatedRetailersList = new List<AffiliatedRetailers>();
            var jsSerializer = new JavaScriptSerializer();
            try
            {
                using (var dbContext = new RetailersContext())
                {
                    affiliatedRetailersList.AddRange(dbContext.AffiliatedRetailers.ToList());
                }
            }
            catch (Exception ex)
            {

            }
            return jsSerializer.Serialize(affiliatedRetailersList);
        }

        [HttpPost]
        public string GetRootRetailerBySpecified(string args)
        {
            RootRetailers rootRetailer = new RootRetailers();
            var jsSerializer = new JavaScriptSerializer();
            try
            {
                var argsAsObject = jsSerializer.Deserialize<Retailers>(args);
                using (var dbContext = new RetailersContext())
                {
                    var retailer = dbContext.Retailers.FirstOrDefault(u => u.Id == argsAsObject.Id);
                    var affiliatedRetailer = dbContext.AffiliatedRetailers.FirstOrDefault(u => u.Id == retailer.AffiliatedRetailerId);
                    rootRetailer = dbContext.RootRetailers.FirstOrDefault(u => u.Id == affiliatedRetailer.RootRetailerId);
                }
            }
            catch
            {

            }
            return jsSerializer.Serialize(rootRetailer);
        }

        [HttpPost]
        public string AddRetailers(string args)
        {
            RetailerRequest retailer = new RetailerRequest();
            var jsSerializer = new JavaScriptSerializer();
            try
            {
                var argsAsObject = jsSerializer.Deserialize<RetailerRequest>(args);
                using (var dbContext = new RetailersContext())
                {
                    if (argsAsObject.isRoot == true)
                    {
                        dbContext.RootRetailers.Add(new RootRetailers()
                        {
                            DisplayName = argsAsObject.RetailerName
                        });
                        dbContext.SaveChanges();
                    }
                    else
                    {
                        dbContext.Retailers.Add(new Retailers() {
                            RetailerName = argsAsObject.RetailerName,
                            AffiliatedRetailerId = argsAsObject.AffiliatedRetailerId
                        });
                        dbContext.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return jsSerializer.Serialize(retailer);
        }

        [HttpPost]
        public string AddAffiliatedRetailer(string args)
        {
            AffiliatedRetailersRequest retailer = new AffiliatedRetailersRequest();
            var jsSerializer = new JavaScriptSerializer();
            try
            {
                var argsAsObject = jsSerializer.Deserialize<AffiliatedRetailersRequest>(args);
                using (var dbContext = new RetailersContext())
                {
                    if (argsAsObject.isForRootRetailer == true)
                    {
                        dbContext.AffiliatedRetailers.Add(new AffiliatedRetailers()
                        {
                            Name = argsAsObject.Name,
                            RootRetailerId = argsAsObject.RootRetailerId
                        });
                        dbContext.SaveChanges();
                    }
                    else
                    {
                        dbContext.AffiliatedRetailers.Add(new AffiliatedRetailers()
                        {
                            Name = argsAsObject.Name,
                            RootRetailerId = argsAsObject.RootRetailerId
                        });
                        dbContext.SaveChanges();
                        var affiliatedId = dbContext.AffiliatedRetailers.ToList().Last().Id;
                        dbContext.NestedAffiliatedRetailers.Add(new NestedAffiliatedRetailers()
                        {
                            RetailerId = argsAsObject.RetailerId,
                            AffiliatedRetailerId = affiliatedId
                        });
                        dbContext.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return jsSerializer.Serialize(retailer);
        }
    }
}