import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import portfoliomodulescss from 'dist/css/portfolio.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddDialog from '../components/Dialog/Dialog'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import { addSkillsets, editSkillsets, loadSkillsets, removeSkillset, searchSkillsets } from '../store/actions/skillsetsActions'
import { ISkillsetsItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const SkillSets: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataSkillSets = {
    set: '',
  }
  const [SkillSetsdata, setSkillSetsData] = React.useState<any>(initialDataSkillSets)
  const handleSkillSetsChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setSkillSetsData({
      ...SkillSetsdata,
      [name]: value,
    })
  }
  const skillsetsData = useSelector((state: IState) => state.skillsets)
  const theme = portfoliomodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForSkillSets = (event) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({ ...tableloadoptions, searchString: event.target.value })
    }, 500)
  }
  const [searchFieldloadoptions, setsearchFieldloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performsearchFieldload = (options) => {
    dispatch(options.searchString ? searchSkillsets(options) : loadSkillsets(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogSkillsetsAction, setdialogSkillsetsAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchSkillsets(options) : loadSkillsets(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  // Theme selection

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.pages}>
          <div className={theme.mainarea}>
            <Container maxWidth="lg">
              <div className={theme.tableHeading}>
                <Typography variant="h4">SkillSet list</Typography>
              </div>

              <Paper>
                <div className={classes.tableResponsive}>
                  <div className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search SkillSet..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForSkillSets}
                    />

                    <LocalAddDialog
                      isOpen={dialogSkillsetsAction !== ''}
                      onOpen={() => setdialogSkillsetsAction('add')}
                      onSave={() => setdialogSkillsetsAction('')}
                      onClose={() => setdialogSkillsetsAction('')}
                      action={dialogSkillsetsAction}
                      addOptions={{ title: 'Add SkillSet', text: 'Enter SkillSet data', button: 'Add' }}
                      editOptions={{ title: 'Edit SkillSet', text: 'Update SkillSet data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: ISkillsetsItem) => {
                        if (dialogSkillsetsAction === 'delete') {
                          dispatch(removeSkillset(data))
                        } else {
                          dialogSkillsetsAction === 'add' ? dispatch(addSkillsets(data)) : dispatch(editSkillsets(data))
                        }
                      }}
                      color="primary"
                      data={SkillSetsdata}
                      initialData={initialDataSkillSets}
                      setData={setSkillSetsData}
                      allowMultipleSubmit={dialogSkillsetsAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="set"
                        type="text"
                        fullWidth
                        className={'field_set'}
                        variant="standard"
                        value={SkillSetsdata.set || ''}
                        onChange={handleSkillSetsChange('set')}
                        error={skillsetsData?.errField === 'set'}
                        helperText={skillsetsData?.errField === 'set' && skillsetsData.errMessage}
                      />
                    </LocalAddDialog>
                  </div>

                  <div>
                    <Table
                      tableHead={['set', 'Actions']}
                      tableData={skillsetsData.foundskillsets.length ? skillsetsData.foundskillsets : (skillsetsData.skillsets as any)}
                      orderBy={tableloadoptions.sort.field}
                      order={tableloadoptions.sort.method}
                      onRequestSort={(event, property) => {
                        settableloadoptions({
                          ...tableloadoptions,
                          sort: {
                            field: property,
                            method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'ASC',
                          },
                        })
                      }}
                    >
                      <Field value={(fieldData: any) => fieldData.set} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setSkillSetsData(e.element)
                            setdialogSkillsetsAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeSkillset(e.element))
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </Table>
                  </div>
                </div>
              </Paper>
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default SkillSets
