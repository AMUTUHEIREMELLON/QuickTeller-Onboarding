
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { makeSignature } from "../../helpers/makeSignature";

export const fetchSmileIdentityData = createAsyncThunk(
    'smileIdentity/fetchSmileData',
    async (payload, { rejectWithValue }) => {
    
          
        try {
            const signatureDetails = makeSignature();
            const smileData = {
                source_sdk: 'rest_api',
                source_sdk_version: '1.0.0',
                signature: signatureDetails.signature,
                timestamp: signatureDetails.timestamp,
                partner_params: {
                  user_id: 'INTS',
                  job_id: 'INT',
                  job_type: 5,
                },
                country: 'UG',
                id_type: 'NATIONAL_ID_NO_PHOTO',
                id_number: payload,
                partner_id: '2384',
              };

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
            if (error.response) {
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

const smileIdentitySlice = createSlice({
    name: 'smileIdentity',
    initialState: {
        smileStatus: 'idle',
        smileError: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase
            (fetchSmileIdentityData.pending, (state) => {
                state.smileStatus = 'loading';
            })
            .addCase(fetchSmileIdentityData.fulfilled, (state, action) => {
               
                if (action.payload.ResultCode === '1012') {
                    state.smileStatus = 'complete';
                } else {
                    state.smileStatus = 'failed';
                    state.error = action.payload.ResultText
                }
            })
            .addCase(fetchSmileIdentityData.rejected, (state, action) => {
                state.smileStatus = 'failed';
            })
    }
})

export default smileIdentitySlice.reducer