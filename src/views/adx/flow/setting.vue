<template>
  <div class="app-page">
    <div class="left-list">
      <app-list ref="app" @refresh-flow="getFlowList" />
    </div>
    <div class="right-table">
      <el-row class="flow-setting">
        <el-col :span="6">
          <el-button v-show="currentPage === 'table'" icon="el-icon-plus" type="primary" @click="newFlow">新增流量配置
          </el-button>
          <span v-show="currentPage !== 'table'" class="flow-title">{{ currentPage|titleFilter }}</span>
        </el-col>
        <el-col :span="18" class="flow-base-info">
          <span>开发者: {{ developer }}</span>
          <span>APPKEY: {{ appKey }}</span>
        </el-col>
        <el-col :span="24" style="margin-top: 15px;">
          <list-flow v-show="currentPage === 'table'" ref="flow_list" @handle-edit="editFlow" @handle-view="viewFlow" />
          <add-flow v-show="currentPage === 'add'" ref="add_flow" @cancel-add="cancelOpt" />
          <edit-flow v-show="currentPage === 'edit'" ref="edit_flow" @cancel-edit="cancelOpt" />
          <detail-flow v-show="currentPage === 'detail'" ref="detail_flow" @cancel-view="cancelOpt" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import AppList from '@/components/AppCard'
import AddFlow from './components/add-flow'
import EditFlow from './components/edit-flow'
import ListFlow from './components/list-flow'
import DetailFlow from './components/detail-flow'

const titles = { 'add': '新增流量配置', 'edit': '流量配置修改', 'detail': '查看配置详情' }

export default {
  name: 'AdxFlowSetting',
  components: {
    AppList, AddFlow, EditFlow, ListFlow, DetailFlow
  },
  filters: {
    titleFilter(t) {
      return titles[t]
    }
  },
  data() {
    return {
      developer: '',
      appKey: '',
      loadings: {
        dataLoading: false
      },
      currentPage: 'table'
    }
  },
  methods: {
    getFlowList(appKey, developer) {
      this.appKey = appKey
      this.developer = developer
      this.currentPage = 'table'
      this.$refs.flow_list.flowList(appKey)
    },
    newFlow() {
      this.currentPage = 'add'
    },
    editFlow(row) {
      this.currentPage = 'edit'
      this.$refs.edit_flow.getFlowInfo(row)
    },
    viewFlow(row) {
      this.currentPage = 'detail'
      this.$refs.detail_flow.getFlowInfo(row)
    },
    cancelOpt() {
      this.currentPage = 'table'
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

      .flow-setting {
        padding-left: 5px;

        .flow-base-info {
          text-align: right;
          color: #409EFF;
          font-weight: 600;

          span:first-child {
            margin-right: 20px;
          }

        }

        .flow-title {
          color: #409EFF;
          font-weight: 600;
          font-size: 16px;
          display: inline-block;
          border-left: 2px solid #409EFF;
          padding-left: 10px;
        }

      }
    }
  }
</style>

<style lang="scss">
  .el-table .warning-row {
    background: #f0f9eb;
  }
</style>
