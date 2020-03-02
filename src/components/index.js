import { localCache } from '@/cache'
/* 样式初始化 start */
import 'styles/normalize.scss'
/* 样式初始化 end */

/* element组件 start */
import {
  Button,
  ButtonGroup,
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
  Tooltip,
  Switch,
  Upload,
  Tag,
  Checkbox,
  DatePicker,
  TimePicker,
  Radio,
  RadioGroup
} from 'element-ui'

import { Message, Loading, Notification } from 'element-ui'

/* 通用样式 start */
import 'styles/common.scss'
/* 通用样式 end */

let components = [
  Button,
  ButtonGroup,
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
  Tooltip,
  Switch,
  Upload,
  Tag,
  Checkbox,
  DatePicker,
  TimePicker,
  Radio,
  RadioGroup
]
/* element组件 end */

/* 自定义组件 start */
import 'styles/components/index.scss'                                  // 自定义组件的样式
import VTable from './Table'                                           // 表格组件
import VExpand from './Table/expand.vue'                               // 表格展开
import VExpandItem from './Table/expand-item.vue'                      // 表格展开项
import VIcon from './Icon'                                             // 图标
import VButton from './Button'                                         // 按钮
import ConfirmPopover from './ConfirmPopover'                          // 确认气泡
import Page from './Page'                                              // 页面
import VDialog from './Dialog'                                         // 弹框
import ColorPicker from './ColorPicker'                                // 拾色器
import Language from './Language'                                      // 国际化
import FullScreenSwitch from './FullScreenSwitch'                      // 全屏切换器
import VSelect from './Select'                                         // 选择器
import NumberFormatter from './NumberFormatter'                        // 数字格式化
import Calendar from './Calendar'                                      // 日历
import VUpload from './Upload'                                         // 上传
import ImageUpload from './ImageUpload'                                // 图片上传
import VInput from './Input'                                           // 输入框
let customComponents = [ 
  VTable, 
  VExpand,
  VExpandItem,
  VIcon, 
  VButton, 
  ConfirmPopover, 
  Page, 
  VDialog,
  ColorPicker,
  Language,
  FullScreenSwitch,
  VSelect,
  NumberFormatter,
  Calendar,
  VUpload,
  ImageUpload,
  VInput
]
/* 自定义组件 end */

export default function (Vue) {
  Vue.prototype.$ELEMENT = { size: (localCache.get('system-config') || {}).size || 'mini' }
  components.forEach(component => Vue.component(component.name, component))
  Vue.prototype.$msg = Message
  Vue.prototype.$notify = Notification
  Vue.use(Loading.directive)
  
  customComponents.forEach(component => {
    Vue.component(component.name, component)
  })

  components = null
  customComponents = null
}
