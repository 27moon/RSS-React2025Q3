import './input.css';
type InputProps = {
  label?: string;
  name?: string;
  type?: string;
  error?: string;
  value?: string;
  style?: React.CSSProperties;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
  label,
  type,
  error,
  style,
  name,
  ...rest
}: InputProps) {
  return (
    <div className="input-container" style={style}>
      <label htmlFor={name} style={{ width: '200px' }}>
        {label}:{' '}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        autoComplete="off"
        {...rest}
      ></input>
      <span className="error">{error || ''}</span>
    </div>
  );
}
