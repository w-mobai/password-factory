import React from 'react';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';

interface PasswordDisplayProps {
  password: string;
  onCopy: () => void;
  copied: boolean;
}

const PasswordDisplay: React.FC<PasswordDisplayProps> = ({ password, onCopy, copied }) => {
  const [visible, setVisible] = React.useState(true);

  return (
    <div className="w-full">
      <div className="relative group">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-[10px] p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700 transition-all hover:border-orange-400 dark:hover:border-orange-500">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className={`
                password-font text-lg sm:text-xl font-semibold
                ${visible ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-600'}
                break-all select-all
              `}>
                {visible ? (password || '点击生成密码') : '••••••••••••••••'}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setVisible(!visible)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                title={visible ? '隐藏密码' : '显示密码'}
              >
                {visible ? (
                  <Eye className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <EyeOff className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
              <button
                onClick={onCopy}
                disabled={!password}
                className={`
                  p-2 rounded-lg transition-all
                  ${copied 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed'
                  }
                  text-white
                `}
                title="复制密码"
              >
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordDisplay;
