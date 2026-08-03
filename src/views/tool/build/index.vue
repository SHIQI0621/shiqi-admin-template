<template>
  <div class="form-build">
    <el-row :gutter="16">
      <el-col :span="6">
        <Card class="component-panel" :border-radius="16">
          <template #header><span>基础组件</span></template>
          <div class="component-list">
            <div 
              v-for="item in basicComponents" 
              :key="item.type"
              class="component-item"
              draggable="true"
              @dragstart="handleDragStart($event, item)"
            >
              <el-icon :size="18"><component :is="item.icon" /></el-icon>
              <span>{{ item.label }}</span>
            </div>
          </div>
          
          <el-divider />
          <div class="section-title"><span>高级组件</span></div>
          <div class="component-list">
            <div 
              v-for="item in advancedComponents" 
              :key="item.type"
              class="component-item"
              draggable="true"
              @dragstart="handleDragStart($event, item)"
            >
              <el-icon :size="18"><component :is="item.icon" /></el-icon>
              <span>{{ item.label }}</span>
            </div>
          </div>
        </Card>
      </el-col>
      
      <el-col :span="12">
        <Card class="preview-panel" :border-radius="16">
          <template #header>
            <div class="card-header">
              <span>表单预览</span>
              <div>
                <el-button size="small" @click="handlePreview">预览</el-button>
                <el-button size="small" type="primary" @click="handleExport">导出JSON</el-button>
                <el-button size="small" type="success" @click="handleClear">清空</el-button>
              </div>
            </div>
          </template>
          
          <div 
            class="form-design-area"
            @drop="handleDrop"
            @dragover.prevent
          >
            <el-empty v-if="!formItems.length" description="拖拽左侧组件到此处开始构建表单" />
            
            <draggable 
              v-else
              v-model="formItems"
              item-key="id"
              handle=".drag-handle"
              animation="200"
            >
              <template #item="{ element, index }">
                <div class="form-item-wrapper" :class="{ active: activeIndex === index }" @click="activeIndex = index">
                  <div class="drag-handle">
                    <el-icon><Rank /></el-icon>
                  </div>
                  <div class="form-item-content">
                    <label>{{ element.label }}{{ element.required ? '*' : '' }}</label>
                    <component 
                      :is="getComponent(element.type)" 
                      v-model="element.value"
                      v-bind="element.props || {}"
                      :placeholder="'请输入' + element.label"
                    />
                  </div>
                  <div class="form-item-actions">
                    <el-button link type="danger" size="small" @click.stop="removeItem(index)">
                      <el-icon><Delete /></el-icon>
                    </el-button>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </Card>
      </el-col>
      
      <el-col :span="6">
        <Card class="property-panel" :border-radius="16">
          <template #header><span>属性设置</span></template>
          
          <el-empty v-if="!activeItem" description="点击表单项编辑属性" />
          
          <el-form v-else label-width="80px" size="small">
            <el-form-item label="标签名">
              <el-input v-model="activeItem.label" />
            </el-form-item>
            <el-form-item label="字段名">
              <el-input v-model="activeItem.field" />
            </el-form-item>
            <el-form-item label="占位符">
              <el-input v-model="activeItem.placeholder" />
            </el-form-item>
            <el-form-item label="必填">
              <el-switch v-model="activeItem.required" />
            </el-form-item>
            <el-form-item label="默认值" v-if="['input', 'textarea', 'number'].includes(activeItem.type)">
              <el-input v-model="activeItem.defaultValue" />
            </el-form-item>
            <el-form-item label="选项" v-if="['select', 'radio', 'checkbox'].includes(activeItem.type)">
              <div v-for="(opt, idx) in (activeItem.options || [])" :key="idx" class="option-item">
                <el-input v-model="opt.label" placeholder="标签" style="width: 100px" />
                <el-input v-model="opt.value" placeholder="值" style="width: 100px; margin-left: 8px" />
                <el-button link type="danger" @click="activeItem.options?.splice(idx, 1)">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
              <el-button link type="primary" @click="addOption">+ 添加选项</el-button>
            </el-form-item>
            <el-form-item label="最大长度" v-if="['input', 'textarea'].includes(activeItem.type)">
              <el-input-number v-model="activeItem.maxLength" :min="1" :max="500" />
            </el-form-item>
          </el-form>
        </Card>
      </el-col>
    </el-row>
    
    <Dialog v-model="previewVisible" title="表单预览" width="600px">
      <el-form :model="previewData" label-width="100px">
        <el-form-item 
          v-for="item in formItems" 
          :key="item.id"
          :label="item.label"
          :required="item.required"
        >
          <component 
            :is="getComponent(item.type)" 
            v-model="previewData[item.field]"
            v-bind="item.props || {}"
            :placeholder="item.placeholder || ('请输入' + item.label)"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="previewVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleSubmitPreview">提交</el-button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'FormBuild' })
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Rank, Delete } from '@element-plus/icons-vue'
import Draggable from '@/components/Draggable/index.vue'
import Dialog from '@/components/Dialog/index.vue'

interface FormComponent {
  type: string
  label: string
  icon: string
}

interface FormItem {
  id: number
  type: string
  label: string
  field: string
  required?: boolean
  placeholder?: string
  defaultValue?: any
  value?: any
  props?: Record<string, any>
  options?: Array<{ label: string; value: string }>
  maxLength?: number
}

const basicComponents: FormComponent[] = [
  { type: 'input', label: '输入框', icon: 'Edit' },
  { type: 'textarea', label: '文本域', icon: 'Document' },
  { type: 'number', label: '数字框', icon: 'Histogram' },
  { type: 'select', label: '下拉选择', icon: 'ArrowDown' },
  { type: 'radio', label: '单选框', icon: 'CircleCheck' },
  { type: 'checkbox', label: '多选框', icon: 'Select' },
  { type: 'date', label: '日期选择', icon: 'Calendar' },
  { type: 'time', label: '时间选择', icon: 'Timer' },
]

const advancedComponents: FormComponent[] = [
  { type: 'switch', label: '开关', icon: 'Switch' },
  { type: 'slider', label: '滑块', icon: 'Sort' },
  { type: 'rate', label: '评分', icon: 'Star' },
  { type: 'color', label: '颜色选择', icon: 'Brush' },
  { type: 'upload', label: '上传', icon: 'Upload' },
  { type: 'editor', label: '富文本', icon: 'Notebook' },
]

const formItems = ref<FormItem[]>([])
const activeIndex = ref(-1)
const previewVisible = ref(false)
const previewData = reactive<Record<string, any>>({})
let itemIdCounter = 0

const activeItem = computed<FormItem | null>(() => {
  return activeIndex.value >= 0 ? formItems.value[activeIndex.value] : null
})

function getComponent(type: string): string {
  const map: Record<string, string> = {
    input: 'ElInput',
    textarea: 'ElInput',
    number: 'ElInputNumber',
    select: 'ElSelect',
    radio: 'ElRadioGroup',
    checkbox: 'ElCheckboxGroup',
    date: 'ElDatePicker',
    time: 'ElTimePicker',
    switch: 'ElSwitch',
    slider: 'ElSlider',
    rate: 'ElRate',
    color: 'ElColorPicker',
    upload: 'ElUpload',
    editor: 'div'
  }
  return map[type] || 'ElInput'
}

function handleDragStart(e: DragEvent, item: FormComponent) {
  if (e.dataTransfer) {
    e.dataTransfer.setData('component', JSON.stringify(item))
  }
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  if (!e.dataTransfer) return
  
  const data = e.dataTransfer.getData('component')
  if (!data) return
  
  const component = JSON.parse(data) as FormComponent
  const newItem: FormItem = {
    id: ++itemIdCounter,
    type: component.type,
    label: component.label,
    field: `field_${itemIdCounter}`,
    required: false,
    placeholder: '请输入' + component.label,
    value: undefined,
    options: ['select', 'radio', 'checkbox'].includes(component.type) ? [
      { label: `选项1`, value: '1' },
      { label: `选项2`, value: '2' }
    ] : undefined,
    props: component.type === 'textarea' ? { type: 'textarea', rows: 3 } :
           component.type === 'select' ? { filterable: true } : {}
  }
  
  formItems.value.push(newItem)
  activeIndex.value = formItems.value.length - 1
}

function removeItem(index: number) {
  formItems.value.splice(index, 1)
  if (activeIndex.value >= formItems.value.length) {
    activeIndex.value = formItems.value.length - 1
  }
}

function addOption() {
  if (!activeItem.value) return
  if (!activeItem.value.options) {
    activeItem.value.options = []
  }
  const len = activeItem.value.options.length
  activeItem.value.options.push({ label: `选项${len + 1}`, value: String(len + 1) })
}

function handlePreview() {
  Object.keys(previewData).forEach(key => delete previewData[key])
  formItems.value.forEach(item => {
    previewData[item.field] = item.defaultValue ?? ''
  })
  previewVisible.value = true
}

function handleSubmitPreview() {
  ElMessage.success(JSON.stringify(previewData, null, 2))
}

function handleExport() {
  const json = JSON.stringify(formItems.value, null, 2)
  console.log(json)
  ElMessage.success('已输出到控制台')
}

function handleClear() {
  formItems.value = []
  activeIndex.value = -1
}
</script>

<style scoped lang="scss">
.form-build {
  .component-panel, .property-panel {
    height: calc(100vh - 140px);
    
    :deep(.el-card__body) {
      overflow-y: auto;
      max-height: calc(100% - 60px);
    }
  }
  
  .component-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    .component-item {
      width: calc(50% - 5px);
      padding: 12px;
      border: 1px solid #e4e7ed;
      border-radius: 6px;
      cursor: grab;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      transition: all 0.2s;
      
      &:hover {
        border-color: #409eff;
        background: #ecf5ff;
      }
      
      &:active {
        cursor: grabbing;
      }
    }
  }

  .section-title {
    padding: 8px 0;
    font-size: 14px;
    font-weight: 600;
    color: #303133;
    
    span {
      position: relative;
      padding-left: 10px;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 14px;
        background: #409eff;
        border-radius: 2px;
      }
    }
  }
  
  .preview-panel {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .form-design-area {
      min-height: 400px;
      border: 2px dashed #dcdfe6;
      border-radius: 8px;
      padding: 16px;
      
      .form-item-wrapper {
        position: relative;
        padding: 12px;
        margin-bottom: 12px;
        border: 1px solid #e4e7ed;
        border-radius: 6px;
        display: flex;
        align-items: flex-start;
        gap: 8px;
        
        &.active {
          border-color: #409eff;
          box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
        }
        
        &:hover {
          border-color: #409eff;
        }
        
        .drag-handle {
          cursor: move;
          color: #909399;
          padding-top: 4px;
          
          &:hover { color: #409eff; }
        }
        
        .form-item-content {
          flex: 1;
          
          > label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            color: #606266;
          }
        }
        
        .form-item-actions {
          opacity: 0;
          transition: opacity 0.2s;
        }
        
        &:hover .form-item-actions {
          opacity: 1;
        }
      }
    }
  }
  
  .option-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
}
</style>