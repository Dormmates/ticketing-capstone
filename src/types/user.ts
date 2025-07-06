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
    distributorTypeId: number;
  }[];

  department: {
    departmentId: string;
    name: string;
  }[];
}
