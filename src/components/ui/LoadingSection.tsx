import React from 'react';

const LoadingSection: React.FC = () => {
  return (
    <div className="py-20 flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-juvelina-gold"></div>
    </div>
  );
};

export default LoadingSection;