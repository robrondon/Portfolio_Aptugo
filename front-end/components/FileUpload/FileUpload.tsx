import PictureAsPdf from '@mui/icons-material/PictureAsPdf'
import PublishIcon from '@mui/icons-material/Publish'
import SearchIcon from '@mui/icons-material/Search'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import React, { FunctionComponent } from 'react'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    maxHeight: '48px',
    margin: '5px 5px 0 0',
  },
  media: {
    maxHeight: '48px',
  },
  input: {
    display: 'none',
  },
  button: {
    position: 'absolute',
    right: 0,
    top: '-8px',
  },
})

const altStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& label': {
      transform: 'none !important',
      position: 'absolute',
      left: '50px',
      top: '22px',
    },
  },
  image: {
    maxHeight: '48px',
    margin: '5px 4px 5px auto',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  media: {
    maxHeight: '48px',
  },
  input: {
    display: 'none',
  },
  altVisual: {
    background: '#f9f9f9',
    borderRadius: '5px',
    height: '56px',
    width: '100%',
    border: '1px solid rgb(196 196 196)',
    '&:after': {
      content: 'none',
    },
    '&:before': {
      content: 'none',
    },
    '& label': {
      left: '0px',
      top: '13px',
      '& p': {
        position: 'absolute',
        left: '50px',
        whiteSpace: 'nowrap',
        top: '6px',
        margin: '0',
        color: '#808080',
      },
    },
    '& input': {
      width: '1px',
      overflow: 'hidden',
      textIndent: '10px',
    },
  },
  button: {
    position: 'absolute',
    top: '-8px',
  },
})

const AptugoImageUpload: FunctionComponent<any> = (props) => {
  const classes = props.visual === 'standard' ? useStyles() : altStyles()

  const [state, setState] = React.useState({
    uploading: false,
    file: null,
    selectedFile: null,
    fileName: props.value,
    accept: props.accept || 'image/*',
    visual: props.visual || 'staandard',
  })

  const handleUploadClick = (event) => {
    event.persist()
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = function (e) {
      setState({
        ...state,
        file: file,
        fileName: file.name,
        uploading: false,
        selectedFile: [reader.result],
      })

      props.onChange(event)
    }

    setState({
      ...state,
      uploading: true,
    })

    reader.readAsDataURL(file)
  }

  const imageResetHandler = () => {
    setState({
      ...state,
      selectedFile: null,
    })
  }

  const renderUploadedState = () => {
    if (!state.selectedFile && !state.fileName && !props.value) return null
    if (state.file && state.file.type === 'application/pdf') return <PictureAsPdf className={classes.image} />
    var src = state.selectedFile || `/img/${state.fileName}`
    if (!state.selectedFile && !state.fileName) {
      src = `/img/${props.value}`
    }
    return (
      <div className={classes.image} onClick={imageResetHandler}>
        <img className={classes.media} src={src} />
      </div>
    )
  }

  const standardVisual = () => {
    return (
      <div className={clsx(classes.root, props.className && props.className)}>
        {renderUploadedState()}
        <FormControl margin="normal" fullWidth variant={props.variant}>
          <InputLabel htmlFor="component-upload">{props.label}</InputLabel>
          <Input
            value={state.fileName || ''}
            id="component-upload"
            placeholder={props.placeholder || null}
            endAdornment={
              <label>
                <input accept={state.accept} className={classes.input} multiple type="file" onChange={handleUploadClick} />
                <IconButton component="span" className={classes.button} aria-label="Search">
                  <SearchIcon />
                </IconButton>
              </label>
            }
          />
        </FormControl>
      </div>
    )
  }

  const alternativeVisual = () => {
    return (
      <FormControl margin="normal" fullWidth variant={props.variant} className={classes.root}>
        <Input
          className={classes.altVisual}
          value={state.fileName || ''}
          id="component-upload"
          placeholder={props.placeholder || null}
          startAdornment={
            <label>
              <input accept={state.accept} className={classes.input} multiple type="file" onChange={handleUploadClick} />
              <IconButton component="span" className={classes.button} aria-label="Search">
                <PublishIcon color="primary" />
              </IconButton>
              <p>{props.label}</p>
            </label>
          }
          endAdornment={renderUploadedState()}
        />
      </FormControl>
    )
  }

  return state.visual === 'standard' ? standardVisual() : alternativeVisual()
}

export default AptugoImageUpload
