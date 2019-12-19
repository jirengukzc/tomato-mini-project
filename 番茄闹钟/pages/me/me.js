// pages/me/me.js
const { http } = require('../../lib/http.js');

Page({
  data: {
    tab: 'tomato',
    tomatoes: {},
    todos: {},
    me: {}
  },
  onShow() {
    this.fetchTomatoes()
    this.fetchTodos()
    this.setData({ me: wx.getStorageSync('me') })
  },
  fetchTomatoes() {
    http.get('/tomatoes', { is_group: "yes" })
      .then(res => {
        this.setData({ tomatoes: res.data.resources })
        console.log(this.data.tomatoes)
      })
  },
  fetchTodos() {
    http.get('/todos', { is_group: "yes" })
      .then(res=> {
        this.setData({ todos: res.data.resources })
        console.log(this.data.todos)
      })
  },
  changeTab(event) {
    //可以在event.currentTarget.dataset下面看到自己定义的自定义属性
    let name = event.currentTarget.dataset.name
    this.setData({ tab: name })
  }
})

// lists: {
//   "本周四": [
//     { time: '14:00', text: '完成了跑步，以后继续加油', id: '1' },
//     { time: '18:00', text: '完成了读书，以后继续加油', id: '4' }
//   ],
//   '本周五': [{ time: '15:00', text: '完成了跑步，以后继续加油', id: '2' }],
//   '本周六': [{ time: '16:00', text: '完成了跑步，以后继续加油', id: '4' }],
//   '本周日': [{ time: '16:00', text: '完成了跑步，以后继续加油', id: '5' }],
//   '本周一': [{ time: '16:00', text: '完成了跑步，以后继续加油', id: '6' }]
// }