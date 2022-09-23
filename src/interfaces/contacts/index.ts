export interface IContactCreate {
  name: string;
  email: string;
  mobileNumber: string;
}

export interface IContactUpdate {
  name?: string;
  email?: string;
  mobileNumber?: string;
}
