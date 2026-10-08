import axiosInstance from '../../services/axiosInstance';
import { API_ENDPOINTS } from '../../services/apiEndpoints';
import { DEFAULT_MOCK_ATS_RESULT } from '../../utils/constants';

export const resumeService = {
  /**
   * Upload resume file to backend API and store in MongoDB
   * @param {File} file - The uploaded resume file (PDF, DOC, DOCX)
   * @param {Object} candidateInfo - Optional candidate metadata (name, email, phone)
   * @param {Function} onProgress - Progress reporting callback (progressPercent: number)
   */
  uploadResume: async (file, candidateInfo = {}, onProgress = null) => {
    const formData = new FormData();
    // The backend accepts 'resume' or 'file' field
    formData.append('resume', file);

    if (candidateInfo?.name) {
      formData.append('candidateName', candidateInfo.name);
    }
    if (candidateInfo?.email) {
      formData.append('candidateEmail', candidateInfo.email);
    }
    if (candidateInfo?.phone) {
      formData.append('candidatePhone', candidateInfo.phone);
    }

    const response = await axiosInstance.post(API_ENDPOINTS.RESUME.UPLOAD, formData, {
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    });

    const resData = response.data?.data || response.data;
    const fileId = resData.id || resData._id;
    const baseURL = axiosInstance.defaults.baseURL || 'http://localhost:5000';

    const downloadUrl = resData.downloadUrl
      ? (resData.downloadUrl.startsWith('http') ? resData.downloadUrl : `${baseURL}${resData.downloadUrl}`)
      : `${baseURL}/uploadResume/${fileId}/download`;

    const viewUrl = resData.viewUrl
      ? (resData.viewUrl.startsWith('http') ? resData.viewUrl : `${baseURL}${resData.viewUrl}`)
      : `${baseURL}/uploadResume/${fileId}/view`;

    return {
      id: fileId,
      _id: fileId,
      fileName: resData.originalName || file.name,
      originalName: resData.originalName || file.name,
      fileSize: resData.fileSize || file.size,
      fileType: resData.mimeType || file.type || 'application/pdf',
      mimeType: resData.mimeType || file.type || 'application/pdf',
      uploadedAt: resData.uploadedAt || new Date().toISOString(),
      downloadUrl,
      viewUrl,
      previewUrl: file ? URL.createObjectURL(file) : null,
      storedInMongo: true,
      rawMongoData: resData,
    };
  },

  /**
   * Fetch list of all uploaded resumes from MongoDB
   */
  getAllResumes: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.RESUME.GET_ALL);
    return response.data?.data || response.data;
  },

  /**
   * Fetch single resume details by ID from MongoDB
   */
  getResumeById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.RESUME.GET_BY_ID(id));
    return response.data?.data || response.data;
  },

  /**
   * Delete resume from MongoDB
   */
  deleteResume: async (id) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.RESUME.DELETE(id));
    return response.data;
  },

  // ATS general evaluation algorithm
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

export default resumeService;
