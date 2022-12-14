export interface IClientCreate {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  registerDate: Date;
}

export interface IClientUpdate {
  name?: string;
  email?: string;
  mobileNumber?: string;
}
