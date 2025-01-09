export interface InputProps {
	type?: string
	modalValue: string
	size?: 'large' | 'small'
	disabled?: boolean
	clearable?: boolean
	showPassword?: boolean
	placeholder?: string
	readOnly?: boolean
	autocomplete?: string
	autoFocus?: boolean
	form?: string
}

export interface InputEmits {
	(e: 'update:ModalValue', value: string): void
	// input 的 input事件指的是值有变化就算
	(e: 'input', value: string): void
	// input 的 change事件指的是修改了值，并且失去了 focus
	(e: 'change', value: string): void
	(e: 'focus', value: FocusEvent): void
	(e: 'blur', value: FocusEvent): void;
	(e: 'clear'): void;
}

export interface InputInstance {
	ref: HTMLInputElement | HTMLTextAreaElement
}

export interface InputSlots {
	prepend: () => void
	prefix: () => void
	suffix: () => void
	append: () => void
}
