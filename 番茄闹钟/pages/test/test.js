// pages/test/test.js
Page({
  data: {
    message: '我是第一条信息',
    id: 'number',
    condition: true,
    arr: [
      { id: 1, text: 'a' },
      { id: 2, text: 'b' },
      { id: 3, text: 'c' }
      ],
      str: '我是一条信息',
      brr: [0,1,2,3,4],
      obj: {id: 1, text: '信息1'},
      color: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  changeColor() {
    this.setData({ color: !this.data.color })
  },
  changeObjText() {
    this.setData({"obj.text": "信息2"})
  },
  putItem() {
    // 数组的push用不了
    let last = this.data.brr[this.data.brr.length-1] + 1
    let newBrr = [last]
    this.data.brr = this.data.brr.concat(newBrr) //这时data数据已经改变
    //要是想用视图层的数据都改变，就要用this.setData
    this.setData({ brr: this.data.brr})
  },
  reverseStr() {
    this.setData({
      str: this.data.str.split('').reverse().join('')
    }) 
  },
  onReady: function () {

  },
  onShow: function () {
    this.setData({str: '我是改变的信息'})
    console.log(this.data.str)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})