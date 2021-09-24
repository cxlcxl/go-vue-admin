<template>
  <div class="app-list-container">
    <p class="search-item">
      <el-radio-group v-model="search.platform" :disabled="loadings.searchLoading" @change="getAppList">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button v-for="(item, key) in ConstPlatform" :label="key">{{ item }}</el-radio-button>
      </el-radio-group>
    </p>
    <p class="search-item" style="margin-bottom: 20px;">
      <el-input v-model="search.app_name" placeholder="应用名/APPKEY" clearable @keyup.enter.native="getAppList">
        <el-button slot="append" icon="el-icon-search" :loading="loadings.searchLoading" @click="getAppList">搜索</el-button>
      </el-input>
    </p>
    <div v-loading="loadings.searchLoading" class="list-box">
      <div
        v-for="item in appList.list"
        :class="currentApp|appListClass(item.app_key)"
        :style="item.is_config|colorFilter"
        @click="getAppFlow(item.app_key, item.app_name)"
      >
        <svg-icon :icon-class="item.platform | platformFilter('icon')" />
        <div class="app-icon">
          <img :src="item.icon">
        </div>
        <div class="app-info">
          <p class="name" :style="item.test_mode|testModeFilter">{{ item.app_name }}</p>
          <p class="platform">{{ item.platform | platformFilter('text') }}</p>
        </div>
      </div>
      <div v-show="!appList.list || (appList.list && appList.list.length === 0)" class="no-data">
        <i class="el-icon-folder-opened" /> 未检索到相关数据
      </div>
    </div>

    <el-pagination
      small
      background
      :page-size="10"
      layout="prev, next, jumper, total"
      prev-text="上页"
      next-text="下页"
      :total="appList.total"
      :pager-count="5"
      :hide-on-single-page="true"
      @current-change="handlePage"
    />
  </div>
</template>

<script>
import { getList } from '@/api/app'
import { Platform, Color } from '@/consts'

const platformType = {
  'text': { 1: 'Android', 2: 'IOS', 3: 'H5' },
  'icon': { 1: 'android', 2: 'ios', 3: 'h5' }
}
export default {
  name: 'AdxFlowSettingAppList',
  filters: {
    platformFilter(p, t) {
      return platformType[t][p]
    },
    colorFilter(config) {
      if (config === 1) {
        return { borderColor: Color['success'], color: Color['success'] }
      } else {
        return {}
      }
    },
    testModeFilter(config) {
      if (config === 1) {
        return { color: Color['error'] }
      } else {
        return {}
      }
    },
    appListClass(curAppKey, appKey) {
      return curAppKey === appKey ? 'app-list app-list-active' : 'app-list'
    }
  },
  data() {
    return {
      loadings: {
        searchLoading: false
      },
      initPage: true,
      search: {
        platform: '',
        app_name: '',
        page: 1,
        limit: 10
      },
      currentApp: '',
      appList: {
        list: [],
        total: 0
      }
    }
  },
  computed: {
    ConstPlatform() {
      return Platform
    }
  },
  mounted() {
    this.getAppList()
  },
  methods: {
    getAppList() {
      this.loadings.searchLoading = true
      getList(this.search).then(res => {
        this.appList = res.data
        if (this.appList.list.length > 0 && this.initPage) {
          this.currentApp = this.appList.list[0].app_key
          this.getAppFlow(this.appList.list[0].app_key, this.appList.list[0].app_name)
          this.initPage = false
        }
        this.loadings.searchLoading = false
      }).catch(() => {
        this.loadings.searchLoading = false
      })
    },
    getAppFlow(appKey, developer) {
      this.currentApp = appKey
      this.$emit('refresh-flow', appKey, developer)
    },
    handlePage(p) {
      this.search.page = p
      this.getAppList()
    }
  }
}
</script>

<style scoped lang="scss">
    .app-list-container {
        padding-right: 10px;
        color: #909399;

        p.search-item {
            margin: 0 0 10px 0;
            padding: 0;
        }

        .list-box {
            max-height: 540px;
            overflow-y: scroll;
            border: 1px solid #dee1eb;
            padding: 10px 10px 0;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;

            &::-webkit-scrollbar {
                /*滚动条整体样式*/
                width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
                height: 0;
            }

            &::-webkit-scrollbar-thumb {
                /*滚动条里面小方块*/
                border-radius: 10px;
                background-color: #cccfd8;
            }

            &::-webkit-scrollbar-track {
                /*滚动条里面轨道*/
                background: #ffffff;
            }

            .app-list {
                display: flex;
                margin-bottom: 10px;
                border-radius: 3px;
                overflow: hidden;
                cursor: pointer;
                position: relative;
                border: 1px solid #dadada;

                &:hover {
                    color: #1890ff !important;
                    text-decoration: underline;
                }

                .svg-icon {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: #fff;
                    font-size: 14px;
                }

                .app-icon {
                    width: 50px;
                    height: 40px;

                    img {
                        width: 40px;
                        height: 100%;
                    }
                }

                .app-info {
                    flex: 1;

                    .name {
                        max-width: 200px;
                        font-weight: 600;
                        font-size: 14px;
                        height: 25px;
                        line-height: 25px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .platform {
                        font-size: 12px;
                    }
                }
            }

            .app-list-active {
                border: 2px solid #1890ff !important;
            }

            .no-data {
                margin-bottom: 10px;
                text-align: center;
            }
        }

        .el-pagination {
            margin-top: 10px;
            text-align: center;
        }
    }
</style>
