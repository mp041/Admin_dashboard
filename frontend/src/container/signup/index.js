import React,{useState} from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout/index";
import Input from "../../components/UI/Input/index";
import {Redirect } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {signup} from '../../actions';

export default function Signup() {

  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);

  if(auth.authenticate){
    return <Redirect to={`/`} />
  }
  const userSubmit = (e) => {
      e.preventDefault();

      const user = {
        firstName,lastName,email, password
      }

      dispatch(signup(user))
  }
  if (user.loading) {
    return <p>Loading...!</p>;
  }

  return (
    <>
      <Layout>
        <Container>
          {user.message}
          <Row className="mt-5">
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userSubmit}>
                <Row>
                  <Col md={6}>
                  <Input
                      label= "First Name"
                      placeholder = "Enter your first name"
                      value = {firstName}
                      type="text"
                      onChange={(e) => { setFirstName(e.target.value)}}
                  />
                  </Col>

                  <Col md={6}>
                  <Input
                      label= "Last Name"
                      placeholder = "Enter your Last name"
                      value = {lastName}
                      type="text"
                      onChange={(e) => {setLastName(e.target.value)}}
                  />
                  </Col>
                </Row>

                <Input
                    label= "email"
                    placeholder = "Enter your email"
                    value = {email}
                    type="email"
                    onChange={(e) => { setEmail(e.target.value)}}
                />

                <Input
                    label= "password"
                    placeholder = "Enter your password"
                    value = {password}
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
