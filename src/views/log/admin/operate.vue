<template>
  <el-row :gutter="12">
    <div class="sear-frm">
      <el-form ref="searFormRef" :inline="true" :model="data.searForm" class="form-inline">
        <el-form-item label="用户名">
          <el-input v-model="data.searForm.username" class="w-120" placeholder="输入用户名" />
        </el-form-item>
        <el-form-item label="日期" class="w-300">
            <el-date-picker v-model="data.searForm.date" type="daterange" range-separator="-"
              start-placeholder="开始时间" end-placeholder="结束时间"
              format="YYYY/MM/DD" value-format="YYYY-MM-DD"  />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pageSearch(searFormRef)" :icon="Search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-row>
  <el-row :gutter="12"  class="tab-container">
    <div class="tab-bar">
      <div class="box-left">
        <el-button type="danger" :icon="CircleClose" @click="deleteLogs()">删除日志</el-button>
      </div>
      <div class="tab-bar-txt box-right">总共 {{ data.pagination.total }} </div>
    </div>
    <el-table :data="data.table.list" border stripe ref="multipleRef" @selection-change="multiChange" class="table-data" empty-text="没有数据" :header-cell-style="{background:'#EDF0F0'}">
      <el-table-column type="selection" width="40" />
      <el-table-column prop="id" label="ID" sortable width="80" align="center" />
      <el-table-column prop="uqid" label="唯一ID" sortable width="110" align="center" />
      <el-table-column prop="username" label="用户名" width="110" align="center">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>用户ID: {{ scope.row.uid }}</div>
            </template>
            <template #reference>
              {{ scope.row.username }}
            </template>
          </el-popover>
        </template>
      </el-table-column>
      
      <el-table-column prop="func_code" label="功能编号" width="90" align="center" />
      <el-table-column prop="link_id" label="连接ID" width="90" align="center" />
      <el-table-column prop="ip" label="IP" width="140" align="center">
        <template #default="scope">
          {{ comm.long2ip(scope.row.ip) }}
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" width="auto" align="center" />
      <el-table-column prop="create_time" label="创建时间" width="180" >
        <template #default="scope">
          {{ comm.formatDate(scope.row.create_time) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="60" align="center" >
        <template #default="scope">
          <el-button type="danger" link size="small" @click="deleteLog(scope.row)" style="color: red;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>

  <el-row :gutter="12">
    <el-pagination :hide-on-single-page="data.pagination.value" background layout="prev, pager, next" 
    :total="data.pagination.total" :page-size="data.pagination.size" class="page-pagination" 
    @current-change="currentChange" />
    <el-space>
      <div class="pager-bar-txt">总共 {{ data.pagination.page }} 页<span class="space-page">-</span>{{ data.pagination.size }} / 每页</div>
    </el-space>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Search, CircleCheck, CircleClose } from '@element-plus/icons-vue'
import type { ElTable } from 'element-plus'
import { comm } from '@/utils'
import { G } from '@/config'
import { SLogAdminOpr } from '@/service'
import { ElMessage,ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'


export default defineComponent({
  name: 'AdminOpr',
  setup() {
    const searFormRef:any = ref<FormInstance>()
    const multipleRef = ref<InstanceType<typeof ElTable>>()


    //常用的响应数据
    const data:any = reactive({
      table: {
        list: []
      },
      //搜索Form表单相关数据
      searForm: {
        title: '',
        date: ['',''],
      },
      //多选中数据
      multi: {
        ids: [],
        idstr: ''
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
      size: data.pagination.size,
    })

    //分页
    const currentChange = (val: number) => {
      ElMessage.success(val + ' 页')
    }

    //多选中数据
    const multiChange = (val: any) => {
      ElMessage.success('多选数据')
    }

    //批量操作-删除
    const deleteLogs = () => {
      ElMessage.error('批量删除')
    }
    
    //删除
    const deleteLog = (item:any) => {
      ElMessage.error('删除')
    }
    
    // 获取列表数据
    const getList = (para:any) => {
      // 请求Table列表数据服务
      SLogAdminOpr.list(para).then((result : any) => {
        if (result.code === 0) {
          data.table.list = result.data.list
          data.pagination.total = result.data.total
          data.pagination.size = result.data.size
          data.pagination.page = result.data.page
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
      Search,
      CircleCheck,
      CircleClose,
      searFormRef,
      pageSearch,
      data,
      multipleRef,
      multiChange,
      currentChange,
      deleteLog,
      deleteLogs,
      getList
    }
  }
})
</script>
<style scoped lang="scss">
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
</style>
