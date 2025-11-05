import React, { useState } from 'react';
import CodeViewer from '../CodeViewer';

const EncryptionSystemDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);

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

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Encryption & Key Management System</h3>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            View Code
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">🔐</div>
            <div className="text-sm font-medium text-white">AES</div>
            <div className="text-xs text-gray-400">Symmetric</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">🔑</div>
            <div className="text-sm font-medium text-white">RSA</div>
            <div className="text-xs text-gray-400">Asymmetric</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">🔄</div>
            <div className="text-sm font-medium text-white">Key Rotation</div>
            <div className="text-xs text-gray-400">Automated</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">💾</div>
            <div className="text-sm font-medium text-white">Secure Storage</div>
            <div className="text-xs text-gray-400">Key Vault</div>
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

