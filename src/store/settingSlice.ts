import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  showBarChart: boolean;
  showLineChart: boolean;
  showDataTable: boolean;
  showRadarChart: boolean;
  showComposedChart: boolean;
  showPieChart: boolean;
}

const initialState: SettingsState = {
  showBarChart: true,
  showLineChart: true,
  showDataTable: true,
  showRadarChart: true,
  showComposedChart: true,
  showPieChart: true,
};

const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setShowBarChart: (state, action: PayloadAction<boolean>) => {
      state.showBarChart = action.payload;
    },
    setShowLineChart: (state, action: PayloadAction<boolean>) => {
      state.showLineChart = action.payload;
    },
    setShowDataTable: (state, action: PayloadAction<boolean>) => {
      state.showDataTable = action.payload;
    },
    setShowRadarChart: (state, action: PayloadAction<boolean>) => {
      state.showRadarChart = action.payload;
    },
    setShowComposedChart: (state, action: PayloadAction<boolean>) => {
      state.showComposedChart = action.payload;
    },
    setShowPieChart: (state, action: PayloadAction<boolean>) => {
      state.showPieChart = action.payload;
    },
  },
});

export const {
  setShowBarChart,
  setShowLineChart,
  setShowDataTable,
  setShowRadarChart,
  setShowComposedChart,
  setShowPieChart,
} = settingSlice.actions;

export default settingSlice.reducer;
