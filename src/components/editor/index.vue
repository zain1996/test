<template>
  <div id="editor">
    <vue-editor v-model="editorContent"></vue-editor>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  export default {

    components: {
      VueEditor
    },
    props: ['content'],
    data() {
      return {
        editorContent: ''
      }
    },
    watch: {
      editorContent(val) {
        this.$emit('update:content', val)
      }
    },
    created() {
      this.editorContent = this.content
    }
  }
</script>
<style lang="scss">
  #editor {
    .ql-toolbar {
      line-height: 0 !important;
    }
  }
</style>