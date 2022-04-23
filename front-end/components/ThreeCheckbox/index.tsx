import MaterialCheckbox from '@mui/material/Checkbox'
import React, { forwardRef, useEffect, useState } from 'react'

const Checkbox = ({ name, checked, onFocus, onChange, onBlur }, ref) => {
  const [localChecked, setLocalChecked] = useState(checked ?? null)
  useEffect(() => setLocalChecked(checked ?? null), [checked])
  const handleChange = () => {
    let newChecked
    switch (localChecked) {
      case true:
        newChecked = false
        break
      case false:
        newChecked = null
        break
      default:
        newChecked = true
        break
    }
    setLocalChecked(newChecked)
    if (onChange) {
      onChange(newChecked)
    }
  }
  const handleBlur = () => {
    if (onBlur) {
      onBlur(localChecked)
    }
  }
  return (
    <MaterialCheckbox
      inputRef={ref}
      name={name}
      checked={!!localChecked}
      indeterminate={localChecked === null}
      onFocus={onFocus}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

export default forwardRef(Checkbox)
