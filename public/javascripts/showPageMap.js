mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
    });
/*
    The <%- %> scriptlet is used to "output the unescaped value into the template",
    and in this case, we're passing the Mapbox Token to authenticate this API call, and
    the long string may have special characters that should not be modified/escaped.
    If it's a string only composed of digits and letters, then it wouldn't have any practical
    difference if you use <%= %> or <%- %>, as you can test on your end.
*/
map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

//build a marker
new mapboxgl.Marker() 
    .setLngLat(campground.geometry.coordinates) //coordinates
    .setPopup( //what happens when user clicks
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
        )
    )
    .addTo(map) //add marker to the map