var addManufacturerTemplate = function () {
    return $('<form id="addManufacturerForm">\n' +
        '    <div id="addManufacturerContent">\n' +
        '        <table id="addManufacturerTable">\n' +
        '            <tr>\n' +
        '                <th>Name</th>\n' +
        '                <th>Country</th>\n' +
        '                <th>Founded</th>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td><input id="name" type="text" name="name" required></td>\n' +
        '                <td><input id="country" type="text" name="country" required></td>\n' +
        '                <td><input id="founded" type="date" name="founded" required></td>\n' +
        '            </tr>\n' +
        '        </table>\n' +
        '        <button class = "send-button" type = "submit">Send new manufacturer</button>\n' +
        '    </div>\n' +
        '</form>')
};

function getManufacturer() {
    $.getJSON("/manufacturerNames", function (mNames) {
        window.manufacturerNames = mNames;
    }).fail(function () {
        alert("Cannot get the manufacturer names");
    })
}

function getManufacturers(){

    $.get("manufacturers", function(manufacturers) {
        for (let manufacturer of manufacturers) {
            $("#manufacturerTable").append(
                "        <tr>" +
                "            <td>" + manufacturer.name +"</td>" +
                "            <td>" + manufacturer.country +"</td>" +
                "            <td>" + manufacturer.founded +"</td>" +
                "        </tr>");
        };
    });
}

function addManufacturer() {
    $("#content").empty();
    $("#content").append(addManufacturerTemplate);
    $("#addManufacturerForm").submit(function (e) {
        e.preventDefault();
        $.post("/addManufacturers",
            $("#addManufacturerForm").serialize(),
            function() {
                $("#content").load("html/manufacturers.html", function () {
                    getManufacturers();
                    $("#addManufacturerBtn").click(function () {
                        addManufacturer();
                    });
                });
            }).fail(function (err) {
            if(err.status == 409) {
                alert("The name isn't unique!");
            } else {
                alert("Something bad happend..");
            };
        });
    });
}