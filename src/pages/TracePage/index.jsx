import React, { useState, useEffect, useRef } from 'react';
import NaverMap from '../../components/NaverMap';
import UserDetail from '../../components/UserDetail';
import UserList from '../../components/UserList';
import Header from '../../components/Header';

const mockUsers = [
  {
    id: 1,
    name: "김선응",
    percentage: "31%",
    status: "성범죄",
    gender: "남",
    birthDate: "1994년생 5월 24일",
    age: "32",
    deviceStatus: "30%",
    timeNumber: "서울고법번호 2019노25611",
    residentNumber: "030524-3021532",
    phoneNumber: "010-8833-8990",
    globalId: "GR185408952IA",
    crimeLevel: "H",
    protectionArea: "4촌",
    deviceRemovalInfo: "0.08km",
    highRiskTime: "21시 30분",
    highRiskPlace: "가락시장",
    currentLocationLine: "서울 송파구 방이동길 22길 7가 4",
    currentLocationArea: "방이동 213-23",
    crimeArea: "성범죄",
    bondDisposition: "범기소(취차정지)",
    arrestStatus: "원격체포",
    jurisdictionDept: "가락파출소(지구대)",
    healthStatus: "[미측초과]",
    emergencyContacts: {
      night: "010-1211-4952",
      weekday: "010-1936-4847",
      weekend: "010-1601-6032"
    }
  },
  {
    id: 2,
    name: "정은구",
    percentage: "48%",
    status: "성범죄"
  },
  {
    id: 3,
    name: "제도권",
    percentage: "52%",
    status: "살인"
  },
  {
    id: 4,
    name: "백광석",
    percentage: "61%",
    status: "살인"
  },
  {
    id: 5,
    name: "기승주",
    percentage: "62%",
    status: "성범죄"
  },
  {
    id: 6,
    name: "신대위",
    percentage: "71%",
    status: "음주운전"
  },
  {
    id: 7,
    name: "김인호",
    percentage: "74%",
    status: "음주운전"
  },
  {
    id: 8,
    name: "백광호",
    percentage: "77%",
    status: "살인"
  },
  {
    id: 9,
    name: "이범우",
    percentage: "77%",
    status: "성범죄"
  },
  {
    id: 10,
    name: "심익빈",
    percentage: "81%",
    status: "성범죄"
  },
  {
    id: 11,
    name: "정호식",
    percentage: "87%",
    status: "살인"
  }
];

const TracePage = () => {
  const [map, setMap] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const markersRef = useRef([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!window.naver || !window.naver.maps) return;

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

        // 초기 마커 데이터
        const initialMarkers = [
          { position: [37.5445, 127.0435], count: 36, label: '김선응' },
          { position: [37.5425, 127.0485], count: 23, label: '백광석' },
          { position: [37.5385, 127.0405], count: 15, label: '기승주' },
          { position: [37.5405, 127.0455], count: 17, label: '신대위' },
          { position: [37.5365, 127.0445], count: 8, label: '김인호' },
          { position: [37.5385, 127.0495], count: 12, label: '백광호' },
        ];

        // 마커 생성 및 저장
        markersRef.current = initialMarkers.map(({ position, count, label }) => {
          return new window.naver.maps.Marker({
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

        // 마커 움직임 시작
        const moveMarkers = () => {
          markersRef.current.forEach((marker) => {
            const currentPos = marker.getPosition();
            const lat = currentPos.lat() + (Math.random() - 0.5) * 0.0003;
            const lng = currentPos.lng() + (Math.random() - 0.5) * 0.0003;
            
            const newPos = new window.naver.maps.LatLng(lat, lng);
            marker.setPosition(newPos);
          });
        };

        // 3초마다 마커 이동
        intervalRef.current = setInterval(moveMarkers, 3000);

        // 초기 지도 영역 설정
        const bounds = markersRef.current.reduce((bounds, marker) => {
          return bounds.extend(marker.getPosition());
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
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      script.onload = initializeMap;
      script.onerror = (error) => {
        console.error('Naver maps script loading error:', error);
      };
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      markersRef.current.forEach(marker => {
        if (marker) marker.setMap(null);
      });
      const script = document.getElementById('naver-maps-script');
      if (script) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(prev => prev?.id === user.id ? null : user);
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
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
              {mockUsers.map((user) => (
                <div
                  key={user.id}
                  className={`flex justify-between items-center p-2 rounded cursor-pointer
                    ${selectedUser?.id === user.id ? 'bg-blue-700' : 'bg-blue-800/50 hover:bg-blue-700/50'}`}
                  onClick={() => handleUserSelect(user)}
                >
                  <div>{user.name}</div>
                  <div className="text-sm">
                    <span className="text-blue-300">{user.percentage}</span>
                    <span className="ml-2 text-gray-300">{user.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedUser && (
        <UserDetail 
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

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