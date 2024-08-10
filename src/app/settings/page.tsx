"use client";


import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setShowBarChart,
  setShowLineChart,
  setShowDataTable,
  setShowRadarChart,
  setShowComposedChart,
  setShowPieChart,
} from "../../store/settingSlice";
import { RootState } from "../../store/store";
import styles from "./Settings.module.css"; // Import the CSS module
import Select from "react-select";
import { FaChartBar, FaChartLine, FaTable, FaLayerGroup, FaFilter, FaChartPie } from "react-icons/fa";
import { MdRadar } from "react-icons/md"; // Importing a radar chart icon

interface SettingsProps {
  dataFilter: string[];
  handleDataFilterChange: (selectedOptions: any) => void;
}

const Settings: React.FC<SettingsProps> = ({ dataFilter, handleDataFilterChange }) => {
  const dispatch = useDispatch();
  const showBarChart = useSelector((state: RootState) => state.settings.showBarChart);
  const showLineChart = useSelector((state: RootState) => state.settings.showLineChart);
  const showDataTable = useSelector((state: RootState) => state.settings.showDataTable);
  const showRadarChart = useSelector((state: RootState) => state.settings.showRadarChart);
  const showComposedChart = useSelector((state: RootState) => state.settings.showComposedChart);
  const showPieChart = useSelector((state: RootState) => state.settings.showPieChart);

  const handleWidgetVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    switch (name) {
      case "showBarChart":
        dispatch(setShowBarChart(checked));
        break;
      case "showLineChart":
        dispatch(setShowLineChart(checked));
        break;
      case "showDataTable":
        dispatch(setShowDataTable(checked));
        break;
      case "showRadarChart":
        dispatch(setShowRadarChart(checked));
        break;
      case "showComposedChart":
        dispatch(setShowComposedChart(checked));
        break;
      case "showPieChart":
        dispatch(setShowPieChart(checked));
        break;
      default:
        break;
    }
  };

  const filterOptions = [
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
  ];

  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
      color: "#333", // Change the text color of the dropdown menu
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? "#fff" : "#333", // Change the text color of the options
      backgroundColor: state.isSelected ? "#007bff" : "#fff", // Change background color on selection
    }),
  };

  return (
    <div className={styles.settings}>
      <h2>
        <FaFilter style={{ marginRight: "12px", marginLeft: "0px" }} size={20} />
        Settings
      </h2>
      <div className={styles.widgetVisibility}>
        <label>
          <FaChartBar style={{ marginRight: "8px" }} />
          <input
            type="checkbox"
            name="showBarChart"
            checked={showBarChart}
            onChange={handleWidgetVisibilityChange}
          />
          Bar Chart
        </label>
        <label>
          <FaChartLine style={{ marginRight: "8px" }} />
          <input
            type="checkbox"
            name="showLineChart"
            checked={showLineChart}
            onChange={handleWidgetVisibilityChange}
          />
          Line Chart
        </label>
        <label>
          <FaTable style={{ marginRight: "8px" }} />
          <input
            type="checkbox"
            name="showDataTable"
            checked={showDataTable}
            onChange={handleWidgetVisibilityChange}
          />
          Data Table
        </label>
        <label>
          <MdRadar style={{ marginRight: "8px" }} />
          <input
            type="checkbox"
            name="showRadarChart"
            checked={showRadarChart}
            onChange={handleWidgetVisibilityChange}
          />
          Radar Chart
        </label>
        <label>
          <FaLayerGroup style={{ marginRight: "8px" }} />
          <input
            type="checkbox"
            name="showComposedChart"
            checked={showComposedChart}
            onChange={handleWidgetVisibilityChange}
          />
          Composed Chart
        </label>
        <label>
          <FaChartPie style={{ marginRight: "8px" }} />
          <input
            type="checkbox"
            name="showPieChart"
            checked={showPieChart}
            onChange={handleWidgetVisibilityChange}
          />
          Pie Chart
        </label>
      </div>
      <div className={styles.dataFilterSelector}>
        <label htmlFor="dataFilter">
          <FaFilter style={{ marginRight: "8px" }} />
          Data Filter:
        </label>
        <Select
          id="dataFilter"
          isMulti
          options={filterOptions}
          value={filterOptions.filter((option) => dataFilter.includes(option.value))}
          onChange={handleDataFilterChange}
          styles={customStyles}
          aria-label="Select Data Filter"
        />
      </div>
    </div>
  );
};

export default Settings;
