import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';
import webScraper from '../../utils/webScraper';

const HealthcareDemo = () => {
  const [healthcareData, setHealthcareData] = useState(null);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalPatients: 0,
    activeCases: 0,
    averageWaitTime: 0,
    satisfactionRate: 0
  });

  // Sample code for the demo
  const demoCode = `import React, { useState, useEffect } from 'react';
import webScraper from '../../utils/webScraper';

const HealthcareDemo = () => {
  const [healthcareData, setHealthcareData] = useState(null);
  const [patients, setPatients] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      // Fetch real healthcare data
      const data = await webScraper.getHealthcareData();
      setHealthcareData(data);
      
      // Process patient data
      if (data) {
        setPatients(data.appointments.map(apt => ({
          id: apt.id,
          name: apt.patient,
          doctor: apt.doctor,
          appointmentTime: apt.time,
          type: apt.type,
          status: 'Scheduled'
        })));
      }
    };
    
    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Real-time healthcare data display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2>Patient Monitoring</h2>
          {healthcareData && (
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3>Hospital Statistics</h3>
              <p>Total Patients: {healthcareData.patients.total}</p>
              <p>Active Cases: {healthcareData.patients.active}</p>
              <p>Discharged: {healthcareData.patients.discharged}</p>
            </div>
          )}
        </div>
        
        <div>
          <h2>Vital Signs</h2>
          {healthcareData && (
            <div className="p-4 bg-gray-800 rounded-lg">
              <p>Heart Rate: {healthcareData.vitals.heartRate} bpm</p>
              <p>Blood Pressure: {healthcareData.vitals.bloodPressure}</p>
              <p>Temperature: {healthcareData.vitals.temperature.toFixed(1)}°F</p>
              <p>Oxygen: {healthcareData.vitals.oxygenSaturation}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthcareDemo;`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch real healthcare data
        const data = await webScraper.getHealthcareData();
        setHealthcareData(data);
        
        if (data) {
          // Process patient data
          const patientList = data.appointments.map(apt => ({
            id: apt.id,
            name: apt.patient,
            doctor: apt.doctor,
            appointmentTime: apt.time,
            type: apt.type,
            status: 'Scheduled',
            vitals: {
              heartRate: 70 + Math.floor(Math.random() * 30),
              bloodPressure: '120/80',
              temperature: 98.6 + (Math.random() - 0.5) * 2,
              oxygenSaturation: 95 + Math.floor(Math.random() * 5)
            }
          }));
          
          setPatients(patientList);
          setAppointments(data.appointments);
          
          // Update analytics
          setAnalytics({
            totalPatients: data.patients.total,
            activeCases: data.patients.active,
            averageWaitTime: Math.floor(Math.random() * 30) + 15,
            satisfactionRate: 85 + Math.random() * 10
          });
        }
      } catch (error) {
        console.error('Error fetching healthcare data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate real-time patient monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev => prev.map(patient => ({
        ...patient,
        vitals: {
          heartRate: Math.max(60, Math.min(100, patient.vitals.heartRate + (Math.random() - 0.5) * 5)),
          bloodPressure: patient.vitals.bloodPressure,
          temperature: Math.max(97, Math.min(100, patient.vitals.temperature + (Math.random() - 0.5) * 0.2)),
          oxygenSaturation: Math.max(90, Math.min(100, patient.vitals.oxygenSaturation + (Math.random() - 0.5) * 2))
        }
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getVitalColor = (value, type) => {
    if (type === 'heartRate') {
      if (value < 60 || value > 100) return 'text-red-400';
      if (value < 70 || value > 90) return 'text-yellow-400';
      return 'text-green-400';
    }
    if (type === 'oxygenSaturation') {
      if (value < 95) return 'text-red-400';
      if (value < 98) return 'text-yellow-400';
      return 'text-green-400';
    }
    if (type === 'temperature') {
      if (value < 97 || value > 99) return 'text-red-400';
      if (value < 98 || value > 98.6) return 'text-yellow-400';
      return 'text-green-400';
    }
    return 'text-white';
  };

  const getAppointmentTypeColor = (type) => {
    switch (type) {
      case 'Checkup': return 'text-blue-400';
      case 'Consultation': return 'text-green-400';
      case 'Procedure': return 'text-purple-400';
      case 'Follow-up': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">🏥 Healthcare Analytics Platform</h1>
              <p className="text-gray-400">AI-powered patient monitoring and medical analytics</p>
            </div>
            <button
              onClick={() => setShowCodeViewer(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              📄 View Code
            </button>
          </div>
        </div>

        {/* Healthcare Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Patients</p>
                <p className="text-3xl font-bold text-white">{analytics.totalPatients}</p>
                <p className="text-green-400 text-sm">+12 this week</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Cases</p>
                <p className="text-3xl font-bold text-white">{analytics.activeCases}</p>
                <p className="text-blue-400 text-sm">-3 from yesterday</p>
              </div>
              <div className="text-4xl">🏥</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Avg Wait Time</p>
                <p className="text-3xl font-bold text-white">{analytics.averageWaitTime}m</p>
                <p className="text-purple-400 text-sm">-5m improvement</p>
              </div>
              <div className="text-4xl">⏱️</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Satisfaction Rate</p>
                <p className="text-3xl font-bold text-white">{analytics.satisfactionRate.toFixed(1)}%</p>
                <p className="text-yellow-400 text-sm">+2.1% this month</p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Patient Monitoring */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">👥 Patient Monitoring</h2>
            <div className="space-y-4">
              {patients.slice(0, 5).map(patient => (
                <div 
                  key={patient.id} 
                  className="p-4 bg-gray-800 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors cursor-pointer"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white">{patient.name}</h3>
                      <p className="text-gray-400 text-sm">{patient.doctor}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${getAppointmentTypeColor(patient.type)}`}>
                      {patient.type}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Heart Rate</p>
                      <p className={`font-semibold ${getVitalColor(patient.vitals.heartRate, 'heartRate')}`}>
                        {patient.vitals.heartRate} bpm
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Oxygen</p>
                      <p className={`font-semibold ${getVitalColor(patient.vitals.oxygenSaturation, 'oxygenSaturation')}`}>
                        {patient.vitals.oxygenSaturation}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vital Signs Dashboard */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">💓 Vital Signs Dashboard</h2>
            {healthcareData && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Real-time Vitals</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Heart Rate</p>
                      <p className={`text-2xl font-bold ${getVitalColor(healthcareData.vitals.heartRate, 'heartRate')}`}>
                        {healthcareData.vitals.heartRate} bpm
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Blood Pressure</p>
                      <p className="text-2xl font-bold text-white">{healthcareData.vitals.bloodPressure}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Temperature</p>
                      <p className={`text-2xl font-bold ${getVitalColor(healthcareData.vitals.temperature, 'temperature')}`}>
                        {healthcareData.vitals.temperature.toFixed(1)}°F
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Oxygen Saturation</p>
                      <p className={`text-2xl font-bold ${getVitalColor(healthcareData.vitals.oxygenSaturation, 'oxygenSaturation')}`}>
                        {healthcareData.vitals.oxygenSaturation}%
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Medications</h3>
                  <div className="space-y-2">
                    {healthcareData.medications.map((med, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-white">{med.name}</span>
                        <span className="text-gray-400 text-sm">{med.dosage} - {med.frequency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">📅 Upcoming Appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.slice(0, 6).map(appointment => (
              <div key={appointment.id} className="p-4 bg-gray-800 rounded-lg border border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">{appointment.patient}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${getAppointmentTypeColor(appointment.type)}`}>
                    {appointment.type}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Doctor</span>
                    <span className="text-white">{appointment.doctor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time</span>
                    <span className="text-white">{new Date(appointment.time).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Medical Features */}
        <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 AI Medical Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Diagnostic AI</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Symptom analysis</li>
                <li>• Disease prediction</li>
                <li>• Treatment recommendations</li>
                <li>• Risk assessment</li>
                <li>• Medical image analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Patient Monitoring</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time vital tracking</li>
                <li>• Alert systems</li>
                <li>• Trend analysis</li>
                <li>• Predictive analytics</li>
                <li>• Remote monitoring</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Healthcare Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Population health insights</li>
                <li>• Resource optimization</li>
                <li>• Quality metrics</li>
                <li>• Cost analysis</li>
                <li>• Performance tracking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Patient Details Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Patient Details</h3>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Name</span>
                  <span className="text-white font-semibold">{selectedPatient.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Doctor</span>
                  <span className="text-white font-semibold">{selectedPatient.doctor}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Appointment Type</span>
                  <span className={`font-semibold ${getAppointmentTypeColor(selectedPatient.type)}`}>
                    {selectedPatient.type}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Appointment Time</span>
                  <span className="text-white font-semibold">
                    {new Date(selectedPatient.appointmentTime).toLocaleString()}
                  </span>
                </div>
                
                <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Current Vitals</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Heart Rate</p>
                      <p className={`font-semibold ${getVitalColor(selectedPatient.vitals.heartRate, 'heartRate')}`}>
                        {selectedPatient.vitals.heartRate} bpm
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Blood Pressure</p>
                      <p className="font-semibold text-white">{selectedPatient.vitals.bloodPressure}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Temperature</p>
                      <p className={`font-semibold ${getVitalColor(selectedPatient.vitals.temperature, 'temperature')}`}>
                        {selectedPatient.vitals.temperature.toFixed(1)}°F
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Oxygen Saturation</p>
                      <p className={`font-semibold ${getVitalColor(selectedPatient.vitals.oxygenSaturation, 'oxygenSaturation')}`}>
                        {selectedPatient.vitals.oxygenSaturation}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Viewer Modal */}
        {showCodeViewer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Healthcare Demo Code</h3>
                <button
                  onClick={() => setShowCodeViewer(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <CodeViewer code={demoCode} language="javascript" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthcareDemo; 