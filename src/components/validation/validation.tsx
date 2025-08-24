import * as yup from 'yup';
import { countryList } from '../../helpers/countries';

const allCountries = countryList;

export const schema = yup.object().shape({
  formType: yup.mixed<'controlled' | 'uncontrolled'>().required(),
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z].*/, 'Name must start with an uppercase letter'),
  age: yup
    .number()
    .required('Age is required')
    .min(0, 'Age cannot be negative')
    .typeError('Age must be a number'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[^a-zA-Z0-9]/, 'Must contain at least one special character'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Please select your gender'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms and Conditions')
    .required('You must accept the Terms and Conditions'),
  country: yup
    .string()
    .required('Country is required')
    .oneOf(allCountries, 'Please select a country'),
});
