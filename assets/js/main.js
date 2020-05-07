let markersAll = []; //array con todos los markers

// Funcion inicializadora pasada como parametro en el llamado a la API de Google Maps;
window.initMap = () => {
    const myLocation = { lat: -34.610490, lng: -58.440860 };
    // MiLocation es la ubicacion desde la que parte la visualizacion de mi mapa. Pasando otra latitud y longitud puede ser el punto geografico que yo quiera;
    const map = new google.maps.Map(
        document.getElementById('map'),
        {
            zoom: 11, //Zoom;
            center: myLocation, //Centrado de mapa;
            styles: styles, //styles: styles -> porque se llaman igual. clave: valor;
            streetViewControl: false, //Desactivo el street view (chaboncito);
            fullscreenControl: false, //Desactivo el boton de fullscreeen;
            mapTypeControlOptions: { //Desactivo los tipos de terreno del mapa (satellite y terrain);
                mapTypeIds: []
            },
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER //ubico los controles de zoom;
            }
        });
    fetchMarkers(map) //Llamammos a la función que trae el json de markers;

    //FILTROS
    //Traigo elementos del DOM y se los asigno a los handlers;
    const handleFilterSupermercado = document.querySelector('.supermercado');
    const handleFilterGeneral = document.querySelector('.general');
    const handleFilterHamburguesas = document.querySelector('.hamburguesas');
    const handleFilterPanaderia = document.querySelector('.panaderia');
    const handleFilterVegetales = document.querySelector('.vegetales');

    //Eventos de click de los filtros
    handleFilterSupermercado.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('supermercado')
    })
    handleFilterGeneral.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('general')
    })
    handleFilterHamburguesas.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('hamburguesas')
    })
    handleFilterPanaderia.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('panaderia')
    })
    handleFilterVegetales.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('vegetales')
    })

    //Agrego los markers filtrados según filtro (markerType)
    const addMarkerFiltered = (markerType) => {
        console.log('clicked beer');
        markersAll.forEach((marker) => {
            //console.log(marker)
            marker.setMap(null); //Quita todos los markers del mapa
        })
        const markerFiltered = markersAll.filter((markerItem) => markerItem.customInfo === markerType)
        markerFiltered.forEach((marker) => {
            marker.setMap(map);
        })
    }
}
//Función de asincrónica que trae los markers
const fetchMarkers = async (map) => { 
    try {
        const response = await fetch('assets/js/markers.json');
        const json = await response.json();
        json.forEach(marker => {
            addMarker(map, marker);
        });
        //console.log(markersAll)
    } catch (error) {
        console.log(error);
    }
}

//Función de agregado de un marker
const addMarker = (map, marker) => { 
    //Destructuring de la info del marker
    const { lat, lng, name, veg, type, description, number, horarioAtencion, delivery, redes } = marker;

    //Armo la infowindow
    const contentString = `
    <div class="divInfo">
    <div class="divInfoContainer">
    <h2 class="divInfoElements">${name}</h2>
    <h3 class="divInfoElements">${type} - ${veg}</h3>
    <p class="divInfoElements">${description}</p>
    <p class="divInfoElements">${number}</p>
    <p class="divInfoElements">${horarioAtencion}</p>
    <p class="divInfoElements">Envíos a domicilio: ${delivery}</p>
    <p class="divInfoElements">${redes}</p>
    </div>
    </div>`;
    const infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    //Iconos
    const icons = {
        'supermercado': 'assets/images/supermercado.png',
        'general': 'assets/images/general.png',
        'hamburguesas': 'assets/images/hamburguesas.png',
        'panaderia': 'assets/images/panaderia.png',
        'vegetales': 'assets/images/vegetales.png'

    }
    //Agrego el marker
    const markerItem = new google.maps.Marker(
        {
            position: { lat: lat, lng: lng },
            icon: icons[type],
            map: map,
            customInfo: type
        }
    );
    markerItem.setMap(map);
    //Agrego evento de click en el marker, abre infowindow
    markerItem.addListener('click', function () {
        infowindow.open(map, markerItem);
    });
    //Agrego mi nuevo marker (objeto marker, no json marker, a mi array para filtros)
    markersAll.push(markerItem);
}
