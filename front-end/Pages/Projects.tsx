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
import FileUpload from '../components/FileUpload/FileUpload'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import { addProjects, editProjects, loadProjects, removeProject, searchProjects } from '../store/actions/projectsActions'
import { IProjectsItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Projects: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataProjects = {
    title: '',
    image: '',
    githubLink: '',
    liveLink: '',
  }
  const [Projectsdata, setProjectsData] = React.useState<any>(initialDataProjects)
  const handleProjectsChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setProjectsData({
      ...Projectsdata,
      [name]: value,
    })
  }
  const projectsData = useSelector((state: IState) => state.projects)
  const theme = portfoliomodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForProjects = (event) => {
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
    dispatch(options.searchString ? searchProjects(options) : loadProjects(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogProjectsAction, setdialogProjectsAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchProjects(options) : loadProjects(options))
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
                <Typography variant="h4">Project list</Typography>
              </div>

              <Paper>
                <div className={classes.tableResponsive}>
                  <div className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Project..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForProjects}
                    />

                    <LocalAddDialog
                      isOpen={dialogProjectsAction !== ''}
                      onOpen={() => setdialogProjectsAction('add')}
                      onSave={() => setdialogProjectsAction('')}
                      onClose={() => setdialogProjectsAction('')}
                      action={dialogProjectsAction}
                      addOptions={{ title: 'Add Project', text: 'Enter Project data', button: 'Add' }}
                      editOptions={{ title: 'Edit Project', text: 'Update Project data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: IProjectsItem) => {
                        if (dialogProjectsAction === 'delete') {
                          dispatch(removeProject(data))
                        } else {
                          dialogProjectsAction === 'add' ? dispatch(addProjects(data)) : dispatch(editProjects(data))
                        }
                      }}
                      color="primary"
                      data={Projectsdata}
                      initialData={initialDataProjects}
                      setData={setProjectsData}
                      allowMultipleSubmit={dialogProjectsAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="title"
                        type="text"
                        fullWidth
                        className={'field_title'}
                        variant="standard"
                        value={Projectsdata.title || ''}
                        onChange={handleProjectsChange('title')}
                        error={projectsData?.errField === 'title'}
                        helperText={projectsData?.errField === 'title' && projectsData.errMessage}
                      />

                      <FileUpload accept="*" label="image" value={Projectsdata.image} onChange={handleProjectsChange('image')} />

                      <TextField
                        margin="dense"
                        label="githubLink"
                        type="text"
                        fullWidth
                        className={'field_githubLink'}
                        variant="standard"
                        value={Projectsdata.githubLink || ''}
                        onChange={handleProjectsChange('githubLink')}
                        error={projectsData?.errField === 'githubLink'}
                        helperText={projectsData?.errField === 'githubLink' && projectsData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="liveLink"
                        type="text"
                        fullWidth
                        className={'field_liveLink'}
                        variant="standard"
                        value={Projectsdata.liveLink || ''}
                        onChange={handleProjectsChange('liveLink')}
                        error={projectsData?.errField === 'liveLink'}
                        helperText={projectsData?.errField === 'liveLink' && projectsData.errMessage}
                      />
                    </LocalAddDialog>
                  </div>

                  <div>
                    <Table
                      tableHead={['title', 'image', 'githubLink', 'liveLink', 'Actions']}
                      tableData={projectsData.foundprojects.length ? projectsData.foundprojects : (projectsData.projects as any)}
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

                      <Field value={(fieldData: any) => '<a href="/img/' + fieldData.image + '" download>' + fieldData.image + '</a>'} />

                      <Field value={(fieldData: any) => fieldData.githubLink} />

                      <Field value={(fieldData: any) => fieldData.liveLink} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setProjectsData(e.element)
                            setdialogProjectsAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeProject(e.element))
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

export default Projects
