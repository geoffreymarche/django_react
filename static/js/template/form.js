import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Async from 'react-promise';

/* input */
const ObjInput = ({type,name,placeholder,id,inputId}) =>
  <div className="form-group">
    <label htmlFor={name}>{name}</label>
    <input className="form-control" type={type} name={name} placeholder={placeholder} id={id} value="" />
  </div>
/* submit */
const ObjSubmit = ({type,name,value,id,inputId}) =>
  <div><input type={type} name={name} value={value} id={id} /></div>
/*form generator */
class FormGenerator extends React.Component {
  constructor(props) {
     super(props);

     this.ajaxCall = this.ajaxCall.bind(this);
  };
  /* call ajax */
  ajaxCall(e) {
    e.preventDefault();
    var formElement = document.getElementById(e.target.id);
    var data = new FormData(formElement);
    console.log(data);
    var type = formElement.getAttribute('method');
    console.log(type);
    var url = formElement.getAttribute('action');
    console.log(url);
    $.ajax({
      type: type,
      url: url,
      dataType: 'json',
      data: data,
      contentType: false,
      processData: false,
      success:function(data) {
        console.log(data);
      }
    })
  }
  render() {
    var objects = this.props.Inputs;
    return (
      <div className="container">
        <div className="row">
          <div className=".col-xs-12 .col-sm-12 .col-md-12 .col-lg-12">
            <form id={this.props.formId} method={this.props.Method} onSubmit={this.ajaxCall} action={this.props.Urlcall}>
              {
                objects.map(function(obj, i){
                  switch(obj.balise) {
                    case 'input':
                      return <ObjInput type={obj.type} name={obj.name} placeholder={obj.placeholder} id={obj.name} key={i}/>
                      break;
                    case 'submit':
                      return <ObjSubmit type={obj.type} name={obj.name} value={obj.value} id={obj.name} key={i}/>
                      break;
                  }
               })
            }
          </form>
        </div>
      </div>
    </div>
    )
  }
}

export default FormGenerator;
