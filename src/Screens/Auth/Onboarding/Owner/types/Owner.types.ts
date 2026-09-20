export interface IOwner {
  name: string;
  email: string;
  password: string;
  mobile: string;
  address: string;
  aadhaarNumber:string,
  photo:File |null;
  gender: string,
}