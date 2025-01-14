import type { FunctionalComponent } from 'vue'

export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  // styles?: React.CSSProperties;
  type?: 'primary'| 'success'| 'warning'| 'danger'| 'info'
}

// 匿名函数式组件
const Progress: FunctionalComponent<ProgressProps> = (props: ProgressProps) => {

  const { percent, strokeHeight = 15, showText = true, type = 'primary' } = props
  return (
    <div class="vk-progress-bar">
      <div class="vk-progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
        <div class={`vk-progress-bar-inner vk-color-${type}`} style={{width: `${percent}%`}}>
          {showText && <span class="vk-inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

export default Progress
