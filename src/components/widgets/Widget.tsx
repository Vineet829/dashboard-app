"use client";

import React from 'react';

interface WidgetProps {
  title: string;
  children: React.ReactNode;
}


const Widget: React.FC<WidgetProps> = ({ title, children }) => {
  return (
    <div className="widget">
      <h2 className="widgetTitle">{title}</h2>
      <div className="widgetContent">{children}</div>
    </div>
  );
};

Widget.displayName = 'Widget'; 

export default Widget;
