import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import Reveal from '../components/Reveal';
import CaseStudy from '../components/CaseStudy';
import ProjectThumb from '../components/ProjectThumb';
import DemoReadme from '../components/DemoReadme';
import ObjectDetectionDemo from '../components/demos/ObjectDetectionDemo';

const ObjectDetectionDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Real-time Object Detection"
      subtitle="Live webcam detection with bounding boxes"
      emoji="🎯"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Audio Transcription', onClick: () => setCurrentPage('audio-transcription-demo') }}
    >
      <Reveal>
        <ProjectThumb emoji="🎯" accent="#f59e0b" />
        <ObjectDetectionDemo />
      </Reveal>
      <Reveal delay={150}>
        <CaseStudy
          overview="Runs a detector model and renders bounding boxes with confidence overlays."
          role="Model integration, rendering, and performance tuning."
          stack={["TensorFlow", "OpenCV", "React"]}
          challenges={["GPU/CPU fallbacks", "Fast rendering of overlays"]}
          results={["Smooth 30fps overlays", "Configurable confidence threshold"]}
        />
      </Reveal>
      <Reveal delay={250}>
        <DemoReadme
          problem="Show real-time detection results clearly and efficiently without webcam permissions."
          approach="Use deterministic overlays to demonstrate labeling, color coding, and box rendering."
          highlights={["Deterministic demo (reviewable code)", "Color-coded labels", "Simple canvas grid background"]}
        />
      </Reveal>
    </ProjectLayout>
  );
};

export default ObjectDetectionDemoPage;


