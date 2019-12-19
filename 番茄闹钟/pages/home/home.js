// pages/home/home.js
const { http } = require('../../lib/http.js');

Page({
  data: {
    lists: [],
    visibleCreateConfirm: false,
    visibleUpdateConfirm: false,
    updateContent: '',
    updateId: '',
    updatIndex: ''
  },
  onShow() {
    http.get('/todos?completed=false').then(res=> {
      this.setData({ lists: res.data.resources })
    })
  },
  confirmCreate(event) {
    let content = event.detail
    if(content) {
      http.post('/todos', {
        completed: false, description: content
      })
      .then(res=> {
        let todo = [res.data.resource]
        this.data.lists = todo.concat(this.data.lists)
        this.setData({ lists: this.data.lists })
        this.hideCreateConfirm()
      })
    }
  },
  changeText(event) {
    console.log(event)
    let { content, id, index } = event.currentTarget.dataset
    this.data.updateId = id
    this.data.updatIndex = index
    this.setData({ visibleUpdateConfirm: true, updateContent: content })
  },
  confirmUpdate(event) {
    let content = event.detail
    http.put(`/todos/${this.data.updateId}`,{
      completed: false, description: content
    })
    .then(res=> {
      let todo = res.data.resource
      let index = this.data.updatIndex
      this.data.lists[index] = todo
      this.setData({ lists: this.data.lists })
      this.hideUpdateConfirm()
    })
  },
  destroyTodo(event) {
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    http.put(`/todos/${id}`, {
      completed: true
    })
    .then(res=> {
      let todo = res.data.resource
      this.data.lists[index] = todo
      this.setData({ lists: this.data.lists })
    })
  },
  hideCreateConfirm(event) {
    this.setData({ visibleCreateConfirm: false })
  },
  showCreateConfirm() {
    this.setData({ visibleCreateConfirm: true })
  },
  hideUpdateConfirm() {
    this.setData({ visibleUpdateConfirm: false })
  }
})

// lists: [
//   { id: 1, text: '123', completed: true },
//   { id: 2, text: '456', completed: false },
//   { id: 3, text: '789', completed: true }
// ]
