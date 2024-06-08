import React from 'react';
import { DNA } from 'react-loader-spinner';

const Loader = ({ text }) => {
  const loaderStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
  };

  const textStyle = {
    marginTop: '10px',
    textAlign: 'center',
  };
  return (
    <div style={loaderStyle} className="dna-wrapper">
      <DNA
        visible={true}
        height="150"
        width="200"
        ariaLabel="dna-loading"
      />
      <div style={textStyle}>{text}</div>
    </div>
  );
};

export default Loader;
