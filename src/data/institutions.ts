export interface Institution {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  city: string;
  district: string;
  symbol: string;
  specialTrait: string;
  specialTraitHe: string;
  isMixed: boolean;
  phone: string;
  email: string;
  address: string;
  principal: string;
  inspector: string;
  specialEd: string;
  continuity: string;
  parentsCommittee: string[];
  about: string;
  website?: string;
  waze: string;
  maps: string;
  rama: string;
  registration: string;
  logo?: string;
  gender?: string;
  stage?: string;
}

export const institutionsList: Institution[] = [];
