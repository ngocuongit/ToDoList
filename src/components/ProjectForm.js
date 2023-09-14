import React from 'react'

const ProjectForm = ({handleSubmit,heading,value,setValue,setShowModal, confirmBtnText}) => {

  return (
    <form onSubmit={handleSubmit} className='projectForm'>
        <h3>{heading}</h3>
        <input 
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Project name....'
            autoFocus
        />
        <button className='projectForm-cancel' onClick={() => setShowModal(false)}>
            Cancel
        </button>
        <button className='projectForm-confirm'>
            {confirmBtnText}
        </button>
    </form>
  )
}

export default ProjectForm