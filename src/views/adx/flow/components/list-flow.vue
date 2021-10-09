<template>
  <el-table ref="flow" v-loading="loadings.dataLoading" :data="list" border :row-class-name="tableRowClassName">
    <el-table-column prop="id" label="ID" width="100" />
    <el-table-column prop="conf_name" label="配置名称" />
    <el-table-column prop="conf_type_name" label="配置类型" width="120" />
    <el-table-column prop="rel_version_name" label="基本信息版本" width="130" />
    <el-table-column prop="update_time" label="更新时间" width="150" align="center" />
    <el-table-column prop="operator" label="操作人" width="150" />
    <el-table-column label="操作" align="center" width="140">
      <template slot-scope="scope">
        <el-button-group class="table-operate">
          <el-button type="primary" plain @click.native.prevent="viewFlow(scope.row)">查看</el-button>
          <el-button type="primary" plain @click.native.prevent="editFlow(scope.row)">编辑</el-button>
          <el-button type="primary" plain @click.native.prevent="deleteFlow(scope.$index, scope.row)">删除</el-button>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { deleteFlowConf, getFlowList } from '@/api/app'

export default {
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
    tableRowClassName({ row, rowIndex }) {
      if (row.conf_type === 1) {
        return 'warning-row'
      }
      return ''
    },
    viewFlow(row) {
      this.$emit('handle-view', row)
    },
    editFlow(row) {
      this.$emit('handle-edit', row)
    },
    deleteFlow(idx, row) {
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
        console.log(err)
      })
    }
  }
}
</script>
