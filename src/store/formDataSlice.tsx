import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type MyFormData = {
  formType: 'controlled' | 'uncontrolled';
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  country: string;
};

type FormDataState = {
  data: MyFormData[];
};

const initialState: FormDataState = {
  data: [],
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    saveFormData: (state, action: PayloadAction<MyFormData>) => {
      state.data.push(action.payload);
    },
  },
});

export const { saveFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
