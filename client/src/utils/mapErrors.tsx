import { FieldError } from '../generated/graphql'

// reshape error for formik setError function
export const mapErrors = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {}
    errors.forEach(({field, message}) =>{
      errorMap[field] = message
    })

    return errorMap
}