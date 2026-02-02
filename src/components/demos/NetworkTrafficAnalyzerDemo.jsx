import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const NetworkTrafficAnalyzerDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [packets, setPackets] = useState([]);
  const [protocols, setProtocols] = useState({});
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    const protocolTypes = ['HTTP', 'HTTPS', 'DNS', 'TCP', 'UDP', 'ICMP'];
    const sourceIPs = ['192.168.1.100', '10.0.0.50', '172.16.0.25', '192.168.1.200'];
    const destIPs = ['8.8.8.8', '1.1.1.1', '192.168.1.1', '10.0.0.1'];

    const interval = setInterval(() => {
      const protocol = protocolTypes[Math.floor(Math.random() * protocolTypes.length)];
      const sourceIP = sourceIPs[Math.floor(Math.random() * sourceIPs.length)];
      const destIP = destIPs[Math.floor(Math.random() * destIPs.length)];
      const size = Math.floor(Math.random() * 1500) + 64;
      const isAnomaly = Math.random() > 0.85;

      const packet = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        protocol,
        sourceIP,
        destIP,
        size,
        port: Math.floor(Math.random() * 65535),
        isAnomaly
      };

      setPackets(prev => [packet, ...prev].slice(0, 50));

      // Update protocol stats
      setProtocols(prev => ({
        ...prev,
        [protocol]: (prev[protocol] || 0) + 1
      }));

      // Detect anomalies
      if (isAnomaly) {
        setAnomalies(prev => [{
          ...packet,
          reason: 'Unusual traffic pattern detected',
          severity: 'high'
        }, ...prev].slice(0, 10));
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const codeData = {
    code: `// Network Traffic Analyzer
from scapy.all import *
from collections import defaultdict
import json

class NetworkTrafficAnalyzer:
    def __init__(self, interface='eth0'):
        self.interface = interface
        self.packets = []
        self.protocol_stats = defaultdict(int)
        self.anomalies = []
        self.baseline = {}
    
    def capture_packets(self, count=100):
        """Capture network packets"""
        print(f"Capturing {count} packets on {self.interface}...")
        
        def packet_handler(packet):
            packet_info = self.analyze_packet(packet)
            self.packets.append(packet_info)
            self.protocol_stats[packet_info['protocol']] += 1
            self.detect_anomalies(packet_info)
        
        sniff(iface=self.interface, prn=packet_handler, count=count)
        return self.generate_report()
    
    def analyze_packet(self, packet):
        """Analyze individual packet"""
        packet_info = {
            'timestamp': packet.time,
            'source_ip': packet[IP].src if IP in packet else None,
            'dest_ip': packet[IP].dst if IP in packet else None,
            'protocol': packet.name,
            'size': len(packet),
            'port': None
        }
        
        # Extract port information
        if TCP in packet:
            packet_info['port'] = packet[TCP].dport
            packet_info['protocol'] = 'TCP'
        elif UDP in packet:
            packet_info['port'] = packet[UDP].dport
            packet_info['protocol'] = 'UDP'
        elif ICMP in packet:
            packet_info['protocol'] = 'ICMP'
        
        return packet_info
    
    def detect_anomalies(self, packet_info):
        """Detect anomalous network traffic"""
        anomalies = []
        
        # Check for port scanning
        if self.is_port_scan(packet_info):
            anomalies.append({
                'type': 'port_scan',
                'packet': packet_info,
                'severity': 'high',
                'description': 'Potential port scanning activity'
            })
        
        # Check for unusual protocol usage
        if self.is_unusual_protocol(packet_info):
            anomalies.append({
                'type': 'unusual_protocol',
                'packet': packet_info,
                'severity': 'medium',
                'description': 'Unusual protocol detected'
            })
        
        # Check for large packet sizes
        if packet_info['size'] > 1500:
            anomalies.append({
                'type': 'large_packet',
                'packet': packet_info,
                'severity': 'low',
                'description': 'Unusually large packet size'
            })
        
        # Check for suspicious IP addresses
        if self.is_suspicious_ip(packet_info['source_ip']):
            anomalies.append({
                'type': 'suspicious_ip',
                'packet': packet_info,
                'severity': 'high',
                'description': 'Traffic from suspicious IP address'
            })
        
        self.anomalies.extend(anomalies)
        return anomalies
    
    def is_port_scan(self, packet_info):
        """Detect port scanning patterns"""
        # Check if multiple ports are being accessed from same source
        source_ip = packet_info['source_ip']
        if source_ip:
            recent_packets = [p for p in self.packets[-50:] if p['source_ip'] == source_ip]
            unique_ports = len(set([p['port'] for p in recent_packets if p['port']]))
            return unique_ports > 10  # Threshold for port scan
        return False
    
    def is_unusual_protocol(self, packet_info):
        """Check for unusual protocol usage"""
        protocol = packet_info['protocol']
        if protocol not in ['TCP', 'UDP', 'HTTP', 'HTTPS', 'DNS', 'ICMP']:
            return True
        return False
    
    def is_suspicious_ip(self, ip):
        """Check if IP is in known threat intelligence"""
        # In production, check against threat intelligence feeds
        suspicious_ips = ['10.0.0.100', '192.168.1.250']
        return ip in suspicious_ips
    
    def generate_report(self):
        """Generate traffic analysis report"""
        return {
            'total_packets': len(self.packets),
            'protocol_distribution': dict(self.protocol_stats),
            'anomalies_detected': len(self.anomalies),
            'anomalies': self.anomalies,
            'top_source_ips': self.get_top_ips('source'),
            'top_dest_ips': self.get_top_ips('dest')
        }
    
    def get_top_ips(self, type='source'):
        """Get top IP addresses by traffic volume"""
        ip_counts = defaultdict(int)
        for packet in self.packets:
            ip = packet[f'{type}_ip']
            if ip:
                ip_counts[ip] += 1
        return sorted(ip_counts.items(), key=lambda x: x[1], reverse=True)[:10]

# Usage
analyzer = NetworkTrafficAnalyzer('eth0')
report = analyzer.capture_packets(100)
print(json.dumps(report, indent=2))`,
    language: 'python',
    title: 'Network Traffic Analyzer'
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-gray-400 text-sm">Total Packets</div>
          <div className="text-2xl font-bold text-white mt-1">{packets.length}</div>
        </motion.div>
        <motion.div 
          className="bg-blue-900/30 border-blue-500/50 p-4 rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-blue-400 text-sm">Protocols</div>
          <div className="text-2xl font-bold text-blue-400 mt-1">{Object.keys(protocols).length}</div>
        </motion.div>
        <motion.div 
          className="bg-red-900/30 border-red-500/50 p-4 rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-red-400 text-sm">Anomalies</div>
          <div className="text-2xl font-bold text-red-400 mt-1">{anomalies.length}</div>
        </motion.div>
        <motion.div 
          className="bg-green-900/30 border-green-500/50 p-4 rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-green-400 text-sm">Normal</div>
          <div className="text-2xl font-bold text-green-400 mt-1">{packets.length - anomalies.length}</div>
        </motion.div>
      </div>

      {/* Protocol Distribution */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Protocol Distribution</h3>
        <div className="space-y-2">
          {Object.entries(protocols).map(([protocol, count]) => (
            <div key={protocol} className="flex items-center gap-4">
              <span className="text-gray-300 w-20">{protocol}</span>
              <div className="flex-1 bg-gray-900 rounded-full h-4">
                <motion.div
                  className="bg-blue-500 h-4 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(count / packets.length) * 100}%` }}
                />
              </div>
              <span className="text-gray-400 text-sm w-16 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Anomalies */}
      {anomalies.length > 0 && (
        <div className="bg-gray-800 rounded-lg border border-red-500/50 p-6">
          <h3 className="text-lg font-semibold mb-4 text-red-400">Anomalies Detected</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {anomalies.map((anomaly, idx) => (
              <motion.div
                key={idx}
                className="p-3 bg-red-900/20 rounded border border-red-500/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-red-400 font-semibold">{anomaly.reason}</div>
                    <div className="text-sm text-gray-400 mt-1">
                      {anomaly.protocol} | {anomaly.sourceIP} → {anomaly.destIP}
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-red-900/50 text-red-400 rounded text-xs">
                    {anomaly.severity}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Packet Stream */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Live Packet Stream</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {packets.map((packet) => (
            <motion.div
              key={packet.id}
              className={`flex items-center gap-4 p-2 rounded border ${
                packet.isAnomaly 
                  ? 'bg-red-900/20 border-red-500/50' 
                  : 'bg-gray-900 border-gray-700'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-gray-500 text-xs w-20">{packet.timestamp}</span>
              <span className="text-blue-400 font-mono text-xs w-16">{packet.protocol}</span>
              <span className="text-gray-300 font-mono text-xs w-32">{packet.sourceIP}</span>
              <span className="text-gray-400">→</span>
              <span className="text-gray-300 font-mono text-xs w-32">{packet.destIP}</span>
              <span className="text-gray-400 text-xs">:{packet.port}</span>
              <span className="text-gray-500 text-xs ml-auto">{packet.size} bytes</span>
            </motion.div>
          ))}
        </div>
      </div>

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

export default NetworkTrafficAnalyzerDemo;
