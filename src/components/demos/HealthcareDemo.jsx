import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const HealthcareDemo = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [healthcareStats, setHealthcareStats] = useState({
    totalPatients: 0,
    activeAppointments: 0,
    averageWaitTime: 0,
    patientSatisfaction: 0,
    emergencyCases: 0,
    telemedicineSessions: 0,
    aiDiagnoses: 0,
    criticalAlerts: 0
  });

  // Sample code for the demo
  const demoCode = `import React, { useState, useEffect } from 'react';

const HealthcareDemo = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev => prev.map(patient => ({
        ...patient,
        vitalSigns: {
          heartRate: patient.vitalSigns.heartRate + (Math.random() - 0.5) * 10,
          bloodPressure: {
            systolic: patient.vitalSigns.bloodPressure.systolic + (Math.random() - 0.5) * 5,
            diastolic: patient.vitalSigns.bloodPressure.diastolic + (Math.random() - 0.5) * 3
          },
          temperature: patient.vitalSigns.temperature + (Math.random() - 0.5) * 0.5,
          oxygenSaturation: patient.vitalSigns.oxygenSaturation + (Math.random() - 0.5) * 2
        },
        lastUpdate: 'Just now'
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const analyzeVitalSigns = (vitalSigns) => {
    // AI-powered vital signs analysis
    const analysis = {
      heartRate: vitalSigns.heartRate > 100 ? 'Elevated' : 'Normal',
      bloodPressure: vitalSigns.bloodPressure.systolic > 140 ? 'High' : 'Normal',
      temperature: vitalSigns.temperature > 100.4 ? 'Fever' : 'Normal',
      oxygenSaturation: vitalSigns.oxygenSaturation < 95 ? 'Low' : 'Normal'
    };
    return analysis;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Monitoring */}
        <div className="space-y-4">
          {patients.map((patient) => (
            <div key={patient.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{patient.name}</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-gray-400">Heart Rate</p>
                  <p className="text-white font-semibold">{patient.vitalSigns.heartRate} bpm</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className="text-white font-semibold">{patient.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* AI Diagnostics */}
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
              <p className="text-gray-300 text-sm">{appointment.doctorName}</p>
              <p className="text-gray-400 text-xs">{appointment.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthcareDemo;`;

  useEffect(() => {
    // Initialize healthcare data
    const initialPatients = [
      {
        id: 1,
        name: 'Sarah Johnson',
        age: 34,
        gender: 'Female',
        room: '301',
        status: 'stable',
        priority: 'medium',
        vitalSigns: {
          heartRate: 72,
          bloodPressure: { systolic: 120, diastolic: 80 },
          temperature: 98.6,
          oxygenSaturation: 98,
          respiratoryRate: 16
        },
        lastUpdate: 'Just now',
        assignedDoctor: 'Dr. Michael Chen',
        diagnosis: 'Hypertension',
        medications: ['Lisinopril', 'Amlodipine'],
        allergies: ['Penicillin'],
        emergencyContact: '+1-555-0101'
      },
      {
        id: 2,
        name: 'Robert Davis',
        age: 67,
        gender: 'Male',
        room: '405',
        status: 'critical',
        priority: 'high',
        vitalSigns: {
          heartRate: 95,
          bloodPressure: { systolic: 160, diastolic: 95 },
          temperature: 101.2,
          oxygenSaturation: 92,
          respiratoryRate: 22
        },
        lastUpdate: '1 minute ago',
        assignedDoctor: 'Dr. Emily Rodriguez',
        diagnosis: 'Pneumonia',
        medications: ['Azithromycin', 'Albuterol'],
        allergies: ['Sulfa drugs'],
        emergencyContact: '+1-555-0102'
      },
      {
        id: 3,
        name: 'Maria Garcia',
        age: 28,
        gender: 'Female',
        room: '202',
        status: 'stable',
        priority: 'low',
        vitalSigns: {
          heartRate: 68,
          bloodPressure: { systolic: 110, diastolic: 70 },
          temperature: 97.8,
          oxygenSaturation: 99,
          respiratoryRate: 14
        },
        lastUpdate: '2 minutes ago',
        assignedDoctor: 'Dr. James Wilson',
        diagnosis: 'Routine Checkup',
        medications: ['Multivitamin'],
        allergies: ['None'],
        emergencyContact: '+1-555-0103'
      }
    ];

    const initialDoctors = [
      {
        id: 1,
        name: 'Dr. Michael Chen',
        specialty: 'Cardiology',
        status: 'available',
        currentPatients: 3,
        experience: '15 years',
        rating: 4.8,
        nextAppointment: '2:30 PM',
        telemedicineSessions: 5
      },
      {
        id: 2,
        name: 'Dr. Emily Rodriguez',
        specialty: 'Emergency Medicine',
        status: 'busy',
        currentPatients: 2,
        experience: '12 years',
        rating: 4.9,
        nextAppointment: '3:15 PM',
        telemedicineSessions: 2
      },
      {
        id: 3,
        name: 'Dr. James Wilson',
        specialty: 'Internal Medicine',
        status: 'available',
        currentPatients: 4,
        experience: '18 years',
        rating: 4.7,
        nextAppointment: '1:45 PM',
        telemedicineSessions: 8
      }
    ];

    const initialAppointments = [
      {
        id: 1,
        patientName: 'Sarah Johnson',
        doctorName: 'Dr. Michael Chen',
        time: '2:30 PM',
        type: 'Follow-up',
        status: 'confirmed',
        duration: 30,
        room: '301',
        notes: 'Blood pressure monitoring'
      },
      {
        id: 2,
        patientName: 'Robert Davis',
        doctorName: 'Dr. Emily Rodriguez',
        time: '3:15 PM',
        type: 'Emergency',
        status: 'in-progress',
        duration: 45,
        room: '405',
        notes: 'Critical care required'
      },
      {
        id: 3,
        patientName: 'Maria Garcia',
        doctorName: 'Dr. James Wilson',
        time: '1:45 PM',
        type: 'Routine',
        status: 'scheduled',
        duration: 20,
        room: '202',
        notes: 'Annual physical'
      }
    ];

    const initialMedicalRecords = [
      {
        id: 1,
        patientId: 1,
        date: '2024-01-15',
        type: 'Lab Results',
        results: {
          cholesterol: 180,
          glucose: 95,
          hemoglobin: 14.2,
          whiteBloodCells: 7.5
        },
        status: 'normal',
        doctor: 'Dr. Michael Chen'
      },
      {
        id: 2,
        patientId: 2,
        date: '2024-01-15',
        type: 'X-Ray',
        results: {
          chestXRay: 'Pneumonia detected',
          severity: 'moderate',
          followUp: 'Required'
        },
        status: 'abnormal',
        doctor: 'Dr. Emily Rodriguez'
      }
    ];

    setPatients(initialPatients);
    setDoctors(initialDoctors);
    setAppointments(initialAppointments);
    setMedicalRecords(initialMedicalRecords);
  }, []);

  useEffect(() => {
    // Simulate real-time healthcare updates
    const interval = setInterval(() => {
      // Update patient vital signs
      setPatients(prev => prev.map(patient => ({
        ...patient,
        vitalSigns: {
          heartRate: Math.max(60, Math.min(120, patient.vitalSigns.heartRate + (Math.random() - 0.5) * 10)),
          bloodPressure: {
            systolic: Math.max(90, Math.min(180, patient.vitalSigns.bloodPressure.systolic + (Math.random() - 0.5) * 5)),
            diastolic: Math.max(60, Math.min(110, patient.vitalSigns.bloodPressure.diastolic + (Math.random() - 0.5) * 3))
          },
          temperature: Math.max(97, Math.min(103, patient.vitalSigns.temperature + (Math.random() - 0.5) * 0.5)),
          oxygenSaturation: Math.max(90, Math.min(100, patient.vitalSigns.oxygenSaturation + (Math.random() - 0.5) * 2)),
          respiratoryRate: Math.max(12, Math.min(25, patient.vitalSigns.respiratoryRate + (Math.random() - 0.5) * 2))
        },
        lastUpdate: 'Just now'
      })));

      // Update healthcare stats
      setHealthcareStats(prev => ({
        totalPatients: patients.length,
        activeAppointments: appointments.filter(a => a.status === 'in-progress').length,
        averageWaitTime: Math.max(15, prev.averageWaitTime + (Math.random() - 0.5) * 5),
        patientSatisfaction: Math.min(100, prev.patientSatisfaction + (Math.random() - 0.5) * 2),
        emergencyCases: patients.filter(p => p.status === 'critical').length,
        telemedicineSessions: doctors.reduce((sum, d) => sum + d.telemedicineSessions, 0),
        aiDiagnoses: Math.floor(prev.aiDiagnoses + Math.random() * 2),
        criticalAlerts: patients.filter(p => p.vitalSigns.oxygenSaturation < 95 || p.vitalSigns.heartRate > 100).length
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [patients, appointments, doctors]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable': return 'text-green-400';
      case 'critical': return 'text-red-400';
      case 'improving': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'stable': return 'bg-green-600';
      case 'critical': return 'bg-red-600';
      case 'improving': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const analyzeVitalSigns = (vitalSigns) => {
    const analysis = {
      heartRate: vitalSigns.heartRate > 100 ? 'Elevated' : vitalSigns.heartRate < 60 ? 'Low' : 'Normal',
      bloodPressure: vitalSigns.bloodPressure.systolic > 140 ? 'High' : vitalSigns.bloodPressure.systolic < 90 ? 'Low' : 'Normal',
      temperature: vitalSigns.temperature > 100.4 ? 'Fever' : vitalSigns.temperature < 97 ? 'Low' : 'Normal',
      oxygenSaturation: vitalSigns.oxygenSaturation < 95 ? 'Low' : 'Normal',
      respiratoryRate: vitalSigns.respiratoryRate > 20 ? 'Elevated' : vitalSigns.respiratoryRate < 12 ? 'Low' : 'Normal'
    };
    return analysis;
  };

  const getVitalSignColor = (value, normalRange) => {
    const [min, max] = normalRange;
    if (value < min) return 'text-blue-400';
    if (value > max) return 'text-red-400';
    return 'text-green-400';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Code Viewer Button */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-green-400 mb-4">🏥 Smart Healthcare Platform</h1>
            <p className="text-gray-300 text-lg">
              AI-powered patient monitoring, telemedicine, and comprehensive healthcare analytics
            </p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>📄</span>
            <span>View Code</span>
          </button>
        </div>

        {/* Healthcare Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Patients</h3>
            <p className="text-3xl font-bold text-green-400">{healthcareStats.totalPatients}</p>
            <p className="text-green-300 text-sm">Real-time monitoring</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">🚨</div>
            <h3 className="text-xl font-semibold text-white mb-2">Critical Cases</h3>
            <p className="text-3xl font-bold text-blue-400">{healthcareStats.emergencyCases}</p>
            <p className="text-blue-300 text-sm">{healthcareStats.criticalAlerts} alerts</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Avg Wait Time</h3>
            <p className="text-3xl font-bold text-purple-400">{healthcareStats.averageWaitTime.toFixed(0)} min</p>
            <p className="text-purple-300 text-sm">{healthcareStats.patientSatisfaction.toFixed(1)}% satisfaction</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Diagnoses</h3>
            <p className="text-3xl font-bold text-yellow-400">{healthcareStats.aiDiagnoses}</p>
            <p className="text-yellow-300 text-sm">{healthcareStats.telemedicineSessions} telemedicine</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient Monitoring */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">👥 Patient Monitoring</h2>
                <div className="text-sm text-green-300">Real-time updates every 2s</div>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {patients.map((patient) => {
                  const analysis = analyzeVitalSigns(patient.vitalSigns);
                  return (
                    <div
                      key={patient.id}
                      className={'p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ' + (
                        patient.status === 'critical' 
                          ? 'bg-red-900/50 border-red-600' 
                          : patient.status === 'stable'
                            ? 'bg-green-900/50 border-green-600'
                            : 'bg-yellow-900/50 border-yellow-600'
                      )}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
                          <p className="text-gray-300 text-sm">Room {patient.room} • {patient.age} years</p>
                          <p className="text-gray-400 text-xs">Dr. {patient.assignedDoctor.split(' ')[1]}</p>
                          <p className="text-gray-400 text-xs">{patient.lastUpdate}</p>
                        </div>
                        <div className="text-right">
                          <div className={'px-2 py-1 rounded text-xs font-medium ' + getStatusBg(patient.status)}>
                            {patient.status.toUpperCase()}
                          </div>
                          <div className={'px-2 py-1 rounded text-xs mt-1 ' + getPriorityBg(patient.priority)}>
                            {patient.priority.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Heart Rate</p>
                          <p className={'font-semibold ' + getVitalSignColor(patient.vitalSigns.heartRate, [60, 100])}>
                            {patient.vitalSigns.heartRate} bpm
                          </p>
                          <p className="text-gray-400 text-xs">{analysis.heartRate}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Blood Pressure</p>
                          <p className={'font-semibold ' + getVitalSignColor(patient.vitalSigns.bloodPressure.systolic, [90, 140])}>
                            {patient.vitalSigns.bloodPressure.systolic}/{patient.vitalSigns.bloodPressure.diastolic}
                          </p>
                          <p className="text-gray-400 text-xs">{analysis.bloodPressure}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Temperature</p>
                          <p className={'font-semibold ' + getVitalSignColor(patient.vitalSigns.temperature, [97, 100.4])}>
                            {patient.vitalSigns.temperature}°F
                          </p>
                          <p className="text-gray-400 text-xs">{analysis.temperature}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">O₂ Saturation</p>
                          <p className={'font-semibold ' + getVitalSignColor(patient.vitalSigns.oxygenSaturation, [95, 100])}>
                            {patient.vitalSigns.oxygenSaturation}%
                          </p>
                          <p className="text-gray-400 text-xs">{analysis.oxygenSaturation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Healthcare Analytics */}
          <div className="space-y-6">
            {/* Doctor Status */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">👨‍⚕️ Doctor Status</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{doctor.name}</p>
                        <p className="text-blue-200 text-sm">{doctor.specialty}</p>
                        <p className="text-blue-200 text-xs">{doctor.experience}</p>
                        <p className="text-gray-300 text-xs">{doctor.nextAppointment}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getStatusBg(doctor.status)}>
                          {doctor.status.toUpperCase()}
                        </div>
                        <p className="text-white text-xs mt-1">⭐ {doctor.rating}</p>
                        <p className="text-gray-300 text-xs">{doctor.currentPatients} patients</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Appointments */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">📅 Appointments</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="bg-purple-800/50 p-3 rounded-lg border border-purple-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{appointment.patientName}</p>
                        <p className="text-purple-200 text-sm">{appointment.doctorName}</p>
                        <p className="text-purple-200 text-xs">{appointment.type}</p>
                        <p className="text-gray-300 text-xs">Room {appointment.room}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getStatusBg(appointment.status)}>
                          {appointment.status.toUpperCase()}
                        </div>
                        <p className="text-white text-xs mt-1">{appointment.time}</p>
                        <p className="text-gray-300 text-xs">{appointment.duration} min</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Diagnostics */}
            <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
              <h2 className="text-2xl font-bold text-white mb-4">🤖 AI Diagnostics</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {medicalRecords.map((record) => (
                  <div key={record.id} className="bg-yellow-800/50 p-3 rounded-lg border border-yellow-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{record.type}</p>
                        <p className="text-yellow-200 text-sm">{record.date}</p>
                        <p className="text-yellow-200 text-xs">{record.doctor}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + (record.status === 'normal' ? 'bg-green-600' : 'bg-red-600')}>
                          {record.status.toUpperCase()}
                        </div>
                        <p className="text-white text-xs mt-1">AI analyzed</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Patient Details Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
            <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Patient Details</h2>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Patient Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white font-semibold">{selectedPatient.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Age:</span>
                      <span className="text-white font-semibold">{selectedPatient.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gender:</span>
                      <span className="text-white font-semibold">{selectedPatient.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Room:</span>
                      <span className="text-white font-semibold">{selectedPatient.room}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={'font-semibold ' + getStatusColor(selectedPatient.status)}>
                        {selectedPatient.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Priority:</span>
                      <span className={'font-semibold ' + getPriorityColor(selectedPatient.priority)}>
                        {selectedPatient.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Doctor:</span>
                      <span className="text-white font-semibold">{selectedPatient.assignedDoctor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Diagnosis:</span>
                      <span className="text-white font-semibold">{selectedPatient.diagnosis}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Vital Signs</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Heart Rate:</span>
                      <span className={'font-semibold ' + getVitalSignColor(selectedPatient.vitalSigns.heartRate, [60, 100])}>
                        {selectedPatient.vitalSigns.heartRate} bpm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Blood Pressure:</span>
                      <span className={'font-semibold ' + getVitalSignColor(selectedPatient.vitalSigns.bloodPressure.systolic, [90, 140])}>
                        {selectedPatient.vitalSigns.bloodPressure.systolic}/{selectedPatient.vitalSigns.bloodPressure.diastolic}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Temperature:</span>
                      <span className={'font-semibold ' + getVitalSignColor(selectedPatient.vitalSigns.temperature, [97, 100.4])}>
                        {selectedPatient.vitalSigns.temperature}°F
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">O₂ Saturation:</span>
                      <span className={'font-semibold ' + getVitalSignColor(selectedPatient.vitalSigns.oxygenSaturation, [95, 100])}>
                        {selectedPatient.vitalSigns.oxygenSaturation}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Respiratory Rate:</span>
                      <span className={'font-semibold ' + getVitalSignColor(selectedPatient.vitalSigns.respiratoryRate, [12, 20])}>
                        {selectedPatient.vitalSigns.respiratoryRate} bpm
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-purple-400 mb-3 mt-4">Medical Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">Medications:</span>
                      <p className="text-white font-semibold">{selectedPatient.medications.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Allergies:</span>
                      <p className="text-white font-semibold">{selectedPatient.allergies.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Emergency Contact:</span>
                      <p className="text-white font-semibold">{selectedPatient.emergencyContact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Healthcare Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🏥 Advanced Healthcare Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Patient Monitoring</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time vital signs tracking</li>
                <li>• AI-powered anomaly detection</li>
                <li>• Automated alert systems</li>
                <li>• Remote patient monitoring</li>
                <li>• Predictive health analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Telemedicine</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Virtual consultations</li>
                <li>• Remote diagnostics</li>
                <li>• Digital prescriptions</li>
                <li>• Video conferencing</li>
                <li>• Mobile health apps</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">AI Diagnostics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Medical image analysis</li>
                <li>• Symptom assessment</li>
                <li>• Treatment recommendations</li>
                <li>• Risk prediction models</li>
                <li>• Clinical decision support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      {showCodeViewer && (
        <CodeViewer
          code={demoCode}
          language="jsx"
          title="Healthcare Demo Code"
          onClose={() => setShowCodeViewer(false)}
        />
      )}
    </div>
  );
};

export default HealthcareDemo; 