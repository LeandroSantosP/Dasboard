import { address } from "../../shared/services/LoginAndRegister";

export interface RegisterServicesForms {
   email: string;
   password: string;
   telephone: number;
   address: address;
};

export interface RegisterProps {
   handleLogin: () => void;
}
