<template>
  <div class="dashboard-editor-container">
    <panel-group />
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 15px">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import { report } from '@/api/report'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable
  },
  data() {
    return {
      lineChartData: {
        xGrid: [],
        reports: {},
        maps: {}
      }
    }
  },
  mounted() {
    this.getChartData()
  },
  methods: {
    getChartData() {
      report({ day_start: '2021-05-19', day_end: '2021-05-27' }).then(res => {
        const data = res.data
        this.lineChartData.maps = data.maps
        Object.keys(data.maps).forEach((key, idx) => {
          this.$set(this.lineChartData.reports, key, [])
          data.reports.forEach((v, k) => {
            // 横坐标
            if (idx == 0) {
              this.lineChartData.xGrid.push(v.days)
            }
            // 数据
            this.lineChartData.reports[key].push(v[key])
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  position: relative;
  margin-bottom: 20px;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 20px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
