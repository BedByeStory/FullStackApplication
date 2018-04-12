import React from 'react'
import cx from '../../utils/cx';

export default ({ error, className }) => {
  const clazzes = cx({ error: true, [className]: className })
  if (error && typeof error === 'string') return <p className={clazzes}>{ error }</p>
  if (error && typeof error.message === 'string') return <p className={clazzes}>{ error.message }</p>
  return <div />
}
