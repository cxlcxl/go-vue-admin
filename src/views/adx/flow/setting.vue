<template>
  <div class="app-page">
    <div class="left-list">
      <app-list ref="app" @refresh-flow="getFlowList" />
    </div>
    <div class="right-table">
      <flow-form ref="flow" :developer="developer" :app-key="appKey" />
    </div>
  </div>
</template>

<script>
import AppList from './components/app-list'
import FlowForm from './components/form'

export default {
  name: 'AdxFlowSetting',
  components: {
    AppList, FlowForm
  },
  data() {
    return {
      developer: '',
      appKey: ''
    }
  },
  methods: {
    getFlowList(appKey, developer) {
      this.appKey = appKey
      this.developer = developer
      this.$refs.flow.flowList(this.appKey)
    }
  }
}
</script>

<style scoped lang="scss">
    .app-page {
        display: flex;

        .left-list {
            width: 320px;
        }
        .right-table {
            flex: 1;
        }
    }
</style>
