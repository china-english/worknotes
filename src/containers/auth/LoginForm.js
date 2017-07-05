/**
 * Created by zhaoyu on Jun 29, 2017.
 */

import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'

import { Form, Button, Icon, Row, Col } from 'antd'
import { TextField } from 'redux-form-antd'
import './LoginForm.css'

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = '必填项'
  } else if (values.username.length > 15) {
    errors.username = '不应超过15个字符'
  }
  if (!values.password) {
    errors.password = '必填项'
  } else if (values.password.length < 6) {
    errors.password = '不得少于6个字符'
  }
  return errors
}

const LoginForm = (props) => {
  const {handleSubmit, submitting, reset, pristine} = props
  return (
    <div>
      <Row type='flex' justify='center' align='center'>
        <Col style={{width: '300'}}>
          <Form onSubmit={handleSubmit} layout='horizontal' className='login-form'>
            <Field type='text' name='username' label='用户名' size='default' style={{width: '100%'}}
              labelCol={{'span': 6}} wrapperCol={{'span': 18}}
              component={TextField} placeholder='请输入您的学号或工号' />
            <Field type='password' name='password' label='密码' size='default' style={{width: '100%'}}
              labelCol={{'span': 6}} wrapperCol={{'span': 18, 'offset': 0}}
              component={TextField} placeholder='请输入您的学号或工号' />
            <div>
              <Button type='primary' htmlType='submit' className='login-form-button'>登录</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
  pristine: PropTypes.bool
}

export default reduxForm({
  form: 'login',
  validate
})(LoginForm)
