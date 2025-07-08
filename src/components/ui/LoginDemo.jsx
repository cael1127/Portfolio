import React, { useState } from 'react';

export default function LoginDemo({ title }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState('');
  
  function login(e) {
    e.preventDefault();
    if (email === 'user@example.com' && pass === 'password') {
      setMsg('Login successful!');
    } else {
      setMsg('Invalid credentials. Try user@example.com / password');
    }
  }
  
  return (
    <form className="w-full max-w-xs mx-auto" onSubmit={login}>
      <div className="mb-4">
        <label className="block text-white mb-1">Email</label>
        <input className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-1">Password</label>
        <input type="password" className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white" value={pass} onChange={e => setPass(e.target.value)} />
      </div>
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 w-full" type="submit">Login</button>
      {msg && <div className="mt-3 text-center text-teal-400">{msg}</div>}
    </form>
  );
} 