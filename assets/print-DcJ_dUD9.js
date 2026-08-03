import{Fr as e,Hi as t,Hr as n,Kr as r,Mi as i,Ur as a,Xi as o,Xr as s,Yr as c,Zr as l,c as u,hi as d,pi as f,rt as p,vi as m,wa as h}from"./use-global-config-CDAW_LBi.js";import{n as g,t as _}from"./table-CMSiBFgD.js";import{t as v}from"./message-4aFkqDJu.js";import{t as y}from"./button-CNWcJD6Z.js";import{t as b}from"./_plugin-vue_export-helper-DlZKjlIs.js";import"./css-BnnmmLAl.js";import"./css-Bm0-7wU0.js";import{t as x}from"./Card-YFH_XaQp.js";import"./css-qWAiVKzi.js";function S(e){let n=t(!1),r=null;function i(t){let n=t||e?.target;return n?typeof n==`string`?document.querySelector(n):n:null}function a(e){let t=[],n=[e,...e.querySelectorAll(`*`)];for(let e of n){let n=window.getComputedStyle(e),r=``;for(let e=0;e<n.length;e++){let t=n[e],i=n.getPropertyValue(t);[`visibility`,`display`,`opacity`].includes(t)||(r+=`${t}:${i};`)}if(r){let n=e.tagName.toLowerCase(),i=e.className&&typeof e.className==`string`?`.`+e.className.trim().split(/\s+/).join(`.`):``;t.push(`${n}${i}{${r}}`)}}return t.join(`
`)}function o(t,n){let r=(n.stylesheets||e?.stylesheets||[]).map(e=>`<link rel="stylesheet" href="${e}">`).join(`
`),i=n.css||e?.css||``,o=n.title||e?.title||document.title,s=[];document.querySelectorAll(`style`).forEach(e=>{s.push(e.innerHTML)});let c=a(t);return`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${o}</title>
  ${r}
  <style>
    ${s.join(`
`)}
    ${c}
    ${i}
    @media print {
      body { margin: 0; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  ${t.outerHTML}
</body>
</html>`}function s(){r&&=(r.remove(),null)}async function c(t){if(n.value)return;let a={...e,...t},c=i(a.target);if(!c){v.warning(`未找到打印目标元素`);return}n.value=!0;try{a.beforePrint&&await a.beforePrint(),s(),r=document.createElement(`iframe`),r.style.position=`fixed`,r.style.top=`-9999px`,r.style.left=`-9999px`,r.style.width=`0`,r.style.height=`0`,r.style.border=`none`,r.style.visibility=`hidden`,document.body.appendChild(r);let e=r.contentWindow?.document;if(!e){v.error(`无法创建打印窗口`);return}let t=o(c,a);e.open(),e.write(t),e.close(),await new Promise(e=>{let t=r.contentWindow;if(!t){e();return}let n=async()=>{t.removeEventListener(`afterprint`,n),a.afterPrint&&await a.afterPrint(),a.autoCleanup!==!1&&setTimeout(s,500)};t.addEventListener(`afterprint`,n),setTimeout(()=>{r&&(e(),a.autoCleanup!==!1&&s())},5e3);let i=()=>{t.document.readyState===`complete`?(e(),setTimeout(()=>{try{r.contentWindow?.focus(),r.contentWindow?.print()}catch(e){console.error(`打印失败:`,e),v.error(`打印失败`)}},100)):setTimeout(i,50)};i()})}catch(e){console.error(`打印出错:`,e),v.error(`打印出错`)}finally{n.value=!1}}async function l(t,i){if(!n.value){n.value=!0;try{let n={...e,...i};n.beforePrint&&await n.beforePrint(),s(),r=document.createElement(`iframe`),r.style.position=`fixed`,r.style.top=`-9999px`,r.style.left=`-9999px`,r.style.width=`0`,r.style.height=`0`,r.style.border=`none`,r.style.visibility=`hidden`,document.body.appendChild(r);let a=r.contentWindow?.document;if(!a)return;let o=(n.stylesheets||[]).map(e=>`<link rel="stylesheet" href="${e}">`).join(`
`),c=n.css||``,l=n.title||document.title;a.open(),a.write(`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>${l}</title>${o}<style>${c}@media print{body{margin:0}.no-print{display:none!important}}</style></head><body>${t}</body></html>`),a.close(),await new Promise(e=>{let t=r.contentWindow;if(!t){e();return}let i=async()=>{t.removeEventListener(`afterprint`,i),n.afterPrint&&await n.afterPrint(),n.autoCleanup!==!1&&setTimeout(s,500)};t.addEventListener(`afterprint`,i);let a=()=>{t.document.readyState===`complete`?(e(),setTimeout(()=>{try{r.contentWindow?.focus(),r.contentWindow?.print()}catch(e){console.error(`打印失败:`,e)}},100)):setTimeout(a,50)};a()})}catch(e){console.error(`打印出错:`,e),v.error(`打印出错`)}finally{n.value=!1}}}return f(()=>{s()}),{printing:n,print:c,printHTML:l}}var C={class:`print-page`},w={class:`card-header`},T={class:`invoice-header`},E={class:`invoice-no`},D={class:`invoice-date`},O={class:`invoice-parties`},k={class:`party-row`},A={class:`party-value`},j={class:`invoice-table`},M={colspan:`4`,class:`total-label`},N={class:`total-amount`},P={class:`invoice-footer no-print`},F={class:`app-examples`},I={class:`example-row`,style:{display:`flex`,"justify-content":`space-between`,"align-items":`center`}},L={class:`example-row`,style:{display:`flex`,"justify-content":`space-between`,"align-items":`center`}},R=`
<div style="padding: 20px;">
  <h1 style="text-align: center; font-size: 22px; margin-bottom: 24px;">月度销售报表</h1>
  <p style="text-align: right; color: #666; margin-bottom: 16px;">2026年7月</p>
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background: #f5f5f5;">
        <th style="border: 1px solid #333; padding: 8px;">序号</th>
        <th style="border: 1px solid #333; padding: 8px;">产品名称</th>
        <th style="border: 1px solid #333; padding: 8px;">销量</th>
        <th style="border: 1px solid #333; padding: 8px;">单价</th>
        <th style="border: 1px solid #333; padding: 8px;">总额</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="border: 1px solid #333; padding: 8px; text-align: center;">1</td>
          <td style="border: 1px solid #333; padding: 8px;">软件许可</td>
          <td style="border: 1px solid #333; padding: 8px; text-align: center;">15</td>
          <td style="border: 1px solid #333; padding: 8px; text-align: right;">¥8,800.00</td>
          <td style="border: 1px solid #333; padding: 8px; text-align: right;">¥132,000.00</td></tr>
      <tr><td style="border: 1px solid #333; padding: 8px; text-align: center;">2</td>
          <td style="border: 1px solid #333; padding: 8px;">技术支持</td>
          <td style="border: 1px solid #333; padding: 8px; text-align: center;">8</td>
          <td style="border: 1px solid #333; padding: 8px; text-align: right;">¥1,200.00</td>
          <td style="border: 1px solid #333; padding: 8px; text-align: right;">¥9,600.00</td></tr>
      <tr><td style="border: 1px solid #333; padding: 8px; text-align: center;">3</td>
          <td style="border: 1px solid #333; padding: 8px;">存储扩容</td>
          <td style="border: 1px solid #333; padding: 8px; text-align: center;">20</td>
          <td style="border: 1px solid #333; padding: 8px; text-align: right;">¥500.00</td>
          <td style="border: 1px solid #333; padding: 8px; text-align: right;">¥10,000.00</td></tr>
    </tbody>
    <tfoot>
      <tr style="background: #f5f5f5; font-weight: bold;">
        <td colspan="4" style="border: 1px solid #333; padding: 8px; text-align: right;">合计：</td>
        <td style="border: 1px solid #333; padding: 8px; text-align: right;">¥151,600.00</td>
      </tr>
    </tfoot>
  </table>
</div>
`,z=b(l({__name:`index`,setup(l){let{print:f,printHTML:v,printing:b}=S(),z=t(),B=t(20260731001),V=t(`某某商贸有限公司`),H=t(`2026年07月31日`),U=t([{name:`软件授权许可（年度）`,qty:1,price:8800},{name:`技术支持服务（月度）`,qty:3,price:1200},{name:`数据存储扩容 100GB`,qty:2,price:500}]),W=n(()=>U.value.reduce((e,t)=>e+t.qty*t.price,0)),G=n(()=>{let e=W.value,t=[`零`,`壹`,`贰`,`叁`,`肆`,`伍`,`陆`,`柒`,`捌`,`玖`],n=[``,`拾`,`佰`,`仟`,`万`,`拾`,`佰`,`仟`,`亿`],r=Math.floor(e),i=Math.round((e-r)*100),a=String(r),o=``;for(let e=0;e<a.length;e++){let r=parseInt(a[e]),i=n[a.length-1-e];r===0?o.endsWith(`零`)||(o+=`零`):o+=t[r]+i}if(o=o.replace(/零+$/,``)||`零`,o+=`元`,i===0)o+=`整`;else{let e=Math.floor(i/10),n=i%10;e>0&&(o+=t[e]+`角`),n>0&&(o+=t[n]+`分`)}return o});function K(){f({target:z.value,title:`发票-${B.value}`,css:`
      @page { size: A4; margin: 15mm; }
      body { font-family: 'Microsoft YaHei', sans-serif; color: #333; }
      .invoice-header { text-align: center; margin-bottom: 24px; }
      .invoice-title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
      .invoice-no, .invoice-date { font-size: 13px; color: #666; }
      .invoice-parties { margin-bottom: 16px; }
      .party-row { margin-bottom: 4px; font-size: 14px; }
      .party-label { font-weight: bold; }
      table.invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
      table.invoice-table th, table.invoice-table td { border: 1px solid #333; padding: 8px 12px; text-align: center; font-size: 13px; }
      table.invoice-table th { background: #f5f5f5; font-weight: bold; }
      .total-label { text-align: right; padding-right: 16px; }
      .total-amount { font-weight: bold; font-size: 16px; }
      .no-print { display: none !important; }
      .invoice-seal { text-align: center; margin-top: 32px; font-size: 12px; color: #999; }
    `,afterPrint:()=>{console.log(`发票打印完成`)}})}let q=[{name:`target`,type:`string | HTMLElement | null`,default:`-`,description:`要打印的元素，支持 CSS 选择器或 DOM 元素`},{name:`css`,type:`string`,default:`-`,description:`注入打印文档的自定义 CSS 字符串`},{name:`stylesheets`,type:`string[]`,default:`[]`,description:`额外引入的外部样式表 URL 列表`},{name:`title`,type:`string`,default:`document.title`,description:`打印文档的标题`},{name:`beforePrint`,type:`() => void | Promise<void>`,default:`-`,description:`打印前回调函数`},{name:`afterPrint`,type:`() => void | Promise<void>`,default:`-`,description:`打印后回调函数`},{name:`autoCleanup`,type:`boolean`,default:`true`,description:`打印完成后是否自动清理 iframe`}],J=[{name:`printing`,type:`Ref<boolean>`,description:`是否正在打印中（可用于 loading 状态）`},{name:`print(options?)`,type:`(options?: PrintOptions) => Promise<void>`,description:`打印指定 DOM 元素，自动收集页面样式和 computed style`},{name:`printHTML(html, options?)`,type:`(html: string, options?: PrintOptions) => Promise<void>`,description:`直接打印 HTML 字符串，快速模式不收集 computed style`}];return(t,n)=>{let l=y,f=u,S=g,Y=_;return d(),r(`div`,C,[s(x,{class:`intro-card`,"border-radius":16},{default:i(()=>[...n[3]||=[a(`div`,{class:`intro-section`},[a(`h2`,{class:`intro-title`},`usePrint 打印 Hook`),a(`p`,{class:`intro-text`},` usePrint 是一个页面打印 Hook，通过隐藏 iframe 实现指定区域内容的打印输出。 支持选择器/DOM 元素指定打印目标、自定义打印 CSS、外部样式表引入、打印前后回调等能力， 打印过程不影响原页面布局。 `),a(`div`,{class:`intro-tips`},[a(`p`,null,[a(`strong`,null,`提示：`),c(`target 属性支持 CSS 选择器（如 `),a(`code`,{class:`code-inline`},`#print-area`),c(`）或直接传入 HTMLElement。 css 属性可注入 `),a(`code`,{class:`code-inline`},`@page`),c(` 规则控制纸张大小和边距。 使用 `),a(`code`,{class:`code-inline`},`.no-print`),c(` 类标记不需要打印的元素。 `)])]),a(`div`,{class:`intro-usage`},[a(`div`,{class:`usage-title`},`📦 独立使用`),a(`p`,null,[c(` usePrint 仅依赖 `),a(`code`,{class:`code-inline`},`vue`),c(` 和 `),a(`code`,{class:`code-inline`},`element-plus`),c(`（用于消息提示）。可直接在组件中引入使用。 导入路径：`),a(`code`,{class:`code-inline`},`import { usePrint } from '@/hooks/usePrint'`)])])],-1)]]),_:1}),s(x,{class:`preview-card`,"border-radius":16},{header:i(()=>[a(`div`,w,[n[5]||=a(`span`,{class:`header-title`},`效果预览`,-1),s(l,{type:`primary`,icon:o(p),loading:o(b),onClick:K},{default:i(()=>[...n[4]||=[c(` 打印发票 `,-1)]]),_:1},8,[`icon`,`loading`])])]),default:i(()=>[a(`div`,{ref_key:`printAreaRef`,ref:z,class:`invoice-area`},[a(`div`,T,[n[6]||=a(`div`,{class:`invoice-title`},`电子发票`,-1),a(`div`,E,`发票号码: INV-2026-`+h(String(B.value).padStart(6,`0`)),1),a(`div`,D,`开票日期: `+h(H.value),1)]),a(`div`,O,[n[8]||=a(`div`,{class:`party-row`},[a(`span`,{class:`party-label`},`收款方：`),a(`span`,{class:`party-value`},`某某科技有限公司`)],-1),a(`div`,k,[n[7]||=a(`span`,{class:`party-label`},`付款方：`,-1),a(`span`,A,h(V.value),1)])]),a(`table`,j,[n[9]||=a(`thead`,null,[a(`tr`,null,[a(`th`,null,`序号`),a(`th`,null,`服务项目`),a(`th`,null,`数量`),a(`th`,null,`单价`),a(`th`,null,`金额`)])],-1),a(`tbody`,null,[(d(!0),r(e,null,m(U.value,(e,t)=>(d(),r(`tr`,{key:t},[a(`td`,null,h(t+1),1),a(`td`,null,h(e.name),1),a(`td`,null,h(e.qty),1),a(`td`,null,`¥`+h(e.price.toFixed(2)),1),a(`td`,null,`¥`+h((e.qty*e.price).toFixed(2)),1)]))),128))]),a(`tfoot`,null,[a(`tr`,null,[a(`td`,M,`合计金额（大写）：`+h(G.value),1),a(`td`,N,`¥`+h(W.value.toFixed(2)),1)])])]),a(`div`,P,[s(l,{size:`small`,onClick:K,loading:o(b)},{default:i(()=>[s(f,null,{default:i(()=>[s(o(p))]),_:1}),n[10]||=c(` 打印此发票 `,-1)]),_:1},8,[`loading`]),s(l,{size:`small`,type:`primary`,onClick:n[0]||=e=>B.value++},{default:i(()=>[...n[11]||=[c(`更换发票号`,-1)]]),_:1})]),n[12]||=a(`div`,{class:`invoice-seal`},` ※ 本发票为模拟数据，仅用于演示打印功能 `,-1)],512)]),_:1}),s(x,{class:`usage-card`,"border-radius":16},{header:i(()=>[...n[13]||=[a(`div`,{class:`card-header`},[a(`span`,{class:`header-title`},`基础用法`)],-1)]]),default:i(()=>[n[14]||=a(`div`,{class:`usage-section`},[a(`h3`,{class:`usage-subtitle`},`1. 基础打印`),a(`pre`,{class:`code-block`},[a(`code`,null,`<template>
  <div ref="printRef" id="my-content">
    <h2>打印内容</h2>
    <p>这段内容会被打印</p>
  </div>
  <el-button @click="handlePrint">打印</el-button>
</template>

<script setup lang="ts">
import { usePrint } from '@/hooks/usePrint'

const { print, printing } = usePrint()

function handlePrint() {
  print({
    target: '#my-content',
    title: '打印文档标题',
  })
}
<\/script>`)]),a(`h3`,{class:`usage-subtitle`},`2. 自定义打印样式`),a(`pre`,{class:`code-block`},[a(`code`,null,`print({
  target: '#invoice',
  title: '电子发票',
  css: \`
    @page { size: A4; margin: 15mm; }
    body { font-family: 'Microsoft YaHei', sans-serif; }
    .no-print { display: none !important; }
    table { width: 100%; border-collapse: collapse; }
    td, th { border: 1px solid #333; padding: 8px; text-align: center; }
  \`,
})`)]),a(`h3`,{class:`usage-subtitle`},`3. 打印前后回调`),a(`pre`,{class:`code-block`},[a(`code`,null,`print({
  target: '#report',
  beforePrint: () => {
    console.log('开始打印...')
    // 可以在此修改打印数据
  },
  afterPrint: () => {
    console.log('打印完成')
    ElMessage.success('打印完成')
  },
})`)]),a(`h3`,{class:`usage-subtitle`},`4. 使用 printHTML 直接打印 HTML 字符串`),a(`pre`,{class:`code-block`},[a(`code`,null,`const { printHTML } = usePrint()

printHTML(
  '<h1>报告标题</h1><table><tr><td>数据</td></tr></table>',
  {
    title: '数据报告',
    css: 'h1 { text-align: center; } table { width: 100%; }',
  }
)`)])],-1)]),_:1}),s(x,{class:`props-card`,"border-radius":16},{header:i(()=>[...n[15]||=[a(`div`,{class:`card-header`},[a(`span`,{class:`header-title`},`PrintOptions 参数`)],-1)]]),default:i(()=>[s(Y,{class:`api-table`,size:`small`,data:q,"header-cell-style":{background:`var(--el-fill-color-lighter)`}},{default:i(()=>[s(S,{prop:`name`,label:`参数`,width:`160`}),s(S,{prop:`type`,label:`类型`,width:`280`}),s(S,{prop:`default`,label:`默认值`,width:`100`}),s(S,{prop:`description`,label:`说明`})]),_:1})]),_:1}),s(x,{class:`events-card`,"border-radius":16},{header:i(()=>[...n[16]||=[a(`div`,{class:`card-header`},[a(`span`,{class:`header-title`},`返回值`)],-1)]]),default:i(()=>[s(Y,{class:`api-table`,size:`small`,data:J,"header-cell-style":{background:`var(--el-fill-color-lighter)`}},{default:i(()=>[s(S,{prop:`name`,label:`属性/方法`,width:`160`}),s(S,{prop:`type`,label:`类型`,width:`200`}),s(S,{prop:`description`,label:`说明`})]),_:1})]),_:1}),s(x,{class:`app-preview-card`,"border-radius":16},{header:i(()=>[...n[17]||=[a(`div`,{class:`card-header`},[a(`span`,{class:`header-title`},`实际应用`)],-1)]]),default:i(()=>[a(`div`,F,[n[22]||=a(`div`,{class:`example-title`},`简易收据`,-1),a(`div`,I,[n[19]||=a(`div`,null,[a(`p`,{style:{margin:`0 0 4px`,"font-weight":`600`}},`收款收据`),a(`p`,{style:{margin:`0`,"font-size":`13px`,color:`var(--el-text-color-secondary)`}},`收到货款 ¥1,280.00`)],-1),s(l,{size:`small`,icon:o(p),onClick:n[1]||=e=>{o(v)(`<div style="text-align:center;padding:40px;"><h1 style="font-size:24px;margin-bottom:20px;">收款收据</h1><p>收款日期：2026-07-31</p><p>收款金额：¥1,280.00</p><p>付款人：客户A</p></div>`,{title:`收款收据`})}},{default:i(()=>[...n[18]||=[c(`打印收据`,-1)]]),_:1},8,[`icon`])]),n[23]||=a(`div`,{class:`example-title`},`数据报表`,-1),a(`div`,L,[n[21]||=a(`div`,null,[a(`p`,{style:{margin:`0 0 4px`,"font-weight":`600`}},`月度销售报表`),a(`p`,{style:{margin:`0`,"font-size":`13px`,color:`var(--el-text-color-secondary)`}},`2026年7月 · 共3条记录`)],-1),s(l,{size:`small`,icon:o(p),onClick:n[2]||=e=>o(v)(R,{title:`月度销售报表`})},{default:i(()=>[...n[20]||=[c(` 打印报表 `,-1)]]),_:1},8,[`icon`])])])]),_:1})])}}}),[[`__scopeId`,`data-v-a9edc6cd`]]);export{z as default};