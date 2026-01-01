Page({
  data: {
    currentRace: null,
    races: [
      {
        id: 1,
        round: '01',
        name: '澳大利亚大奖赛',
        date: '2026-03-06',
        location: '墨尔本',
        practice1: '2026-03-04 10:00',
        practice2: '2026-03-04 14:00',
        practice3: '2026-03-05 11:00',
        qualifying: '2026-03-05 14:00',
        race: '2026-03-06 13:00',
        circuit: {
          length: '5.303公里',
          laps: '58',
          distance: '307.574公里',
          fastestLap: '1:24.125 (刘易斯·汉密尔顿，2020)'
        }
      },
      {
        id: 2,
        round: '02',
        name: '沙特阿拉伯大奖赛',
        date: '2026-03-20',
        location: '吉达',
        practice1: '2026-03-18 21:00',
        practice2: '2026-03-19 00:00',
        practice3: '2026-03-19 21:00',
        qualifying: '2026-03-20 00:00',
        race: '2026-03-20 23:00',
        circuit: {
          length: '6.174公里',
          laps: '50',
          distance: '308.630公里',
          fastestLap: '1:30.734 (塞尔吉奥·佩雷兹，2023)'
        }
      },
      {
        id: 3,
        round: '03',
        name: '日本大奖赛',
        date: '2026-04-03',
        location: '铃鹿',
        practice1: '2026-04-01 13:00',
        practice2: '2026-04-01 16:00',
        practice3: '2026-04-02 12:00',
        qualifying: '2026-04-02 15:00',
        race: '2026-04-03 14:00',
        circuit: {
          length: '5.807公里',
          laps: '53',
          distance: '307.471公里',
          fastestLap: '1:28.140 (马克斯·维斯塔潘，2023)'
        }
      }
    ]
  },

  onLoad(options) {
    // 获取传递的raceId参数
    const raceId = options.raceId || 1;
    this.loadRaceDetails(raceId);
  },

  // 加载赛事详情
  loadRaceDetails(raceId) {
    const race = this.data.races.find(r => r.id == raceId);
    if (race) {
      this.setData({
        currentRace: race
      });
    } else {
      // 如果找不到对应的赛事，显示第一个赛事
      this.setData({
        currentRace: this.data.races[0]
      });
    }
  }
});