import { Loader } from "lucide-react";

export const CustomLoader = () => {
  console.log("loading custom loader");
  return <Loader className="w-5 h-5 text-secondary-irish-green animate-spin" />;
};
