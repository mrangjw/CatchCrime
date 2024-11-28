import React from 'react';

const Header = ({ onMenuClick }) => {
  return (
    <div className="bg-white p-4 flex justify-between items-center shadow">
      <button onClick={onMenuClick} className="p-2">
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
  );
};

export default Header;