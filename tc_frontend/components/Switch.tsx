import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, disabled }) => {
  return (
    <label className={`relative inline-flex items-center cursor-pointer group ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={checked}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        disabled={disabled}
      />
      {/* Track */}
      <div className={`
        w-14 h-7 rounded-full transition-colors duration-300 ease-in-out flex items-center justify-between px-2 box-border
        ${checked ? 'bg-industrial-grey' : 'bg-gray-200 dark:bg-zinc-700'}
        border-2 border-transparent peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-industrial-grey/20
      `}>
        <span className={`text-[10px] font-bold text-white leading-none transition-all duration-300 ${checked ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
          是
        </span>
        <span className={`text-[10px] font-bold text-gray-500 dark:text-gray-400 leading-none transition-all duration-300 ${checked ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'}`}>
          否
        </span>
      </div>
      
      {/* Thumb */}
      <div className={`
        absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-300 cubic-bezier(0.4, 0.0, 0.2, 1)
        ${checked ? 'translate-x-3.5' : 'translate-x-0'}
        group-active:w-6
      `}></div>

      {label && (
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 select-none">
          {label}
        </span>
      )}
    </label>
  );
};
