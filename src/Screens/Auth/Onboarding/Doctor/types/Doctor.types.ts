
export interface IDoctor {
  name: string;
  email: string;
  password: string;
  mobile: string;
  age:string,
  address: string;
  gender: "Male" | "Female" | "Other",
  aadhaarNumber: string,
  nmrNumber: string,
  specializationCertificates: File[],
  qualifications: string;
  profilePhoto: File,
  experience: string;
  workingAt: string;
  post: string;
}