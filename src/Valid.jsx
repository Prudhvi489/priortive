import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
export const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8,"password should atleast 8 char").max(32).required(),
  });