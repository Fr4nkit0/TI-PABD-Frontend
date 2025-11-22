export type Customer = {
  customerid: string;
  companyname: string;
  contactname: string;
  contacttitle: string;
  address: string;
  city: string;
  region?: string | null;
  postalcode?: string | null;
  country?: string | null;
  phone?: string | null;
  fax?: string | null;
};