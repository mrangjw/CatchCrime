import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const PublicServicePage = () => {
  const [searchType, setSearchType] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // 검색 로직 구현
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
            <img src={logo} alt="로고" className="h-10 w-auto" />
              <h1 className="ml-3 text-xl font-bold text-gray-900">범죄자 알림 e-서비스</h1>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 검색 섹션 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">성범죄자 조건검색</h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <select 
                className="w-full sm:w-40 p-2 border rounded-md"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="name">이름</option>
                <option value="area">지역</option>
                <option value="school">학교반경</option>
              </select>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="flex-1 p-2 border rounded-md"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                검색
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              <span className="px-3 py-1 bg-gray-100 rounded-full">학교반경 1km</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">시도별</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">도로명주소</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">위치반경 2km</span>
            </div>
          </form>
        </div>

        {/* 정보 카드 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            title="모바일 고지 서비스"
            description="성범죄자 신상정보를 모바일로 확인하실 수 있습니다."
            icon="📱"
          />
          <InfoCard
            title="이동경로 확인"
            description="성범죄자 이동경로를 지도에서 확인하실 수 있습니다."
            icon="🗺️"
          />
          <InfoCard
            title="알림 서비스"
            description="우리 동네 성범죄자 정보를 실시간으로 알림 받으실 수 있습니다."
            icon="🔔"
          />
        </div>

        {/* 공지사항 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">공지사항</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center py-2 border-b">
              <span>성범죄자 알림e 서비스 이용 안내</span>
              <span className="text-gray-500">2024.11.28</span>
            </li>
            <li className="flex justify-between items-center py-2 border-b">
              <span>시스템 정기 점검 안내</span>
              <span className="text-gray-500">2024.11.27</span>
            </li>
          </ul>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">이용안내</h3>
              <ul className="space-y-2">
                <li>이용약관</li>
                <li>개인정보처리방침</li>
                <li>공지사항</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">고객센터</h3>
              <p>평일 09:00 - 18:00</p>
              <p>전화: 1234-5678</p>
              <p>이메일: support@example.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">관련 사이트</h3>
              <ul className="space-y-2">
                <li>여성가족부</li>
                <li>경찰청</li>
                <li>법무부</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// 정보 카드 컴포넌트
const InfoCard = ({ title, description, icon }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default PublicServicePage;