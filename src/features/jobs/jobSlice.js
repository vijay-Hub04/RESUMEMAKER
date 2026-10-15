import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobService } from './jobService';

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (filters, { getState, rejectWithValue }) => {
    try {
      const { resume } = getState();
      const resumeId = resume.uploadedFile?.id || resume.uploadedFile?._id;
      const data = await jobService.getJobs(filters, resumeId);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch jobs');
    }
  }
);

export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { resume } = getState();
      const resumeId = resume.uploadedFile?.id || resume.uploadedFile?._id;
      const data = await jobService.getJobById(id, resumeId);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Job not found');
    }
  }
);

export const checkJobMatchATS = createAsyncThunk(
  'jobs/checkJobMatchATS',
  async (job, { getState, rejectWithValue }) => {
    try {
      const { resume } = getState();
      const jobId = job.id || job._id;
      const resumeId = resume.uploadedFile?.id || resume.uploadedFile?._id;
      const data = await jobService.analyzeJobATS(jobId, resumeId);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Job match analysis failed');
    }
  }
);

export const applyToJobAsync = createAsyncThunk(
  'jobs/applyToJobAsync',
  async ({ jobId, notes = '' }, { rejectWithValue }) => {
    try {
      const data = await jobService.applyToJob(jobId, notes);
      return { jobId, ...data };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to submit application';
      return rejectWithValue(msg);
    }
  }
);

const initialState = {
  jobs: [],
  selectedJob: null,
  filters: {
    search: '',
    company: '',
    location: '',
    experience: 'All',
    type: 'All',
  },
  jobAtsResult: null,
  isLoading: false,
  isMatching: false,
  isApplying: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        company: '',
        location: '',
        experience: 'All',
        type: 'All',
      };
    },
    clearJobAtsResult: (state) => {
      state.jobAtsResult = null;
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Jobs
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Job By Id
      .addCase(fetchJobById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Job ATS Match
      .addCase(checkJobMatchATS.pending, (state) => {
        state.isMatching = true;
        state.error = null;
      })
      .addCase(checkJobMatchATS.fulfilled, (state, action) => {
        state.isMatching = false;
        state.jobAtsResult = action.payload;
      })
      .addCase(checkJobMatchATS.rejected, (state, action) => {
        state.isMatching = false;
        state.error = action.payload;
      })
      // Apply To Job
      .addCase(applyToJobAsync.pending, (state) => {
        state.isApplying = true;
        state.error = null;
      })
      .addCase(applyToJobAsync.fulfilled, (state, action) => {
        state.isApplying = false;
        const jobId = action.payload.jobId;
        state.jobs = state.jobs.map((j) =>
          j.id === jobId ? { ...j, hasApplied: true } : j
        );
        if (state.selectedJob && state.selectedJob.id === jobId) {
          state.selectedJob.hasApplied = true;
        }
      })
      .addCase(applyToJobAsync.rejected, (state, action) => {
        state.isApplying = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearJobAtsResult, setSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
