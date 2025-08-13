export interface User {
  _id: string;
  userName: string;
  email: string;
  isVerified: boolean;
  createdAt: string;  // Or Date, depending on usage
  updatedAt: string; 
  lastLogin: string; 
  __v: number;
}
