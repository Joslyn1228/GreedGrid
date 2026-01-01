Page({
  data: {
    startY: 0,  // 触摸开始位置
    currentY: 0,  // 当前触摸位置
    distance: 0,  // 滑动距离
    scale: 1,  // Logo缩放比例
    rotate: 0,  // Logo旋转角度
    animationFinished: false  // 动画是否完成
  },

  onLoad() {
    // 页面加载时的初始化
    console.log('启动页加载完成');
  },

  // 触摸开始事件
  onTouchStart(e) {
    // 记录触摸开始位置
    this.setData({
      startY: e.touches[0].clientY
    });
  },

  // 触摸移动事件
  onTouchMove(e) {
    // 计算滑动距离
    const currentY = e.touches[0].clientY;
    const distance = this.data.startY - currentY;

    // 仅处理上划手势（distance > 0）
    if (distance > 0) {
      // 计算缩放比例（0.1 - 1.2之间）
      const scale = Math.min(1.2, 1 + distance * 0.001);
      // 计算旋转角度（0 - 5度之间）
      const rotate = Math.min(5, distance * 0.01);

      // 更新数据
      this.setData({
        currentY: currentY,
        distance: distance,
        scale: scale,
        rotate: rotate
      });
    }
  },

  // 触摸结束事件
  onTouchEnd(e) {
    // 如果滑动距离超过阈值（100px），则跳转首页
    if (this.data.distance > 100 && !this.data.animationFinished) {
      this.setData({
        animationFinished: true
      });
      
      // 震动反馈
      wx.vibrateShort();
      
      // 执行跳转动画
      this.animateToIndex();
    } else {
      // 否则恢复原状
      this.resetAnimation();
    }
  },

  // 执行跳转动画
  animateToIndex() {
    // 使用setTimeout模拟动画效果
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/index/index',
        success: () => {
          console.log('成功跳转到首页');
        },
        fail: (err) => {
          console.error('跳转失败:', err);
        }
      });
    }, 300);
  },

  // 恢复动画
  resetAnimation() {
    this.setData({
      scale: 1,
      rotate: 0,
      distance: 0
    });
  }
});