import React, { FunctionComponent } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import classes from './leaflet.module.scss'

export interface leaftLetType {
  position: number[]
}

const LeafLet: FunctionComponent<leaftLetType> = (props) => {
  const [state, setState] = React.useState({
    position: [51.505, -0.09],
    zoom: 2,
  })

  React.useEffect(() => {
    setState({ ...state, position: props.position })
  }, [props.position])

  return (
    <div className={classes.map}>
      <Map center={state.position} zoom={state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.children}
      </Map>
    </div>
  )
}

export default LeafLet
