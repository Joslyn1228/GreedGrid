Page({
  data: {
    teams: [
      { id: 1, rank: 1, name: '迈凯伦', likes: 2, dislikes: 4, logo: '/images/team1.png' },
      { id: 2, rank: 2, name: '梅赛德斯', likes: 2, dislikes: 3, logo: '/images/team2.png' },
      { id: 3, rank: 3, name: '红牛', likes: 2, dislikes: 1, logo: '/images/team3.png' },
      { id: 4, rank: 4, name: '法拉利', likes: 0, dislikes: 8, logo: '/images/team4.png' },
      { id: 5, rank: 5, name: '威廉姆斯', likes: 3, dislikes: 0, logo: '/images/team5.png' },
      { id: 6, rank: 6, name: '红牛二队', likes: 1, dislikes: 0, logo: '/images/team6.png' },
      { id: 7, rank: 7, name: '阿斯顿马丁', likes: 0, dislikes: 0, logo: '/images/team7.png' },
      { id: 8, rank: 8, name: '哈斯', likes: 0, dislikes: 0, logo: '/images/team8.png' },
      { id: 9, rank: 9, name: '索伯', likes: 0, dislikes: 0, logo: '/images/team9.png' },
      { id: 10, rank: 10, name: 'Alpine', likes: 0, dislikes: 0, logo: '/images/team10.png' }
    ],
    // 弹窗相关状态
    showCard: false,
    selectedTeam: null,
    // 特殊卡片状态
    showMclarenCard: false,
    showMercedesCard: false,
    showRedBullCard: false,
    showFerrariCard: false,
    showWilliamsCard: false,
    showAlphaTauriCard: false,
    showAstonMartinCard: false,
    showHaasCard: false,
    showSauberCard: false,
    showAlpineCard: false,
    // 主队相关状态
    isFavorite: false,
    favoriteTeams: [],
    // 留言相关状态
    commentText: '',
    // 自定义留言弹窗状态
    showCommentsModal: false,
    currentComments: []
  },

  onLoad() {
    // 页面加载时的初始化
    console.log('车队红黑榜加载完成');
    // 从本地存储获取主队信息
    this.checkFavoriteTeam();
  },

  // 检查主队信息
  checkFavoriteTeam() {
    const favoriteTeams = wx.getStorageSync('favoriteTeams') || [];
    this.setData({ favoriteTeams: favoriteTeams });
  },

  // 图片加载错误处理
  onImageError(e) {
    console.error('图片加载错误:', e);
    // 可以在这里设置默认图片
  },

  // 点赞功能
  likeTeam(e) {
    const id = e.currentTarget.dataset.id;
    const teams = [...this.data.teams];
    const index = teams.findIndex(team => team.id === id);
    
    if (index !== -1) {
      teams[index].likes += 1;
      this.setData({
        teams: teams
      });
      
      // 移除震动反馈，避免页面抖动
    }
  },

  // 点踩功能
  dislikeTeam(e) {
    const id = e.currentTarget.dataset.id;
    const teams = [...this.data.teams];
    const index = teams.findIndex(team => team.id === id);
    
    if (index !== -1) {
      teams[index].dislikes += 1;
      this.setData({
        teams: teams
      });
      
      // 移除震动反馈，避免页面抖动
    }
  },

  // 显示车队卡片
  showTeamCard(e) {
    const team = e.currentTarget.dataset.team;
    // 检查是否为主队
    const favoriteTeams = this.data.favoriteTeams;
    const isFavorite = favoriteTeams.some(favTeam => favTeam.id === team.id);
    
    this.setData({
      showCard: true,
      selectedTeam: team,
      isFavorite: isFavorite
    });
    
    // 震动反馈（已注释，用户要求取消点击卡片的振动效果）
    // wx.vibrateShort();
  },

  // 隐藏车队卡片
  hideTeamCard() {
    this.setData({
      showCard: false,
      selectedTeam: null,
      commentText: ''
    });
  },

  // 切换主队
  toggleFavorite() {
    if (!this.data.selectedTeam) return;
    
    let favoriteTeams = [...this.data.favoriteTeams];
    let isFavorite = this.data.isFavorite;
    const selectedTeam = this.data.selectedTeam;
    
    if (isFavorite) {
      // 取消主队
      favoriteTeams = favoriteTeams.filter(team => team.id !== selectedTeam.id);
      wx.setStorageSync('favoriteTeams', favoriteTeams);
      this.setData({
        favoriteTeams: favoriteTeams,
        isFavorite: false
      });
      wx.showToast({
        title: '已取消主队',
        icon: 'success',
        duration: 1500
      });
    } else {
      // 设置为主队
      if (favoriteTeams.length >= 2) {
        // 已达上限，显示提示
        wx.showToast({
          title: '最多只能选择2个主队',
          icon: 'none',
          duration: 1500
        });
        return;
      }
      
      favoriteTeams.push(selectedTeam);
      wx.setStorageSync('favoriteTeams', favoriteTeams);
      this.setData({
        favoriteTeams: favoriteTeams,
        isFavorite: true
      });
      wx.showToast({
        title: '已设为主队',
        icon: 'success',
        duration: 1500
      });
      
      // 检查是否选择了迈凯伦
      if (selectedTeam.name === '迈凯伦') {
        this.setData({
          showMclarenCard: true
        });
      }
      // 检查是否选择了梅赛德斯
      if (selectedTeam.name === '梅赛德斯') {
        this.setData({
          showMercedesCard: true
        });
      }
      // 检查是否选择了红牛
      if (selectedTeam.name === '红牛') {
        this.setData({
          showRedBullCard: true
        });
      }
      // 检查是否选择了法拉利
      if (selectedTeam.name === '法拉利') {
        this.setData({
          showFerrariCard: true
        });
      }
      // 检查是否选择了威廉姆斯
      if (selectedTeam.name === '威廉姆斯') {
        this.setData({
          showWilliamsCard: true
        });
      }
      // 检查是否选择了红牛二队
      if (selectedTeam.name === '红牛二队') {
        this.setData({
          showAlphaTauriCard: true
        });
      }
      // 检查是否选择了阿斯顿马丁
      if (selectedTeam.name === '阿斯顿马丁') {
        this.setData({
          showAstonMartinCard: true
        });
      }
      // 检查是否选择了哈斯
      if (selectedTeam.name === '哈斯') {
        this.setData({
          showHaasCard: true
        });
      }
      // 检查是否选择了索伯
      if (selectedTeam.name === '索伯') {
        this.setData({
          showSauberCard: true
        });
      }
      // 检查是否选择了Alpine
      if (selectedTeam.name === 'Alpine') {
        this.setData({
          showAlpineCard: true
        });
      }
    }
    
    // 震动反馈（已注释，用户要求取消点击卡片的振动效果）
    // wx.vibrateShort();
  },

  // 留言输入
  onCommentInput(e) {
    this.setData({
      commentText: e.detail.value
    });
  },

  // 提交留言
  submitComment() {
    if (!this.data.commentText.trim()) {
      wx.showToast({
        title: '请输入留言内容',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    
    if (!this.data.selectedTeam) return;
    
    // 获取现有留言
    let comments = wx.getStorageSync('teamComments') || {};
    let teamComments = comments[this.data.selectedTeam.id] || [];
    
    // 添加新留言
    teamComments.push({
      id: Date.now(),
      text: this.data.commentText.trim(),
      time: new Date().toLocaleString()
    });
    
    // 保存留言
    comments[this.data.selectedTeam.id] = teamComments;
    wx.setStorageSync('teamComments', comments);
    
    wx.showToast({
      title: '留言成功',
      icon: 'success',
      duration: 1500
    });
    
    // 清空输入框
    this.setData({
      commentText: ''
    });
  },
  
  // 隐藏迈凯伦特殊卡片
  hideMclarenCard() {
    this.setData({
      showMclarenCard: false
    });
  },
  
  // 隐藏梅赛德斯特殊卡片
  hideMercedesCard() {
    this.setData({
      showMercedesCard: false
    });
  },
  
  // 隐藏红牛特殊卡片
  hideRedBullCard() {
    this.setData({
      showRedBullCard: false
    });
  },
  
  // 隐藏法拉利特殊卡片
  hideFerrariCard() {
    this.setData({
      showFerrariCard: false
    });
  },
  
  // 隐藏威廉姆斯特殊卡片
  hideWilliamsCard() {
    this.setData({
      showWilliamsCard: false
    });
  },
  
  // 隐藏红牛二队特殊卡片
  hideAlphaTauriCard() {
    this.setData({
      showAlphaTauriCard: false
    });
  },
  
  // 隐藏阿斯顿马丁特殊卡片
  hideAstonMartinCard() {
    this.setData({
      showAstonMartinCard: false
    });
  },
  
  // 隐藏哈斯特殊卡片
  hideHaasCard() {
    this.setData({
      showHaasCard: false
    });
  },
  
  // 隐藏索伯特殊卡片
  hideSauberCard() {
    this.setData({
      showSauberCard: false
    });
  },
  
  // 隐藏Alpine特殊卡片
  hideAlpineCard() {
    this.setData({
      showAlpineCard: false
    });
  },

  // 查看留言
  viewComments() {
    if (!this.data.selectedTeam) return;
    
    // 获取现有留言
    let comments = wx.getStorageSync('teamComments') || {};
    let teamComments = comments[this.data.selectedTeam.id] || [];
    
    if (teamComments.length === 0) {
      // 即使没有留言也显示弹窗，方便后续添加
      this.setData({
        currentComments: teamComments,
        showCommentsModal: true
      });
      return;
    }
    
    // 显示自定义留言弹窗
    this.setData({
      currentComments: teamComments,
      showCommentsModal: true
    });
  },
  
  // 隐藏留言弹窗
  hideCommentsModal() {
    this.setData({
      showCommentsModal: false,
      currentComments: []
    });
  }
});