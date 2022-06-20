<template>
    <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-alert class="alert-box" type="warning" show-icon>
                <div class="alert-msg">
                    <a href="#" target="_blank">
                        【本站所有数据均为展示用途 - 开源面向中小企业各种信息系统】
                    </a>
                    <p>一阳动、万物生！愿美好不期而遇、愿幸福如约而至、愿疫情早日消散、一起奔赴更好的未来、不辜负你我所有的努力。</p>
                </div>
            </el-alert>
        </el-col>
    </el-row>
</template>
<style scoped lang="scss">
.alert-box {
    border:1px solid #cf504f; background: #fff;
    margin-bottom: 15px;
    margin-top: 15px;
    height:40px;
    .alert-msg {
        display: flex; align-items: center; justify-content: center;color:#222;
        a {
            text-decoration: none;
            font-size:16px;
            color:#cf504f;
        }
    }
    img {margin-right: 10px;}
    p {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}
</style>
