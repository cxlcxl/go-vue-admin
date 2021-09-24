<template>
  <el-drawer
    :visible.sync="drawer"
    title="新增流量配置"
    custom-class="add-flow"
    append-to-body
    size="900px"
    modal-append-to-body
    :show-close="false"
    :wrapper-closable="false"
    :close-on-press-escape="false"
  >

    <div class="drawer-body">
      <el-row>
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
              <el-button type="primary" @click="submitForm">立即创建</el-button>
              <el-button @click="resetForm">重置</el-button>
              <el-button @click="handleClose">取消</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'AdxFlowSettingAddFlow',
  data() {
    return {
      drawer: false,
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
    handleAdd() {
      this.drawer = true
    },
    handleClose() {
      this.$confirm('已填写的数据将会丢失，确认关闭么?').then(() => {
        this.drawer = false
      }).catch(() => {})
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

<style lang="scss" scoped>
    .add-flow {
        .el-drawer__body {
            flex: 1 0 auto !important;
            height: 0;
            overflow-y: auto;
            padding: 0 15px;

            .drawer-body {
                padding: 0 15px 15px;
            }
        }
    }
</style>
