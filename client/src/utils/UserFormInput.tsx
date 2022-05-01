import { useField } from 'formik'
import React from 'react'
import { Col, FormControl, FormLabel, Row } from 'react-bootstrap'

interface UserFormInputProps {
  label: string
  name: string
  type: string
}

export const UserFormInput: React.FC<UserFormInputProps> = ({
  label,
  ...props
}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)
  return (
    <Col>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <FormControl {...field} {...props} name={props.name} type={props.type} />
      {meta.touched && meta.error ? (
        <div className='text-danger text-end'>{meta.error}</div>
      ) : null}
    </Col>
  )
}
