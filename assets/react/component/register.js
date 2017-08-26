import React from 'react';
import ReactDOM from 'react-dom';
import FormGenerator from '../template/form';

class Register extends React.Component {
  constructor(props) {
     super(props);
     this.objInputFunction = this.objInputFunction.bind(this);
  };
  objInputFunction() {
    return [
      {balise:'input',type:'text',name:'first name',placeholder:'first name'},
      {balise:'input',type:'text',name:'last name',placeholder:'last name'},
      {balise:'input',type:'text',name:'age',placeholder:'age'},
      {balise:'input',type:'email',name:'email',placeholder:'email'},
      {balise:'input',type:'password',name:'password',placeholder:'password'},
      {balise:'submit',type:'submit',name:'submit',value:'submit'},
    ];
  };

  render() {
    return(
      <div>
        <FormGenerator formId='myForm' Inputs={this.objInputFunction()} Method='post' Urlcall='/register' />
      </div>
    )
  }
};

export default Register;
