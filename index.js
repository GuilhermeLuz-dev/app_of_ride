const rideListElement = document.querySelector("#rideList")

const allRides = getAllRides();

allRides.forEach(async ([id, value]) => {
    const ride = JSON.parse(value)
    const rideId = ride.id

    const listElement = document.createElement("li")
    listElement.className = "bg bg-primary"
    rideListElement.appendChild(listElement)


    const firstPosition = ride.date[0];
    const firstPositionData = await getLocationData(firstPosition.latitude, firstPosition.longitude);
    console.log(firstPositionData)

    const city = document.createElement("div")
    city.innerHTML = firstPositionData.city + " - " + firstPositionData.countryCode;
    listElement.appendChild(city)

    


})