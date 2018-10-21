using Retails.Models.Affiliated;
using Retails.Models.Contract;
using Retails.Models.NestedAffiliated;
using Retails.Models.Retailer;
using Retails.Models.RetailerContext;
using Retails.Models.Root;
using Retails.Models.TypeContract;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Retails.Controllers.Contract
{
    public class ContractController : Controller
    {
        public ActionResult Contracts()
        {
            return View();
        }
        public ActionResult EnterContract()
        {
            return View();
        }
        public ActionResult ContractByRootRetailers()
        {
            return View();
        }

        public ActionResult ContractByRetailers()
        {
            return View();
        }

        [HttpPost]
        public string GetAffiliatedRetailersForSelect(string args)
        {
            List<AffiliatedRetailers> affiliatedRetailersList = new List<AffiliatedRetailers>();
            var jsSerializer = new JavaScriptSerializer();
            try
            {
                var argsAsObject = jsSerializer.Deserialize<RootRetailers>(args);
                using (var dbContext = new RetailersContext())
                {
                    affiliatedRetailersList.AddRange(dbContext.AffiliatedRetailers.Where(u => u.RootRetailerId == argsAsObject.Id));
                }
            }
            catch (Exception ex)
            {
            }
            return jsSerializer.Serialize(affiliatedRetailersList);
        }

        [HttpPost]
        public string GetContractTypeForSelect()
        {
            List<ContractType> contractTypeList = new List<ContractType>();
            var jsSerializer = new JavaScriptSerializer();
            try
            {
                using (var dbContext = new RetailersContext())
                {
                    contractTypeList.AddRange(dbContext.ContractType.ToList());
                }
            }
            catch (Exception ex)
            {
            }
            return jsSerializer.Serialize(contractTypeList);
        }

        [HttpPost]
        public string CreateNewContrac(string args)
        {
            var message = "";
            var jsSerializer = new JavaScriptSerializer();
            try
            {
                var argsAsObject = jsSerializer.Deserialize<Contracts>(args);
                //DateTime dateOfContract = new DateTime();
                Contracts newContract = new Contracts();
                using (var dbContext = new RetailersContext())
                {
                    newContract = argsAsObject;
                    newContract.DateOfContract = DateTime.Now;
                    dbContext.Contracts.Add(newContract);
                    dbContext.SaveChanges();
                    message = "Data save successfully";
                }
            }
            catch (Exception ex)
            {
            }
            return jsSerializer.Serialize(message);
        }

        [HttpPost]
        public string GetContractByRootRetailers(string args)
        {
            List<ContractResponse> sortedContractsList = new List<ContractResponse>();
            var jsSerializer = new JavaScriptSerializer();
            try
            {
                var argsAsObject = jsSerializer.Deserialize<RootRetailers>(args);
                using (var dbContext = new RetailersContext())
                {
                    var allAffiliatedRetailersList = dbContext.AffiliatedRetailers.ToList();
                    var affiliatedRetailersList = allAffiliatedRetailersList.Where(u => u.RootRetailerId == argsAsObject.Id).ToList();
                    if (affiliatedRetailersList.Count != 0)
                    {
                        var contractList = dbContext.Contracts.ToList();
                        var contractTypeList = dbContext.ContractType.ToList();
                        foreach (var affiliatedRetailers in affiliatedRetailersList)
                        {
                            var s = contractList.Where(u => (u.FromAffiliatedRetailerId == affiliatedRetailers.Id || u.ToAffiliatedRetailerId == affiliatedRetailers.Id) && u.ContractTypeId == 1).ToList();
                            sortedContractsList.AddRange(contractList.Where(u => (u.FromAffiliatedRetailerId == affiliatedRetailers.Id || u.ToAffiliatedRetailerId == affiliatedRetailers.Id) && u.ContractTypeId == 1).ToList().Select(n => new ContractResponse() {
                                Id = n.Id,
                                FromAffiliatedRetailerId = n.FromAffiliatedRetailerId,
                                FromAffiliatedRetailer = allAffiliatedRetailersList.FirstOrDefault(c => c.Id == n.FromAffiliatedRetailerId).Name,
                                ToAffiliatedRetailerId = n.ToAffiliatedRetailerId,
                                ToAffiliatedRetailer = allAffiliatedRetailersList.FirstOrDefault(c => c.Id == n.ToAffiliatedRetailerId).Name,
                                DateOfContract = n.DateOfContract.ToShortDateString(),
                                ContractTypeId = n.ContractTypeId,
                                TypeName = contractTypeList.FirstOrDefault(c=>c.Id == n.ContractTypeId).TypeName
                            }));
                        }
                        sortedContractsList.ToList().Distinct();
                    } 
                }
            }
            catch(Exception ex)
            {

            }
            return jsSerializer.Serialize(sortedContractsList);
        }

        [HttpPost]
        public string GetContractByRetailer(string args)
        {
            var sortedContractResponseList = new List<ContractResponse>();
            var jsSerializer = new JavaScriptSerializer();
            try
            {
                var argsAsObject = jsSerializer.Deserialize<Retailers>(args);
                using (var dbContext = new RetailersContext())
                {
                    List<ContractResponse> contractResponseList = new List<ContractResponse>();

                    var allRetailersList = dbContext.Retailers.ToList();

                    var retailer = allRetailersList.FirstOrDefault(u => u.Id == argsAsObject.Id);
                    var allContractList = dbContext.Contracts.ToList();

                    var contractList = allContractList.Where(u => (u.FromAffiliatedRetailerId == retailer.AffiliatedRetailerId || u.ToAffiliatedRetailerId == retailer.AffiliatedRetailerId)&&u.ContractTypeId==1).ToList();
                    var allAffiliatedRetailers = dbContext.AffiliatedRetailers.ToList();
                    var contractTypeList = dbContext.ContractType.ToList();
                    var selectAffiliatedRetailersList = new List<AffiliatedRetailers>();
                    var retailersList = new List<Retailers>();
                    retailersList.Add(retailer);
                    var nestedAffiliatedRetailersList = dbContext.NestedAffiliatedRetailers.ToList();
                    if (contractList.Count != 0)
                    {
                        contractResponseList.AddRange(contractList.Select(u => new ContractResponse() {
                            Id = u.Id,
                            FromAffiliatedRetailerId = u.FromAffiliatedRetailerId,
                            FromAffiliatedRetailer = allAffiliatedRetailers.FirstOrDefault(c => c.Id == u.FromAffiliatedRetailerId).Name,
                            ToAffiliatedRetailerId = u.ToAffiliatedRetailerId,
                            ToAffiliatedRetailer = allAffiliatedRetailers.FirstOrDefault(c => c.Id == u.ToAffiliatedRetailerId).Name,
                            DateOfContract = u.DateOfContract.ToShortDateString(),
                            ContractTypeId = u.ContractTypeId,
                            copyDate =  u.DateOfContract,
                            TypeName = contractTypeList.FirstOrDefault(c => c.Id == u.ContractTypeId).TypeName
                        }).Distinct());
                    }
                    contractResponseList = ReturnContract(contractResponseList, selectAffiliatedRetailersList, allAffiliatedRetailers,
                        retailersList, allRetailersList, allContractList, nestedAffiliatedRetailersList, contractTypeList);
                    var contRespIdList = (from contract in contractResponseList
                                          select contract.Id).Distinct().ToList();
                    var contractWithoutClone = new List<ContractResponse>();
                    foreach (var contract in contRespIdList)
                    {
                        contractWithoutClone.Add(contractResponseList.FirstOrDefault(u => u.Id == contract));
                    }
                    sortedContractResponseList.AddRange(contractWithoutClone.Where(u => u.ContractTypeId == 1).ToList());
                }
            }
            catch(Exception ex)
            {

            }
            return jsSerializer.Serialize(sortedContractResponseList);
        }


        public static List<ContractResponse> ReturnContract(List<ContractResponse> contractResponseList, 
            List<AffiliatedRetailers> selectAffiliatedRetailersList, 
            List<AffiliatedRetailers> allAffiliatedRetailers,
            List<Retailers> retailersList,
            List<Retailers> allRetailersList,
            List<Contracts> contractList, List<NestedAffiliatedRetailers> nestedAffiliatedRetailersList,
            List<ContractType> contractTypeList)
        {
            List<NestedAffiliatedRetailers> selectNested = new List<NestedAffiliatedRetailers>();
            for (int i = 0; i < retailersList.Count; i++)
            {
                selectNested = nestedAffiliatedRetailersList.Where(u => u.RetailerId == retailersList[i].Id).ToList();

                selectAffiliatedRetailersList.AddRange(from affiated in allAffiliatedRetailers from nested in selectNested
                                                       where affiated.Id == nested.AffiliatedRetailerId
                                                       select affiated);
                for (int j = 0; j < selectAffiliatedRetailersList.Count; j++)
                {
                    List<ContractResponse> selectContractsResponse = new List<ContractResponse>();

                    var selectRetailerList = allRetailersList.Where(u => u.AffiliatedRetailerId == selectAffiliatedRetailersList[j].Id);
                    retailersList.AddRange(selectRetailerList);
                    selectContractsResponse.AddRange(contractList.Where(u => u.FromAffiliatedRetailerId == selectAffiliatedRetailersList[j].Id ||
                    u.ToAffiliatedRetailerId == selectAffiliatedRetailersList[j].Id).Select(c => new ContractResponse() {
                        Id = c.Id,
                        FromAffiliatedRetailerId = c.FromAffiliatedRetailerId,
                        FromAffiliatedRetailer = allAffiliatedRetailers.FirstOrDefault(n => n.Id == c.FromAffiliatedRetailerId).Name,
                        ToAffiliatedRetailerId = c.ToAffiliatedRetailerId,
                        ToAffiliatedRetailer = allAffiliatedRetailers.FirstOrDefault(n => n.Id == c.ToAffiliatedRetailerId).Name,
                        DateOfContract = c.DateOfContract.ToShortDateString(),
                        ContractTypeId = c.ContractTypeId,
                        copyDate = c.DateOfContract,
                        TypeName = contractTypeList.FirstOrDefault(n => n.Id == c.ContractTypeId).TypeName
                    }).Distinct());
                    retailersList.Remove(retailersList[i]);
                    selectAffiliatedRetailersList.Remove(selectAffiliatedRetailersList[j]);
                    if (selectContractsResponse.Count != 0)
                    {
                        contractResponseList.AddRange(selectContractsResponse);
                    }
                    return ReturnContract(contractResponseList, selectAffiliatedRetailersList, allAffiliatedRetailers,
                        retailersList, allRetailersList, contractList, nestedAffiliatedRetailersList, contractTypeList);
                }
            }
            return contractResponseList;
        }

        [HttpPost]

        public string GetContractByFilter(string args)
        {
            var sortedContractResponseList = new List<ContractResponse>();
            var jsSerializer = new JavaScriptSerializer();
            try
            {
                var argsAsObject = jsSerializer.Deserialize<ContractRequest>(args);
                using (var dbContext = new RetailersContext())
                {
                    var contractResponseList = new List<ContractResponse>();
                    var allRetailersList = dbContext.Retailers.ToList();

                    var allContractList = dbContext.Contracts.ToList();

                    var allAffiliatedRetailers = dbContext.AffiliatedRetailers.ToList();
                    var contractTypeList = dbContext.ContractType.ToList();

                    var allNestedAffiliatedRetailersList = dbContext.NestedAffiliatedRetailers.ToList();
                    var selectAffiliatedRetailersList = new List<AffiliatedRetailers>();
                    var retailersList = new List<Retailers>();
                   
                    foreach (var retailerId in argsAsObject.ReailerId)
                    {
                        var retailer = allRetailersList.FirstOrDefault(u => u.Id == retailerId);
                        var contractList = allContractList.Where(u => u.FromAffiliatedRetailerId == retailer.AffiliatedRetailerId || u.ToAffiliatedRetailerId == retailer.AffiliatedRetailerId).ToList();
                        retailersList.Add(retailer);
                        var nestedAffiliatedRetailersList = allNestedAffiliatedRetailersList.ToList();
                        if (contractList.Count != 0)
                        {
                            contractResponseList.AddRange(contractList.Select(u => new ContractResponse()
                            {
                                Id = u.Id,
                                FromAffiliatedRetailerId = u.FromAffiliatedRetailerId,
                                FromAffiliatedRetailer = allAffiliatedRetailers.FirstOrDefault(c => c.Id == u.FromAffiliatedRetailerId).Name,
                                ToAffiliatedRetailerId = u.ToAffiliatedRetailerId,
                                ToAffiliatedRetailer = allAffiliatedRetailers.FirstOrDefault(c => c.Id == u.ToAffiliatedRetailerId).Name,
                                DateOfContract = u.DateOfContract.ToShortDateString(),
                                ContractTypeId = u.ContractTypeId,
                                copyDate = u.DateOfContract,
                                TypeName = contractTypeList.FirstOrDefault(c => c.Id == u.ContractTypeId).TypeName
                            }).Distinct());
                        }
                        contractResponseList = ReturnContract(contractResponseList, selectAffiliatedRetailersList, allAffiliatedRetailers,
                            retailersList, allRetailersList, allContractList, nestedAffiliatedRetailersList, contractTypeList);
                    }

                    
                    var contRespIdList = (from contract in contractResponseList
                                        select contract.Id).Distinct().ToList();
                    var contractWithoutClone = new List<ContractResponse>();
                    foreach (var contract in contRespIdList)
                    {
                        contractWithoutClone.Add(contractResponseList.FirstOrDefault(u => u.Id == contract));
                    }

                    DateTime? fromDate = null;
                    DateTime? toDate = null;

                    if (argsAsObject.FromDate != "")
                    {
                        fromDate = DateTime.ParseExact(argsAsObject.FromDate, "dd.MM.yyyy", CultureInfo.CurrentCulture);
                    }
                    if (argsAsObject.ToDate != "")
                    {
                        toDate = DateTime.ParseExact(argsAsObject.ToDate, "dd.MM.yyyy", CultureInfo.CurrentCulture);
                    }

                    if (argsAsObject.ContractTypeId == 0)
                    {
                        if (fromDate != null && toDate != null)
                        {
                            sortedContractResponseList.AddRange(contractWithoutClone.Where(u => u.copyDate > fromDate && u.copyDate < toDate));
                        }
                        else if (fromDate == null && toDate != null)
                        {
                            sortedContractResponseList.AddRange(contractWithoutClone.Where(u => u.copyDate == toDate));
                        }
                        else if (fromDate != null && toDate == null)
                        {
                            sortedContractResponseList.AddRange(contractWithoutClone.Where(u => u.copyDate == fromDate));
                        }
                        else
                        {
                            sortedContractResponseList.AddRange(contractWithoutClone);
                        }
                    }
                    else
                    {
                        if (fromDate != null && toDate != null)
                        {
                            sortedContractResponseList.AddRange(contractWithoutClone.Where(u => u.copyDate > fromDate && u.copyDate < toDate && u.ContractTypeId == argsAsObject.ContractTypeId));
                        }
                        else if (fromDate == null && toDate != null)
                        {
                            sortedContractResponseList.AddRange(contractWithoutClone.Where(u => u.copyDate == toDate && u.ContractTypeId == argsAsObject.ContractTypeId));
                        }
                        else if (fromDate != null && toDate == null)
                        {
                            sortedContractResponseList.AddRange(contractWithoutClone.Where(u => u.copyDate == fromDate && u.ContractTypeId == argsAsObject.ContractTypeId));
                        }
                        else
                        {
                            sortedContractResponseList.AddRange(contractWithoutClone.Where(u => u.ContractTypeId == argsAsObject.ContractTypeId));
                        }
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return jsSerializer.Serialize(sortedContractResponseList);
        }
    }
}