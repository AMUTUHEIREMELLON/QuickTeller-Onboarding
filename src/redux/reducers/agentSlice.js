import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { paypointUrl } from '../../helpers/config';
// const baseServicesURL = 'https://services.interswitchug.com/paypoint_test/api';

const initialState = {
    agentDetails: {},
    isLoading: false,
    error: null,
};
export const findAgent = createAsyncThunk('agent/findAgent',
    async (terminalId, thunkAPI) => {
        try {
            const res = await axios.get(
                `${paypointUrl}/AgentApplic/GetByTerminalId`,
                {
                    params: {
                        terminalId
                    },
                    headers: {
                        Accept: '*/*',
                    },
                }
            );
            console.log(res)
            console.info(res.data)
            return res.data;
        } catch (error) {
            if (error.response) {
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
            }
            else if (error.request) {
                console.error(error.request)
            }
            else {
                console.error('Error', error.message)
            }
            // return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

const agentSlice = createSlice({
    name: 'agent',
    initialState,
    reducers: {
        clearAgentDetails: (state) => {
            state.agentDetails = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(findAgent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(findAgent.fulfilled, (state, action) => {
                if (
                    parseInt(action.payload.code) === 9000 &&
                    action.payload.response.TerminalId !== null
                ) {
                    state.agentDetails = { ...action.payload.response }
                    state.isLoading = false;
                }
                else {
                    console.log(action.payload)
                }
                // console.log('Tebizze!!')
                // state.isLoading = false;
                // state.agentDetails = action.payload;
            })
            .addCase(findAgent.rejected, (state, action) => {
                // console.log('Biganye!!')
                state.isLoading = false
                state.error = action.payload
            });
    },
});
export const { clearAgentDetails } = agentSlice.actions

export default agentSlice.reducer;