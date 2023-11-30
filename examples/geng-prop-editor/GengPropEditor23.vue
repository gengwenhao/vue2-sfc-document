<!-- 文本包装组件，双击文本后生成可输入的控件 -->
<template>
  <div class="geng-prop-editor">
    <el-input
      v-if="isEditing"
      class="text-editor"
      :value="inputVal"
      @input="handleUpdateVal"
      @keyup.native.enter.stop="$emit('confirm', inputVal)"
    />
    <span v-else @click="handleDBClick">
      <slot></slot>
    </span>
  </div>
</template>

<script>

// 文本包装组件，双击文本后生成可输入的控件
export default {
  name: "GengPropEditor",

  props: {
    say:{
      type:String,
      default: 'Say!!!!!!!!!'
    }
  },

  methods: {
    // 更新值
    handleUpdateVal(val) {
      this.$emit('update:inputVal', val)
    },

    // 双击事件
    handleDBClick() {
      this.$emit('update:isEditing', true)
      this.$emit('onEditing')
    }
  }
}
</script>

<style scoped lang="scss">
.geng-prop-editor {
  display: inline-block;
  font-size: inherit;
  text-align: inherit;
  margin: 0;
  padding: 0;
  line-height: 100%;

  .text-editor::v-deep {
    font-size: inherit;
    text-align: inherit;
    margin: 0;
    padding: 0;
    height: inherit;
    line-height: 100%;

    input {
      box-sizing: border-box;
      background: transparent;
      padding: 0;
      font-size: inherit;
      text-align: inherit;
      height: inherit;
      line-height: 100%;
    }
  }
}
</style>
