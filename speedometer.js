const start = document.querySelector("#start")
const speedElement = document.querySelector("#speed")
const startBottom = document.querySelector("#start")
const stopBottom = document.querySelector("#stop")

let currentRide = null
let clearWatchId = null

start.addEventListener("click", ()=>{
    if(clearWatchId) return 
    function handleSucess(position){

        speedElement.innerHTML = position.coords.speed ? (position.coords.speed * 3.6).toFixed(1) : 0;
        addNewRide(currentRide, position);
    }

    function handleError(error){
        console.log(error.msg)
    }

    const options = {
        enableHighAccuracy: true
    }
    currentRide =  createNewRide()

    clearWatchId = navigator.geolocation.watchPosition(handleSucess, handleError, options)

    startBottom.classList.add("d-none")
    stopBottom.classList.remove("d-none")
})

stopBottom.addEventListener("click", ()=>{
   if(!clearWatchId) return 

    updateStoptime(currentRide)
    stopBottom.classList.add("d-none")
    startBottom.classList.remove("d-none")
    navigator.geolocation.clearWatch(clearWatchId)
    clearWatchId = null;

    window.location.herf = "./" 
})