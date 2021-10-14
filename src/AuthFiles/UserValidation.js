import * as yup from 'yup';

// validates login input
export const loginValidate = yup.object({
    email: yup.string()
      .required(),
    password: yup.string()
      .required()
      .min(1)
});