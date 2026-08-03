import{$ as e,Fr as t,Gr as n,Hi as r,Kr as i,Mi as a,Ot as o,Ur as s,Wr as c,Xi as l,Xr as u,Yr as d,Zr as f,ba as p,c as m,d as h,f as g,hi as _,vi as v,wa as y}from"./use-global-config-CDAW_LBi.js";import{n as b,t as ee}from"./table-CMSiBFgD.js";import{t as x}from"./image-viewer-C153a270.js";import{t as te}from"./button-CNWcJD6Z.js";import{t as S}from"./image-DARlykdZ.js";import{t as C}from"./_plugin-vue_export-helper-DlZKjlIs.js";import"./css-BnnmmLAl.js";import"./css-Bm0-7wU0.js";import{t as w}from"./Card-YFH_XaQp.js";import"./css-qWAiVKzi.js";import"./css-DjpEmVxT2.js";var T={class:`image-preview-wrapper`},E={class:`image-error`},D=C(f({__name:`index`,props:{images:{},modelValue:{type:Boolean},index:{default:0},fit:{default:`contain`},previewTrigger:{default:`manual`}},emits:[`update:modelValue`,`update:index`,`close`,`switch`],setup(t,{expose:r,emit:o}){let d=o;function f(){d(`update:modelValue`,!0)}function p(){d(`update:modelValue`,!1),d(`close`)}function h(e){d(`update:index`,e),d(`switch`,e)}return r({show:()=>d(`update:modelValue`,!0),hide:()=>d(`update:modelValue`,!1)}),(r,o)=>{let d=m,g=S;return _(),i(`div`,T,[t.previewTrigger===`click`?(_(),c(g,{key:0,src:t.images[t.index],"preview-src-list":t.images,"initial-index":t.index,fit:`contain`,class:`image-thumbnail`,onClick:f},{error:a(()=>[s(`div`,E,[u(d,{size:40},{default:a(()=>[u(l(e))]),_:1}),o[0]||=s(`span`,null,`加载失败`,-1)])]),_:1},8,[`src`,`preview-src-list`,`initial-index`])):n(``,!0),t.modelValue?(_(),c(l(x),{key:1,"url-list":t.images,"initial-index":t.index,onClose:p,onSwitch:h},null,8,[`url-list`,`initial-index`])):n(``,!0)])}}}),[[`__scopeId`,`data-v-2ce97f93`]]),O={class:`image-preview-page`},ne={class:`preview-section`},re={class:`preview-group`},ie={class:`image-grid`},ae=[`onClick`],k=[`src`,`alt`],A={class:`image-item__overlay`},j={class:`preview-group`},M={class:`image-switcher`},N={class:`current-index`},P={class:`app-examples`},F={class:`example-row`},I={class:`product-gallery`},L={class:`product-gallery__main`},R=[`src`],z={class:`product-gallery__thumbs`},B=[`onClick`],V=[`src`],H={class:`example-row`},U={class:`photo-album`},W=[`onClick`],G=[`src`],K={class:`photo-album__badge`},q=C(f({name:`ImagePreviewDemo`,__name:`index`,setup(e){let n=r(!1),c=r(0),f=r([`https://picsum.photos/id/1015/400/300`,`https://picsum.photos/id/1025/400/300`,`https://picsum.photos/id/1035/400/300`,`https://picsum.photos/id/1043/400/300`,`https://picsum.photos/id/1050/400/300`,`https://picsum.photos/id/1062/400/300`]);function x(e){c.value=e,n.value=!0}function S(){c.value>0&&c.value--}function C(){c.value<f.value.length-1&&c.value++}let T=r(!1),E=r(0);function q(){T.value=!0}let J=r(!1),Y=r(0);function oe(e){Y.value=e,J.value=!0}let se=[{name:`images`,type:`string[]`,default:`-`,required:`是`,description:`图片 URL 数组，必填`},{name:`modelValue`,type:`boolean`,default:`-`,required:`是`,description:`控制预览组件的显示/隐藏（v-model 绑定）`},{name:`index`,type:`number`,default:`0`,required:`否`,description:`当前预览的图片索引，支持 v-model:index`},{name:`fit`,type:`'contain' | 'cover' | 'fill' | 'none' | 'scale-down'`,default:`'contain'`,required:`否`,description:`图片在预览区域中的适应方式`},{name:`previewTrigger`,type:`'click' | 'manual'`,default:`'manual'`,required:`否`,description:`预览触发方式，manual 模式需通过 expose 方法控制`}],ce=[{name:`update:modelValue`,args:`(value: boolean)`,description:`预览显示状态变化时触发，用于 v-model 更新`},{name:`update:index`,args:`(index: number)`,description:`当前图片索引变化时触发，用于 v-model:index`},{name:`close`,args:`()`,description:`关闭预览时触发`},{name:`switch`,args:`(index: number)`,description:`切换到指定图片时触发`}],le=[{name:`show`,args:`()`,description:`手动打开预览（配合 previewTrigger="manual" 使用）`},{name:`hide`,args:`()`,description:`手动关闭预览`}];return(e,r)=>{let X=m,Z=te,Q=b,$=ee;return _(),i(`div`,O,[u(w,{class:`intro-card`,"border-radius":16},{default:a(()=>[...r[9]||=[s(`div`,{class:`intro-section`},[s(`h2`,{class:`intro-title`},`ImagePreview 图片预览`),s(`p`,{class:`intro-text`},` ImagePreview 是一个全屏图片预览组件，支持多图切换、缩放拖拽、键盘导航等功能。通过 v-model 控制预览显示状态，配合图片数组实现图片画廊浏览体验。 `),s(`div`,{class:`intro-tips`},[s(`p`,null,`组件通过 v-model 控制可见性，通过 index 属性或 v-model:index 控制当前展示的图片。支持 manual 模式通过 expose 的 show/hide 方法进行编程式控制。内部已集成图片切换、缩放、拖拽等交互，无需额外配置。`)]),s(`div`,{class:`intro-usage`},[s(`div`,{class:`usage-title`},`📦 独立使用`),s(`p`,null,[d(`如果你不想使用整个项目，也可以直接复制组件源码到自己的项目中使用。ImagePreview 主要依赖于 `),s(`code`,{class:`code-inline`},`element-plus`),d(`，使用前请确保已安装该依赖。组件源码地址：`),s(`a`,{href:`#`},`ImagePreview.vue`),d(`，欢迎直接使用或根据需求进行二次开发。`)])])],-1)]]),_:1}),u(w,{class:`preview-card`,"border-radius":16},{header:a(()=>[...r[10]||=[s(`div`,{class:`card-header`},[s(`span`,{class:`header-title`},`ImagePreview 效果预览`)],-1)]]),default:a(()=>[s(`div`,ne,[r[12]||=s(`h3`,{class:`section-title`},`基础图片预览：`,-1),s(`div`,re,[s(`div`,ie,[(_(!0),i(t,null,v(f.value,(e,t)=>(_(),i(`div`,{key:t,class:`image-item`,onClick:e=>x(t)},[s(`img`,{src:e,alt:`图片`+(t+1)},null,8,k),s(`div`,A,[u(X,{size:24},{default:a(()=>[u(l(o))]),_:1})])],8,ae))),128))]),u(D,{modelValue:n.value,"onUpdate:modelValue":r[0]||=e=>n.value=e,images:f.value,index:c.value,"onUpdate:index":r[1]||=e=>c.value=e},null,8,[`modelValue`,`images`,`index`])]),r[13]||=s(`h3`,{class:`section-title`},`图片切换控制：`,-1),s(`div`,j,[s(`div`,M,[u(Z,{onClick:S,disabled:c.value<=0},{default:a(()=>[u(X,null,{default:a(()=>[u(l(h))]),_:1})]),_:1},8,[`disabled`]),s(`span`,N,y(c.value+1)+` / `+y(f.value.length),1),u(Z,{onClick:C,disabled:c.value>=f.value.length-1},{default:a(()=>[u(X,null,{default:a(()=>[u(l(g))]),_:1})]),_:1},8,[`disabled`]),u(Z,{type:`primary`,onClick:r[2]||=e=>n.value=!0},{default:a(()=>[...r[11]||=[d(` 打开预览 `,-1)]]),_:1})]),u(D,{modelValue:n.value,"onUpdate:modelValue":r[3]||=e=>n.value=e,images:f.value,index:c.value,"onUpdate:index":r[4]||=e=>c.value=e},null,8,[`modelValue`,`images`,`index`])])])]),_:1}),u(w,{class:`usage-card`,"border-radius":16},{header:a(()=>[...r[14]||=[s(`span`,{class:`header-title`},`基础用法`,-1)]]),default:a(()=>[r[15]||=s(`div`,{class:`usage-section`},[s(`h3`,{class:`usage-subtitle`},`1. 基础图片预览`),s(`pre`,{class:`code-block`},[s(`code`,null,`<template>
                <img
                v-for="(img, index) in images"
                :src="img"
                @click="handlePreview(index)"
                />

                <ImagePreview
                v-model="visible"
                :images="images"
                :index="currentIndex"
                @update:index="currentIndex = $event"
                />
                </template>

                <script setup lang="ts">
                import { ref } from 'vue'
                import ImagePreview from '@/components/ImagePreview/index.vue'

                const visible = ref(false)
                const currentIndex = ref(0)
                const images = ref([
                'https://example.com/image1.jpg',
                'https://example.com/image2.jpg',
                ])

                function handlePreview(index: number) {
                currentIndex.value = index
                visible.value = true
                }
                <\/script>`)]),s(`h3`,{class:`usage-subtitle`},`2. 使用 v-model:index`),s(`pre`,{class:`code-block`},[s(`code`,null,`<ImagePreview
                v-model="visible"
                v-model:index="currentIndex"
                :images="images"
                />

                <!-- currentIndex 会随用户切换图片自动更新 -->`)]),s(`h3`,{class:`usage-subtitle`},`3. 编程式控制（manual 模式）`),s(`pre`,{class:`code-block`},[s(`code`,null,`<template>
                <el-button @click="showPreview">查看图片</el-button>
                <ImagePreview
                ref="previewRef"
                :images="images"
                preview-trigger="manual"
                />
                </template>

                <script setup lang="ts">
                import { ref } from 'vue'
                import ImagePreview from '@/components/ImagePreview/index.vue'

                const previewRef = ref()

                function showPreview() {
                previewRef.value?.show()
                }
                <\/script>`)]),s(`h3`,{class:`usage-subtitle`},`4. 自定义适应模式`),s(`pre`,{class:`code-block`},[s(`code`,null,`<!-- 图片适应方式：contain / cover / fill / none / scale-down -->
                <ImagePreview
                v-model="visible"
                :images="images"
                fit="cover"
                />`)])],-1)]),_:1}),u(w,{class:`props-card`,"border-radius":16},{header:a(()=>[...r[16]||=[s(`span`,{class:`header-title`},`属性说明`,-1)]]),default:a(()=>[u($,{data:se,class:`api-table`,size:`small`,"header-cell-style":{background:`var(--el-fill-color-lighter)`}},{default:a(()=>[u(Q,{prop:`name`,label:`属性`,width:`160`}),u(Q,{prop:`type`,label:`类型`,width:`200`}),u(Q,{prop:`default`,label:`默认值`,width:`100`}),u(Q,{prop:`required`,label:`必填`,width:`60`}),u(Q,{prop:`description`,label:`说明`})]),_:1})]),_:1}),u(w,{class:`events-card`,"border-radius":16},{header:a(()=>[...r[17]||=[s(`span`,{class:`header-title`},`事件说明`,-1)]]),default:a(()=>[u($,{data:ce,class:`api-table`,size:`small`,"header-cell-style":{background:`var(--el-fill-color-lighter)`}},{default:a(()=>[u(Q,{prop:`name`,label:`事件名`,width:`160`}),u(Q,{prop:`args`,label:`参数`,width:`160`}),u(Q,{prop:`description`,label:`说明`})]),_:1})]),_:1}),u(w,{class:`slots-card`,"border-radius":16},{header:a(()=>[...r[18]||=[s(`span`,{class:`header-title`},`Expose 方法`,-1)]]),default:a(()=>[u($,{data:le,class:`api-table`,size:`small`,"header-cell-style":{background:`var(--el-fill-color-lighter)`}},{default:a(()=>[u(Q,{prop:`name`,label:`方法名`,width:`120`}),u(Q,{prop:`args`,label:`参数`,width:`180`}),u(Q,{prop:`description`,label:`说明`})]),_:1})]),_:1}),u(w,{class:`app-preview-card`,"border-radius":16},{header:a(()=>[...r[19]||=[s(`span`,{class:`header-title`},`实际应用预览`,-1)]]),default:a(()=>[s(`div`,P,[r[20]||=s(`h3`,{class:`example-title`},`商品图片画廊`,-1),s(`div`,F,[s(`div`,I,[s(`div`,L,[s(`img`,{src:f.value[E.value],class:`product-gallery__main-img`},null,8,R)]),s(`div`,z,[(_(!0),i(t,null,v(f.value.slice(0,4),(e,t)=>(_(),i(`div`,{key:t,class:p([`product-gallery__thumb`,{active:t===E.value}]),onClick:e=>{E.value=t,q()}},[s(`img`,{src:e},null,8,V)],10,B))),128))])]),u(D,{modelValue:T.value,"onUpdate:modelValue":r[5]||=e=>T.value=e,images:f.value,index:E.value,"onUpdate:index":r[6]||=e=>E.value=e},null,8,[`modelValue`,`images`,`index`])]),r[21]||=s(`h3`,{class:`example-title`},`相册浏览`,-1),s(`div`,H,[s(`div`,U,[(_(!0),i(t,null,v(f.value,(e,t)=>(_(),i(`div`,{key:t,class:`photo-album__item`,onClick:e=>oe(t)},[s(`img`,{src:e},null,8,G),s(`div`,K,y(t+1),1)],8,W))),128))]),u(D,{modelValue:J.value,"onUpdate:modelValue":r[7]||=e=>J.value=e,images:f.value,index:Y.value,"onUpdate:index":r[8]||=e=>Y.value=e},null,8,[`modelValue`,`images`,`index`])])])]),_:1})])}}}),[[`__scopeId`,`data-v-14503f1a`]]);export{q as default};