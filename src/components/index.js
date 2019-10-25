// 为element按需引入的组件
import {
  Button,
  Table,
  TableColumn,
  Pagination,
  Scrollbar,
  Form,
  FormItem,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Popover,
  Dialog,
  Select,
  Option,
  Switch,
  transfer
} from 'element-ui'

import { Message } from 'element-ui'

// 自定义组件
import VTable from './Table'
import VIcon from './Icon'
import VButton from './Button'
import ConfirmPopover from './ConfirmPopover'
import Page from './Page'
import VDialog from './Dialog'

const components = [
  Button,
  Table,
  TableColumn,
  Pagination,
  Scrollbar,
  Form,
  FormItem,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Popover,
  Dialog,
  Select,
  Option,
  Switch,
  transfer
]

const customComponents = [VTable, VIcon, VButton, ConfirmPopover, Page, VDialog]

export default function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  customComponents.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$msg = Message
}
