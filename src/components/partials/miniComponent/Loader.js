import React from 'react';
import loader_img from '../../../assets/img/loader.svg';

const Loader = () => {
  return (
    <div style={{
      width: '100%',
      height: '250px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <img src={loader_img} alt='Loader' />
    </div>
  );
}

export default Loader;
