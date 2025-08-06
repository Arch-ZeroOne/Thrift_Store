import axios from "axios";


function createClaims(uid, isSeller) {
  axios.post("http://localhost:3000/token", { id: uid, seller: isSeller });
}

export async function getRole(token) {
  return axios
    .post("http://localhost:3000/token/getRole", { token: token })
    .then((result) => {
      const { seller } = result.data;
      return seller;
    });
}

export default createClaims;
