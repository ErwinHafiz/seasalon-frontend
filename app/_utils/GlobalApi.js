const { default: axios } = require("axios")

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY

if (!API_KEY) {
  console.error("API_KEY is not defined")
}
const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
})

// h Category
axiosClient.interceptors.request.use((request) => {
  console.log("Starting Request", request)
  return request
})
axiosClient.interceptors.response.use((response) => {
  console.log("Response:", response)
  return response
})

// h

const getDoctorByCategory = (category) =>
  axiosClient.get(
    `/doctors?filters[categories][Name][$in]=${category}&populate=*`
  )

// service list :
const getServiceList = () => axiosClient.get("/services?populate=*")
// one service list :
const getServiceById = (id) =>
  axiosClient.get("/services/" + id + "?populate=*")

// Contact list
const getContactList = () => axiosClient.get("/contacts?populate=*")

// get komentar :
const getReviews = () => axiosClient.get("/comentars?populate=*")

// post komentar :
const postReviews = (data) => axiosClient.post("/comentars", data)

export default {
  // getCategory,
  // getDoctorList,
  // getDoctorByCategory,
  getServiceList,
  getServiceById,
  getContactList,
  postReviews,
  getReviews,
}
