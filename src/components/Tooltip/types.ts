import type { Placement } from '@floating-ui/vue'
export interface TooltipProps {
  content? : string;
  trigger?: 'hover' | 'click';
  placement?: Placement;
  // manual?: boolean; // 不同于视频里，这里不加， 只接通过trigger参数为空即可
  // popperOptions?: Partial<Options>;
  transition?: string;
  openDelay?: number; // todo 暂时不加
  closeDelay?: number; // todo 暂时不加
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean) : void;
  (e: 'click-outside', value: boolean) : void;
}

export interface TooltipInstance {
  show: () => void;
  hide: () => void;
}
