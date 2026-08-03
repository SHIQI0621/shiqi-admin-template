import{Bi as e,Fr as t,Hi as n,Kr as r,Mi as i,Ur as a,Wr as o,Xr as s,Yr as c,Zr as l,hi as u,vi as d,wa as f}from"./use-global-config-CDAW_LBi.js";import{r as p,t as m}from"./select-C1D5bJ29.js";import{n as h,t as g}from"./table-CMSiBFgD.js";import{t as _}from"./checkbox-DEuoh1cK.js";import{t as v}from"./input-DAPRTTr7.js";import{n as ee,t as te}from"./tabs-BeNsrnhD.js";import{n as ne,t as re}from"./form-D8i-N1rm.js";import{t as y}from"./message-4aFkqDJu.js";import{t as ie}from"./button-CNWcJD6Z.js";import{r as ae,t as b}from"./radio-DEd4ybwC.js";import{n as x,t as S}from"./col-CbPwT7pv.js";import{t as C}from"./_plugin-vue_export-helper-DlZKjlIs.js";import"./css-BnnmmLAl.js";import"./css-BTTEeFqQ.js";import"./css-IPM88d8K.js";import{t as w}from"./Card-YFH_XaQp.js";import"./css-DBkh1_F5.js";import"./css-qWAiVKzi.js";import"./css-BJIu15kF.js";import"./css-BinA7cAR.js";import"./css-C-UaRzEK.js";import{t as T}from"./Dialog-DtihBsin.js";import"./css-038HcgQ7.js";var oe={class:`code-gen`},se={class:`card-header`},E={class:`code-preview`},D=C(l({name:`CodeGen`,__name:`index`,setup(l){let C=n([{tableName:`sys_user`,tableComment:`用户信息表`,className:`SysUser`,createTime:`2024-01-01 00:00:00`,updateTime:`2024-07-15 10:00:00`,columns:[{columnName:`user_id`,columnComment:`用户ID`,columnType:`bigint`,javaType:`Long`,javaField:`userId`,isInsert:!1,isEdit:!1,isList:!1,isQuery:!0,queryType:`EQ`},{columnName:`user_name`,columnComment:`用户账号`,columnType:`varchar`,javaType:`String`,javaField:`userName`,isInsert:!0,isEdit:!0,isList:!0,isQuery:!0,queryType:`LIKE`,htmlType:`input`},{columnName:`nick_name`,columnComment:`用户昵称`,columnType:`varchar`,javaType:`String`,javaField:`nickName`,isInsert:!0,isEdit:!0,isList:!0,isQuery:!0,queryType:`LIKE`,htmlType:`input`},{columnName:`email`,columnComment:`邮箱`,columnType:`varchar`,javaType:`String`,javaField:`email`,isInsert:!0,isEdit:!0,isList:!1,isQuery:!1,htmlType:`input`},{columnName:`phonenumber`,columnComment:`手机号码`,columnType:`varchar`,javaType:`String`,javaField:`phonenumber`,isInsert:!0,isEdit:!0,isList:!1,isQuery:!0,queryType:`LIKE`,htmlType:`input`},{columnName:`sex`,columnComment:`用户性别`,columnType:`char`,javaType:`String`,javaField:`sex`,isInsert:!0,isEdit:!0,isList:!0,isQuery:!0,queryType:`EQ`,htmlType:`select`,dictType:`sys_user_sex`},{columnName:`avatar`,columnComment:`头像地址`,columnType:`varchar`,javaType:`String`,javaField:`avatar`,isInsert:!0,isEdit:!0,isList:!1,isQuery:!1,htmlType:`imageUpload`},{columnName:`status`,columnComment:`帐号状态`,columnType:`char`,javaType:`String`,javaField:`status`,isInsert:!0,isEdit:!0,isList:!0,isQuery:!0,queryType:`EQ`,htmlType:`select`,dictType:`sys_normal_disable`}]},{tableName:`sys_role`,tableComment:`角色信息表`,className:`SysRole`,createTime:`2024-01-01 00:00:00`,updateTime:`2024-07-14 10:00:00`,columns:[{columnName:`role_id`,columnComment:`角色ID`,columnType:`bigint`,javaType:`Long`,javaField:`roleId`,isInsert:!1,isEdit:!1,isList:!1,isQuery:!0,queryType:`EQ`},{columnName:`role_name`,columnComment:`角色名称`,columnType:`varchar`,javaType:`String`,javaField:`roleName`,isInsert:!0,isEdit:!0,isList:!0,isQuery:!0,queryType:`LIKE`,htmlType:`input`},{columnName:`role_key`,columnComment:`角色权限字符串`,columnType:`varchar`,javaType:`String`,javaField:`roleKey`,isInsert:!0,isEdit:!0,isList:!1,isQuery:!1,htmlType:`input`},{columnName:`role_sort`,columnComment:`显示顺序`,columnType:`int`,javaType:`Integer`,javaField:`roleSort`,isInsert:!0,isEdit:!0,isList:!0,isQuery:!1,htmlType:`input`},{columnName:`status`,columnComment:`角色状态`,columnType:`char`,javaType:`String`,javaField:`status`,isInsert:!0,isEdit:!0,isList:!0,isQuery:!0,queryType:`EQ`,htmlType:`select`,dictType:`sys_normal_disable`}]},{tableName:`sys_menu`,tableComment:`菜单权限表`,className:`SysMenu`,createTime:`2024-01-01 00:00:00`,updateTime:`2024-07-13 10:00:00`,columns:[{columnName:`menu_id`,columnComment:`菜单ID`,columnType:`bigint`,javaType:`Long`,javaField:`menuId`,isInsert:!1,isEdit:!1,isList:!1,isQuery:!0,queryType:`EQ`},{columnName:`menu_name`,columnComment:`菜单名称`,columnType:`varchar`,javaType:`String`,javaField:`menuName`,isInsert:!0,isEdit:!0,isList:!0,isQuery:!0,queryType:`LIKE`,htmlType:`input`},{columnName:`parent_id`,columnComment:`父菜单ID`,columnType:`bigint`,javaType:`Long`,javaField:`parentId`,isInsert:!0,isEdit:!0,isList:!1,isQuery:!0,queryType:`EQ`,htmlType:`input`},{columnName:`order_num`,columnComment:`显示顺序`,columnType:`int`,javaType:`Integer`,javaField:`orderNum`,isInsert:!0,isEdit:!0,isList:!0,isQuery:!1,htmlType:`input`},{columnName:`path`,columnComment:`路由地址`,columnType:`varchar`,javaType:`String`,javaField:`path`,isInsert:!0,isEdit:!0,isList:!1,isQuery:!1,htmlType:`input`},{columnName:`component`,columnComment:`组件路径`,columnType:`varchar`,javaType:`String`,javaField:`component`,isInsert:!0,isEdit:!0,isList:!1,isQuery:!1,htmlType:`input`}]}]),D=n([]),O=n(!1),k=n(`编辑生成配置`),A=n(`base`),j=n(),M=e({tableName:``,tableComment:``,className:``,functionAuthor:`shiqi`,packageName:`com.shiqi.project`,moduleName:`system`,businessName:``,functionName:``,genType:`zip`,crud:!0,pagination:!0,importExport:!1,columns:[]}),N={tableName:[{required:!0}],tableComment:[{required:!0,message:`请输入表描述`,trigger:`blur`}],className:[{required:!0,message:`请输入实体类名称`,trigger:`blur`}]},P=n(!1),F=n(``),I=n([]);function L(e){D.value=e}function R(){k.value=`导入表结构`,Object.assign(M,{tableName:``,tableComment:``,className:``,functionAuthor:`shiqi`,packageName:`com.shiqi.project`,moduleName:`system`,businessName:``,functionName:``,genType:`zip`,crud:!0,pagination:!0,importExport:!1,columns:[]}),O.value=!0}function z(e){k.value=`编辑生成配置`,Object.assign(M,{...e,functionAuthor:`shiqi`,packageName:`com.shiqi.project`,moduleName:`system`,businessName:e.tableName.replace(`sys_`,``),functionName:e.tableComment,genType:`zip`,crud:!0,pagination:!0,importExport:!1,columns:JSON.parse(JSON.stringify(e.columns))}),O.value=!0}async function B(){await j.value?.validate(),y.success(`保存成功`),O.value=!1}function V(e){I.value=[{name:`${e.className}.java`,content:`package com.shiqi.project.${M.moduleName}.domain;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.util.Date;

/**
 * ${e.tableComment}对象 ${e.className}
 *
 * @author ${M.functionAuthor}
 */
@Data
@TableName("${e.tableName}")
public class ${e.className} extends BaseEntity {
${e.columns.map(e=>`    private ${e.javaType} ${e.javaField}; // ${e.columnComment}`).join(`
`)}
}`},{name:`${e.className}Mapper.java`,content:`package com.shiqi.project.${M.moduleName}.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.shiqi.project.${M.moduleName}.domain.${e.className};
import org.apache.ibatis.annotations.Mapper;

/**
 * ${e.tableComment} Mapper接口
 *
 * @author ${M.functionAuthor}
 */
@Mapper
public interface ${e.className}Mapper extends BaseMapper<${e.className}> {

}`},{name:`${e.className}Service.java`,content:`package com.shiqi.project.${M.moduleName}.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.shiqi.project.${M.moduleName}.domain.${e.className};

/**
 * ${e.tableComment} Service接口
 *
 * @author ${M.functionAuthor}
 */
public interface I${e.className}Service extends IService<${e.className}> {

}`},{name:`${e.className}ServiceImpl.java`,content:`package com.shiqi.project.${M.moduleName}.service.impl;

import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.shiqi.project.${M.moduleName}.mapper.${e.className}Mapper;
import com.shiqi.project.${M.moduleName}.domain.${e.className};
import com.shiqi.project.${M.moduleName}.service.I${e.className}Service;

/**
 * ${e.tableComment} Service实现
 *
 * @author ${M.functionAuthor}
 */
@Service
public class ${e.className}ServiceImpl extends ServiceImpl<${e.className}Mapper, ${e.className}> implements I${e.className}Service {

}`},{name:`${e.className}Controller.java`,content:`package com.shiqi.project.${M.moduleName}.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.shiqi.common.core.domain.AjaxResult;
import com.shiqi.project.${M.moduleName}.domain.${e.className};
import com.shiqi.project.${M.moduleName}.service.I${e.className}Service;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * ${e.tableComment} Controller
 *
 * @author ${M.functionAuthor}
 */
@Api(tags = "${e.tableComment}")
@RestController
@RequestMapping("/${M.moduleName}/${M.businessName}")
@RequiredArgsConstructor
public class ${e.className}Controller {

    private final I${e.className}Service ${M.businessName}Service;

    /** 查询列表 */
    @GetMapping("/list")
    public AjaxResult list(${e.className} query, Page page) {
        LambdaQueryWrapper<${e.className}> wrapper = new LambdaQueryWrapper<>();
        return AjaxResult.success(${M.businessName}Service.page(page, wrapper));
    }

    /** 获取详情 */
    @GetMapping("/{id}")
    public AjaxResult getInfo(@PathVariable Long id) {
        return AjaxResult.success(${M.businessName}Service.getById(id));
    }

    /** 新增 */
    @PostMapping
    public AjaxResult add(@RequestBody ${e.className} entity) {
        return AjaxResult.success(${M.businessName}Service.save(entity));
    }

    /** 修改 */
    @PutMapping
    public AjaxResult edit(@RequestBody ${e.className} entity) {
        return AjaxResult.success(${M.businessName}Service.updateById(entity));
    }

    /** 删除 */
    @DeleteMapping("/{ids}")
    public AjaxResult remove(@PathVariable Long[] ids) {
        return AjaxResult.success(${M.businessName}Service.removeByIds(java.util.Arrays.asList(ids)));
    }}`},{name:`index.vue`,content:`<template>
  <div class="${M.businessName}-container">
    <Card :border-radius="16">
      <template #header>
        <div class="card-header">
          <span>${e.tableComment}</span>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
      </template>
      
      <el-table :data="tableData" border stripe>
${e.columns.filter(e=>e.isList).map(e=>`        <el-table-column prop="${e.javaField}" label="${e.columnComment}" />`).join(`
`)}
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </Card>
  </div>
</template>`}],F.value=I.value[0].name,P.value=!0}function H(e){y.success(`正在生成 ${e.tableName}...`)}function U(e){y.success(`正在下载 ${e.tableName} 代码压缩包...`)}return(e,n)=>{let l=ie,y=h,D=g,W=v,G=ne,K=S,q=x,J=b,ce=ae,Y=_,le=re,X=te,Z=m,Q=p,$=ee;return u(),r(`div`,oe,[s(w,{"border-radius":16},{header:i(()=>[a(`div`,se,[n[18]||=a(`span`,null,`代码生成`,-1),s(l,{type:`primary`,onClick:R},{default:i(()=>[...n[17]||=[c(`导入`,-1)]]),_:1})])]),default:i(()=>[s(D,{data:C.value,border:``,stripe:``,onSelectionChange:L},{default:i(()=>[s(y,{type:`selection`,width:`50`,align:`center`}),s(y,{prop:`tableName`,label:`表名称`,"min-width":`150`,"show-overflow-tooltip":``}),s(y,{prop:`tableComment`,label:`表描述`,"min-width":`180`,"show-overflow-tooltip":``}),s(y,{prop:`className`,label:`实体类名称`,width:`130`}),s(y,{prop:`createTime`,label:`创建时间`,width:`170`}),s(y,{prop:`updateTime`,label:`更新时间`,width:`170`}),s(y,{label:`操作`,width:`280`,fixed:`right`},{default:i(({row:e})=>[s(l,{link:``,type:`primary`,onClick:t=>z(e)},{default:i(()=>[...n[19]||=[c(`编辑`,-1)]]),_:1},8,[`onClick`]),s(l,{link:``,type:`success`,onClick:t=>V(e)},{default:i(()=>[...n[20]||=[c(`预览`,-1)]]),_:1},8,[`onClick`]),s(l,{link:``,type:`warning`,onClick:t=>H(e)},{default:i(()=>[...n[21]||=[c(`生成`,-1)]]),_:1},8,[`onClick`]),s(l,{link:``,type:`info`,onClick:t=>U(e)},{default:i(()=>[...n[22]||=[c(`下载`,-1)]]),_:1},8,[`onClick`])]),_:1})]),_:1},8,[`data`])]),_:1}),s(T,{modelValue:O.value,"onUpdate:modelValue":n[14]||=e=>O.value=e,title:k.value,width:`800px`,"destroy-on-close":``},{footer:i(()=>[s(l,{onClick:n[13]||=e=>O.value=!1},{default:i(()=>[...n[28]||=[c(`取消`,-1)]]),_:1}),s(l,{type:`primary`,onClick:B},{default:i(()=>[...n[29]||=[c(`保存`,-1)]]),_:1})]),default:i(()=>[s($,{modelValue:A.value,"onUpdate:modelValue":n[12]||=e=>A.value=e},{default:i(()=>[s(X,{label:`基本信息`,name:`base`},{default:i(()=>[s(le,{ref_key:`formRef`,ref:j,model:M,rules:N,"label-width":`120px`},{default:i(()=>[s(q,{gutter:20},{default:i(()=>[s(K,{span:12},{default:i(()=>[s(G,{label:`表名称`,prop:`tableName`},{default:i(()=>[s(W,{modelValue:M.tableName,"onUpdate:modelValue":n[0]||=e=>M.tableName=e,placeholder:`请输入表名称`,disabled:``},null,8,[`modelValue`])]),_:1})]),_:1}),s(K,{span:12},{default:i(()=>[s(G,{label:`表描述`,prop:`tableComment`},{default:i(()=>[s(W,{modelValue:M.tableComment,"onUpdate:modelValue":n[1]||=e=>M.tableComment=e,placeholder:`请输入表描述`},null,8,[`modelValue`])]),_:1})]),_:1})]),_:1}),s(q,{gutter:20},{default:i(()=>[s(K,{span:12},{default:i(()=>[s(G,{label:`实体类名称`,prop:`className`},{default:i(()=>[s(W,{modelValue:M.className,"onUpdate:modelValue":n[2]||=e=>M.className=e,placeholder:`请输入实体类名称`},null,8,[`modelValue`])]),_:1})]),_:1}),s(K,{span:12},{default:i(()=>[s(G,{label:`功能作者`},{default:i(()=>[s(W,{modelValue:M.functionAuthor,"onUpdate:modelValue":n[3]||=e=>M.functionAuthor=e,placeholder:`请输入作者名称`},null,8,[`modelValue`])]),_:1})]),_:1})]),_:1}),s(q,{gutter:20},{default:i(()=>[s(K,{span:12},{default:i(()=>[s(G,{label:`生成包路径`},{default:i(()=>[s(W,{modelValue:M.packageName,"onUpdate:modelValue":n[4]||=e=>M.packageName=e,placeholder:`如：com.shiqi.project`},null,8,[`modelValue`])]),_:1})]),_:1}),s(K,{span:12},{default:i(()=>[s(G,{label:`生成模块名`},{default:i(()=>[s(W,{modelValue:M.moduleName,"onUpdate:modelValue":n[5]||=e=>M.moduleName=e,placeholder:`如：system`},null,8,[`modelValue`])]),_:1})]),_:1})]),_:1}),s(q,{gutter:20},{default:i(()=>[s(K,{span:12},{default:i(()=>[s(G,{label:`生成业务名`},{default:i(()=>[s(W,{modelValue:M.businessName,"onUpdate:modelValue":n[6]||=e=>M.businessName=e,placeholder:`如：user`},null,8,[`modelValue`])]),_:1})]),_:1}),s(K,{span:12},{default:i(()=>[s(G,{label:`生成功能名`},{default:i(()=>[s(W,{modelValue:M.functionName,"onUpdate:modelValue":n[7]||=e=>M.functionName=e,placeholder:`如：用户管理`},null,8,[`modelValue`])]),_:1})]),_:1})]),_:1}),s(G,{label:`生成代码方式`},{default:i(()=>[s(ce,{modelValue:M.genType,"onUpdate:modelValue":n[8]||=e=>M.genType=e},{default:i(()=>[s(J,{value:`zip`},{default:i(()=>[...n[23]||=[c(`zip压缩包下载`,-1)]]),_:1}),s(J,{value:`0`},{default:i(()=>[...n[24]||=[c(`自定义路径`,-1)]]),_:1})]),_:1},8,[`modelValue`])]),_:1}),s(G,{label:`其他生成选项`},{default:i(()=>[s(Y,{modelValue:M.crud,"onUpdate:modelValue":n[9]||=e=>M.crud=e},{default:i(()=>[...n[25]||=[c(`增删改查`,-1)]]),_:1},8,[`modelValue`]),s(Y,{modelValue:M.pagination,"onUpdate:modelValue":n[10]||=e=>M.pagination=e},{default:i(()=>[...n[26]||=[c(`分页查询`,-1)]]),_:1},8,[`modelValue`]),s(Y,{modelValue:M.importExport,"onUpdate:modelValue":n[11]||=e=>M.importExport=e},{default:i(()=>[...n[27]||=[c(`导入导出`,-1)]]),_:1},8,[`modelValue`])]),_:1})]),_:1},8,[`model`])]),_:1}),s(X,{label:`字段信息`,name:`column`},{default:i(()=>[s(D,{data:M.columns,border:``},{default:i(()=>[s(y,{prop:`columnName`,label:`列名`,width:`120`}),s(y,{prop:`columnComment`,label:`列描述`,width:`130`},{default:i(({row:e})=>[s(W,{modelValue:e.columnComment,"onUpdate:modelValue":t=>e.columnComment=t,size:`small`},null,8,[`modelValue`,`onUpdate:modelValue`])]),_:1}),s(y,{prop:`javaType`,label:`物理类型`,width:`100`}),s(y,{prop:`javaField`,label:`Java属性名`,width:`130`},{default:i(({row:e})=>[s(W,{modelValue:e.javaField,"onUpdate:modelValue":t=>e.javaField=t,size:`small`},null,8,[`modelValue`,`onUpdate:modelValue`])]),_:1}),s(y,{prop:`javaType`,label:`Java类型`,width:`100`},{default:i(({row:e})=>[s(Q,{modelValue:e.javaType,"onUpdate:modelValue":t=>e.javaType=t,size:`small`},{default:i(()=>[s(Z,{label:`Long`,value:`Long`}),s(Z,{label:`String`,value:`String`}),s(Z,{label:`Integer`,value:`Integer`}),s(Z,{label:`Date`,value:`Date`}),s(Z,{label:`BigDecimal`,value:`BigDecimal`})]),_:1},8,[`modelValue`,`onUpdate:modelValue`])]),_:1}),s(y,{label:`插入`,width:`60`,align:`center`},{default:i(({row:e})=>[s(Y,{modelValue:e.isInsert,"onUpdate:modelValue":t=>e.isInsert=t},null,8,[`modelValue`,`onUpdate:modelValue`])]),_:1}),s(y,{label:`编辑`,width:`60`,align:`center`},{default:i(({row:e})=>[s(Y,{modelValue:e.isEdit,"onUpdate:modelValue":t=>e.isEdit=t},null,8,[`modelValue`,`onUpdate:modelValue`])]),_:1}),s(y,{label:`列表`,width:`60`,align:`center`},{default:i(({row:e})=>[s(Y,{modelValue:e.isList,"onUpdate:modelValue":t=>e.isList=t},null,8,[`modelValue`,`onUpdate:modelValue`])]),_:1}),s(y,{label:`查询`,width:`60`,align:`center`},{default:i(({row:e})=>[s(Y,{modelValue:e.isQuery,"onUpdate:modelValue":t=>e.isQuery=t},null,8,[`modelValue`,`onUpdate:modelValue`])]),_:1}),s(y,{label:`查询方式`,width:`110`},{default:i(({row:e})=>[s(Q,{modelValue:e.queryType,"onUpdate:modelValue":t=>e.queryType=t,size:`small`,clearable:``},{default:i(()=>[s(Z,{label:`等于`,value:`EQ`}),s(Z,{label:`不等于`,value:`NE`}),s(Z,{label:`模糊`,value:`LIKE`}),s(Z,{label:`大于`,value:`GT`}),s(Z,{label:`大于等于`,value:`GE`}),s(Z,{label:`小于`,value:`LT`}),s(Z,{label:`小于等于`,value:`LE`})]),_:1},8,[`modelValue`,`onUpdate:modelValue`])]),_:1}),s(y,{label:`显示类型`,width:`110`},{default:i(({row:e})=>[s(Q,{modelValue:e.htmlType,"onUpdate:modelValue":t=>e.htmlType=t,size:`small`,clearable:``},{default:i(()=>[s(Z,{label:`文本框`,value:`input`}),s(Z,{label:`文本域`,value:`textarea`}),s(Z,{label:`下拉框`,value:`select`}),s(Z,{label:`单选框`,value:`radio`}),s(Z,{label:`复选框`,value:`checkbox`}),s(Z,{label:`日期控件`,value:`datetime`}),s(Z,{label:`图片上传`,value:`imageUpload`}),s(Z,{label:`文件上传`,value:`fileUpload`}),s(Z,{label:`富文本`,value:`editor`})]),_:1},8,[`modelValue`,`onUpdate:modelValue`])]),_:1}),s(y,{label:`字典类型`,width:`120`},{default:i(({row:e})=>[s(W,{modelValue:e.dictType,"onUpdate:modelValue":t=>e.dictType=t,size:`small`,placeholder:`请输入字典类型`},null,8,[`modelValue`,`onUpdate:modelValue`])]),_:1})]),_:1},8,[`data`])]),_:1})]),_:1},8,[`modelValue`])]),_:1},8,[`modelValue`,`title`]),s(T,{modelValue:P.value,"onUpdate:modelValue":n[16]||=e=>P.value=e,title:`代码预览`,width:`900px`,top:`5vh`},{default:i(()=>[s($,{modelValue:F.value,"onUpdate:modelValue":n[15]||=e=>F.value=e},{default:i(()=>[(u(!0),r(t,null,d(I.value,e=>(u(),o(X,{key:e.name,label:e.name,name:e.name},{default:i(()=>[a(`pre`,E,[a(`code`,null,f(e.content),1)])]),_:2},1032,[`label`,`name`]))),128))]),_:1},8,[`modelValue`])]),_:1},8,[`modelValue`])])}}}),[[`__scopeId`,`data-v-255df37d`]]);export{D as default};