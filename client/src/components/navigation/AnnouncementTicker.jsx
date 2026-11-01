import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { TICKER_NOTICES } from '../../data/mockNotifications';

export const AnnouncementTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto advance notice every 6 seconds unless paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TICKER_NOTICES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TICKER_NOTICES.length) % TICKER_NOTICES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TICKER_NOTICES.length);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div
      className="announcement-ticker"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        fontSize: '0.8125rem'
      }}
      aria-label="Public Notices and Urgent Bulletins"
    >
      <div
        className="portal-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          paddingTop: '0.35rem',
          paddingBottom: '0.35rem'
        }}
      >
        {/* Ticker Badge */}
        <div
          style={{
            backgroundColor: 'var(--color-alert-red)',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.6875rem',
            padding: '3px 8px',
            borderRadius: '2px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            flexShrink: 0
          }}
        >
          <Megaphone size={12} aria-hidden="true" />
          <span>Latest Notices</span>
        </div>

        {/* Ticker Content Display */}
        <div
          style={{
            flex: '1 1 auto',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}
        >
          <span
            style={{
              color: 'var(--color-primary-navy)',
              fontWeight: 500,
              display: 'inline-block',
              transition: 'opacity 0.25s ease'
            }}
          >
            {TICKER_NOTICES[currentIndex]}
          </span>
        </div>

        {/* Action Controls: Prev, Pause/Play, Next, All Notices link */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flexShrink: 0
          }}
        >
          {/* Pause / Play */}
          <button
            type="button"
            onClick={togglePause}
            aria-label={isPaused ? 'Resume scrolling notices' : 'Pause scrolling notices'}
            title={isPaused ? 'Play' : 'Pause'}
            style={{
              background: '#F1F5F9',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              padding: '2px 5px',
              cursor: 'pointer',
              color: 'var(--color-dark-slate)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous notice"
            title="Previous Notice"
            style={{
              background: '#F1F5F9',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              padding: '2px 5px',
              cursor: 'pointer',
              color: 'var(--color-dark-slate)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ChevronLeft size={12} />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next notice"
            title="Next Notice"
            style={{
              background: '#F1F5F9',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              padding: '2px 5px',
              cursor: 'pointer',
              color: 'var(--color-dark-slate)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ChevronRight size={12} />
          </button>

          <span style={{ color: 'var(--color-border-dark)', margin: '0 2px' }}>|</span>

          {/* Link to all notifications */}
          <Link
            to="/notifications"
            style={{
              color: 'var(--color-gov-blue)',
              fontWeight: 600,
              fontSize: '0.75rem',
              textDecoration: 'none'
            }}
          >
            View All ({TICKER_NOTICES.length})
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTicker;

