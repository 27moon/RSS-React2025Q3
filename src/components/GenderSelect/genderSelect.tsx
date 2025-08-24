type GenderSelectProps = {
  error?: string;
};

export function GenderSelect({ error }: GenderSelectProps) {
  return (
    <>
      <label htmlFor="gender">Gender: </label>
      <select id="gender" name="gender">
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <span className="error">{error || ''}</span>
    </>
  );
}
