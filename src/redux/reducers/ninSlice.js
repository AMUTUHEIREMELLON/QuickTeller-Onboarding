import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    dateText: '',
    dob: '',
    agentName: '',
    gender: '',
    snackbarMessage: '',
    snackbarVisible: false,
    isLoading: false,
    error: null,
    data: null

}

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
    },
    extraReducers: (builder) => {
        builder
            .addCase
            (fetchSmileData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSmileData.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.ResultCode === '1012') {
                    state.dob = action.payload.FullData.dateOfBirth;
                    state.dateText = new Date(state.dob).toLocaleDateString();
                    state.agentName = action.payload.FullName;
                    state.gender = action.payload.Gender;
                } else {
                    state.snackbarMessage = action.payload.ResultText;
                    state.snackbarVisible = true;
                    state.error = action.payload.ResultText
                }
            })
            .addCase(fetchSmileData.rejected, (state, action) => {
                state.isLoading = false
                state.snackbarMessage = action.payload;
                state.snackbarVisible = true
            })
    }
})

export const { setSnackbarVisible, clearNinDetails , setDob} = smileDataSlice.actions
export default smileDataSlice.reducer