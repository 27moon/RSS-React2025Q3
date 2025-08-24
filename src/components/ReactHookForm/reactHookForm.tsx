import { useDispatch } from 'react-redux';
import { Input } from '../Input/input';
import { PasswordInput } from '../PasswordInput/passwordInput';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { saveFormData, type MyFormData } from '../../store/formDataSlice';
import { schema } from '../validation/validation';
import { CountriesSelectControlled } from '../CountriesSelect/countriesSelectControlled';
import { GenderSelectRHF } from '../GenderSelect/genderSelectRH';

type Props = {
  onClose: () => void;
};

export function ReactHookForm({ onClose }: Props) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<MyFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      formType: 'controlled',
      name: '',
      age: undefined,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      terms: false,
      country: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: MyFormData) => {
    dispatch(saveFormData({ ...data, formType: 'controlled' }));
    reset();
    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>React Hook Form</h3>
        <Input
          label="Name"
          type="text"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="Age"
          type="number"
          {...register('age')}
          error={errors.age?.message}
        />
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <PasswordInput
          register={register}
          weakPasswordError={errors.password?.message}
          confirmPasswordError={errors.confirmPassword?.message}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <GenderSelectRHF
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.gender?.message}
            />
          )}
        />
        <Input
          label="accept Terms and Conditions agreement"
          type="checkbox"
          {...register('terms')}
          style={{ flexDirection: 'row', marginTop: '1rem' }}
          error={errors.terms?.message}
        />

        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <CountriesSelectControlled
              {...field}
              error={errors.country?.message}
            />
          )}
        />
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </>
  );
}
