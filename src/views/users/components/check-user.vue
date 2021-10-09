<template>
  <el-dialog title="用户审核" :visible.sync="visible" append-to-body width="720px" :close-on-click-modal="false">
    <el-row>
      <el-form ref="check_user" :model="form" label-width="110px" :rules="rules">
        <el-col :span="12">
          <el-form-item label="注册邮箱">
            <el-input :value="user.email" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册类型">
            <el-input :value="user.register_type|registerTypeFilter" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名">
            <el-input :value="user.user_name" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号">
            <el-input :value="user.card_id" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系方式">
            <el-input :value="user.mobile" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人">
            <el-input :value="user.contact" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="通讯地址">
            <el-input :value="user.address" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户类型">
            <el-input :value="user.user_type_name" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="磨基财务主体" prop="mobgi_account">
            <el-select v-model="form.mobgi_account" style="width: 100%;">
              <el-option v-for="item in accounts" :label="item.company_name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审批意见" prop="check_msg">
            <el-input v-model="form.check_msg" placeholder="请填写审批意见" />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="close">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit(1)">审核通过</el-button>
      <el-button type="danger" :loading="loading" @click="handleSubmit(-1)">审批不通过</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { doCheck, mobgiAccounts } from '@/api/user'
import { RegisterType } from '@/consts'

export default {
  filters: {
    registerTypeFilter(t) {
      return RegisterType[t]
    }
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          user_id: 0,
          email: '',
          register_type: 1,
          user_name: '',
          card_id: '',
          mobile: '',
          contact: '',
          address: '',
          user_type_name: ''
        }
      }
    }
  },
  data() {
    return {
      visible: false,
      loading: false,
      accounts: [],
      form: {
        user_id: 0,
        check_msg: '',
        mobgi_account: '',
        is_check: 0
      },
      rules: {
        mobgi_account: { required: true, message: '请选择磨基财务主体' },
        check_msg: { required: true, message: '请填写审批意见' }
      }
    }
  },
  methods: {
    initPanel() {
      mobgiAccounts().then(res => {
        this.accounts = res.data
        this.visible = true
      })
    },
    handleSubmit(t) {
      this.$refs.check_user.validate((valid) => {
        if (valid) {
          this.$confirm('确认审批' + (t === -1 ? ' 不通过 ' : '') + '此用户么?', '操作警告', {
            confirmButtonText: '是的',
            cancelButtonText: '取消',
            type: t === -1 ? 'error' : 'info'
          }).then(async() => {
            this.loading = true
            this.form.user_id = this.user.user_id
            this.form.is_check = t
            doCheck(this.form).then(() => {
              this.loading = false
              this.$message.success('审核成功')
              this.close()
              this.$emit('check-success')
            }).catch(() => {
              this.loading = false
            })
          }).catch(() => {})
        }
      })
    },
    close() {
      this.$refs.check_user.resetFields()
      this.visible = false
    }
  }
}
</script>
