// 测试2180-2580元预算范围的概率分布
// 预期结果：70%失败，30%B看台

// 模拟confirmBudget函数中的2180-2580元预算逻辑
function test2180_2580Probability(totalTests) {
  const results = {
    '抢票失败': 0,
    'B看台': 0
  };

  // 执行多次测试
  for (let i = 0; i < totalTests; i++) {
    const random = Math.random();
    
    if (random < 0.70) {
      // 70%概率：抢票失败
      results['抢票失败']++;
    } else {
      // 30%概率：B看台
      results['B看台']++;
    }
  }

  // 计算百分比
  const percentages = {};
  for (const [key, value] of Object.entries(results)) {
    percentages[key] = ((value / totalTests) * 100).toFixed(2) + '%';
  }

  // 输出结果
  console.log('2180-2580元预算范围概率测试结果：');
  console.log(`测试次数：${totalTests}`);
  console.log('结果分布：');
  for (const [key, value] of Object.entries(percentages)) {
    console.log(`${key}: ${value}`);
  }

  return percentages;
}

// 运行测试（10000次）
const percentages = test2180_2580Probability(10000);

// 验证结果是否符合预期
const expectedRanges = {
  '抢票失败': [69, 71],  // 预期70%左右
  'B看台': [29, 31]      // 预期30%左右
};

console.log('\n结果验证：');
for (const [key, value] of Object.entries(expectedRanges)) {
  const actualPercent = parseFloat(percentages[key]);
  const isInRange = actualPercent >= value[0] && actualPercent <= value[1];
  const status = isInRange ? '✓' : '✗';
  console.log(`${status} ${key}: ${actualPercent.toFixed(2)}% (预期范围: ${value[0]}-${value[1]}%)`);
}
