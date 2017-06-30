/**
 * Created by zhaoyu on Jun 29, 2017.
 * @flow
 */
import React from 'react'
import * as authActions from '../../actions/authActions'
import * as strings from '../../constants/strings'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import LoginForm from './LoginForm'
import './LoginPage.css'

class LoginPage extends React.Component {
  state = {
    open: false,
    snackBarMessage: '',
    submitting: false,
    errors: {}
  }
  // console.log(this.props.location.query.next);
  //
  // openSnackBar = (message) => {
  //   this.setState({
  //     open: true,
  //     snackBarMessage: message,
  //   })
  // }
  //
  // closeSnackBar = () => {
  //   this.setState({
  //     open: false,
  //   })
  // }

  handleLogin = (values) => {
    console.log(values)
    // this.setState({submitting: true})    // eslint-disable-line react/no-set-state
    // this.props.actions.authLoginUser(
    //   values.username,
    //   values.password,
    //   this.state.redirectTo
    //     )
    //     .then((response) => {
    //       if (response != null) {
    //         this.openSnackBar(response)
    //       } else {
    //         this.openSnackBar(strings.LOGIN_SUCCESS_MESSAGE)
    //       }
    //       this.setState({submitting: false})    // eslint-disable-line react/no-set-state
    //     })
    //     .catch(error => {
    //       this.openSnackBar(error.message)
    //       if (error.validationErrors) {
    //         throw new SubmissionError(error.validationErrors)
    //       } else {
    //         // todo: add this function
    //         // reportServerError(error);
    //       }
    //       this.setState({submitting: false})    // eslint-disable-line react/no-set-state
    //     })
  }

  render = () => {
    return (
      <div className='login-form-wrapper'>
        <LoginForm onSubmit={this.handleLogin} submitting={this.state.submitting} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LoginPage)
