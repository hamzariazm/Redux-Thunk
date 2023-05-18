import { Field, Form, Formik, ErrorMessage } from "formik"
import * as Yup from 'yup'

const LoginForm = () => {
    const inititalValues = { 
        firstName: '',
        lastName: '',
        email: ''
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required('first name is required'),
        lastName: Yup.string().required('lastname is required'),
        email: Yup.string().email('invalid email format').required('email is required')
    })
    
    const handleSubmit = (values) => {
        alert("name: " + values.firstName + " " + values.lastName + "\nEmail: " + values.email)
    }

    return(
        <Formik initialValues={inititalValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" type="text" />
                <ErrorMessage name="firstName" />
                <br />
        
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" type="text" />
                <ErrorMessage name="lastName" />
                <br />
        
                <label htmlFor="email">Email Address</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" />
                <br />
        
                <button type="submit">Submit</button>

            </Form>
        </Formik>
    )
}

export default LoginForm;