const rideItemElement = document.querySelector("#rideList")

const allRides = getAllRides();

allRides.forEach(async ([id, value]) => {
    const ride = JSON.parse(value)
    ride.id = id
    console.log(ride.data[0])
    const itemElement = document.createElement("li")
    itemElement.id = ride.id
    itemElement.className = "d-flex align-items-center mt-3 bg bg-success text-white rounded-3 p-2"
    
    itemElement.addEventListener('click', ()=>{
        window.location.href = `./detail.html?id=${ride.id}`;
    })
    rideItemElement.appendChild(itemElement)

    const dataElements = document.createElement('div')

    const firstPosition = ride.data[0];
    const firstPositionData = await getLocationData(firstPosition.latitude, firstPosition.longitude);


    const mapDiv = document.createElement("div")
    mapDiv.className = "bg bg-primary rounded-3 mapStyle me-2"

   

    const maxSpeedDiv = document.createElement("div")
    maxSpeedDiv.innerHTML = `Max speed : ${maxSpeedRide(ride.data)}`
    maxSpeedDiv.className = "mb-1 fw-bold" 
   

    const city = document.createElement("div")
    city.innerHTML = firstPositionData.city + " - " + firstPositionData.countryCode;


    const distanceDiv = document.createElement('div')
    distanceDiv.innerHTML = `Distance: ${getDistance(ride.data)}`


    const durationDiv = document.createElement("div")
    durationDiv.innerHTML = `Duration : ${getDuration(ride)}`


    const dateDiv = document.createElement('div')
    dateDiv.innerHTML = getRideDate(ride)
    dateDiv.classList = "mt-2"
 
    dataElements.appendChild(maxSpeedDiv)
    dataElements.appendChild(city)
    dataElements.appendChild(distanceDiv)
    dataElements.appendChild(durationDiv);
    dataElements.appendChild(dateDiv);

    itemElement.appendChild(mapDiv);
    itemElement.appendChild(dataElements);

})