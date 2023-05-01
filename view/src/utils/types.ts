import { Dispatch, ReactElement, SetStateAction } from "react";

export interface MenProducts {
  _id: string;
  heading: string;
  title: string;
  discount_price: number;
  original_price: number;
  image: string;
  discount: number;
  offer: string;
  availability: string;
  category: string;
  visible: boolean;
}

export interface KidProducts {
  _id: string;
  heading: string;
  title: string;
  discount_price: number;
  original_price: number;
  image: string;
  discount: number;
  offer: string;
  availability: string;
  category: string;
  gender: string;
  rating: number;
  visible: boolean;
}

export interface ElectronicProducts {
  _id: string;
  title: string;
  discount_price: number;
  original_price: number;
  image: string;
  discount: number;
  offer: string;
  processor: string;
  battery_life: string;
  warranty: string;
  features: string;
  total_ratings: string;
  reviews: string;
  visible: boolean;
  availability: string;
  category: string;
  rating: number;
}

export interface AdminData {
  name: string;
  email: string;
  number: number;
  password: string;
}
export interface WomenProducts {
  color: string;
  _id: string;
  heading: string;
  title: string;
  discount_price: number;
  original_price: number;
  visible: boolean;
  image: string;
  discount: number;
  offer: string;
  availability: string;
  category: string;
}
export interface Cart {
  _id: number;
  qunatity: number;
  title: string;
  image: string;
  discount_price: number;
}
export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  email: string;
  password: string;
  error: string;
  loading: boolean;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface StatsCardProps {
  title: string;
  stat: string;
}

export interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}
