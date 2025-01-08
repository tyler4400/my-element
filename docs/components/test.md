---
hello: world
---

## 这里是测试

```ts
import { ref } from 'vue';

const count = ref(0)
```
<script setup>
import { ref } from 'vue';
import Button from '../../src/components/Button/Button.vue';

const count = ref(0)
</script>

<preview path="../demo/Button/Basic.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## Markdown Content

The count is: {{ count }}

<Button type="primary" @click="count++">Increment</Button>
<Button type="info" @click="count++" loading>Increment</Button>

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>
