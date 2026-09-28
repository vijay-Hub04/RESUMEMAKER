import { DEFAULT_MOCK_ATS_RESULT } from '../../utils/constants';

export const resumeService = {
  // Simulate resume upload with realistic timing
  uploadResume: async (file) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type || 'application/pdf',
      uploadedAt: new Date().toISOString(),
      previewUrl: URL.createObjectURL(file),
    };
  },

  // Simulate ATS general evaluation algorithm
  analyzeGeneralResume: async (resumeInfo) => {
    // Simulate AI deep analysis step
    await new Promise((resolve) => setTimeout(resolve, 1400));

    // Dynamic variation based on filename length or random seed
    const variance = (resumeInfo?.fileName?.length || 10) % 12;
    const baseScore = 74 + variance; // Range 74 - 86

    return {
      ...DEFAULT_MOCK_ATS_RESULT,
      score: baseScore,
      fileName: resumeInfo?.fileName || 'Uploaded_Resume.pdf',
      analyzedAt: new Date().toISOString(),
      isSimulated: true,
    };
  },
};
