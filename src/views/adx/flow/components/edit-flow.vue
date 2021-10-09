<template>
  <el-row v-loading="editLoading" class="flow-add-container">
    <el-form ref="flow" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-col :span="10">
        <el-form-item label="配置名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="配置类型" prop="name">
          <el-input v-model="ruleForm.type" />
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="基本信息版本" prop="name">
          <el-input v-model="ruleForm.version" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item>
          <el-button type="primary" @click="submitForm">确认修改</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
import { flowConfDetail } from '@/api/app'

export default {
  data() {
    return {
      editLoading: false,
      ruleForm: {
        name: '',
        type: '',
        version: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请至少选择一个活动性质', trigger: 'blur' }
        ],
        version: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    getFlowInfo(row) {
      this.editLoading = true
      flowConfDetail({ app_key: row.app_key, flow_id: row.id, conf_type: row.conf_type }).then(res => {
        console.log(res)
        this.editLoading = false
      }).catch(() => {
        this.editLoading = false
      })
    },
    handleClose() {
      this.$emit('cancel-edit')
    },
    submitForm() {
      this.$refs.flow.validate((valid) => {
        if (valid) {
          alert('submit!')
        }
      })
    },
    resetForm() {
      this.$refs.flow.resetFields()
    }
  }
}
</script>
