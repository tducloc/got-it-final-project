import authHeader from "./auth-header.service";

const API_URL = `${process.env.REACT_APP_URL}/users/me`;

const UserService = {
  getUserInfo() {
    return fetch(API_URL, {
      method: "GET",
      headers: {
        ...authHeader(),
        " Content-Type": "application/json",
      },
    });
  },
};
export default UserService;
