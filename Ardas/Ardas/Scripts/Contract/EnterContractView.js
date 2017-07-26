$$r(function () {
    GetRootRetailer();
    GetContractTypeForSelect();
});

function GetRootRetailer() {
    var methodName = "GetRootRetailer";
    var divRoot = document.getElementById('rootSelect');

    CallLoadModel(methodName, null, function (result) {
        if (result.length != 0) {
            var select = document.createElement('select');
            select.className = 'form-control text-box single-line';
            select.id = 'selectRootRetailer';
            result.forEach(function (item, i) {
                var optionOneRootRetailer = document.createElement('option');
                optionOneRootRetailer.style.width = '15%';
                optionOneRootRetailer.value = item.Id;
                optionOneRootRetailer.id = 'root' + item.Id;
                optionOneRootRetailer.textContent = item.DisplayName;
                optionOneRootRetailer.style.cursor = 'pointer';
                optionOneRootRetailer.setAttribute('onclick', 'GetAffiliatedRetailers()')
                select.appendChild(optionOneRootRetailer);
            });

            divRoot.appendChild(select);
            GetAffiliatedRetailers();

        }
    });
}

function GetAffiliatedRetailers() {
    var firstSelectAffiliated = document.getElementById('firstSelectAffiliated');
    var secondSelectAffiliated = document.getElementById('secondSelectAffiliated');


    var methodName = "GetAffiliatedRetailersForSelect";
    var request = {};
    request.Id = $('#selectRootRetailer').val();
    CallLoadServerMethod(methodName, JSON.stringify(request), function (result) {
        if (result.length != 0) {
            var firstSelect = document.getElementById('firstSelectAffiliatedRetailer');
            if (firstSelect != null) {
                firstSelectAffiliated.removeChild(firstSelect);
            }
            var secondSelect = document.getElementById('secondSelectAffiliatedRetailer');
            if (secondSelect != null) {
                secondSelectAffiliated.removeChild(secondSelect);
            }
            firstSelect = document.createElement('select');
            firstSelect.className = 'form-control text-box single-line';
            firstSelect.id = 'firstSelectAffiliatedRetailer';

            secondSelect = document.createElement('select');
            secondSelect.className = 'form-control text-box single-line';
            secondSelect.id = 'secondSelectAffiliatedRetailer';

            result.forEach(function (item, i) {
                var optionFirstAffiliatedRootRetailer = document.createElement('option');
                optionFirstAffiliatedRootRetailer.style.width = '15%';
                optionFirstAffiliatedRootRetailer.value = item.Id;
                optionFirstAffiliatedRootRetailer.textContent = item.Name;
                optionFirstAffiliatedRootRetailer.style.cursor = 'pointer';
                firstSelect.appendChild(optionFirstAffiliatedRootRetailer);

                var optionSecondAffiliatedRootRetailer = document.createElement('option');
                optionSecondAffiliatedRootRetailer.style.width = '15%';
                optionSecondAffiliatedRootRetailer.value = item.Id;
                optionSecondAffiliatedRootRetailer.textContent = item.Name;
                optionSecondAffiliatedRootRetailer.style.cursor = 'pointer';
                secondSelect.appendChild(optionSecondAffiliatedRootRetailer);
            });
            firstSelectAffiliated.appendChild(firstSelect);
            secondSelectAffiliated.appendChild(secondSelect);
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

function CreateNewContract() {
    var methodName = 'CreateNewContrac';
    var request = {};
    request.FromAffiliatedRetailerId = $('#firstSelectAffiliatedRetailer').val();
    request.ToAffiliatedRetailerId = $('#secondSelectAffiliatedRetailer').val();
    if (request.FromAffiliatedRetailerId == request.ToAffiliatedRetailerId)
    {
        return;
    }
    request.ContractTypeId = $('#contactTypeSelect').val();
    
    CallLoadServerMethod(methodName, JSON.stringify(request), function (result) {
        if (result != null && result != '') {
            href = '/';
            window.location.reload(href);
        }
    });

}

function CallLoadModel(methodName, args, onsucces, onerror) {
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