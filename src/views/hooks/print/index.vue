<template>
  <div class="print-page">
    <!-- 1. intro-card -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h2 class="intro-title">usePrint 打印 Hook</h2>
        <p class="intro-text">
          usePrint 是一个页面打印 Hook，通过隐藏 iframe 实现指定区域内容的打印输出。
          支持选择器/DOM 元素指定打印目标、自定义打印 CSS、外部样式表引入、打印前后回调等能力，
          打印过程不影响原页面布局。
        </p>
        <div class="intro-tips">
          <p>
            <strong>提示：</strong>target 属性支持 CSS 选择器（如 <code class="code-inline">#print-area</code>）或直接传入 HTMLElement。
            css 属性可注入 <code class="code-inline">@page</code> 规则控制纸张大小和边距。
            使用 <code class="code-inline">.no-print</code> 类标记不需要打印的元素。
          </p>
        </div>
        <div class="intro-usage">
          <div class="usage-title">📦 独立使用</div>
          <p>
            usePrint 仅依赖 <code class="code-inline">vue</code> 和
            <code class="code-inline">element-plus</code>（用于消息提示）。可直接在组件中引入使用。
            导入路径：<code class="code-inline">import { usePrint } from '@/hooks/usePrint'</code>
          </p>
        </div>
      </div>
    </Card>

    <!-- 2. preview-card -->
    <Card class="preview-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">效果预览</span>
          <el-button type="primary" :icon="Printer" :loading="printing" @click="handlePrint">
            打印发票
          </el-button>
        </div>
      </template>

      <!-- 打印目标区域 -->
      <div ref="printAreaRef" class="invoice-area">
        <div class="invoice-header">
          <div class="invoice-title">电子发票</div>
          <div class="invoice-no">发票号码: INV-2026-{{ String(invoiceNo).padStart(6, '0') }}</div>
          <div class="invoice-date">开票日期: {{ invoiceDate }}</div>
        </div>

        <div class="invoice-parties">
          <div class="party-row">
            <span class="party-label">收款方：</span>
            <span class="party-value">某某科技有限公司</span>
          </div>
          <div class="party-row">
            <span class="party-label">付款方：</span>
            <span class="party-value">{{ payer }}</span>
          </div>
        </div>

        <table class="invoice-table">
          <thead>
            <tr>
              <th>序号</th>
              <th>服务项目</th>
              <th>数量</th>
              <th>单价</th>
              <th>金额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in invoiceItems" :key="idx">
              <td>{{ idx + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.qty }}</td>
              <td>¥{{ item.price.toFixed(2) }}</td>
              <td>¥{{ (item.qty * item.price).toFixed(2) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="total-label">合计金额（大写）：{{ totalAmountInWords }}</td>
              <td class="total-amount">¥{{ totalAmount.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>

        <div class="invoice-footer no-print">
          <el-button size="small" @click="handlePrint" :loading="printing">
            <el-icon><Printer /></el-icon>
            打印此发票
          </el-button>
          <el-button size="small" type="primary" @click="invoiceNo++">更换发票号</el-button>
        </div>

        <div class="invoice-seal">
          ※ 本发票为模拟数据，仅用于演示打印功能
        </div>
      </div>
    </Card>

    <!-- 3. usage-card -->
    <Card class="usage-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">基础用法</span>
        </div>
      </template>

      <div class="usage-section">
        <h3 class="usage-subtitle">1. 基础打印</h3>
        <pre class="code-block"><code>&lt;template&gt;
  &lt;div ref="printRef" id="my-content"&gt;
    &lt;h2&gt;打印内容&lt;/h2&gt;
    &lt;p&gt;这段内容会被打印&lt;/p&gt;
  &lt;/div&gt;
  &lt;el-button @click="handlePrint"&gt;打印&lt;/el-button&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { usePrint } from '@/hooks/usePrint'

const { print, printing } = usePrint()

function handlePrint() {
  print({
    target: '#my-content',
    title: '打印文档标题',
  })
}
&lt;/script&gt;</code></pre>

        <h3 class="usage-subtitle">2. 自定义打印样式</h3>
        <pre class="code-block"><code>print({
  target: '#invoice',
  title: '电子发票',
  css: `
    @page { size: A4; margin: 15mm; }
    body { font-family: 'Microsoft YaHei', sans-serif; }
    .no-print { display: none !important; }
    table { width: 100%; border-collapse: collapse; }
    td, th { border: 1px solid #333; padding: 8px; text-align: center; }
  `,
})</code></pre>

        <h3 class="usage-subtitle">3. 打印前后回调</h3>
        <pre class="code-block"><code>print({
  target: '#report',
  beforePrint: () => {
    console.log('开始打印...')
    // 可以在此修改打印数据
  },
  afterPrint: () => {
    console.log('打印完成')
    ElMessage.success('打印完成')
  },
})</code></pre>

        <h3 class="usage-subtitle">4. 使用 printHTML 直接打印 HTML 字符串</h3>
        <pre class="code-block"><code>const { printHTML } = usePrint()

printHTML(
  '&lt;h1&gt;报告标题&lt;/h1&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;数据&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;',
  {
    title: '数据报告',
    css: 'h1 { text-align: center; } table { width: 100%; }',
  }
)</code></pre>
      </div>
    </Card>

    <!-- 4. props-card -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">PrintOptions 参数</span>
        </div>
      </template>

      <el-table
        class="api-table"
        size="small"
        :data="propsData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="参数" width="160" />
        <el-table-column prop="type" label="类型" width="280" />
        <el-table-column prop="default" label="默认值" width="100" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 5. events-card -->
    <Card class="events-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">返回值</span>
        </div>
      </template>

      <el-table
        class="api-table"
        size="small"
        :data="returnData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="属性/方法" width="160" />
        <el-table-column prop="type" label="类型" width="200" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 6. app-preview-card -->
    <Card class="app-preview-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">实际应用</span>
        </div>
      </template>

      <div class="app-examples">
        <div class="example-title">简易收据</div>
        <div class="example-row" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <p style="margin: 0 0 4px; font-weight: 600;">收款收据</p>
            <p style="margin: 0; font-size: 13px; color: var(--el-text-color-secondary);">收到货款 ¥1,280.00</p>
          </div>
          <el-button size="small" :icon="Printer" @click="printHTML(
            '<div style=&quot;text-align:center;padding:40px;&quot;>' +
            '<h1 style=&quot;font-size:24px;margin-bottom:20px;&quot;>收款收据</h1>' +
            '<p>收款日期：2026-07-31</p>' +
            '<p>收款金额：¥1,280.00</p>' +
            '<p>付款人：客户A</p>' +
            '</div>',
            { title: '收款收据' }
          )">打印收据</el-button>
        </div>

        <div class="example-title">数据报表</div>
        <div class="example-row" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <p style="margin: 0 0 4px; font-weight: 600;">月度销售报表</p>
            <p style="margin: 0; font-size: 13px; color: var(--el-text-color-secondary);">2026年7月 · 共3条记录</p>
          </div>
          <el-button size="small" :icon="Printer" @click="printHTML(reportHTML, { title: '月度销售报表' })">
            打印报表
          </el-button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue"
import { ref, computed } from "vue"
import { Printer } from "@element-plus/icons-vue"
import { usePrint } from "@/hooks/usePrint"

const { print, printHTML, printing } = usePrint()

// ========== 发票演示数据 ==========
const printAreaRef = ref<HTMLElement>()
const invoiceNo = ref(20260731001)
const payer = ref("某某商贸有限公司")
const invoiceDate = ref("2026年07月31日")

const invoiceItems = ref([
  { name: "软件授权许可（年度）", qty: 1, price: 8800.0 },
  { name: "技术支持服务（月度）", qty: 3, price: 1200.0 },
  { name: "数据存储扩容 100GB", qty: 2, price: 500.0 },
])

const totalAmount = computed(() =>
  invoiceItems.value.reduce((sum, item) => sum + item.qty * item.price, 0)
)

// 简易大写金额转换
const totalAmountInWords = computed(() => {
  const num = totalAmount.value
  const digits = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]
  const units = ["", "拾", "佰", "仟", "万", "拾", "佰", "仟", "亿"]
  const intPart = Math.floor(num)
  const decPart = Math.round((num - intPart) * 100)

  let intStr = String(intPart)
  let result = ""
  for (let i = 0; i < intStr.length; i++) {
    const d = parseInt(intStr[i])
    const u = units[intStr.length - 1 - i]
    if (d === 0) {
      if (!result.endsWith("零")) result += "零"
    } else {
      result += digits[d] + u
    }
  }
  result = result.replace(/零+$/, "") || "零"
  result += "元"

  if (decPart === 0) {
    result += "整"
  } else {
    const jiao = Math.floor(decPart / 10)
    const fen = decPart % 10
    if (jiao > 0) result += digits[jiao] + "角"
    if (fen > 0) result += digits[fen] + "分"
  }

  return result
})

// ========== 打印 ==========
function handlePrint() {
  print({
    target: printAreaRef.value,
    title: `发票-${invoiceNo.value}`,
    css: `
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
    `,
    afterPrint: () => {
      console.log("发票打印完成")
    },
  })
}

// ========== 报表 HTML ==========
const reportHTML = `
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
`

// ========== API 数据 ==========
const propsData = [
  { name: "target", type: "string | HTMLElement | null", default: "-", description: "要打印的元素，支持 CSS 选择器或 DOM 元素" },
  { name: "css", type: "string", default: "-", description: "注入打印文档的自定义 CSS 字符串" },
  { name: "stylesheets", type: "string[]", default: "[]", description: "额外引入的外部样式表 URL 列表" },
  { name: "title", type: "string", default: "document.title", description: "打印文档的标题" },
  { name: "beforePrint", type: "() => void | Promise<void>", default: "-", description: "打印前回调函数" },
  { name: "afterPrint", type: "() => void | Promise<void>", default: "-", description: "打印后回调函数" },
  { name: "autoCleanup", type: "boolean", default: "true", description: "打印完成后是否自动清理 iframe" },
]

const returnData = [
  { name: "printing", type: "Ref<boolean>", description: "是否正在打印中（可用于 loading 状态）" },
  { name: "print(options?)", type: "(options?: PrintOptions) => Promise<void>", description: "打印指定 DOM 元素，自动收集页面样式和 computed style" },
  { name: "printHTML(html, options?)", type: "(html: string, options?: PrintOptions) => Promise<void>", description: "直接打印 HTML 字符串，快速模式不收集 computed style" },
]
</script>

<style scoped lang="scss">
// 通用样式来自全局 feature.scss，此处仅保留页面专属样式

// ========== 发票预览区 ==========
.invoice-area {
  padding: 32px;
  background: #fff;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
}

.invoice-header {
  text-align: center;
  margin-bottom: 24px;

  .invoice-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
  }

  .invoice-no,
  .invoice-date {
    font-size: 13px;
    color: #666;
    margin-bottom: 2px;
  }
}

.invoice-parties {
  margin-bottom: 16px;

  .party-row {
    margin-bottom: 6px;
    font-size: 14px;
    color: #333;

    .party-label {
      font-weight: bold;
      margin-right: 4px;
    }
  }
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;

  th,
  td {
    border: 1px solid #d0d0d0;
    padding: 8px 12px;
    text-align: center;
    font-size: 13px;
    color: #333;
  }

  th {
    background: #f5f5f5;
    font-weight: bold;
  }

  .total-label {
    text-align: right;
    padding-right: 16px;
    font-weight: 600;
  }

  .total-amount {
    font-weight: bold;
    font-size: 16px;
    color: var(--el-color-primary);
  }
}

.invoice-footer {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.invoice-seal {
  text-align: center;
  margin-top: 32px;
  font-size: 12px;
  color: #999;
}
</style>
