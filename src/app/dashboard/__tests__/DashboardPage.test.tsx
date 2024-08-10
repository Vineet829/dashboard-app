import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../../store/store';
import Dashboard from '../page';


describe('Dashboard Component', () => {
  test('renders Dashboard component with correct elements', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );


    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart-title')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart-title')).toBeInTheDocument();
    expect(screen.getByTestId('data-table-title')).toBeInTheDocument();
    expect(screen.getByTestId('radar-chart-title')).toBeInTheDocument();
  });

  test('changes data filter on select', async () => {
    const handleDataFilterChange = jest.fn();

    render(
      <Provider store={store}>
        <Dashboard handleDataFilterChange={handleDataFilterChange} />
      </Provider>
    );

    const select = screen.getByLabelText('Select Data Filter');
    expect(select).toBeInTheDocument();

    await userEvent.click(select);

    const option = screen.getByRole('option', { name: '2021' });
    expect(option).toBeInTheDocument();

    await userEvent.click(option);

    expect(handleDataFilterChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ value: '2021', label: '2021' })
      ])
    );
  });
});
