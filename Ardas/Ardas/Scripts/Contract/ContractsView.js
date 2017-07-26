$$r(function () {
    GetAllRetailer();
    GetContractTypeForSelect();
});

function GetAllRetailer() {
    var methodName = "GetAllRetailers";
    var divRetailer = document.getElementById('retailer');

    var select = document.createElement('select');
    select.className = 'form-control text-box single-line';
    select.id = 'musltiselect';
    select.multiple = 'multiple';
    select.style.height = '300px';


    
    CallLoadServerMethodHome(methodName, null, function (result) {
        if (result.length != 0) {
           
            result.forEach(function (item, i) {
                optionOneRootRetailer = document.createElement('option');
                optionOneRootRetailer.style.width = '100%';
                optionOneRootRetailer.value = item.Id;
                optionOneRootRetailer.id = 'retailer' + item.Id;
                optionOneRootRetailer.textContent = item.RetailerName;
                optionOneRootRetailer.style.cursor = 'pointer';
                select.appendChild(optionOneRootRetailer);
            });

            divRetailer.appendChild(select);

        }
    });
}



function GetContractTypeForSelect() {
    var methodName = "GetContractTypeForSelect";
    var divContractType = document.getElementById('contractType');

    CallLoadServerMethod(methodName, null, function (result) {
        if (result.length != 0) {
            var select = document.createElement('select');
            select.className = 'form-control text-box single-line';
            select.id = 'contactTypeSelect';

            var optionAll = document.createElement('option');
            optionAll.value = 0;
            optionAll.textContent = 'All';
            optionAll.style.cursor = 'pointer';
            select.appendChild(optionAll);

            result.forEach(function (item, i) {
                var optionOneContractType = document.createElement('option');
                optionOneContractType.value = item.Id;
                optionOneContractType.textContent = item.TypeName;
                optionOneContractType.style.cursor = 'pointer';
                select.appendChild(optionOneContractType);
            });

            divContractType.appendChild(select);
        }
    });
}

function TestDateFormat(date) {
    var arrPartDate = date.split('.');
    var test = false;
    if (arrPartDate.length == 3) {
        var day = parseInt(arrPartDate[0]);
        var month = parseInt(arrPartDate[1]);
        var year = parseInt(arrPartDate[2]);
        if (day > 0 && day < 32 && month != 2) {
            test = true;
        }
        else if (day > 0 && day < 30 && month == 2) {
            test = true;
        }
        else {
            return false;
        }
        if (month > 0 && month <= 12) {
            test = true;
        }
        else {
            return false;
        }
        if (year > 1900) {
            test = true;
        }
        else return false;
        return test;
    }
    else {
        return false;
    }
}

function GetContractByFilter() {
    var loadImage = document.getElementById('load');
    loadImage.style.display = 'block';

    var contracts = document.getElementById('contractsBlock');
    var methodName = "GetContractByFilter";
    var request = {};


    request.ReailerId = $('#musltiselect').val();
    if (request.ReailerId == null) {
        return;
    }
    
    request.FromDate = $('#FromDate').val();
    request.ToDate = $('#ToDate').val();
    request.ContractTypeId = $('#contactTypeSelect').val();
     
    var isСorrectFormat;
    if (request.FromDate != "") {
        isСorrectFormat = TestDateFormat(request.FromDate);
        if (isСorrectFormat == false) {
            return;
        }
    }
    if (request.ToDate != '') {
        isСorrectFormat = TestDateFormat(request.ToDate);
        if (isСorrectFormat == false) {
            return;
        }
    }


    CallLoadServerMethod(methodName, JSON.stringify(request), function (result) {
        if (result.length != 0) {
            var table = document.getElementById('tableContract');
            if (table != null) {
                contracts.removeChild(table);
            }
            table = document.createElement('table');
            table.id = 'tableContract';
            var trHead = document.createElement('tr');
            var thFromAffiliated = document.createElement('th');
            thFromAffiliated.style.fontWeight = 'bold';
            thFromAffiliated.style.textAlign = 'center';
            thFromAffiliated.style.border = '1px solid black';
            thFromAffiliated.textContent = 'From Affiliated Retailer';

            var thToAffiliated = document.createElement('th');
            thToAffiliated.style.fontWeight = 'bold';
            thToAffiliated.style.textAlign = 'center';
            thToAffiliated.style.border = '1px solid black';
            thToAffiliated.textContent = 'To Affiliated Retailer';

            var thDateOfContract = document.createElement('th');
            thDateOfContract.style.fontWeight = 'bold';
            thDateOfContract.style.textAlign = 'center';
            thDateOfContract.style.border = '1px solid black';
            thDateOfContract.textContent = 'Date of Contract';

            var thTypeName = document.createElement('th');
            thTypeName.style.fontWeight = 'bold';
            thTypeName.style.textAlign = 'center';
            thTypeName.style.border = '1px solid black';
            thTypeName.textContent = 'Type of contract';

            trHead.appendChild(thFromAffiliated);
            trHead.appendChild(thToAffiliated);
            trHead.appendChild(thDateOfContract);
            trHead.appendChild(thTypeName);

            var tbody = document.createElement('tbody');

            result.forEach(function (item, i) {
                var trBody = document.createElement('tr');
                trBody.id = 'contract' + item.Id

                var tdFromAffiliated = document.createElement('td');
                tdFromAffiliated.style.border = '1px solid black';
                tdFromAffiliated.style.textAlign = 'center';
                tdFromAffiliated.textContent = item.FromAffiliatedRetailer;

                var tdToAffiliated = document.createElement('td');
                tdToAffiliated.style.border = '1px solid black';
                tdToAffiliated.style.textAlign = 'center';
                tdToAffiliated.textContent = item.ToAffiliatedRetailer;

                var tdDateOfContract = document.createElement('td');
                tdDateOfContract.style.border = '1px solid black';
                tdDateOfContract.style.textAlign = 'center';
                tdDateOfContract.textContent = item.DateOfContract;

                var tdTypeName = document.createElement('td');
                tdTypeName.style.border = '1px solid black';
                tdTypeName.style.textAlign = 'center';
                tdTypeName.textContent = item.TypeName;

                trBody.appendChild(tdFromAffiliated);
                trBody.appendChild(tdToAffiliated);
                trBody.appendChild(tdDateOfContract);
                trBody.appendChild(tdTypeName);

                tbody.appendChild(trBody)
            });

            table.appendChild(trHead);
            table.appendChild(tbody);

            loadImage.style.display = 'none';

            contracts.appendChild(table);
        }
        else {
            var table = document.getElementById('tableContract');
            if (table != null) {
                contracts.removeChild(table);
            }
            loadImage.style.display = 'none';

        }
        
    });

}

function CallLoadServerMethod(methodName, args, onsucces, onerror) {
    $.ajax({
        url: '/Contract/' + methodName,
        type: "POST",
        async: true,
        cache: false,
        dataType: "json",
        data: "{'args':'" + args + "'}",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            onsucces(result);
        },
        error: function (e) {
            onerror(e);
        }
    });
}

function CallLoadServerMethodHome(methodName, args, onsucces, onerror) {
    $.ajax({
        url: '/Home/' + methodName,
        type: "POST",
        async: true,
        cache: false,
        dataType: "json",
        data: "{'args':'" + args + "'}",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            onsucces(result);
        },
        error: function (e) {
            onerror(e);
        }
    });
}