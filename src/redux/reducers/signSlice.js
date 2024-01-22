// reducers/signatureSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  capturedSignature: null,
  isLoading: false,
  error: null,
};

export const saveSignature = createAsyncThunk('signature/saveSignature', async (signature, thunkAPI) => {
  try {
    // You can perform any necessary logic here before saving the signature
    // For example, send the signature to a server

    return signature; // Return the signature to be stored in the state
  } catch (error) {
    console.error('Error saving signature:', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const signatureSlice = createSlice({
  name: 'signature',
  initialState,
  reducers: {
    clearCapturedSignature: (state) => {
      state.capturedSignature = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveSignature.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveSignature.fulfilled, (state, action) => {
        state.capturedSignature = action.payload;
        state.isLoading = false;
      })
      .addCase(saveSignature.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCapturedSignature } = signatureSlice.actions;

export default signatureSlice.reducer;
