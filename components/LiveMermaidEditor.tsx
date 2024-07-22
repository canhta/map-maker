'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MermaidChart = dynamic(() => import('./MermaidChart'), { ssr: false });

const STORAGE_KEY = 'mermaidMakerCode';

const LiveMermaidEditor: React.FC = () => {
  const [mermaidCode, setMermaidCode] = useState<string>(`graph TD
    A[Client] --> B[Load Balancer]
    B --> C[Server1]
    B --> D[Server2]`);

  useEffect(() => {
    const savedCode = localStorage.getItem(STORAGE_KEY);
    if (savedCode) {
      setMermaidCode(savedCode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mermaidCode);
  }, [mermaidCode]);

  const handleClearCache = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMermaidCode(`graph TD
    A[Client] --> B[Load Balancer]
    B --> C[Server1]
    B --> D[Server2]`);
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>MermaidMaker</h1>
        <button
          onClick={handleClearCache}
          className='flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        >
          Clear Cache
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <h2 className='text-xl font-semibold mb-2'>Input</h2>
          <textarea
            className='w-full h-64 p-2 border rounded'
            value={mermaidCode}
            onChange={(e) => setMermaidCode(e.target.value)}
          />
        </div>
        <div>
          <h2 className='text-xl font-semibold mb-2'>Output</h2>
          <div className='border rounded p-4'>
            <MermaidChart chart={mermaidCode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMermaidEditor;
