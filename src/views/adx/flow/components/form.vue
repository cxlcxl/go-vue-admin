<template>
  <el-row class="flow-setting">
    <el-col :span="6">
      <el-button icon="el-icon-plus" type="primary" @click="newFlow">新增流量配置</el-button>
    </el-col>
    <el-col :span="18" class="flow-base-info">
      <span>开发者: {{ developer }}</span>
      <span>APPKEY: {{ appKey }}</span>
    </el-col>
    <el-col :span="24" style="margin-top: 15px;">
      <el-table ref="flow" v-loading="loadings.dataLoading" :data="list" border :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="conf_name" label="配置名称" />
        <el-table-column prop="conf_type_name" label="配置类型" width="120" />
        <el-table-column prop="rel_version_name" label="基本信息版本" width="130" />
        <el-table-column prop="update_time" label="更新时间" width="150" align="center" />
        <el-table-column prop="operator" label="操作人" width="150" />
        <el-table-column fixed="right" label="操作" align="center" width="140">
          <template slot-scope="scope">
            <el-button-group class="table-operate">
              <el-button type="primary" plain @click.native.prevent="deleteRow(scope.$index, scope.row)">查看</el-button>
              <el-button type="primary" plain @click.native.prevent="deleteRow(scope.$index, scope.row)">编辑</el-button>
              <el-button type="primary" plain @click.native.prevent="deleteRow(scope.$index, scope.row)">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <add-flow ref="add" />
  </el-row>
</template>

<script>
import AddFlow from './add-flow'
import { getFlowList, deleteFlowConf } from '@/api/app'

export default {
  name: 'AdxFlowSettingForm',
  components: {
    AddFlow
  },
  props: {
    developer: {
      type: String,
      default: ''
    },
    appKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loadings: {
        dataLoading: false
      },
      list: []
    }
  },
  methods: {
    flowList(app_key) {
      this.loadings.dataLoading = true
      getFlowList({ app_key }).then(res => {
        this.list = res.data
        this.loadings.dataLoading = false
      }).catch(() => {
        this.loadings.dataLoading = false
      })
    },
    newFlow() {
      this.$refs.add.handleAdd()
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.conf_type === 1) {
        return 'warning-row'
      }
      return ''
    },
    deleteRow(idx, row) {
      this.$confirm('此操作不可恢复，确认删除么?', '操作警告', {
        confirmButtonText: '是的',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async() => {
        this.loadings.dataLoading = true
        deleteFlowConf(row.id).then(() => {
          this.$message.success('删除成功')
          this.list.splice(idx, 1)
          this.loadings.dataLoading = false
        }).catch(() => {
          this.loadings.dataLoading = false
        })
      }).catch((err) => {
        console.error(err)
      })
    }
  }
}
</script>

<style lang="scss">
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

    .el-table .warning-row {
        background: #f0f9eb;
    }
}
</style>
