import React, { FunctionComponent } from 'react'
import styles from './table.module.scss'

interface fieldProps {
  value: string | Function
}

const AptugoField: FunctionComponent<fieldProps> = (props) => {
  if (typeof props.value === 'string') {
    return <div className={styles.tableField} dangerouslySetInnerHTML={{ __html: props.value as string }} />
  } else {
    return <div className={styles.tableField}>{props.value}</div>
  }
}

export default AptugoField
