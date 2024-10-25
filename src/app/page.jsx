"use client"

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';  // Import Mapbox CSS
import styles from "./styles.module.css"
import cities from './data/cities/unified.json';
import popupData from './data/popups/index.json';



mapboxgl.accessToken = 'pk.eyJ1IjoiY3JhZnR5cHJvZ3JhbW1lciIsImEiOiJjbTJuandmamQwNnMxMmtwdHFxcGdpM2ZsIn0.ZMxQHE2vy1EY6-kR9ev-Vg';

const mapPopup = {
  "batch-0": 1,
  "batch-10": 2,
  "batch-20": 3,
  "batch-30": 4,
  "batch-40": 5,
  "batch-50": 6,
  "batch-60": 7,
  "batch-70": 8,
  "batch-80": 9,
  "batch-90": 10,
  "batch-100": 11,
  "batch-120": 12,
  "batch-140": 13,
};

const WorldMap = () => {
  const mapContainerRef = useRef(null);
  const [informed, setInformed] = useState(0);
  const [population, setPopulation] = useState(8161972572);
  const [popup, setPopup] = useState(null);
  const [news, setNews] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);


  function createCustomMarker(iconUrl, size) {
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.backgroundImage = `url(${iconUrl})`; // Set the icon as the background
    el.style.width = size + 'px'; // Set the width of the marker
    el.style.height = size + 'px'; // Set the height of the marker
    el.style.backgroundSize = '100%'; // Make the image cover the full element
    return el;
  }
  
  
  function displayMarker(map, mapboxgl, batch=0) {
      // show popup
      if(mapPopup[`batch-${batch}`]){
        const index = mapPopup[`batch-${batch}`];
        setPopup(popupData[index-1]);
        setNews(popupData[index-1].supportingNews.join(" "));
        setShowPopup(true);
      }


      cities[`batch-${batch}`].forEach(city => {
        const marker = {
          coordinates: [city.lng, city.lat],
          iconUrl: '/information.png',
          size: 10
        }
  
        const customMarker = createCustomMarker(marker.iconUrl, marker.size);
        new mapboxgl.Marker(customMarker)
            .setLngLat(marker.coordinates)
            .addTo(map);
      })

      setInformed( prev => prev + 1705028 );
  
      setTimeout(()=> {        
        if(batch<Object.keys(cities).length){
          displayMarker(map, mapboxgl, batch+1)
        }
      }, 3000)
  }

  
  
  const init = () => {
    
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/craftyprogrammer/cm2nvv7ee004v01pia9156rg9', // Basic Map Style
      center: [0, 20],  // Initial position (Longitude, Latitude)
      zoom: 1, // initial zoom
      maxZoom: 4, // prevent zooming in too much
      projection: 'mercator',
      maxBounds: [[-180, -85], [180, 85]], // limit panning to world bounds
      dragRotate: false, // disable 3D rotation
      touchZoomRotate: false // disable 3D touch rotation
    });

    const bounds = [[-180, -85], [180, 85]];  // Coordinates [Southwest, Northeast]

    map.fitBounds(bounds, {
        padding: 20 // Add some padding to the edges
    });

    map.setMaxBounds(bounds);

    map.dragRotate.disable();  // Disable rotation
    map.touchZoomRotate.disableRotation();  // Disable touch rotation on mobile


    map.on('load', () => {

    const layers = map.getStyle().layers;

    // Iterate through all layers and remove any label-related layers
    layers.forEach(function (layer) {
        // Check if the layer type is 'symbol' (usually used for labels)
        if (layer.type === 'symbol') {
            map.removeLayer(layer.id);
        }
    });

    setTimeout(()=> {
      displayMarker(map, mapboxgl);
    }, 5000)


    const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

    map.on('mouseenter', 'countries-layer', (e) => {
      const country = e.features[0].properties.name;
      const spread = e.features[0].properties.adm0_a3;

      popup.setLngLat(e.lngLat)
        .setHTML(`<strong>${country}</strong><br>Spread: ${spreadData[spread]}%`)
        .addTo(map);
    });

    map.on('mouseleave', 'countries-layer', () => {
      popup.remove();
    });

    })
    return () => map.remove();  // Clean up on component unmount
  }

  useEffect(()=> {
    if(mounted){
      init();
    }
  }, [mounted])

  useEffect(()=> {
    setMounted(true);
  },[]);


  if(!mounted) return <></>
  else return (
    <div className='relative flex flex-col h-screen text-white'>
      <div style={{ width: '100%', height: '100%' }} ref={mapContainerRef} />
      {/* popup */}
      {
        showPopup
        ?<div className={`${styles.popupWrap}`}>
        <div className={styles.popup}>
          <img src={`/icons/${popup? popup.icon : ''}`} width={120} className={styles.popupImg} />
          <div className='flex flex-col px-4'>
            <h2 className='font-bold text-lg'>
              {popup? popup.title : ""}
            </h2>
            <div className="divider"></div>
            <p>
              {popup? popup.mainMessage : ""}
            </p>
            <div className='flex justify-end mt-2 w-full'>
              <button 
              
              onClick={()=> setShowPopup(false)}
              className='bg-sky-600 w-20 text-white rounded-md'>OK</button>
            </div>
          </div>
        </div>
      </div>
      :<></>
      }
      {/* news` */}
      <div className={styles.newsWrap}>
        <img src='/news.jpg' width={20} className={styles.infoImg}/>
        {
          popup
          ?<marquee className="w-9/12 font-bold">
          {news}
        </marquee>
        :<></>
        }
      </div>
      {/* bottom info */}
      <div className={styles.infoWrap}>
        <div className={styles.infoContainer}>
          <img src='/world.jpg' width={20} className={styles.infoImg}/>
          <div className='w-4/5'>
            <div className='text-sm text-white font-bold'>WORLD</div>
            <div className='flex items-center gap-5'>
              <div>
                <div className='flex gap-1 items-center font-bold'>
                  <img src="/information.png" width={20} alt="" />
                  <div className='text-xs my-1'>INFORMED: {informed.toLocaleString()}</div>
                  </div>
              </div>
              <div>
                <div className='flex gap-1 items-center font-bold'>
                  <img src="/people.png" width={20} alt="" />
                  <div className='text-xs my-1'>Population: {population.toLocaleString()}</div>
                  </div>
              </div>
            </div>
            <progress className="progress progress-error bg-info h-5 my-1 w-full" value={Math.floor(informed/population)} max="100"></progress>
          </div>
        </div>
      </div>
    </div>
  );

};

export default WorldMap;
