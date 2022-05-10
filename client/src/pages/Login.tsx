import { Formik } from 'formik'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { useLoginUserMutation } from '../generated/graphql'
import { mapErrors } from '../utils/mapErrors'
import { UserFormInput } from '../utils/UserFormInput'

export const Login = () => {
  const [login] = useLoginUserMutation()
  return (
    <Container>
      <h1>Login</h1>
      <Formik
        initialValues={{
          usernameOrEmail: '',
          password: '',
        }}
        validationSchema={Yup.object({
          usernameOrEmail: Yup.string().required('Required'),
          password: Yup.string().required('Required'),
        })}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: { input: values },
          })
          if (response.data?.login.errors) {
            setErrors(mapErrors(response.data?.login.errors))
          }
        }}
      >
        {(formik) => (
          <Form className='user-form' onSubmit={formik.handleSubmit}>
            <Row></Row>
            <Row className='mb-3'>
              <UserFormInput
                label='Username or Email'
                name='usernameOrEmail'
                type='text'
              />
            </Row>
            <Row className='mb-3'>
              <UserFormInput label='Password' name='password' type='password' />
            </Row>
            <Row className='mb-3'>
              <Col>
                <Button type='submit'>Submit</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
