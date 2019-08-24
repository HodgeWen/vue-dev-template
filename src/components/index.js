import {
  Button, Table, Input, Form,
  Select, Option, Upload
} from 'iview'

const components = {
  'i-button': Button, 'i-table': Table, 'i-input': Input, 'i-form': Form,
  'i-select': Select, 'i-option': Option, Upload
}

export default function (Vue) {
  for (const key in components) {
    Vue.component(key, components[key])
  }
}