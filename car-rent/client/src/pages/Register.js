import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from "../redux/actions/userActions";
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css'; 


AOS.init();

function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alertsReducer);


  function onFinish(values) {
    dispatch(userRegister(values));
  }

  const validatePassword = (_, value) => {
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Password must contain at least one special character'));
  };

  return (
    <div className="login">
      {loading && (<Spinner />)}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img 
            className='w-100'
            data-aos='slide-left'
            data-aos-duration='1500'
            src="https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Background"
          />
          <h1 className="login-logo" data-aos='slide-right'>CAR HIVE</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form layout="vertical" className="login-form p-5" onFinish={onFinish}>
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { 
                  required: true, 
                  message: 'Please enter your password' 
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters long',
                },
                {
                  validator: validatePassword,
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="Confirm Password"
              rules={[
                { 
                  required: true, 
                  message: 'Please confirm your password' 
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <button className="btn1 mt-2 mb-3">Register</button>
            <br />
            <Link to="/login">Click Here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
