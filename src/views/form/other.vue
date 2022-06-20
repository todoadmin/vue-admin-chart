<template>
  <el-row :gutter="12">
    <div class="comm-frm">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="步骤条" name="first">
          <el-steps :space="200" :active="1" finish-status="success">
            <el-step title="Done" />
            <el-step title="Processing" />
            <el-step title="Step 3" />
          </el-steps>
        </el-tab-pane>
        <el-tab-pane label="时间线" name="second">
          <el-timeline>
            <el-timeline-item timestamp="2018/4/12" placement="top">
              <el-card>
                <h4>Update Github template</h4>
                <p>Tom committed 2018/4/12 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <el-card>
                <h4>Update Github template</h4>
                <p>Tom committed 2018/4/3 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
              <el-card>
                <h4>Update Github template</h4>
                <p>Tom committed 2018/4/2 20:46</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
        <el-tab-pane label="树形结构" name="third">
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
        </el-tab-pane>
        <el-tab-pane label="标签" name="fourth">
          <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
          <span class="tag-group__title m-1 line-height-2">Dark</span>
          <el-tag
            v-for="item in items"
            :key="item.label"
            :type="item.type"
            class="mx-1"
            effect="dark"
          >
            {{ item.label }}
          </el-tag>
          <el-tag
            v-for="item in items"
            :key="item.label"
            :type="item.type"
            class="mx-1"
            effect="dark"
            closable
          >
            {{ item.label }}
          </el-tag>
        </div>
        <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
          <span class="tag-group__title m-1">Plain</span>
          <el-tag
            v-for="item in items"
            :key="item.label"
            class="mx-1"
            :type="item.type"
            effect="plain"
          >
            {{ item.label }}
          </el-tag>
          <el-tag
            v-for="item in items"
            :key="item.label"
            class="mx-1"
            :type="item.type"
            effect="plain"
            closable
          >
            {{ item.label }}
          </el-tag>
        </div>
        </el-tab-pane>
        <el-tab-pane label="进度条" name="five">
          <div class="demo-progress">
            <el-progress :percentage="50">
              <el-button text>Content</el-button>
            </el-progress>
            <el-progress
              :text-inside="true"
              :stroke-width="20"
              :percentage="50"
              status="exception"
            >
              <span>Content</span>
            </el-progress>
            <el-progress type="circle" :percentage="100" status="success">
              <el-button type="success" :icon="Check" circle />
            </el-progress>
            <el-progress type="dashboard" :percentage="80">
              <template #default="{ percentage }">
                <span class="percentage-value">{{ percentage }}%</span>
                <span class="percentage-label">Progressing</span>
              </template>
            </el-progress>
          </div>
        </el-tab-pane>
        <el-tab-pane label="按钮" name="six">
          <el-row class="mb-4">
          <el-button>Default</el-button>
          <el-button type="primary">Primary</el-button>
          <el-button type="success">Success</el-button>
          <el-button type="info">Info</el-button>
          <el-button type="warning">Warning</el-button>
          <el-button type="danger">Danger</el-button>
          <el-button>中文</el-button>
        </el-row>

        <el-row class="mb-4">
          <el-button plain>Plain</el-button>
          <el-button type="primary" plain>Primary</el-button>
          <el-button type="success" plain>Success</el-button>
          <el-button type="info" plain>Info</el-button>
          <el-button type="warning" plain>Warning</el-button>
          <el-button type="danger" plain>Danger</el-button>
        </el-row>

        <el-row class="mb-4">
          <el-button round>Round</el-button>
          <el-button type="primary" round>Primary</el-button>
          <el-button type="success" round>Success</el-button>
          <el-button type="info" round>Info</el-button>
          <el-button type="warning" round>Warning</el-button>
          <el-button type="danger" round>Danger</el-button>
        </el-row>

        <el-row>
          <el-button :icon="Search" circle />
          <el-button type="primary" :icon="Edit" circle />
          <el-button type="success" :icon="Check" circle />
          <el-button type="info" :icon="Message" circle />
          <el-button type="warning" :icon="Star" circle />
          <el-button type="danger" :icon="Delete" circle />
        </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-row>

  <el-row :gutter="12">
    <div class="comm-frm">
      <el-row>
        <el-col
          v-for="(o, index) in 2"
          :key="o"
          :span="8"
          :offset="index > 0 ? 2 : 0"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px">
              <span>Yummy hamburger</span>
              <div class="bottom">
                <time class="time">{{ currentDate }}</time>
                <el-button text class="button">Operating</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-row>

  <el-row :gutter="12">
    <div class="comm-frm">
     <el-skeleton />
      <br />
      <el-skeleton style="--el-skeleton-circle-size: 100px">
        <template #template>
          <el-skeleton-item variant="circle" />
        </template>
      </el-skeleton>
    </div>
  </el-row>

  <el-row :gutter="12">
    <div class="comm-frm">
      <el-row>
        <el-col :sm="12" :lg="6">
          <el-result
            icon="success"
            title="Success Tip"
            sub-title="Please follow the instructions"
          >
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="6">
          <el-result
            icon="warning"
            title="Warning Tip"
            sub-title="Please follow the instructions"
          >
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="6">
          <el-result
            icon="error"
            title="Error Tip"
            sub-title="Please follow the instructions"
          >
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="6">
          <el-result icon="info" title="Info Tip">
            <template #sub-title>
              <p>Using slot as subtitle</p>
            </template>
            <template #extra>
              <el-button type="primary">Back</el-button>
            </template>
          </el-result>
        </el-col>
      </el-row>
    </div>
  </el-row>

  <el-row :gutter="12">
    <div class="comm-frm">
      <el-radio-group v-model="size">
        <el-radio label="large">Large</el-radio>
        <el-radio>Default</el-radio>
        <el-radio label="small">Small</el-radio>
      </el-radio-group>

      <el-descriptions
        class="margin-top"
        title="With border"
        :column="3"
        :size="size"
        border
      >
        <template #extra>
          <el-button type="primary">Operation</el-button>
        </template>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <user />
              </el-icon>
              Username
            </div>
          </template>
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
              </el-icon>
              Telephone
            </div>
          </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <location />
              </el-icon>
              Place
            </div>
          </template>
          Suzhou
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <tickets />
              </el-icon>
              Remarks
            </div>
          </template>
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <office-building />
              </el-icon>
              Address
            </div>
          </template>
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions
        class="margin-top"
        title="Without border"
        :column="3"
        :size="size"
        :style="blockMargin"
      >
        <template #extra>
          <el-button type="primary">Operation</el-button>
        </template>
        <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
        <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
        <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref,computed } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import type { TagProps } from 'element-plus'
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from '@element-plus/icons-vue'
type Item = { type: TagProps['type']; label: string }
interface Tree {
  label: string
  children?: Tree[]
}

export default defineComponent({
  name: 'OtherIndex',
  setup() {
    const activeName = ref('first')
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }

    const handleNodeClick = (data: Tree) => {
      console.log(data)
    }

    const data: Tree[] = [
      {
        label: 'Level one 1',
        children: [
          {
            label: 'Level two 1-1',
            children: [
              {
                label: 'Level three 1-1-1',
              },
            ],
          },
        ],
      },
      {
        label: 'Level one 2',
        children: [
          {
            label: 'Level two 2-1',
            children: [
              {
                label: 'Level three 2-1-1',
              },
            ],
          },
          {
            label: 'Level two 2-2',
            children: [
              {
                label: 'Level three 2-2-1',
              },
            ],
          },
        ],
      },
      {
        label: 'Level one 3',
        children: [
          {
            label: 'Level two 3-1',
            children: [
              {
                label: 'Level three 3-1-1',
              },
            ],
          },
          {
            label: 'Level two 3-2',
            children: [
              {
                label: 'Level three 3-2-1',
              },
            ],
          },
        ],
      },
    ]

    const defaultProps = {
      children: 'children',
      label: 'label',
    }
    const items = ref<Array<Item>>([
      { type: '', label: 'Tag 1' },
      { type: 'success', label: 'Tag 2' },
      { type: 'info', label: 'Tag 3' },
      { type: 'danger', label: 'Tag 4' },
      { type: 'warning', label: 'Tag 5' },
    ])
    const currentDate = ref(new Date())

    const size:any = ref('')
    const iconStyle = computed(() => {
      const marginMap:any = {
        large: '8px',
        default: '6px',
        small: '4px',
      }
      return {
        marginRight: marginMap[size.value] || marginMap.default,
      }
    })
    const blockMargin = computed(() => {
      const marginMap:any = {
        large: '32px',
        default: '28px',
        small: '24px',
      }
      return {
        marginTop: marginMap[size.value] || marginMap.default,
      }
    })

    return {
      activeName,handleClick,
      handleNodeClick,data,defaultProps,
      items,Check,Delete,
      Edit,
      Message,
      Search,
      Star,
      Location,
      OfficeBuilding,
      Tickets,
      User,
      currentDate,
      iconStyle,
      blockMargin,
      size,
    }
  }
})
</script>

<style scoped lang="scss">
.comm-frm {
  width:100%;
  margin: 20px 15px 10px 15px;
  padding:20px;
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
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .el-progress--circle {
  margin-right: 15px;
}
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>
