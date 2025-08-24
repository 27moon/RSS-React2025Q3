type GenderSelectRHFProps = {
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  error?: string;
};

export function GenderSelectRHF({
  value,
  onChange,
  onBlur,
  error,
}: GenderSelectRHFProps) {
  return (
    <>
      <label htmlFor="gender">Gender: </label>
      <select
        id="gender"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      >
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <span className="error">{error || ''}</span>
    </>
  );
}
