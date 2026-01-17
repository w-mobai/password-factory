/**
 * 密码生成器工具
 * 使用 Web Crypto API 确保密码生成的随机性和安全性
 */

export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous?: boolean;
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// 易混淆字符
const AMBIGUOUS_CHARS = '0OIl1io';

/**
 * 使用 Web Crypto API 生成安全的随机数
 * @param max 最大值（不包含）
 * @returns 随机数
 */
function getSecureRandomNumber(max: number): number {
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  return randomBuffer[0] % max;
}

/**
 * 从字符串中随机选择一个字符
 * @param str 字符串
 * @returns 随机字符
 */
function getRandomChar(str: string): string {
  return str[getSecureRandomNumber(str.length)];
}

/**
 * 打乱数组（Fisher-Yates 算法）
 * @param array 数组
 * @returns 打乱后的数组
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = getSecureRandomNumber(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 生成密码
 * @param options 密码选项
 * @returns 生成的密码
 */
export function generatePassword(options: PasswordOptions): string {
  const {
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    excludeAmbiguous = false,
  } = options;

  // 构建字符集
  let charset = '';
  const requiredChars: string[] = [];

  if (includeUppercase) {
    let upper = UPPERCASE;
    if (excludeAmbiguous) {
      upper = upper.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
    }
    charset += upper;
    requiredChars.push(getRandomChar(upper));
  }

  if (includeLowercase) {
    let lower = LOWERCASE;
    if (excludeAmbiguous) {
      lower = lower.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
    }
    charset += lower;
    requiredChars.push(getRandomChar(lower));
  }

  if (includeNumbers) {
    let nums = NUMBERS;
    if (excludeAmbiguous) {
      nums = nums.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
    }
    charset += nums;
    requiredChars.push(getRandomChar(nums));
  }

  if (includeSymbols) {
    charset += SYMBOLS;
    requiredChars.push(getRandomChar(SYMBOLS));
  }

  // 如果没有选择任何字符类型，默认使用全部并确保每种类型都出现
  if (charset === '') {
    let upper = UPPERCASE;
    let lower = LOWERCASE;
    let nums = NUMBERS;
    
    if (excludeAmbiguous) {
      upper = upper.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
      lower = lower.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
      nums = nums.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
    }
    
    charset = upper + lower + nums + SYMBOLS;
    // 确保每种类型至少出现一次
    requiredChars.push(getRandomChar(upper));
    requiredChars.push(getRandomChar(lower));
    requiredChars.push(getRandomChar(nums));
    requiredChars.push(getRandomChar(SYMBOLS));
  }

  // 如果长度小于必需字符数，调整长度
  const finalLength = Math.max(length, requiredChars.length);

  // 生成剩余的随机字符
  const remainingLength = finalLength - requiredChars.length;
  const randomChars: string[] = [];
  
  for (let i = 0; i < remainingLength; i++) {
    randomChars.push(getRandomChar(charset));
  }

  // 合并并打乱字符
  const allChars = [...requiredChars, ...randomChars];
  const shuffled = shuffleArray(allChars);

  return shuffled.join('');
}

/**
 * 验证密码选项
 * @param options 密码选项
 * @returns 是否有效
 */
export function validatePasswordOptions(options: PasswordOptions): boolean {
  const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = options;
  
  // 检查是否至少选择了一个字符类型
  if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
    return false;
  }

  // 检查长度是否在合理范围内
  if (length < 4 || length > 128) {
    return false;
  }

  return true;
}

/**
 * 获取默认密码选项
 * @returns 默认选项
 */
export function getDefaultPasswordOptions(): PasswordOptions {
  return {
    length: 16,
    includeUppercase: false,
    includeLowercase: false,
    includeNumbers: false,
    includeSymbols: false,
    excludeAmbiguous: false,
  };
}
