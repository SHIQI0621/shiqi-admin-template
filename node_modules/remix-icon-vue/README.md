# 图标

使用的图标来自于 [Remix Icon](https://remixicon.com/)。

由于图标较多，所以并不推荐使用全局引入的方式。图标名可参考 [Remix Icon](https://remixicon.com/)，只需引入时加上前缀 “`Remix`” 。

**按需引用（推荐）**

```vue
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import '../dist/style.css';

const app = createApp(App);
app.mount('#app');

// component.vue
<script setup lang="ts">
  import { RemixWechat } from '../dist/remix-icon';
</script>

<template>
  <div> 只是一个微信图标<remix-wechat />。 </div>
</template>
```

**全局引入（不推荐）**

```vue
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import '../dist/style.css';
import RemixIcon from '../dist';

const app = createApp(App);
app.use(RemixIcon);
app.mount('#app');
```



## 填充

给图标增加 `fill` 属性，会将图标从线性图标变成填充图标。

**注意：** 有些图标没有对应的填充图标，具体图标可通过 [Remix Icon](https://remixicon.com/) 查看。

```vue
<script setup lang="ts">
  import { RemixWechat } from '../package/remix-icon';
</script>

<template>
  <div> 只是一个微信图标<remix-wechat fill />。 </div>
</template>
```

## 尺寸

图标默认为当前的字号大小，但图标大小也可以通过 `size` 来另指定。

```vue
<script setup lang="ts">
  import { RemixWechat } from '../package/remix-icon';
</script>

<template>
  <div> 只是一个微信图标<remix-wechat size="24" />。 </div>
</template>
```

## 颜色

图标的颜色默认是随字体颜色，也可以通过 `color` 来指定。

```vue
<script setup lang="ts">
  import { RemixWechat } from '../package/remix-icon';
</script>

<template>
  <div> 只是一个微信图标<remix-wechat color="#2ba245" />。 </div>
</template>
```

## 旋转

可以给图标增加 `spin` 属性使图标旋转。

```vue
<script setup lang="ts">
  import { RemixLoader4 } from '../package/remix-icon';
</script>

<template>
  <div> 我还在加载中...<remix-loader-4 spin />。 </div>
</template>
```

# 属性

| 属性 | 可选值或类型 | 描述 | 默认 |
| --- | --- | --- | --- |
| fill | `boolean` | 填充图标 | `false` |
| size | `string`、`number` | 图标尺寸，如果不指定单位的话，默认为：`px` |  |
| color | `Color` | 图标颜色，值可参考[CSS Colors](https://www.w3schools.com/cssref/css_colors.asp)或[CSS Legal Color Values](https://www.w3schools.com/cssref/css_colors_legal.asp) |  |
| spin | `boolean` | 给图标添加旋转动画 | `false` |

