import React,{useState, useEffect} from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout/index";
import Input from "../../components/UI/Input/index";
import {login} from '../../actions/index';
import {useDispatch,useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import  {isUserLoggedIn} from '../../actions/auth.action'

export default function Signin() {

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth)



  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault()
    const user = {
      email ,
      password
    }

    dispatch(login(user));


  }

  if(auth.authenticate){
    return <Redirect to={`/`} />
  }


  return (
    <>
      <Layout>
        <Container>
          <Row className="mt-5">
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userLogin}>
                <Input
                  label="email"
                  placeholder="Enter your email"
                  value={email}
                  type="email"
                  onChange={(e) => { setEmail(e.target.value)}}
                />

                <Input
                  label="password"
                  placeholder="Enter your password"
                  value={password}
                  type="password"
                  onChange={(e) => {setPassword(e.target.value)}}
                />

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}
