import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="background-image" />
      <div className="overlay" />
      <header className="header">
        <h1 className="headline">Dashboard App</h1>
        <p className="subheadline">
        Visualize data, make informed decisions.


        </p>
      </header>
      <Link href="/dashboard" passHref>
        <button className="dashboard-button">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
};

export default HomePage;