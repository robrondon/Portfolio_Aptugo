import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import portfoliomodulescss from 'dist/css/portfolio.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '../components/Autocomplete'
import AddDialog from '../components/Dialog/Dialog'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import { addSkills, editSkills, loadSkills, removeSkill, searchSkills } from '../store/actions/skillsActions'
import { ISkillsItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Skills: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataSkills = {
    title: '',
    setType: null,
    level: '',
  }
  const [Skillsdata, setSkillsData] = React.useState<any>(initialDataSkills)
  const handleSkillsChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setSkillsData({
      ...Skillsdata,
      [name]: value,
    })
  }
  const skillsData = useSelector((state: IState) => state.skills)
  const theme = portfoliomodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForSkills = (event) => {
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
    dispatch(options.searchString ? searchSkills(options) : loadSkills(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogSkillsAction, setdialogSkillsAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const skillsetsAutocompleteData = useSelector((state: IState) => state.skillsets)
  const [setTypeOptions, setsetTypeOptions] = React.useState<{ label: String; value: String }[]>([])
  const typeInSearchsetTypeSkillsets = (typedIn) => {
    const searchOptions = { searchString: typedIn, searchField: 'set', page: 1, limit: 10 }
    axios.get('http://127.0.0.1:4567/api/skillsets/search/', { params: searchOptions }).then((result) => {
      setsetTypeOptions(
        result.data.docs.map((skillset) => {
          return { label: skillset.set, value: skillset._id }
        })
      )
    })
  }
  const [setTypeValue, setsetTypeValue] = React.useState(null)
  React.useEffect(() => {
    if (!Skillsdata.setType) return undefined
    const asArray = Array.isArray(Skillsdata.setType) ? Skillsdata.setType : [Skillsdata.setType]
    setsetTypeValue(asArray.map((item) => ({ label: item.set, value: item._id })))
  }, [Skillsdata.setType])
  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchSkills(options) : loadSkills(options))
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
                <Typography variant="h4">Skill list</Typography>
              </div>

              <Paper>
                <div className={classes.tableResponsive}>
                  <div className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Skill..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForSkills}
                    />

                    <LocalAddDialog
                      isOpen={dialogSkillsAction !== ''}
                      onOpen={() => setdialogSkillsAction('add')}
                      onSave={() => setdialogSkillsAction('')}
                      onClose={() => setdialogSkillsAction('')}
                      action={dialogSkillsAction}
                      addOptions={{ title: 'Add Skill', text: 'Enter Skill data', button: 'Add' }}
                      editOptions={{ title: 'Edit Skill', text: 'Update Skill data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: ISkillsItem) => {
                        if (dialogSkillsAction === 'delete') {
                          dispatch(removeSkill(data))
                        } else {
                          dialogSkillsAction === 'add' ? dispatch(addSkills(data)) : dispatch(editSkills(data))
                        }
                      }}
                      color="primary"
                      data={Skillsdata}
                      initialData={initialDataSkills}
                      setData={setSkillsData}
                      allowMultipleSubmit={dialogSkillsAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="title"
                        type="text"
                        fullWidth
                        className={'field_title'}
                        variant="standard"
                        value={Skillsdata.title || ''}
                        onChange={handleSkillsChange('title')}
                        error={skillsData?.errField === 'title'}
                        helperText={skillsData?.errField === 'title' && skillsData.errMessage}
                      />

                      <Autocomplete
                        value={setTypeValue}
                        onType={typeInSearchsetTypeSkillsets}
                        onChange={(newValue) =>
                          handleSkillsChange('setType')(
                            newValue?.length ? newValue.map((item) => ({ _id: item.value !== 'new' ? item.value : null, set: item.label })) : []
                          )
                        }
                        loading={skillsetsAutocompleteData.loadingStatus === 'loading'}
                        options={setTypeOptions}
                        label="setType"
                        fullWidth
                        variant="standard"
                        margin="dense"
                      />

                      <TextField
                        margin="dense"
                        label="level"
                        type="text"
                        fullWidth
                        className={'field_level'}
                        variant="standard"
                        value={Skillsdata.level || ''}
                        onChange={handleSkillsChange('level')}
                        error={skillsData?.errField === 'level'}
                        helperText={skillsData?.errField === 'level' && skillsData.errMessage}
                      />
                    </LocalAddDialog>
                  </div>

                  <div>
                    <Table
                      tableHead={['title', 'setType', 'level', 'Actions']}
                      tableData={skillsData.foundskills.length ? skillsData.foundskills : (skillsData.skills as any)}
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
                      <Field value={(fieldData: any) => fieldData.title} />

                      <Field value={(fieldData: any) => (fieldData.setType ? fieldData.setType.set : '')} />

                      <Field value={(fieldData: any) => fieldData.level} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setSkillsData(e.element)
                            setdialogSkillsAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeSkill(e.element))
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

export default Skills
