Page({
  data: {
    drivers: [
      { id: 2, number: '3', name: '马克斯·维斯塔潘', team: '红牛车队', photo: '/images/drivers/driver2.png', selected: false, picks: 0 },
      { id: 3, number: '23', name: '角田裕毅', team: '红牛车队', photo: '/images/drivers/driver3.png', selected: false, picks: 0 },
      { id: 6, number: '55', name: '卡洛斯·塞恩斯', team: '法拉利车队', photo: '/images/drivers/driver6.png', selected: false, picks: 0 },
      { id: 5, number: '16', name: '查尔斯·勒克莱尔', team: '法拉利车队', photo: '/images/drivers/driver5.png', selected: false, picks: 0 },
      { id: 1, number: '44', name: '刘易斯·汉密尔顿', team: '梅赛德斯车队', photo: '/images/drivers/driver1.png', selected: false, picks: 0 },
      { id: 4, number: '63', name: '乔治·拉塞尔', team: '梅赛德斯车队', photo: '/images/drivers/driver4.png', selected: false, picks: 0 },
      { id: 7, number: '4', name: '兰多·诺里斯', team: '迈凯伦车队', photo: '/images/drivers/driver7.png', selected: false, picks: 0 },
      { id: 8, number: '81', name: '奥斯卡·皮亚斯特里', team: '迈凯伦车队', photo: '/images/drivers/driver8.png', selected: false, picks: 0 },
      { id: 12, number: '14', name: '费尔南多·阿隆索', team: '阿斯顿·马丁', photo: '/images/drivers/driver12.png', selected: false, picks: 0 },
      { id: 11, number: '18', name: '兰斯·斯托尔', team: '阿斯顿·马丁', photo: '/images/drivers/driver11.png', selected: false, picks: 0 },
      { id: 9, number: '10', name: '皮埃尔·加斯利', team: '阿尔卑斯车队', photo: '/images/drivers/driver9.png', selected: false, picks: 0 },  
      { id: 10, number: '31', name: '埃斯特班·奥康', team: '阿尔卑斯车队', photo: '/images/drivers/driver10.png', selected: false, picks: 0 },
      { id: 18, number: '43', name: '弗朗科·克拉平托', team: '威廉姆斯车队', photo: '/images/drivers/driver18.png', selected: false, picks: 0 },
      { id: 16, number: '6', name: '伊萨克·哈贾尔', team: '红牛二队', photo: '/images/drivers/driver16.png', selected: false, picks: 0 },
      { id: 15, number: '30', name: '利亚姆·劳森', team: '红牛二队', photo: '/images/drivers/driver15.png', selected: false, picks: 0 },
      { id: 14, number: '27', name: '尼科·霍肯伯格', team: '索伯', photo: '/images/drivers/driver14.png', selected: false, picks: 0 },
      { id: 17, number: '87', name: '奥利弗·贝尔曼', team: '哈斯', photo: '/images/drivers/driver17.png', selected: false, picks: 0 },
      { id: 13, number: '5', name: '加布里埃·波托莱托', team: '索伯', photo: '/images/drivers/driver13.png', selected: false, picks: 0 },
      { id: 19, number: '23', name: '亚历山大·阿尔本', team: '威廉姆斯', photo: '/images/drivers/driver19.png', selected: false, picks: 0 },
      { id: 20, number: '12', name: '基米·安东内利', team: '梅赛德斯', photo: '/images/drivers/driver20.png', selected: false, picks: 0 }
    ],
    // 弹出卡片相关状态
    showPopup: false,
    currentDriver: null,
    newMessage: '',
    messages: [],
    showMessageList: false,
    // 剩余pick次数
    remainingPicks: 0
  },

  onLoad() {
    // 加载保存的车手pick数据
    this.loadDriverPicks();
    // 加载每日pick计数
    this.loadDailyPickCount();
    // 按pick数量排序车手
    this.sortDriversByPicks();
    // 初始化剩余pick次数
    const remainingPicks = this.getRemainingPicks();
    this.setData({ remainingPicks });
  },

  // 加载车手pick数据
  loadDriverPicks() {
    const savedPicks = wx.getStorageSync('driverPicks') || {};
    const drivers = this.data.drivers;
    
    drivers.forEach(driver => {
      if (savedPicks[driver.id]) {
        driver.picks = savedPicks[driver.id];
      }
    });
    
    this.setData({ drivers });
  },

  // 加载每日pick计数
  loadDailyPickCount() {
    const today = new Date().toDateString();
    const lastPickDate = wx.getStorageSync('lastPickDate');
    const dailyPickCount = wx.getStorageSync('dailyPickCount') || 0;
    
    // 如果不是同一天，重置每日pick计数
    if (lastPickDate !== today) {
      wx.setStorageSync('lastPickDate', today);
      wx.setStorageSync('dailyPickCount', 0);
    }
  },

  // 按pick数量排序车手
  sortDriversByPicks() {
    const drivers = this.data.drivers;
    drivers.sort((a, b) => b.picks - a.picks);
    this.setData({ drivers });
  },

  // 获取今日剩余pick次数
  getRemainingPicks() {
    const today = new Date().toDateString();
    const lastPickDate = wx.getStorageSync('lastPickDate');
    const dailyPickCount = lastPickDate === today ? wx.getStorageSync('dailyPickCount') || 0 : 0;
    return 5 - dailyPickCount;
  },

  // pick车手
  pickDriver(e) {
    const id = e.currentTarget.dataset.id;
    const today = new Date().toDateString();
    const lastPickDate = wx.getStorageSync('lastPickDate');
    let dailyPickCount = wx.getStorageSync('dailyPickCount') || 0;
    
    // 如果不是同一天，重置每日pick计数
    if (lastPickDate !== today) {
      dailyPickCount = 0;
      wx.setStorageSync('lastPickDate', today);
    }
    
    // 检查是否已达到每日pick限制
    if (dailyPickCount >= 5) {
      wx.showToast({
        title: '每日仅可pick 5次',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    const drivers = this.data.drivers;
    const driverIndex = drivers.findIndex(driver => driver.id === id);
    
    if (driverIndex !== -1) {
      // 如果已经selected，不能重复pick
      if (drivers[driverIndex].selected) {
        wx.showToast({
          title: '已经pick过这位车手',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      
      // 更新车手数据
      drivers[driverIndex].selected = true;
      drivers[driverIndex].picks += 1;
      
      // 更新每日pick计数
      dailyPickCount += 1;
      wx.setStorageSync('dailyPickCount', dailyPickCount);
      
      // 保存车手pick数据到本地存储
      const savedPicks = wx.getStorageSync('driverPicks') || {};
      savedPicks[id] = drivers[driverIndex].picks;
      wx.setStorageSync('driverPicks', savedPicks);
      
      // 按pick数量重新排序车手
      this.sortDriversByPicks();
      
      // 震动反馈
      wx.vibrateShort();
      
      // 更新剩余pick次数
      const remainingPicks = this.getRemainingPicks();
      this.setData({ remainingPicks });
      
      // 显示成功提示
      wx.showToast({
        title: 'Pick成功！',
        icon: 'success',
        duration: 1500
      });
    }
  },

  // 显示车手卡片
  showDriverCard(e) {
    // 确保id为数字类型
    const id = Number(e.currentTarget.dataset.id);
    // 直接通过index获取车手数据，避免find方法的潜在问题
    const driver = this.data.drivers[e.currentTarget.dataset.index];
    
    // 页面滚动到顶部，确保弹窗在用户第一眼可见
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
    
    this.setData({
      showPopup: true,
      currentDriver: driver,
      showMessageList: false,
      newMessage: ''
    });
    
    // 加载该车手的留言
    this.loadMessages(id);
  },

  // 隐藏车手卡片
  hideDriverCard() {
    this.setData({
      showPopup: false,
      currentDriver: null,
      showMessageList: false
    });
  },

  // 加载留言
  loadMessages(driverId) {
    const allMessages = wx.getStorageSync('driverMessages') || {};
    const messages = allMessages[driverId] || [];
    
    this.setData({ messages });
  },

  // 提交留言
  submitMessage() {
    const { currentDriver, newMessage } = this.data;
    
    if (!newMessage.trim()) {
      wx.showToast({
        title: '请输入留言内容',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    const message = {
      id: Date.now(),
      content: newMessage.trim(),
      date: new Date().toLocaleString()
    };
    
    // 保存留言到本地存储
    const allMessages = wx.getStorageSync('driverMessages') || {};
    if (!allMessages[currentDriver.id]) {
      allMessages[currentDriver.id] = [];
    }
    allMessages[currentDriver.id].push(message);
    wx.setStorageSync('driverMessages', allMessages);
    
    // 更新本地留言列表
    const messages = [...this.data.messages, message];
    this.setData({
      messages,
      newMessage: '',
      showMessageList: true
    });
    
    wx.showToast({
      title: '留言成功！',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换留言列表显示
  toggleMessageList() {
    this.setData({
      showMessageList: !this.data.showMessageList
    });
  },

  // 输入留言
  onInputMessage(e) {
    this.setData({
      newMessage: e.detail.value
    });
  }
});