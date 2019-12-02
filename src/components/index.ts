import { localCache } from '@/cache'
import Vue, { VueConstructor } from 'vue'
import { ElMessageComponent } from 'element-ui/types/message'
/* 样式初始化和通用样式 start */
import 'styles/normalize.scss'
import 'styles/common.scss'
/* 样式初始化和通用样式 end */

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
  Tabs,
  TabPane,
  Switch
} from 'element-ui'

import { Message, Loading, Notification } from 'element-ui'
/* element组件 end */

/* 自定义组件 start */
import 'styles/components/index.scss' // 自定义组件的样式
import VTable from './Table/index.vue' // 表格组件
// import VIcon from './Icon'    // 图标
// import VButton from './Button' // 按钮
// import ConfirmPopover from './ConfirmPopover' // 确认气泡
// import Page from './Page' // 页面
// import VDialog from './Dialog' // 弹框
// import ColorPicker from './ColorPicker' // 拾色器
// import Language from './Language' // 国际化
// import FullScreenSwitch from './FullScreenSwitch' // 全屏切换器
// import VSelect from './Select' // 选择器
// import NumberFormatter from './NumberFormatter' // 数字格式化
// import Calendar from './Calendar'
/* 自定义组件 end */

/* element组件 start */
let components: any[] | null = [
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
  Tabs,
  TabPane,
  Switch
]
/* element组件 end */

/* 自定义组件 start */
let customComponents: any[] | null = [ 
  VTable, 
  // VIcon, 
  // VButton, 
  // ConfirmPopover, 
  // Page, 
  // VDialog,
  // ColorPicker,
  // Language,
  // FullScreenSwitch,
  // VSelect,
  // NumberFormatter,
  // Calendar
]
/* 自定义组件 end */

declare module 'vue/types/vue' {
  interface Vue {
    $msg: {
      (text: string): ElMessageComponent;
      (options: {
        message: string;
        type: 'success' | 'error' | 'warning' | 'info'
        onClose: () => void;
      }): ElMessageComponent;
      /**
       * 成功提示框
       */
      success(text: string): ElMessageComponent;
      success(options: {
        message: string;
        onClose: () => void;
      }): ElMessageComponent;

      /**
       * 警告提示框
       */
      warning(text: string): ElMessageComponent;
      warning(options: {
        message: string;
        onClose: () => void;
      }): ElMessageComponent;

      /**
       * 错误提示框
       */
      error(text: string): ElMessageComponent;
      error(options: {
        message: string;
        onClose: () => void;
      }): ElMessageComponent;

      /**
       * 信息提示框
       */
      info(text: string): ElMessageComponent;
      info(options: {
        message: string;
        onClose: () => void;
      }): ElMessageComponent;
    }
  }
}

declare module 'element-ui/types/element-ui' {
  export class Scrollbar extends Vue {}
}


export default function (Vue: VueConstructor) {
  // element-ui组件
  Vue.prototype.$ELEMENT = { size: (localCache.get('system-config') || {}).size || 'mini' }
  components instanceof Array && components.forEach(component => Vue.component(component.name, component))
  Vue.prototype.$msg = Message
  Vue.prototype.$notify = Notification
  Vue.use(Loading.directive)
  
  // 自定义组件
  customComponents instanceof Array && customComponents.forEach(component => {
    Vue.component(component.name, component)
  })

  // 置空
  components = null
  customComponents = null
}

