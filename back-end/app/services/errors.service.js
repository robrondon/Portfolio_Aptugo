module.exports = {
  prepareError,
}

function prepareError(err) {
  let newErr = {
    code: 422,
  }
  if (err.code === 11000) {
    newErr.field = Object.keys(err.keyPattern)[0]
    newErr.message = `Duplicated Value for ${Object.keys(err.keyPattern)[0]}`
  } else {
    newErr.field = Object.keys(err.errors)[0]
    if (err.errors[newErr.field].kind === 'required') {
      newErr.message = `A value is required for ${newErr.field}`
    } else {
      newErr.message = `${newErr.field}: ${err.errors[newErr.field].reason}`
    }
  }
  return newErr
}
