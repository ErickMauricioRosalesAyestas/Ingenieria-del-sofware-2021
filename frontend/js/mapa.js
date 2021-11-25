
//Llave para MapBox incluir siempre
mapboxgl.accessToken = 'pk.eyJ1IjoibWFub3Jvc2FsZXMwNyIsImEiOiJja3ZiNnAzYXQydXpmMm5ubmE4YXB4MWpuIn0.xC8gjRpwVh1KjjDwOKTc4g';

var basedatos = [
  { "ciudad": "Olanchito", "lng": -86.56916, "lat": 15.48231 },
  { "ciudad": "La Ceiba", "lng": -86.791031, "lat": 15.78371 },
  { "ciudad": "Saba", "lng": -86.223953, "lat": 15.52137 },
  { "ciudad": "San Pedro Sula", "lng": -88.024971, "lat": 15.50523 },
  { "ciudad": "Tegucigalpa", "lng": -87.192139, "lat": 14.072275 },
  { "ciudad": "Comayagua", "lng": -87.643066, "lat": 14.46023 }
];

    //Esto genera el mapa 
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-86.56916, 15.48231],
        zoom: 15
    })

function cambiarPosicion(){
    document.getElementById('contenedorMap').style.display = 'block';
    //Esto genera el mapa 
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 15
    })
  
    var scale = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'imperial'
    });
    map.addControl(scale);
    
    scale.setUnit('metric');
  
    map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('map')}));
  
    map.boxZoom.enable();
  
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');
  
    let ciudadSeleccionada = document.querySelector('#direccion').value;
    console.log(ciudadSeleccionada);
        map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [basedatos[ciudadSeleccionada].lng, basedatos[ciudadSeleccionada].lat],
        zoom: 15
    })
  
    var marker = new mapboxgl.Marker({
        color: 'green',
        draggable: true
    })
    .setLngLat([basedatos[ciudadSeleccionada].lng, basedatos[ciudadSeleccionada].lat])
    .addTo(map);
  
    map.on('style.load', function() {
        map.on('click', function(e) {
          var coordinates = e.lngLat;
          new mapboxgl.Popup()
            marker.setLngLat(coordinates)
            document.getElementById('longitud').value = coordinates.lng;
            document.getElementById('latitud').value = coordinates.lat;
        });
    });
  }