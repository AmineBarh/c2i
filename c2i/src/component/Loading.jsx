import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <Loader2 className="w-12 h-12 text-bluec2i-500 animate-spin" />
    </div>
  );
};

export default Loading;
