import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const HealthcareDemo = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);

  useEffect(() => {
    // Simulate healthcare data
    const mockPatients = [
      { id: 1, name: 'John Doe', age: 45, condition: 'Hypertension', status: 'Stable', lastVisit: '2024-01-15' },
      { id: 2, name: 'Jane Smith', age: 32, condition: 'Diabetes', status: 'Monitoring', lastVisit: '2024-01-10' },
      { id: 3, name: 'Bob Johnson', age: 67, condition: 'Heart Disease', status: 'Critical', lastVisit: '2024-01-12' },
      { id: 4, name: 'Alice Brown', age: 28, condition: 'Allergies', status: 'Stable', lastVisit: '2024-01-08' }
    ];

    const mockAppointments = [
      { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', time: '09:00', type: 'Follow-up' },
      { id: 2, patient: 'Jane Smith', doctor: 'Dr. Johnson', time: '10:30', type: 'Consultation' },
      { id: 3, patient: 'Bob Johnson', doctor: 'Dr. Williams', time: '14:00', type: 'Emergency' },
      { id: 4, patient: 'Alice Brown', doctor: 'Dr. Davis', time: '16:30', type: 'Check-up' }
    ];

    const mockRecords = [
      { id: 1, patient: 'John Doe', diagnosis: 'Hypertension', treatment: 'Medication', date: '2024-01-15' },
      { id: 2, patient: 'Jane Smith', diagnosis: 'Diabetes Type 2', treatment: 'Insulin Therapy', date: '2024-01-10' },
      { id: 3, patient: 'Bob Johnson', diagnosis: 'Coronary Artery Disease', treatment: 'Surgery', date: '2024-01-12' }
    ];

    setPatients(mockPatients);
    setAppointments(mockAppointments);
    setMedicalRecords(mockRecords);
  }, []);

  const codeData = {
    code: `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HealthcareDemo = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Simulate healthcare data
    const mockPatients = [
      { id: 1, name: 'John Doe', age: 45, condition: 'Hypertension' },
      { id: 2, name: 'Jane Smith', age: 32, condition: 'Diabetes' }
    ];
    
    setPatients(mockPatients);
  }, []);

`,
    explanation: `Healthcare management system with patient records, appointments, and medical data tracking.

## Core Implementation

**Key Features**: This demo showcases a comprehensive healthcare management system with patient records, appointment scheduling, and medical data tracking.

**Architecture**: Built with modern web technologies for optimal performance and user experience.

**Performance**: Implements efficient algorithms and data structures for real-time processing and smooth interactions.

## Technical Benefits

- **Patient Management**: Comprehensive patient records and history
- **Appointment Scheduling**: Efficient scheduling and calendar management
- **Medical Records**: Secure storage and retrieval of medical data
- **Analytics Dashboard**: Healthcare insights and reporting`,
    technologies: [
      {
        name: 'Patient Management',
        description: 'Comprehensive patient records and history tracking',
        tags: ['Healthcare', 'Records']
      },
      {
        name: 'Appointment Scheduling',
        description: 'Efficient scheduling and calendar management',
        tags: ['Scheduling', 'Calendar']
      },
      {
        name: 'Medical Records',
        description: 'Secure storage and retrieval of medical data',
        tags: ['Security', 'Data']
      }
    ],
    concepts: [
      {
        name: 'Data Management',
        description: 'Managing complex healthcare data structures',
        example: 'const [patients, setPatients] = useState([])'
      },
      {
        name: 'Appointment Scheduling',
        description: 'Efficient scheduling algorithms and conflict resolution',
        example: 'const scheduleAppointment = (patient, doctor, time) => {}'
      },
      {
        name: 'Medical Records',
        description: 'Secure storage and retrieval of sensitive medical data',
        example: 'const medicalRecord = encrypt(patientData)'
      }
    ],
    features: [
      'Patient management and records',
      'Appointment scheduling system',
      'Medical records tracking',
      'Healthcare analytics dashboard',
      'Secure data storage',
      'Real-time updates'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Healthcare Management</h1>
          <p className="text-gray-400">Comprehensive healthcare system with patient management</p>
        </div>
        <motion.button
          onClick={() => setShowCodeViewer(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Implementation
        </motion.button>
      </div>

      {/* Patient Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {patients.map((patient, index) => (
          <motion.div 
            key={patient.id}
            className="bg-gray-800 p-4 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white">{patient.name}</h3>
              <span className={`text-xs px-2 py-1 rounded ${
                patient.status === 'Stable' ? 'bg-green-600 text-green-100' : 
                patient.status === 'Monitoring' ? 'bg-yellow-600 text-yellow-100' : 
                'bg-red-600 text-red-100'
              }`}>
                {patient.status}
              </span>
            </div>
            <p className="text-sm text-gray-400">{patient.condition}</p>
            <p className="text-lg font-bold text-blue-400">{patient.age} years</p>
            <p className="text-xs text-gray-500 mt-1">Last visit: {patient.lastVisit}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Appointments */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Today's Appointments</h2>
        <div className="space-y-3">
          {appointments.map((appointment, index) => (
            <motion.div 
              key={appointment.id}
              className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{appointment.time}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{appointment.patient}</h3>
                  <p className="text-sm text-gray-400">with {appointment.doctor}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded ${
                  appointment.type === 'Emergency' ? 'bg-red-600 text-red-100' : 
                  appointment.type === 'Follow-up' ? 'bg-blue-600 text-blue-100' : 
                  'bg-green-600 text-green-100'
                }`}>
                  {appointment.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Medical Records */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6">Recent Medical Records</h2>
        <div className="space-y-3">
          {medicalRecords.map((record, index) => (
            <motion.div 
              key={record.id}
              className="bg-gray-700 p-4 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-white">{record.patient}</h3>
                  <p className="text-sm text-gray-300">{record.diagnosis}</p>
                  <p className="text-sm text-gray-400">Treatment: {record.treatment}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{record.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        {...codeData}
      />
    </div>
  );
};

export default HealthcareDemo;
