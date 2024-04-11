import React, { useState } from 'react';
import s from './Preloader.module.css';

const Preloader = () => {
  const [isLoading] = useState(true);

  return (
    <div className={isLoading ? s.preloader : ''}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Preloader;
