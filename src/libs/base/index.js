import bread from './bread-crumb/bread-crumb'
import card from './card/card'
import dialog from './dialog/dialog'
import editor from './editor/editor'
import fileUploader from './file-uploader/file-uploader'
import form from './form/form'
import progressBar from './progress-bar/progress-bar'
import search from './search/search'
import table from './table/table'

const chocComponents = [
  bread,
  card,
  dialog,
  editor,
  fileUploader,
  form,
  progressBar,
  search,
  table
]

const chocComponent = {
  install: (Vue) => {
    chocComponents.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}

export default chocComponent


