import 'jodit'
import JoditEditor from 'jodit-react'
import React from 'react'

export default function JoditSetup(props) {
  let { darkMode = false, readOnly = false, initialValue = '', updateFiles, updateState, overrides } = props

  let config = {
    enableDragAndDropFileToEditor: false,
    readonly: readOnly,
    iframe: false,
    theme: darkMode ? 'dark' : undefined,
    showPlaceholder: false,
    image: { openOnDblClick: false },
    toolbarButtonSize: 'small',
    minWidth: '100%',
    tabIndex: 0,
    allowResizeY: false,
    beautify: false,
    beautifyHTMLCDNUrlsJS: [],
    sourceEditorCDNUrls: [],
    showCharsCounter: !readOnly,
    showWordsCounter: !readOnly,
    showXPathInStatusbar: !readOnly,
    controls: {
      attachFile: {
        exec: attachFiles,
        icon: 'upload',
        tooltip: 'Attach Files',
      },
    },
    events: { paste: onPaste, drop: onDrop },
    ...overrides,
  }

  function executeToggle(e) {
    e.toggleFullSize()
  }

  function onPaste(e) {
    let pastedItems = (e.clipboardData || e.originalEvent.clipboardData).items
    for (let index in pastedItems) {
      if (pastedItems[index].kind === 'file' && pastedItems.length < 4) new FileReader().readAsDataURL(pastedItems[index].getAsFile())
    }
  }

  function onDrop(e) {
    e.preventDefault()
    if (updateFiles) updateFiles(Array.from(e.dataTransfer.files))
  }

  function attachFiles() {
    let input = document.createElement('input')
    input.type = 'file'
    let attribute = document.createAttribute('multiple')
    attribute.value = 'multiple'
    input.setAttributeNode(attribute)
    input.onchange = ({ target }) => updateFiles(Object.keys(target.files).map((key) => target.files[key]))
    input.click()
  }

  return <JoditEditor config={config} value={initialValue} onBlur={updateState} />
}
