import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Async from 'react-promise';

/* input */
const ObjInput = ({type,name,placeholder,id,inputId,input_change,value}) =>
  <div className="form-group">
    <label htmlFor={name}>{name}</label>
    <input onChange={input_change} className="form-control" type={type} name={name} placeholder={placeholder} id={id} value={value} />
  </div>
/* checkbox */
const ObjCheckbox = ({name,label,id,input_change}) =>
  <div className="form-group">
    <div className="checkbox">
      <label><input onChange={input_change} id={id} type="checkbox" value="" name={name}/>{label}</label>
    </div>
  </div>
/* select */
const ObjSelect = ({name,id,option,input_change,value}) =>
<div className="form-group">
  <label htmlFor="sel1">{name}</label>
  <select name={name} value={value} onChange={input_change} className="form-control" id={id} >
    {option.map(opt =>
      <option key={opt.name} value={opt.value}>{opt.name}</option>)}
  </select>
</div>
/* submit */
const ObjSubmit = ({type,name,value,id,inputId}) =>
  <div><input type={type} name={name} value={value} id={id} /></div>
/*form generator */
class FormGenerator extends React.Component {
  constructor(props) {
     super(props);
     /* states is hydrate by the form objects props */
     var inputs = this.props.Inputs;
      this.state = {};
     for(var i = 0; i< inputs.length; i++) {
       this.state[inputs[i].name] = '';
     };
     this.inputChangeHandler = this.inputChangeHandler.bind(this);
     this.dataObject = this.dataObject.bind(this);
     this.ajaxCall = this.ajaxCall.bind(this);
  };
  /* input change */
  /*
  inputChangeHandler(event) {
    var key = event.target.id;
    var val = event.target.value;
    var obj  = {};
    obj[key] = val;
    this.setState(obj);
  };
  */
  inputChangeHandler(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name);
    console.log(value);
    this.setState({
      [name]: value
    });
  }
  /* data object */
  dataObject(formElement) {
    var state_key = Object.keys(this.state);
    var data;
    if(state_key.length == 0) {
      data = new FormData(formElement);
    }else{
      data = new FormData();
      for(var i = 0; i<state_key.length; i++) {
        if(state_key[i] != 'default') {
          data.append(state_key[i],this.state[state_key[i]]);
        }
      }
    }
    return data;
  }
  /* call ajax */
  ajaxCall(e) {
    e.preventDefault();
    var formElement = document.getElementById(e.target.id);
    var data = this.dataObject(formElement);
    var type = formElement.getAttribute('method');
    var url = formElement.getAttribute('action');
      /* token crsf */
      function getCookie(name)
      {
          var cookieValue = null;
          if (document.cookie && document.cookie != '') {
              var cookies = document.cookie.split(';');
              for (var i = 0; i < cookies.length; i++) {
                  var cookie = jQuery.trim(cookies[i]);
                  // Does this cookie string begin with the name we want?

                  if (cookie.substring(0, name.length + 1) == (name + '=')) {
                      cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                      break;
                  }
              }
          }
          return cookieValue;
      }
      $.ajaxSetup({
           beforeSend: function(xhr, settings) {
               if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                   // Only send the token to relative URLs i.e. locally.
                   xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
               }
           }
      });
      $.ajax({
        type: 'post',
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
    var change_test = this.inputChangeHandler;
    var values = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className=".col-xs-12 .col-sm-12 .col-md-12 .col-lg-12">
            <form id={this.props.formId} method={this.props.Method} onSubmit={this.ajaxCall} action={this.props.Urlcall}>
              {
                objects.map(function(obj, i){
                  switch(obj.balise) {
                    case 'input':
                      return <ObjInput value={values[obj.name]} input_change={change_test} type={obj.type} name={obj.name} placeholder={obj.placeholder} id={obj.name} key={i}/>
                      break;
                    case 'submit':
                      return <ObjSubmit type={obj.type} name={obj.name} value={obj.value} id={obj.name} key={i}/>
                      break;
                    case 'select':
                      return <ObjSelect value={values[obj.name]} input_change={change_test} option={obj.option} name={obj.name} id={obj.name} key={i}/>
                      break;
                    case 'checkbox':
                      return <ObjCheckbox input_change={change_test} label={obj.label} name={obj.name} id={obj.name} key={i}/>
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
