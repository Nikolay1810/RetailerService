$$r(function () {
    GetRootRetailer();
});

function GetRootRetailer() {
    var loadImage = document.getElementById('load');
    loadImage.style.display = 'block';

    var methodName = "GetRootRetailer";
    var divHomeContent = document.getElementById('homeContent');

    CallLoadModel(methodName, null, function (result) {
        if (result.length != 0) {
            var divRoot = document.createElement('div');
            divRoot.style.display = 'block';
            divRoot.style.borderLeft = '1px solid black';
            divRoot.style.paddingLeft = '20px';
            result.forEach(function (item, i) {
                var divOneRootRetailer = document.createElement('div');
                divOneRootRetailer.style.width = '100%';
                divOneRootRetailer.id = 'root' + item.Id;
                divOneRootRetailer.textContent = item.DisplayName;
                divOneRootRetailer.style.cursor = 'pointer';
                divOneRootRetailer.setAttribute('onclick', GetNameFunction('GetAffiliatedRetailers'));
                divRoot.appendChild(divOneRootRetailer);
            });
            loadImage.style.display = 'none';
            divHomeContent.appendChild(divRoot);
        }
    });
}

function GetNameFunction(nameFunction){
    return nameFunction + '(this)';
}

function GetAffiliatedRetailers(elementOnClick) {
    var id = elementOnClick.id.replace('root', '');


    var divOneRootRetailer = document.getElementById(elementOnClick.id);
    var affiliatedRetailerListId = 'affiliatedRetailerList' + id;
    var divAffiliatedRetailerList = document.getElementById(affiliatedRetailerListId);
    if (divAffiliatedRetailerList == null) {

        var request = {};
        request.Id = id;
        var methodName = "GetAffiliatedRetailers";
        CallLoadModel(methodName, JSON.stringify(request), function (result) {
            if (result.length != 0) {
                divAffiliatedRetailerList = document.createElement('div');
                divAffiliatedRetailerList.id = 'affiliatedRetailerList' + id;
                divAffiliatedRetailerList.style.display = 'block';
                divAffiliatedRetailerList.style.borderLeft = '1px solid black';
                divAffiliatedRetailerList.style.paddingLeft = '20px';
                result.forEach(function (item, i) {
                    var divOneAffiliatedRetailer = document.createElement('div');
                    divOneAffiliatedRetailer.style.width = '100%';
                    divOneAffiliatedRetailer.id = 'affiliated' + item.Id;
                    divOneAffiliatedRetailer.textContent = item.Name;
                    divOneAffiliatedRetailer.style.cursor = 'pointer';
                    divOneAffiliatedRetailer.setAttribute('onclick', GetNameFunction('GetRetailers'));
                    divAffiliatedRetailerList.appendChild(divOneAffiliatedRetailer);
                });

                divOneRootRetailer.appendChild(divAffiliatedRetailerList);
            }
        });
    }
}

function GetRetailers(elementOnClick) {
    var id = elementOnClick.id.replace('affiliated', '');

    var divOneAffiliatedRetailer = document.getElementById(elementOnClick.id);
    var retailerListId = 'retailerList' + id;
    var divretailerList = document.getElementById(retailerListId);
    if (divretailerList == null) {
        var request = {};
        request.Id = id;
        var methodName = "GetRetailers";
        CallLoadModel(methodName, JSON.stringify(request), function (result) {
            if (result.length != 0) {
                divretailerList = document.createElement('div');
                divretailerList.id = 'retailerList' + id;
                divretailerList.style.display = 'block';
                divretailerList.style.borderLeft = '1px solid black';
                divretailerList.style.paddingLeft = '20px';
                result.forEach(function (item, i) {
                    var divOneRetailer = document.createElement('div');
                    divOneRetailer.style.width = '100%';
                    divOneRetailer.id = 'retailer' + item.Id;
                    divOneRetailer.textContent = item.RetailerName;
                    divOneRetailer.style.cursor = 'pointer';
                    divOneRetailer.setAttribute('onclick', GetNameFunction('GetNestedAffiliated'));
                    divretailerList.appendChild(divOneRetailer);
                });

                divOneAffiliatedRetailer.appendChild(divretailerList);
            }
        });
    }
}


function GetNestedAffiliated(elementOnClick) {
    var id = elementOnClick.id.replace('retailer', '');

    var divOneRetailer = document.getElementById(elementOnClick.id);
    var nestedAffiliatedId = 'nestedAffiliatedList' + id;
    var nestedAffiliatedList = document.getElementById(nestedAffiliatedId);
    if (nestedAffiliatedList == null) {
        var request = {};
        request.Id = id;
        var methodName = "GetNestedAffiliated";
        CallLoadModel(methodName, JSON.stringify(request), function (result) {
            if (result.length != 0) {
                nestedAffiliatedList = document.createElement('div');
                nestedAffiliatedList.id = 'nestedAffiliatedList' + id;
                nestedAffiliatedList.style.display = 'block';
                nestedAffiliatedList.style.borderLeft = '1px solid black';
                nestedAffiliatedList.style.paddingLeft = '20px';
                result.forEach(function (item, i) {
                    var divOneNested = document.createElement('div');
                    divOneNested.style.width = '100%';
                    divOneNested.id = 'affiliated' + item.Id;
                    divOneNested.textContent = item.Name;
                    divOneNested.style.cursor = 'pointer';
                    divOneNested.setAttribute('onclick', GetNameFunction('GetRetailers'));
                    nestedAffiliatedList.appendChild(divOneNested);
                });

                divOneRetailer.appendChild(nestedAffiliatedList);
            }
        });
    }
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