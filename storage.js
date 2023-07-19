function createNewRide() {
    const rideId = Date.now();
    const rideRecord = {
        data: [],
        startTime: rideId,
        stopTime: null
    }
    saveRideRecord(rideId, rideRecord)
    return rideId
}

function saveRideRecord(rideId, rideRecord) {
    localStorage.setItem(rideId, JSON.stringify(rideRecord))
}

function addNewRide(rideId, position) {
    const rideRecord = getRideRecord(rideId)
    const newData = {
        accuracy:position.coords.accuracy,
        altitude:position.coords.altitude,
        altitudeAccuracy:position.coords.altitudeAccuracy,
        heading:position.coords.heading,
        latitude:position.coords.latitude,
        longitude:position.coords.longitude,
        speed:position.coords.speed, 
        timeStamp: position.coords.timeStamp
        }
    
        rideRecord.data.push(newData)
        saveRideRecord(rideId, rideRecord)
}

function getAllRides(){
    return Object.entries(localStorage);
}

function getRideRecord(rideId) {
    return JSON.parse(localStorage.getItem(rideId))
}

function updateStoptime(currentRide){
    const rideRecord = getRideRecord(currentRide)
    rideRecord.stopTime = Date.now()
    saveRideRecord(currentRide, rideRecord);
}
function deleteRide(id){
    localStorage.removeItem(id)
}