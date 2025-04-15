
export interface FormData {
  name: string;
  email: string;
  company: string;
  requirements: string;
  file: File | null;
}

export interface FormErrors {
  [key: string]: string;
}
