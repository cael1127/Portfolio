import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

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
    satisfactionRate: 0,
    riskAssessment: [],
    treatmentEfficacy: {},
    diagnosticAccuracy: 0,
    mortalityRate: 0,
    readmissionRate: 0,
    averageLengthOfStay: 0
  });
  const [medicalAlgorithms, setMedicalAlgorithms] = useState({
    diagnosisResults: [],
    riskPredictions: [],
    treatmentRecommendations: [],
    drugInteractions: [],
    predictiveModels: {
      sepsis: { accuracy: 94.2, sensitivity: 91.8, specificity: 95.6 },
      heartFailure: { accuracy: 89.7, sensitivity: 87.3, specificity: 91.2 },
      diabetes: { accuracy: 92.1, sensitivity: 90.5, specificity: 93.8 }
    }
  });

  // Advanced Medical Algorithms Implementation
  const medicalAlgorithmsImplementation = {
    // Sepsis Prediction using Modified Early Warning Score (MEWS)
    predictSepsis: (vitals) => {
      let mewsScore = 0;
      
      // Respiratory rate scoring (deterministic thresholds)
      if (vitals.respiratoryRate <= 8) mewsScore += 3;
      else if (vitals.respiratoryRate <= 14) mewsScore += 0;
      else if (vitals.respiratoryRate <= 20) mewsScore += 1;
      else if (vitals.respiratoryRate <= 29) mewsScore += 2;
      else mewsScore += 3;
      
      // Heart rate scoring
      if (vitals.heartRate <= 40) mewsScore += 2;
      else if (vitals.heartRate <= 50) mewsScore += 1;
      else if (vitals.heartRate <= 100) mewsScore += 0;
      else if (vitals.heartRate <= 110) mewsScore += 1;
      else if (vitals.heartRate <= 129) mewsScore += 2;
      else mewsScore += 3;
      
      // Blood pressure scoring
      if (vitals.systolic <= 70) mewsScore += 3;
      else if (vitals.systolic <= 80) mewsScore += 2;
      else if (vitals.systolic <= 100) mewsScore += 1;
      else if (vitals.systolic <= 199) mewsScore += 0;
      else mewsScore += 2;
      
      // Temperature scoring
      if (vitals.temperature <= 35.0) mewsScore += 3;
      else if (vitals.temperature <= 36.0) mewsScore += 1;
      else if (vitals.temperature <= 38.0) mewsScore += 0;
      else if (vitals.temperature <= 38.5) mewsScore += 1;
      else mewsScore += 2;
      
      // Oxygen saturation scoring
      if (vitals.oxygenSaturation <= 91) mewsScore += 3;
      else if (vitals.oxygenSaturation <= 93) mewsScore += 2;
      else if (vitals.oxygenSaturation <= 95) mewsScore += 1;
      else mewsScore += 0;
      
      // Consciousness level
      if (vitals.consciousness === 'Alert') mewsScore += 0;
      else if (vitals.consciousness === 'CVPU') mewsScore += 1;
      else if (vitals.consciousness === 'Pain') mewsScore += 2;
      else if (vitals.consciousness === 'Unresponsive') mewsScore += 3;
      
      return {
        score: mewsScore,
        risk: mewsScore >= 7 ? 'Critical' : mewsScore >= 5 ? 'High' : mewsScore >= 3 ? 'Medium' : 'Low',
        probability: Math.min(mewsScore * 0.12, 0.95),
        recommendations: mewsScore >= 5 ? ['Immediate medical attention required', 'Consider ICU transfer'] : 
                        mewsScore >= 3 ? ['Close monitoring needed', 'Reassess in 1 hour'] : 
                        ['Continue routine monitoring']
      };
    },

    // Heart Failure Risk Assessment using Framingham Criteria
    assessHeartFailureRisk: (patient) => {
      let riskScore = 0;
      
      // Age factor (deterministic scoring)
      if (patient.age >= 75) riskScore += 4;
      else if (patient.age >= 65) riskScore += 3;
      else if (patient.age >= 55) riskScore += 2;
      else if (patient.age >= 45) riskScore += 1;
      
      // Gender factor
      if (patient.gender === 'Male') riskScore += 1;
      
      // BMI factor
      if (patient.bmi >= 30) riskScore += 2;
      else if (patient.bmi >= 25) riskScore += 1;
      
      // Blood pressure factor
      if (patient.systolic >= 160 || patient.diastolic >= 100) riskScore += 2;
      else if (patient.systolic >= 140 || patient.diastolic >= 90) riskScore += 1;
      
      // Cholesterol factor
      if (patient.totalCholesterol >= 240) riskScore += 2;
      else if (patient.totalCholesterol >= 200) riskScore += 1;
      
      // Diabetes factor
      if (patient.diabetes) riskScore += 2;
      
      // Smoking factor
      if (patient.smoking) riskScore += 1;
      
      // Family history factor
      if (patient.familyHistory) riskScore += 1;
      
      const riskLevel = riskScore >= 8 ? 'High' : riskScore >= 5 ? 'Medium' : 'Low';
      const probability = Math.min(riskScore * 0.08, 0.85);
      
      return {
        score: riskScore,
        risk: riskLevel,
        probability: probability,
        recommendations: riskLevel === 'High' ? ['Cardiology consultation', 'Echocardiogram', 'BNP testing'] :
                        riskLevel === 'Medium' ? ['Regular monitoring', 'Lifestyle modifications', 'Consider stress test'] :
                        ['Routine follow-up', 'Maintain healthy lifestyle']
      };
    },

    // Diabetes Risk Assessment using ADA Criteria
    assessDiabetesRisk: (patient) => {
      let riskScore = 0;
      
      // Age factor
      if (patient.age >= 65) riskScore += 3;
      else if (patient.age >= 45) riskScore += 2;
      else if (patient.age >= 35) riskScore += 1;
      
      // BMI factor
      if (patient.bmi >= 30) riskScore += 3;
      else if (patient.bmi >= 25) riskScore += 2;
      
      // Family history
      if (patient.familyHistory) riskScore += 2;
      
      // Physical activity
      if (patient.physicalActivity === 'Sedentary') riskScore += 2;
      else if (patient.physicalActivity === 'Low') riskScore += 1;
      
      // Blood pressure
      if (patient.systolic >= 140 || patient.diastolic >= 90) riskScore += 2;
      
      // Previous gestational diabetes
      if (patient.gestationalDiabetes) riskScore += 2;
      
      const riskLevel = riskScore >= 8 ? 'High' : riskScore >= 5 ? 'Medium' : 'Low';
      const probability = Math.min(riskScore * 0.09, 0.80);
      
      return {
        score: riskScore,
        risk: riskLevel,
        probability: probability,
        recommendations: riskLevel === 'High' ? ['Fasting glucose test', 'HbA1c test', 'Lifestyle counseling'] :
                        riskLevel === 'Medium' ? ['Annual glucose screening', 'Weight management', 'Exercise program'] :
                        ['Biennial screening', 'Maintain healthy lifestyle']
      };
    },

    // Drug Interaction Checker
    checkDrugInteractions: (medications) => {
      const interactions = [];
      
      // Known drug interaction database (simplified)
      const interactionDatabase = {
        'Warfarin': ['Aspirin', 'Ibuprofen', 'Naproxen'],
        'Digoxin': ['Furosemide', 'Spironolactone'],
        'Lithium': ['Ibuprofen', 'Thiazide diuretics'],
        'ACE Inhibitors': ['Potassium supplements', 'Lithium'],
        'Beta Blockers': ['Calcium channel blockers', 'Digoxin']
      };
      
      medications.forEach(med1 => {
        medications.forEach(med2 => {
          if (med1 !== med2) {
            const interactions1 = interactionDatabase[med1] || [];
            const interactions2 = interactionDatabase[med2] || [];
            
            if (interactions1.includes(med2) || interactions2.includes(med1)) {
              interactions.push({
                drug1: med1,
                drug2: med2,
                severity: 'Moderate',
                description: 'Potential interaction detected',
                recommendation: 'Monitor closely or consider alternative'
              });
            }
          }
        });
      });
      
      return interactions;
    },

    // Treatment Efficacy Calculator
    calculateTreatmentEfficacy: (patient, treatment, baselineMetrics) => {
      const currentMetrics = patient.currentMetrics || {};
      let efficacy = 0;
      let improvements = [];
      
      // Calculate improvement percentages
      if (baselineMetrics.bloodPressure && currentMetrics.bloodPressure) {
        const bpImprovement = ((baselineMetrics.bloodPressure - currentMetrics.bloodPressure) / baselineMetrics.bloodPressure) * 100;
        if (bpImprovement > 0) {
          efficacy += bpImprovement * 0.3;
          improvements.push(`Blood pressure improved by ${bpImprovement.toFixed(1)}%`);
        }
      }
      
      if (baselineMetrics.bloodSugar && currentMetrics.bloodSugar) {
        const bsImprovement = ((baselineMetrics.bloodSugar - currentMetrics.bloodSugar) / baselineMetrics.bloodSugar) * 100;
        if (bsImprovement > 0) {
          efficacy += bsImprovement * 0.3;
          improvements.push(`Blood sugar improved by ${bsImprovement.toFixed(1)}%`);
        }
      }
      
      if (baselineMetrics.weight && currentMetrics.weight) {
        const weightImprovement = ((baselineMetrics.weight - currentMetrics.weight) / baselineMetrics.weight) * 100;
        if (weightImprovement > 0) {
          efficacy += weightImprovement * 0.2;
          improvements.push(`Weight reduced by ${weightImprovement.toFixed(1)}%`);
        }
      }
      
      if (baselineMetrics.cholesterol && currentMetrics.cholesterol) {
        const cholImprovement = ((baselineMetrics.cholesterol - currentMetrics.cholesterol) / baselineMetrics.cholesterol) * 100;
        if (cholImprovement > 0) {
          efficacy += cholImprovement * 0.2;
          improvements.push(`Cholesterol improved by ${cholImprovement.toFixed(1)}%`);
        }
      }
      
      return {
        efficacy: Math.min(efficacy, 100),
        improvements: improvements,
        status: efficacy >= 70 ? 'Excellent' : efficacy >= 50 ? 'Good' : efficacy >= 30 ? 'Moderate' : 'Poor',
        recommendations: efficacy >= 70 ? ['Continue current treatment', 'Maintain lifestyle'] :
                        efficacy >= 50 ? ['Continue treatment', 'Consider dosage adjustment'] :
                        efficacy >= 30 ? ['Review treatment plan', 'Consider alternatives'] :
                        ['Reassess treatment', 'Consider different approach']
      };
    },

    // Predictive Analytics for Patient Outcomes
    predictPatientOutcome: (patient, historicalData) => {
      let outcomeScore = 0;
      const factors = [];
      
      // Age factor
      if (patient.age < 40) outcomeScore += 20;
      else if (patient.age < 60) outcomeScore += 15;
      else if (patient.age < 80) outcomeScore += 10;
      else outcomeScore += 5;
      
      // Comorbidity factor
      const comorbidityCount = patient.comorbidities?.length || 0;
      outcomeScore -= comorbidityCount * 5;
      if (comorbidityCount > 0) factors.push(`${comorbidityCount} comorbidities`);
      
      // Treatment adherence
      if (patient.adherence >= 90) outcomeScore += 15;
      else if (patient.adherence >= 75) outcomeScore += 10;
      else if (patient.adherence >= 60) outcomeScore += 5;
      else outcomeScore -= 5;
      
      if (patient.adherence < 90) factors.push('Treatment adherence concerns');
      
      // Lifestyle factors
      if (patient.smoking) {
        outcomeScore -= 10;
        factors.push('Smoking');
      }
      if (patient.physicalActivity === 'High') {
        outcomeScore += 10;
        factors.push('High physical activity');
      } else if (patient.physicalActivity === 'Sedentary') {
        outcomeScore -= 10;
        factors.push('Sedentary lifestyle');
      }
      
      // Social support
      if (patient.socialSupport === 'Strong') outcomeScore += 10;
      else if (patient.socialSupport === 'Weak') outcomeScore -= 5;
      
      const outcome = outcomeScore >= 60 ? 'Excellent' : outcomeScore >= 40 ? 'Good' : outcomeScore >= 20 ? 'Fair' : 'Poor';
      const probability = Math.max(0, Math.min(100, outcomeScore + 50));
      
      return {
        score: outcomeScore,
        outcome: outcome,
        probability: probability,
        factors: factors,
        recommendations: outcome === 'Excellent' ? ['Maintain current regimen', 'Continue monitoring'] :
                        outcome === 'Good' ? ['Minor adjustments may help', 'Focus on weak areas'] :
                        outcome === 'Fair' ? ['Significant changes needed', 'Consider intervention'] :
                        ['Immediate intervention required', 'Comprehensive care plan needed']
      };
    }
  };

  // Generate deterministic sample data
  const generateSampleData = () => {
    const samplePatients = [
      {
        id: 1,
        name: 'John Smith',
        age: 65,
        gender: 'Male',
        bmi: 28.5,
        systolic: 145,
        diastolic: 90,
        totalCholesterol: 220,
        diabetes: true,
        smoking: false,
        familyHistory: true,
        physicalActivity: 'Low',
        socialSupport: 'Strong',
        adherence: 85,
        comorbidities: ['Hypertension', 'Type 2 Diabetes'],
        vitals: {
          respiratoryRate: 18,
          heartRate: 72,
          systolic: 145,
          diastolic: 90,
          temperature: 36.8,
          oxygenSaturation: 98,
          consciousness: 'Alert'
        },
        currentMetrics: {
          bloodPressure: 145,
          bloodSugar: 180,
          weight: 85,
          cholesterol: 220
        },
        baselineMetrics: {
          bloodPressure: 160,
          bloodSugar: 220,
          weight: 90,
          cholesterol: 250
        }
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        age: 45,
        gender: 'Female',
        bmi: 32.1,
        systolic: 130,
        diastolic: 85,
        totalCholesterol: 190,
        diabetes: false,
        smoking: true,
        familyHistory: false,
        physicalActivity: 'Sedentary',
        socialSupport: 'Weak',
        adherence: 70,
        comorbidities: ['Obesity'],
        vitals: {
          respiratoryRate: 16,
          heartRate: 68,
          systolic: 130,
          diastolic: 85,
          temperature: 37.1,
          oxygenSaturation: 97,
          consciousness: 'Alert'
        },
        currentMetrics: {
          bloodPressure: 130,
          bloodSugar: 95,
          weight: 85,
          cholesterol: 190
        },
        baselineMetrics: {
          bloodPressure: 130,
          bloodSugar: 95,
          weight: 85,
          cholesterol: 190
        }
      }
    ];
    
    setPatients(samplePatients);
    
    // Generate appointments
    const sampleAppointments = [
      { id: 1, patientId: 1, type: 'Follow-up', date: '2024-01-15', time: '10:00 AM', status: 'Scheduled' },
      { id: 2, patientId: 2, type: 'Consultation', date: '2024-01-16', time: '2:00 PM', status: 'Scheduled' }
    ];
    setAppointments(sampleAppointments);
    
    return { patients: samplePatients, appointments: sampleAppointments };
  };

  // Run medical algorithms
  const runMedicalAlgorithms = (patientList) => {
    const diagnosisResults = [];
    const riskPredictions = [];
    const treatmentRecommendations = [];
    
    patientList.forEach(patient => {
      // Sepsis prediction
      const sepsisPrediction = medicalAlgorithmsImplementation.predictSepsis(patient.vitals);
      diagnosisResults.push({
        patientId: patient.id,
        patientName: patient.name,
        condition: 'Sepsis Risk',
        prediction: sepsisPrediction,
        timestamp: new Date().toISOString()
      });
      
      // Heart failure risk
      const heartFailureRisk = medicalAlgorithmsImplementation.assessHeartFailureRisk(patient);
      riskPredictions.push({
        patientId: patient.id,
        patientName: patient.name,
        condition: 'Heart Failure',
        risk: heartFailureRisk,
        timestamp: new Date().toISOString()
      });
      
      // Diabetes risk
      const diabetesRisk = medicalAlgorithmsImplementation.assessDiabetesRisk(patient);
      riskPredictions.push({
        patientId: patient.id,
        patientName: patient.name,
        condition: 'Diabetes',
        risk: diabetesRisk,
        timestamp: new Date().toISOString()
      });
      
      // Treatment efficacy
      const treatmentEfficacy = medicalAlgorithmsImplementation.calculateTreatmentEfficacy(
        patient, 
        'Current Treatment', 
        patient.baselineMetrics
      );
      treatmentRecommendations.push({
        patientId: patient.id,
        patientName: patient.name,
        treatment: 'Current Treatment',
        efficacy: treatmentEfficacy,
        timestamp: new Date().toISOString()
      });
      
      // Patient outcome prediction
      const outcomePrediction = medicalAlgorithmsImplementation.predictPatientOutcome(patient, []);
      treatmentRecommendations.push({
        patientId: patient.id,
        patientName: patient.name,
        treatment: 'Outcome Prediction',
        efficacy: { efficacy: outcomePrediction.probability, status: outcomePrediction.outcome },
        timestamp: new Date().toISOString()
      });
    });
    
    setMedicalAlgorithms(prev => ({
      ...prev,
      diagnosisResults: diagnosisResults.slice(-5),
      riskPredictions: riskPredictions.slice(-5),
      treatmentRecommendations: treatmentRecommendations.slice(-5)
    }));
    
    return { diagnosisResults, riskPredictions, treatmentRecommendations };
  };

  // Update analytics
  const updateAnalytics = (patientList, appointmentList) => {
    const totalPatients = patientList.length;
    const activeCases = patientList.filter(p => p.comorbidities && p.comorbidities.length > 0).length;
    const averageWaitTime = appointmentList.length > 0 ? 15 : 0; // Simplified
    const satisfactionRate = 85; // Simplified
    
    // Calculate risk distribution
    const riskAssessment = [];
    patientList.forEach(patient => {
      const heartFailureRisk = medicalAlgorithmsImplementation.assessHeartFailureRisk(patient);
      const diabetesRisk = medicalAlgorithmsImplementation.assessDiabetesRisk(patient);
      riskAssessment.push({
        patientId: patient.id,
        heartFailure: heartFailureRisk.risk,
        diabetes: diabetesRisk.risk
      });
    });
    
    // Calculate treatment efficacy
    const treatmentEfficacy = {};
    patientList.forEach(patient => {
      const efficacy = medicalAlgorithmsImplementation.calculateTreatmentEfficacy(
        patient, 
        'Current Treatment', 
        patient.baselineMetrics
      );
      treatmentEfficacy[patient.id] = efficacy;
    });
    
    setAnalytics({
      totalPatients,
      activeCases,
      averageWaitTime,
      satisfactionRate,
      riskAssessment,
      treatmentEfficacy,
      diagnosticAccuracy: 92.5,
      mortalityRate: 2.1,
      readmissionRate: 8.5,
      averageLengthOfStay: 4.2
    });
  };

  // Initialize demo
  useEffect(() => {
    const { patients: samplePatients, appointments: sampleAppointments } = generateSampleData();
    const results = runMedicalAlgorithms(samplePatients);
    updateAnalytics(samplePatients, sampleAppointments);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🏥 Healthcare Analytics System</h1>
          <p className="text-gray-300 text-lg">
            Advanced medical algorithms for diagnosis, risk assessment, and treatment efficacy analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Analytics Dashboard */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Healthcare Analytics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{analytics.totalPatients}</div>
                  <div className="text-sm text-gray-400">Total Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{analytics.activeCases}</div>
                  <div className="text-sm text-gray-400">Active Cases</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{analytics.diagnosticAccuracy}%</div>
                  <div className="text-sm text-gray-400">Diagnostic Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{analytics.satisfactionRate}%</div>
                  <div className="text-sm text-gray-400">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            {/* Patient List */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Patient Overview</h2>
              <div className="space-y-4">
                {patients.map(patient => (
                  <div key={patient.id} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-white">{patient.name}</div>
                        <div className="text-sm text-gray-300">
                          Age: {patient.age} | BMI: {patient.bmi} | BP: {patient.systolic}/{patient.diastolic}
                        </div>
                        <div className="text-xs text-gray-400">
                          Comorbidities: {patient.comorbidities?.join(', ') || 'None'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-300">Adherence: {patient.adherence}%</div>
                        <div className="text-xs text-gray-400">{patient.gender}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Algorithms Results */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Algorithm Results</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Diagnosis Results */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Diagnosis Results</h3>
                  <div className="space-y-2">
                    {medicalAlgorithms.diagnosisResults.slice(-3).map((result, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded text-sm">
                        <div className="font-medium">{result.patientName}</div>
                        <div className="text-gray-300">{result.condition}: {result.prediction.risk}</div>
                        <div className="text-gray-400 text-xs">Score: {result.prediction.score}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Predictions */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-red-400">Risk Predictions</h3>
                  <div className="space-y-2">
                    {medicalAlgorithms.riskPredictions.slice(-3).map((prediction, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded text-sm">
                        <div className="font-medium">{prediction.patientName}</div>
                        <div className="text-gray-300">{prediction.condition}: {prediction.risk.risk}</div>
                        <div className="text-gray-400 text-xs">Score: {prediction.risk.score}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* ML Model Performance */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">ML Model Performance</h3>
              <div className="space-y-3">
                {Object.entries(medicalAlgorithms.predictiveModels).map(([model, metrics]) => (
                  <div key={model} className="bg-gray-700 p-3 rounded-lg">
                    <h4 className="font-semibold mb-2 capitalize">{model.replace(/([A-Z])/g, ' $1')}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <span className="text-green-400">{metrics.accuracy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sensitivity:</span>
                        <span className="text-blue-400">{metrics.sensitivity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Specificity:</span>
                        <span className="text-yellow-400">{metrics.specificity}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment Recommendations */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Treatment Recommendations</h3>
              <div className="space-y-2">
                {medicalAlgorithms.treatmentRecommendations.slice(-3).map((rec, index) => (
                  <div key={index} className="bg-gray-700 p-3 rounded text-sm">
                    <div className="font-medium">{rec.patientName}</div>
                    <div className="text-gray-300">{rec.treatment}</div>
                    <div className="text-gray-400 text-xs">
                      Efficacy: {typeof rec.efficacy === 'object' ? rec.efficacy.efficacy : rec.efficacy}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Viewer */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Implementation</h3>
              <button
                onClick={() => setShowCodeViewer(true)}
                className="w-full bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition-colors"
              >
                📖 View Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCodeViewer && (
        <CodeViewer
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
          title="Healthcare Algorithms Implementation"
          code={`
// Advanced Medical Algorithms Implementation
class MedicalAlgorithms {
  // Sepsis Prediction using MEWS
  predictSepsis(vitals) {
    let mewsScore = 0;
    
    // Respiratory rate scoring
    if (vitals.respiratoryRate <= 8) mewsScore += 3;
    else if (vitals.respiratoryRate <= 14) mewsScore += 0;
    else if (vitals.respiratoryRate <= 20) mewsScore += 1;
    else if (vitals.respiratoryRate <= 29) mewsScore += 2;
    else mewsScore += 3;
    
    // Heart rate scoring
    if (vitals.heartRate <= 40) mewsScore += 2;
    else if (vitals.heartRate <= 50) mewsScore += 1;
    else if (vitals.heartRate <= 100) mewsScore += 0;
    else if (vitals.heartRate <= 110) mewsScore += 1;
    else if (vitals.heartRate <= 129) mewsScore += 2;
    else mewsScore += 3;
    
    // Blood pressure scoring
    if (vitals.systolic <= 70) mewsScore += 3;
    else if (vitals.systolic <= 80) mewsScore += 2;
    else if (vitals.systolic <= 100) mewsScore += 1;
    else if (vitals.systolic <= 199) mewsScore += 0;
    else mewsScore += 2;
    
    const risk = mewsScore >= 7 ? 'Critical' : mewsScore >= 5 ? 'High' : mewsScore >= 3 ? 'Medium' : 'Low';
    const probability = Math.min(mewsScore * 0.12, 0.95);
    
    return { score: mewsScore, risk, probability };
  }

  // Heart Failure Risk Assessment
  assessHeartFailureRisk(patient) {
    let riskScore = 0;
    
    // Age factor
    if (patient.age >= 75) riskScore += 4;
    else if (patient.age >= 65) riskScore += 3;
    else if (patient.age >= 55) riskScore += 2;
    else if (patient.age >= 45) riskScore += 1;
    
    // BMI factor
    if (patient.bmi >= 30) riskScore += 2;
    else if (patient.bmi >= 25) riskScore += 1;
    
    // Blood pressure factor
    if (patient.systolic >= 160 || patient.diastolic >= 100) riskScore += 2;
    else if (patient.systolic >= 140 || patient.diastolic >= 90) riskScore += 1;
    
    // Diabetes factor
    if (patient.diabetes) riskScore += 2;
    
    const riskLevel = riskScore >= 8 ? 'High' : riskScore >= 5 ? 'Medium' : 'Low';
    const probability = Math.min(riskScore * 0.08, 0.85);
    
    return { score: riskScore, risk: riskLevel, probability };
  }

  // Treatment Efficacy Calculator
  calculateTreatmentEfficacy(patient, treatment, baselineMetrics) {
    const currentMetrics = patient.currentMetrics || {};
    let efficacy = 0;
    
    // Calculate improvement percentages
    if (baselineMetrics.bloodPressure && currentMetrics.bloodPressure) {
      const bpImprovement = ((baselineMetrics.bloodPressure - currentMetrics.bloodPressure) / baselineMetrics.bloodPressure) * 100;
      if (bpImprovement > 0) efficacy += bpImprovement * 0.3;
    }
    
    if (baselineMetrics.bloodSugar && currentMetrics.bloodSugar) {
      const bsImprovement = ((baselineMetrics.bloodSugar - currentMetrics.bloodSugar) / baselineMetrics.bloodSugar) * 100;
      if (bsImprovement > 0) efficacy += bsImprovement * 0.3;
    }
    
    return {
      efficacy: Math.min(efficacy, 100),
      status: efficacy >= 70 ? 'Excellent' : efficacy >= 50 ? 'Good' : efficacy >= 30 ? 'Moderate' : 'Poor'
    };
  }
}
          `}
        />
      )}
    </div>
  );
};

export default HealthcareDemo; 