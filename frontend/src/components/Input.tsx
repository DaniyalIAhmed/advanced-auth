import type { ComponentType, InputHTMLAttributes, SVGProps } from "react";
type InputProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;
const Input = ({ icon: Icon, error, ...props }: InputProps) => {
  return (
    <div className="mb-5">
      <div className="relative ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="size-5 text-green-500" />
        </div>
        <input
          {...props}
          className=" py-2 w-full pl-10 pr-3 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition-all duration-200"
        />
      </div>
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
