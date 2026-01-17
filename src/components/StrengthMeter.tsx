import React from 'react';
import { PasswordStrength, getStrengthColor, getStrengthText } from '../utils/passwordStrength';
import { Info } from 'lucide-react';

interface StrengthMeterProps {
  strength: PasswordStrength;
}

const StrengthMeter: React.FC<StrengthMeterProps> = ({ strength }) => {
  const colorClass = getStrengthColor(strength.level);
  const text = getStrengthText(strength.level);

  return (
    <div className="w-full space-y-3 animate-fadeIn">
      {/* 强度条 */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            密码强度
          </span>
          <span className={`text-sm font-bold ${
            strength.level === 'weak' ? 'text-red-600 dark:text-red-400' :
            strength.level === 'fair' ? 'text-orange-600 dark:text-orange-400' :
            strength.level === 'good' ? 'text-yellow-600 dark:text-yellow-400' :
            'text-green-600 dark:text-green-400'
          }`}>
            {text} ({strength.score}/100)
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full ${colorClass} transition-all duration-500 ease-out rounded-full`}
            style={{ width: `${strength.score}%` }}
          />
        </div>
      </div>

      {/* 破解时间 */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Info className="w-4 h-4 shrink-0" />
        <span>预估破解时间: <span className="font-semibold">{strength.crackTime}</span></span>
      </div>

      {/* 改进建议 */}
      {strength.feedback.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {strength.feedback.map((feedback, index) => (
            <div
              key={index}
              className="text-sm px-3 py-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300"
            >
              {feedback}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StrengthMeter;
