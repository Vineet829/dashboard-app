"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { mockData } from "../../data/mockData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import DataTable from "../../components/tables/DataTable";
import styles from "./Dashboard.module.css";
import Settings from "../settings/page";
import { DataItem } from "../../types/data";
import Link from 'next/link';

interface DashboardProps {
  handleDataFilterChange?: (selectedOptions: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ handleDataFilterChange }) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [dataFilter, setDataFilter] = useState<string[]>([]);

  
  
  const dispatch = useDispatch();
  const showBarChart = useSelector((state: RootState) => state.settings.showBarChart);
  const showLineChart = useSelector((state: RootState) => state.settings.showLineChart);
  const showDataTable = useSelector((state: RootState) => state.settings.showDataTable);
  const showComposedChart = useSelector((state: RootState) => state.settings.showComposedChart);
  const showRadarChart = useSelector((state: RootState) => state.settings.showRadarChart);
  const showPieChart = useSelector((state: RootState) => state.settings.showPieChart);

  useEffect(() => {
    setData(mockData);
    setFilteredData(mockData);
  }, []);

  useEffect(() => {
    try {
      const filtered = data.map((item) => {
        const newItem = { ...item };
        if (dataFilter.length === 0) return newItem;

        Object.keys(newItem).forEach((key) => {
          if (!dataFilter.includes(key) && key !== "name") {
            delete newItem[key as keyof DataItem];
          }
        });
        return newItem;
      });

      setFilteredData(filtered);
    } catch (error) {
      console.error("Error filtering data:", error);
    }
  }, [dataFilter, data]);

  const handleFilterChange = (selectedOptions: any) => {
    if (handleDataFilterChange) {
      handleDataFilterChange(selectedOptions);
    }
    const selectedDataFilter = selectedOptions.map((option: any) => option.value);
    setDataFilter(selectedDataFilter);
  };

  const tableData = filteredData.map((item) => [
    item.name,
    item["2019"]?.toString() || "",
    item["2020"]?.toString() || "",
    item["2021"]?.toString() || "",
    item["2022"]?.toString() || "",
  ]);

  const pieData = filteredData.map((item) => ({
    name: item.name,
    value: Object.values(item).reduce((acc, val) => acc + (typeof val === "number" ? val : 0), 0),
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className={styles.dashboardContainer}>
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
          <Link href="/" passHref>
            <button className="dashboard-button">
              Home
            </button>
          </Link>
        </header>

        <div className={styles.widgetsContainer}>
          {showBarChart && (
            <div className={styles.widget}>
              <h3 data-testid="bar-chart-title">Bar Chart</h3>
              <div className={styles.widgetChart}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="2020" fill="#8884d8" />
                    <Bar dataKey="2019" fill="#82ca9d" />
                    <Bar dataKey="2021" fill="#ffc658" />
                    <Bar dataKey="2022" fill="#ff7300" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {showLineChart && (
            <div className={styles.widget}>
              <h3 data-testid="line-chart-title">Line Chart</h3>
              <div className={styles.widgetChart}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="2020" stroke="#8884d8" />
                    <Line type="monotone" dataKey="2019" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="2021" stroke="#ffc658" />
                    <Line type="monotone" dataKey="2022" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {showComposedChart && (
            <div className={styles.widget}>
              <h3 data-testid="composed-chart-title">Composed Chart</h3>
              <div className={styles.widgetChart}>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="2020" fill="#8884d8" />
                    <Line type="monotone" dataKey="2019" stroke="#82ca9d" />
                    <Bar dataKey="2021" fill="#ffc658" />
                    <Line type="monotone" dataKey="2022" stroke="#ff7300" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {showRadarChart && (
            <div className={styles.widget}>
              <h3 data-testid="radar-chart-title">Radar Chart</h3>
              <div className={styles.widgetChart}>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={filteredData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Radar name="2019" dataKey="2019" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Radar name="2020" dataKey="2020" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="2021" dataKey="2021" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                    <Radar name="2022" dataKey="2022" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {showPieChart && (
            <div className={styles.widget}>
              <h3 data-testid="pie-chart-title">Pie Chart</h3>
              <div className={styles.widgetChart}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {showDataTable && (
            <div className={styles.widget}>
              <h3 data-testid="data-table-title">Data Table</h3>
              <DataTable data={{ headers: ["Month", "2019", "2020", "2021", "2022"], rows: tableData }} />
            </div>
          )}
        </div>
      </main>
      <aside className={styles.settings}>
        <Settings dataFilter={dataFilter} handleDataFilterChange={handleFilterChange} />
      </aside>
    </div>
  );
};

export default Dashboard;
