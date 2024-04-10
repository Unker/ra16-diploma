import React, { useState } from 'react';

const Preloader = () => {
  const [isLoading] = useState(true);

  return (
    <div className={isLoading ? 'preloader' : ''}>
      Preloader
    </div>
  );
};

export default Preloader;
