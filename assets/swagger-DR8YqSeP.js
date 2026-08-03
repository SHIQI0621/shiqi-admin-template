import{Bi as e,Fr as t,Gr as n,Hi as r,Hr as i,Kr as a,Mi as o,Ur as s,Wr as c,Xi as l,Xr as u,Yr as d,Zr as f,ba as p,c as m,dt as h,f as ee,hi as g,vi as _,wa as v}from"./use-global-config-CDAW_LBi.js";import{n as y,t as b}from"./descriptions-B8_iqXtV.js";import{n as x,t as S}from"./table-CMSiBFgD.js";import{t as te}from"./input-DAPRTTr7.js";import{n as ne,t as re}from"./form-D8i-N1rm.js";import{t as C}from"./message-4aFkqDJu.js";import{t as ie}from"./button-CNWcJD6Z.js";import{t as w}from"./tag-1PfAuR1Q.js";import{n as T,t as E}from"./collapse-CzjpLNDh.js";import{t as D}from"./_plugin-vue_export-helper-DlZKjlIs.js";import"./css-BnnmmLAl.js";import"./css-BTTEeFqQ.js";import"./css-Bm0-7wU0.js";import"./css-IPM88d8K.js";import{t as O}from"./Card-YFH_XaQp.js";import"./css-qWAiVKzi.js";import"./css-JtZ7E0i-.js";import{t as k}from"./Dialog-DtihBsin.js";import"./css-BixuXtIj2.js";import"./css-jPuW7rZ2.js";var A={class:`swagger-api`},j={class:`card-header`},M={class:`group-title`},N={class:`group-name`},P={class:`api-count`},F={class:`api-list`},I=[`onClick`],L={class:`api-info`},R={class:`api-path`},z={class:`api-summary`},ae={key:0,class:`api-detail`},B={class:`response-example`},V={key:0,class:`debug-response`},H=D(f({name:`SwaggerApi`,__name:`index`,setup(f){let D=r([{name:`用户管理模块`,methods:[`GET`],apis:[{method:`GET`,path:`/system/user/list`,summary:`获取用户列表`,group:`用户管理模块`,params:[{name:`pageNum`,type:`integer`,in:`query`,required:!1,description:`页码`,example:`1`},{name:`pageSize`,type:`integer`,in:`query`,required:!1,description:`每页数量`,example:`10`},{name:`userName`,type:`string`,in:`query`,required:!1,description:`用户名`},{name:`status`,type:`string`,in:`query`,required:!1,description:`状态 0正常 1停用`}],responseExample:`{
  "code": 200,
  "msg": "操作成功",
  "total": 100,
  "rows": [
    {
      "userId": 1,
      "userName": "admin",
      "nickName": "管理员",
      "status": "0",
      "createTime": "2024-01-01 00:00:00"
    }
  ]
}`},{method:`GET`,path:`/system/user/{userId}`,summary:`根据用户ID获取详细信息`,group:`用户管理模块`,params:[{name:`userId`,type:`long`,in:`path`,required:!0,description:`用户ID`,example:`1`}],responseExample:`{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "userId": 1,
    "userName": "admin",
    "nickName": "管理员",
    "email": "admin@shiqi.com",
    "phonenumber": "13800138000",
    "sex": "1",
    "status": "0",
    "roles": ["admin"],
    "createTime": "2024-01-01 00:00:00"
  }
}`},{method:`POST`,path:`/system/user`,summary:`新增用户`,group:`用户管理模块`,params:[{name:`userName`,type:`string`,in:`body`,required:!0,description:`用户名`,example:`testuser`},{name:`nickName`,type:`string`,in:`body`,required:!0,description:`昵称`,example:`测试用户`},{name:`password`,type:`string`,in:`body`,required:!0,description:`密码`,example:`123456`},{name:`email`,type:`string`,in:`body`,required:!1,description:`邮箱`},{name:`phonenumber`,type:`string`,in:`body`,required:!1,description:`手机号`},{name:`status`,type:`string`,in:`body`,required:!1,description:`状态`,example:`0`},{name:`roleIds`,type:`array`,in:`body`,required:!1,description:`角色ID数组`}],responseExample:`{ "code": 200, "msg": "新增成功" }`},{method:`PUT`,path:`/system/user`,summary:`修改用户`,group:`用户管理模块`,params:[{name:`userId`,type:`long`,in:`body`,required:!0,description:`用户ID`},{name:`userName`,type:`string`,in:`body`,required:!1,description:`用户名`},{name:`nickName`,type:`string`,in:`body`,required:!1,description:`昵称`},{name:`status`,type:`string`,in:`body`,required:!1,description:`状态`}],responseExample:`{ "code": 200, "msg": "修改成功" }`},{method:`DELETE`,path:`/system/user/{userIds}`,summary:`删除用户`,group:`用户管理模块`,params:[{name:`userIds`,type:`string`,in:`path`,required:!0,description:`用户ID数组，逗号分隔`,example:`1,2,3`}],responseExample:`{ "code": 200, "msg": "删除成功" }`}]},{name:`角色管理模块`,methods:[`GET`],apis:[{method:`GET`,path:`/system/role/list`,summary:`获取角色列表`,group:`角色管理模块`,params:[{name:`pageNum`,type:`integer`,in:`query`,required:!1,description:`页码`},{name:`pageSize`,type:`integer`,in:`query`,required:!1,description:`每页数量`},{name:`roleName`,type:`string`,in:`query`,required:!1,description:`角色名称`}],responseExample:`{
  "code": 200,
  "msg": "操作成功",
  "rows": [
    { "roleId": 1, "roleName": "超级管理员", "roleKey": "admin", "sort": 1, "status": "0" },
    { "roleId": 2, "roleName": "普通角色", "roleKey": "common", "sort": 2, "status": "0" }
  ]
}`},{method:`GET`,path:`/system/role/{roleId}/menuTree`,summary:`获取角色的菜单树`,group:`角色管理模块`,params:[{name:`roleId`,type:`long`,in:`path`,required:!0,description:`角色ID`}],responseExample:`{
  "code": 200,
  "data": [
    { "id": 1, "label": "系统管理", "children": [...] },
    { "id": 2, "label": "系统监控", "children": [...] }
  ]
}`}]},{name:`部门管理模块`,methods:[`GET`],apis:[{method:`GET`,path:`/system/dept/tree`,summary:`获取部门树形结构`,group:`部门管理模块`,params:[],responseExample:`{
  "code": 200,
  "data": [
    { "deptId": 100, "deptName": "总公司", "parentId": 0, "children": [
      { "deptId": 101, "deptName": "深圳分公司", "parentId": 100, "children": [] },
      { "deptId": 102, "deptName": "长沙分公司", "parentId": 100, "children": [] }
    ]}
  ]
}`}]},{name:`字典管理模块`,methods:[`GET`],apis:[{method:`GET`,path:`/system/dict/type/list`,summary:`获取字典类型列表`,group:`字典管理模块`,params:[{name:`dictName`,type:`string`,in:`query`,required:!1,description:`字典名称`},{name:`dictType`,type:`string`,in:`query`,required:!1,description:`字典类型`}],responseExample:`{
  "code": 200,
  "rows": [
    { "dictId": 1, "dictName": "用户性别", "dictType": "sys_user_sex", "status": "0" },
    { "dictId": 2, "dictName": "菜单状态", "dictType": "sys_show_hide", "status": "0" }
  ]
}`},{method:`GET`,path:`/system/dict/data/type/{dictType}`,summary:`根据字典类型查询字典数据`,group:`字典管理模块`,params:[{name:`dictType`,type:`string`,in:`path`,required:!0,description:`字典类型`,example:`sys_user_sex`}],responseExample:`{
  "code": 200,
  "data": [
    { "dictCode": 1, "dictLabel": "男", "dictValue": "0", "dictSort": 1 },
    { "dictCode": 2, "dictLabel": "女", "dictValue": "1", "dictSort": 2 }
  ]
}`}]},{name:`系统监控模块`,methods:[`GET`],apis:[{method:`GET`,path:`/monitor/online/list`,summary:`获取在线用户列表`,group:`系统监控模块`,params:[{name:`ipaddr`,type:`string`,in:`query`,required:!1,description:`登录IP`},{name:`userName`,type:`string`,in:`query`,required:!1,description:`用户名`}],responseExample:`{
  "code": 200,
  "rows": [
    { "sessionId": "abc123", "loginName": "admin", "ipaddr": "127.0.0.1", "loginLocation": "本地", "browser": "Chrome 120", "os": "Windows 10", "loginTime": "2024-07-15 09:00:00" }
  ]
}`},{method:`DELETE`,path:`/monitor/online/{tokenId}`,summary:`强退用户`,group:`系统监控模块`,params:[{name:`tokenId`,type:`string`,in:`path`,required:!0,description:`会话标识`}],responseExample:`{ "code": 200, "msg": "强退成功" }`}]}]),H=r(``),U=r([`用户管理模块`]),W=r(!1),G=r(),K=e({}),q=r(``),J=i(()=>H.value?D.value.map(e=>({...e,apis:e.apis.filter(e=>e.summary.toLowerCase().includes(H.value.toLowerCase())||e.path.toLowerCase().includes(H.value.toLowerCase()))})).filter(e=>e.apis.length>0):D.value);function Y(e){return{GET:`success`,POST:`primary`,PUT:`warning`,DELETE:`danger`,PATCH:`info`}[e.toUpperCase()]||`info`}function oe(e){G.value=e,Object.keys(K).forEach(e=>delete K[e]),e.params.filter(e=>e.in===`query`).forEach(e=>{K[e.name]=e.example||``}),q.value=``,W.value=!0}function se(){q.value=JSON.stringify({code:200,msg:`操作成功`,data:null,timestamp:new Date().toISOString()},null,2),C.success(`请求成功`)}return(e,r)=>{let i=m,f=te,C=w,D=T,ce=E,X=y,Z=b,Q=x,le=S,$=ne,ue=ie,de=re;return g(),a(`div`,A,[u(O,{"border-radius":16},{header:o(()=>[s(`div`,j,[r[3]||=s(`span`,null,`系统接口文档 (Swagger)`,-1),u(f,{modelValue:H.value,"onUpdate:modelValue":r[0]||=e=>H.value=e,placeholder:`搜索接口...`,clearable:``,style:{width:`250px`}},{prefix:o(()=>[u(i,null,{default:o(()=>[u(l(h))]),_:1})]),_:1},8,[`modelValue`])])]),default:o(()=>[u(ce,{modelValue:U.value,"onUpdate:modelValue":r[1]||=e=>U.value=e},{default:o(()=>[(g(!0),a(t,null,_(J.value,e=>(g(),c(D,{key:e.name,name:e.name},{title:o(()=>[s(`div`,M,[u(C,{type:Y(e.methods[0]),size:`small`},{default:o(()=>[d(v(e.methods[0]),1)]),_:2},1032,[`type`]),s(`span`,N,v(e.name),1),s(`span`,P,v(e.apis.length)+` 个接口`,1)])]),default:o(()=>[s(`div`,F,[(g(!0),a(t,null,_(e.apis,e=>(g(),a(`div`,{key:e.path,class:`api-item`,onClick:t=>oe(e)},[s(`div`,{class:p([`api-method`,e.method.toLowerCase()])},v(e.method),3),s(`div`,L,[s(`div`,R,v(e.path),1),s(`div`,z,v(e.summary),1)]),u(i,{class:`arrow-right`},{default:o(()=>[u(l(ee))]),_:1})],8,I))),128))])]),_:2},1032,[`name`]))),128))]),_:1},8,[`modelValue`])]),_:1}),u(k,{modelValue:W.value,"onUpdate:modelValue":r[2]||=e=>W.value=e,title:G.value?.summary||`系统接口文档 (Swagger)`,width:`750px`,top:`5vh`},{default:o(()=>[G.value?(g(),a(`div`,ae,[u(Z,{column:2,border:``,class:`mb-16`},{default:o(()=>[u(X,{label:`请求类型`},{default:o(()=>[u(C,{type:Y(G.value.method),size:`small`},{default:o(()=>[d(v(G.value.method),1)]),_:1},8,[`type`])]),_:1}),u(X,{label:`请求路径`},{default:o(()=>[s(`code`,null,v(G.value.path),1)]),_:1}),u(X,{label:`所属分组`},{default:o(()=>[d(v(G.value.group),1)]),_:1}),u(X,{label:`安全认证`},{default:o(()=>[u(C,{type:`warning`,size:`small`},{default:o(()=>[...r[4]||=[d(`需要登录`,-1)]]),_:1})]),_:1})]),_:1}),r[7]||=s(`h4`,{class:`section-title`},`请求参数`,-1),u(le,{data:G.value.params,border:``,size:`small`,class:`mb-16`},{default:o(()=>[u(Q,{prop:`name`,label:`参数名`,width:`150`}),u(Q,{prop:`type`,label:`类型`,width:`100`,align:`center`}),u(Q,{prop:`required`,label:`必填`,width:`70`,align:`center`},{default:o(({row:e})=>[u(C,{type:e.required?`danger`:`info`,size:`small`},{default:o(()=>[d(v(e.required?`确定`:`取消`),1)]),_:2},1032,[`type`])]),_:1}),u(Q,{prop:`description`,label:`说明`,"show-overflow-tooltip":``}),u(Q,{prop:`example`,label:`示例`,width:`150`,"show-overflow-tooltip":``})]),_:1},8,[`data`]),r[8]||=s(`h4`,{class:`section-title`},`响应示例`,-1),s(`pre`,B,[s(`code`,null,v(G.value.responseExample),1)]),r[9]||=s(`h4`,{class:`section-title mt-16`},`在线调试`,-1),u(de,{inline:!0,size:`small`},{default:o(()=>[(g(!0),a(t,null,_(G.value.params.filter(e=>e.in===`query`),e=>(g(),c($,{key:e.name,label:e.name},{default:o(()=>[u(f,{modelValue:K[e.name],"onUpdate:modelValue":t=>K[e.name]=t,placeholder:e.example||e.description,style:{width:`200px`}},null,8,[`modelValue`,`onUpdate:modelValue`,`placeholder`])]),_:2},1032,[`label`]))),128)),u($,null,{default:o(()=>[u(ue,{type:`primary`,onClick:se},{default:o(()=>[...r[5]||=[d(`提交`,-1)]]),_:1})]),_:1})]),_:1}),q.value?(g(),a(`div`,V,[r[6]||=s(`h4`,{class:`section-title`},`响应结果`,-1),s(`pre`,null,[s(`code`,null,v(q.value),1)])])):n(``,!0)])):n(``,!0)]),_:1},8,[`modelValue`,`title`])])}}}),[[`__scopeId`,`data-v-bf51f971`]]);export{H as default};