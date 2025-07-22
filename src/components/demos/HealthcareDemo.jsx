import React, { useState, useEffect } from 'react';

const HealthcareDemo = () => {
  const [activeTab, setActiveTab] = useState('patients');
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [vitalSigns, setVitalSigns] = useState({});
  const [aiPredictions, setAiPredictions] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'patients', label: 'Patients', icon: '👥' },
    { id: 'monitoring', label: 'Monitoring', icon: '📊' },
    { id: 'ai-diagnostics', label: 'AI Diagnostics', icon: '🤖' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  useEffect(() => {
    initializeData();
    const interval = setInterval(updateVitalSigns, 3000);
    return () => clearInterval(interval);
  }, []);

  const initializeData = () => {
    const initialPatients = [
      {
        id: 1,
        name: 'John Smith',
        age: 45,
        room: '301',
        status: 'stable',
        condition: 'Hypertension',
        lastUpdate: '2 minutes ago',
        vitalSigns: {
          heartRate: 72,
          bloodPressure: { systolic: 130, diastolic: 85 },
          temperature: 98.6,
          oxygenSaturation: 98,
          respiratoryRate: 16
        }
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        age: 62,
        room: '302',
        status: 'critical',
        condition: 'Diabetes',
        lastUpdate: '1 minute ago',
        vitalSigns: {
          heartRate: 95,
          bloodPressure: { systolic: 145, diastolic: 92 },
          temperature: 99.2,
          oxygenSaturation: 94,
          respiratoryRate: 20
        }
      },
      {
        id: 3,
        name: 'Michael Chen',
        age: 38,
        room: '303',
        status: 'stable',
        condition: 'Post-surgery',
        lastUpdate: '3 minutes ago',
        vitalSigns: {
          heartRate: 68,
          bloodPressure: { systolic: 118, diastolic: 78 },
          temperature: 98.4,
          oxygenSaturation: 99,
          respiratoryRate: 14
        }
      },
      {
        id: 4,
        name: 'Emily Davis',
        age: 29,
        room: '304',
        status: 'warning',
        condition: 'Pneumonia',
        lastUpdate: 'Just now',
        vitalSigns: {
          heartRate: 88,
          bloodPressure: { systolic: 135, diastolic: 88 },
          temperature: 100.8,
          oxygenSaturation: 91,
          respiratoryRate: 24
        }
      }
    ];

    setPatients(initialPatients);
    setSelectedPatient(initialPatients[0]);
  };

  const updateVitalSigns = () => {
    setPatients(prev => prev.map(patient => {
      const updatedVitals = {
        heartRate: patient.vitalSigns.heartRate + (Math.random() - 0.5) * 4,
        bloodPressure: {
          systolic: patient.vitalSigns.bloodPressure.systolic + (Math.random() - 0.5) * 6,
          diastolic: patient.vitalSigns.bloodPressure.diastolic + (Math.random() - 0.5) * 4
        },
        temperature: patient.vitalSigns.temperature + (Math.random() - 0.5) * 0.4,
        oxygenSaturation: patient.vitalSigns.oxygenSaturation + (Math.random() - 0.5) * 2,
        respiratoryRate: patient.vitalSigns.respiratoryRate + (Math.random() - 0.5) * 2
      };

      // Update status based on vital signs
      let newStatus = 'stable';
      if (updatedVitals.heartRate > 100 || updatedVitals.heartRate < 60) newStatus = 'warning';
      if (updatedVitals.oxygenSaturation < 92) newStatus = 'critical';
      if (updatedVitals.temperature > 100.4) newStatus = 'warning';

      return {
        ...patient,
        vitalSigns: updatedVitals,
        status: newStatus,
        lastUpdate: 'Just now'
      };
    }));
  };

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

  const renderPatientList = () => {
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-lg font-semibold text-blue-400 mb-4">Patient Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Total Patients</p>
            <p className="text-2xl font-bold text-white">{patients.length}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Stable</p>
            <p className="text-2xl font-bold text-green-400">
              {patients.filter(p => p.status === 'stable').length}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Warning</p>
            <p className="text-2xl font-bold text-yellow-400">
              {patients.filter(p => p.status === 'warning').length}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Critical</p>
            <p className="text-2xl font-bold text-red-400">
              {patients.filter(p => p.status === 'critical').length}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {patients.map(patient => (
            <div
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedPatient?.id === patient.id
                  ? 'border-blue-400 bg-blue-900/20'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-white">{patient.name}</h4>
                  <p className="text-gray-400 text-sm">Room {patient.room} • {patient.age} years</p>
                  <p className="text-gray-300 text-sm">{patient.condition}</p>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded text-xs ${getStatusBg(patient.status)}`}>
                    {patient.status.toUpperCase()}
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{patient.lastUpdate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVitalSignsChart = (patient) => {
    if (!patient) return null;

    const vitals = patient.vitalSigns;
    
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-lg font-semibold text-green-400 mb-4">
          Vital Signs - {patient.name}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Heart Rate */}
          <div className="bg-gray-700 p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Heart Rate</span>
              <span className={`font-semibold ${
                vitals.heartRate > 100 || vitals.heartRate < 60 ? 'text-red-400' : 'text-green-400'
              }`}>
                {vitals.heartRate.toFixed(0)} BPM
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-red-400 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((vitals.heartRate / 120) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="bg-gray-700 p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Blood Pressure</span>
              <span className={`font-semibold ${
                vitals.bloodPressure.systolic > 140 || vitals.bloodPressure.diastolic > 90 ? 'text-red-400' : 'text-green-400'
              }`}>
                {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic} mmHg
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-blue-400 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((vitals.bloodPressure.systolic / 200) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-gray-700 p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Temperature</span>
              <span className={`font-semibold ${
                vitals.temperature > 100.4 ? 'text-red-400' : 'text-green-400'
              }`}>
                {vitals.temperature.toFixed(1)}°F
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(((vitals.temperature - 95) / 10) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Oxygen Saturation */}
          <div className="bg-gray-700 p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">O₂ Saturation</span>
              <span className={`font-semibold ${
                vitals.oxygenSaturation < 92 ? 'text-red-400' : 'text-green-400'
              }`}>
                {vitals.oxygenSaturation.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all"
                style={{ width: `${vitals.oxygenSaturation}%` }}
              />
            </div>
          </div>

          {/* Respiratory Rate */}
          <div className="bg-gray-700 p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Respiratory Rate</span>
              <span className={`font-semibold ${
                vitals.respiratoryRate > 20 || vitals.respiratoryRate < 12 ? 'text-red-400' : 'text-green-400'
              }`}>
                {vitals.respiratoryRate.toFixed(0)} /min
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-purple-400 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((vitals.respiratoryRate / 30) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Status Summary */}
          <div className="bg-gray-700 p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Overall Status</span>
              <span className={`font-semibold ${getStatusColor(patient.status)}`}>
                {patient.status.toUpperCase()}
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  patient.status === 'critical' ? 'bg-red-400' :
                  patient.status === 'warning' ? 'bg-yellow-400' : 'bg-green-400'
                }`}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAIDiagnostics = () => {
    const predictions = [
      {
        patient: 'John Smith',
        prediction: 'Hypertension Risk',
        confidence: 0.87,
        severity: 'moderate',
        recommendations: ['Monitor blood pressure', 'Reduce salt intake', 'Exercise regularly']
      },
      {
        patient: 'Sarah Johnson',
        prediction: 'Diabetes Complications',
        confidence: 0.92,
        severity: 'high',
        recommendations: ['Check blood glucose', 'Adjust medication', 'Consult endocrinologist']
      },
      {
        patient: 'Emily Davis',
        prediction: 'Respiratory Distress',
        confidence: 0.78,
        severity: 'high',
        recommendations: ['Increase oxygen therapy', 'Monitor breathing', 'Consider ICU transfer']
      }
    ];

    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-lg font-semibold text-purple-400 mb-4">AI-Powered Diagnostics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Predictions */}
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Risk Predictions</h4>
            <div className="space-y-3">
              {predictions.map((prediction, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-white">{prediction.patient}</p>
                      <p className="text-sm text-gray-300">{prediction.prediction}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${
                        prediction.severity === 'high' ? 'text-red-400' :
                        prediction.severity === 'moderate' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {(prediction.confidence * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-gray-400">{prediction.severity}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full"
                      style={{ width: `${prediction.confidence * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400">
                    {prediction.recommendations.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Confidence */}
          <div>
            <h4 className="text-md font-semibold text-white mb-3">AI Performance</h4>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Prediction Accuracy</span>
                  <span className="text-green-400 font-semibold">94.2%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
              </div>
              
              <div className="bg-gray-700 p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Response Time</span>
                  <span className="text-blue-400 font-semibold">1.2s</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="bg-gray-700 p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">False Positive Rate</span>
                  <span className="text-yellow-400 font-semibold">2.1%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '2.1%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAnalytics = () => {
    const analytics = {
      totalPatients: patients.length,
      averageAge: Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length),
      criticalRate: (patients.filter(p => p.status === 'critical').length / patients.length * 100).toFixed(1),
      averageHeartRate: Math.round(patients.reduce((sum, p) => sum + p.vitalSigns.heartRate, 0) / patients.length)
    };

    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-lg font-semibold text-yellow-400 mb-4">Healthcare Analytics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Total Patients</p>
            <p className="text-2xl font-bold text-white">{analytics.totalPatients}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Average Age</p>
            <p className="text-2xl font-bold text-blue-400">{analytics.averageAge}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Critical Rate</p>
            <p className="text-2xl font-bold text-red-400">{analytics.criticalRate}%</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Avg Heart Rate</p>
            <p className="text-2xl font-bold text-green-400">{analytics.averageHeartRate} BPM</p>
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded">
            <h4 className="text-md font-semibold text-white mb-3">Patient Status Trends</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Stable</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-600 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm text-green-400">60%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Warning</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-600 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-sm text-yellow-400">25%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Critical</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-600 rounded-full h-2">
                    <div className="bg-red-400 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-sm text-red-400">15%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded">
            <h4 className="text-md font-semibold text-white mb-3">Vital Signs Distribution</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Normal Heart Rate</span>
                <span className="text-sm text-green-400">75%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Normal Blood Pressure</span>
                <span className="text-sm text-green-400">68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Normal Temperature</span>
                <span className="text-sm text-green-400">82%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Normal O₂ Saturation</span>
                <span className="text-sm text-green-400">91%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🏥 Healthcare Analytics Platform</h1>
          <p className="text-gray-300 text-lg">
            AI-powered patient monitoring with real-time vital signs, predictive diagnostics, and comprehensive analytics
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          {activeTab === 'patients' && renderPatientList()}
          {activeTab === 'monitoring' && renderVitalSignsChart(selectedPatient)}
          {activeTab === 'ai-diagnostics' && renderAIDiagnostics()}
          {activeTab === 'analytics' && renderAnalytics()}
        </div>
      </div>
    </div>
  );
};

export default HealthcareDemo; 