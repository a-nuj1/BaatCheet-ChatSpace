import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { keyframes, styled } from '@mui/system';

// Keyframe animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { opacity: 0.6; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.6; transform: scale(0.95); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const progressAnimation = keyframes`
  0% { width: 0%; left: -10%; }
  20% { width: 20%; left: -10%; }
  80% { width: 90%; left: 30%; }
  100% { width: 0%; left: 100%; }
`;

// Styled components
const FloatingCircle = styled('div')({
  position: 'absolute',
  borderRadius: '50%',
  background: 'rgba(25, 118, 210, 0.1)',
  animation: `${float} 6s ease-in-out infinite`,
});

const DotGrid = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundImage: 'radial-gradient(rgba(25, 118, 210, 0.2) 1px, transparent 1px)',
  backgroundSize: '20px 20px',
});

function InstantLoad() {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(-45deg, #f5f5f5, #e3f2fd, #f5f5f5, #e3f2fd)',
      backgroundSize: '400% 400%',
      animation: `${gradient} 12s ease infinite`,
      textAlign: 'center',
      gap: '1.5rem',
      overflow: 'hidden',
    }}>
      {/* Background elements */}
      <DotGrid />
      <FloatingCircle style={{ width: '200px', height: '200px', top: '20%', left: '10%', animationDelay: '0s' }} />
      <FloatingCircle style={{ width: '150px', height: '150px', top: '60%', left: '70%', animationDelay: '1s' }} />
      <FloatingCircle style={{ width: '100px', height: '100px', top: '30%', left: '80%', animationDelay: '2s' }} />
      
      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '2rem',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
        backdropFilter: 'blur(8px)',
        animation: `${pulse} 3s ease infinite`,
        maxWidth: '90%',
      }}>
        {/* Animated Logo/Icon */}
        <div style={{
          position: 'relative',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <CircularProgress 
            size={80}
            thickness={3}
            variant="indeterminate"
            sx={{
              color: '#1976d2',
              position: 'absolute',
              animationDuration: '1200ms',
            }}
          />
          <div style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #1976d2, #2196f3)',
            borderRadius: '12px',
            transform: 'rotate(45deg)',
            animation: `${float} 3s ease-in-out infinite`,
          }} />
        </div>
        
        {/* Loading Text */}
        <div style={{ maxWidth: '300px' }}>
          <Typography variant="h5" sx={{ 
            color: '#1a237e',
            marginBottom: '0.5rem',
            fontWeight: 600,
            background: 'linear-gradient(90deg, #1976d2, #2196f3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Preparing Your Chat Space
          </Typography>
          <Typography variant="body2" sx={{ 
            color: '#5c6bc0',
            fontSize: '0.95rem',
            lineHeight: 1.6,
          }}>
            Just a moment while we set everything up for you...
          </Typography>
        </div>
        
        {/* Animated Progress Bar */}
        <div style={{
          width: '250px',
          height: '6px',
          background: 'rgba(25, 118, 210, 0.1)',
          borderRadius: '3px',
          marginTop: '1rem',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(25, 118, 210, 0), #1976d2, rgba(25, 118, 210, 0))',
            borderRadius: '3px',
            animation: `${progressAnimation} 2s ease-in-out infinite`,
          }}></div>
        </div>
        
        {/* Status indicators */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          marginTop: '1rem',
        }}>
          {['Security', 'Connection', 'Messages', 'UI'].map((item, index) => (
            <div key={item} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: `hsl(${210 + index * 30}, 80%, 60%)`,
                animation: `${pulse} ${1 + index * 0.5}s ease infinite`,
              }} />
              <Typography variant="caption" sx={{ 
                color: '#5c6bc0',
                fontSize: '0.7rem',
                fontWeight: 500,
              }}>
                {item}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer note */}
      <Typography variant="caption" sx={{ 
        position: 'absolute',
        bottom: '1.5rem',
        color: '#5c6bc0',
        fontSize: '0.75rem',
        opacity: 0.8,
      }}>
        {`Almost there... ${Math.floor(Math.random() * 90) + 10}% of users complete in under 5 seconds`}
      </Typography>
    </div>
  );
}

export default InstantLoad;