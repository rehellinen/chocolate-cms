<template lang="pug">
  div.form-container
    p.title(v-if="title") {{title}}
    el-form(ref="data" :model="formData" :rules="rules" label-width="100px")
      el-form-item(
        v-for="(conf, index) in config"
        :label="conf.label + '：'"
        :key="index"
        :prop="conf.name"
      )
        el-input(
          v-if="!conf.type || conf.type === inputType.INPUT"
          v-model="formData[conf.name]"
          :show-password="conf.hide"
          :disabled="conf.disabled"
        )

        el-switch(
          v-if="conf.type === inputType.SWITCH"
          v-model="formData[conf.name]"
          :active-color="conf.color || '#F47983'"
          inactive-color="#ccc"
          :disabled="conf.disabled"
        )

        el-slider(
          v-if="conf.type === inputType.SLIDER"
          v-model="formData[conf.name]"
          :show-tooltip="conf.tooltip || false"
          :disabled="conf.disabled"
        )

        el-select(
          v-if="conf.type === inputType.SELECT"
          v-model="formData[conf.name]"
        )
          el-option(
            v-for="(item, i) in conf.options"
            :label="item.label"
            :value="item.value"
            :key="i"
          ) {{ item.label }}

        div(
          v-if="conf.type === inputType.CHECKBOX"
          v-for="(items, name) in conf.options"
          :key="name"
        )
          el-checkbox.title-box(
            v-if="conf.group"
            :label="name"
            v-model="checkAllGroup"
            :indeterminate="indeterminateGroup.includes(name)"
            @change="groupCheck($event, items, conf.name, name)"
          )
          el-checkbox-group(
            v-model="formData[conf.name]"
            :class="{ 'gray' : conf.group }"
          )
            el-checkbox(
              v-for="(item, i) in items"
              :label="item.value"
              :key="i"
              @change="singleCheck($event, items, conf.name, name)"
            ) {{ item.label }}

        choc-editor.editor(
          ref="editor"
          v-if="conf.type === inputType.EDITOR"
          :data-name="conf.name"
          @change="editorChange"
        )

        choc-file-uploader(
          ref="image"
          v-if="conf.type === inputType.FILE"
          :data-name="conf.name"
          :data="formData[conf.name]"
          :disabled="conf.disabled || false"
          :multiple="conf.multiple || false"
          :sortable="conf.sortable || false"
          :animatedCheck="conf.animatedCheck || false"
          :limit="conf.limit || null"
          :accept="conf.accept || null"
        )

        el-date-picker(
          v-if="conf.type === inputType.DATE"
          v-model="formData[conf.name]"
          type="datetime"
          placeholder="请选择日期和时间"
          value-format="timestamp"
        )
      el-form-item.confirm-button(v-if="ifSubmit")
        el-button(@click="onSubmit") {{buttonText}}
</template>

<script>
import config from 'config'
import { nestedValue } from 'libs/utils'

export default {
  name: 'ChocForm',
  props: {
    config: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: '提交'
    },
    ifSubmit: {
      type: Boolean,
      default: true
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      inputType: config.FORM,
      checkAllGroup: [],
      indeterminateGroup: []
    }
  },
  mounted () {
    for (let conf of this.config) {
      if (conf.type === config.FORM.EDITOR) {
        this.$refs.editor[0].setContent(this.formData[conf.name])
      }
      if (conf.type === config.FORM.FILE) {
        this.formData[conf.name] = Array.isArray(this.formData[conf.name])
          ? this.formData[conf.name]
          : this.formData[conf.name]
            ? [{ 'url': this.formData[conf.name] }]
            : []
      }
      if (conf.type === config.FORM.CHECKBOX) {
        this.initCheckBox(conf.name, conf.options)
      }
      if (conf.name.includes('.')) {
        nestedValue(this.formData, conf.name)
      }
    }
    for (let value of Object.values(this.rules)) {
      if (value[0].confirm) {
        let item = value[0].confirm
        value[0].validator = this.confirmAgain(item.name, item.desc)
      }
    }
  },
  methods: {
    async onSubmit () {
      if (this.$refs.editor) {
        const name = this.$refs.editor[0].$attrs['data-name']
        this.formData[name] = await this.$refs.editor[0].getContent()
      }
      if (this.$refs.image) {
        const name = this.$refs.image[0].$attrs['data-name']
        this.formData[name] = this.$refs.image[0].getUrl()
      }
      this.$refs['data'].validate((valid) => {
        if (valid) {
          this.$emit('submit', { ...this.formData })
          this.setUrl()
        } else {
          this.setUrl()
          return false
        }
      })
    },
    setUrl () {
      for (let conf of this.config) {
        if (conf.type === config.FORM.FILE) {
          this.formData[conf.name] = Array.isArray(this.formData[conf.name])
            ? this.formData[conf.name]
            : this.formData[conf.name]
              ? [{ 'url': this.formData[conf.name] }]
              : []
        }
      }
    },
    editorChange (e) {
      const name = this.$refs.editor[0].$attrs['data-name']
      this.formData[name] = e.content
    },
    initCheckBox (name, options) {
      for (let [key, value] of Object.entries(options)) {
        let i = 0
        for (let item of value) {
          if (this.formData[name] && this.formData[name].indexOf(item.value) > -1) {
            i++
          }
        }
        if (i === 0) {
          this.noCheckStatus(key)
        } else if (i === value.length) {
          this.checkStatus(key)
        } else {
          this.indeterminateStatus(key)
        }
      }
    },
    groupCheck (checked, items, formKey, name) {
      if (checked) {
        for (let item of items) {
          if (!this.formData[formKey].includes(item.value)) {
            this.formData[formKey].push(item.value)
          }
        }
        this.checkStatus(name)
      } else {
        for (let item of items) {
          if (this.formData[formKey].includes(item.value)) {
            this.formData[formKey].splice(this.formData[formKey].indexOf(item.value), 1)
          }
        }
        this.noCheckStatus(name)
      }
    },
    singleCheck (checked, items, formKey, name) {
      if (checked) {
        for (let item of items) {
          if (!this.formData[formKey].includes(item.value)) {
            this.indeterminateStatus(name)
            return
          }
        }
        this.checkStatus(name)
      } else {
        this.indeterminateStatus(name)
        for (let item of items) {
          if (this.formData[formKey].includes(item.value)) {
            return
          }
        }
        this.noCheckStatus(name)
      }
    },
    noCheckStatus (name) {
      if (this.checkAllGroup.indexOf(name) > -1) {
        this.checkAllGroup.splice(this.checkAllGroup.indexOf(name), 1)
      }
      if (this.indeterminateGroup.indexOf(name) > -1) {
        this.indeterminateGroup.splice(this.indeterminateGroup.indexOf(name), 1)
      }
    },
    checkStatus (name) {
      if (this.checkAllGroup.indexOf(name) === -1) {
        this.checkAllGroup.push(name)
      }
      if (this.indeterminateGroup.indexOf(name) > -1) {
        this.indeterminateGroup.splice(this.indeterminateGroup.indexOf(name), 1)
      }
    },
    indeterminateStatus (name) {
      if (this.checkAllGroup.indexOf(name) > -1) {
        this.checkAllGroup.splice(this.checkAllGroup.indexOf(name), 1)
      }
      if (this.indeterminateGroup.indexOf(name) === -1) {
        this.indeterminateGroup.push(name)
      }
    },
    confirmAgain (key, desc) {
      return (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入' + desc))
        } else if (value !== this.formData[key]) {
          callback(new Error('两次输入' + desc + '不一致!'))
        } else {
          callback()
        }
      }
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"

  .form-container
    .title
      color: $main-font-color
      /*text-align: center*/
      font-size: $biggest-font-size
      font-weight: bold
      letter-spacing: 2px
      margin-bottom: 30px
      padding-left: 100px
      padding-bottom: 10px
      border-bottom: 1px solid $border-two
    .editor
      max-width: 500px
    .el-date-picker
      max-width: 100%
    .el-input
      max-width: 400px
    .el-slider
      max-width: 500px
    .title-box
      width: 100%
    .confirm-button
      margin-bottom: 10px
    .gray
      background: $gray
      padding: 0 10px
      margin-right: 20px
</style>
