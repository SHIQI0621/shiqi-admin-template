import{Bi as e,Ca as t,D as n,Fr as r,Hi as i,Hr as a,J as o,K as s,Kr as c,Mi as l,Ot as u,Si as d,U as f,Ur as p,Wr as m,X as h,Xi as g,Xr as _,Yr as v,Zr as y,ba as b,c as x,dt as S,fi as C,h as w,hi as T,ht as E,it as D,l as O,li as k,nt as A,q as j,st as ee,vi as M,vt as N,wa as P,yi as F}from"./use-global-config-CDAW_LBi.js";import{n as te,r as I,t as L}from"./select-C1D5bJ29.js";import{n as R,t as z}from"./table-CMSiBFgD.js";import{n as B,t as V}from"./form-D8i-N1rm.js";import{t as H}from"./message-4aFkqDJu.js";import{t as U}from"./button-CNWcJD6Z.js";import{t as W}from"./input-number-BIyZxgQo.js";import{t as G}from"./_plugin-vue_export-helper-DlZKjlIs.js";import"./css-BnnmmLAl.js";import"./css-TLCGBEa3.js";import"./css-Bm0-7wU0.js";import"./css-IPM88d8K.js";import{t as K}from"./Card-YFH_XaQp.js";import"./css-qWAiVKzi.js";import{t as q}from"./IconButton-HmiT0dze.js";import"./css-038HcgQ7.js";var J=G(y({__name:`index`,props:{name:{default:`scale`},duration:{default:300},intensity:{default:`normal`},tag:{default:`div`},autoPlay:{type:Boolean,default:!1}},setup(e){let n=e,r=i(!1),o=i(!1),s=a(()=>({[`hover-${n.name}`]:!0,[`intensity-${n.intensity}`]:!0,"is-hovering":r.value,"is-animating":o.value})),c=a(()=>({"--animation-duration":`${n.duration}ms`,"--animation-intensity":n.intensity===`strong`?1.3:n.intensity===`light`?.7:1}));function u(){r.value=!0,o.value=!0,setTimeout(()=>{o.value=!1},n.duration)}function f(){r.value=!1}let p=null;C(()=>{n.autoPlay&&h()}),k(()=>{p&&clearInterval(p)});function h(){let e=!1;p=window.setInterval(()=>{e=!e,o.value=e,e&&setTimeout(()=>{o.value=!1},n.duration)},n.duration+500)}return(n,r)=>(T(),m(d(e.tag),{class:b([`hover-animate-wrapper`,s.value]),style:t(c.value),onMouseenter:u,onMouseleave:f},{default:l(()=>[F(n.$slots,`default`,{},void 0,!0)]),_:3},40,[`class`,`style`]))}}),[[`__scopeId`,`data-v-205394f1`]]),Y={class:`hover-animate-page`},X={class:`card-header`},Z={class:`preview-container`},ne={class:`preview-content`},re={class:`preview-label`},ie={class:`config-form`},ae={class:`animation-grid`},oe=[`onClick`],se={class:`anim-preview`},Q={class:`anim-name`},ce={class:`anim-category`},le={class:`app-examples`},ue={class:`example-row`},de={class:`example-row`},fe={class:`mini-card`},$=G(y({__name:`index`,setup(t){let i=[{name:`scale`,icon:u,category:`缩放`},{name:`bounce`,icon:O,category:`缩放`},{name:`squeeze`,icon:o,category:`缩放`},{name:`squish`,icon:f,category:`缩放`},{name:`shake`,icon:ee,category:`变换`},{name:`swing`,icon:h,category:`变换`},{name:`flip`,icon:s,category:`变换`},{name:`tilt`,icon:A,category:`变换`},{name:`fade`,icon:S,category:`特效`},{name:`pulse`,icon:E,category:`特效`},{name:`glow`,icon:N,category:`特效`},{name:`float`,icon:D,category:`特效`},{name:`rubber-band`,icon:j,category:`创意`},{name:`tada`,icon:w,category:`创意`},{name:`wobble`,icon:O,category:`创意`},{name:`jello`,icon:s,category:`创意`},{name:`heartbeat`,icon:E,category:`创意`}],y=[{name:`name`,type:`'bounce' | 'scale' | 'shake' | 'swing' | 'flip' | 'fade' | 'pulse' | 'rubber-band' | 'tada' | 'wobble' | 'jello' | 'heartbeat' | 'float' | 'glow' | 'tilt' | 'squeeze' | 'squish'`,default:`'scale'`,description:`动画名称`},{name:`duration`,type:`number`,default:`300`,description:`动画时长（毫秒）`},{name:`intensity`,type:`'light' | 'normal' | 'strong'`,default:`'normal'`,description:`动画强度`},{name:`tag`,type:`string`,default:`'div'`,description:`渲染的 HTML 标签`},{name:`autoPlay`,type:`boolean`,default:`false`,description:`是否自动循环播放`}],C=[{name:`default`,description:`包裹需要应用悬停动画的内容`}],k=e({name:`bounce`,duration:300,intensity:`normal`,tag:`div`}),F=a(()=>i.find(e=>e.name===k.name)?.icon||O),G=[`bounce`,`pulse`,`glow`,`shake`],$=[`scale`,`float`,`tilt`,`fade`];function pe(e){k.name=e.name,H.info(`已选择动画: ${e.name}`)}async function me(){let e=`<HoverAnimateWrapper
  name="${k.name}"
  :duration="${k.duration}"
  intensity="${k.intensity}"
>
  <!-- 你的内容 -->
</HoverAnimateWrapper>`;try{await navigator.clipboard.writeText(e),H.success(`代码已复制到剪贴板`)}catch{let t=document.createElement(`textarea`);t.value=e,document.body.appendChild(t),t.select();try{document.execCommand(`copy`),H.success(`代码已复制到剪贴板`)}catch{H.error(`复制失败`)}document.body.removeChild(t)}}return(e,t)=>{let a=x,o=J,s=L,u=te,f=I,h=B,S=W,w=V,D=R,O=z,A=U;return T(),c(`div`,Y,[_(K,{class:`intro-card`,"border-radius":16},{default:l(()=>[...t[4]||=[p(`div`,{class:`intro-section`},[p(`h2`,{class:`intro-title`},`Hover 动画演示`),p(`p`,{class:`intro-text`},[v(` 本项目封装了 17 种精美的 Hover 动画效果，简化了使用方式，只需传入动画名称 `),p(`code`,{class:`code-inline`},`name`),v(` 属性即可开箱即用。这些动画涵盖了弹性、变换、特效、动感和创意等多种类型，可以满足各种交互场景的悬停反馈需求。 `)]),p(`div`,{class:`intro-tips`},[p(`div`,{class:`tip-item`},[p(`strong`,null,`与 Transition 内置动画的区别：`)]),p(`ul`,null,[p(`li`,null,[p(`b`,null,`Transition 动画`),v(`：用于元素进入/离开页面时的过渡效果（基于 `),p(`code`,null,`v-if`),v(` / `),p(`code`,null,`v-show`),v(` 的状态变化），适合页面切换、列表项出现等场景。 `)]),p(`li`,null,[p(`b`,null,`Hover 动画`),v(`：用于鼠标悬停时的交互反馈，增强用户体验和可点击性提示，适合按钮、卡片、图标等可交互元素。 `)])]),p(`p`,{class:`tip-note`},`两者解决不同的问题，可以同时使用，互不冲突。`)]),p(`div`,{class:`intro-usage`},[p(`div`,{class:`usage-title`},`📦 独立使用`),p(`p`,null,[v(` 如果你不想使用整个项目，也可以直接复制 `),p(`code`,{class:`code-inline`},`HoverAnimateWrapper`),v(` 组件源码到自己的项目中使用。 `)])])],-1)]]),_:1}),_(K,{class:`preview-card`,"border-radius":16},{header:l(()=>[p(`div`,X,[t[6]||=p(`span`,{class:`header-title`},`效果预览`,-1),_(q,{type:`primary`,plain:``,size:`small`,onClick:me},{icon:l(()=>[_(a,null,{default:l(()=>[_(g(n))]),_:1})]),default:l(()=>[t[5]||=v(` 复制代码 `,-1)]),_:1})])]),default:l(()=>[p(`div`,Z,[_(o,{name:k.name,duration:k.duration,intensity:k.intensity},{default:l(()=>[p(`div`,ne,[_(a,{size:64,class:`preview-icon`},{default:l(()=>[(T(),m(d(F.value)))]),_:1}),p(`span`,re,P(k.name),1)])]),_:1},8,[`name`,`duration`,`intensity`]),t[7]||=p(`p`,{class:`preview-hint`},`将鼠标悬停在上方元素上即可看到动画效果`,-1)])]),_:1}),_(K,{class:`config-card`,"border-radius":16},{header:l(()=>[...t[8]||=[p(`span`,{class:`header-title`},`基础配置`,-1)]]),default:l(()=>[p(`div`,ie,[_(w,{model:k,"label-width":`120px`,"label-position":`right`},{default:l(()=>[_(h,{label:`动画类型`},{default:l(()=>[_(f,{modelValue:k.name,"onUpdate:modelValue":t[0]||=e=>k.name=e,placeholder:`选择动画类型`},{default:l(()=>[_(u,{label:`缩放效果`},{default:l(()=>[_(s,{label:`scale (缩放效果)`,value:`scale`}),_(s,{label:`bounce (弹性效果)`,value:`bounce`}),_(s,{label:`squeeze (横向挤压)`,value:`squeeze`}),_(s,{label:`squish (纵向压扁)`,value:`squish`})]),_:1}),_(u,{label:`变换效果`},{default:l(()=>[_(s,{label:`shake (水平抖动)`,value:`shake`}),_(s,{label:`swing (摇摆效果)`,value:`swing`}),_(s,{label:`flip (翻转动画)`,value:`flip`}),_(s,{label:`tilt (3D倾斜)`,value:`tilt`})]),_:1}),_(u,{label:`特殊效果`},{default:l(()=>[_(s,{label:`fade (淡出效果)`,value:`fade`}),_(s,{label:`pulse (脉冲效果)`,value:`pulse`}),_(s,{label:`glow (发光效果)`,value:`glow`}),_(s,{label:`float (悬浮效果)`,value:`float`})]),_:1}),_(u,{label:`创意效果`},{default:l(()=>[_(s,{label:`rubber-band (橡皮筋)`,value:`rubber-band`}),_(s,{label:`tada (欢呼效果)`,value:`tada`}),_(s,{label:`wobble (摇摆抖动)`,value:`wobble`}),_(s,{label:`jello (果冻效果)`,value:`jello`}),_(s,{label:`heartbeat (心跳效果)`,value:`heartbeat`})]),_:1})]),_:1},8,[`modelValue`])]),_:1}),_(h,{label:`动画时长`},{default:l(()=>[_(S,{modelValue:k.duration,"onUpdate:modelValue":t[1]||=e=>k.duration=e,min:100,max:2e3,step:50,"controls-position":`right`},null,8,[`modelValue`]),t[9]||=p(`span`,{class:`form-suffix`},`毫秒`,-1)]),_:1}),_(h,{label:`动画强度`},{default:l(()=>[_(f,{modelValue:k.intensity,"onUpdate:modelValue":t[2]||=e=>k.intensity=e},{default:l(()=>[_(s,{label:`light (柔和)`,value:`light`}),_(s,{label:`normal (正常)`,value:`normal`}),_(s,{label:`strong (强烈)`,value:`strong`})]),_:1},8,[`modelValue`])]),_:1}),_(h,{label:`标签类型`},{default:l(()=>[_(f,{modelValue:k.tag,"onUpdate:modelValue":t[3]||=e=>k.tag=e},{default:l(()=>[_(s,{label:`div`,value:`div`}),_(s,{label:`span`,value:`span`}),_(s,{label:`button`,value:`button`}),_(s,{label:`a`,value:`a`})]),_:1},8,[`modelValue`])]),_:1})]),_:1},8,[`model`])])]),_:1}),_(K,{class:`list-card`,"border-radius":16},{header:l(()=>[...t[10]||=[p(`span`,{class:`header-title`},`全部动画效果`,-1)]]),default:l(()=>[p(`div`,ae,[(T(),c(r,null,M(i,e=>p(`div`,{key:e.name,class:b([`animation-item`,{"is-active":k.name===e.name}]),onClick:t=>pe(e)},[_(o,{name:e.name,duration:300,intensity:`normal`},{default:l(()=>[p(`div`,se,[_(a,{size:32},{default:l(()=>[(T(),m(d(e.icon)))]),_:2},1024)])]),_:2},1032,[`name`]),p(`span`,Q,P(e.name),1),p(`span`,ce,P(e.category),1)],10,oe)),64))])]),_:1}),_(K,{class:`usage-card`,"border-radius":16},{header:l(()=>[...t[11]||=[p(`span`,{class:`header-title`},`基础用法`,-1)]]),default:l(()=>[t[12]||=p(`div`,{class:`usage-section`},[p(`h3`,{class:`usage-subtitle`},`基础用法`),p(`pre`,{class:`code-block`},[v(`          `),p(`code`,null,`
            <template>
            <HoverAnimateWrapper name="bounce">
              <el-button type="primary">点击我</el-button>
            </HoverAnimateWrapper>
            </template>

            <script setup lang="ts">
            import HoverAnimateWrapper from '@/components/HoverAnimateWrapper/index.vue'
            <\/script>
          `),v(`
        `)]),p(`h3`,{class:`usage-subtitle`},`自定义配置`),p(`pre`,{class:`code-block`},[v(`          `),p(`code`,null,`
            <HoverAnimateWrapper
                name="glow"
                :duration="500"
                intensity="strong"
                tag="div"
            >
            <div class="my-card">卡片内容</div>
            </HoverAnimateWrapper>
          `),v(`
        `)]),p(`h3`,{class:`usage-subtitle`},`自动循环播放`),p(`pre`,{class:`code-block`},[v(`          `),p(`code`,null,`
            <HoverAnimateWrapper name="pulse" auto-play><el-icon :size="32"><Bell /></el-icon></HoverAnimateWrapper>
          `),v(`
        `)]),p(`h3`,{class:`usage-subtitle`},`useHoverAnimate Hook 用法`),p(`p`,{class:`demo-desc`},`使用 Hook 可以更灵活地控制动画状态，适合需要编程式触发的场景。`),p(`pre`,{class:`code-block`},[v(`          `),p(`code`,null,`
            <template>
              <div
                :class="wrapperClass"
                :style="wrapperStyle"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
              >
                <el-button type="primary">{ { isHovering ? '悬停中' : '悬浮我' } }</el-button>
              </div>
            </template>

            <script setup lang="ts">
            import { useHoverAnimate } from '@/hooks/useHoverAnimate'

            const {
              isHovering,        // 是否正在悬停
              isAnimating,       // 是否正在播放动画
              wrapperClass,      // 绑定到元素的 class
              wrapperStyle,      // 绑定到元素的 style（CSS 变量）
              handleMouseEnter,  // mouseenter 事件处理
              handleMouseLeave,  // mouseleave 事件处理
            } = useHoverAnimate({
              name: 'bounce',
              duration: 500,
              intensity: 'strong',
            })
            <\/script>
          `),v(`
        `)]),p(`h3`,{class:`usage-subtitle`},`Hook 编程式触发 & 自动播放`),p(`p`,{class:`demo-desc`},`通过 trigger() 手动触发动画，或通过 startAutoPlay/stopAutoPlay 控制循环播放。`),p(`pre`,{class:`code-block`},[v(`          `),p(`code`,null,`
            <script setup lang="ts">
            import { useHoverAnimate } from '@/hooks/useHoverAnimate'

            const {
              isAnimating,
              wrapperClass,
              wrapperStyle,
              trigger,        // 手动触发一次动画
              startAutoPlay,  // 开始自动循环播放
              stopAutoPlay,   // 停止自动循环播放
            } = useHoverAnimate({
              name: 'pulse',
              duration: 600,
              autoPlay: true,  // 挂载时自动开始播放
            })

            // 编程式触发：点击按钮时播放一次动画
            function handleClick() {
              trigger()
            }

            // 手动控制自动播放
            function toggleAutoPlay(on: boolean) {
              if (on) startAutoPlay()
              else stopAutoPlay()
            }
            <\/script>
          `),v(`
        `)]),p(`h3`,{class:`usage-subtitle`},`v-hover 自定义指令用法`),p(`p`,{class:`demo-desc`},`最简方式：直接在任意元素上使用 v-hover 指令，自动注入动画样式与事件绑定。`),p(`pre`,{class:`code-block`},[v(`          `),p(`code`,null,`
            <template>
              <!-- 基础用法：默认 squeeze 动画 -->
              <el-button v-hover>按钮</el-button>

              <!-- 指定动画名称 -->
              <el-icon v-hover="{ name: 'bounce' }" :size="24">
                <Star />
              </el-icon>

              <!-- 完整配置 -->
              <div v-hover="{ name: 'glow', duration: 500, intensity: 'strong' }"
                   class="my-card">
                卡片内容
              </div>
            </template>

            <script setup lang="ts">
            // v-hover 已全局注册，无需手动 import
            <\/script>
          `),v(`
        `)])],-1)]),_:1}),_(K,{class:`props-card`,"border-radius":16},{header:l(()=>[...t[13]||=[p(`span`,{class:`header-title`},`属性说明`,-1)]]),default:l(()=>[_(O,{data:y,class:`api-table`,size:`small`,"header-cell-style":{background:`var(--el-fill-color-lighter)`}},{default:l(()=>[_(D,{prop:`name`,label:`属性`,width:`100`}),_(D,{prop:`type`,label:`类型`,width:`220`}),_(D,{prop:`default`,label:`默认值`,width:`100`}),_(D,{prop:`description`,label:`说明`})]),_:1})]),_:1}),_(K,{class:`slots-card`,"border-radius":16},{header:l(()=>[...t[14]||=[p(`span`,{class:`header-title`},`插槽说明`,-1)]]),default:l(()=>[_(O,{data:C,class:`api-table`,size:`small`,"header-cell-style":{background:`var(--el-fill-color-lighter)`}},{default:l(()=>[_(D,{prop:`name`,label:`插槽名`,width:`120`}),_(D,{prop:`description`,label:`说明`})]),_:1})]),_:1}),_(K,{class:`app-preview-card`,"border-radius":16},{header:l(()=>[...t[15]||=[p(`span`,{class:`header-title`},`实际应用预览`,-1)]]),default:l(()=>[p(`div`,le,[t[16]||=p(`h3`,{class:`example-title`},`按钮悬停效果`,-1),p(`div`,ue,[(T(),c(r,null,M(G,e=>_(o,{key:e,name:e,duration:300},{default:l(()=>[_(A,{type:`primary`,plain:``},{default:l(()=>[v(P(e),1)]),_:2},1024)]),_:2},1032,[`name`])),64))]),t[17]||=p(`h3`,{class:`example-title`},`卡片悬停效果`,-1),p(`div`,de,[(T(),c(r,null,M($,e=>_(o,{key:e,name:e,duration:400,intensity:`light`},{default:l(()=>[p(`div`,fe,[_(a,{size:24},{default:l(()=>[_(g(E))]),_:1}),p(`span`,null,P(e),1)])]),_:2},1032,[`name`])),64))])])]),_:1})])}}}),[[`__scopeId`,`data-v-ad8f729e`]]);export{$ as default};