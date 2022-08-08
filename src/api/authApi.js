import axiosClient from "./axiosClient";

const productApi = {
  // neu co params
  //   getAll: (params) => {
  //     const url = "/Product";
  //     return axiosClient.get(url, { params });
  //   },
  postLogin: (user) => {
    const url = "/auth/signin";
    const _user = user;

    return axiosClient.post(url, user);
  },
};

export default productApi;
