import { Loader2 } from "lucide-react";

const BlockLoader = () => {
  return (
    <div className="absolute top-0 right-0 h-full w-full bg-slate-500/20 rounded-md flex items-center justify-center">
      <Loader2 className="animate-spin w-6 h-6 text-sky-700" />
    </div>
  );
};

export default BlockLoader;
