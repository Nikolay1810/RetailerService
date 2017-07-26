$$r(function () {
    GetAllRetailers();
});

function GetAllRetailers() {
    var methodName = "GetAllRetailers";
    var divRoot = document.getElementById('retailers');

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
                optionOneRootRetailer.setAttribute('onclick', 'GetRootRetailerBySpecified()');
                select.appendChild(optionOneRootRetailer);
            });

            divRoot.appendChild(select);
            GetRootRetailerBySpecified();

        }
    });
}

function GetRootRetailerBySpecified()
{
    var rootRetailer = document.getElementById('rootRetailer');
    var methodName = "GetRootRetailerBySpecified";
    var request = {};

    request.Id = $('#selectRetailer').val();
    CallLoadServerMethod(methodName, JSON.stringify(request), function (result) {
        if (result != null && result != "") {
            var pRoot = document.getElementById('RetailerName');
            if (pRoot != null)
            {
                rootRetailer.removeChild(pRoot);
            }
            pRoot = document.createElement('p');
            pRoot.textContent = result.DisplayName;
            pRoot.id = "RetailerName";
            pRoot.style.fontWeight = 'bold';
        }
        rootRetailer.appendChild(pRoot);

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


