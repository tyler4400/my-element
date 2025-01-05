import type { TooltipProps } from '@/components/Tooltip/types.ts'
import type { VNode } from 'vue'

export interface DropdownProps extends TooltipProps{
	menuOptions: MenuOption[]
	hideAfterClick?: boolean;
}

export interface MenuOption {
	label: string | VNode
	key: string | number
	disabled?: boolean
	divided?: boolean
}

export interface DropdownEmits {
	(e:'visible-change', value: boolean) : void;
	(e:'select', value: MenuOption) : void;
}

export interface DropdownInstance {
	show: () => void;
	hide: () => void;
}
