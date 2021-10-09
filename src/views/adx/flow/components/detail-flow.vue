<template>
  <el-row v-loading="loading" class="flow-add-container">
    <el-form ref="flow" label-width="120px">
      <el-col :span="12">
        <el-form-item label="配置名称">{{ baseInfo.conf_name }}</el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="配置类型">{{ baseInfo.conf_type_name }}</el-form-item>
      </el-col>
      <el-col :span="24" style="margin:5px 0 20px;border-bottom: 1px solid #dfe4ed;" />
      <el-col :span="12">
        <el-form-item label="渠道定向">
          <div v-show="flowForm.channel_conf_type === 1" style="display: inline-block;">
            <el-tag v-for="item in flowForm.channel_conf" size="mini" style="margin-right: 5px;">{{ item.name }}</el-tag>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="区域定向">
          <div v-show="flowForm.area_conf_type === 1" style="display: inline-block;">
            <el-tag v-for="item in flowForm.area_conf" size="mini" style="margin-right: 5px;">{{ item.name }}</el-tag>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="应用版本">
          <div v-show="flowForm.game_conf_type === 1" style="display: inline-block;">
            <el-tag v-for="item in flowForm.game_conf" size="mini" style="margin-right: 5px;">{{ item }}</el-tag>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="SDK版本">
          <div v-show="flowForm.sdk_conf_type === 1" style="display: inline-block;">
            <el-tag v-for="item in flowForm.sdk_conf" size="mini" style="margin-right: 5px;">{{ item }}</el-tag>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="用户行为">
          <div v-show="flowForm.user_conf_type === 1" style="display: inline-block;">
            <el-tag v-show="flowForm.user_conf.includes('3')" style="margin-right: 5px;">7日付费用户</el-tag>
            <el-tag v-show="flowForm.user_conf.includes('2')" style="margin-right: 5px;">新增用户</el-tag>
            <el-tag v-show="flowForm.user_conf.includes('1')">30日付费</el-tag>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="系统版本">
          <div v-show="flowForm.sys_conf_type === 1" style="display: inline-block;">
            <el-tag v-for="item in flowForm.sys_conf.sys_conf_content" size="mini" style="margin-right: 5px;">
              {{ flowForm.sys_conf.sys_conf_condition|conditionFilter }} {{ item }}
            </el-tag>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="手机品牌">
          <div v-show="flowForm.brand_conf_type === 1" style="display: inline-block;">
            <el-tag v-for="item in flowForm.brand_conf" size="mini" style="margin-right: 5px;">{{ item.name }}</el-tag>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="IDFA">
          <div v-show="flowForm.idfa_conf_type === 1" style="display: inline-block;">
            <el-tag size="mini">{{ flowForm.idfa_conf === '1' ? '有效' : '无效' }}</el-tag>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="24" style="margin:5px 0 20px;border-bottom: 1px solid #dfe4ed;" />
      <el-col :span="24" style="padding: 0 0 0 20px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(item, key) in flowForm.ad_info" :name="key" lazy>
            <span slot="label"><i v-show="item.status === 1" class="el-icon-success text-success" /> {{ item.name }}</span>
            <el-col :span="12">
              <el-form-item label="是否开启">
                <span v-if="item.status === 1" class="text-success">开启</span>
                <span v-else class="text-error">关闭</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用默认配置">{{ item.is_default === 1?'是':'否' }}</el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="item.is_priority === 1 ? '分级售卖优先广告商' : '分级售卖'">
                {{ item.is_priority !== 1?'否':'' }}
                <el-table v-show="item.is_priority === 1" :data="item.priority_list" border size="mini">
                  <el-table-column prop="position" label="顺序" width="100" />
                  <el-table-column prop="name" label="广告商" />
                  <el-table-column prop="limit_num" label="展示次数限制(每天)" />
                  <el-table-column prop="req_limit_num" label="请求次数限制" />
                  <el-table-column label="请求间隔限制">
                    <template slot-scope="scope">
                      {{ scope.row.limit_time === 0 ? '不限制' : scope.row.limit_time + ' 秒' }}
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="一般广告商">
                <el-table :data="item.general_list" border size="mini">
                  <el-table-column prop="position" label="位置" width="100" />
                  <el-table-column prop="name" label="广告商" />
                  <el-table-column prop="weight" label="权重" width="100" />
                  <el-table-column prop="limit_num" label="展示次数限制(每天)" />
                  <el-table-column prop="req_limit_num" label="请求次数限制" />
                  <el-table-column label="请求间隔限制">
                    <template slot-scope="scope">
                      {{ scope.row.limit_time === 0 ? '不限制' : scope.row.limit_time + ' 秒' }}
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-form>
    <el-col :span="24" style="padding-left: 20px;">
      <el-button type="primary" @click="handleClose">返回</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { flowConfDetail } from '@/api/app'
import { SysVersionConfig } from '@/consts'

export default {
  filters: {
    conditionFilter(t) {
      return SysVersionConfig[t]
    }
  },
  data() {
    return {
      loading: false,
      baseInfo: {
        conf_name: '',
        id: 0,
        conf_type_name: ''
      },
      flowForm: {
        name: '',
        type: '',
        version: '',
        sys_version: '',
        area_conf_type: 0,
        area_conf: [],
        channel_conf_type: 0,
        channel_conf: [],
        game_conf_type: 0,
        game_conf: [],
        sdk_conf_type: 0,
        sdk_conf: [],
        user_conf_type: 0,
        user_conf: [],
        brand_conf_type: 0,
        brand_conf: [],
        idfa_conf_type: 0,
        idfa_conf: '',
        sys_conf_type: 0,
        sys_conf: {
          sys_conf_condition: 0,
          sys_conf_content: []
        },
        ad_info: {}
      },
      activeName: '1'
    }
  },
  methods: {
    getFlowInfo(row) {
      this.baseInfo = row
      this.loading = true
      flowConfDetail({ app_key: row.app_key, flow_id: row.id, conf_type: row.conf_type }).then(res => {
        this.flowForm = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleClick(tab, event) {
      console.log(tab.name)
    },
    handleClose() {
      this.$emit('cancel-view')
    }
  }
}
</script>
