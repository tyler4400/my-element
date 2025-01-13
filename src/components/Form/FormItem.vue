<template>
  <div
    class="vk-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired
    }"
  >
    <label class="vk-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="vk-form-item__content">
      <slot :validate="validate" />
      <div v-if="validateStatus.state === 'error'" class="vk-form-item__error-msg">
        {{ validateStatus.errorMsg }}
      </div>
    </div>
    <!-- {{ innerValue }} - {{ itemRules }} -->
  </div>
</template>
<script setup lang="ts">
import { inject, computed, reactive, provide, onMounted, onUnmounted } from 'vue'
import { isNil } from 'lodash-es'
import Schema from 'async-validator'
import type {
  FormItemProps,
  FormValidateFailure,
  FormItemContext,
  ValidateStatusProp,
  FormItemInstance
} from './types'
import { formContextKey, formItemContextKey } from './types'
defineOptions({
  name: 'VKFormItem'
})
const props = defineProps<FormItemProps>()

const formContext = inject(formContextKey)

const validateStatus: ValidateStatusProp = reactive({
  state: 'init',
  errorMsg: '',
  loading: false
})

let initialValue: any = null
// 拿到表单对应的值
const innerValue = computed(() => {
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  } else {
    return null
  }
})

// 拿到表单对应的校验规则
const itemRules = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop]
  } else {
    return []
  }
})

const clearValidate = () => {
  validateStatus.state = 'init'
  validateStatus.errorMsg = ''
  validateStatus.loading = false
}

const resetField = () => {
  clearValidate()
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue
  }
}

const getTriggeredRules = (trigger?: string) => {
  const rules = itemRules.value
  if (rules) {
    return rules.filter((rule) => {
      if (!trigger || !rule.trigger) return true
      return rule.trigger && rule.trigger === trigger
    })
  } else {
    return []
  }
}
const isRequired = computed(() => {
  return itemRules.value.some((rule) => rule.required)
})
const validate = async (trigger?: string) => {
  const modelName = props.prop
  const triggeredRules = getTriggeredRules(trigger)
  if (!triggeredRules.length) return true
  if (modelName) {
    const validator = new Schema({
      [modelName]: triggeredRules
    })
    validateStatus.loading = true
    return validator
      .validate({ [modelName]: innerValue.value })
      .then(() => {
        validateStatus.state = 'success'
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e
        validateStatus.state = 'error'
        // validateStatus.errorMsg = errors && errors.length ? errors[0].message || '' : ''
        validateStatus.errorMsg = errors?.[0]?.message || ''
        console.log(e.errors)
        return Promise.reject(e)
      })
      .finally(() => {
        validateStatus.loading = false
      })
  }
}
const context: FormItemContext = {
  validate,
  prop: props.prop || '',
  clearValidate,
  resetField
}
provide(formItemContextKey, context)
onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    initialValue = innerValue.value
  }
})
onUnmounted(() => {
  formContext?.removeField(context)
})

defineExpose<FormItemInstance>({
  validateStatus,
  validate,
  resetField,
  clearValidate
})
</script>
