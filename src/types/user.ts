export type UserRole = "none" | "head" | "trainer";

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface Distributor extends User {
  contactNumber: string;
  departmentId: string | null;
  distributorTypeId: number;
}
