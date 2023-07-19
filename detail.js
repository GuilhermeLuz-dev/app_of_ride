const param = new URLSearchParams(document.location.search)
const id = param.get('id')

const ride = getRideRecord(id)

const map = L.map('mapDetail')

document.addEventListener('DOMContentLoaded', async ()=>{

	const data = document.querySelector('#data')

	const itemElement = document.createElement("li")
    itemElement.id = ride.id
    itemElement.className = "d-flex align-items-center mt-3 bg bg-success text-white rounded-3 p-2"
    

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
	data.appendChild(itemElement)

	const deleteBTN = document.querySelector('#deleteBtn')

	deleteBTN.addEventListener('click', ()=>{
		deleteRide(id)
		window.location.href = "./"

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
