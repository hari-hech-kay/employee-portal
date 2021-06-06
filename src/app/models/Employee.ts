import { Role } from './Role';

export interface Employee {
  id: number;
  username: string;
  password: string;
  roles: Role[];
  firstName: string;
  lastName: string;
  salary: number;
  department: string;
  designation: string;
  email: string;
}
