function initMap() {
    const iceland = { lat: 64.9631, lng: -19.0208 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: iceland,
    });

    const locations = [
        { title: "Thingvellir National Park", position: { lat: 64.2559, lng: -21.1295 } },
        { title: "Geysir", position: { lat: 64.3136, lng: -20.2995 } },
        { title: "Gullfoss Waterfall", position: { lat: 64.3275, lng: -20.1218 } },
    ];

    locations.forEach(location => {
        new google.maps.Marker({
            position: location.position,
            map: map,
            title: location.title
        });
    });
}

window.onload = initMap;
