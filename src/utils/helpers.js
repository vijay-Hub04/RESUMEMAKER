/**
 * Format bytes to readable string (e.g. 2.4 MB)
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Validate resume file format and size (< 10MB, PDF/DOC/DOCX)
 */
export const validateResumeFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const fileName = file.name.toLowerCase();
  const hasValidExt = allowedExtensions.some(ext => fileName.endsWith(ext));

  if (!hasValidExt && !allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file format. Please upload a PDF, DOC, or DOCX document.',
    };
  }

  const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSizeInBytes) {
    return {
      valid: false,
      error: 'File exceeds maximum limit of 10MB.',
    };
  }

  return { valid: true };
};

/**
 * Get score color configuration based on 0-100 score
 */
export const getScoreColor = (score) => {
  if (score >= 80) {
    return {
      text: 'text-emerald-500 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800',
      stroke: '#10b981',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300',
      label: 'Excellent Match',
    };
  }
  if (score >= 65) {
    return {
      text: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-800',
      stroke: '#f59e0b',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300',
      label: 'Good - Needs Optimization',
    };
  }
  return {
    text: 'text-rose-500 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    border: 'border-rose-200 dark:border-rose-800',
    stroke: '#f43f5e',
    badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300',
    label: 'Critical Gaps Found',
  };
};

/**
 * Calculate job-specific ATS match dynamically for demonstration
 */
export const generateJobMatchAnalysis = (resume, job) => {
  if (!job) return null;

  const jobSkills = job.skills || [];
  // Randomize realistic matching between 70% and 92%
  const matchRatio = 0.75 + (job.id.charCodeAt(job.id.length - 1) % 15) / 100;
  const matchScore = Math.min(Math.round(matchRatio * 100), 94);

  const matchedSkills = jobSkills.slice(0, Math.ceil(jobSkills.length * 0.7));
  const missingSkills = jobSkills.slice(Math.ceil(jobSkills.length * 0.7));

  return {
    jobId: job.id,
    jobTitle: job.title,
    company: job.company,
    overallScore: matchScore,
    resumeName: resume?.fileName || 'Uploaded_Resume.pdf',
    compatibilityStatus: matchScore >= 80 ? 'High Compatibility' : 'Moderate Match',
    matchedKeywords: matchedSkills,
    missingKeywords: missingSkills,
    niceToHaveGaps: job.niceToHave || [],
    skillGapsSummary: `Your resume matches ${matchedSkills.length} out of ${jobSkills.length} primary required qualifications for ${job.title}.`,
    actionRecommendations: [
      `Explicitly mention experience with ${missingSkills.join(', ') || 'Docker & CI/CD'} in your technical summaries.`,
      `Tailor your previous project bullet points to mirror ${job.company}'s requirements for ${job.title}.`,
      `Add relevant certifications or online credentials covering ${missingSkills[0] || 'Modern Architecture'}.`,
    ],
  };
};
