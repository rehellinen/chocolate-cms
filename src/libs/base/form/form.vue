<template lang="pug">
  div.form-container
    p.title {{title}}
    el-form(ref="data" :model="formData" label-width="100px")
      el-form-item(
        v-for="(conf, index) in config"
        :label="conf.label + '：'"
        :key="index"
      )
        el-input(
          v-if="!conf.type || conf.type === inputType.INPUT"
          v-model="formData[conf.name]"
          :show-password="conf.hide"
        )

        el-switch(
          v-if="conf.type === inputType.SWITCH"
          v-model="conf.value"
          active-color="#66b1ff"
          inactive-color="#ccc"
        )

        el-slider(
          v-if="conf.type === inputType.SLIDER"
          v-model="conf.value"
          :show-tooltip="conf.tooltip || true"
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

        my-editor.editor(
          ref="editor"
          v-if="conf.type === inputType.EDITOR",
          :data-name="conf.name"
          @change="editorChange"
        )

        my-file-uploader(
          ref="image"
          v-if="conf.type === inputType.FILE",
          :data-name="conf.name"
          :initialVal="formData[conf.name]"
          @uploaded="imageUploaded"
        )

        el-input(
          v-if="conf.type === inputType.DISABLED"
          v-model="formData[conf.name]"
          disabled
        )

        el-date-picker(
          v-if="conf.type === inputType.DATE"
          v-model="formData[conf.name]"
          type="datetime"
          placeholder="请选择日期和时间"
          value-format="timestamp"
        )
      el-form-item
        el-button(@click="onSubmit") {{buttonText}}
</template>

<script>
import config from 'config'
import MyEditor from 'base/editor/editor'
import MyFileUploader from 'base/file-uploader/file-uploader'

export default {
  components: {
    MyEditor,
    MyFileUploader
  },
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
    formData: {
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
        this.$refs.image[0].setFileUrl(this.formData[conf.name])
      }
      if (conf.type === config.FORM.CHECKBOX) {
        this.initCheckBox(conf.name, conf.options)
      }
    }
  },
  methods: {
    async onSubmit () {
      if (this.$refs.editor) {
        const name = this.$refs.editor[0].$attrs['data-name']
        this.formData[name] = await this.$refs.editor[0].getContent()
      }
      this.$emit('submit', this.formData)
    },
    editorChange (e) {
      const name = this.$refs.editor[0].$attrs['data-name']
      this.formData[name] = e.content
    },
    imageUploaded (e) {
      const name = this.$refs.image[0].$attrs['data-name']
      this.formData[name] = e.path
    },
    initCheckBox (name, options) {
      for (let [key, value] of Object.entries(options)) {
        let i = 0
        for (let item of value) {
          if (this.formData[name].indexOf(item.value) > -1) {
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
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"

  .form-container
    .title
      color: $main-font-color
      font-size: $vast-font-size
      font-weight: bold
      margin: 20px 0 20px 80px
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
    .gray
      background: $gray
      padding: 0 10px
      margin-right: 20px
</style>
