
import { FormData, FormErrors } from '../types/form-types';

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};
  
  if (!formData.name.trim()) errors.name = 'Name is required';
  if (!formData.email.trim()) errors.email = 'Email is required';
  else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = 'Email is invalid';
  }
  if (!formData.requirements.trim()) errors.requirements = 'Please describe your project requirements';
  
  return errors;
};
