export interface User{
  name: string;
  email: string;
  password:string;
  phone: number;
  confirmPassword: string;
}

export interface Validation{
  email: string;
  password: string;
}