import React, { Component } from 'react'
import styles from './index.css'

function isAdvanced () {
  var div = document.createElement('div')
  return (
    ('draggable' in div || ('ondragstart' in div && 'ondrop' in div)) &&
    'FormData' in window &&
    'FileReader' in window
  )
}

export default class Upload extends Component {
  constructor (props) {
    super(props)
    this.isAdvancedUpload = isAdvanced()
    this.state = {
      isDragging: false,
      isUploading: false,
      isError: false
    }
  }

  preventDefaults (e) {
    e && e.preventDefault() && e.stopPropagation()
  }

  setDragging (isDragging, e) {
    this.preventDefaults(e)
    this.setState({ isDragging, isError: false })
  }

  handleDrop (e) {
    this.preventDefaults(e)
    this.setState({ isDragging: false, isError: false })
    this.props.onSave(e.dataTransfer.files[0])
  }

  handleChange (ev) {
    this.preventDefaults(ev)
    this.props.onSave(ev.target.files[0])
  }

  activeClasses () {
    const { isUploading } = this.state
    const { className } = this.props

    return [
      className || '',
      this.isAdvancedUpload ? 'advanced' : '',
      isUploading ? 'isUploading' : ''
    ]
      .filter(v => !!v)
      .join(' ')
  }

  activeStyles () {
    const { style, supportedStyle, draggingStyle } = this.props
    const { isDragging } = this.state
    return {
      ...style,
      ...(this.isAdvancedUpload ? supportedStyle : {}),
      ...(isDragging ? draggingStyle : {})
    }
  }

  render () {
    const { id='file', accept = '', uploadIcon = '', defaultIcon = '' } = this.props
    const { isError } = this.state
    return (
      <form
        style={this.activeStyles()}
        className={'box' + ' ' + this.activeClasses()}
        onDrag={this.preventDefaults.bind(this)}
        onDragStart={this.preventDefaults.bind(this)}
        onDragOver={this.setDragging.bind(this, true)}
        onDragEnter={this.setDragging.bind(this, true)}
        onDragLeave={this.setDragging.bind(this, false)}
        onDragEnd={this.setDragging.bind(this, false)}
        onDrop={this.handleDrop.bind(this)}
      >
        <div className={'input'}>
          <input
            className={'file'}
            id={id}
            name={id}
            type='file'
            accept={accept}
            onChange={this.handleChange.bind(this)}
          />
          <label className="position-relative" htmlFor={id} style={{minHeight: 48}}>
            { uploadIcon && <img className={'icon'} src={uploadIcon} alt='Upload Icon' /> }
            { defaultIcon }
          </label>
        </div>
        <div className={'uploading'}>Uploading…</div>
        {isError ? <div className={'error'}>{isError}</div> : ''}
      </form>
    )
  }
}
