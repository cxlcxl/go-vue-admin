<template>
  <el-row>
    <el-col :span="24" class="search-container">
      <el-form ref="_search" :model="search" inline size="small">
        <el-form-item label="用户组名称">
          <el-input v-model="search.name" class="w150" clearable />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" icon="el-icon-search" class="item" @click="userGroups">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24" style="margin-bottom: 15px;">
      <el-button icon="el-icon-plus" size="mini" type="primary" @click="addGroup">新增用户组</el-button>
    </el-col>
    <el-col :span="24">
      <el-table ref="user" v-loading="loadings.pageLoading" :data="groups" highlight-current-row stripe border size="mini">
        <el-table-column prop="group_id" label="组 ID" width="110" />
        <el-table-column prop="name" label="用户组名称" width="220" />
        <el-table-column prop="desc" label="描述" />
        <el-table-column align="center" label="操作" fixed="right" width="110">
          <template slot-scope="scope">
            <el-button-group class="table-operate">
              <el-button type="primary" plain @click.native.prevent="editRow(scope.$index, scope.row)">编辑</el-button>
              <el-button type="primary" plain @click.native.prevent="editRow(scope.$index, scope.row)">查看</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { getGroups } from '@/api/group'

export default {
  components: {

  },
  data() {
    return {
      loadings: {
        changeLoading: false,
        pageLoading: false
      },
      groups: [],
      search: {
        name: ''
      }
    }
  },
  mounted() {
    this.userGroups()
  },
  methods: {
    userGroups() {
      getGroups(this.search).then(res => {
        this.groups = res.data
      })
    },
    editRow(idx, row) {
      this.$refs.userCheck.initPanel()
    },
    addGroup() {

    }
  }
}
</script>
