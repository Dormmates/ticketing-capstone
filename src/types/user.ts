import type { Department } from "./department";

export type UserRole = "distributor" | "head" | "trainer";

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;

  distributor: {
    contactNumber: string;
    department: { name: string; departmentId: string };
    distributortypes: { id: number; name: string };
  }[];

  department: Department[];
}
