import { Formik, useField } from 'formik'
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { useRegisterUserMutation } from '../generated/graphql'

// const UserFormInput = ({ label, ...props }) => {
//   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//   // which we can spread on <input>. We can use field meta to show an error
//   // message if the field is invalid and it has been touched (i.e. visited)
//   const [field, meta] = useField(props)
//   return (
//     <>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <input className='text-input' {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className='error'>{meta.error}</div>
//       ) : null}
//     </>
//   )
// }

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
        onSubmit={async (values) => {
          console.log(values)
          const result = await register({
            variables: { input: values },
          })
        }}
      >
        {(formik) => (
          <Form className='user-form' onSubmit={formik.handleSubmit}>
            <Row className='mb-3'>
              <Col>
                <Form.Label htmlFor='firstName'>First Name</Form.Label>
                <Form.Control
                  name='firstName'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
              </Col>
              <Col>
                <Form.Label htmlFor='lastName'>Last Name</Form.Label>
                <Form.Control
                  name='lastName'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col>
                <Form.Label htmlFor='username'>Username</Form.Label>
                <Form.Control
                  name='username'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col>
                <Form.Label htmlFor='email'>Email Address</Form.Label>
                <Form.Control
                  name='email'
                  type='email'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col>
                <Form.Label htmlFor='password'>Password</Form.Label>
                <Form.Control
                  name='password'
                  type='password'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </Col>
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
