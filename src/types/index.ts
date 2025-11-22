export interface Order {
orderdate: string;
customerid: string;
companyname: string;
employeeid: number;
employeename: string;
orderamount: number;
}
export interface Customer {
  customerid: string;
  companyname: string;
  contactname: string;
  contacttitle: string;
  address: string;
  city: string;
  region: string | null;
  postalcode: string | null;
  country: string | null;
  phone: string | null;
  fax: string | null;
}
export interface Paginated<T> {
  content: T[];
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
}
export interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}
