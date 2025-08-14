import React, { useState } from 'react';

const HealthcareProjectPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'demo', label: 'Live Demo', icon: '🎮' }
  ];

  const codeExamples = {
    patientMonitoring: `// Patient Monitoring System
class PatientMonitoring {
  constructor() {
    this.patients = new Map();
    this.vitalSigns = new Map();
    this.alerts = new Map();
    this.aiModels = {
      riskAssessment: new RiskAssessmentModel(),
      predictionModel: new PredictionModel(),
      anomalyDetection: new AnomalyDetectionModel()
    };
  }

  addPatient(patientId, patientData) {
    this.patients.set(patientId, {
      id: patientId,
      name: patientData.name,
      age: patientData.age,
      gender: patientData.gender,
      medicalHistory: patientData.medicalHistory,
      currentMedications: patientData.medications,
      riskFactors: patientData.riskFactors,
      admissionDate: new Date(),
      status: 'active'
    });
  }

  updateVitalSigns(patientId, vitalSigns) {
    const patient = this.patients.get(patientId);
    if (!patient) return;

    const timestamp = new Date();
    const vitalData = {
      ...vitalSigns,
      timestamp: timestamp,
      patientId: patientId
    };

    // Store vital signs
    if (!this.vitalSigns.has(patientId)) {
      this.vitalSigns.set(patientId, []);
    }
    this.vitalSigns.get(patientId).push(vitalData);

    // Analyze vital signs
    this.analyzeVitalSigns(patientId, vitalData);
  }

  async analyzeVitalSigns(patientId, vitalData) {
    const patient = this.patients.get(patientId);
    const historicalData = this.vitalSigns.get(patientId) || [];

    try {
      // Risk assessment
      const riskScore = await this.aiModels.riskAssessment.assess(
        vitalData, 
        patient, 
        historicalData
      );

      // Predict potential issues
      const predictions = await this.aiModels.predictionModel.predict(
        vitalData, 
        historicalData
      );

      // Detect anomalies
      const anomalies = await this.aiModels.anomalyDetection.detect(
        vitalData, 
        historicalData
      );

      // Update patient risk profile
      this.updatePatientRisk(patientId, riskScore, predictions, anomalies);

      // Check for critical alerts
      this.checkCriticalAlerts(patientId, vitalData, riskScore, anomalies);

    } catch (error) {
      console.error('Analysis error:', error);
    }
  }

  updatePatientRisk(patientId, riskScore, predictions, anomalies) {
    const patient = this.patients.get(patientId);
    if (!patient) return;

    patient.riskScore = riskScore;
    patient.predictions = predictions;
    patient.anomalies = anomalies;
    patient.lastAnalysis = new Date();

    // Emit risk update event
    this.emit('riskUpdate', { patientId, riskScore, predictions, anomalies });
  }

  checkCriticalAlerts(patientId, vitalData, riskScore, anomalies) {
    const alerts = [];

    // Critical vital signs
    if (vitalData.heartRate > 120 || vitalData.heartRate < 50) {
      alerts.push({
        type: 'critical',
        category: 'vital_signs',
        message: 'Abnormal heart rate detected',
        value: vitalData.heartRate,
        threshold: '50-120 bpm'
      });
    }

    if (vitalData.bloodPressure.systolic > 180 || vitalData.bloodPressure.diastolic > 110) {
      alerts.push({
        type: 'critical',
        category: 'vital_signs',
        message: 'High blood pressure detected',
        value: \`\${vitalData.bloodPressure.systolic}/\${vitalData.bloodPressure.diastolic}\`,
        threshold: '< 180/110 mmHg'
      });
    }

    if (vitalData.temperature > 38.5) {
      alerts.push({
        type: 'warning',
        category: 'vital_signs',
        message: 'Elevated temperature detected',
        value: vitalData.temperature,
        threshold: '< 38.5°C'
      });
    }

    // High risk score
    if (riskScore > 0.7) {
      alerts.push({
        type: 'critical',
        category: 'risk_assessment',
        message: 'High risk patient detected',
        value: (riskScore * 100).toFixed(1) + '%',
        threshold: '< 70%'
      });
    }

    // Anomalies
    if (anomalies.length > 0) {
      alerts.push({
        type: 'warning',
        category: 'anomaly_detection',
        message: 'Unusual patterns detected',
        value: anomalies.length + ' anomalies',
        details: anomalies
      });
    }

    if (alerts.length > 0) {
      this.triggerAlerts(patientId, alerts);
    }
  }

  triggerAlerts(patientId, alerts) {
    alerts.forEach(alert => {
      const alertData = {
        id: Date.now() + Math.random(),
        patientId: patientId,
        ...alert,
        timestamp: new Date(),
        acknowledged: false
      };

      // Store alert
      if (!this.alerts.has(patientId)) {
        this.alerts.set(patientId, []);
      }
      this.alerts.get(patientId).push(alertData);

      // Send notification
      this.sendNotification(alertData);

      // Log alert
      this.logAlert(alertData);
    });
  }
}`,
    
    aiModels: `// AI Models for Healthcare Analytics
class RiskAssessmentModel {
  constructor() {
    this.features = [
      'heartRate', 'bloodPressure', 'temperature', 'oxygenSaturation',
      'respiratoryRate', 'age', 'gender', 'medicalHistory'
    ];
  }

  async assess(vitalData, patient, historicalData) {
    // Extract features
    const features = this.extractFeatures(vitalData, patient, historicalData);
    
    // Calculate risk score using ML model
    const riskScore = await this.calculateRiskScore(features);
    
    return riskScore;
  }

  extractFeatures(vitalData, patient, historicalData) {
    const features = {
      // Current vital signs
      heartRate: vitalData.heartRate,
      systolicBP: vitalData.bloodPressure.systolic,
      diastolicBP: vitalData.bloodPressure.diastolic,
      temperature: vitalData.temperature,
      oxygenSat: vitalData.oxygenSaturation,
      respiratoryRate: vitalData.respiratoryRate,
      
      // Patient demographics
      age: patient.age,
      gender: patient.gender === 'male' ? 1 : 0,
      
      // Historical trends
      heartRateTrend: this.calculateTrend(historicalData, 'heartRate'),
      bloodPressureTrend: this.calculateTrend(historicalData, 'bloodPressure'),
      temperatureTrend: this.calculateTrend(historicalData, 'temperature'),
      
      // Variability measures
      heartRateVariability: this.calculateVariability(historicalData, 'heartRate'),
      bloodPressureVariability: this.calculateVariability(historicalData, 'bloodPressure'),
      
      // Risk factors
      hasDiabetes: patient.riskFactors.includes('diabetes') ? 1 : 0,
      hasHypertension: patient.riskFactors.includes('hypertension') ? 1 : 0,
      hasHeartDisease: patient.riskFactors.includes('heart_disease') ? 1 : 0,
      hasObesity: patient.riskFactors.includes('obesity') ? 1 : 0
    };

    return features;
  }

  async calculateRiskScore(features) {
    // Simplified risk calculation (in practice, this would use a trained ML model)
    let riskScore = 0.1; // Base risk

    // Vital signs contribution
    if (features.heartRate > 100 || features.heartRate < 60) riskScore += 0.2;
    if (features.systolicBP > 140 || features.diastolicBP > 90) riskScore += 0.15;
    if (features.temperature > 37.5) riskScore += 0.1;
    if (features.oxygenSat < 95) riskScore += 0.2;

    // Age factor
    if (features.age > 65) riskScore += 0.1;
    if (features.age > 80) riskScore += 0.1;

    // Medical history
    if (features.hasDiabetes) riskScore += 0.15;
    if (features.hasHypertension) riskScore += 0.1;
    if (features.hasHeartDisease) riskScore += 0.2;
    if (features.hasObesity) riskScore += 0.1;

    // Trend factors
    if (features.heartRateTrend > 0.1) riskScore += 0.1;
    if (features.bloodPressureTrend > 0.1) riskScore += 0.1;

    return Math.min(1.0, Math.max(0.0, riskScore));
  }

  calculateTrend(data, parameter) {
    if (data.length < 2) return 0;
    
    const recent = data.slice(-5);
    const values = recent.map(d => d[parameter] || 0);
    
    if (values.length < 2) return 0;
    
    const x = Array.from({ length: values.length }, (_, i) => i);
    const slope = this.calculateLinearRegression(x, values);
    
    return slope;
  }

  calculateVariability(data, parameter) {
    if (data.length < 2) return 0;
    
    const values = data.map(d => d[parameter] || 0);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
    
    return Math.sqrt(variance);
  }

  calculateLinearRegression(x, y) {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
    const sumXX = x.reduce((a, b) => a + b * b, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    return slope;
  }
}

class PredictionModel {
  constructor() {
    this.predictions = {
      deterioration: 0,
      readmission: 0,
      lengthOfStay: 0,
      complications: []
    };
  }

  async predict(vitalData, historicalData) {
    const features = this.extractFeatures(vitalData, historicalData);
    
    const predictions = {
      deterioration: await this.predictDeterioration(features),
      readmission: await this.predictReadmission(features),
      lengthOfStay: await this.predictLengthOfStay(features),
      complications: await this.predictComplications(features)
    };

    return predictions;
  }

  extractFeatures(vitalData, historicalData) {
    return {
      currentVitals: vitalData,
      historicalTrends: this.calculateTrends(historicalData),
      variability: this.calculateVariability(historicalData),
      patterns: this.detectPatterns(historicalData)
    };
  }

  async predictDeterioration(features) {
    // Simplified prediction (would use trained ML model)
    let probability = 0.1;
    
    const vitals = features.currentVitals;
    if (vitals.heartRate > 100) probability += 0.2;
    if (vitals.bloodPressure.systolic > 140) probability += 0.15;
    if (vitals.temperature > 37.5) probability += 0.1;
    if (vitals.oxygenSaturation < 95) probability += 0.25;
    
    return Math.min(1.0, probability);
  }

  async predictReadmission(features) {
    // Simplified prediction
    let probability = 0.05;
    
    const trends = features.historicalTrends;
    if (trends.heartRateTrend > 0.1) probability += 0.2;
    if (trends.bloodPressureTrend > 0.1) probability += 0.15;
    
    return Math.min(1.0, probability);
  }

  async predictLengthOfStay(features) {
    // Simplified prediction (days)
    let days = 3; // Base length of stay
    
    const vitals = features.currentVitals;
    if (vitals.heartRate > 100) days += 1;
    if (vitals.bloodPressure.systolic > 140) days += 1;
    if (vitals.temperature > 37.5) days += 2;
    
    return Math.max(1, Math.min(14, days));
  }

  async predictComplications(features) {
    const complications = [];
    
    const vitals = features.currentVitals;
    if (vitals.heartRate > 120) complications.push('cardiac_issues');
    if (vitals.bloodPressure.systolic > 180) complications.push('hypertension');
    if (vitals.temperature > 38.5) complications.push('infection');
    if (vitals.oxygenSaturation < 90) complications.push('respiratory_distress');
    
    return complications;
  }
}

class AnomalyDetectionModel {
  constructor() {
    this.thresholds = {
      heartRate: { mean: 75, std: 15 },
      bloodPressure: { mean: 120, std: 20 },
      temperature: { mean: 37, std: 0.5 },
      oxygenSaturation: { mean: 98, std: 2 }
    };
  }

  async detect(vitalData, historicalData) {
    const anomalies = [];
    
    // Check each vital sign for anomalies
    for (const [parameter, threshold] of Object.entries(this.thresholds)) {
      const value = vitalData[parameter];
      if (value !== undefined) {
        const zScore = Math.abs((value - threshold.mean) / threshold.std);
        if (zScore > 2) { // More than 2 standard deviations
          anomalies.push({
            parameter: parameter,
            value: value,
            expected: threshold.mean,
            zScore: zScore,
            severity: zScore > 3 ? 'critical' : 'warning'
          });
        }
      }
    }

    // Check for trend anomalies
    const trendAnomalies = this.detectTrendAnomalies(historicalData);
    anomalies.push(...trendAnomalies);

    return anomalies;
  }

  detectTrendAnomalies(historicalData) {
    const anomalies = [];
    
    if (historicalData.length < 5) return anomalies;

    // Check for sudden changes
    const recent = historicalData.slice(-5);
    const heartRates = recent.map(d => d.heartRate).filter(v => v !== undefined);
    
    if (heartRates.length >= 3) {
      const mean = heartRates.reduce((a, b) => a + b, 0) / heartRates.length;
      const latest = heartRates[heartRates.length - 1];
      
      if (Math.abs(latest - mean) > mean * 0.3) { // 30% change
        anomalies.push({
          parameter: 'heartRate',
          type: 'trend_anomaly',
          message: 'Sudden change in heart rate pattern',
          severity: 'warning'
        });
      }
    }

    return anomalies;
  }
}`,
    
    dashboardComponent: `// React Healthcare Dashboard Component
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';

const HealthcareDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    // Initialize patient monitoring
    const monitoring = new PatientMonitoring();
    
    // Simulate patient data
    const mockPatients = [
      {
        id: 'P001',
        name: 'John Smith',
        age: 65,
        gender: 'male',
        riskFactors: ['hypertension', 'diabetes'],
        status: 'active',
        room: '301'
      },
      {
        id: 'P002',
        name: 'Sarah Johnson',
        age: 72,
        gender: 'female',
        riskFactors: ['heart_disease'],
        status: 'active',
        room: '302'
      }
    ];

    setPatients(mockPatients);

    // Set up event listeners
    monitoring.on('riskUpdate', (data) => {
      setAnalytics(prev => ({ ...prev, [data.patientId]: data }));
    });

    monitoring.on('alert', (alert) => {
      setAlerts(prev => [...prev, alert]);
    });

    // Simulate real-time updates
    const interval = setInterval(() => {
      mockPatients.forEach(patient => {
        const vitalSigns = generateMockVitalSigns(patient);
        monitoring.updateVitalSigns(patient.id, vitalSigns);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const generateMockVitalSigns = (patient) => {
    const baseHeartRate = 75 + (Math.random() - 0.5) * 20;
    const baseSystolic = 120 + (Math.random() - 0.5) * 30;
    const baseDiastolic = 80 + (Math.random() - 0.5) * 15;
    const baseTemperature = 37 + (Math.random() - 0.5) * 1;

    return {
      heartRate: Math.round(baseHeartRate),
      bloodPressure: {
        systolic: Math.round(baseSystolic),
        diastolic: Math.round(baseDiastolic)
      },
      temperature: parseFloat(baseTemperature.toFixed(1)),
      oxygenSaturation: 95 + Math.random() * 4,
      respiratoryRate: 12 + Math.random() * 6,
      timestamp: new Date()
    };
  };

  const PatientCard = ({ patient }) => {
    const patientAnalytics = analytics[patient.id];
    const patientAlerts = alerts.filter(alert => alert.patientId === patient.id);

    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
            <p className="text-gray-400 text-sm">Room {patient.room} • {patient.age} years</p>
            <p className="text-gray-400 text-sm">{patient.gender}</p>
          </div>
          <div className="text-right">
            {patientAnalytics && (
              <div className="text-2xl font-bold text-green-400">
                {(patientAnalytics.riskScore * 100).toFixed(0)}%
              </div>
            )}
            <div className="text-xs text-gray-400">Risk Score</div>
          </div>
        </div>
        
        {patientAnalytics && (
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-400">Deterioration Risk</p>
              <p className="text-white font-semibold">
                {(patientAnalytics.predictions?.deterioration * 100).toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-gray-400">Readmission Risk</p>
              <p className="text-white font-semibold">
                {(patientAnalytics.predictions?.readmission * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        )}
        
        {patientAlerts.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-red-400">Active Alerts</span>
              <span className="text-xs text-gray-400">{patientAlerts.length}</span>
            </div>
            <div className="space-y-1">
              {patientAlerts.slice(0, 2).map((alert, index) => (
                <div key={index} className="text-xs text-red-300">
                  • {alert.message}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const VitalSignsChart = ({ patientId }) => {
    const [vitalData, setVitalData] = useState([]);

    useEffect(() => {
      // Simulate vital signs data
      const generateData = () => {
        const data = [];
        for (let i = 0; i < 24; i++) {
          data.push({
            time: i,
            heartRate: 75 + Math.sin(i * 0.5) * 10 + Math.random() * 5,
            bloodPressure: 120 + Math.sin(i * 0.3) * 15 + Math.random() * 10,
            temperature: 37 + Math.sin(i * 0.2) * 0.5 + Math.random() * 0.3,
            oxygenSaturation: 98 + Math.sin(i * 0.4) * 1 + Math.random() * 0.5
          });
        }
        return data;
      };

      setVitalData(generateData());
    }, [patientId]);

    return (
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
        <h4 className="text-lg font-semibold text-white mb-4">Vital Signs Trend</h4>
        <LineChart width={600} height={300} data={vitalData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
          <Legend />
          <Line type="monotone" dataKey="heartRate" stroke="#EF4444" strokeWidth={2} />
          <Line type="monotone" dataKey="bloodPressure" stroke="#3B82F6" strokeWidth={2} />
          <Line type="monotone" dataKey="temperature" stroke="#10B981" strokeWidth={2} />
          <Line type="monotone" dataKey="oxygenSaturation" stroke="#F59E0B" strokeWidth={2} />
        </LineChart>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-8">
          Healthcare Analytics Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {patients.map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
        
        {selectedPatient && (
          <div className="mb-8">
            <VitalSignsChart patientId={selectedPatient.id} />
          </div>
        )}
        
        {alerts.length > 0 && (
          <div className="bg-red-900 p-6 rounded-lg border border-red-600">
            <h2 className="text-xl font-bold text-white mb-4">Active Alerts</h2>
            <div className="space-y-2">
              {alerts.map((alert, index) => (
                <div key={index} className="bg-red-800 p-3 rounded border border-red-600">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold">{alert.message}</p>
                      <p className="text-red-200 text-sm">Patient: {alert.patientId}</p>
                    </div>
                    <div className="text-red-300 text-sm">{alert.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthcareDashboard;`
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage('projects')}
            className="text-green-400 hover:text-green-300 mb-4 flex items-center"
          >
            ← Back to Projects
          </button>
          <h1 className="text-4xl font-bold text-green-400 mb-4">🏥 Healthcare Analytics Platform</h1>
          <p className="text-gray-300 text-lg">
            AI-powered patient monitoring and medical analytics with predictive diagnostics and automated alerts
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Project Overview</h2>
                <p className="text-gray-300 leading-relaxed">
                  The Healthcare Analytics Platform is a comprehensive AI-powered system designed for modern healthcare facilities. 
                  It combines real-time patient monitoring, predictive analytics, and automated alert systems to improve patient 
                  outcomes and optimize healthcare delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Key Objectives</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Real-time patient monitoring</li>
                    <li>• Predictive risk assessment</li>
                    <li>• Automated alert systems</li>
                    <li>• Clinical decision support</li>
                    <li>• HIPAA-compliant data handling</li>
                    <li>• Integration with existing systems</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Technical Stack</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• React.js for frontend dashboard</li>
                    <li>• Node.js for backend API</li>
                    <li>• Machine learning models</li>
                    <li>• Real-time data processing</li>
                    <li>• HIPAA-compliant security</li>
                    <li>• Integration APIs</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Healthcare Applications</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-semibold text-white mb-2">Hospitals</h4>
                    <p className="text-gray-300 text-sm">Inpatient monitoring and critical care management</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-semibold text-white mb-2">Clinics</h4>
                    <p className="text-gray-300 text-sm">Outpatient care and preventive medicine</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-semibold text-white mb-2">Research</h4>
                    <p className="text-gray-300 text-sm">Clinical trials and medical research</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Core Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">📊 Patient Monitoring</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Real-time vital signs tracking</li>
                    <li>• Continuous monitoring systems</li>
                    <li>• Historical data analysis</li>
                    <li>• Trend detection and alerts</li>
                    <li>• Multi-parameter monitoring</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">🤖 AI Analytics</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Risk assessment models</li>
                    <li>• Predictive diagnostics</li>
                    <li>• Anomaly detection</li>
                    <li>• Clinical decision support</li>
                    <li>• Outcome prediction</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">🚨 Alert System</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Critical condition alerts</li>
                    <li>• Multi-channel notifications</li>
                    <li>• Escalation protocols</li>
                    <li>• Customizable thresholds</li>
                    <li>• Alert history tracking</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">📈 Analytics Dashboard</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Real-time data visualization</li>
                    <li>• Patient risk profiles</li>
                    <li>• Performance metrics</li>
                    <li>• Clinical insights</li>
                    <li>• Reporting tools</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-red-400 mb-3">🔒 Security & Compliance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">HIPAA Compliance</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Data encryption</li>
                      <li>• Access controls</li>
                      <li>• Audit trails</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Security</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• End-to-end encryption</li>
                      <li>• Multi-factor authentication</li>
                      <li>• Secure API endpoints</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Integration</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• EHR system integration</li>
                      <li>• HL7 FHIR standards</li>
                      <li>• API connectivity</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Code Implementation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Patient Monitoring System</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.patientMonitoring}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">AI Models</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.aiModels}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">Dashboard Component</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.dashboardComponent}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">System Architecture</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Frontend Layer</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <ul className="space-y-2 text-gray-300">
                      <li>• React.js dashboard components</li>
                      <li>• Real-time data visualization</li>
                      <li>• Interactive charts and graphs</li>
                      <li>• Mobile-responsive design</li>
                      <li>• WebSocket connections</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Backend Layer</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <ul className="space-y-2 text-gray-300">
                      <li>• Node.js API server</li>
                      <li>• Real-time data processing</li>
                      <li>• Machine learning models</li>
                      <li>• Alert management system</li>
                      <li>• Data persistence layer</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Healthcare Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Patient Monitoring</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Vital signs tracking</li>
                      <li>• Continuous monitoring</li>
                      <li>• Alert systems</li>
                      <li>• Data validation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">AI Analytics</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Risk assessment models</li>
                      <li>• Predictive analytics</li>
                      <li>• Anomaly detection</li>
                      <li>• Clinical insights</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Integration</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• EHR system integration</li>
                      <li>• HL7 FHIR standards</li>
                      <li>• API connectivity</li>
                      <li>• Data synchronization</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Data Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">1</div>
                    <div>
                      <p className="text-white font-semibold">Patient Data Collection</p>
                      <p className="text-gray-300 text-sm">Vital signs and patient information are collected</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">2</div>
                    <div>
                      <p className="text-white font-semibold">Data Processing</p>
                      <p className="text-gray-300 text-sm">Raw data is validated and processed for analysis</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">3</div>
                    <div>
                      <p className="text-white font-semibold">AI Analysis</p>
                      <p className="text-gray-300 text-sm">ML models analyze data and generate predictions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">4</div>
                    <div>
                      <p className="text-white font-semibold">Clinical Dashboard</p>
                      <p className="text-gray-300 text-sm">Results are displayed on the healthcare dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Live Demo</h2>
              <p className="text-gray-300 mb-6">
                Experience the healthcare analytics platform in action. The demo showcases real-time patient monitoring, 
                predictive analytics, and automated alert systems for improved patient care.
              </p>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Interactive Healthcare Demo</h3>
                  <button
                    onClick={() => setCurrentPage('healthcare')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Launch Demo
                  </button>
                </div>
                <p className="text-gray-300 text-sm">
                  Click "Launch Demo" to experience the full healthcare analytics platform with real-time patient monitoring, 
                  predictive diagnostics, and comprehensive medical analytics.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-blue-400 mb-2">Patient Monitoring</h4>
                  <p className="text-gray-300 text-sm">Watch real-time vital signs and patient data updates</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-purple-400 mb-2">Predictive Analytics</h4>
                  <p className="text-gray-300 text-sm">See AI-powered risk assessments and predictions</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-green-400 mb-2">Alert System</h4>
                  <p className="text-gray-300 text-sm">Experience automated alerts for critical conditions</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthcareProjectPage; 