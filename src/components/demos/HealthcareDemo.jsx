import React, { useState, useEffect } from 'react';

const HealthcareDemo = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalPatients: 0,
    criticalPatients: 0,
    averageHeartRate: 0,
    systemUptime: 0
  });

  // Initialize patients with medical data
  useEffect(() => {
    const initialPatients = [
      {
        id: 1,
        name: 'John Smith',
        age: 65,
        room: 'ICU-101',
        status: 'critical',
        heartRate: 95,
        bloodPressure: '140/90',
        temperature: 38.2,
        oxygenSaturation: 92,
        lastUpdate: '2 minutes ago',
        alerts: ['Elevated heart rate', 'Low oxygen saturation'],
        medications: ['Aspirin', 'Metoprolol', 'Insulin'],
        diagnosis: 'Heart failure, Diabetes'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        age: 42,
        room: 'ICU-102',
        status: 'stable',
        heartRate: 72,
        bloodPressure: '120/80',
        temperature: 36.8,
        oxygenSaturation: 98,
        lastUpdate: '1 minute ago',
        alerts: [],
        medications: ['Ibuprofen', 'Acetaminophen'],
        diagnosis: 'Post-operative recovery'
      },
      {
        id: 3,
        name: 'Mike Davis',
        age: 58,
        room: 'ICU-103',
        status: 'critical',
        heartRate: 110,
        bloodPressure: '160/100',
        temperature: 39.1,
        oxygenSaturation: 88,
        lastUpdate: 'Just now',
        alerts: ['High blood pressure', 'Fever', 'Critical oxygen levels'],
        medications: ['Lisinopril', 'Amlodipine', 'Antibiotics'],
        diagnosis: 'Hypertension, Pneumonia'
      }
    ];
    setPatients(initialPatients);
    setSystemStats({
      totalPatients: initialPatients.length,
      criticalPatients: initialPatients.filter(p => p.status === 'critical').length,
      averageHeartRate: Math.round(initialPatients.reduce((sum, p) => sum + p.heartRate, 0) / initialPatients.length),
      systemUptime: 99.8
    });
  }, []);

  // Simulate real-time patient monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prevPatients => prevPatients.map(patient => {
        const newPatient = {
          ...patient,
          heartRate: patient.heartRate + (Math.random() - 0.5) * 4,
          temperature: patient.temperature + (Math.random() - 0.5) * 0.2,
          oxygenSaturation: patient.oxygenSaturation + (Math.random() - 0.5) * 1,
          lastUpdate: 'Just now'
        };

        // Generate alerts based on vital signs
        const newAlerts = [];
        if (newPatient.heartRate > 100 || newPatient.heartRate < 60) {
          newAlerts.push('Abnormal heart rate');
        }
        if (newPatient.temperature > 38.5 || newPatient.temperature < 36.0) {
          newAlerts.push('Temperature abnormality');
        }
        if (newPatient.oxygenSaturation < 95) {
          newAlerts.push('Low oxygen saturation');
        }
        if (newPatient.bloodPressure.split('/')[0] > 140) {
          newAlerts.push('High blood pressure');
        }

        newPatient.alerts = newAlerts;
        newPatient.status = newAlerts.length > 2 ? 'critical' : 
                           newAlerts.length > 0 ? 'warning' : 'stable';
        
        return newPatient;
      }));

      setSystemStats(prev => ({
        ...prev,
        averageHeartRate: Math.round(prevPatients.reduce((sum, p) => sum + p.heartRate, 0) / prevPatients.length),
        criticalPatients: prevPatients.filter(p => p.status === 'critical').length
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate system alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const allAlerts = patients.flatMap(patient => 
        patient.alerts.map(alert => ({
          id: Date.now() + Math.random(),
          patient: patient.name,
          room: patient.room,
          message: alert,
          severity: alert.includes('Critical') ? 'high' : 'medium',
          timestamp: new Date().toLocaleTimeString()
        }))
      );
      setAlerts(allAlerts.slice(0, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, [patients]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'stable': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'critical': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🏥 Healthcare Analytics Platform</h1>
          <p className="text-gray-300 text-lg">
            AI-powered patient monitoring with real-time vital signs, predictive analytics, and automated alerts
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Patients</h3>
            <p className="text-3xl font-bold text-green-400">{systemStats.totalPatients}</p>
          </div>
          <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
            <div className="text-3xl mb-2">🚨</div>
            <h3 className="text-xl font-semibold text-white mb-2">Critical Patients</h3>
            <p className="text-3xl font-bold text-red-400">{systemStats.criticalPatients}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">💓</div>
            <h3 className="text-xl font-semibold text-white mb-2">Avg Heart Rate</h3>
            <p className="text-3xl font-bold text-blue-400">{systemStats.averageHeartRate} bpm</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">System Uptime</h3>
            <p className="text-3xl font-bold text-purple-400">{systemStats.systemUptime}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient Monitoring */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-6">Patient Monitoring</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedPatient?.id === patient.id
                        ? 'border-green-400 bg-green-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
                        <p className="text-gray-400 text-sm">Room {patient.room} • Age {patient.age}</p>
                        <p className={`text-sm ${getStatusColor(patient.status)}`}>
                          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded text-xs ${getStatusBg(patient.status)}`}>
                          {patient.alerts.length} alerts
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{patient.lastUpdate}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Heart Rate</p>
                        <p className={`text-white font-semibold ${
                          patient.heartRate > 100 || patient.heartRate < 60 ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {patient.heartRate.toFixed(0)} bpm
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Blood Pressure</p>
                        <p className="text-white">{patient.bloodPressure}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Temperature</p>
                        <p className={`text-white font-semibold ${
                          patient.temperature > 38.5 || patient.temperature < 36.0 ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {patient.temperature.toFixed(1)}°C
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">O₂ Saturation</p>
                        <p className={`text-white font-semibold ${
                          patient.oxygenSaturation < 95 ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {patient.oxygenSaturation}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Medical Alerts */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
              <h2 className="text-2xl font-bold text-white mb-4">🚨 Medical Alerts</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {alerts.length === 0 ? (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">✅</div>
                    <p className="text-gray-300">No active alerts</p>
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div key={alert.id} className="bg-red-800/50 p-3 rounded-lg border border-red-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">{alert.patient}</p>
                          <p className="text-red-200 text-sm">{alert.message}</p>
                          <p className="text-gray-300 text-xs">{alert.room} • {alert.timestamp}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          alert.severity === 'high' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">⚙️ Medical Controls</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Check All Vitals
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Generate Report
                </button>
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Emergency Protocol
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Details */}
        {selectedPatient && (
          <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedPatient.name} - Medical Details</h2>
              <button
                onClick={() => setSelectedPatient(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Vital Signs</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Heart Rate</span>
                    <span className={`text-lg font-semibold ${
                      selectedPatient.heartRate > 100 || selectedPatient.heartRate < 60 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {selectedPatient.heartRate.toFixed(0)} bpm
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Blood Pressure</span>
                    <span className="text-lg font-semibold text-white">{selectedPatient.bloodPressure}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Temperature</span>
                    <span className={`text-lg font-semibold ${
                      selectedPatient.temperature > 38.5 || selectedPatient.temperature < 36.0 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {selectedPatient.temperature.toFixed(1)}°C
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">O₂ Saturation</span>
                    <span className={`text-lg font-semibold ${
                      selectedPatient.oxygenSaturation < 95 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {selectedPatient.oxygenSaturation}%
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Medical Information</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-300">Diagnosis:</span>
                    <p className="text-white text-sm mt-1">{selectedPatient.diagnosis}</p>
                  </div>
                  <div>
                    <span className="text-gray-300">Medications:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedPatient.medications.map((med, index) => (
                        <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                          {med}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-300">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${getStatusBg(selectedPatient.status)}`}>
                      {selectedPatient.status.charAt(0).toUpperCase() + selectedPatient.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-300">Room:</span>
                    <span className="text-white ml-2">{selectedPatient.room}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 AI-Powered Healthcare Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Predictive Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Early warning detection</li>
                <li>• Risk assessment models</li>
                <li>• Treatment outcome prediction</li>
                <li>• Patient deterioration alerts</li>
                <li>• Resource optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Medical Device Integration</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time vital monitoring</li>
                <li>• Automated data collection</li>
                <li>• Device status tracking</li>
                <li>• Calibration management</li>
                <li>• Remote device control</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Clinical Decision Support</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Evidence-based recommendations</li>
                <li>• Drug interaction checking</li>
                <li>• Dosage optimization</li>
                <li>• Allergy alerts</li>
                <li>• Clinical guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareDemo; 