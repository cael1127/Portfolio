import React, { useState } from "react";
export default function ZeroTrustDemo() {
  const [access, setAccess] = useState(false);
  function requestAccess() {
    setAccess(true);
    setTimeout(() => setAccess(false), 1500);
  }
  return (
    <div className="w-full max-w-xs mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Zero Trust Access</h3>
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 w-full" onClick={requestAccess} disabled={access}>{access ? 'Access Granted' : 'Request Access'}</button>
    </div>
  );
} 