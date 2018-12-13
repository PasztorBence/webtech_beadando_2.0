var manufacturersTmpl = function (manufacturer) {
    return `<tr class = "manufacturerRow">
                <td>${manufacturer.name}</td>
                <td>${manufacturer.country}</td>
                <td>${manufacturer.founded}</td>
            </tr>`
}

var addManufacturerTmpl = function () {
    return $(`
        <form id = "addManufacturerForm">
            <table class = "add-manufacturer-table">
                <tr>
                    <td>Name:</td>
                    <td><input id = "name" type = "text" name = "name" required></td>
                </tr>
                <tr>
                    <td>Country:</td>
                    <td><input id = "country" type = "text" name="country" required</td>
                </tr>
                <tr>
                    <td>Founded:</td>
                    <td><input id = "founded" type = "date" name="founded" required</td>
                </tr>
            <tr>
            <td><button class = "send-button" type = "submit">Send</button></td>
            </tr>
            </table>
        </form>
    `)
};

function getManufacturers() {
    $.getJSON("manufacturers", function (manufacturers) {
        for (var manufacturer of manufacturers) {
            $("#manufacturerTable").append(manufacturersTmpl(manufacturer));
        }
    }).fail(function(){
        alert("Cannot get the manufacturers");
    })
}

function addManufacturer() {
    $("#content").empty();
    $("#content").append(addManufacturerTmpl);
    $("#addManufacturerForm").submit(function (e) {
        e.preventDefault();
        $.post("/addManufacturers",
            $("#addManufacturerForm").serialize(),
            function (data, succes) {
                alert("Successfull sending!");
                $(".manufacturerRow").empty();
                $("#content").empty();
                $("#content").load("html/manufacturers.html", function () {
                    getManufacturers();
                    $("#addManufacturerBtn").click(function () {
                        addManufacturer()
                    })
                })
            }).fail (function (err, status) {
                if(err.status == 409) {
                    alert("The name isn't unique!");
                } else {
                    alert("Something bad happend..");
                }
            })
    })
}