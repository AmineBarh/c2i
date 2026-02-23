import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-bluec2i-500" />
    </div>
  );
};

export default Loading;
