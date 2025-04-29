
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  title: string;
  company: string;
  description: string;
  file: File | null;
}

export interface FormErrors {
  [key: string]: string;
}
