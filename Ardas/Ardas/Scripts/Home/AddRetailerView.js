$$r(function () {
    GetAllAffiliatedRetailers();
});

function GetAllAffiliatedRetailers() {
    var loadImage = document.getElementById('load');
    loadImage.style.display = 'block';

    var methodName = "GetAllAffiliatedRetailers";
    var divRetailer = document.getElementById('AffiliatedRetailer');

    CallLoadServerMethod(methodName, null, function (result) {
        if (result.length != 0) {
            var select = document.createElement('select');
            select.className = 'form-control text-box single-line';
            select.id = 'selectAffiliatedRetailer';
            result.forEach(function (item, i) {
                var optionOneRetailer = document.createElement('option');
                optionOneRetailer.style.width = '15%';
                optionOneRetailer.value = item.Id;
                optionOneRetailer.id = 'affiliatedRetailer' + item.Id;
                optionOneRetailer.textContent = item.Name;
                optionOneRetailer.style.cursor = 'pointer';
                select.appendChild(optionOneRetailer);
            });
            loadImage.style.display = 'none';
            divRetailer.appendChild(select);

        }
    });
}



function AddRetailers() {
    var request = {};
    request.RetailerName = $('#RetailerName').val();
    request.isRoot = $("#isRoot").prop('checked');
    request.AffiliatedRetailerId = $('#selectAffiliatedRetailer').val();
    if (request.RetailerName == "" || request.RetailerName == 'Enter name retailer') {
        $('#RetailerName').val("Enter name retailer");
        return;
    }
    var methodName = 'AddRetailers';
    CallLoadServerMethod(methodName, JSON.stringify(request), function (result) {
        if (result != null && result != '') {
            href = '/';
            window.location.reload(href);
        }
    });

}

function IsChecked()
{
    var isRoot = $("#isRoot").prop('checked');
    var affiliatedRetailer = document.getElementById('AffiliatedRetailerBlock');
    if (isRoot) {
        affiliatedRetailer.style.display = 'none';
    }
    else {
        affiliatedRetailer.style.display = 'block';
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