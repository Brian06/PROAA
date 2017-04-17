import React from 'react';
import facebookLogin from 'react-facebook-login';
import {Button} from 'react-bootstrap'
import {Form, FormGroup, ControlLabel, FormControl, Label} from 'react-bootstrap'


const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

export default class FacebookLogin extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (function (d, s, id) {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = () => {
      FB.init({
        appId: this.props.appId,
        xfbml: this.props.xfbml,
        cookie: this.props.cookie,
        version: this.props.version,
      });
    };
  }

  responseApi (authResponse) {
    FB.api('/me', { fields: this.props.fields }, (me) => {
      me.accessToken = authResponse.accessToken;
      this.props.responseHandler(me);
    });
  };

  checkLoginState (response) {
    if (response.authResponse) {
      this.responseApi(response.authResponse);
    } else {
      if (this.props.responseHandler) {
        this.props.responseHandler({ status: response.status });
      }
    }
  };

  clickHandler () {
    FB.login(this.checkLoginState.bind(this), { scope: this.props.scope });
  };

  render() {
    return (
      <div >
      <Form>
        <FormGroup>
          <Button bsStyle="primary" block onClick={this.clickHandler.bind(this)}>
            {this.props.buttonText}
          </Button>
        </FormGroup>
      </Form>
      </div>
    );
  }
}
