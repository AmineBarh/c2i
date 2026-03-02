import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white/80">
      <Loader2 className="h-12 w-12 animate-spin text-bluec2i-500" />
    </div>
  );
};

export default Loading;
