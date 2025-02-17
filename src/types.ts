type firstName = string;
type lastName = string;
type email = string;
type password = string;
type birthDate = string;
type lastConnection = string;
type role = string;

export interface User {
  firstName: firstName;
  lastName: lastName;
  email: email;
  password: password;
  birthDate: birthDate;
  lastConnection: lastConnection;
  role: role;
}
