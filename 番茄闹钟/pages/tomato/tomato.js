// pages/tomato/tomato.js
const { http } = require('../../lib/http.js');

Page({
  data: {
    timer: null,
    defalutSecond: 1500,
    time: '',
    timerStatus: 'stop',  //控制暂停和开始按钮的显示
    confirmVisible: false,  //控制放弃弹窗的显示
    againButtonVisible: false,  //控制显示再来组的按钮
    finishConfirmVisible: false,  //控制放弃成后的弹窗显示
    tomato: {}
  },
  onShow() {
    this.startTimer()
    http.post('/tomatoes').then(res=> {
      console.log(res)
      this.setData({ tomato: res.data.resource })
    })
  },
  startTimer() {
    this.setData({ timerStatus: 'start' })
    this.changeTime()
    this.data.timer = setInterval(()=> {
      this.data.defalutSecond--
      this.changeTime()
      if (this.data.defalutSecond <= 0) {
        this.setData({ againButtonVisible: true })
        this.setData({ finishConfirmVisible: true })
        return this.clearTimer()
      }
    },1000)
  },
  clearTimer() {
    clearInterval(this.data.timer)
    this.setData({ timer: null })
    this.setData({ timerStatus: 'stop' })
  },
  againTimer() {
    this.setData({ againButtonVisible: false })
    this.data.defalutSecond = 1500
    this.startTimer()
  },
  changeTime() { //改变时间的格式，使它变成25：00这样的形式
    let min = Math.floor(this.data.defalutSecond / 60)
    let sec = Math.floor(this.data.defalutSecond % 60)
    if(sec === 0) {
      sec == '00'
    }
    if ((sec + "").length === 1) {
      sec = "0" + sec
    }
    if((min + '').length === 1 ) {
      min = '0' + min
    }
    this.setData({ time: `${min}:${sec}` })
  },
  confirmAbandon(event) {  //放弃番茄
    let content = event.detail
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: content,
      aborted: true  //放弃状态
    })
    .then(res=> {
      wx.navigateBack({ to: -1 })
    })
  },
  confirmFinish(event) {
    let content = event.detail
  },
  confirmCancel() { 
    this.setData({ finishConfirmVisible: false })
  },
  showConfirm() {
    this.setData({ confirmVisible: true })
    this.clearTimer()
  },
  hideConfirm() {
    this.setData({ confirmVisible: false })
    this.startTimer()
  },
  onHide() {
    this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: '退出放弃',
      aborted: true
    })
  },
  onUnload() {
    this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: '退出放弃',
      aborted: true
    })
  }
})