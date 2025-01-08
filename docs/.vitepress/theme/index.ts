import DefaultTheme from 'vitepress/theme' // 默认主题
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import '../../../src/styles/index.css'

import { ElementPlusContainer, AntDesignContainer, NaiveUIContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

library.add(fas)

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
  	app.component('DemoPreview', ElementPlusContainer)
  	// app.component('DemoPreview', AntDesignContainer)
  	// app.component('DemoPreview', NaiveUIContainer)
  }
}
