import type { UseFormRegister } from 'react-hook-form';
import type { MyFormData } from '../../store/formDataSlice';

type InputProps = {
  weakPasswordError?: string;
  confirmPasswordError?: string;
  register?: UseFormRegister<MyFormData>;
};

export function PasswordInput({
  weakPasswordError,
  confirmPasswordError,
  register,
}: InputProps) {
  return (
    <>
      <div className="input-container">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          {...(register ? register('password') : { name: 'password' })}
        ></input>
        <span className="error">{weakPasswordError || ''}</span>

        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input
          type="password"
          id="confirmPassword"
          autoComplete="off"
          {...(register
            ? register('confirmPassword')
            : { name: 'confirmPassword' })}
        ></input>
        <span className="error">{confirmPasswordError || ''}</span>
      </div>
    </>
  );
}
