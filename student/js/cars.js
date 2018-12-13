var addCarTemplate = function () {
    return $('<form id="addCarForm">\n' +
        '    <div id="addCarContent">\n' +
        '        <table id="addCarTable">\n' +
        '            <tr>\n' +
        '                <th>Name</th>\n' +
        '                <th>Consumption</th>\n' +
        '                <th>Color</th>\n' +
        '                <th>Manufacturer</th>\n' +
        '                <th>Available</th>\n' +
        '                <th>Year</th>\n' +
        '                <th>Horsepower</th>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td><input id="name" type="text" name="name" required></td>\n' +
        '                <td><input id="consumption" type="text" name="consumption" required></td>\n' +
        '                <td><input id="color" type="text" name="color" required></td>\n' +
        '                <td><select id="manufacturer" type="text" name="manufacturer" required></select></td>\n' +
        '                <td><input id="available" type="number" name="available" required></td>\n' +
        '                <td><input id="year" type="number" name="year" required></td>\n' +
        '                <td><input id="horsepower" type="number" name="horsepower" required></td>\n' +
        '            </tr>\n' +
        '        </table>\n' +
        '        <button class = "send-button" type = "submit">Send new Car</button>\n' +
        '    </div>\n' +
        '</form>')
};

var carRowTemplate = function (car) {
    return $(`
<tr class = "carRow">
    <td>${car.name}</td>
    <td>${car.consumption}</td>
    <td>${car.color}</td>
    <td>${car.manufacturer}</td>
    <td>${car.available}</td>
    <td>${car.year}</td>
    <td>${car.horsepower}</td>
    <td><button class = "show-button">Show</button></td>
</tr>
    `)
};
var tableTemplate = function () {
    return $('<table class="list-table" id="carTypeTable"></table>')
}

function getCars() {
    $.getJSON("cars", function (cars) {
        for (let car of cars) {
            var row = carRowTemplate(car);
            row.find("button").click(function () {
                document.cookie = "name=" + car.manufacturer;
                $.getJSON("manufacturer", function (cars) {
                    $("#content").empty();
                    $("#content").append(tableTemplate())
                    for (var car of cars) {
                            row = carRowTemplate(car);
                        $("#carTypeTable").append(row)
                    }
                }).fail(function(){
                    alert("Cannot get the cars");
                })
            });
            $("#carsTable").append(row);
        }
    })
    getManufacturer()
}

function addCar() {
    $("#content").empty();
    $("#content").append(addCarTemplate());
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
            function() {

                $("#content").load("html/cars.html", function () {
                    getCars();
                    $("#addCarBtn").click(function () {
                        addCar();
                    });
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