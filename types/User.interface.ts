export interface User {
  id: string;
  name: string;
  first_surname: string;
  second_surname: string | null;
  email: string;
  password: string;
  user_role: string;
  profile_id: string;
}