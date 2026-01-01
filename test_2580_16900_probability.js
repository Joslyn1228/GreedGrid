// 测试2580-3280元和3280-16900元预算范围的概率分布
// 预期结果：70%失败，30%成功

// 模拟confirmBudget函数中的2580-3280元预算逻辑
function test2580_3280Probability(totalTests) {
  const results = {
    '抢票失败': 0,
    'A下看台': 0
  };

  // 执行多次测试
  for (let i = 0; i < totalTests; i++) {
    const random = Math.random();
    
    if (random < 0.70) {
      // 70%概率：抢票失败
      results['抢票失败']++;
    } else {
      // 30%概率：A下看台
      results['A下看台']++;
    }
  }

  // 计算百分比
  const percentages = {};
  for (const [key, value] of Object.entries(results)) {
    percentages[key] = ((value / totalTests) * 100).toFixed(2) + '%';
  }

  return percentages;
}

// 模拟confirmBudget函数中的3280-16900元预算逻辑
function test3280_16900Probability(totalTests) {
  const results = {
    '抢票失败': 0,
    'A上看台': 0
  };

  // 执行多次测试
  for (let i = 0; i < totalTests; i++) {
    const random = Math.random();
    
    if (random < 0.70) {
      // 70%概率：抢票失败
      results['抢票失败']++;
    } else {
      // 30%概率：A上看台
      results['A上看台']++;
    }
  }

  // 计算百分比
  const percentages = {};
  for (const [key, value] of Object.entries(results)) {
    percentages[key] = ((value / totalTests) * 100).toFixed(2) + '%';
  }

  return percentages;
}

// 运行测试（10000次）
const percentages2580_3280 = test2580_3280Probability(10000);
const percentages3280_16900 = test3280_16900Probability(10000);

// 验证结果是否符合预期
const expectedRanges = {
  '抢票失败': [69, 71],  // 预期70%左右
  'A下看台': [29, 31],     // 预期30%左右
  'A上看台': [29, 31]      // 预期30%左右
};

console.log('2580-3280元预算范围概率测试结果：');
console.log('结果分布：');
for (const [key, value] of Object.entries(percentages2580_3280)) {
  console.log(`${key}: ${value}`);
}

console.log('\n3280-16900元预算范围概率测试结果：');
console.log('结果分布：');
for (const [key, value] of Object.entries(percentages3280_16900)) {
  console.log(`${key}: ${value}`);
}

console.log('\n结果验证：');
console.log('2580-3280元范围：');
for (const key of ['抢票失败', 'A下看台']) {
  const actualPercent = parseFloat(percentages2580_3280[key]);
  const isInRange = actualPercent >= expectedRanges[key][0] && actualPercent <= expectedRanges[key][1];
  const status = isInRange ? '✓' : '✗';
  console.log(`${status} ${key}: ${actualPercent.toFixed(2)}% (预期范围: ${expectedRanges[key][0]}-${expectedRanges[key][1]}%)`);
}

console.log('\n3280-16900元范围：');
for (const key of ['抢票失败', 'A上看台']) {
  const actualPercent = parseFloat(percentages3280_16900[key]);
  const isInRange = actualPercent >= expectedRanges[key][0] && actualPercent <= expectedRanges[key][1];
  const status = isInRange ? '✓' : '✗';
  console.log(`${status} ${key}: ${actualPercent.toFixed(2)}% (预期范围: ${expectedRanges[key][0]}-${expectedRanges[key][1]}%)`);
}
