import { createSlice } from '@reduxjs/toolkit';




const formDataSlice = createSlice({
  name: 'formData',
  initialState: {
    newAgent: {},
    existingAgent: {},
  },
  reducers: {
    addNewAgentFormData: (state, action) => {
      state.newAgent = { ...state.newAgent, ...action.payload };
    },
    addExistingAgentFormData: (state, action) => {
      state.existingAgent = { ...state.existingAgent, ...action.payload };
    },
    clearNewAgentFormData: (state) => {
      state.newAgent = {};
    },
    clearExistingAgentFormData: (state) => {
      state.existingAgent = {};
    },
  },
});

export const {
  addNewAgentFormData,
  addExistingAgentFormData,
  clearNewAgentFormData,
  clearExistingAgentFormData,
} = formDataSlice.actions;

export default formDataSlice.reducer;
