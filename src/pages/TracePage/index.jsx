import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NAVER_CLIENT_ID = 'iidkgdqike';

const TracePage = () => {
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const mockData = [
    { name: "이성우", percentage: "31%", status: "실행중" },
    { name: "정은구", percentage: "48%", status: "실행중" },
    { name: "제도권", percentage: "52%", status: "실행" },
    { name: "백광석", percentage: "61%", status: "실행중" },
    { name: "기승주", percentage: "62%", status: "실행" },
    { name: "신대위", percentage: "71%", status: "용수공진" },
    { name: "김인호", percentage: "74%", status: "용수공진" },
    { name: "백광호", percentage: "77%", status: "실행" },
    { name: "이범우", percentage: "77%", status: "실행중" },
    { name: "심익빈", percentage: "81%", status: "실행중" },
    { name: "정호식", percentage: "87%", status: "실행" },
  ];

  useEffect(() => {
    const initializeMap = () => {
      if (!window.naver || !window.naver.maps) {
        console.error('Naver maps not loaded');
        return;
      }

      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5405, 127.0425),
        zoom: 15,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT
        }
      };

      try {
        const mapDiv = document.getElementById('map');
        if (!mapDiv) {
          console.error('Map div not found');
          return;
        }

        const newMap = new window.naver.maps.Map(mapDiv, mapOptions);
        setMap(newMap);

        const markers = [
          { position: [37.5445, 127.0435], count: 36, label: '북린동' },
          { position: [37.5425, 127.0485], count: 23, label: '한수동' },
          { position: [37.5385, 127.0405], count: 15, label: '서린동' },
          { position: [37.5405, 127.0455], count: 17, label: '장영동' },
          { position: [37.5365, 127.0445], count: 8, label: '남린동' },
          { position: [37.5385, 127.0495], count: 12, label: '동린동' },
        ];

        markers.forEach(({ position, count, label }) => {
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(position[0], position[1]),
            map: newMap,
            icon: {
              content: `
                <div style="background-color: #fff; padding: 5px 10px; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
                  <div style="color: #1a3b6e; font-weight: bold;">${label}</div>
                  <div style="color: #4a90e2;">⚡${count}</div>
                </div>
              `,
              anchor: new window.naver.maps.Point(25, 25),
            }
          });
        });

        const bounds = markers.reduce((bounds, marker) => {
          return bounds.extend(new window.naver.maps.LatLng(marker.position[0], marker.position[1]));
        }, new window.naver.maps.LatLngBounds());
        
        newMap.fitBounds(bounds, {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        });

      } catch (error) {
        console.error('Map initialization error:', error);
      }
    };

    if (!document.getElementById('naver-maps-script')) {
      const script = document.createElement('script');
      script.id = 'naver-maps-script';
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_CLIENT_ID}`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      script.onerror = (error) => {
        console.error('Naver maps script loading error:', error);
      };
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      const script = document.getElementById('naver-maps-script');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`w-64 bg-[#1a3b6e] text-white transition-all ${sidebarOpen ? '' : '-translate-x-full'}`}>
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">HOME</h1>
          <nav className="space-y-2">
            <button className="w-full text-left p-2 hover:bg-blue-700 rounded">통합정보조회</button>
            <button className="w-full text-left p-2 hover:bg-blue-700 rounded">리스 시스템</button>
            <button className="w-full text-left p-2 hover:bg-blue-700 rounded">업무 일지 기안</button>
            <button className="w-full text-left p-2 hover:bg-blue-700 rounded">인사 및 결재</button>
          </nav>
          
          <div className="mt-8">
            <h2 className="font-bold mb-2">실시간 위치</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {mockData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-blue-800/50 rounded">
                  <div>{item.name}</div>
                  <div className="text-sm">
                    <span className="text-blue-300">{item.percentage}</span>
                    <span className="ml-2 text-gray-300">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="bg-white p-4 flex justify-between items-center shadow">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
            ☰
          </button>
          <div className="flex items-center space-x-4">
            <select className="border p-2 rounded">
              <option>서울특별시</option>
            </select>
            <button className="p-2 bg-gray-100 rounded">⚡</button>
            <button className="p-2 bg-gray-100 rounded">⚙️</button>
          </div>
        </div>

        <div id="map" className="w-full h-[calc(100vh-64px)]"></div>
      </div>
    </div>
  );
};

export default TracePage;