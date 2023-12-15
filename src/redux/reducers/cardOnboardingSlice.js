
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import appAxios from "axios";
// import tokenAxios from "axios";
import { getDeviceId } from "../../helpers/util";
import { getAuthToken, getData, storeAuthToken } from "../../helpers/LoginDetailsStorage";
// import { iciUrl } from "../../helpers/config";
import { iciAxios, tokenICIAxios } from "../../helpers/axiosConfig";

const fetchAuthToken = async() => {
    
    const result = await tokenICIAxios.get(`/instantcard/api/authenticaterequest`,
        {
            headers: {
                Accept: '*/*',
            },
        }
    );

    return result.data;
}

tokenICIAxios.interceptors.request.use(async (config) => {
    const deviceId = await getDeviceId();
    const user = await getData();

    config.headers['deviceserial'] = deviceId;

    if(user) {
        // config.headers['terminalid'] = user.UserName;
        config.headers['terminalid'] = '2000WB005';
    }

    return config;
});

tokenICIAxios.interceptors.request.use(async (config) => {
    const token = await getAuthToken();
    const deviceId = await getDeviceId();
    const user = await getData();

    config.headers['deviceserial'] = deviceId;

    if(user) {
        config.headers['terminalid'] = user? user.UserName : '';
    }

    if(token) {
        config.headers['authkey'] = token
    }

    return config;
})

// appAxios.interceptors.response.use()

export const getIciToken =createAsyncThunk('ici/fetchToken', async (payload, {rejectWithValue}) => {
    try {
        const response = await fetchAuthToken();
        return response;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        } else if (error.request) {
            return rejectWithValue(error.request);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const postCardData = createAsyncThunk('ici/fetchSmileData', async (payload, { rejectWithValue }) => {
        try {
          
            const request = {
                "pan": payload.cardPan,
                "customerId": payload.phoneNumber,
                "tittle": payload.personTitle,
                "name": payload.givenName,
                "surname": payload.surname,
                "displayName": payload.displayName,
                "address1": payload.address1,
                "address2": payload.address2? payload.address2 : payload.nin,
                "email": "",
                "mobile": "0776400813",
                "branch": "KB0000001",
                "account1": "1201847012217",
                "accountType1": "10",
                "accountCurrency1": "800"
              }

            const response = await iciAxios.post(
                `/instantcard/api/issuecard`,
                request,
                {
                    headers: {
                        'deviceserial': deviceId,
                        'terminalId': user.username,
                    },
                }
            );

            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else if (error.request) {
                return rejectWithValue(error.request);
            } else {
                console.error(error.message);
                return rejectWithValue(error.message);
            }
        }
    }
);

const iciSlice = createSlice({
    name: 'ici',
    initialState: {
        tokenStatus: 'idle',
        onboardingStatus: 'idle'
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(postCardData.pending, (state) => {
                state.onboardingStatus = 'loading';
            })
            .addCase(postCardData.fulfilled, (state, action) => {
                if (action.payload.respCode === '00') {
                    state.onboardingStatus = 'complete';
                } else {
                    state.onboardingStatus = 'failed';
                    state.error = action.payload.respDescription;
                }
            })
            .addCase(postCardData.rejected, (state, action) => {
                state.onboardingStatus = 'failed';
            })
            .addCase(getIciToken.fulfilled, (state, action) => {
                if (action.payload.respCode === '00') {
                    state.tokenStatus = 'complete';
                   storeAuthToken(action.payload.authkey)
                } else {
                    state.error = action.payload.respDescription;
                }
                
            })
    }
})

export default iciSlice.reducer