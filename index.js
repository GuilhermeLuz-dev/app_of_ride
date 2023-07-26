const rideItemElement = document.querySelector("#rideList")

const allRides = getAllRides();

allRides.forEach(async ([id, value]) => {
    const ride = JSON.parse(value)
    ride.id = id
    const itemElement = document.createElement("li")
    itemElement.id = ride.id
    itemElement.className = "d-flex align-items-center mt-3 bg bg-success text-white rounded-3 p-2"
    itemElement.style = "cursor:pointer"
    
    itemElement.addEventListener('click', ()=>{
        window.location.href = `./detail.html?id=${ride.id}`;
    })
    rideItemElement.appendChild(itemElement)
    
    const dataElements = document.createElement('div')
    
    const firstPosition = ride.data[0];
    const firstPositionData = await getLocationData(firstPosition.latitude, firstPosition.longitude);
    
    const mapId = `map${ride.id}`
    const mapDiv = document.createElement("div")
    mapDiv.id = mapId
    mapDiv.style = "width:100px; height:100px " 
    mapDiv.classList.add("bg-primary")
    mapDiv.classList.add("rounded-3")
    mapDiv.classList.add("me-3")
   

   

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

    const map = L.map(mapId, {
        attributionControl: false,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false
    })

    map.setView([firstPosition.latitude, firstPosition.longitude], 10)
	
	L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
	
	console.log(ride.data)
	
	const positionsArray = ride.data.map((position)=>{
		return [position.latitude, position.longitude]
	})
	
	const polyline = L.polyline(positionsArray, {color:"red"}).addTo(map)
	
	map.fitBounds(polyline.getBounds());

})