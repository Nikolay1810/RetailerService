$$r(function () {
    GetRootRetailers();
    GetAllRetailers();
});

function GetRootRetailers() {
    var loadImage = document.getElementById('load');
    loadImage.style.display = 'block';

    var methodName = "GetRootRetailer";
    var divRetailer = document.getElementById('rootRetailer');

    CallLoadServerMethod(methodName, null, function (result) {
        if (result.length != 0) {
            var select = document.createElement('select');
            select.className = 'form-control text-box single-line';
            select.id = 'selectRootRetailer';
            result.forEach(function (item, i) {
                var optionOneRetailer = document.createElement('option');
                optionOneRetailer.style.width = '15%';
                optionOneRetailer.value = item.Id;
                optionOneRetailer.id = 'root' + item.Id;
                optionOneRetailer.textContent = item.DisplayName;
                optionOneRetailer.style.cursor = 'pointer';
                select.appendChild(optionOneRetailer);
            });
            divRetailer.appendChild(select);

        }
    });
}
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
                var optionOneRetailer = document.createElement('option');
                optionOneRetailer.style.width = '15%';
                optionOneRetailer.value = item.Id;
                optionOneRetailer.id = 'root' + item.Id;
                optionOneRetailer.textContent = item.RetailerName;
                optionOneRetailer.style.cursor = 'pointer';
                select.appendChild(optionOneRetailer);
            });
            loadImage.style.display = 'none';
            divRetailer.appendChild(select);

        }
    });
}



function AddAffiliatedRetailer() {
    var request = {};
    request.Name = $('#Name').val();
    request.isForRootRetailer = $("#isRoot").prop('checked');
    request.RootRetailerId = $('#selectRootRetailer').val();
    request.RetailerId = $('#selectRetailer').val();
    if (request.Name == "" || request.Name == 'Enter name retailer') {
        $('#Name').val("Enter name retailer");
        return;
    }
    var methodName = 'AddAffiliatedRetailer';
    CallLoadServerMethod(methodName, JSON.stringify(request), function (result) {
        if (result != null && result != '') {
            href = '/';
            window.location.reload(href);
        }
    });

}

function IsChecked() {
    var isRoot = $("#isRoot").prop('checked');
    var retaileBlock = document.getElementById('RetaileBlock');
    if (isRoot) {
        retaileBlock.style.display = 'none';
    }
    else {
        retaileBlock.style.display = 'block';
    }
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