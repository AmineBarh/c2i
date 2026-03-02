import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-greenc2i-500"></div>
      <p className="mt-4 text-lg text-blackc2i-600">Loading...</p>
    </div>
  );
};

export default Loading;
