// 模拟微信小程序的本地存储
const mockStorage = {};

// 模拟wx.getStorageSync
function wx_getStorageSync(key) {
  return mockStorage[key] || null;
}

// 模拟wx.setStorageSync
function wx_setStorageSync(key, value) {
  mockStorage[key] = value;
}

// 导入剩余pick次数的计算逻辑
function getRemainingPicks() {
  const today = new Date().toDateString();
  const lastPickDate = wx_getStorageSync('lastPickDate');
  const dailyPickCount = lastPickDate === today ? wx_getStorageSync('dailyPickCount') || 0 : 0;
  return 5 - dailyPickCount;
}

// 测试用例
console.log('=== 剩余Pick次数测试 ===');

// 测试1: 新的一天，还没有pick过
console.log('\n测试1: 新的一天，还没有pick过');
wx_setStorageSync('lastPickDate', 'Invalid Date'); // 设置一个无效日期模拟新的一天
wx_setStorageSync('dailyPickCount', 0);
let remaining = getRemainingPicks();
console.log(`剩余次数: ${remaining}`);
console.log(`测试1结果: ${remaining === 5 ? '通过' : '失败'}`);

// 测试2: 已经pick了1次
console.log('\n测试2: 已经pick了1次');
const today = new Date().toDateString();
wx_setStorageSync('lastPickDate', today);
wx_setStorageSync('dailyPickCount', 1);
remaining = getRemainingPicks();
console.log(`剩余次数: ${remaining}`);
console.log(`测试2结果: ${remaining === 4 ? '通过' : '失败'}`);

// 测试3: 已经pick了5次（达到上限）
console.log('\n测试3: 已经pick了5次（达到上限）');
wx_setStorageSync('dailyPickCount', 5);
remaining = getRemainingPicks();
console.log(`剩余次数: ${remaining}`);
console.log(`测试3结果: ${remaining === 0 ? '通过' : '失败'}`);

// 测试4: 超过5次（不应该发生，但测试边界情况）
console.log('\n测试4: 超过5次（不应该发生，但测试边界情况）');
wx_setStorageSync('dailyPickCount', 7);
remaining = getRemainingPicks();
console.log(`剩余次数: ${remaining}`);
console.log(`测试4结果: ${remaining === -2 ? '通过' : '失败'}`);

console.log('\n=== 所有测试完成 ===');
