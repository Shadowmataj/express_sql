type firstName = string;
type lastName = string;
type email = string;
type password = string;
type birthDate = string;
type lastConnection = string;
type role = string;

export class User {
  userId: number;
  firstName: firstName;
  lastName: lastName;
  email: email;
  password: password;
  birthDate: birthDate;
  lastConnection: lastConnection;
  role: role;

  constructor(
    userId: number = 0,
    firstName: firstName = "Pepe",
    lastName: lastName = "Pecas",
    email: email = "pepe@gmail.com",
    password: password = "test1234",
    birthDate: birthDate = "1999-02-24",
    lastConnection: lastConnection = "2021-02-24",
    role: role= "user"
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.birthDate = birthDate;
    this.lastConnection = lastConnection;
    this.role = role;
  }
}

export class Photo {
  photoId: number;
  title: string;
  thumbnail: string;
  alt: string;
  cloudinaryPublicId: string;

  constructor(
    PhotoId: number,
    title: string,
    thumbnail: string,
    alt: string,
    cloudinaryPublicId: string
  ) {
    this.photoId = PhotoId;
    this.title = title;
    this.thumbnail = thumbnail;
    this.alt = alt;
    this.cloudinaryPublicId = cloudinaryPublicId;
  }
}
