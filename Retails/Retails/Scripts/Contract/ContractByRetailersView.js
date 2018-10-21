$$r(function () {
    GetAllRetailers();
});

function GetAllRetailers() {
    var loadImage = document.getElementById('load');
    loadImage.style.display = 'block';

    var methodName = "GetAllRetailers";
    var divRetailer = document.getElementById('retailer');

    CallLoadServerMethod(methodName, null, function (result) {
        if (result.length != 0) {
            var select = document.createElement('select');
            select.className = 'form-control text-box single-line';
            select.id = 'selectRetailer';
            result.forEach(function (item, i) {
                var optionOneRootRetailer = document.createElement('option');
                optionOneRootRetailer.style.width = '15%';
                optionOneRootRetailer.value = item.Id;
                optionOneRootRetailer.id = 'root' + item.Id;
                optionOneRootRetailer.textContent = item.RetailerName;
                optionOneRootRetailer.style.cursor = 'pointer';
                optionOneRootRetailer.setAttribute('onclick', 'GetContractByRetailer()');
                select.appendChild(optionOneRootRetailer);
            });

            divRetailer.appendChild(select);
            GetContractByRetailer();

        }
    });
}

function GetContractByRetailer() {
    var loadImage = document.getElementById('load');
    loadImage.style.display = 'block';

    var rootContracts = document.getElementById('retailersContracts');
    var methodName = "GetContractByRetailer";
    var request = {};

    request.Id = $('#selectRetailer').val();
    CallLoadModel(methodName, JSON.stringify(request), function (result) {
        if (result.length != 0) {
            var table = document.getElementById('tableContract');
            if (table != null) {
                rootContracts.removeChild(table);
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

            rootContracts.appendChild(table);
        }
    });

}

function CallLoadServerMethod(methodName, args, onsucces, onerror) {
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

function CallLoadModel(methodName, args, onsucces, onerror) {
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
