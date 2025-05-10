import React from 'react';
import { Grid, Stack } from "@mui/material";
import { keyframes, styled } from '@mui/system';

// Keyframe animations
const pulse = keyframes`
  0% { opacity: 0.6; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.6; transform: scale(0.95); }
`;

const wave = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled components
const AnimatedCard = styled('div')({
  height: '5rem',
  borderRadius: '12px',
  background: 'linear-gradient(-45deg, #f0f4ff, #e3f2fd, #f0f4ff)',
  backgroundSize: '400% 400%',
  animation: `${gradient} 6s ease infinite, ${pulse} 2s ease infinite`,
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    animation: `${wave} 1.5s linear infinite`,
  }
});

const CircleLoader = styled('div')(({ delay }) => ({
  width: '15px',
  height: '15px',
  borderRadius: '50%',
  background: 'linear-gradient(45deg, #1976d2, #2196f3)',
  animation: `${bounce} 0.8s ease infinite`,
  animationDelay: delay,
}));

const SidebarLoader = styled('div')({
  height: '100%',
  background: 'linear-gradient(-45deg, #f5f5f5, #e3f2fd, #f5f5f5)',
  backgroundSize: '400% 400%',
  animation: `${gradient} 8s ease infinite`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #1976d2, #2196f3)',
    animation: `${wave} 2s linear infinite`,
  }
});

export const LayoutLoader = () => {
  return (
    <Grid container height={"calc(100vh - 4rem)"} spacing={'1rem'}>
      {/* First Section - Animated Sidebar */}
      <Grid
        item
        sm={4}
        md={3}
        sx={{ display: { xs: "none", sm: "block" } }}
        height="100%"
        overflow="hidden"
      >
        <SidebarLoader>
          <Stack spacing={2} sx={{ padding: 2 }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.5rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(25, 118, 210, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: `${wave} 1.5s linear infinite`,
                  }
                }} />
                <div style={{
                  flex: 1,
                  height: '20px',
                  borderRadius: '4px',
                  background: 'rgba(25, 118, 210, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: `${wave} 1.5s linear infinite`,
                    animationDelay: '0.5s',
                  }
                }} />
              </div>
            ))}
          </Stack>
        </SidebarLoader>
      </Grid>

      {/* Second Section - Animated Cards */}
      <Grid item xs={12} sm={8} md={6} lg={6} height="100%" overflow="hidden">
        <Stack spacing={'1rem'} sx={{ padding: '1rem' }}>
          {[...Array(5)].map((_, i) => (
            <AnimatedCard key={i} style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
          
          {/* Special center loader */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
            margin: '2rem 0'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '8px solid rgba(25, 118, 210, 0.1)',
              borderTopColor: '#1976d2',
              animation: 'spin 1s linear infinite',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-8px',
                left: '-8px',
                right: '-8px',
                bottom: '-8px',
                borderRadius: '50%',
                border: '8px solid transparent',
                borderTopColor: '#2196f3',
                animation: 'spin 1.5s linear infinite reverse',
              }
            }} />
          </div>
          
          {[...Array(5)].map((_, i) => (
            <AnimatedCard key={i + 5} style={{ 
              animationDelay: `${i * 0.1 + 0.5}s`,
              background: 'linear-gradient(-45deg, #fff8e1, #ffecb3)'
            }} />
          ))}
        </Stack>
      </Grid>

      {/* Third Section - Animated Sidebar */}
      <Grid
        item
        xs={0}
        md={3}
        lg={3}
        height="100%"
        sx={{ display: { xs: "none", md: "block" } }}
        overflow="hidden"
      >
        <SidebarLoader>
          <div style={{
            padding: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem'
          }}>
            {[...Array(9)].map((_, i) => (
              <div key={i} style={{
                aspectRatio: '1/1',
                borderRadius: '8px',
                background: 'rgba(25, 118, 210, 0.1)',
                animation: `${pulse} 2s ease infinite`,
                animationDelay: `${i * 0.1}s`
              }} />
            ))}
          </div>
        </SidebarLoader>
      </Grid>
    </Grid>
  );
};

export const TypingLoader = () => {
  return (
    <Stack
      direction={'row'}
      spacing={'0.5rem'}
      justifyContent={'center'}
      padding={'0.5rem'}
      sx={{
        background: 'rgba(25, 118, 210, 0.1)',
        borderRadius: '24px',
        width: 'fit-content',
        margin: '0 auto'
      }}
    >
      {[0.1, 0.2, 0.3, 0.4].map((delay) => (
        <CircleLoader key={delay} delay={`${delay}s`} />
      ))}
    </Stack>
  )
}