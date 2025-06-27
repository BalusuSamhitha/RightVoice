import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function FooterC() {
  return (
    <MDBFooter
      style={{
        height: '120px',
        marginTop: '101px',
        backgroundColor: '#111',
        color: '#FFD700',
        borderTop: '1px solid #FFD700',
      }}
      className="text-center d-flex flex-column justify-content-center align-items-center"
    >
      <p style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: '5px 0' }}>
        RightVoice
      </p>
      <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
        &copy; {new Date().getFullYear()} — All rights reserved
      </p>
    </MDBFooter>
  );
}
