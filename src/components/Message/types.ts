import type { VNode, ComponentInternalInstance } from 'vue'
export interface MessageProps {
  message: string | VNode;
  duration?: number;
  showClose?: boolean;
  type?: 'success'| 'info'| 'warning'| 'danger';
  destroy: () => void;
  // id: string;
  zIndex: number;
  offset?: number; // createMessage 会动态传递此项
  transitionName?: string;
  disableEsc?: boolean; // 不使用键盘esc按键来关闭message， 默认false
  onClickClose?: () => void;
}
export interface MessageContext {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  // props: MessageProps;
  destroy: () => void;
}
export type CreateMessageProps = Omit<MessageProps, 'destroy' | 'id' | 'zIndex' | 'onClickClose'>