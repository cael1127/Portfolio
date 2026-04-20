import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const RESUME_URL = '/Cael_Findley_Resume_NSWC.pdf';

export default function ResumePage({ setCurrentPage }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <motion.h1
              className="text-3xl sm:text-4xl font-bold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              Resume
            </motion.h1>
            <p className="text-gray-300 mt-2 max-w-2xl">
              Download the PDF or view it inline. If the embed doesn’t load, the download link will still work.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setCurrentPage('home')}>
              Back home
            </Button>
            <Button as="a" href={RESUME_URL} target="_blank" rel="noreferrer" download>
              Download PDF
            </Button>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-700 bg-gray-950/40 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
            <div className="text-sm text-gray-300">Cael_Findley_Resume_NSWC.pdf</div>
            <a
              className="text-sm text-emerald-300 hover:text-emerald-200 underline underline-offset-4"
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
            >
              Open in new tab
            </a>
          </div>

          <div className="h-[75vh] bg-gray-900">
            <object data={RESUME_URL} type="application/pdf" className="w-full h-full">
              <iframe title="Resume PDF" src={RESUME_URL} className="w-full h-full" />
            </object>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Note: the PDF must exist at <code className="text-gray-300">{RESUME_URL}</code> in your deployed site’s
          public assets.
        </div>
      </div>
    </div>
  );
}

