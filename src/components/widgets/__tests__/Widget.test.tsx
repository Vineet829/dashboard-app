import React from 'react';
import { render, screen } from '@testing-library/react';
import Widget from '../Widget';

describe('Widget Component', () => {
  test('renders Widget component with title and content', () => {
    render(<Widget title="Test Widget">Test Content</Widget>);

  
    expect(screen.getByText('Test Widget')).toBeInTheDocument();

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders Widget component with different title and content', () => {
    render(<Widget title="Another Widget">Different Content</Widget>);


    expect(screen.getByText('Another Widget')).toBeInTheDocument();

    
    expect(screen.getByText('Different Content')).toBeInTheDocument();
  });
});
