<template>
  <el-row class="flow-add-container">
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
      <el-col :span="7">
        <el-form-item label="系统版本" prop="sys_version">
          <el-input v-model="ruleForm.sys_version" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即创建</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        type: '',
        version: '',
        sys_version: ''
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
    handleClose() {
      this.$emit('cancel-add')
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

<style lang="scss">
  .flow-add-container {
    padding: 20px 20px 15px 0;
    border: 1px solid #dee1eb;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
</style>
