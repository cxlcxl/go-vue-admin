<template>
  <el-row>
    <el-col :span="24" class="search-container">
      <el-form ref="_search" :model="search" inline size="small">
        <el-form-item label="用户名">
          <el-input v-model="search.user_name" class="w150" clearable />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="search.user_email" class="w230" clearable />
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="search.user_type" class="w150" clearable>
            <el-option v-for="(item, key) in userTypes" :label="item" :value="key" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="search.group_id" class="w150" clearable>
            <el-option v-for="(item, key) in groups" :label="item" :value="key" />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" icon="el-icon-search" class="item" @click="doSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <div v-show="groupForm.user_id.length > 0" style="display: inline-block;margin-right: 10px;">
        <el-select v-model="groupForm.group_id" class="w150" clearable>
          <el-option v-for="(item, key) in groups" :label="item" :value="key" />
        </el-select>
        <el-button icon="el-icon-edit" size="mini" type="primary" style="margin-left: 10px;" :loading="loadings.changeLoading" @click="changeGroup">修改用户组</el-button>
      </div>
      <el-button type="primary" icon="el-icon-plus" size="mini">添加用户</el-button>
      <el-button type="primary" icon="el-icon-plus" size="mini">添加开发者子账号</el-button>
    </el-col>
    <el-col :span="24">
      <el-table v-loading="loadings.pageLoading" :data="userList.list" highlight-current-row stripe border size="mini" style="margin-top: 15px" @selection-change="handleSelection">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="user_id" label="UID" width="90" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="user_type_name" label="用户类型" width="150" />
        <el-table-column prop="user_name" label="用户名" />
        <el-table-column label="用户组" width="150">
          <template slot-scope="scope">{{ scope.row.group_id === 0 ? '超级管理员' : groups[scope.row.group_id] }}</template>
        </el-table-column>
        <el-table-column label="是否锁定" width="90" align="center">
          <template slot-scope="scope">
            {{ scope.row.is_lock === 1 ? '锁定' : '未锁定' }}
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="注册时间" width="140" />
        <el-table-column prop="parent_name" label="父级账号" />
        <el-table-column align="center" label="操作" fixed="right" width="140">
          <template slot-scope="scope">
            <el-button-group class="table-operate">
              <el-button type="primary" plain @click.native.prevent="editRow(scope.$index, scope.row)">编辑</el-button>
              <el-button type="primary" plain @click.native.prevent="viewRow(scope.$index, scope.row)">查看</el-button>
              <el-button type="primary" plain @click.native.prevent="loginUser(scope.$index, scope.row)">登陆</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24" style="margin-top: 15px;">
      <el-pagination
        background
        :page-size="search.limit"
        layout="prev, pager, next, jumper, total"
        prev-text="上页"
        next-text="下页"
        :total="userList.total"
        hide-on-single-page
        @current-change="handlePage"
      />
    </el-col>
  </el-row>
</template>

<script>
import { list, changeUserGroup } from '@/api/user'
import { getGroups } from '@/api/group'
import { UserType } from '@/consts'

export default {
  data() {
    return {
      loadings: {
        changeLoading: false,
        pageLoading: false
      },
      userList: {
        total: 0,
        list: []
      },
      groups: {},
      search: {
        user_email: '',
        user_name: '',
        user_type: '',
        group_id: '',
        check: '1',
        page: 1,
        limit: 10
      },
      groupForm: {
        group_id: '',
        user_id: []
      }
    }
  },
  computed: {
    userTypes() {
      return UserType
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.loadings.pageLoading = true
      Promise.all([
        this.userGroups()
      ]).then(() => {
        list(this.search).then(response => {
          this.userList = response.data
          this.loadings.pageLoading = false
        }).catch(() => {
          this.loadings.pageLoading = false
        })
      }).catch(() => {
        this.loadings.pageLoading = false
      })
    },
    userGroups() {
      if (Object.keys(this.groups).length > 0) {
        return true
      }
      getGroups({ name: '' }).then(res => {
        res.data.map(val => {
          this.groups[val.group_id] = val.name
        })
      })
    },
    editRow(idx, row) {

    },
    viewRow(idx, row) {

    },
    loginUser(idx, row) {

    },
    changeGroup() {
      if (!this.groupForm.group_id) {
        this.$message.error('请选择用户组')
        return false
      }
      this.loadings.changeLoading = true
      changeUserGroup({ group_id: parseInt(this.groupForm.group_id), user_id: this.groupForm.user_id }).then(() => {
        this.$message.success('修改成功')
        this.getUserList()
        this.loadings.changeLoading = false
      }).catch(() => {
        this.loadings.changeLoading = false
      })
    },
    handleSelection(selection) {
      if (selection.length > 0) {
        selection.map(v => {
          this.groupForm.user_id.push(v.user_id)
        })
      } else {
        this.$set(this.groupForm, 'user_id', [])
      }
    },
    doSearch() {
      this.search.page = 1
      this.getUserList()
    },
    handlePage(p) {
      this.search.page = p
      this.getUserList()
    }
  }
}
</script>
