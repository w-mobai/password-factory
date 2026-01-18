import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Moon, Sun } from 'lucide-react';
import PasswordDisplay from './components/PasswordDisplay';
import StrengthMeter from './components/StrengthMeter';
import PasswordOptions from './components/PasswordOptions';
import Toast from './components/Toast';
import {
  generatePassword,
  getDefaultPasswordOptions,
  validatePasswordOptions,
  PasswordOptions as PasswordOptionsType,
} from './utils/passwordGenerator';
import { evaluatePasswordStrength, PasswordStrength } from './utils/passwordStrength';

function App() {
  // 主题状态
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // 密码选项
  const [options, setOptions] = useState<PasswordOptionsType>(getDefaultPasswordOptions());

  // 密码和强度 - 默认显示一个示例密码以展示所有改进建议
  const [password, setPassword] = useState('AAAAAAAA');
  const [strength, setStrength] = useState<PasswordStrength>(
    evaluatePasswordStrength('AAAAAAAA')
  );

  // UI 状态
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // 应用深色模式
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // 生成新密码
  const handleGeneratePassword = useCallback(() => {
    // 检查选项是否有效，但不清空现有密码
    if (!validatePasswordOptions(options)) {
      // 如果选项无效，可以显示提示或者什么都不做
      console.warn('请至少选择一种字符类型');
      return;
    }

    setIsGenerating(true);
    // 添加短暂延迟以显示动画
    setTimeout(() => {
      const newPassword = generatePassword(options);
      setPassword(newPassword);
      setStrength(evaluatePasswordStrength(newPassword));
      setCopied(false);
      setIsGenerating(false);
    }, 100);
  }, [options]);

  // 初始不自动生成密码，使用默认示例密码展示所有改进建议
  // useEffect(() => {
  //   handleGeneratePassword();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // 复制密码
  const handleCopyPassword = useCallback(async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
      // 降级方案：使用传统方法
      const textArea = document.createElement('textarea');
      textArea.value = password;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setShowToast(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error('Fallback copy failed:', e);
      }
      document.body.removeChild(textArea);
    }
  }, [password]);

  // 切换主题
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Toast 通知 */}
      <Toast
        message="密码已复制到剪贴板"
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">🔐</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Password Factory
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  安全密码生成器
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={darkMode ? '切换到浅色模式' : '切换到深色模式'}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-8">
          {/* 密码显示区域 */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <PasswordDisplay
              password={password}
              onCopy={handleCopyPassword}
              copied={copied}
            />

            {/* 生成按钮 */}
            <div className="mt-6">
              <button
                onClick={handleGeneratePassword}
                disabled={isGenerating}
                className={`
                  w-full py-3 sm:py-4 px-6 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-orange-500 to-red-600
                  hover:from-orange-600 hover:to-red-700
                  disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
                  transform transition-all duration-200
                  hover:scale-[1.02] active:scale-[0.98]
                  shadow-lg hover:shadow-xl
                  flex items-center justify-center gap-2
                `}
              >
                <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? '生成中...' : '重新生成密码'}</span>
              </button>
              
              {/* 选项验证提示 */}
              {!validatePasswordOptions(options) && (
                <div className="mt-3 text-sm text-red-600 dark:text-red-400 text-center">
                  ⚠️ 请至少选择一种字符类型
                </div>
              )}
            </div>

            {/* 强度评估 */}
            <div className="mt-6">
              {password ? (
                <StrengthMeter strength={strength} />
              ) : (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                  点击"重新生成密码"按钮创建一个安全的密码
                </div>
              )}
            </div>
          </section>

          {/* 密码选项 */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              自定义选项
            </h2>
            <PasswordOptions options={options} onChange={setOptions} />
          </section>

          {/* 说明文字 */}
          <section className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">
                🔒 安全提示
              </h3>
              <ul className="space-y-2 text-sm text-orange-800 dark:text-orange-200">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>所有密码在您的浏览器本地生成，不会发送到服务器</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>使用 Web Crypto API 确保随机性和安全性</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>建议为不同的账户使用不同的密码</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>定期更换密码以保持账户安全</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>© 2026 Password Factory. 开源项目，完全免费使用。</p>
            <p className="mt-2">
              由 <span className="text-orange-600 dark:text-orange-400 font-semibold">Web Crypto API</span> 驱动
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
