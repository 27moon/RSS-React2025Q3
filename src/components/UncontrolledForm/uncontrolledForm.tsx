import { useRef, useState } from 'react';
import { CountriesSelect } from '../CountriesSelect/countriesSelect';
import { GenderSelect } from '../GenderSelect/genderSelect';
import { Input } from '../Input/input';
import { PasswordInput } from '../PasswordInput/passwordInput';
import { schema } from '../validation/validation';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { saveFormData, type MyFormData } from '../../store/formDataSlice';

type Props = {
  onClose: () => void;
};

export function UncontrolledForm({ onClose }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const dataFormObject = Object.fromEntries(formData.entries());

    const dataStore: MyFormData = {
      formType: 'uncontrolled',
      name: String(dataFormObject.name ?? ''),
      age: Number(dataFormObject.age ?? NaN),
      email: String(dataFormObject.email ?? ''),
      password: String(dataFormObject.password ?? ''),
      confirmPassword: String(dataFormObject.confirmPassword ?? ''),
      gender: String(dataFormObject.gender ?? ''),
      terms: dataFormObject.terms === 'on',
      country: String(dataFormObject.country ?? ''),
    };

    dataFormObject.formType = 'uncontrolled';

    try {
      await schema.validate(dataStore, { abortEarly: false });
      setErrors({});
      dispatch(saveFormData(dataStore));

      onClose();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const formErrors: Record<string, string> = {};

        error.inner.forEach((error) => {
          if (error.path) formErrors[error.path] = error.message;
        });

        setErrors(formErrors);
      }
    }
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <h3>Uncontrolled Form</h3>
        <Input label="Name" type="text" name="name" error={errors.name} />
        <Input label="Age" type="number" name="age" error={errors.age} />
        <Input label="Email" type="email" name="email" error={errors.email} />
        <PasswordInput
          weakPasswordError={errors.password}
          confirmPasswordError={errors.confirmPassword}
        />
        <GenderSelect error={errors.gender} />
        <Input
          label="accept Terms and Conditions agreement"
          type="checkbox"
          style={{ flexDirection: 'row', marginTop: '1rem' }}
          name="terms"
          error={errors.terms}
        />
        <CountriesSelect error={errors.country} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
