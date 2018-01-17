import React, { Component, PropTypes, } from 'react';
import { getRenderedComponent, } from '../AppLayoutMap';
import ResponsiveForm from '../ResponsiveForm';

const propTypes = {
  form: PropTypes.object,
  renderFormElements: PropTypes.object,
};


const defaultProps = {
  form: {},
  renderFormElements: {
    minimum: function (formdata, formElementsQueue, formElement) {
      return (formdata.comparator === 'range')? formElement: false;
    },
    maximum: function (formdata, formElementsQueue, formElement) {
      return (formdata.comparator === 'range')? formElement: false;
    },
    comparator: function (formdata, formElementsQueue, formElement, prevformdata) {
      if (formdata.comparator === 'range' && (prevformdata.comparator !== formdata.comparator)) {
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
        return formElement;
      }
    },
    firstname: function (formdata, formElementsQueue) {
      return (formdata.firstname === 'Iris') ? {
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
      };
    },
    lastname: function (formdata, formElementsQueue) {
      return (formdata.lastname === 'Dan') ? {
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
    this.state = {
      formdata: {},
    };
    // this.updateFormState = this.updateFormState.bind(this);
    this.updateFormLayout = this.updateFormLayout.bind(this);
    this.updateFormGroup = this.updateFormGroup.bind(this);
  }
  // updateFormState(prevformdata, formdata) {
  //   this.updateFormLayout(prevformdata, formdata);
  //   // console.log(this.state);
  //   // this.setState({ formdata }, () => {
  //   //   // this.updateFormLayout();
  //   // })
    
  //   // console.log('returning state');
  //   // return this.getState().formdata;
  // }
  updateFormGroup() {
    let formElementsQueue = [];
    
  }

  updateFormLayout(prevformdata, formdata) {
    let formElementsQueue = [];
    this.props.form.formgroups.forEach(formgroup => {
      if (formgroup.formElements) {
        formElementsQueue.push(...formgroup.formElements.slice());
      }
    });
    this.props.form.formgroups[ 0 ].formElements = [];
    while (formElementsQueue.length > 0) {
      let currentElement = formElementsQueue.shift();
      if (currentElement.name && this.props.renderFormElements[ currentElement.name ]) {
        currentElement = this.props.renderFormElements[ currentElement.name ].call(this, formdata, formElementsQueue, currentElement, prevformdata);
        this.props.form.formgroups[ 0 ].formElements.push(currentElement);
      } else {
        this.props.form.formgroups[ 0 ].formElements.push(currentElement);
      }
      // this.props.form.formgroups = this.props.form.formgroups.map(formgroup => {
      //   if (formgroup.formElements) {
      //     formgroup.formElements = formgroup.formElements.map(formElement => {
      //       //if false remove the validation;
      //       return (this.props.renderFormElements[ formElement.name ]) ? this.props.renderFormElements[ formElement.name ].call(this, formdata) : formElement;
      //     });
      //     return formgroup;
      //   } else {
      //     return formgroup;
      //   }
      // })    
    }
  }

  render() {
    let passedProps = Object.assign({}, this.props, this.props.form);
    return (<div><ResponsiveForm updateFormLayout={this.updateFormLayout}  {...passedProps} /></div>)
  }
}

ResponsiveFormContainer.propTypes = propTypes;
ResponsiveFormContainer.defaultProps = defaultProps;

export default ResponsiveFormContainer;
