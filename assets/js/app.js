

const listAtmURL = 'https://filebase.xyz/pbatm/';

(async function(){

    let listAtm = await fetch(listAtmURL).then(data => data.json()).then(data => data = data.devices);

    globalThis.navigator.geolocation.getCurrentPosition(data => {

        let myCoordinateObj = data.coords;

        for (let atmCoordinateObj of listAtm) {

            atmCoordinateObj = distanceFunc(myCoordinateObj, atmCoordinateObj);
           
        };

        let listAtmFirst = listAtm.sort((a,b) => +a.distance - +b.distance).slice(0,5);

        displayResult(listAtmFirst);

        console.log(myCoordinateObj, listAtmFirst)
            
    }), (error => console.log(error));

}())


function distanceFunc(myCoordinateObj, atmCoordinateObj){

    pi = Math.PI;
    rEarth = 6371009;

    xMyRad = (+myCoordinateObj.latitude * pi)/180;
    yMyRad = (+myCoordinateObj.longitude * pi)/180;
    xAtmRad = (+atmCoordinateObj.longitude * pi)/180;
    yAtmRad = (+atmCoordinateObj.latitude * pi)/180;

    atmCoordinateObj.distance = Math.floor(2*rEarth*Math.asin(Math.sqrt(((Math.sin((xMyRad-xAtmRad)/2))**2)+Math.cos(xMyRad)*Math.cos(xAtmRad)*((Math.sin((yMyRad-yAtmRad)/2))**2))));

    return atmCoordinateObj
}

function displayResult(dataArr){
    for (item of dataArr){
        let row = nearestAtm.insertRow();
      
        let cell = row.insertCell();
        let text = document.createTextNode(item.distance);
        cell.appendChild(text);

        cell = row.insertCell();
        text = document.createTextNode(' - ');
        cell.appendChild(text);

        cell = row.insertCell();
        text = document.createTextNode(item.fullAddressRu);
        cell.appendChild(text);
      }
}