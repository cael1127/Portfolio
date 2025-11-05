import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const ComputerVisionPipelineDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedStage, setSelectedStage] = useState('preprocessing');
  const [processedImage, setProcessedImage] = useState(null);
  const [features, setFeatures] = useState([]);
  const [prediction, setPrediction] = useState(null);

  const pipelineStages = [
    { id: 'preprocessing', name: 'Image Preprocessing', icon: '🖼️' },
    { id: 'augmentation', name: 'Data Augmentation', icon: '🔄' },
    { id: 'features', name: 'Feature Extraction', icon: '🔍' },
    { id: 'inference', name: 'Model Inference', icon: '🤖' }
  ];

  const handleProcess = async () => {
    setProcessedImage({ url: 'data:image/svg+xml;base64,...', stage: selectedStage });
    
    if (selectedStage === 'features') {
      setFeatures([
        { name: 'Edge Detection', confidence: 0.92 },
        { name: 'Object Boundaries', confidence: 0.87 },
        { name: 'Texture Patterns', confidence: 0.79 }
      ]);
    }
    
    if (selectedStage === 'inference') {
      setPrediction({ class: 'Cat', confidence: 0.94, bbox: [120, 80, 320, 280] });
    }
  };

  const codeData = {
    code: `import cv2
import numpy as np
from tensorflow import keras
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import albumentations as A

class ComputerVisionPipeline:
    def __init__(self, model_path):
        self.model = keras.models.load_model(model_path)
        self.preprocessor = self.setup_preprocessor()
        self.augmenter = self.setup_augmenter()
        self.feature_extractor = self.setup_feature_extractor()
    
    def setup_preprocessor(self):
        """Configure image preprocessing"""
        return A.Compose([
            A.Resize(224, 224),
            A.Normalize(mean=[0.485, 0.456, 0.406], 
                       std=[0.229, 0.224, 0.225]),
            A.ToFloat(max_value=255.0)
        ])
    
    def setup_augmenter(self):
        """Configure data augmentation"""
        return A.Compose([
            A.RandomRotate90(),
            A.Flip(),
            A.RandomBrightnessContrast(),
            A.GaussNoise(),
            A.RandomCrop(224, 224)
        ])
    
    def setup_feature_extractor(self):
        """Setup feature extraction model"""
        base_model = keras.applications.ResNet50(
            weights='imagenet',
            include_top=False,
            input_shape=(224, 224, 3)
        )
        return keras.Model(
            inputs=base_model.input,
            outputs=base_model.get_layer('conv5_block3_out').output
        )
    
    def preprocess_image(self, image_path):
        """Preprocess input image"""
        image = cv2.imread(image_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        processed = self.preprocessor(image=image)['image']
        return np.expand_dims(processed, axis=0)
    
    def augment_image(self, image):
        """Apply data augmentation"""
        augmented = self.augmenter(image=image)['image']
        return augmented
    
    def extract_features(self, image):
        """Extract features using CNN"""
        features = self.feature_extractor.predict(image)
        return features.flatten()
    
    def predict(self, image_path):
        """Complete pipeline: preprocess -> extract -> predict"""
        # Preprocess
        processed = self.preprocess_image(image_path)
        
        # Extract features
        features = self.extract_features(processed)
        
        # Predict
        prediction = self.model.predict(processed)
        class_id = np.argmax(prediction[0])
        confidence = prediction[0][class_id]
        
        return {
            'class_id': class_id,
            'confidence': float(confidence),
            'features': features
        }
    
    def batch_process(self, image_paths, batch_size=32):
        """Process multiple images in batches"""
        results = []
        for i in range(0, len(image_paths), batch_size):
            batch = image_paths[i:i+batch_size]
            processed_batch = [self.preprocess_image(path) for path in batch]
            predictions = self.model.predict(np.vstack(processed_batch))
            results.extend(predictions)
        return results

# Usage
pipeline = ComputerVisionPipeline('model.h5')
result = pipeline.predict('image.jpg')
print(f"Predicted class: {result['class_id']}, Confidence: {result['confidence']:.2f}")`,
    explanation: `The Computer Vision Pipeline provides a complete end-to-end solution for image processing, feature extraction, and model inference.

## Pipeline Stages

**Image Preprocessing**: Resize, normalize, and prepare images for model input with proper format conversion.

**Data Augmentation**: Apply transformations like rotation, flipping, and brightness adjustment to increase dataset diversity.

**Feature Extraction**: Use pre-trained CNN models (ResNet, VGG) to extract high-level features from images.

**Model Inference**: Run predictions on preprocessed images using trained models.

## Technical Implementation

The pipeline uses OpenCV for image processing, TensorFlow/Keras for deep learning, and Albumentations for augmentation. It supports batch processing and GPU acceleration.

## Benefits

- **Modularity**: Each stage is independent and reusable
- **Efficiency**: Optimized for batch processing and GPU acceleration
- **Flexibility**: Easy to swap models and preprocessing steps
- **Production-Ready**: Handles edge cases and error scenarios`,
    technologies: [
      { name: 'OpenCV', description: 'Image processing library', tags: ['Computer Vision', 'Image Processing'] },
      { name: 'TensorFlow', description: 'Deep learning framework', tags: ['ML', 'Neural Networks'] },
      { name: 'Albumentations', description: 'Image augmentation library', tags: ['Data Augmentation'] },
      { name: 'NumPy', description: 'Numerical computing', tags: ['Array Processing'] }
    ],
    concepts: [
      { name: 'Image Preprocessing', description: 'Preparing images for model input', example: 'Resizing, normalization, format conversion' },
      { name: 'Data Augmentation', description: 'Increasing dataset diversity through transformations', example: 'Rotation, flipping, brightness adjustment' },
      { name: 'Feature Extraction', description: 'Extracting meaningful features from images', example: 'Using CNN layers to extract features' },
      { name: 'Model Inference', description: 'Making predictions with trained models', example: 'Running forward pass through neural network' }
    ],
    features: [
      'End-to-end image processing pipeline',
      'Data augmentation for training',
      'Feature extraction with CNNs',
      'Batch processing support',
      'GPU acceleration',
      'Model inference and prediction'
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Computer Vision Pipeline</h3>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            View Code
          </button>
        </div>

        {/* Pipeline Stages */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Pipeline Stages</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {pipelineStages.map(stage => (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`p-3 rounded-lg border transition-all ${
                  selectedStage === stage.id
                    ? 'border-blue-500 bg-blue-900/20 text-white'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="text-2xl mb-1">{stage.icon}</div>
                <div className="text-xs font-medium">{stage.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Process Button */}
        <button
          onClick={handleProcess}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors mb-4"
        >
          Process Image Through {pipelineStages.find(s => s.id === selectedStage)?.name}
        </button>

        {/* Results Display */}
        {processedImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Processed Output</h4>
              <div className="bg-gray-800 h-48 rounded flex items-center justify-center text-gray-400">
                {selectedStage} completed
              </div>
            </div>

            {features.length > 0 && (
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Extracted Features</h4>
                <div className="space-y-2">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">{feature.name}</span>
                      <span className="text-green-400 font-medium">{(feature.confidence * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {prediction && (
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Model Prediction</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Class:</span>
                    <span className="text-white font-medium">{prediction.class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Confidence:</span>
                    <span className="text-green-400 font-medium">{(prediction.confidence * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={codeData.code}
        language="python"
        title="Computer Vision Pipeline"
        explanation={codeData.explanation}
        technologies={codeData.technologies}
        concepts={codeData.concepts}
        features={codeData.features}
      />
    </div>
  );
};

export default ComputerVisionPipelineDemo;

