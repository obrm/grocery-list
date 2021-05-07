import React, { useEffect } from 'react'

const Alert = ({ type, message, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 3000)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line
  }, [list])
  return <p className={`alert alert-${type}`}>{message}</p>
}

export default Alert
