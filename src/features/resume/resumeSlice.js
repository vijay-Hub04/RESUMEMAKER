import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resumeService } from './resumeService';
import { loginUser, logoutUser } from '../auth/authSlice';

// Thunk to fetch active user resume from MongoDB
export const fetchMyResume = createAsyncThunk(
  'resume/fetchMyResume',
  async (_, { rejectWithValue }) => {
    try {
      const data = await resumeService.getMyResume();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch resume');
    }
  }
);

// Thunk to upload resume to Backend and store in MongoDB
export const uploadResumeFile = createAsyncThunk(
  'resume/uploadResumeFile',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      // payload can be a File object directly OR an object { file, candidateInfo }
      const file = payload instanceof File ? payload : payload?.file;
      const candidateInfo = payload instanceof File ? {} : (payload?.candidateInfo || {});

      if (!file) {
        return rejectWithValue('No file was provided for upload.');
      }

      const data = await resumeService.uploadResume(file, candidateInfo, (progress) => {
        dispatch(setUploadProgress(progress));
      });
      return data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.customMessage ||
        err.message ||
        'Failed to upload resume to MongoDB';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk to delete resume from MongoDB
export const deleteResumeFile = createAsyncThunk(
  'resume/deleteResumeFile',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      if (id) {
        await resumeService.deleteResume(id);
      }
      dispatch(removeResume());
      return id;
    } catch (err) {
      dispatch(removeResume());
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to delete resume');
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
  uploadedFile: null, // { id, fileName, originalName, fileSize, fileType, uploadedAt, previewUrl, downloadUrl, viewUrl, storedInMongo }
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
    setUploadedFile: (state, action) => {
      state.uploadedFile = action.payload;
      state.uploadStatus = action.payload ? 'succeeded' : 'idle';
      state.uploadProgress = action.payload ? 100 : 0;
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
        id: 'demo-sample-id-12345',
        fileName: 'Alex_Morgan_Senior_FullStack_Resume.pdf',
        originalName: 'Alex_Morgan_Senior_FullStack_Resume.pdf',
        fileSize: 184500, // ~180KB
        fileType: 'application/pdf',
        mimeType: 'application/pdf',
        uploadedAt: new Date().toISOString(),
        storedInMongo: true,
      };
      state.uploadStatus = 'succeeded';
      state.uploadProgress = 100;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch My Resume
      .addCase(fetchMyResume.fulfilled, (state, action) => {
        if (action.payload) {
          state.uploadedFile = action.payload;
          state.uploadStatus = 'succeeded';
          state.uploadProgress = 100;
        }
      })
      // When User Logs In, automatically hydrate existing resume from MongoDB
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload?.resume) {
          state.uploadedFile = action.payload.resume;
          state.uploadStatus = 'succeeded';
          state.uploadProgress = 100;
        }
      })
      // When User Logs Out, clear resume state
      .addCase(logoutUser.fulfilled, (state) => {
        state.uploadedFile = null;
        state.uploadStatus = 'idle';
        state.uploadProgress = 0;
        state.atsResults = null;
      })
      // Upload Resume
      .addCase(uploadResumeFile.pending, (state) => {
        state.uploadStatus = 'uploading';
        state.uploadProgress = 15;
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
      // Delete Resume
      .addCase(deleteResumeFile.fulfilled, (state) => {
        state.uploadedFile = null;
        state.uploadProgress = 0;
        state.uploadStatus = 'idle';
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

export const {
  setUploadProgress,
  setUploadedFile,
  removeResume,
  resetAnalysis,
  setMockDemoResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;
