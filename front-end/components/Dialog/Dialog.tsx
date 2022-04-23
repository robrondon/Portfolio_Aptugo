import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Fab from '@mui/material/Fab'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import React, { FunctionComponent, useState } from 'react'

interface subOptions {
  title: string
  text: string
  button: string
}

interface addDialogProps {
  isOpen: boolean
  onOpen: VoidFunction
  onSave?: VoidFunction
  onClose?: VoidFunction
  action: 'add' | 'edit' | 'delete' | ''
  addOptions: subOptions
  editOptions: subOptions
  removeOptions: subOptions
  saveDataHandler: Function
  color: 'primary' | 'inherit' | 'secondary' | 'default'
  data: any
  initialData: any
  setData: Function
  allowMultipleSubmit: boolean
  hideButton?: boolean
}

const AddDialog: FunctionComponent<addDialogProps> = (props) => {
  const { isOpen, onOpen, onSave, onClose, action, saveDataHandler, color, data, initialData, setData, allowMultipleSubmit, hideButton } = props
  const [options, setOptions] = useState({ title: '', text: '', button: '' })
  const [switchState, setSwitchState] = useState({ addMultiple: false })

  const handleSwitchChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchState({ ...switchState, [name]: event.target.checked })
  }

  const resetSwitch = () => {
    setSwitchState({ addMultiple: false })
  }

  const handleClose = () => {
    if (onSave) {
      resetSwitch()
      setData(initialData)
    }
    onClose()
  }

  const handleSubmit = () => {
    saveDataHandler(data)
    setData(initialData)
    if (onSave) !switchState.addMultiple && handleClose()
  }

  React.useEffect(() => {
    switch (action) {
      case 'add':
        setOptions(props.addOptions)
        break
      case 'edit':
        setOptions(props.editOptions)
        break
      case 'delete':
        setOptions(props.removeOptions)
        break
    }
  }, [action])

  return (
    <React.Fragment>
      {!hideButton && (
        <Tooltip title={options.title}>
          <Fab aria-label={options.title} color={color} onClick={onOpen}>
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
      <Dialog disableEnforceFocus open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title" className={props.className}>
        <DialogTitle id="form-dialog-title">{options.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{options.text}</DialogContentText>
          {action !== 'delete' && <div>{props.children}</div>}
        </DialogContent>
        <DialogActions>
          {allowMultipleSubmit && (
            <Tooltip title="Add multiple">
              <Switch
                checked={switchState.addMultiple}
                onChange={handleSwitchChange('addMultiple')}
                value="addMultiple"
                inputProps={{ 'aria-label': 'add multiple' }}
              />
            </Tooltip>
          )}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {options.button}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default AddDialog
