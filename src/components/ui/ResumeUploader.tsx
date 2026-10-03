import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ResumeUploaderProps {
  onUploadComplete?: (fileData: any) => void;
  compact?: boolean;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onUploadComplete, compact = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsAnalyzing(true);
    setUploadProgress(0);

    // Simulate upload & AI parsing stages
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          if (onUploadComplete) {
            onUploadComplete({
              fileName: uploadedFile.name,
              size: (uploadedFile.size / 1024).toFixed(1) + ' KB',
              uploadedAt: 'Just now',
            });
          }
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleLoadSample = async () => {
    try {
      const res = await fetch('/Alex_Morgan_Senior_SWE.pdf');
      if (res.ok) {
        const blob = await res.blob();
        const sampleFile = new File([blob], 'Alex_Morgan_Senior_SWE.pdf', { type: 'application/pdf' });
        processFile(sampleFile);
        return;
      }
    } catch {}
    const sampleBlob = new Blob(['%PDF-1.4 sample content'], { type: 'application/pdf' });
    const sampleFile = new File([sampleBlob], 'Alex_Morgan_Senior_SWE.pdf', { type: 'application/pdf' });
    processFile(sampleFile);
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.docx,.doc"
        className="hidden"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl transition-all duration-300 ${
          compact ? 'p-6 sm:p-8' : 'p-8 sm:p-12'
        } flex flex-col items-center justify-center text-center cursor-pointer ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-white/15 hover:border-blue-500/50 bg-slate-900/40 hover:bg-slate-900/60'
        }`}
      >
        {!file ? (
          <>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-105 transition-transform">
              <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              Drag & Drop your resume here
            </h3>
            <p className="text-sm text-slate-400 max-w-sm mb-4">
              Supports <span className="text-blue-400 font-medium">PDF, DOCX, DOC</span> (Up to 10MB) for neural parsing
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition-all"
              >
                Browse File
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLoadSample();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Load Sample Candidate</span>
              </button>
            </div>
          </>
        ) : (
          <div className="w-full max-w-md">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-left mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{file.name}</p>
                <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB • Ready for deep scan</p>
              </div>
              {uploadProgress === 100 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <RefreshCw className="w-5 h-5 text-blue-400 animate-spin shrink-0" />
              )}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
              <span>{isAnalyzing ? 'Extracting embeddings & keywords...' : 'Neural parsing complete'}</span>
              <span className="font-mono text-white font-medium">{uploadProgress}%</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setUploadProgress(0);
                }}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
              >
                Change File
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/resume/analyze');
                }}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Analyze Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
