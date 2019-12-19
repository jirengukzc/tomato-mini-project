// components/confirm/confirm.js
Component({
  data: {
    _value: ''
  },
  properties: {
    placeholder: {
      type: String,
      value: ''
    },
    visible: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: ''
    }
  },
  lifetimes: {
    attached () {
      // 在组件实例进入页面节点树时执行
      if (this.properties.value) {
        this.properties.value = this.data._value
      }
    }
  },
  methods: {
    confirm() {
      this.triggerEvent('confirm', this.data._value)
    },
    cancel() {
      this.triggerEvent('cancel', this.data._value)
    },
    watchValue(event) {
      //console.log(event.detail)
      this.data._value = event.detail.value
    }
  }
})