import React from 'react';
import defaultImage from '../../assets/images/hotsause.png';

const UserDetail = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="absolute left-[260px] top-0 bg-[#1a3b6e] text-white rounded-lg shadow-lg w-[400px] z-50">
      <button 
        onClick={onClose} 
        className="absolute right-4 top-4 text-white hover:text-gray-300 text-xl"
      >
        ✕
      </button>

      {/* Profile Section with darker background */}
      <div className="bg-[#152b52] p-6 rounded-t-lg">
        <div className="flex space-x-6">
          {/* Image and name */}
          <div>
            <img 
              src={defaultImage}
              alt={user.name}
              className="w-32 h-32 object-cover"
            />
            <div className="text-center mt-2 font-semibold bg-[#1a3b6e] py-1 px-2 rounded">
              {user.name}
            </div>
          </div>

          {/* Basic info next to image */}
          <div className="flex-1 grid grid-cols-2 gap-y-2 content-start">
            <div className="text-gray-400">이름</div>
            <div>{user.name}</div>
            <div className="text-gray-400">성별</div>
            <div>{user.gender || '남'}</div>
            <div className="text-gray-400">생년월일</div>
            <div>{user.birthDate || '2003년생 5월 24일'}</div>
            <div className="text-gray-400">나이</div>
            <div>{user.age || '20'}세</div>
            <div className="text-gray-400">부착장치</div>
            <div>{user.deviceStatus || '30%'}</div>
          </div>
        </div>
      </div>

      {/* Detailed info section */}
      <div className="p-6 space-y-4">
        {/* Status info */}
        <div className="grid grid-cols-2 gap-y-2 border-b border-gray-600 pb-4">
          <div className="text-gray-400">실시간</div>
          <div>위치이동</div>
          <div className="text-gray-400">시간번호</div>
          <div>{user.timeNumber || '서울고법번호 2019노25611'}</div>
          <div className="text-gray-400">주민번호</div>
          <div>{user.residentNumber || '030524-3021532'}</div>
          <div className="text-gray-400">연락처</div>
          <div>{user.phoneNumber || '010-8833-8990'}</div>
          <div className="text-gray-400">장치 ID</div>
          <div>{user.globalId || 'GR185408952IA'}</div>
          <div className="text-gray-400">측위</div>
          <div>{user.crimeLevel || 'H'}</div>
          <div className="text-gray-400">보고주기</div>
          <div>{user.protectionArea || '4촌'}</div>
          <div className="text-gray-400">집까지거리</div>
          <div>{user.deviceRemovalInfo || '0.08km'}</div>
          <div className="text-gray-400">고위험시간</div>
          <div>{user.highRiskTime || '21시 30분'}</div>
          <div className="text-gray-400">고위험장소</div>
          <div>{user.highRiskPlace || '가락시장'}</div>
          <div className="text-gray-400">현위치(선)</div>
          <div>{user.currentLocationLine || '서울 송파구 방이동길 22길 7가 4'}</div>
          <div className="text-gray-400">현위치(구)</div>
          <div>{user.currentLocationArea || '방이동 213-23'}</div>
          <div className="text-gray-400">범죄구분</div>
          <div>{user.crimeArea || '성범죄'}</div>
          <div className="text-gray-400">처분내용</div>
          <div>{user.bondDisposition || '형기종료(위치추적)'}</div>
          <div className="text-gray-400">형명/형기</div>
          <div>{user.arrestStatus || '원격체포'}</div>
          <div className="text-gray-400">관할부서</div>
          <div>{user.jurisdictionDept || '가락파출소(지구대)'}</div>
          <div className="text-gray-400">신호실종</div>
          <div>{user.healthStatus || '[미측초과]'}</div>
        </div>

        {/* Emergency contacts */}
        <div>
          <h3 className="font-bold mb-2">비상연락망</h3>
          <div className="space-y-2 text-sm">
            <div>범죄예방팀 (야간) 010-1211-4952</div>
            <div>민생안전 (평일) 010-1936-4847</div>
            <div>범죄예방 (주말) 010-1601-6032</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;