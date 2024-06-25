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

const getCategory = () => {
  return axiosClient.get("categories?populate=*")
}
// Category
// doctorlist
const getDoctorList = () => axiosClient.get("/doctors?populate=*")
// doctorlist by category
const getDoctorByCategory = (category) =>
  axiosClient.get(
    `/doctors?filters[categories][Name][$in]=${category}&populate=*`
  )

// service list :
const getServiceList = () => axiosClient.get("/services?populate=*")
// Contact list
const getContactList = () => axiosClient.get("/contacts?populate=*")

export default {
  // getCategory,
  // getDoctorList,
  // getDoctorByCategory,
  getServiceList,
  getContactList,
}
