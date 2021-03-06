import React from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'

//field validation
const required = value => (value ? undefined : 'Required')
const link = value => (value && !/^(f|ht)tps?:\/\//i.test(value) ? 'Invalid link' : undefined)

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
  <div>
    <div>
      <input {...input} className="p-2 mt-4 w-100" placeholder={label} type={type} />
      {touched &&
        ((error && <span className="add-error">{error}</span>) ||
          (warning && <span className="add-error">{warning}</span>))}
    </div>
  </div>
)

class AddClipForm extends React.Component {
  renderSuccessOrErr = (error, success) => {
    if (error !== null) {
      return <div className="alert alert-danger">{error}</div>
    } else if (success == true) {
      return <div className="alert alert-success">Success</div>
    }
    ;<div />
  }

  addClipWrapper = values => {
    this.props.addClip({title: values.title, url: values.url, tag: values.tag})
  }
  render() {
    let {clipError, successOnEdit} = this.props
    return (
      <div className="nr-admin-add-clip-container">
        <form onSubmit={this.props.handleSubmit(this.addClipWrapper)}>

          {this.renderSuccessOrErr(clipError, successOnEdit)}

          <div className="text-center">
            <span>All fields required</span>
          </div>
          <label>Tag</label>
          <Field name="tag" component="select" label="Tag" validate={[required]}>
            <option />
            <option value="weddings">weddings</option>
            <option value="voice">voice</option>
            <option value="other">other</option>
          </Field>

          <Field
            name="title"
            component={renderField}
            validate={[required]}
            type="text"
            label="Title"
          />

          <Field
            name="url"
            component={renderField}
            validate={[required, link]}
            type="text"
            label="URL"
          />

          <button className="w-25 p-1 text-center d-flex mx-auto mt-4 justify-content-center" type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}
AddClipForm.PropTypes = {
  addClip: PropTypes.func.isRequired,
  clipError: PropTypes.object,
  successOnEdit: PropTypes.object
}
export default reduxForm({
  form: 'addClipForm'
})(AddClipForm)
