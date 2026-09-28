import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resumeService } from './resumeService';

// Thunk to upload resume
export const uploadResumeFile = createAsyncThunk(
  'resume/uploadResumeFile',
  async (file, { rejectWithValue }) => {
    try {
      const data = await resumeService.uploadResume(file);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to upload resume');
    }
  }
);

// Thunk to run General ATS Analysis
export const analyzeGeneralATS = createAsyncThunk(
  'resume/analyzeGeneralATS',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { resume } = getState();
      const data = await resumeService.analyzeGeneralResume(resume.uploadedFile);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'ATS analysis failed');
    }
  }
);

const initialState = {
  uploadedFile: null, // { fileName, fileSize, fileType, uploadedAt, previewUrl }
  uploadProgress: 0,
  uploadStatus: 'idle', // 'idle' | 'uploading' | 'succeeded' | 'failed'
  analysisStatus: 'idle', // 'idle' | 'analyzing' | 'succeeded' | 'failed'
  atsResults: null,
  error: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    removeResume: (state) => {
      state.uploadedFile = null;
      state.uploadProgress = 0;
      state.uploadStatus = 'idle';
      state.analysisStatus = 'idle';
      state.atsResults = null;
      state.error = null;
    },
    resetAnalysis: (state) => {
      state.analysisStatus = 'idle';
      state.atsResults = null;
    },
    setMockDemoResume: (state) => {
      state.uploadedFile = {
        fileName: 'Alex_Morgan_Senior_FullStack_Resume.pdf',
        fileSize: 184500, // ~180KB
        fileType: 'application/pdf',
        uploadedAt: new Date().toISOString(),
      };
      state.uploadStatus = 'succeeded';
      state.uploadProgress = 100;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload Resume
      .addCase(uploadResumeFile.pending, (state) => {
        state.uploadStatus = 'uploading';
        state.uploadProgress = 30;
        state.error = null;
      })
      .addCase(uploadResumeFile.fulfilled, (state, action) => {
        state.uploadStatus = 'succeeded';
        state.uploadProgress = 100;
        state.uploadedFile = action.payload;
        state.error = null;
      })
      .addCase(uploadResumeFile.rejected, (state, action) => {
        state.uploadStatus = 'failed';
        state.uploadProgress = 0;
        state.error = action.payload;
      })
      // Analyze ATS
      .addCase(analyzeGeneralATS.pending, (state) => {
        state.analysisStatus = 'analyzing';
        state.error = null;
      })
      .addCase(analyzeGeneralATS.fulfilled, (state, action) => {
        state.analysisStatus = 'succeeded';
        state.atsResults = action.payload;
        state.error = null;
      })
      .addCase(analyzeGeneralATS.rejected, (state, action) => {
        state.analysisStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUploadProgress, removeResume, resetAnalysis, setMockDemoResume } = resumeSlice.actions;
export default resumeSlice.reducer;
