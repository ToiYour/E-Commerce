export interface IProvince {
  idProvince: string | number;
  name: string;
}
export interface IDistrict {
  idProvince: string | number;
  idDistrict: string | number;
  name: string;
}

export interface ICommune {
  idDistrict: string | number;
  idCommune: string | number;
  name: string;
}
