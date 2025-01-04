<script setup lang="ts">
import {
  // arrow,
  useFloating,
  computePosition,
  shift,
  flip,
  offset,
} from '@floating-ui/vue'
import { watch } from 'vue'
import { ref, nextTick } from 'vue'

const isShow = ref(false)
const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)

// 初始化，中间件middleware还可以设置箭头之类的，这里我没有配置
const { floatingStyles } = useFloating(reference, floating, {
  middleware: [],
})
console.log(
  '初始化',
  floatingStyles.value,
  floatingStyles.value.left,
  floatingStyles.value.top
)
const middleware = [shift(), flip(), offset(10)]

// 核心代码，调用FloatingUI的computePosition函数，自动调整floating元素的位置
const updatePosition = () => {
  computePosition(
      reference.value as HTMLElement,
      floating.value as HTMLElement,
      {
        middleware, // 按需引用的中间件
        placement: 'bottom', // 指定初始化浮动位置
      }
  ).then(({ x, y }) => {
    // computePosition根据传入参数计算目标元素和浮动元素位置，
    // 异步返回浮动元素坐标后可手动设置浮层位置
    Object.assign(floating?.value?.style || {}, {
      left: `${x}px`,
      top: `${y}px`,
    })
    console.log(
      '调整位置',
      floatingStyles.value,
      floatingStyles.value.left,
      floatingStyles.value.top
    )
  })
}

// 浮动元素显示时，启动resize和scroll的监听，否则清除监听
watch(
  () => isShow.value,
  () => {
    if (isShow.value) {
      nextTick(() => {
        updatePosition()
        // 这里注意应该还要做一下debounce的处理
        window.onresize = function () {
          updatePosition()
        }
        window.onscroll = function () {
          updatePosition()
        }
      })
    } else {
      window.onresize = null
      window.onscroll = null
    }
  }
)
</script>

<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      height: 100%;
    "
  >
    <div style="height: 100%; width: 100%; text-align: center">
      <div style="height: 1000px" />
      <span ref="reference">
        <el-button @click="isShow = !isShow">trigger</el-button>
      </span>
      <div
        v-if="isShow"
        ref="floating"
        :style="{ left: floatingStyles.left, top: floatingStyles.top }"
        style="background: pink; width: 50px; height: 150px; position: absolute"
      >
        Floating
      </div>
      <div style="height: 1000px" />
    </div>
  </div>

<!--  作者：summerrr-->
<!--  链接：https://juejin.cn/post/7346193407255691302-->
<!--  来源：稀土掘金-->
<!--  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。-->
</template>

<style scoped>

</style>
