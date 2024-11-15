import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      navigate('/trace');
    } else {
      setError('Invalid username or password');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#1a3b6e] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-blue-600/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 200 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-400"
              style={{
                width: Math.random() * 4 + 'px',
                height: Math.random() * 4 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative w-[480px] p-12 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl">
        <div className="flex justify-center mb-12">
          <img src={logo} alt="Logo" className="w-192 h-192 object-contain animate-float" />
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="text-red-500 text-center bg-red-100/10 p-2 rounded">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/30 focus:border-white/50 transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/30 focus:border-white/50 transition-all"
            />
          </div>
          
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-lg"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;