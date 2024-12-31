import type { InjectionKey, Ref } from 'vue'

/**
 * $END$
 * @author tylerzzheng
 */
export type NameType = string | number

export interface CollapseProps {
	modelValue: NameType[];
	accordion?: boolean;
}

export interface CollapseItemProps {
	name: NameType;
	title?: string;
	disabled?: boolean;
}

export interface CollapseContext {
	activeNames: Ref<NameType[]>;
	handleItemClick: (itemName: NameType) => void;
}

export const CollapseContextKey: InjectionKey<CollapseContext> = Symbol('CollapseContextKey')
