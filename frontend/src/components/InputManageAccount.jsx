import React from 'react'

function InputManageAccount({...other}) {
  return (
    <input style={{
        padding: '10px',
        border: '1px solid #cccccc',
        borderRadius: '5px',
        width: '100%',
        boxSizing: 'border-box'
        
    }} {...other}

    />
  )
}

export default InputManageAccount
