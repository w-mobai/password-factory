import React from 'react';
import { RotateCcw } from 'lucide-react';
import { PasswordOptions as PasswordOptionsType, getDefaultPasswordOptions } from '../utils/passwordGenerator';

interface PasswordOptionsProps {
  options: PasswordOptionsType;
  onChange: (options: PasswordOptionsType) => void;
}

const PasswordOptions: React.FC<PasswordOptionsProps> = ({ options, onChange }) => {
  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...options, length: parseInt(e.target.value) });
  };

  const handleCheckboxChange = (key: Exclude<keyof PasswordOptionsType, 'length'>) => {
    onChange({ ...options, [key]: !options[key] });
  };

  const handleReset = () => {
    onChange(getDefaultPasswordOptions());
  };

  return (
    <div className="w-full space-y-6">
      {/* 重置按钮 */}
      <div className="flex justify-end">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          title="重置为默认设置"
        >
          <RotateCcw className="w-4 h-4" />
          <span>重置</span>
        </button>
      </div>

      {/* 密码长度 */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            密码长度
          </label>
          <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
            {options.length}
          </span>
        </div>
        <input
          type="range"
          min="8"
          max="64"
          value={options.length}
          onChange={handleLengthChange}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, rgb(249, 115, 22) 0%, rgb(249, 115, 22) ${((options.length - 8) / (64 - 8)) * 100}%, rgb(229, 231, 235) ${((options.length - 8) / (64 - 8)) * 100}%, rgb(229, 231, 235) 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
          <span>8</span>
          <span>64</span>
        </div>
      </div>

      {/* 字符类型 */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
          字符类型
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-orange-400 dark:hover:border-orange-500 transition-colors">
            <input
              type="checkbox"
              checked={options.includeUppercase}
              onChange={() => handleCheckboxChange('includeUppercase')}
              className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">大写字母</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 password-font">A-Z</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-orange-400 dark:hover:border-orange-500 transition-colors">
            <input
              type="checkbox"
              checked={options.includeLowercase}
              onChange={() => handleCheckboxChange('includeLowercase')}
              className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">小写字母</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 password-font">a-z</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-orange-400 dark:hover:border-orange-500 transition-colors">
            <input
              type="checkbox"
              checked={options.includeNumbers}
              onChange={() => handleCheckboxChange('includeNumbers')}
              className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">数字</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 password-font">0-9</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-orange-400 dark:hover:border-orange-500 transition-colors">
            <input
              type="checkbox"
              checked={options.includeSymbols}
              onChange={() => handleCheckboxChange('includeSymbols')}
              className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">特殊符号</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 password-font">!@#$%</div>
            </div>
          </label>
        </div>
      </div>

      {/* 高级选项 */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
          高级选项
        </label>
        <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-orange-400 dark:hover:border-orange-500 transition-colors">
          <input
            type="checkbox"
            checked={options.excludeAmbiguous}
            onChange={() => handleCheckboxChange('excludeAmbiguous')}
            className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">排除易混淆字符</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">例如: 0, O, I, l, 1</div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default PasswordOptions;
