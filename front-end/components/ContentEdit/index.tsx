import axios from 'axios'
import ContentTools from 'ContentTools'
import 'ContentTools/build/content-tools.min.css'
import React, { FunctionComponent } from 'react'

const ContEditor: FunctionComponent = (props: any) => {
  const [state, setstate] = React.useState({ content: '' })

  const ImageUploader = (dialog) => {
    let imagePath = 'image.png'
    let imageSize = [600, 174]
    let _dialog
    let _uploadingTimeout
    let _onCancel = () => {}
    let _onUnmount = () => {}
    let _onFileReady = (file) => {
      _dialog.progress(0)
      _dialog.state('uploading')

      var formData = new FormData()
      formData.append('image', file)

      axios
        .post(`http://127.0.0.1:4567${props.uploadPath}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          imagePath = '/img/' + res.data.name
          imageSize = [res.data.width, res.data.height]
          _dialog.progress(100)
        })

      const upload = () => {
        let progress = _dialog.progress()
        progress += 1
        if (progress <= 100) {
          _dialog.progress(progress)
          return (_uploadingTimeout = setTimeout(upload, 25))
        } else {
          return _dialog.populate(imagePath, imageSize)
        }
      }
      return (_uploadingTimeout = setTimeout(upload, 25))
    }
    let _onSave = () => {
      _dialog.busy(true)
      setTimeout(() => {
        _dialog.busy(false)
        _dialog.save(imagePath, imageSize)
      }, 1500)
    }

    function ImageUploader(dialog) {
      _dialog = dialog
      _dialog.addEventListener('cancel', _onCancel())
      _dialog.addEventListener('imageuploader.fileready', (ev) => {
        _onFileReady(ev.detail().file)
      })
      _dialog.addEventListener('imageuploader.save', _onSave)
    }
    return new ImageUploader(dialog)
  }

  React.useEffect(() => {
    if (props.content) {
      if (props.content !== state.content) {
        const ct = ContentTools
        ct.IMAGE_UPLOADER = ImageUploader
        const editor = new ct.EditorApp.get()
        editor.init('*[data-editable]', 'data-name')
        editor.addEventListener('start', () => {})
        editor.addEventListener('saved', function (ev) {
          if (props.onSave) props.onSave(ev.detail().regions[0] || props.content)
        })
        setstate({ ...state, content: props.content })
      }
    }
  }, [props.content])

  return React.createElement('div', {
    key: 'my-region',
    dangerouslySetInnerHTML: { __html: '<div data-editable="my-region">' + state.content + '</div>' },
  })
}

export default ContEditor
