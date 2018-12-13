//autó kilistázás
function getCars2(){
    $.get("cars", function(cars) {
        for (let car of cars) {
            $("#carsTable").append("<table>"+
                "        <tr>" +
                "            <td>" + car.manufacturer +"</td>" +
                "            <td>" + car.name +"</td>" +
                "            <td>" + car.year +"</td>" +
                "            <td>" + car.horsepower +"</td>" +
                "            <td>" + car.consumption  +"</td>" +
                "            <td>" + car.color  +"</td>" +
                "            <td>" + car.available  +"</td>" +
                "        </tr>" +
                "    </table>");
        }
    })
}