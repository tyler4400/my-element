export type ButtonType = 'primary'| 'success'| 'warning'| 'danger'| 'info'
export type ButtonSize = 'large' | 'small'
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
	type?: ButtonType;
	size?: ButtonSize;
	plain?: boolean;
	round?: boolean;
	circle?: boolean;
	disabled?: boolean;
	nativeType?: NativeType;
	autofocus?: boolean;
	icon?: string; // todo 等Icon组件完成之后再回来做
	loading?: boolean;
}

export interface ButtonInstance {
	ref: HTMLButtonElement
}
