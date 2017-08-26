import React from 'react';
import ReactDOM from 'react-dom';
import FormGenerator from '../template/form';

class Login extends React.Component {
  constructor(props) {
     super(props);
     this.objInputFunction = this.objInputFunction.bind(this);
  };
  objInputFunction() {
    return [
      {balise:'input',type:'email',name:'email',placeholder:'email'},
      {balise:'input',type:'password',name:'password',placeholder:'password'},
      {balise:'submit',type:'submit',name:'submit',value:'submit'},
    ];
  };

  render() {
    return(
      <div>
        <FormGenerator formId='myForm' Inputs={this.objInputFunction()} Method='post' Urlcall='/login' />
      </div>
    )
  }
};

export default Login;
