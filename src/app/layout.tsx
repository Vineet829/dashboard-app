"use client";

import React from 'react';
import { Provider } from 'react-redux';
import  store  from '../store/store';
import '../styles/globals.css';


interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
            {children}
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
