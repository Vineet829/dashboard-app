import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../store/store';
import Settings from '../page';


describe('Settings Component', () => {
  test('renders Settings component', () => {
    render(
      <Provider store={store}>
        <Settings dataFilter={[]} handleDataFilterChange={() => {}} />
      </Provider>
    );

    const settingsHeader = screen.getByText('Settings');
    expect(settingsHeader).toBeInTheDocument();
  });

  test('renders checkboxes for chart types', () => {
    render(
      <Provider store={store}>
        <Settings dataFilter={[]} handleDataFilterChange={() => {}} />
      </Provider>
    );


    const barChartCheckbox = screen.getByLabelText('Bar Chart');
    const lineChartCheckbox = screen.getByLabelText('Line Chart');
    const dataTableCheckbox = screen.getByLabelText('Data Table');
    const radarChartCheckbox = screen.getByLabelText('Radar Chart');

    expect(barChartCheckbox).toBeInTheDocument();
    expect(lineChartCheckbox).toBeInTheDocument();
    expect(dataTableCheckbox).toBeInTheDocument();
    expect(radarChartCheckbox).toBeInTheDocument();
  });
});
