import { useState } from 'react';

const Preloader = () => {
  const [isLoading] = useState(true);

  return (
    <div className={isLoading ? 'preloader' : ''}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Preloader;
