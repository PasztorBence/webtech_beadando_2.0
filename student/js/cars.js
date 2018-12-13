var carRowTmpl = function (car) {
    return $(`
    <tr class = "carRow">
        <td>${car.name}</td>
        <td>${car.consumption}</td>
        <td>${car.color}</td>
        <td>${car.manufacturer}</td>
        <td>${car.available}</td>
        <td>${car.year}</td>
        <td>${car.horsepower}</td>
        
    </tr>
    `)
};
var addCarTmpl = function () {
    return $(`
        <form id = "addCarForm">
            <table class = "add-car-table">
                <tr>
                    <td>Name:</td>
                    <td><input id = "name" type = "text" name = "name" required></td>
                </tr>
                <tr>
                    <td>Consumption:</td>
                    <td><input id = "consumption" type = "text" name = "consumption" required></td>
                </tr>
                <tr>
                    <td>Color:</td>
                    <td><input id = "color" type = "text" name = "color" required></td>
                </tr>
                <tr>
                    <td>Manufacturer:</td>
                    <td><select id = "manufacturer" type = "text" name = "manufacturer" required></td>
                </tr>
                <tr>
                    <td>Available:</td>
                    <td><input id = "available" type = "number" name = "available" required></td>
                </tr>
                <tr>
                    <td>Year:</td>
                    <td><input id = "year" type = "number" name = "year" required></td>
                </tr>
                <tr>
                    <td>Horsepower:</td>
                    <td><input id = "horsepower" type = "number" name = "horsepower" required></td>
                </tr>
            </table>
            <button class = "send-button" type = "submit">Send</button>
        </form>
    `)
};

function getCars() {
    $.getJSON("cars", function (cars) {
        for (let car of cars) {
            var row = carRowTmpl(car);
            $("#carsTable").append(row);
        }
    })
    $.getJSON("/manufacturerNames", function (mNames) {
        window.manufacturerNames = mNames;
    }).fail(function () {
        alert("Cannot get the manufacturer names");
    })
}

function addCar() {
    $("#content").empty();
    $("#content").append(addCarTmpl);
    $.each(window.manufacturerNames, function (i, item) {
        $('#manufacturer').append($('<option>', {
            value: item,
            text : item
        }));
    });
    $("#addCarForm").submit(function (e) {
        e.preventDefault();
        $.post("/addCar",
            $("#addCarForm").serialize(),
            function(data,status) {
                alert("Successfull sending!");
                $(".carRow").empty();
                $("#content").empty();
                $("#content").load("html/cars.html", function () {
                    getCars();
                    $("#addCarBtn").click(function () {
                        addCar();
                    })
                });
            }).fail(function (err) {
                if(err.status == 409) {
                    alert("The name isn't unique!");
                } else {
                    alert("Something bad happend..");
                }
            })
    })
}
