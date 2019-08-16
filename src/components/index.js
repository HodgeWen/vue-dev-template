import {
  Button, Table, Input, Form,
  Select, Option
} from 'iview'

const components = {
  'i-button': Button, 'i-col': Table, 'i-input': Input, 'i-form': Form,
  'i-select': Select, 'i-option': Option
}

export default function (Vue) {
  for (const key in components) {
    Vue.component(key, components[key])
  }
}