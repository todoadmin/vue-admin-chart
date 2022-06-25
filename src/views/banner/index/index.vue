<template>
    <el-carousel :interval="4000" type="card" height="260px" class="adv-banner">
      <el-carousel-item v-for="item of data.table.carouselList" :key="item.index">
        <img :src="item.url" class="banner_img" :fit="data.table.fit" />
        <div class="banner-label">
          <p>{{ item.label }}</p>
        </div>
      </el-carousel-item>
    </el-carousel>

  <el-row :gutter="12"  class="tab-container">
    <div class="tab-bar">
      <div class="box-left">
        <el-button type="primary" icon="CirclePlus">新增</el-button>
        <el-button type="danger" icon="CircleClose" @click="dels">删除</el-button>
        <el-button type="success" icon="CircleCheck" >上架</el-button>
        <el-button type="warning" icon="Warning" >下架</el-button>
      </div>
      <div class="tab-bar-txt box-right">总共 {{ data.pagination.total }}  </div>
    </div>
    <el-table :data="data.table.list" border stripe ref="multipleRef" @selection-change="multiChange" class="table-data" empty-text="没有数据" :header-cell-style="{background:'#f0f1f2'}">
      <el-table-column type="selection" width="40" />
      <el-table-column prop="uqid" label="ID" sortable width="70" align="center" ></el-table-column>
      <el-table-column prop="status" label="状态" width="70" >
        <template #default="scope">
          <el-tag v-if="scope.row.status === 0" type="danger" disable-transitions >未发布</el-tag >
          <el-tag v-else-if="scope.row.status === 1" type="success" disable-transitions >上架</el-tag >
          <el-tag v-else-if="scope.row.status === 2" type="warning" disable-transitions >下架</el-tag >
        </template>
      </el-table-column>
      
      <el-table-column label="图片" width="160" align="center" >
        <template #default="scope">
          <img v-if="scope.row.thumb_url" :src="scope.row.thumb_url" width="160"  />
        </template>
      </el-table-column>
       <el-table-column prop="url" label="URL" width="200" align="center" />
      <el-table-column prop="title" label="标题" >
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
               {{ scope.row.content }}
            </template>
            <template #reference>
              {{ scope.row.title }}
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="start_time" label="日期" width="160" align="center" >
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>结束日期: {{ comm.formatDate(scope.row.end_time) }}</div>
            </template>
            <template #reference>
              {{ comm.formatDate(scope.row.start_time) }}
            </template>
          </el-popover>
        </template>
      </el-table-column>
      
      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope">
          <el-button type="primary" link size="small" >编辑</el-button>
          <el-button type="warning" link size="small" v-if="scope.row.status == 1">下架</el-button>
          <el-button type="success" link size="small" v-else>上架</el-button>
          <el-button type="danger" link size="small" @click="del(scope.row)" style="color: red;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { ElTable } from 'element-plus'
import { comm,setting } from '@/utils'
import { SBanner } from '@/service'
import { G } from '@/config'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

export default defineComponent({
  name: 'BannerIndex',
  setup() {
    const searFormRef:any = ref<FormInstance>()
    const multipleRef = ref<InstanceType<typeof ElTable>>()
    //获取组件的ref
    const addFrm:any = ref(null)
    //获取组件的ref
    const editFrm:any = ref(null)
    //获取用户信息
    const userInfo = setting.getUserInfo()

    //常用的响应数据
    const data:any = reactive({
      //Table列表相关数据
      table: {
        list: [],// table列表数据数组
        carouselList: [],// banner列表
        length:5,//多少个橱窗广告
        fit: 'scale-down',
      },
      form: {
        uid: userInfo.uid,
        username: userInfo.username
      },
      //搜索Form表单相关数据
      searForm: {
        title: '',
        status: '0',
        date: ['',''],
      },
      //多选中数据
      multi: {
        uids: [],
        uidstr: ''
      },
      // 分页相关
      pagination: {
        value: false,
        current:1,//当前的页数
        total:0,//总共多少条
        size:G.TABLE_LIST_SIZE,// 条/每页
        page:0,// 多少页
      }
    })

    //请求/提交的 参数数据
    const para = reactive({
      current: data.pagination.current,
    })

    //分页
    const currentChange = (val: number) => {
      data.pagination.current = val
      getList(para);
    }

    //多选中数据
    const multiChange = (val: any) => {
      ElMessage.success('多选数据')
    }

    //批量操作-删除
    const dels = () => {
      ElMessage.error('批量删除')
    }

    //删除
    const del = (item:any) => {
      ElMessage.error('删除')
    }

    // 获取列表数据
    const getList = (para:any) => {
      // 请求Table列表数据服务
      SBanner.list(para).then((result : any) => {
        if (result.code === 0) {
          data.table.cate = result.data.cate
          data.pagination.total = result.data.total
          data.pagination.size = result.data.size
          data.pagination.page = result.data.page
          data.table.list = result.data.list
          let list:any = result.data.list
          let carouselList:any = []
          let index = 1
          let limit = data.table.length
          list.forEach((param:any) => {
            if (typeof param.banner_url !== 'undefined' && param.banner_url) {
              let carousel
              carousel = {
                id: index++,
                label: param.title,
                url: param.banner_url
              }
              carouselList.push(carousel)
              if (index >= limit) return
            }
          })
          data.table.carouselList = carouselList
        } else {
          ElMessage.error(result.message)
        }
      }).catch((err: any) => {
        console.log(err)
        ElMessage.error(err)
      })
    }
    getList(para);

    // 搜索页面
    const pageSearch = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      ElMessage.success('搜索页面')
    }
    
    return {
      comm,
      searFormRef,
      pageSearch,
      del,
      dels,
      data,
      para,
      multipleRef,
      multiChange,
      currentChange,
      getList
    }
  }
})
</script>

<style scoped lang="scss">
.adv-banner {
  margin:10px 10px 20px 10px !important;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}


:deep(.el-table th) {
  text-align: center !important;
  padding:11px 0;
}
:deep(.el-table__header tr th) {
  background: #f3f9fd !important;
}
:deep(.tab-bar .el-button) {
  padding: 5px 15px;
  margin: 2px 10px 16px 0;
}
.tab-bar {
  margin: 0 15px;
  width:100%;
}
.box-left {
  float: left;
}
.box-right {
  float:right;
}
.table-data {
  width: 100%;
  margin: 0 15px 15px 15px;
}
.tab-bar-txt {
  padding: 12px 10px 12px 20px;
  color: #999;
}
.pager-bar-txt {
  margin: 0 10px 0 20px;
  color: #999;
}
.sear-frm {
  margin: 20px 15px 10px 15px;
  width:100%;
  text-align: left;
  background-color: #f8f8f8;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  .form-inline {
    margin: 18px 10px 0 10px;
  }
  .el-form-item {
    margin-right: 15px;
  }
}
.tab-container {
  margin: 2px;
  background-color: #fff;
  border-radius: 2px;
}
.page-pagination {
  margin: 0 0 0 10px;
}
.sp-gray-20 {margin-right:20px;}
.w-80 {width:80px;}
.w-100 {width:100px;}
.w-120 {width:120px;}
.w-150 {width:150px;}
.w-200 {width:200px;}
.w-300 {width:300px;}
.space-page { margin: 0 10px;}
.mtb-5 {margin:5px 0;}
.mtb-10 {margin:10px 0;}

.banner_img {
  width:100%;
  height: 100% !important;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

.banner-label p {
  line-height: 1vh;
  color: #fff;
  text-align: left;
  padding-left: 1vw;
}

.banner-label {
  width: 100%;
  height: 5vh;
  background-color: #111;
  position: absolute;
  bottom: 2vh;
  opacity: 0.5;
  z-index: 9999;
}
</style>
