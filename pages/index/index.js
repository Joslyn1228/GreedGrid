Page({
  data: {
    // 倒计时数据
    countdownDays: 0,
    countdownHours: 0,
    countdownMinutes: 0,
    
    // 购票预算弹窗数据
    showTicketModal: false,
    budgetAmount: '',
    
    // 抢票结果弹窗数据
    showResultModal: false,
    resultType: '', // 结果类型：'lowBudget' 或 'success'
    resultTitle: '抢票结果',
    resultMessage1: '恭喜你！',
    resultMessage2: '抢到了家里看台！',
    resultMessage3: '依旧直播间常客',
    
    // 新闻列表数据
    newsList: [
      {
        id: 1,
        title: "F1新赛季规则大改，或将带来更激烈的竞争",
        date: "2025-02-15"
      },
      {
        id: 2,
        title: "汉密尔顿测试新赛车，表现出色获车队赞赏",
        date: "2025-02-14"
      },
      {
        id: 3,
        title: "维斯塔潘确认与红牛续约至2028赛季",
        date: "2025-02-13"
      },
      {
        id: 4,
        title: "法拉利发布新车SF-25，红色涂装致敬经典",
        date: "2025-02-12"
      },
      {
        id: 5,
        title: "迈凯伦宣布新赛季车手阵容，诺里斯搭档皮亚斯特里",
        date: "2025-02-11"
      }
    ]
  },

  /**
   * 页面加载时的初始化
   */
  onLoad() {
    console.log('首页加载完成');
    // 初始化倒计时
    this.updateCountdown();
    // 设置定时器，每分钟更新一次倒计时
    this.countdownTimer = setInterval(() => {
      this.updateCountdown();
    }, 60000);
  },

  /**
   * 计算并更新倒计时
   */
  updateCountdown() {
    // 目标日期：2026年澳大利亚大奖赛时间
    const targetDate = new Date('2026-03-06T09:30:00+08:00');
    const now = new Date();
    
    // 计算时间差（毫秒）
    const timeDiff = targetDate - now;
    
    // 如果比赛已经开始，显示0
    if (timeDiff <= 0) {
      this.setData({
        countdownDays: 0,
        countdownHours: 0,
        countdownMinutes: 0
      });
      return;
    }
    
    // 计算剩余天数、小时和分钟
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    // 更新数据
    this.setData({
      countdownDays: days,
      countdownHours: hours,
      countdownMinutes: minutes
    });
  },

  /**
   * 跳转到赛程页面
   */
  navigateToSchedule() {
    wx.navigateTo({
      url: '/pages/schedule/schedule',
      success: () => {
        console.log('成功跳转到赛程页面');
      },
      fail: (err) => {
        console.error('跳转赛程页面失败:', err);
        this.showToast('该功能正在开发中');
      }
    });
  },

  /**
   * 跳转到积分榜页面
   */
  navigateToRanking() {
    wx.navigateTo({
      url: '/pages/ranking/ranking',
      success: () => {
        console.log('成功跳转到积分榜页面');
      },
      fail: (err) => {
        console.error('跳转积分榜页面失败:', err);
        this.showToast('该功能正在开发中');
      }
    });
  },

  /**
   * 跳转到资讯页面
   */
  navigateToNews() {
    this.showToast('该功能正在开发中');
  },

  /**
   * 跳转到车队页面
   */
  navigateToTeams() {
    this.showToast('该功能正在开发中');
  },
  
  /**
   * 跳转到车手页面
   */
  navigateToDriver() {
    wx.navigateTo({
      url: '/pages/driver/driver',
      success: () => {
        console.log('成功跳转到车手页面');
      },
      fail: (err) => {
        console.error('跳转车手页面失败:', err);
        this.showToast('该功能正在开发中');
      }
    });
  },

  /**
   * 跳转到抢票模拟器页面
   */
  navigateToTicketSimulator() {
    // 显示购票预算弹窗
    this.setData({
      showTicketModal: true,
      budgetAmount: ''
    });
  },

  /**
   * 关闭购票预算弹窗
   */
  closeTicketModal() {
    this.setData({
      showTicketModal: false,
      budgetAmount: ''
    });
  },

  /**
   * 预算输入处理
   */
  onBudgetInput(e) {
    const value = e.detail.value;
    // 只允许输入数字
    const numValue = value.replace(/[^0-9]/g, '');
    this.setData({
      budgetAmount: numValue
    });
  },

  /**
   * 确认预算
   */
  confirmBudget() {
    const budget = parseInt(this.data.budgetAmount);
    if (!budget || isNaN(budget)) {
      this.showToast('请输入有效的预算金额');
      return;
    }
    
    // 检查预算是否小于480元
    if (budget < 480) {
      this.showLowBudgetModal();
      this.closeTicketModal();
      return;
    }
    
    // 预算等于1580元的特殊处理
    if (budget === 1580) {
      const random = Math.random(); // 生成0-1之间的随机数
      
      if (random < 0.65) {
        // 65%概率：抢票失败
        this.ticketFailure();
      } else {
        // 35%概率：E看台
        this.setData({
          showResultModal: true,
          resultType: 'success',
          resultTitle: '抢票成功',
          resultMessage1: '恭喜你抢到了E看台！',
          resultMessage2: 'DRS区前的弯角！',
          resultMessage3: '限制开始准备行程吧！'
        });
      }
      this.closeTicketModal();
      return;
    }
    
    // 预算在480到1680之间（不包括1580），实现概率逻辑
    if (budget >= 480 && budget < 1680) {
      const random = Math.random(); // 生成0-1之间的随机数
      
      if (random < 0.76) {
        // 76%概率：抢票失败
        this.ticketFailure();
      } else if (random < 0.84) {
        // 8%概率：草地票C
        this.showSuccessModal('草地票C');
      } else if (random < 0.92) {
        // 8%概率：草地票F
        this.showSuccessModal('草地票F');
      } else {
        // 8%概率：草地票J
        this.showSuccessModal('草地票J');
      }
      this.closeTicketModal();
      return;
    }
    
    // 预算在1680到2180之间，实现概率逻辑
    if (budget >= 1680 && budget < 2180) {
      const random = Math.random(); // 生成0-1之间的随机数
      
      if (random < 0.70) {
        // 70%概率：抢票失败
        this.ticketFailure();
      } else if (random < 0.85) {
        // 15%概率：H看台
        this.setData({
          showResultModal: true,
          resultType: 'success',
          resultTitle: '抢票成功',
          resultMessage1: '恭喜你抢到了H看台！',
          resultMessage2: 'DRS末端超车看点！',
          resultMessage3: '开始准备行程吧！'
        });
      } else {
        // 15%概率：K看台
        this.setData({
          showResultModal: true,
          resultType: 'success',
          resultTitle: '抢票成功',
          resultMessage1: '恭喜你抢到了K看台！',
          resultMessage2: 'DRS末端弯角尽收眼底！',
          resultMessage3: '开始准备行程吧！'
        });
      }
      this.closeTicketModal();
      return;
    }
    
    // 预算在2180到2580之间，实现概率逻辑
    if (budget >= 2180 && budget < 2580) {
      const random = Math.random(); // 生成0-1之间的随机数
      
      if (random < 0.70) {
        // 70%概率：抢票失败
        this.ticketFailure();
      } else {
        // 30%概率：B看台
        this.setData({
          showResultModal: true,
          resultType: 'success',
          resultTitle: '抢票成功',
          resultMessage1: '恭喜你抢到了B看台！',
          resultMessage2: '最刺激的1号弯！',
          resultMessage3: '开始准备行程吧！'
        });
      }
      this.closeTicketModal();
      return;
    }
    
    // 预算在2580到3280之间，实现概率逻辑
    if (budget >= 2580 && budget < 3280) {
      const random = Math.random(); // 生成0-1之间的随机数
      
      if (random < 0.70) {
        // 70%概率：抢票失败
        this.ticketFailure();
      } else {
        // 30%概率：A下看台
        this.setData({
          showResultModal: true,
          resultType: 'success',
          resultTitle: '抢票成功',
          resultMessage1: '恭喜你抢到了A下看台！',
          resultMessage2: 'P房就在眼前！',
          resultMessage3: '开始准备行程吧！'
        });
      }
      this.closeTicketModal();
      return;
    }
    
    // 预算在3280到16900之间，实现概率逻辑
    if (budget >= 3280 && budget < 16900) {
      const random = Math.random(); // 生成0-1之间的随机数
      
      if (random < 0.70) {
        // 70%概率：抢票失败
        this.ticketFailure();
      } else {
        // 30%概率：A上看台
        this.setData({
          showResultModal: true,
          resultType: 'success',
          resultTitle: '抢票成功',
          resultMessage1: '恭喜你抢到了A上看台！',
          resultMessage2: '最佳观赏位！',
          resultMessage3: '开始准备行程吧！'
        });
      }
      this.closeTicketModal();
      return;
    }
    
    // 预算大于等于16900元，显示VIP包厢成功弹窗
    this.setData({
      showResultModal: true,
      resultType: 'success',
      resultTitle: '抢票成功',
      resultMessage1: '太有实力了！',
      resultMessage2: 'VIP包厢一位！',
      resultMessage3: '开始准备行程吧！'
    });
    this.closeTicketModal();
  },
  
  /**
   * 抢票失败函数
   */
  ticketFailure() {
    // 显示自定义的抢票结果弹窗
    this.setData({
      showResultModal: true,
      resultType: 'success',
      resultTitle: '抢票结果',
      resultMessage1: '恭喜你！',
      resultMessage2: '抢到了家里看台！',
      resultMessage3: '依旧直播间常客'
    });
  },
  
  /**
   * 预算不足弹窗函数
   */
  showLowBudgetModal() {
    // 显示预算不足的弹窗
    this.setData({
      showResultModal: true,
      resultType: 'lowBudget',
      resultTitle: '预算提示',
      resultMessage1: '预算太少啦，在家看直播吧！',
      resultMessage2: '客厅、沙发和啤酒也能带来舒适的观赛体验~',
      resultMessage3: ''
    });
  },
  
  /**
   * 抢票成功弹窗函数
   */
  showSuccessModal(ticketType) {
    // 显示抢票成功的弹窗
    this.setData({
      showResultModal: true,
      resultType: 'success',
      resultTitle: '抢票成功',
      resultMessage1: `恭喜你抢到了${ticketType}！`,
      resultMessage2: '性价比之选！',
      resultMessage3: '开始准备行程吧！'
    });
  },

  /**
   * 关闭抢票结果弹窗
   */
  closeResultModal() {
    this.setData({
      showResultModal: false
    });
  },

  /**
   * 显示提示信息
   * @param {string} message - 提示内容
   */
  showToast(message) {
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    });
  },

  /**
   * 页面卸载时的清理
   */
  onUnload() {
    // 清除定时器，避免内存泄漏
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  }
});