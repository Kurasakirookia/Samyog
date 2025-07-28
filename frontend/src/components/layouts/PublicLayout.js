import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from '../common/PublicHeader';
import Footer from '../common/Footer';

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <PublicHeader />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;