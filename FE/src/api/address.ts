import instance from "./instance";
const api = "https://toinh-api-tinh-thanh.onrender.com";
const apiEndpointProvince = api + "/province";
const apiEndpointDistrict = api + "/district/?idProvince=";
const apiEndpointCommune = api + "/commune/?idDistrict=";
export function getProvince() {
  const province = instance.get(apiEndpointProvince);
  return province;
}
export function getDistrict(idProvince: string | number) {
  const district = instance.get(apiEndpointDistrict + idProvince);
  return district;
}

export function getCommune(idDistrict: string | number) {
  const commune = instance.get(apiEndpointCommune + idDistrict);
  return commune;
}
