<template>
  <div class="main-container">
    <el-row :gutter="12">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-result icon="error" title="404" sub-title="抱歉，页⾯貌似离开地球了呢..." >
          <template #extra>
            <a href="/login"><el-button type="primary">返回登陆页面</el-button></a>
          </template>
        </el-result>
    </el-col>
  </el-row>
  </div>
</template>

<style lang="scss" scoped>
  .main-container{
    margin: 50px auto;
    width: 70%;
    background-color: white;
    box-shadow: 0 0 50px 0 rgba(191, 190, 190, 0.6);
    border-radius: 8px !important;
    :deep(.el-result__icon) {
      font-size:60px !important;
    }
    :deep(.el-result__title>p) {
      font-size:70px !important;
      color:#888 !important;
    }
    :deep(.el-result__subtitle>p) {
      font-size:26px !important;
      color:#777 !important;
    }
    :deep(.el-result__extra>a) {
      text-decoration: none;
      font-size:22px !important;
      color:#fff !important;
    }
  }
</style>
