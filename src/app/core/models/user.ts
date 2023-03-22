export class User {
  id: string | null = "";
  email: string = "";
  setTempPassword: boolean = true;
  username: string | null = "";
  firstname: string | null = "";
  lastname: string | null = "";
  mobile: string = "";
  location: string = "";
  country: string = "";
  roles: any = {
    "role" : []
  };
  password: string = "";
  attributes: any = {
    "mobile": [],
    "location": [],
    "country": [],
    "gender": ["male"],
    "birthday": [],
  };
  userEnabled: boolean = true;
}
