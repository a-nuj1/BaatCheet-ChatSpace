import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import { Box, Typography, Avatar, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsSearch, setIsNewGrp } from '../redux/reducers/extra';

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setIsSearch(true));
  };

  const handleNewGroup = () => {
    dispatch(setIsNewGrp(true));
  };

  return (
    <Box 
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        textAlign: 'center',
        backgroundColor: theme.palette.background.default
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}
      >
        <Avatar 
          sx={{ 
            width: 120, 
            height: 120,
            bgcolor: theme.palette.primary.main,
            mb: 2,
            fontSize: '3.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          💬
        </Avatar>
        
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 1,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Let's Baatcheet!
        </Typography>
        
        <Typography 
          variant="body1"
          sx={{ 
            color: theme.palette.text.secondary,
            mb: 4,
            lineHeight: 1.6
          }}
        >
          Start meaningful conversations with friends and groups.
          <br />
          Your chats will appear here when you have some.
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'center'
        }}>
          <Box 
            onClick={handleSearch}
            sx={{
              px: 4,
              py: 2,
              borderRadius: 2,
              bgcolor: theme.palette.action.hover,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: theme.palette.action.selected
              },
              transition: 'background-color 0.2s',
              width: '100%',
              maxWidth: 200,
              textAlign: 'center'
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Find Friends
            </Typography>
          </Box>
          
          <Box 
            onClick={handleNewGroup}
            sx={{
              px: 4,
              py: 2,
              borderRadius: 2,
              bgcolor: theme.palette.action.hover,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: theme.palette.action.selected
              },
              transition: 'background-color 0.2s',
              width: '100%',
              maxWidth: 200,
              textAlign: 'center'
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Create Group
            </Typography>
          </Box>
        </Box>
        
        <Typography 
          variant="caption"
          sx={{ 
            color: theme.palette.text.disabled,
            mt: 4,
            display: 'block'
          }}
        >
          Click the icons in the header for quick actions
        </Typography>
      </Box>
    </Box>
  );
}

export default AppLayout()(Home);