<template>
  <el-row :gutter="12">
    <div class="comm-frm">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="Activity name" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="Activity zone" prop="region">
          <el-select v-model="ruleForm.region" placeholder="Activity zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity count" prop="count">
          <el-select-v2
            v-model="ruleForm.count"
            placeholder="Activity count"
            :options="options"
          />
        </el-form-item>
        <el-form-item label="Activity time" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                v-model="ruleForm.date1"
                type="date"
                label="Pick a date"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="2">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                v-model="ruleForm.date2"
                label="Pick a time"
                placeholder="Pick a time"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="Instant delivery" prop="delivery">
          <el-switch v-model="ruleForm.delivery" />
        </el-form-item>
        <el-form-item label="Activity type" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="Online activities" name="type" />
            <el-checkbox label="Promotion activities" name="type" />
            <el-checkbox label="Offline activities" name="type" />
            <el-checkbox label="Simple brand exposure" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Resources" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="Sponsorship" />
            <el-radio label="Venue" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Activity form" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >Create</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-row>

  <el-row :gutter="12">
    <div class="comm-frm">
      <el-form label-position="left" label-width="150px" style="max-width: 460px">
      <el-space fill>
        <el-alert type="info" show-icon :closable="false">
          <p>"Full Name" label is automatically attached to the input:</p>
        </el-alert>
        <el-form-item label="Full Name">
          <el-input v-model="formAccessibility.fullName" />
        </el-form-item>
      </el-space>
      <el-space fill>
        <el-alert type="info" show-icon :closable="false">
          <p>
            "Your Information" serves as a label for the group of inputs. <br />
            You must specify labels on the individal inputs. Placeholders are not
            replacements for using the "label" attribute.
          </p>
        </el-alert>
        <el-form-item label="Your Information">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input
                v-model="formAccessibility.firstName"
                label="First Name"
                placeholder="First Name"
              />
            </el-col>
            <el-col :span="12">
              <el-input
                v-model="formAccessibility.lastName"
                label="Last Name"
                placeholder="Last Name"
              />
            </el-col>
          </el-row>
        </el-form-item>
      </el-space>
    </el-form>
    </div>
  </el-row>

  <el-row :gutter="12">
    <div class="comm-frm">
        <el-transfer
      v-model="leftValue"
      style="text-align: left; display: inline-block"
      filterable
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :render-content="renderFunc"
      :titles="['Source', 'Target']"
      :button-texts="['To left', 'To right']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      :data="data"
      @change="handleChange"
    >
      <template #left-footer>
        <el-button class="transfer-footer" size="small">Operation</el-button>
      </template>
      <template #right-footer>
        <el-button class="transfer-footer" size="small">Operation</el-button>
      </template>
    </el-transfer>
    </div>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { VNode, VNodeProps } from 'vue'
interface Option {
  key: number
  label: string
  disabled: boolean
}

export default defineComponent({
  name: 'FormIndex',
  setup() {
    const formSize = ref('default')
    const ruleFormRef = ref<FormInstance>()
    const ruleForm = reactive({
      name: 'Hello',
      region: '',
      count: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    })

    const rules = reactive<FormRules>({
      name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ],
      region: [
        {
          required: true,
          message: 'Please select Activity zone',
          trigger: 'change',
        },
      ],
      count: [
        {
          required: true,
          message: 'Please select Activity count',
          trigger: 'change',
        },
      ],
      date1: [
        {
          type: 'date',
          required: true,
          message: 'Please pick a date',
          trigger: 'change',
        },
      ],
      date2: [
        {
          type: 'date',
          required: true,
          message: 'Please pick a time',
          trigger: 'change',
        },
      ],
      type: [
        {
          type: 'array',
          required: true,
          message: 'Please select at least one activity type',
          trigger: 'change',
        },
      ],
      resource: [
        {
          required: true,
          message: 'Please select activity resource',
          trigger: 'change',
        },
      ],
      desc: [
        { required: true, message: 'Please input activity form', trigger: 'blur' },
      ],
    })

    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    const options = Array.from({ length: 10000 }).map((_, idx) => ({
      value: `${idx + 1}`,
      label: `${idx + 1}`,
    }))

    const formAccessibility = reactive({
      fullName: '',
      firstName: '',
      lastName: '',
    })

    const generateData = (): Option[] => {
    const data: Option[] = []
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `Option ${i}`,
        disabled: i % 4 === 0,
      })
    }
    return data
  }

    const data = ref(generateData())
    const rightValue = ref([1])
    const leftValue = ref([1])

    const renderFunc = (
      h: (type: string, props: VNodeProps | null, children?: string) => VNode,
      option: Option
    ) => {
      return h('span', null, option.label)
    }
    const handleChange = (
      value: number | string,
      direction: 'left' | 'right',
      movedKeys: string[] | number[]
    ) => {
      console.log(value, direction, movedKeys)
    }
    
    return {
      generateData,
      data,rightValue,leftValue,renderFunc,handleChange,
      submitForm,
      resetForm,
      options,
      rules,
      ruleForm,
      ruleFormRef,
      formSize,
      formAccessibility
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
</style>
