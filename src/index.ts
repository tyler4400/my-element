import type { App } from 'vue'

import Button from '@/components/Button'
import Collapse, { CollapseItem } from '@/components/Collapse'
import Dropdown from '@/components/Dropdown'
import Form, { FormItem } from '@/components/Form'
import Icon from '@/components/Icon'
import Message, { createMessage, destroyAll } from '@/components/Message'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Switch from '@/components/Switch'
import Tooltip from '@/components/Tooltip'
import Upload, { UploadList } from '@/components/Upload'
import DropZone from '@/components/DropZone'
import ProgressPlugin, { Progress } from '@/components/Progress'

const components = [
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Form,
  FormItem,
  Icon,
  Message,
  Input,
  Select,
  Switch,
  Tooltip,
  Upload,
  UploadList,
  DropZone,
  ProgressPlugin,
]

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name as string, component)
  })
}

export {
  install,
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Form,
  FormItem,
  Icon,
  Message,
  Input,
  Select,
  Switch,
  Tooltip,
  Upload,
  UploadList,
  DropZone,
  Progress,
  createMessage,
  destroyAll
}

export default {
  install
}
