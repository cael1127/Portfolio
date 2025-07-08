import React, { useState } from "react";

export default function ZeroTrustDemo() {
  const [accessRequests, setAccessRequests] = useState([
    { id: 1, user: 'john.doe@company.com', resource: 'Database', status: 'Pending', risk: 'Low' },
    { id: 2, user: 'jane.smith@company.com', resource: 'Admin Panel', status: 'Denied', risk: 'High' },
    { id: 3, user: 'bob.wilson@company.com', resource: 'File Server', status: 'Approved', risk: 'Medium' }
  ]);
  const [newRequest, setNewRequest] = useState({ user: '', resource: '' });
  
  const addRequest = () => {
    if (newRequest.user && newRequest.resource) {
      const risk = Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low';
      setAccessRequests([...accessRequests, {
        id: accessRequests.length + 1,
        user: newRequest.user,
        resource: newRequest.resource,
        status: 'Pending',
        risk
      }]);
      setNewRequest({ user: '', resource: '' });
    }
  };
  
  const updateStatus = (id, status) => {
    setAccessRequests(accessRequests.map(req => 
      req.id === id ? { ...req, status } : req
    ));
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Zero Trust Access</h3>
      <div className="mb-4 space-y-2">
        <input 
          type="email" 
          placeholder="User email" 
          value={newRequest.user}
          onChange={(e) => setNewRequest({...newRequest, user: e.target.value})}
          className="bg-gray-800 text-white rounded px-2 py-1 w-full"
        />
        <input 
          type="text" 
          placeholder="Resource" 
          value={newRequest.resource}
          onChange={(e) => setNewRequest({...newRequest, resource: e.target.value})}
          className="bg-gray-800 text-white rounded px-2 py-1 w-full"
        />
        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 w-full" onClick={addRequest}>
          Request Access
        </button>
      </div>
      <div className="space-y-2">
        {accessRequests.map(request => (
          <div key={request.id} className="bg-gray-800 border border-gray-600 rounded p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-white font-bold">{request.user}</div>
                <div className="text-gray-400 text-sm">Resource: {request.resource}</div>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                request.risk === 'High' ? 'bg-red-600 text-white' :
                request.risk === 'Medium' ? 'bg-yellow-600 text-white' :
                'bg-green-600 text-white'
              }`}>
                {request.risk}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                request.status === 'Approved' ? 'bg-green-600 text-white' :
                request.status === 'Denied' ? 'bg-red-600 text-white' :
                'bg-yellow-600 text-white'
              }`}>
                {request.status}
              </span>
              {request.status === 'Pending' && (
                <>
                  <button 
                    className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    onClick={() => updateStatus(request.id, 'Approved')}
                  >
                    Approve
                  </button>
                  <button 
                    className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    onClick={() => updateStatus(request.id, 'Denied')}
                  >
                    Deny
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 