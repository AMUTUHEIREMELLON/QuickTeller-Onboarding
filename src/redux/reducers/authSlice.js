import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resetUserData, storeData } from '../../helpers/LoginDetailsStorage';
import { paypointAxios } from '../../helpers/axiosConfig';

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ Username, Password }, thunkAPI) => {
    try {
      const res = await paypointAxios.post('/api/AppLogin/ValidateAppBSP', {
        Username,
        Password,
      });
      console.log(`Res.Data:`, res.data);
      return res.data;
    } catch (err) {
      console.error(err);
      // thunkAPI.dispatch(setMessage(err.response.data.message));
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    bspDetails: {},
    authenticated: '',
    isLoading: false,
    err: null,
  },
  reducers: {
    logout: (state, actions) => {
      resetUserData();
      state. bspDetails = {};
      state.authenticated = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        console.log('Action.Payload: ', action.payload);
        if (action.payload.Code === '90020') {
          console.info(action.payload.Message);
          state.authenticated = 'failedLogin';
          state.isLoading = false;
          state.err = action.payload.Message;
        }
        
        if (action.payload.code === '9000') {
          console.log('Success');
          let loginData = {
            InstName: action.payload.data.InstName,
            Recruiter: action.payload.data.Name,
            BranchId: action.payload.data.BranchId,
            UserName: action.payload.data.UserName,
            BranchName: action.payload.data.BranchName,
            InstitutionCode: action.payload.data.InstCode,
            UserId: action.payload.data.UserId,
            PersonResponsible: action.payload.data.UserId,
          };
          storeData(loginData);
          state.authenticated = 'true';
          state.bspDetails = loginData;
          state.isLoading = false;
          state.err = null;
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.authenticated = 'failed';
        state.err = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
