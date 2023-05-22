import { Field, Form, Formik, ErrorMessage } from "formik"
import * as Yup from 'yup'

const LoanForm = () => {

    const initialValues = {
        loanType: "",
        amount: "",
        downPayment: ""
    }

    const validationSchema = Yup.object({
        loanType: Yup.string().typeError("You must select a loan").required(),
        amount: Yup.number().when("loanType", {
            is: "mortgage",
            then: (schema) => schema.min(15000).max(30000).required(),
            otherwise: (schema) => schema.max(5000).required()
        }),
        downPayment: Yup.number().typeError("You must specify a number").required()
    })

    const handleSubmit = (values) => {
        alert("Loan amount: " + values.amount + "\nLoan Type:" + values.loanType + "\nDown Payment:" + values.downPayment);
    }

    return(
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <label htmlFor="loanType">Select a loan type</label>
                    <Field name="loanType" component="select">
                        <option value="loan">Loan</option>
                        <option value="mortgage">Mortgage</option>
                   </Field>
                    <ErrorMessage name="loanType" />
                    <br />
            
                    <label htmlFor="amount">Amount</label>
                    <Field name="amount" type="number" />
                    <ErrorMessage name="amount" />
                    <br />
            
                    <label htmlFor="downPayment">Down Payment %</label>
                    <Field name="downPayment" type="number" />
                    <ErrorMessage name="downPayment" />
                    <br />
            
                    <button type="submit">Submit</button>

                </Form>
            </Formik>
        </div>
    )
}

export default LoanForm;