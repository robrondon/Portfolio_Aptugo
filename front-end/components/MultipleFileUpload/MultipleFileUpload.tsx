import CloseIcon from '@mui/icons-material/Close'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import React, { FunctionComponent } from 'react'
import { useDropzone } from 'react-dropzone'

const MultipleFileUpload: FunctionComponent<any> = (props) => {
  const [files, setFiles] = React.useState(props.files || [])
  const [highlight, sethighlight] = React.useState(null)
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const newFile = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
      files.push(...newFile)
      setFiles([...files])
    },
  })

  const removeImage = (file, e: Event) => {
    e.stopPropagation()
    const newFiles = files.filter((fl) => fl !== file)
    setFiles([...newFiles])
    return false
  }

  const thumbs = files.map((file) => (
    <div
      className="thumbnail"
      key={file.name}
      onClick={() => {
        sethighlight(file)
      }}
    >
      <DeleteForeverIcon
        className="deleteIcon"
        onClick={(e) => {
          removeImage(file, e)
        }}
      />
      <div className="thumbnailImageContainer">
        <img className="thumbnailImage" src={file.preview} />
      </div>
    </div>
  ))

  React.useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview))
    if (props.onChange) props.onChange(files)
  }, [files])

  return (
    <section className={props.className}>
      {highlight && (
        <div
          className="imageLightboxEncloser"
          onClick={() => {
            sethighlight(null)
          }}
        >
          <div className="imageLightbox">
            <img className="imageHighlight" src={URL.createObjectURL(highlight)} />
            <CloseIcon />
          </div>
        </div>
      )}
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>{props.innerText ? props.innerText : "Drag 'n' drop some files here, or click to select files"}</p>
      </div>
      <aside className="thumbsContainer">{thumbs}</aside>
    </section>
  )
}

export default MultipleFileUpload
