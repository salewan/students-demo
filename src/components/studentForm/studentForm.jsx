import React from 'react';
import {Field, Form} from 'react-final-form';
import {Button, Form as BSForm} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import './studentForm.css';
import {RATES} from '../../static/edu.constants';
import FormAutoSaver from '../common/formAutoSaver';
import {saveForm, submitResults, editStudent} from '../../actions/students.action';
import {FormField, FormSelectField} from './formField';


const required = value => (value ? undefined : 'Required');

class StudentForm extends React.Component {

  componentDidMount() {
    const id = this.props.id;
    if (id) {
      this.props.editStudent(id);
    }
  }

  globalSave = (values) => {
    const id = this.props.id;
    const copy = {...values};
    if (id) {
      copy.id = id;
    }
    this.props.saveForm(copy);
  };

  render() {
    const {submitResults, form} = this.props;
    const {match: {params: {id}}} = this.props;

    return <>
      <Form onSubmit={submitResults}>
        {
          ({handleSubmit, values, submitting}) => (
            <BSForm onSubmit={handleSubmit}>

              <Field
                id="name"
                name="name"
                _type="text"
                placeholder="Full name"
                initialValue={form.name}
                validate={required}
                component={FormField}
              />


              <Field
                id="born"
                name="born"
                _type="date"
                placeholder="Date of birth"
                initialValue={form.born}
                validate={required}
                component={FormField}
              />



              <Field
                id="rate"
                name="rate"
                placeholder="Performance"
                validate={required}
                initialValue={form.rate || RATES[2]}
                component={FormSelectField}
                options={RATES}
              />

              {!id && <FormAutoSaver debounce={300} save={this.globalSave}/>}

              <Button disabled={submitting}>Submit</Button>
            </BSForm>
          )
        }
      </Form>
    </>
  }
}

function mapStateToProps(state, ownProps) {

  return {
    form: state.students.form || {},
    id: ownProps.match.params.id
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveForm,
    submitResults,
    editStudent
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
