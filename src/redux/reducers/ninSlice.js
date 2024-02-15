import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'react-native-uuid';

//   const randomRequestReference = uuidv4();

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
  NIN: '',
  phoneNumber: '',
  RequestReference: 678867,
};

export const fetchSmileData = createAsyncThunk(
  'smileData/fetchSmileData',
  async (smileData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://services.interswitchug.com/kycservices/Identity/identity_verification',
        smileData,
        {
          headers: {
            Accept: '*/*',
          },
        }
      );
      console.info('response here' ,response.data);

      return response.data;
    } catch (error) {
      console.info('error 1 ', error.response);
      // Handle network errors or other exceptions
      if (error.response && error.response.data.errors) {
        // const validationError = {
        //   title: 'One or more validation errors occurred.',

        // };

        // Check for "Nin" field error
        if (error.response.data.errors.Nin) {
          // validationError.errors.Nin = error.response.data.errors.Nin;
          console.info('nin error ', error.response);
        }

        // Check for "PhoneNumber" field error
        if (error.response.data.errors.PhoneNumber) {
          // validationError.errors.PhoneNumber = error.response.data.errors.PhoneNumber;
          console.info('phone error ', error.response);
        }

        // Check for "RequestReference" field error
        if (error.response.data.errors.RequestReference) {
          // validationError.errors.RequestReference = error.response.data.errors.RequestReference;
          console.info('ref error ', error.response);
        }

        // console.error('Validation Error:', validationError);
        return rejectWithValue('validationError');
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
      state.agentName = action.payload.response.name;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSmileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSmileData.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('Fetching ', action.payload)
        if (action.payload.responseCode === 90000) {

          if (action.payload.response.validationMode === 'nin') {

          state.dob = action.payload.FullData.dateOfBirth;
          state.dateText = new Date(state.dob).toLocaleDateString();
          state.agentName = action.payload.response.name;
          state.gender = action.payload.Gender;

        }if (action.payload.response.validationMode === 'phone') {

          // state.dob = action.payload.FullData.dateOfBirth;
          // state.dateText = new Date(state.dob).toLocaleDateString();
          state.agentName = action.payload.response.name;
          console.info('payload here', action.payload.response.name);
          // state.gender = action.payload.Gender;
        
        }else {
          state.snackbarMessage = 'action.payload.ResultText';
          state.snackbarVisible = true;
          state.error = 'action.payload.ResultTex';
        }
      }
      })
      .addCase(fetchSmileData.rejected, (state, action) => {
        state.isLoading = false;
        state.snackbarMessage = action.payload;
        state.snackbarVisible = true;
      });
  },
});

export const { setSnackbarVisible, clearNinDetails, setDob } =
  smileDataSlice.actions;
export default smileDataSlice.reducer;
