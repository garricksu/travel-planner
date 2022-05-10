import { Formik } from 'formik'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { useRegisterUserMutation } from '../generated/graphql'
import { mapErrors } from '../utils/mapErrors'
import { UserFormInput } from '../utils/UserFormInput'

export const Register = () => {
  const [register] = useRegisterUserMutation()
  return (
    <Container>
      <h1>Register</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          password: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('Required'),
          lastName: Yup.string().required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          username: Yup.string().required('Required'),
          password: Yup.string().required('Required'),
        })}
        onSubmit={async (values, { setErrors }) => {
          console.log(values)
          const response = await register({
            variables: { input: values },
          })
          if (response.data?.register.errors) {
            setErrors(mapErrors(response.data?.register.errors))
          }
        }}
      >
        {(formik) => (
          <Form className='user-form' onSubmit={formik.handleSubmit}>
            <Row></Row>
            <Row className='mb-3'>
              <UserFormInput label='First name' name='firstName' type='text' />
              <UserFormInput label='Last name' name='lastName' type='text' />
            </Row>
            <Row className='mb-3'>
              <UserFormInput label='Email' name='email' type='text' />
            </Row>
            <Row className='mb-3'>
              <UserFormInput label='Username' name='username' type='text' />
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
