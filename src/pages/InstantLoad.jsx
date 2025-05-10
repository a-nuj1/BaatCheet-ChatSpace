import React from 'react';

function InstantLoad() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f5f5f5',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#1976d2', marginBottom: '20px' }}>Welcome to Baatcheet!</h1>
        <p style={{ marginBottom: '30px' }}>Your chat experience is loading...</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="/login" style={{
            padding: '10px 20px',
            background: '#1976d2',
            color: 'white',
            borderRadius: '5px',
            textDecoration: 'none'
          }}>Login</a>
          <a href="/login" style={{
            padding: '10px 20px',
            border: '1px solid #1976d2',
            color: '#1976d2',
            borderRadius: '5px',
            textDecoration: 'none'
          }}>Sign Up</a>
        </div>
        <div style={{ marginTop: '40px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #1976d2',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p style={{ marginTop: '20px' }}>Hang tight! We're getting things ready</p>
        </div>
      </div>
    );
  }
  
export default InstantLoad;