import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      'node_modules',
      '.gitignore',
      'package.json',
      'package-lock.json',
      '*.local',
      '.npmrc',
      '.DS_Store',
      'dev-dist',
      'dist_electron',
      '*.d.ts',
      'src/assets/**',
    ],
  },

  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  {
    rules: {
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      indent: ['error', 2], // 缩进使用 2 个空格
      'linebreak-style': ['error', 'unix'], // 使用 Unix 风格的换行符
      quotes: ['error', 'single'], // 使用单引号
      semi: ['error', 'never'], // 语句末尾不加分号
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境中警告 console 使用，开发环境中关闭规则
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境中警告 debugger 使用，开发环境中关闭规则
      'key-spacing': [ // 对象键值对之间的空格
        2,
        {
          beforeColon: false,
          afterColon: true
        }
      ],
      // 关键字之间的空格
      'keyword-spacing': [
        2,
        {
          before: true,
          after: true
        }
      ],

      // 构造函数首字母大写
      'new-cap': [
        2,
        {
          newIsCap: true,
          capIsNew: false
        }
      ],
    },
  },
]
