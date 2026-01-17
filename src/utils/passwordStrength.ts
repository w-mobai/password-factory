/**
 * 密码强度评估工具
 */

export interface PasswordStrength {
  score: number; // 0-100
  level: 'weak' | 'fair' | 'good' | 'strong'; // 弱、中、良、强
  feedback: string[]; // 改进建议
  crackTime: string; // 预估破解时间
}

// 常见密码黑名单（部分）
const COMMON_PASSWORDS = [
  'password', '123456', '12345678', 'qwerty', 'abc123',
  'monkey', '1234567', 'letmein', 'trustno1', 'dragon',
  'baseball', '111111', 'iloveyou', 'master', 'sunshine',
  'ashley', 'bailey', 'passw0rd', 'shadow', '123123',
  '654321', 'superman', 'qazwsx', 'michael', 'football'
];

// 键盘序列模式
const KEYBOARD_PATTERNS = [
  'qwerty', 'asdfgh', 'zxcvbn', '12345', 'qazwsx',
  'qwertyuiop', 'asdfghjkl', 'zxcvbnm'
];

/**
 * 计算密码长度得分
 * @param password 密码
 * @returns 得分 (0-30)
 */
function calculateLengthScore(password: string): number {
  const length = password.length;
  if (length < 8) return 0;
  if (length < 12) return 10;
  if (length < 16) return 20;
  if (length < 20) return 25;
  return 30;
}

/**
 * 计算字符多样性得分
 * @param password 密码
 * @returns 得分 (0-40)
 */
function calculateDiversityScore(password: string): number {
  let score = 0;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  if (hasLowercase) score += 10;
  if (hasUppercase) score += 10;
  if (hasNumbers) score += 10;
  if (hasSymbols) score += 10;

  return score;
}

/**
 * 计算复杂度得分
 * @param password 密码
 * @returns 得分 (0-30)
 */
function calculateComplexityScore(password: string): number {
  let score = 30;
  const lowerPassword = password.toLowerCase();

  // 检查是否在常见密码列表中
  if (COMMON_PASSWORDS.some(common => lowerPassword.includes(common))) {
    score -= 15;
  }

  // 检查键盘序列
  if (KEYBOARD_PATTERNS.some(pattern => lowerPassword.includes(pattern))) {
    score -= 10;
  }

  // 检查重复字符
  if (/(.)\1{2,}/.test(password)) {
    score -= 5;
  }

  // 检查连续数字
  if (/(?:012|123|234|345|456|567|678|789)/.test(password)) {
    score -= 5;
  }

  // 检查连续字母
  if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(password)) {
    score -= 5;
  }

  return Math.max(0, score);
}

/**
 * 计算密码熵
 * @param password 密码
 * @returns 熵值（bits）
 */
function calculateEntropy(password: string): number {
  let charsetSize = 0;
  
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32; // 常见特殊字符

  return Math.log2(Math.pow(charsetSize, password.length));
}

/**
 * 估算破解时间
 * @param entropy 熵值
 * @returns 破解时间描述
 */
function estimateCrackTime(entropy: number): string {
  // 假设每秒尝试 1000 亿次（现代 GPU）
  const attemptsPerSecond = 100000000000;
  const possibleCombinations = Math.pow(2, entropy);
  const secondsToCrack = possibleCombinations / (2 * attemptsPerSecond);

  if (secondsToCrack < 1) return '瞬间';
  if (secondsToCrack < 60) return '几秒';
  if (secondsToCrack < 3600) return '几分钟';
  if (secondsToCrack < 86400) return '几小时';
  if (secondsToCrack < 2592000) return '几天';
  if (secondsToCrack < 31536000) return '几个月';
  if (secondsToCrack < 3153600000) return '几年';
  if (secondsToCrack < 31536000000) return '几十年';
  if (secondsToCrack < 315360000000) return '几个世纪';
  return '数千年';
}

/**
 * 生成改进建议
 * @param password 密码
 * @param score 得分
 * @returns 建议列表
 */
function generateFeedback(password: string, score: number): string[] {
  const feedback: string[] = [];

  if (password.length < 12) {
    feedback.push('建议密码长度至少 12 位');
  }

  if (!/[a-z]/.test(password)) {
    feedback.push('建议添加小写字母');
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push('建议添加大写字母');
  }

  if (!/[0-9]/.test(password)) {
    feedback.push('建议添加数字');
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    feedback.push('建议添加特殊字符');
  }

  if (/(.)\1{2,}/.test(password)) {
    feedback.push('避免连续重复字符');
  }

  const lowerPassword = password.toLowerCase();
  if (COMMON_PASSWORDS.some(common => lowerPassword.includes(common))) {
    feedback.push('避免使用常见密码模式');
  }

  if (KEYBOARD_PATTERNS.some(pattern => lowerPassword.includes(pattern))) {
    feedback.push('避免使用键盘序列');
  }

  // 根据得分添加默认反馈
  if (feedback.length === 0) {
    if (score >= 80) {
      feedback.push('密码强度极佳！');
    } else if (score >= 60) {
      feedback.push('密码强度良好');
    } else if (score >= 40) {
      feedback.push('密码强度一般，建议增强');
    } else {
      feedback.push('密码强度较弱，建议优化');
    }
  }

  return feedback;
}

/**
 * 评估密码强度
 * @param password 密码
 * @returns 强度评估结果
 */
export function evaluatePasswordStrength(password: string): PasswordStrength {
  if (!password || password.length === 0) {
    return {
      score: 0,
      level: 'weak',
      feedback: ['请输入密码'],
      crackTime: '-',
    };
  }

  // 计算各项得分
  const lengthScore = calculateLengthScore(password);
  const diversityScore = calculateDiversityScore(password);
  const complexityScore = calculateComplexityScore(password);

  // 总分
  const totalScore = lengthScore + diversityScore + complexityScore;

  // 确定强度等级
  let level: PasswordStrength['level'];
  if (totalScore < 40) level = 'weak';
  else if (totalScore < 60) level = 'fair';
  else if (totalScore < 80) level = 'good';
  else level = 'strong';

  // 计算熵和破解时间
  const entropy = calculateEntropy(password);
  const crackTime = estimateCrackTime(entropy);

  // 生成反馈
  const feedback = generateFeedback(password, totalScore);

  return {
    score: totalScore,
    level,
    feedback,
    crackTime,
  };
}

/**
 * 获取强度等级对应的颜色
 * @param level 强度等级
 * @returns 颜色类名
 */
export function getStrengthColor(level: PasswordStrength['level']): string {
  const colors = {
    weak: 'bg-red-500',
    fair: 'bg-orange-500',
    good: 'bg-yellow-500',
    strong: 'bg-green-500',
  };
  return colors[level];
}

/**
 * 获取强度等级对应的文本
 * @param level 强度等级
 * @returns 文本
 */
export function getStrengthText(level: PasswordStrength['level']): string {
  const texts = {
    weak: '弱',
    fair: '中',
    good: '良',
    strong: '强',
  };
  return texts[level];
}
