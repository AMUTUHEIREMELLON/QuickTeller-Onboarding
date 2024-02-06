import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  dateText: '',
  dob: '',
  agentName: '',
  gender: '',
  snackbarMessage: '',
  snackbarVisible: false,
  isLoading: false,
  error: null,
  data: null,
  requestReference: 100,
};

export const fetchSmileData = createAsyncThunk(
    'smileData/fetchSmileData',
    async (smileData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'https://api.smileidentity.com/v1/id_verification',
                smileData,
                {
                    headers: {
                        Accept: '*/*',
                    },
                }
            );

            return response.data;
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const validationError = {
          type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
          title: 'One or more validation errors occurred.',
          status: 400,
          traceId: error.response.data.traceId,
          errors: {},
        };

        // Check for "Nin" field error
        if (error.response.data.errors.Nin) {
          validationError.errors.Nin = error.response.data.errors.Nin;
        }

        // Check for "PhoneNumber" field error
        if (error.response.data.errors.PhoneNumber) {
          validationError.errors.PhoneNumber =
            error.response.data.errors.PhoneNumber;
        }

        // Check for "RequestReference" field error
        if (error.response.data.errors.RequestReference) {
          validationError.errors.RequestReference =
            error.response.data.errors.RequestReference;
        }

        console.error('Validation Error:', validationError);
        return rejectWithValue(validationError);
      } else if (error.response) {
        console.error('RES ERROR:', error.response.data);
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        console.error('REQ ERROR:', error.request);
        return rejectWithValue(error.request);
      } else {
        console.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

// export const fetchSmileData = createAsyncThunk(
//     'smileData/fetchSmileData',
//     async (smileData, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(
//                 'https://services.interswitchug.com/kycservices/Identity/identity_verification',
//                 smileData,
//                 {
//                     headers: {
//                         Accept: '*/*',
//                     },
//                 }
//             );

//             return response.data;
//         } catch (error) {
//             if (error.response) {
//                 console.error('RES ERROR:', error.response.data);
//                 return rejectWithValue(error.response.data);
//             } else if (error.request) {
//                 console.error('REQ ERROR:', error.request);
//                 return rejectWithValue(error.request);
//             } else {
//                 console.error(error.message);
//                 return rejectWithValue(error.message);
//             }
//         }

//     }
// );

const smileDataSlice = createSlice({
  name: 'smileData',
  initialState: {
    dob: '',
    dateText: '',
    agentName: '',
    gender: '',
    snackbarMessage: '',
    snackbarVisible: false,
    isLoading: false,
    error: null,
    requestReference: 100,
  },
  reducers: {
    clearNinDetails: (state) => {
      state.dob = '';
      state.dateText = '';
      state.agentName = '';
      state.gender = '';
      state.snackbarMessage = '';
      state.snackbarVisible = false;
      state.isLoading = false;
      state.error = null;
    },
    setDob: (state, action) => {
      state.dob = action.payload;
    },
    setDateText: (state, action) => {
      state.dateText = action.payload;
    },
    setAgentName: (state, action) => {
      state.agentName = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setSnackbarMessage: (state, action) => {
      state.snackbarMessage = action.payload;
    },
    setSnackbarVisible: (state, action) => {
      state.snackbarVisible = action.payload;
    },
    setRequestReference: (state, action) => {
        state.requestReference = action.payload;
      },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSmileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSmileData.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.responseCode === 90000) {
          state.dob = action.payload.response.result.dateOfBirth;
          state.dateText = new Date(state.dob).toLocaleDateString();
          state.agentName = action.payload.response.result.name;
          state.gender = action.payload.response.result.gender;
        } else {
          state.snackbarMessage = action.payload.response.responseMessage;
          state.snackbarVisible = true;
          state.error = action.payload.response.responseMessage;
        }
      })
      .addCase(fetchSmileData.rejected, (state, action) => {
        state.isLoading = false;
        state.snackbarMessage = action.payload;
        state.snackbarVisible = true;
      });
  },
});

export const { setRequestReference } = smileDataSlice.actions;
export const { setSnackbarVisible, clearNinDetails, setDob } =
  smileDataSlice.actions;
export default smileDataSlice.reducer;
