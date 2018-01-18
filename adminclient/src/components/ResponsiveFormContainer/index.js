import React, { Component, PropTypes, } from 'react';
import { getRenderedComponent, } from '../AppLayoutMap';
import ResponsiveForm from '../ResponsiveForm';

const propTypes = {
  form: PropTypes.object,
  renderFormElements: PropTypes.object,
};

//validations structure = Object
const defaultProps = {
  form: {},
  validations: {
    firstname: {
      "name":"firstname",
      "constraints":{
        "firstname":{
          "presence":"true",
          "length":{
            "minimum":3,
            "message":"must be greater than 3 characters"
          }
        }
      }
    },
    minimum: {
      'name': 'minimum',
      'constraints': {
        'minimum': {
          'presence': 'true',
        },
      },
    },
  },
  renderFormElements: {
    minimum: function (currState, formElementsQueue, formElement) {
      return (currState.comparator === 'range')? formElement: false;
    },
    maximum: function (currState, formElementsQueue, formElement) {
      return (currState.comparator === 'range')? formElement: false;
    },
    static_val:  function (currState, formElementsQueue, formElement) {
      return (currState.comparator === 'equal')? formElement: false;
    },
    comparator: function (currState, formElementsQueue, formElement, prevState) {
      if (prevState.comparator === currState.comparator) {
        return formElement;
      } else if (currState.comparator === 'range') {
      formElementsQueue.push({
          label: 'Minimum',
          type: 'text',
          name: 'minimum',
          'layoutProps': {
            'horizontalform': true,
          },
        }, {
          label: 'Maximum',
          type: 'text',
          name: 'maximum',
          'layoutProps': {
            'horizontalform': true,
          },
          }); 
        return formElement;
      } else {
        formElementsQueue.push({
          label: 'Value',
          type: 'text',
          name: 'static_val',
          'layoutProps': {
            'horizontalform': true,
          },
        }); 
        return formElement;
      }
    },
    firstname: function (currState, formElementsQueue) {
      return (currState.firstname === 'Iris') ? {
        name: 'lastname',
        type: 'text',
        label: 'Last Name',
        'layoutProps': {
          'horizontalform': true,
        },
      } : {
        name: 'firstname',
        type: 'text',
        label: 'First Name',
        'layoutProps': {
          'horizontalform': true,
          },
          keyUp: true,
          validateOnKeyup: true,
      };
    },
    lastname: function (currState, formElementsQueue) {
      return (currState.lastname === 'Dan') ? {
        name: 'firstname',
        type: 'text',
        label: 'First Name',
        'layoutProps': {
          'horizontalform': true,
        },
      } : {
        name: 'lastname',
        type: 'text',
        label: 'Last Name',
        'layoutProps': {
          'horizontalform': true,
        },
      };
    },

  }
};

class ResponsiveFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateFormLayout = this.updateFormLayout.bind(this);
    this.updateFormGroup = this.updateFormGroup.bind(this);
    this.updateValidations = this.updateValidations.bind(this);
  }

  updateFormGroup(options) {
    let { formgroup, prevState, currState } = options;
    let formElementsQueue = [];
    formElementsQueue.push(...formgroup.formElements.slice());
    formgroup.formElements = [];
    while (formElementsQueue.length > 0) {
      let currentElement = formElementsQueue.shift();
      if (currentElement.name && this.props.renderFormElements[ currentElement.name ]) {
        currentElement = this.props.renderFormElements[ currentElement.name ].call(this, currState, formElementsQueue, currentElement, prevState);
        if(currentElement) formgroup.formElements.push(currentElement);
      } else {
        formgroup.formElements.push(currentElement);
      }
    }
    return formgroup;
  }

  updateValidations(options) {
    let formElements = [];
    this.props.form.formgroups.forEach(formgroup => {
      if (formgroup.formElements) formElements.push(...formgroup.formElements);
    });
    let validations = formElements.reduce((valArr, formElement) => { 
      if (formElement.name && this.props.validations[ formElement.name ]) valArr.push(this.props.validations[ formElement.name ]);
      return valArr;
    }, []);
    console.log({ formElements, validations });
    return validations;
  }

  updateFormLayout(prevState, currState) {
    this.props.form.formgroups = this.props.form.formgroups.map(formgroup => {
      if (formgroup.formElements) {
        return this.updateFormGroup({formgroup, prevState, currState });
      } else {
        return formgroup;
      }
    });
    this.props.form.validations = this.updateValidations();
  }

  render() {
    console.log('ran this validation in render');
    let validations = (this.props.form.validations.length > 0)? this.props.form.validations : this.updateValidations();
    let passedProps = Object.assign({}, this.props, this.props.form, {validations});
    return (<div><ResponsiveForm updateFormLayout={this.updateFormLayout}  {...passedProps} /></div>)
  }
}

ResponsiveFormContainer.propTypes = propTypes;
ResponsiveFormContainer.defaultProps = defaultProps;

export default ResponsiveFormContainer;
