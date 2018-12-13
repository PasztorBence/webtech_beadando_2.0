 $(document).ready(function() {

        $("#content").load("html/main.html");

        $("#mainPicture").click(function () {
            $("#content").load("html/main.html");
        });

        $("#carsButton").click(function () {
            $("#content").load("html/cars.html", function () {
                getCars2();
                $("#addCarBtn").click(function () {
                    addCar();
                });
            });
        });

        $("#manufacturersButton").click(function () {
            $("#content").load("html/manufacturers.html", function () {
                getManufacturers();
                $("#addManufacturerBtn").click(function () {
                    addManufacturer();
                });
            });
        });
    });