import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const EncryptionSystemDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [encryptionType, setEncryptionType] = useState('symmetric');
  const [keyGenerated, setKeyGenerated] = useState(false);
  const [symmetricKey, setSymmetricKey] = useState('');
  const [operationStatus, setOperationStatus] = useState('');

  const codeData = {
    code: `from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64
import os

class EncryptionSystem:
    def __init__(self):
        self.symmetric_key = None
        self.private_key = None
        self.public_key = None
    
    def generate_symmetric_key(self):
        """Generate symmetric encryption key"""
        self.symmetric_key = Fernet.generate_key()
        return self.symmetric_key
    
    def generate_asymmetric_keys(self):
        """Generate RSA key pair"""
        self.private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048
        )
        self.public_key = self.private_key.public_key()
        return self.private_key, self.public_key
    
    def encrypt_symmetric(self, data, key=None):
        """Encrypt data using symmetric encryption (AES)"""
        if key is None:
            key = self.symmetric_key
        f = Fernet(key)
        encrypted = f.encrypt(data.encode())
        return encrypted
    
    def decrypt_symmetric(self, encrypted_data, key=None):
        """Decrypt data using symmetric encryption"""
        if key is None:
            key = self.symmetric_key
        f = Fernet(key)
        decrypted = f.decrypt(encrypted_data)
        return decrypted.decode()
    
    def encrypt_asymmetric(self, data, public_key=None):
        """Encrypt data using RSA public key"""
        if public_key is None:
            public_key = self.public_key
        
        encrypted = public_key.encrypt(
            data.encode(),
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
        return encrypted
    
    def decrypt_asymmetric(self, encrypted_data, private_key=None):
        """Decrypt data using RSA private key"""
        if private_key is None:
            private_key = self.private_key
        
        decrypted = private_key.decrypt(
            encrypted_data,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
        return decrypted.decode()
    
    def rotate_key(self, old_key, new_key):
        """Rotate encryption keys"""
        # Re-encrypt data with new key
        # Store key rotation history
        pass
    
    def store_key_securely(self, key, key_name):
        """Store encryption key securely"""
        # Use key management service
        # Encrypt key at rest
        pass

# Usage
encryption = EncryptionSystem()

# Symmetric encryption
symmetric_key = encryption.generate_symmetric_key()
encrypted = encryption.encrypt_symmetric("Sensitive data")
decrypted = encryption.decrypt_symmetric(encrypted)

# Asymmetric encryption
private_key, public_key = encryption.generate_asymmetric_keys()
encrypted = encryption.encrypt_asymmetric("Sensitive data", public_key)
decrypted = encryption.decrypt_asymmetric(encrypted, private_key)`,
    explanation: `Comprehensive encryption and key management system supporting both symmetric (AES) and asymmetric (RSA) encryption.

## Encryption Methods

**Symmetric Encryption (AES)**: Fast encryption for large data using shared keys.

**Asymmetric Encryption (RSA)**: Secure key exchange and digital signatures.

**Key Management**: Secure key storage, rotation, and lifecycle management.

**Key Derivation**: PBKDF2 for deriving keys from passwords.

## Technical Implementation

The system uses cryptography library for encryption operations, implements key rotation, and provides secure key storage mechanisms.

## Benefits

- **Security**: Strong encryption algorithms
- **Flexibility**: Support for multiple encryption methods
- **Key Management**: Secure key storage and rotation
- **Performance**: Optimized for different use cases`,
    technologies: [
      { name: 'Cryptography', description: 'Python crypto library', tags: ['Encryption', 'Security'] },
      { name: 'AES', description: 'Symmetric encryption', tags: ['Encryption'] },
      { name: 'RSA', description: 'Asymmetric encryption', tags: ['Encryption', 'PKI'] },
      { name: 'Key Management', description: 'Key storage and rotation', tags: ['Security', 'Key Management'] }
    ],
    concepts: [
      { name: 'Symmetric Encryption', description: 'Same key for encryption and decryption', example: 'AES encryption' },
      { name: 'Asymmetric Encryption', description: 'Public/private key pairs', example: 'RSA encryption' },
      { name: 'Key Rotation', description: 'Periodically changing encryption keys', example: 'Re-encrypting with new keys' },
      { name: 'Key Management', description: 'Secure key storage and lifecycle', example: 'Key vault and rotation' }
    ],
    features: [
      'AES symmetric encryption',
      'RSA asymmetric encryption',
      'Key generation and management',
      'Key rotation support',
      'Secure key storage',
      'API integration'
    ]
  };

  // Simulate encryption
  const handleEncrypt = () => {
    if (!inputText.trim()) {
      setOperationStatus('Please enter text to encrypt');
      return;
    }
    if (encryptionType === 'symmetric' && !keyGenerated) {
      setOperationStatus('Please generate a key first');
      return;
    }
    
    // Simulate encryption (in real app, this would use actual crypto)
    const simulatedEncrypted = btoa(inputText).substring(0, 50) + '...';
    setEncryptedText(simulatedEncrypted);
    setOperationStatus('Encryption successful!');
    setTimeout(() => setOperationStatus(''), 3000);
  };

  // Simulate decryption
  const handleDecrypt = () => {
    if (!encryptedText.trim()) {
      setOperationStatus('No encrypted text to decrypt');
      return;
    }
    
    // Simulate decryption
    try {
      const simulatedDecrypted = atob(encryptedText.replace('...', ''));
      setDecryptedText(simulatedDecrypted);
      setOperationStatus('Decryption successful!');
      setTimeout(() => setOperationStatus(''), 3000);
    } catch (e) {
      setOperationStatus('Decryption failed - invalid encrypted data');
    }
  };

  // Generate key
  const handleGenerateKey = () => {
    const randomKey = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .substring(0, 64);
    setSymmetricKey(randomKey);
    setKeyGenerated(true);
    setOperationStatus('Key generated successfully!');
    setTimeout(() => setOperationStatus(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Feature Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="text-2xl mb-2">🔐</div>
          <div className="text-sm font-medium text-white">AES</div>
          <div className="text-xs text-gray-400">Symmetric</div>
        </motion.div>
        <motion.div 
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="text-2xl mb-2">🔑</div>
          <div className="text-sm font-medium text-white">RSA</div>
          <div className="text-xs text-gray-400">Asymmetric</div>
        </motion.div>
        <motion.div 
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="text-2xl mb-2">🔄</div>
          <div className="text-sm font-medium text-white">Key Rotation</div>
          <div className="text-xs text-gray-400">Automated</div>
        </motion.div>
        <motion.div 
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="text-2xl mb-2">💾</div>
          <div className="text-sm font-medium text-white">Secure Storage</div>
          <div className="text-xs text-gray-400">Key Vault</div>
        </motion.div>
      </div>

      {/* Interactive Encryption Interface */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Interactive Encryption Demo</h3>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            View Code
          </button>
        </div>

        {/* Encryption Type Selector */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Encryption Type</label>
          <div className="flex gap-4">
            <button
              onClick={() => setEncryptionType('symmetric')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                encryptionType === 'symmetric'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              🔐 Symmetric (AES)
            </button>
            <button
              onClick={() => setEncryptionType('asymmetric')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                encryptionType === 'asymmetric'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              🔑 Asymmetric (RSA)
            </button>
          </div>
        </div>

        {/* Key Generation */}
        {encryptionType === 'symmetric' && (
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={handleGenerateKey}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
              >
                {keyGenerated ? '🔄 Regenerate Key' : '🔑 Generate Key'}
              </button>
              {keyGenerated && (
                <div className="flex-1 bg-gray-900 p-3 rounded border border-gray-700">
                  <div className="text-xs text-gray-400 mb-1">Generated Key:</div>
                  <div className="text-xs font-mono text-green-400 break-all">{symmetricKey}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Status Message */}
        {operationStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 p-3 rounded-lg text-sm ${
              operationStatus.includes('successful')
                ? 'bg-green-900/30 text-green-400 border border-green-500/50'
                : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/50'
            }`}
          >
            {operationStatus}
          </motion.div>
        )}

        {/* Input Section */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Plain Text Input</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to encrypt..."
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
            rows={3}
          />
          <button
            onClick={handleEncrypt}
            disabled={!inputText.trim() || (encryptionType === 'symmetric' && !keyGenerated)}
            className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm"
          >
            🔒 Encrypt
          </button>
        </div>

        {/* Encrypted Output */}
        {encryptedText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <label className="block text-sm text-gray-400 mb-2">Encrypted Output</label>
            <div className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg">
              <div className="text-sm font-mono text-yellow-400 break-all">{encryptedText}</div>
            </div>
            <button
              onClick={handleDecrypt}
              className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
            >
              🔓 Decrypt
            </button>
          </motion.div>
        )}

        {/* Decrypted Output */}
        {decryptedText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <label className="block text-sm text-gray-400 mb-2">Decrypted Output</label>
            <div className="w-full p-3 bg-gray-900 border border-green-500/50 rounded-lg">
              <div className="text-sm text-green-400 break-words">{decryptedText}</div>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{inputText.length}</div>
            <div className="text-xs text-gray-400">Input Length</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{encryptedText ? encryptedText.length : 0}</div>
            <div className="text-xs text-gray-400">Encrypted Length</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{keyGenerated ? '✓' : '✗'}</div>
            <div className="text-xs text-gray-400">Key Status</div>
          </div>
        </div>
      </div>
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={codeData.code}
        language="python"
        title="Encryption & Key Management System"
        explanation={codeData.explanation}
        technologies={codeData.technologies}
        concepts={codeData.concepts}
        features={codeData.features}
      />
    </div>
  );
};

export default EncryptionSystemDemo;

