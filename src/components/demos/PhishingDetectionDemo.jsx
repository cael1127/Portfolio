import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const PhishingDetectionDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeEmail = async () => {
    if (!email && !url) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const suspiciousWords = ['urgent', 'verify', 'account', 'suspended', 'click here', 'limited time'];
      const foundSuspicious = suspiciousWords.filter(word => 
        email.toLowerCase().includes(word.toLowerCase())
      );

      const domain = url ? new URL(url).hostname : '';
      const isSuspiciousDomain = domain.includes('bit.ly') || domain.includes('tinyurl') || 
                                 domain.length > 20 || domain.split('.').length > 3;

      const score = (foundSuspicious.length * 15) + (isSuspiciousDomain ? 40 : 0) + 
                   (email.includes('@') && !email.includes('@gmail.com') && !email.includes('@yahoo.com') ? 20 : 0);

      setAnalysis({
        email,
        url,
        score: Math.min(score, 100),
        risk: score >= 70 ? 'High' : score >= 40 ? 'Medium' : 'Low',
        indicators: [
          ...foundSuspicious.map(word => ({ type: 'suspicious_word', value: word, severity: 'medium' })),
          ...(isSuspiciousDomain ? [{ type: 'suspicious_domain', value: domain, severity: 'high' }] : []),
          { type: 'domain_reputation', value: 'Checking...', severity: 'info' }
        ],
        recommendation: score >= 70 ? 'Block - High risk phishing attempt' : 
                       score >= 40 ? 'Review - Suspicious content detected' : 
                       'Allow - Low risk'
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'text-red-400 bg-red-900/30 border-red-500/50';
      case 'Medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
      default: return 'text-green-400 bg-green-900/30 border-green-500/50';
    }
  };

  const codeData = {
    code: `// Phishing Detection System
import re
import requests
from urllib.parse import urlparse
import tldextract
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier

class PhishingDetectionSystem:
    def __init__(self):
        self.suspicious_keywords = [
            'urgent', 'verify', 'account', 'suspended', 'click here',
            'limited time', 'act now', 'congratulations', 'winner'
        ]
        self.suspicious_domains = []
        self.ml_model = None
        self.load_model()
    
    def analyze_email(self, email_content, email_url=None):
        """Analyze email for phishing indicators"""
        results = {
            'score': 0,
            'risk': 'Low',
            'indicators': [],
            'recommendation': 'Allow'
        }
        
        # Check for suspicious keywords
        email_lower = email_content.lower()
        found_keywords = [kw for kw in self.suspicious_keywords if kw in email_lower]
        
        if found_keywords:
            results['score'] += len(found_keywords) * 15
            results['indicators'].extend([
                {'type': 'suspicious_keyword', 'value': kw, 'severity': 'medium'}
                for kw in found_keywords
            ])
        
        # Analyze URL if provided
        if email_url:
            url_analysis = self.analyze_url(email_url)
            results['score'] += url_analysis['score']
            results['indicators'].extend(url_analysis['indicators'])
        
        # Check domain reputation
        domain_rep = self.check_domain_reputation(email_url)
        if domain_rep['reputation'] < 50:
            results['score'] += 30
            results['indicators'].append({
                'type': 'low_reputation',
                'value': domain_rep['domain'],
                'severity': 'high'
            })
        
        # ML-based classification
        ml_result = self.ml_classify(email_content)
        if ml_result['is_phishing']:
            results['score'] += 25
            results['indicators'].append({
                'type': 'ml_classification',
                'value': f"Phishing probability: {ml_result['probability']:.2%}",
                'severity': 'high'
            })
        
        # Determine risk level
        results['score'] = min(results['score'], 100)
        if results['score'] >= 70:
            results['risk'] = 'High'
            results['recommendation'] = 'Block - High risk phishing attempt'
        elif results['score'] >= 40:
            results['risk'] = 'Medium'
            results['recommendation'] = 'Review - Suspicious content detected'
        else:
            results['risk'] = 'Low'
            results['recommendation'] = 'Allow - Low risk'
        
        return results
    
    def analyze_url(self, url):
        """Analyze URL for phishing indicators"""
        analysis = {'score': 0, 'indicators': []}
        
        try:
            parsed = urlparse(url)
            domain = parsed.netloc or parsed.path.split('/')[0]
            extracted = tldextract.extract(domain)
            
            # Check for suspicious domain patterns
            if len(domain) > 20:
                analysis['score'] += 10
                analysis['indicators'].append({
                    'type': 'long_domain',
                    'value': domain,
                    'severity': 'medium'
                })
            
            # Check for URL shorteners
            if extracted.domain in ['bit', 'tinyurl', 'goo', 'tco']:
                analysis['score'] += 30
                analysis['indicators'].append({
                    'type': 'url_shortener',
                    'value': domain,
                    'severity': 'high'
                })
            
            # Check for IP address instead of domain
            ip_pattern = re.compile(r'^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$')
            if ip_pattern.match(domain):
                analysis['score'] += 20
                analysis['indicators'].append({
                    'type': 'ip_address',
                    'value': domain,
                    'severity': 'medium'
                })
            
        except Exception as e:
            analysis['indicators'].append({
                'type': 'error',
                'value': str(e),
                'severity': 'info'
            })
        
        return analysis
    
    def check_domain_reputation(self, url):
        """Check domain reputation using threat intelligence"""
        if not url:
            return {'domain': '', 'reputation': 50}
        
        try:
            parsed = urlparse(url)
            domain = parsed.netloc or parsed.path.split('/')[0]
            
            # Simulate reputation check (in production, use threat intel APIs)
            # Check against known malicious domains, age, SSL certificate, etc.
            reputation = 75  # Default
            
            return {'domain': domain, 'reputation': reputation}
        except:
            return {'domain': '', 'reputation': 50}
    
    def ml_classify(self, email_content):
        """Machine learning-based phishing classification"""
        if not self.ml_model:
            return {'is_phishing': False, 'probability': 0.0}
        
        # Feature extraction and classification
        features = self.extract_features(email_content)
        probability = self.ml_model.predict_proba([features])[0][1]
        
        return {
            'is_phishing': probability > 0.7,
            'probability': probability
        }
    
    def extract_features(self, text):
        """Extract features for ML model"""
        # Extract features like word count, suspicious word count, etc.
        return [len(text), text.count('!'), text.count('http')]
    
    def load_model(self):
        """Load pre-trained ML model"""
        # In production, load from file
        pass

# Usage
detector = PhishingDetectionSystem()
result = detector.analyze_email(
    email_content="Urgent! Verify your account now!",
    email_url="https://bit.ly/verify-account"
)
print(f"Risk: {result['risk']}, Score: {result['score']}")`,
    language: 'python',
    title: 'Phishing Detection System'
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Phishing Detection</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email Content</label>
            <textarea
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Paste email content here..."
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white h-32"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">URL (optional)</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white"
            />
          </div>
          <button
            onClick={analyzeEmail}
            disabled={isAnalyzing || (!email && !url)}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <motion.div
          className={`bg-gray-800 rounded-lg border p-6 ${getRiskColor(analysis.risk)}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Risk Level:</span>
              <span className="font-bold text-lg">{analysis.risk}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Threat Score:</span>
              <span className="font-bold text-lg">{analysis.score}/100</span>
            </div>
            <div>
              <div className="w-full bg-gray-900 rounded-full h-3 mb-2">
                <motion.div
                  className={`h-3 rounded-full ${
                    analysis.score >= 70 ? 'bg-red-500' : 
                    analysis.score >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${analysis.score}%` }}
                />
              </div>
            </div>
            <div>
              <div className="text-gray-300 mb-2">Recommendation:</div>
              <div className="font-semibold">{analysis.recommendation}</div>
            </div>
            <div>
              <div className="text-gray-300 mb-2">Indicators Found:</div>
              <div className="space-y-2">
                {analysis.indicators.map((indicator, idx) => (
                  <div key={idx} className="text-sm bg-gray-900 p-2 rounded">
                    <span className="text-blue-400">{indicator.type}:</span>{' '}
                    <span className="text-gray-300">{indicator.value}</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      indicator.severity === 'high' ? 'bg-red-900/50 text-red-400' :
                      indicator.severity === 'medium' ? 'bg-yellow-900/50 text-yellow-400' :
                      'bg-blue-900/50 text-blue-400'
                    }`}>
                      {indicator.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => setShowCodeViewer(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          View Code
        </button>
      </div>

      {showCodeViewer && (
        <CodeViewer
          code={codeData.code}
          language={codeData.language}
          title={codeData.title}
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
        />
      )}
    </div>
  );
};

export default PhishingDetectionDemo;
