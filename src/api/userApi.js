import axiosClient from "./axiosClient";

const userApi = {
  // neu co params
  //   getAll: (params) => {
  //     const url = "/Product";
  //     return axiosClient.get(url, { params });
  //   },
  getAll: () => {
    const url = "/User";
    return axiosClient.get(url);
  },
  getDetail: (slug) => {
    const url = `/User/${slug}`;
    return axiosClient.get(url);
  },
  getProductByCate: (slug) => {
    const url = `/${slug}`;
    return axiosClient.get(url);
  },
};

export default userApi;
