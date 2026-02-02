import React from 'react';
import { getIcon } from '../utils/iconMapping';
import { HiPuzzlePiece } from 'react-icons/hi2';

const ProjectThumb = ({ iconKey = 'product-configurator', Icon, accent = '#10B981' }) => {
  const IconComponent = Icon || getIcon(iconKey, 'demo') || HiPuzzlePiece;
  
  return (
    <div className="mb-6">
      <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
        <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-[140px] block">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
              <stop offset="100%" stopColor={accent} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <rect width="600" height="200" fill="#0b1220" />
          <g>
            <circle cx="120" cy="100" r="80" fill="url(#g)" />
            <rect x="260" y="40" width="200" height="120" rx="18" fill="url(#g)" />
            <circle cx="520" cy="60" r="30" fill="url(#g)" />
          </g>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center select-none text-green-400">
          <IconComponent size={48} />
        </div>
      </div>
    </div>
  );
};

export default ProjectThumb;


