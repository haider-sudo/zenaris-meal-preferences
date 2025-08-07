import { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  theme?: 'green' | 'yellow' | 'red';
}

export function CustomDropdown({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option",
  className = "",
  theme = "green"
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find(opt => opt.value === value) || null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const option = options.find(opt => opt.value === value);
    setSelectedOption(option || null);
  }, [value, options]);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  const themeClasses = {
    green: {
      button: "border-green-200 hover:border-green-300 focus:border-green-400 focus:ring-green-100",
      dropdown: "border-green-200 bg-white shadow-lg",
      option: "hover:bg-green-50 text-gray-800",
      optionSelected: "bg-green-100 text-green-800 border-l-green-500",
      optionHover: "bg-green-50"
    },
    yellow: {
      button: "border-yellow-200 hover:border-yellow-300 focus:border-yellow-400 focus:ring-yellow-100",
      dropdown: "border-yellow-200 bg-white shadow-lg",
      option: "hover:bg-yellow-50 text-gray-800",
      optionSelected: "bg-yellow-100 text-yellow-800 border-l-yellow-500",
      optionHover: "bg-yellow-50"
    },
    red: {
      button: "border-red-200 hover:border-red-300 focus:border-red-400 focus:ring-red-100",
      dropdown: "border-red-200 bg-white shadow-lg",
      option: "hover:bg-red-50 text-gray-800",
      optionSelected: "bg-red-100 text-red-800 border-l-red-500",
      optionHover: "bg-red-50"
    }
  };

  const currentTheme = themeClasses[theme];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 border-2 rounded-xl bg-white text-left text-gray-800 cursor-pointer transition-all duration-200 appearance-none bg-no-repeat bg-right pr-10 ${currentTheme.button}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundSize: '1.5em 1.5em'
        }}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </button>

      {isOpen && (
        <div className={`absolute z-50 w-full mt-1 border-2 rounded-lg ${currentTheme.dropdown} max-h-60 overflow-y-auto`}>
          {options.map((option, index) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={`px-4 py-3 cursor-pointer transition-all duration-200 border-l-4 border-transparent ${
                selectedOption?.value === option.value 
                  ? currentTheme.optionSelected 
                  : currentTheme.option
              } hover:${currentTheme.optionHover} first:rounded-t-lg last:rounded-b-lg`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 