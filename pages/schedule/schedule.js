Page({
  data: {
    races: [
      { id: 1, round: '01', name: '澳大利亚大奖赛', date: '2026-03-06', location: '墨尔本' },
      { id: 2, round: '02', name: '中国大奖赛', date: '2026-03-13', location: '上海' },
      { id: 3, round: '03', name: '日本大奖赛', date: '2026-03-27', location: '铃鹿' },
      { id: 4, round: '04', name: '巴林大奖赛', date: '2026-04-10', location: '萨基尔' },
      { id: 5, round: '05', name: '沙特阿拉伯大奖赛', date: '2026-04-17', location: '吉达' },
      { id: 6, round: '06', name: '迈阿密大奖赛', date: '2026-05-01', location: '迈阿密' },
      { id: 7, round: '07', name: '加拿大大奖赛', date: '2026-05-22', location: '蒙特利尔' },
      { id: 8, round: '08', name: '摩纳哥大奖赛', date: '2026-06-05', location: '摩纳哥' },
      { id: 9, round: '09', name: '西班牙大奖赛', date: '2026-06-12', location: '加泰罗尼亚' },
      { id: 10, round: '10', name: '奥地利大奖赛', date: '2026-06-26', location: '红牛环' },
      { id: 11, round: '11', name: '英国大奖赛', date: '2026-07-03', location: '银石' },
      { id: 12, round: '12', name: '比利时大奖赛', date: '2026-07-17', location: '斯帕' },
      { id: 12, round: '13', name: '匈牙利大奖赛', date: '2026-07-24', location: '布达佩斯' }, 
      { id: 14, round: '14', name: '荷兰大奖赛', date: '2026-08-21', location: '赞德沃特' },
      { id: 15, round: '15', name: '意大利大奖赛', date: '2026-09-04', location: '蒙扎' },
      { id: 13, round: '16', name: '西班牙大奖赛', date: '2026-09-11', location: '马德里' },
      { id: 16, round: '17', name: '阿塞拜疆大奖赛', date: '2026-09-25', location: '巴库' },
      { id: 17, round: '18', name: '新加坡大奖赛', date: '2026-10-09', location: '新加坡' },
      { id: 18, round: '19', name: '美国大奖赛', date: '2026-10-23', location: '奥斯汀' },
      { id: 19, round: '20', name: '墨西哥城大奖赛', date: '2026-10-30', location: '墨西哥城' },
      { id: 20, round: '21', name: '巴西大奖赛', date: '2026-11-06', location: '圣保罗' },
      { id: 21, round: '22', name: '拉斯维加斯大奖赛', date: '2026-11-19', location: '拉斯维加斯' },
      { id: 22, round: '23', name: '卡塔尔大奖赛', date: '2026-11-27', location: '卢塞尔' },
      { id: 22, round: '24', name: '阿布扎比大奖赛', date: '2026-12-04', location: '阿布扎比' }
    ]
  },

  onLoad() {
    // 页面加载时的初始化
  },

  // 跳转到日历页面
  navigateToCalendar(e) {
    const raceId = e.currentTarget.dataset.index + 1;
    wx.navigateTo({
      url: '/package-calendar/pages/calendar/calendar?raceId=' + raceId
    });
  }
});