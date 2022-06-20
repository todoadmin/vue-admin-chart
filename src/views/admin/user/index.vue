<template>
  <el-row :gutter="12">
    <div class="sear-frm">
      <el-form ref="searFormRef" :inline="true" :model="data.searForm" class="form-inline">
        <el-form-item label="用户名">
          <el-input v-model="data.searForm.username" class="w-120" placeholder="输入用户名" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="data.searForm.status" class="w-150" placeholder="选择状态">
            <el-option label="全部" value="0" />
            <el-option label="正常" value="1" />
            <el-option label="暂停" value="2" />
            <el-option label="停用" value="3" />
          </el-select>
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
        <el-button type="primary" :icon="CirclePlus" @click="addUser()">添加</el-button>
        <el-button type="danger" :icon="CircleClose" @click="dels">删除</el-button>
        <el-button type="success" :icon="CircleCheck" @click="unlocks">解锁</el-button>
        <el-button type="warning" :icon="Warning" @click="locks">锁定</el-button>
      </div>
    </div>
    <el-table :data="data.table.list" border stripe ref="multipleRef" @selection-change="multiChange" class="table-data" empty-text="没有数据" :header-cell-style="{background:'#f0f1f2'}">
      <el-table-column type="selection" width="40" />
      <el-table-column prop="uid" label="用户ID" sortable width="100" />
      <el-table-column prop="username" label="用户名" width="130" align="center">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>真名: {{ scope.row.truename }}</div>
            </template>
            <template #reference>
              {{ scope.row.username }}
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="level" label="级别"  width="105" >
        <template #default="scope">
          <el-tag v-if="scope.row.level === 0" type="" disable-transitions >普通管理员</el-tag >
          <el-tag v-else-if="scope.row.level === 10" type="success" disable-transitions >超级管理员</el-tag >
          <el-tag v-else type="info" disable-transitions >未分配</el-tag >
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="70"
        :filters="[
          { text: '正常', value: 1 },
          { text:'暂停', value: 2 },
          { text: '停用', value: 3 },
        ]" :filter-method="filterStatus" filter-placement="bottom-end">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 1" type="success" disable-transitions >正常</el-tag >
          <el-tag v-else-if="scope.row.status === 2" type="warn" disable-transitions >暂停</el-tag >
          <el-tag v-else-if="scope.row.status === 3" type="danger" disable-transitions >停用</el-tag >
          <el-tag v-else type="default" disable-transitions >未知</el-tag >
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="70" >
        <template #default="scope">
          <el-tag v-if="scope.row.gender === 1" type="" disable-transitions >男性</el-tag >
          <el-tag v-else-if="scope.row.gender === 2" type="success" disable-transitions >女性</el-tag >
          <el-tag v-else type="info" disable-transitions >未知</el-tag >
        </template>
      </el-table-column>
      <el-table-column prop="login_time" label="登陆时间" width="180" >
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>注册时间: {{ comm.formatDate(scope.row.create_time) }}</div>
              <div>更新时间: {{ comm.formatDate(scope.row.update_time) }}</div>
            </template>
            <template #reference>
              {{ scope.row.login_time }}
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="IP" width="160" align="center" >
        <template #default="scope">
          {{ comm.long2ip(scope.row.ip) }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="E-mail" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button type="danger" link size="small" @click="del(scope.row)" style="color: red;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Search, Warning, CirclePlus, CircleCheck, CircleClose } from '@element-plus/icons-vue'
import type { ElTable } from 'element-plus'
import { comm } from '@/utils'
import { SAdmin } from '@/service'
import { G } from '@/config'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

export default defineComponent({
  name: 'AdminIndex',
  setup() {
    const searFormRef:any = ref<FormInstance>()
    const multipleRef = ref<InstanceType<typeof ElTable>>()
    //获取组件的ref
    const editFrm:any = ref(null)

    //常用的响应数据
    const data:any = reactive({
      //Table列表相关数据
      table: {
        list: [],// table列表数据数组
      },
      form: {
        uid: 1,
        username: 'admin'
      },
      //搜索Form表单相关数据
      searForm: {
        username: '',
        status: '1',
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

    // Table的列排序
    const filterStatus = (value: number, row: any) => {
      return row.status === value
    }

    //分页
    const currentChange = (val: number) => {
      data.pagination.current = val
      getList(para);
    }

    // 新增
    const addUser = () => {
      ElMessage.success('新增')
    }

    //多选中数据
    const multiChange = (val: any) => {
      ElMessage.success('多选数据')
    }

    
    //批量操作-锁定
    const locks = () => {
      ElMessage.warning('批量锁定')
    }

    //批量操作-解锁
    const unlocks = () => {
      ElMessage.warning('批量解锁')
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
      SAdmin.list(para).then((result : any) => {
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
      CirclePlus,
      Warning,
      CircleCheck,
      CircleClose,
      searFormRef,
      pageSearch,
      addUser,
      del,
      dels,
      unlocks,
      locks,
      editFrm,
      data,
      para,
      multipleRef,
      multiChange,
      filterStatus,
      currentChange,
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
  margin: 20px 15px 15px 15px;
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
