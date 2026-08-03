<template>
  <div class="code-gen">
    <Card :border-radius="16">
      <template #header>
        <div class="card-header">
          <span>代码生成</span>
          <el-button type="primary" @click="handleImport">导入</el-button>
        </div>
      </template>

      <el-table :data="tableList" border stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="tableName" label="表名称" min-width="150" show-overflow-tooltip />
        <el-table-column prop="tableComment" label="表描述" min-width="180" show-overflow-tooltip />
        <el-table-column prop="className" label="实体类名称" width="130" />
        <el-table-column prop="createTime" label="创建时间" width="170" />
        <el-table-column prop="updateTime" label="更新时间" width="170" />
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="success" @click="handlePreview(row)">预览</el-button>
            <el-button link type="warning" @click="handleGenerate(row)">生成</el-button>
            <el-button link type="info" @click="handleDownload(row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </Card>

    <Dialog v-model="dialogVisible" :title="dialogTitle" width="800px" destroy-on-close>
      <el-tabs v-model="editTab">
        <el-tab-pane label="基本信息" name="base">
          <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="表名称" prop="tableName">
                  <el-input v-model="form.tableName" placeholder="请输入表名称" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="表描述" prop="tableComment">
                  <el-input v-model="form.tableComment" placeholder="请输入表描述" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="实体类名称" prop="className">
                  <el-input v-model="form.className" placeholder="请输入实体类名称" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="功能作者">
                  <el-input v-model="form.functionAuthor" placeholder="请输入作者名称" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="生成包路径">
                  <el-input v-model="form.packageName" placeholder="如：com.shiqi.project" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生成模块名">
                  <el-input v-model="form.moduleName" placeholder="如：system" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="生成业务名">
                  <el-input v-model="form.businessName" placeholder="如：user" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生成功能名">
                  <el-input v-model="form.functionName" placeholder="如：用户管理" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="生成代码方式">
              <el-radio-group v-model="form.genType">
                <el-radio value="zip">zip压缩包下载</el-radio>
                <el-radio value="0">自定义路径</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="其他生成选项">
              <el-checkbox v-model="form.crud">增删改查</el-checkbox>
              <el-checkbox v-model="form.pagination">分页查询</el-checkbox>
              <el-checkbox v-model="form.importExport">导入导出</el-checkbox>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="字段信息" name="column">
          <el-table :data="form.columns" border>
            <el-table-column prop="columnName" label="列名" width="120" />
            <el-table-column prop="columnComment" label="列描述" width="130">
              <template #default="{ row }">
                <el-input v-model="row.columnComment" size="small" />
              </template>
            </el-table-column>
            <el-table-column prop="javaType" label="物理类型" width="100" />
            <el-table-column prop="javaField" label="Java属性名" width="130">
              <template #default="{ row }">
                <el-input v-model="row.javaField" size="small" />
              </template>
            </el-table-column>
            <el-table-column prop="javaType" label="Java类型" width="100">
              <template #default="{ row }">
                <el-select v-model="row.javaType" size="small">
                  <el-option label="Long" value="Long" />
                  <el-option label="String" value="String" />
                  <el-option label="Integer" value="Integer" />
                  <el-option label="Date" value="Date" />
                  <el-option label="BigDecimal" value="BigDecimal" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="插入" width="60" align="center">
              <template #default="{ row }">
                <el-checkbox v-model="row.isInsert" />
              </template>
            </el-table-column>
            <el-table-column label="编辑" width="60" align="center">
              <template #default="{ row }">
                <el-checkbox v-model="row.isEdit" />
              </template>
            </el-table-column>
            <el-table-column label="列表" width="60" align="center">
              <template #default="{ row }">
                <el-checkbox v-model="row.isList" />
              </template>
            </el-table-column>
            <el-table-column label="查询" width="60" align="center">
              <template #default="{ row }">
                <el-checkbox v-model="row.isQuery" />
              </template>
            </el-table-column>
            <el-table-column label="查询方式" width="110">
              <template #default="{ row }">
                <el-select v-model="row.queryType" size="small" clearable>
                  <el-option label="等于" value="EQ" />
                  <el-option label="不等于" value="NE" />
                  <el-option label="模糊" value="LIKE" />
                  <el-option label="大于" value="GT" />
                  <el-option label="大于等于" value="GE" />
                  <el-option label="小于" value="LT" />
                  <el-option label="小于等于" value="LE" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="显示类型" width="110">
              <template #default="{ row }">
                <el-select v-model="row.htmlType" size="small" clearable>
                  <el-option label="文本框" value="input" />
                  <el-option label="文本域" value="textarea" />
                  <el-option label="下拉框" value="select" />
                  <el-option label="单选框" value="radio" />
                  <el-option label="复选框" value="checkbox" />
                  <el-option label="日期控件" value="datetime" />
                  <el-option label="图片上传" value="imageUpload" />
                  <el-option label="文件上传" value="fileUpload" />
                  <el-option label="富文本" value="editor" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="字典类型" width="120">
              <template #default="{ row }">
                <el-input v-model="row.dictType" size="small" placeholder="请输入字典类型" />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </template>
    </Dialog>

    <Dialog v-model="previewVisible" title="代码预览" width="900px" top="5vh">
      <el-tabs v-model="previewTab">
        <el-tab-pane v-for="file in previewFiles" :key="file.name" :label="file.name" :name="file.name">
          <pre class="code-preview"><code>{{ file.content }}</code></pre>
        </el-tab-pane>
      </el-tabs>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'CodeGen' })
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import Dialog from '@/components/Dialog/index.vue'

interface TableColumn {
  columnName: string
  columnComment: string
  columnType: string
  javaType: string
  javaField: string
  isInsert: boolean
  isEdit: boolean
  isList: boolean
  isQuery: boolean
  queryType?: string
  htmlType?: string
  dictType?: string
}

interface TableInfo {
  tableName: string
  tableComment: string
  className: string
  createTime: string
  updateTime: string
  columns: TableColumn[]
}

const tableList = ref<TableInfo[]>([
  {
    tableName: 'sys_user',
    tableComment: '用户信息表',
    className: 'SysUser',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-07-15 10:00:00',
    columns: [
      { columnName: 'user_id', columnComment: '用户ID', columnType: 'bigint', javaType: 'Long', javaField: 'userId', isInsert: false, isEdit: false, isList: false, isQuery: true, queryType: 'EQ' },
      { columnName: 'user_name', columnComment: '用户账号', columnType: 'varchar', javaType: 'String', javaField: 'userName', isInsert: true, isEdit: true, isList: true, isQuery: true, queryType: 'LIKE', htmlType: 'input' },
      { columnName: 'nick_name', columnComment: '用户昵称', columnType: 'varchar', javaType: 'String', javaField: 'nickName', isInsert: true, isEdit: true, isList: true, isQuery: true, queryType: 'LIKE', htmlType: 'input' },
      { columnName: 'email', columnComment: '邮箱', columnType: 'varchar', javaType: 'String', javaField: 'email', isInsert: true, isEdit: true, isList: false, isQuery: false, htmlType: 'input' },
      { columnName: 'phonenumber', columnComment: '手机号码', columnType: 'varchar', javaType: 'String', javaField: 'phonenumber', isInsert: true, isEdit: true, isList: false, isQuery: true, queryType: 'LIKE', htmlType: 'input' },
      { columnName: 'sex', columnComment: '用户性别', columnType: 'char', javaType: 'String', javaField: 'sex', isInsert: true, isEdit: true, isList: true, isQuery: true, queryType: 'EQ', htmlType: 'select', dictType: 'sys_user_sex' },
      { columnName: 'avatar', columnComment: '头像地址', columnType: 'varchar', javaType: 'String', javaField: 'avatar', isInsert: true, isEdit: true, isList: false, isQuery: false, htmlType: 'imageUpload' },
      { columnName: 'status', columnComment: '帐号状态', columnType: 'char', javaType: 'String', javaField: 'status', isInsert: true, isEdit: true, isList: true, isQuery: true, queryType: 'EQ', htmlType: 'select', dictType: 'sys_normal_disable' },
    ]
  },
  {
    tableName: 'sys_role',
    tableComment: '角色信息表',
    className: 'SysRole',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-07-14 10:00:00',
    columns: [
      { columnName: 'role_id', columnComment: '角色ID', columnType: 'bigint', javaType: 'Long', javaField: 'roleId', isInsert: false, isEdit: false, isList: false, isQuery: true, queryType: 'EQ' },
      { columnName: 'role_name', columnComment: '角色名称', columnType: 'varchar', javaType: 'String', javaField: 'roleName', isInsert: true, isEdit: true, isList: true, isQuery: true, queryType: 'LIKE', htmlType: 'input' },
      { columnName: 'role_key', columnComment: '角色权限字符串', columnType: 'varchar', javaType: 'String', javaField: 'roleKey', isInsert: true, isEdit: true, isList: false, isQuery: false, htmlType: 'input' },
      { columnName: 'role_sort', columnComment: '显示顺序', columnType: 'int', javaType: 'Integer', javaField: 'roleSort', isInsert: true, isEdit: true, isList: true, isQuery: false, htmlType: 'input' },
      { columnName: 'status', columnComment: '角色状态', columnType: 'char', javaType: 'String', javaField: 'status', isInsert: true, isEdit: true, isList: true, isQuery: true, queryType: 'EQ', htmlType: 'select', dictType: 'sys_normal_disable' },
    ]
  },
  {
    tableName: 'sys_menu',
    tableComment: '菜单权限表',
    className: 'SysMenu',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-07-13 10:00:00',
    columns: [
      { columnName: 'menu_id', columnComment: '菜单ID', columnType: 'bigint', javaType: 'Long', javaField: 'menuId', isInsert: false, isEdit: false, isList: false, isQuery: true, queryType: 'EQ' },
      { columnName: 'menu_name', columnComment: '菜单名称', columnType: 'varchar', javaType: 'String', javaField: 'menuName', isInsert: true, isEdit: true, isList: true, isQuery: true, queryType: 'LIKE', htmlType: 'input' },
      { columnName: 'parent_id', columnComment: '父菜单ID', columnType: 'bigint', javaType: 'Long', javaField: 'parentId', isInsert: true, isEdit: true, isList: false, isQuery: true, queryType: 'EQ', htmlType: 'input' },
      { columnName: 'order_num', columnComment: '显示顺序', columnType: 'int', javaType: 'Integer', javaField: 'orderNum', isInsert: true, isEdit: true, isList: true, isQuery: false, htmlType: 'input' },
      { columnName: 'path', columnComment: '路由地址', columnType: 'varchar', javaType: 'String', javaField: 'path', isInsert: true, isEdit: true, isList: false, isQuery: false, htmlType: 'input' },
      { columnName: 'component', columnComment: '组件路径', columnType: 'varchar', javaType: 'String', javaField: 'component', isInsert: true, isEdit: true, isList: false, isQuery: false, htmlType: 'input' },
    ]
  }
])

const selectedTables = ref<TableInfo[]>([])
const dialogVisible = ref(false)
const dialogTitle = ref('编辑生成配置')
const editTab = ref('base')
const formRef = ref()
const form = reactive({
  tableName: '',
  tableComment: '',
  className: '',
  functionAuthor: 'shiqi',
  packageName: 'com.shiqi.project',
  moduleName: 'system',
  businessName: '',
  functionName: '',
  genType: 'zip',
  crud: true,
  pagination: true,
  importExport: false,
  columns: [] as TableColumn[]
})

const rules = {
  tableName: [{ required: true }],
  tableComment: [{ required: true, message: '请输入表描述', trigger: 'blur' }],
  className: [{ required: true, message: '请输入实体类名称', trigger: 'blur' }]
}

const previewVisible = ref(false)
const previewTab = ref('')
const previewFiles = ref<Array<{ name: string; content: string }>>([])

function handleSelectionChange(rows: TableInfo[]) {
  selectedTables.value = rows
}

function handleImport() {
  dialogTitle.value = '导入表结构'
  Object.assign(form, {
    tableName: '', tableComment: '', className: '',
    functionAuthor: 'shiqi', packageName: 'com.shiqi.project',
    moduleName: 'system', businessName: '', functionName: '',
    genType: 'zip', crud: true, pagination: true, importExport: false,
    columns: []
  })
  dialogVisible.value = true
}

function handleEdit(row: any) {
  dialogTitle.value = '编辑生成配置'
  Object.assign(form, {
    ...row,
    functionAuthor: 'shiqi',
    packageName: 'com.shiqi.project',
    moduleName: 'system',
    businessName: row.tableName.replace('sys_', ''),
    functionName: row.tableComment,
    genType: 'zip',
    crud: true,
    pagination: true,
    importExport: false,
    columns: JSON.parse(JSON.stringify(row.columns))
  })
  dialogVisible.value = true
}

async function handleSubmit() {
  await formRef.value?.validate()
  ElMessage.success('保存成功')
  dialogVisible.value = false
}

function handlePreview(row: any) {
  previewFiles.value = [
    {
      name: `${row.className}.java`,
      content: `package com.shiqi.project.${form.moduleName}.domain;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.util.Date;

/**
 * ${row.tableComment}对象 ${row.className}
 *
 * @author ${form.functionAuthor}
 */
@Data
@TableName("${row.tableName}")
public class ${row.className} extends BaseEntity {
${row.columns.map((col:any) => `    private ${col.javaType} ${col.javaField}; // ${col.columnComment}`).join('\n')}
}`
    },
    {
      name: `${row.className}Mapper.java`,
      content: `package com.shiqi.project.${form.moduleName}.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.shiqi.project.${form.moduleName}.domain.${row.className};
import org.apache.ibatis.annotations.Mapper;

/**
 * ${row.tableComment} Mapper接口
 *
 * @author ${form.functionAuthor}
 */
@Mapper
public interface ${row.className}Mapper extends BaseMapper<${row.className}> {

}`
    },
    {
      name: `${row.className}Service.java`,
      content: `package com.shiqi.project.${form.moduleName}.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.shiqi.project.${form.moduleName}.domain.${row.className};

/**
 * ${row.tableComment} Service接口
 *
 * @author ${form.functionAuthor}
 */
public interface I${row.className}Service extends IService<${row.className}> {

}`
    },
    {
      name: `${row.className}ServiceImpl.java`,
      content: `package com.shiqi.project.${form.moduleName}.service.impl;

import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.shiqi.project.${form.moduleName}.mapper.${row.className}Mapper;
import com.shiqi.project.${form.moduleName}.domain.${row.className};
import com.shiqi.project.${form.moduleName}.service.I${row.className}Service;

/**
 * ${row.tableComment} Service实现
 *
 * @author ${form.functionAuthor}
 */
@Service
public class ${row.className}ServiceImpl extends ServiceImpl<${row.className}Mapper, ${row.className}> implements I${row.className}Service {

}`
    },
    {
      name: `${row.className}Controller.java`,
      content: `package com.shiqi.project.${form.moduleName}.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.shiqi.common.core.domain.AjaxResult;
import com.shiqi.project.${form.moduleName}.domain.${row.className};
import com.shiqi.project.${form.moduleName}.service.I${row.className}Service;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * ${row.tableComment} Controller
 *
 * @author ${form.functionAuthor}
 */
@Api(tags = "${row.tableComment}")
@RestController
@RequestMapping("/${form.moduleName}/${form.businessName}")
@RequiredArgsConstructor
public class ${row.className}Controller {

    private final I${row.className}Service ${form.businessName}Service;

    /** 查询列表 */
    @GetMapping("/list")
    public AjaxResult list(${row.className} query, Page page) {
        LambdaQueryWrapper<${row.className}> wrapper = new LambdaQueryWrapper<>();
        return AjaxResult.success(${form.businessName}Service.page(page, wrapper));
    }

    /** 获取详情 */
    @GetMapping("/{id}")
    public AjaxResult getInfo(@PathVariable Long id) {
        return AjaxResult.success(${form.businessName}Service.getById(id));
    }

    /** 新增 */
    @PostMapping
    public AjaxResult add(@RequestBody ${row.className} entity) {
        return AjaxResult.success(${form.businessName}Service.save(entity));
    }

    /** 修改 */
    @PutMapping
    public AjaxResult edit(@RequestBody ${row.className} entity) {
        return AjaxResult.success(${form.businessName}Service.updateById(entity));
    }

    /** 删除 */
    @DeleteMapping("/{ids}")
    public AjaxResult remove(@PathVariable Long[] ids) {
        return AjaxResult.success(${form.businessName}Service.removeByIds(java.util.Arrays.asList(ids)));
    }}`
    },
    {
      name: 'index.vue',
      content: `<template>
  <div class="${form.businessName}-container">
    <Card :border-radius="16">
      <template #header>
        <div class="card-header">
          <span>${row.tableComment}</span>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
      </template>
      
      <el-table :data="tableData" border stripe>
${row.columns.filter((c:any) => c.isList).map((c:any) => `        <el-table-column prop="${c.javaField}" label="${c.columnComment}" />`).join('\n')}
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </Card>
  </div>
</template>`
    }
  ]
  previewTab.value = previewFiles.value[0].name
  previewVisible.value = true
}

function handleGenerate(row: any) {
  ElMessage.success(`正在生成 ${row.tableName}...`)
}

function handleDownload(row: any) {
  ElMessage.success(`正在下载 ${row.tableName} 代码压缩包...`)
}
</script>

<style scoped lang="scss">
.code-gen {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .code-preview {
    background: #f5f7fa;
    padding: 16px;
    border-radius: 4px;
    overflow: auto;
    max-height: 600px;
    font-size: 13px;
    line-height: 1.6;

    code {
      font-family: 'Monaco', 'Menlo', monospace;
      color: #303133;
    }
  }
}
</style>