import instance from "../config/instance";
// const api1 = "https://toinh-api-tinh-thanh.onrender.com";
const api2 = "https://api-tinh-thanh-git-main-toiyours-projects.vercel.app";
const endpointProvince = "/province";
const endpointDistrict = "/district/?idProvince=";
const endpointCommune = "/commune/?idDistrict=";
export function getProvince() {
  const province = instance.get(api2 + endpointProvince);
  return province;
}
export function getDistrict(idProvince: string | number) {
  const district = instance.get(api2 + endpointDistrict + idProvince);
  return district;
}

export function getCommune(idDistrict: string | number) {
  const commune = instance.get(api2 + endpointCommune + idDistrict);
  return commune;
}
