<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue'

interface ColumnData {
  row: {
    [key: string]: any;
  };

  index: number;
}

@Component
export default class Home extends Vue {
  private readonly columns = [
    { label: '标题一', prop: 'a' },
    { label: '标题二', prop: 'b' },
    { label: '标题三', prop: 'c' },
    { label: '标题四', prop: 'd' },
    // { label: '标题四', render: (h: CreateElement, { row }: ColumnData) => {
    //   return (<span v-if={row}>{ row.name }</span>)
    // } }
  ]

  private params = {
    name: ''
  }

  render() {
    return (
      1 ? <span>1</span> : <span>0</span>
    )
  }

}
</script>
