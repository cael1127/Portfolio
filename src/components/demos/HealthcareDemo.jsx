import React, { useState, useEffect } from 'react';

export default function HealthcareDemo() {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Alice Johnson', age: 45, risk: 'low', status: 'stable', lastUpdate: '2 min ago', vitals: { heartRate: 72, bp: '120/80', temp: 98.6, oxygen: 98 } },
    { id: 2, name: 'Bob Smith', age: 62, risk: 'medium', status: 'monitoring', lastUpdate: '1 min ago', vitals: { heartRate: 85, bp: '140/90', temp: 99.2, oxygen: 95 } },
    { id: 3, name: 'Carol Davis', age: 38, risk: 'low', status: 'stable', lastUpdate: '3 min ago', vitals: { heartRate: 68, bp: '118/75', temp: 98.4, oxygen: 99 } },
    { id: 4, name: 'David Wilson', age: 71, risk: 'high', status: 'alert', lastUpdate: '30 sec ago', vitals: { heartRate: 95, bp: '160/100', temp: 100.1, oxygen: 92 } },
  ]);

  const [predictions, setPredictions] = useState([
    { patientId: 1, condition: 'Normal', confidence: 94.2, nextCheck: '24 hours' },
    { patientId: 2, condition: 'Hypertension Risk', confidence: 78.5, nextCheck: '12 hours' },
    { patientId: 3, condition: 'Normal', confidence: 96.8, nextCheck: '48 hours' },
    { patientId: 4, condition: 'Cardiac Risk', confidence: 85.3, nextCheck: '2 hours' },
  ]);

  const [analytics, setAnalytics] = useState({
    totalPatients: 247,
    avgRiskScore: 23.4,
    predictionAccuracy: 91.7,
    avgResponseTime: '2.3 min'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev => prev.map(patient => ({
        ...patient,
        vitals: {
          ...patient.vitals,
          heartRate: patient.vitals.heartRate + Math.floor(Math.random() * 6) - 3,
          temp: patient.vitals.temp + (Math.random() - 0.5) * 0.4,
          oxygen: patient.vitals.oxygen + Math.floor(Math.random() * 4) - 2
        },
        lastUpdate: 'Just now'
      })));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable': return 'text-green-400';
      case 'monitoring': return 'text-yellow-400';
      case 'alert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getVitalColor = (value, type) => {
    if (type === 'heartRate') {
      return value > 100 ? 'text-red-400' : value > 80 ? 'text-yellow-400' : 'text-green-400';
    }
    if (type === 'oxygen') {
      return value < 95 ? 'text-red-400' : value < 97 ? 'text-yellow-400' : 'text-green-400';
    }
    if (type === 'temp') {
      return value > 100 ? 'text-red-400' : value > 99 ? 'text-yellow-400' : 'text-green-400';
    }
    return 'text-green-400';
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-white mb-6">🏥 AI-Powered Healthcare Analytics</h3>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Patient Monitoring */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">Real-time Patient Monitoring</h4>
            <div className="space-y-4">
              {patients.map(patient => {
                const prediction = predictions.find(p => p.patientId === patient.id);
                return (
                  <div key={patient.id} className="bg-gray-700 p-4 rounded border border-gray-600">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h5 className="font-semibold text-white">{patient.name}</h5>
                        <p className="text-gray-400 text-sm">Age: {patient.age} • Risk: <span className={getRiskColor(patient.risk)}>{patient.risk.toUpperCase()}</span></p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          patient.status === 'alert' ? 'bg-red-600' : 
                          patient.status === 'monitoring' ? 'bg-yellow-600' : 'bg-green-600'
                        } text-white`}>
                          {patient.status.toUpperCase()}
                        </span>
                        <p className="text-gray-400 text-xs mt-1">{patient.lastUpdate}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-3 mb-3">
                      <div>
                        <p className="text-gray-400 text-xs">Heart Rate</p>
                        <p className={`font-bold ${getVitalColor(patient.vitals.heartRate, 'heartRate')}`}>
                          {patient.vitals.heartRate} bpm
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Blood Pressure</p>
                        <p className="text-white font-bold">{patient.vitals.bp}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Temperature</p>
                        <p className={`font-bold ${getVitalColor(patient.vitals.temp, 'temp')}`}>
                          {patient.vitals.temp.toFixed(1)}°F
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Oxygen</p>
                        <p className={`font-bold ${getVitalColor(patient.vitals.oxygen, 'oxygen')}`}>
                          {patient.vitals.oxygen}%
                        </p>
                      </div>
                    </div>

                    {prediction && (
                      <div className="bg-gray-600 p-2 rounded">
                        <p className="text-gray-400 text-xs">AI Prediction</p>
                        <p className="text-white text-sm">{prediction.condition} ({prediction.confidence}% confidence)</p>
                        <p className="text-gray-400 text-xs">Next check: {prediction.nextCheck}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Analytics Panel */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">System Analytics</h4>
            <div className="space-y-4">
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">Total Patients</p>
                <p className="text-2xl font-bold text-green-400">{analytics.totalPatients}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">Avg Risk Score</p>
                <p className="text-2xl font-bold text-green-400">{analytics.avgRiskScore}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">Prediction Accuracy</p>
                <p className="text-2xl font-bold text-green-400">{analytics.predictionAccuracy}%</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">Avg Response Time</p>
                <p className="text-2xl font-bold text-green-400">{analytics.avgResponseTime}</p>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mt-6">
            <h4 className="text-xl font-semibold text-white mb-4">Active Alerts</h4>
            <div className="space-y-3">
              <div className="bg-red-900/20 border-l-4 border-red-400 p-3 rounded">
                <p className="text-white text-sm">Critical: David Wilson showing cardiac risk indicators</p>
                <p className="text-gray-400 text-xs">2 min ago</p>
              </div>
              <div className="bg-yellow-900/20 border-l-4 border-yellow-400 p-3 rounded">
                <p className="text-white text-sm">Warning: Bob Smith blood pressure elevated</p>
                <p className="text-gray-400 text-xs">5 min ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h4 className="text-xl font-semibold text-white mb-4">AI Insights & Recommendations</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded">
            <h5 className="text-white font-semibold mb-2">📊 Patient Trends</h5>
            <p className="text-gray-400 text-sm">AI detected 15% increase in cardiac risk factors this week</p>
            <p className="text-gray-400 text-sm mt-2">Recommendation: Schedule additional screenings</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <h5 className="text-white font-semibold mb-2">🔍 Predictive Analysis</h5>
            <p className="text-gray-400 text-sm">3 patients showing early warning signs for hypertension</p>
            <p className="text-gray-400 text-sm mt-2">Recommendation: Proactive intervention protocols</p>
          </div>
        </div>
      </div>
    </div>
  );
} 