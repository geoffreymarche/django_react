import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

/* message */
const Message = ({ text, classValue }) =>
  <div><p className={classValue}>{text}</p></div>

class callAjaxExemple extends React.Component {

  constructor(props) {
     super(props);

     this.state = {
        data: 'Initial data...',
        childVisible: 0,
        responseClass: 'default',
     }
     this.ajaxCall = this.ajaxCall.bind(this);

  };

  ajaxCall() {
    var This = this;
   $.get('/get',function(data){},"json")
     .done(function(data) {
       This.setState({data: data.a});
       This.setState({childVisible: 1});
       This.setState({responseClass: 'active'});
     })
     .fail(function(data) {
       This.setState({data: 0});
       This.setState({childVisible: 2});
       This.setState({responseClass: 'fail'});
     });
  }

  render() {

    var retour;
    if(this.state.childVisible == 1) {
      retour = 'Class get reussit';
    }
    else if(this.state.childVisible == 2) {
      retour = 'Call get echoue';
    }else{
      retour = 'pas de call Get';
    }

    return(
      <button onClick = {this.ajaxCall}>CLICK</button>
      <h4>{this.state.data}</h4>
      <div id="composant">
        <Message text={retour} classValue={this.state.responseClass}/>
      </div>
    );
  };
}
