import React from 'react';
import { Outlet } from 'react-router-dom';
import TopUtilityBar from './TopUtilityBar';
import BrandingHeader from './BrandingHeader';
import Navbar from '../navigation/Navbar';
import AnnouncementTicker from '../navigation/AnnouncementTicker';
import Footer from './Footer';

export const Layout = () => {
  return (
    <div className="portal-app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Screen Reader Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Official Indian Tricolor Top Strip */}
      <div className="tricolor-strip" />

      {/* Top Utility Strip (Accessibility, Language, Screen Reader) */}
      <TopUtilityBar />

      {/* Main Branding Section (Emblem, Title, Subtitle, Helpline) */}
      <BrandingHeader />

      {/* Primary Navigation Bar (Navy Blue with Dropdowns & Mobile Drawer) */}
      <Navbar />

      {/* Announcement Ticker (Scrolling Government Notice Strip) */}
      <AnnouncementTicker />

      {/* Main Page Content */}
      <main
        id="main-content"
        tabIndex="-1"
        style={{
          flex: '1 0 auto',
          paddingBottom: '3rem',
          outline: 'none'
        }}
      >
        <Outlet />
      </main>

      {/* Official Government Portal Footer */}
      <Footer />
    </div>
  );
};

export default Layout;

