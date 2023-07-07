async function getLocationData(latitude, longitude){
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&=localityLanguage=en`;
    const response = await fetch(url)
    return await response.json()
}