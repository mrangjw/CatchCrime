import React from 'react';

const UserList = ({ users, selectedUser, onUserSelect }) => {
  return (
    <div className="mt-8">
      <h2 className="font-bold mb-2">실시간 위치</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex justify-between items-center p-2 rounded cursor-pointer
              ${selectedUser?.id === user.id ? 'bg-blue-700' : 'bg-blue-800/50 hover:bg-blue-700/50'}`}
            onClick={() => onUserSelect(user)}
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
  );
};

export default UserList;