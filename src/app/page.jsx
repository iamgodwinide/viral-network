"use client";

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';  // Import Mapbox CSS
import styles from "./styles.module.css"
import Link from 'next/link';
import Image from 'next/image';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;

const WorldMap = () => {
  const mapContainerRef = useRef(null);
  const citiesRef = useRef({});
  const citiesCount = useRef(0);
  const informedRef = useRef("0");
  const headlines = useRef("");
  const popup = useRef({
    "title": "",
    "mainMessage": "",
    "icon": "",
    "supportingNews": []
  });
  const population = useRef("8,161,972,572");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const getUpdates = async (map) => {
    try { 
        const data_uri = "/api/data";
        const res = await fetch(data_uri);
        if (res.ok) {
            const data = await res.json();
            const {
              news,
              places,
              transactions
            } = data;
            
            if(news){
              citiesRef.current = places;
              informedRef.current = transactions;
  
  
              if(popup.current.title === "" | news?.title !== popup.current.title ){
                setShowPopup(true);
                popup.current = news;
                headlines.current = news?.supportingNews.join(" ");
                setShowPopup(true);
              }
              displayMarker(map);
            }

            setLoading(false);
            setTimeout(()=> getUpdates(map), 30000 );
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }  
  }

  const createCustomMarker = (iconUrl, size) => {
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.backgroundImage = `url(${iconUrl})`;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.backgroundSize = '100%';
    return el;
  }

  const displayMarker = (map) => {
    citiesRef.current.slice(citiesCount.current, citiesRef.current.length).forEach(city => {
      const marker = createCustomMarker('red.png', 20);
      new mapboxgl.Marker(marker)
          .setLngLat([city.lng, city.lat])
          .addTo(map);
    });
    citiesCount.current = citiesRef.current.length;
    setLoading(false);
    setTimeout(()=> getUpdates(map), 30000 );
  }

  const initMap = () => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/craftyprogrammer/cm2pa3zte008q01pmb2d4e97l",
      center: [0, 20],
      zoom: 1,
      maxZoom: 4,
      projection: 'mercator',
      maxBounds: [[-180, -85], [180, 85]],
      dragRotate: false,
      touchZoomRotate: false,
    });

    map.on('load', () => {
      getUpdates(map);
    });

    return map;
  }

  useEffect(() => {
    if (mounted) {
      const map = initMap();
      return () => map.remove();  // Clean up on unmount
    }
  }, [mounted]);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <></>;

  return (
    <div className='relative flex flex-col h-screen text-white'>
      <div style={{ width: '100%', height: '100%' }} ref={mapContainerRef} />
      {showPopup && !loading && (
        <div className={styles.popupWrap}>
          <div className={styles.popup}>
            <img src={`/${popup.current?.icon}`} width={120} className={styles.popupImg} alt="Popup Icon" />
            <div className='flex flex-col px-4'>
              <h2 className='font-bold text-lg'>{popup.current?.title}</h2>
              <p>{popup.current?.mainMessage}</p>
              <div className="divider"></div>
              <div className="flex flex-end justify-end w-full">
                <button onClick={() => setShowPopup(false)} className='bg-sky-600 w-20 text-white rounded-md'>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.newsWrap}>
        <img src='/news.jpg' width={20} className={styles.infoImg} alt="News Icon"/>
        {popup.current && !loading && <marquee className="w-9/12 font-bold">{headlines.current}</marquee>}
      </div>
      {
        !loading
        &&<div className={styles.infoWrap}>
        <div className={styles.infoContainer}>
          <img src='/world.jpg' width={20} className={styles.infoImg} alt="World Icon"/>
          <div className='w-4/5'>
            <div className='text-sm text-white font-bold'>WORLD</div>
            <div className='flex gap-5'>
              <div className='flex items-center font-bold'>
                <img src="/information.png" width={20} alt="Info Icon" />
                <div className='text-xs my-1'>INFORMED: {informedRef.current}</div>
              </div>
              <div className='flex items-center font-bold'>
                <img src="/people.png" width={20} alt="People Icon" />
                <div className='text-xs my-1'>Population: {population.current}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {loading && <div className='fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-black'><h1 className='text-white text-3xl font-bold'>Loading, Please Wait...</h1></div>}
      <div className='fixed top-7 right-2 w-24 flex flex-col gap-10'>
        <Link href="/"><Image src='/telegram.png' alt='telegram' width={40} height={40}/></Link>
        <Link href="/"><Image src='/twitter-logo.png' alt='twitter' width={40} height={40}/></Link>
      </div>
    </div>
  );
};

export default WorldMap;
