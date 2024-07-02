import React from 'react'

const ModalEditAttribute = () => {
  return (
    <Modal
        centered
        show={valueModalShow}
        onHide={() =>setValueModalShow(false)}
        closeButton="true"
    >
        <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Ingredients
        </Modal.Title>
        <button className="close" onClick={() => setValueModalShow(false)}>
            <span aria-hidden="true">&times;</span>
        </button>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
            <label>Name</label>
            <input 
                type="text" 
                name="name"
                value={input.name}
                onChange={handleInput} 
                className={errors.name !== undefined ? 'form-control is-invalid ' : 'form-control'}
                placeholder="Enter Product Attribute Name" 
            />
            {errors.name !== undefined && (
                <div className="invalid-feedback">
                {errors.name[0]}
                </div>
            )}
        </div>
        <div className="form-group">
            <label>Status</label>
            <select
                name='status'
                value={input.status}
                onChange={handleInput}
                className={errors.status !== undefined ? 'form-control select2 is-invalid ' : 'form-control'}
                placeholder="Select Product Attribute Status"
            >
                <option value="" disabled>Select Attribute Status</option>
                <option value={1}>Active</option>
                <option value={2}>Inactive</option>
            </select>
            {errors.status && (
            <div className="invalid-feedback">
                {errors.status[0]}
            </div>
            )}
        </div>
        <div className="modal-footer justify-content-between">
        <button className="btn btn-warning" onClick={isEditMode ? handleValueEdit : handleValueCreate} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...' : `${modalTitle} Attribute` }}/>
        </div>
        </Modal.Body>
    </Modal>
  )
}

export default ModalEditAttribute