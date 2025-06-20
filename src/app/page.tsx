"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const WelcomePage = () => {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f5f6fa'
    }}>
      <h1>Welcome to SuccessHers</h1>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <button
          style={{
            padding: '1rem 2rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: 'none',
            background: '#ff8c4f',
            color: '#fff',
            cursor: 'pointer'
          }}
          onClick={() => router.push('/questionnare')}>
          Take an Evaluation
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;