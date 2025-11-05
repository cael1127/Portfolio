import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const MLTrainingDashboardDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [trainingData, setTrainingData] = useState([]);
  const [epoch, setEpoch] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [selectedModel, setSelectedModel] = useState('resnet50');
  const [metrics, setMetrics] = useState({
    loss: 0.85,
    accuracy: 0.65,
    valLoss: 0.92,
    valAccuracy: 0.58
  });

  useEffect(() => {
    if (isTraining) {
      const interval = setInterval(() => {
        setEpoch(prev => {
          if (prev >= 50) {
            setIsTraining(false);
            return 50;
          }
          const newEpoch = prev + 1;
          
          // Simulate training metrics
          setMetrics({
            loss: Math.max(0.05, 0.85 - (newEpoch * 0.015)),
            accuracy: Math.min(0.98, 0.65 + (newEpoch * 0.006)),
            valLoss: Math.max(0.08, 0.92 - (newEpoch * 0.014)),
            valAccuracy: Math.min(0.95, 0.58 + (newEpoch * 0.005))
          });

          setTrainingData(prev => [...prev, {
            epoch: newEpoch,
            loss: metrics.loss,
            accuracy: metrics.accuracy,
            valLoss: metrics.valLoss,
            valAccuracy: metrics.valAccuracy
          }]);

          return newEpoch;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isTraining, metrics]);

  const models = [
    { id: 'resnet50', name: 'ResNet-50', params: '25M' },
    { id: 'vgg16', name: 'VGG-16', params: '138M' },
    { id: 'efficientnet', name: 'EfficientNet-B0', params: '5M' },
    { id: 'transformer', name: 'Transformer', params: '65M' }
  ];

  const hyperparameters = {
    learningRate: 0.001,
    batchSize: 32,
    epochs: 50,
    optimizer: 'Adam',
    lossFunction: 'Categorical Crossentropy'
  };

  const startTraining = () => {
    setIsTraining(true);
    setEpoch(0);
    setTrainingData([]);
  };

  const codeData = {
    code: `import tensorflow as tf
from tensorflow import keras
import matplotlib.pyplot as plt
import numpy as np
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping

class MLTrainingDashboard:
    def __init__(self, model, train_data, val_data):
        self.model = model
        self.train_data = train_data
        self.val_data = val_data
        self.history = {
            'loss': [],
            'accuracy': [],
            'val_loss': [],
            'val_accuracy': []
        }
        self.callbacks = []

    def setup_callbacks(self):
        """Configure training callbacks"""
        checkpoint = ModelCheckpoint(
            'best_model.h5',
            monitor='val_accuracy',
            save_best_only=True,
            verbose=1
        )
        
        early_stop = EarlyStopping(
            monitor='val_loss',
            patience=5,
            restore_best_weights=True
        )
        
        self.callbacks = [checkpoint, early_stop]

    def train(self, epochs=50, batch_size=32):
        """Train the model with real-time metrics tracking"""
        self.setup_callbacks()
        
        history = self.model.fit(
            self.train_data,
            validation_data=self.val_data,
            epochs=epochs,
            batch_size=batch_size,
            callbacks=self.callbacks,
            verbose=1
        )
        
        self.history = history.history
        return history

    def plot_metrics(self):
        """Visualize training metrics"""
        fig, axes = plt.subplots(1, 2, figsize=(12, 4))
        
        # Loss plot
        axes[0].plot(self.history['loss'], label='Training Loss')
        axes[0].plot(self.history['val_loss'], label='Validation Loss')
        axes[0].set_title('Model Loss')
        axes[0].set_xlabel('Epoch')
        axes[0].set_ylabel('Loss')
        axes[0].legend()
        
        # Accuracy plot
        axes[1].plot(self.history['accuracy'], label='Training Accuracy')
        axes[1].plot(self.history['val_accuracy'], label='Validation Accuracy')
        axes[1].set_title('Model Accuracy')
        axes[1].set_xlabel('Epoch')
        axes[1].set_ylabel('Accuracy')
        axes[1].legend()
        
        plt.tight_layout()
        return fig

    def compare_models(self, models, metrics):
        """Compare multiple model architectures"""
        comparison = {}
        for model_name, model in models.items():
            history = model.fit(...)
            comparison[model_name] = {
                'final_accuracy': history.history['val_accuracy'][-1],
                'training_time': history.history['time'],
                'params': model.count_params()
            }
        return comparison

# Usage
model = keras.Sequential([
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation='softmax')
])

dashboard = MLTrainingDashboard(model, train_data, val_data)
history = dashboard.train(epochs=50)
dashboard.plot_metrics()`,
    explanation: `The ML Training Dashboard provides comprehensive monitoring and visualization of machine learning model training.

## Core Features

**Real-time Metrics Tracking**: Monitor loss, accuracy, and validation metrics during training with live updates.

**Hyperparameter Tuning**: Adjust learning rate, batch size, optimizer, and other hyperparameters to optimize model performance.

**Model Comparison**: Compare multiple model architectures side-by-side to choose the best performing model.

**Visualization**: Real-time plots of training progress showing loss curves and accuracy trends.

## Technical Implementation

The dashboard integrates with TensorFlow/Keras to track training metrics, uses callbacks for checkpointing and early stopping, and provides real-time visualization of training progress.

## Benefits

- **Visibility**: Real-time insight into training progress
- **Optimization**: Easy hyperparameter tuning and model comparison
- **Efficiency**: Early stopping and checkpointing save time and resources
- **Analysis**: Comprehensive metrics for model evaluation`,
    technologies: [
      { name: 'TensorFlow', description: 'Deep learning framework', tags: ['ML', 'Python', 'Neural Networks'] },
      { name: 'Keras', description: 'High-level neural network API', tags: ['ML', 'Deep Learning'] },
      { name: 'Matplotlib', description: 'Plotting and visualization', tags: ['Visualization', 'Python'] },
      { name: 'React', description: 'Frontend dashboard UI', tags: ['Frontend', 'UI'] }
    ],
    concepts: [
      { name: 'Training Metrics', description: 'Tracking loss, accuracy, and validation metrics', example: 'Plotting loss curves over epochs' },
      { name: 'Hyperparameter Tuning', description: 'Optimizing model parameters for better performance', example: 'Adjusting learning rate and batch size' },
      { name: 'Model Comparison', description: 'Evaluating multiple architectures', example: 'Comparing ResNet vs VGG performance' },
      { name: 'Callbacks', description: 'Training hooks for checkpointing and early stopping', example: 'Saving best model automatically' }
    ],
    features: [
      'Real-time training visualization',
      'Hyperparameter tuning interface',
      'Model comparison tools',
      'Metrics tracking and plotting',
      'Early stopping and checkpointing',
      'Training history export'
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">ML Training Dashboard</h3>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            View Code
          </button>
        </div>

        {/* Model Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Select Model Architecture</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {models.map(model => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`p-3 rounded-lg border transition-all ${
                  selectedModel === model.id
                    ? 'border-blue-500 bg-blue-900/20 text-white'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="font-medium text-sm">{model.name}</div>
                <div className="text-xs text-gray-400">{model.params} params</div>
              </button>
            ))}
          </div>
        </div>

        {/* Hyperparameters */}
        <div className="mb-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Hyperparameters</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            <div>
              <div className="text-gray-400 text-xs">Learning Rate</div>
              <div className="text-white font-medium">{hyperparameters.learningRate}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">Batch Size</div>
              <div className="text-white font-medium">{hyperparameters.batchSize}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">Epochs</div>
              <div className="text-white font-medium">{hyperparameters.epochs}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">Optimizer</div>
              <div className="text-white font-medium">{hyperparameters.optimizer}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">Loss Function</div>
              <div className="text-white font-medium text-xs">{hyperparameters.lossFunction}</div>
            </div>
          </div>
        </div>

        {/* Training Controls */}
        <div className="mb-4">
          <button
            onClick={startTraining}
            disabled={isTraining}
            className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            {isTraining ? `Training... Epoch ${epoch}/50` : 'Start Training'}
          </button>
        </div>

        {/* Metrics Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-gray-400 text-xs mb-1">Training Loss</div>
            <div className="text-2xl font-bold text-red-400">{metrics.loss.toFixed(4)}</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-gray-400 text-xs mb-1">Training Accuracy</div>
            <div className="text-2xl font-bold text-green-400">{(metrics.accuracy * 100).toFixed(2)}%</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-gray-400 text-xs mb-1">Validation Loss</div>
            <div className="text-2xl font-bold text-yellow-400">{metrics.valLoss.toFixed(4)}</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-gray-400 text-xs mb-1">Val Accuracy</div>
            <div className="text-2xl font-bold text-blue-400">{(metrics.valAccuracy * 100).toFixed(2)}%</div>
          </div>
        </div>

        {/* Training Progress Visualization */}
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Training Progress</h4>
          <div className="space-y-4">
            {/* Loss Chart */}
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Loss</span>
                <span>Epoch {epoch}/50</span>
              </div>
              <div className="relative h-32 bg-gray-800 rounded">
                <svg className="w-full h-full">
                  {trainingData.length > 1 && trainingData.map((point, idx) => {
                    if (idx === 0) return null;
                    const x1 = ((idx - 1) / 49) * 100;
                    const y1 = 100 - (point.loss * 100);
                    const x2 = (idx / 49) * 100;
                    const y2 = 100 - (trainingData[idx].loss * 100);
                    return (
                      <line
                        key={idx}
                        x1={`${x1}%`}
                        y1={`${y1}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="#ef4444"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
            {/* Accuracy Chart */}
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Accuracy</span>
              </div>
              <div className="relative h-32 bg-gray-800 rounded">
                <svg className="w-full h-full">
                  {trainingData.length > 1 && trainingData.map((point, idx) => {
                    if (idx === 0) return null;
                    const x1 = ((idx - 1) / 49) * 100;
                    const y1 = 100 - (point.accuracy * 100);
                    const x2 = (idx / 49) * 100;
                    const y2 = 100 - (trainingData[idx].accuracy * 100);
                    return (
                      <line
                        key={idx}
                        x1={`${x1}%`}
                        y1={`${y1}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={codeData.code}
        language="python"
        title="ML Training Dashboard"
        explanation={codeData.explanation}
        technologies={codeData.technologies}
        concepts={codeData.concepts}
        features={codeData.features}
      />
    </div>
  );
};

export default MLTrainingDashboardDemo;

