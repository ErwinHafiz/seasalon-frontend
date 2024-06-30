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

// service-times

// Test buat reservasi nu

const getServiceTimes = () => axiosClient.get("/service-times?populate=*")
// Test buat reservasi end

// Contact list
const getContactList = () => axiosClient.get("/contacts?populate=*")

// get komentar :
const getReviews = () => axiosClient.get("/comentars?populate=*")

// post komentar :
const postReviews = (data) => axiosClient.post("/comentars", data)

// post reservation :
const postReservation = (data) => axiosClient.post("/reservations", data)
const updateTimeSlotStatus = (timeSlotId, data) => {
  return axiosClient.put(`/service-times/${timeSlotId}`, data)
}

// get user reservation
const getUserReservation = (userId) =>
  axiosClient.get(
    "/reservations?[filters][user_id][$eq]=" +
      userId +
      "&populate[service][populate][image][populate][0]=url&populate=*"
  )
const getTimebyService = (service) => axiosClient.get("/service-times")
const getReservationsByDate = (date) => {
  axiosClient.get(`${API_URL}/reservations?date=${date}`)
}

const getReservationsByServiceAndTime = (serviceId, date, time) => {
  return axiosClient.get("/reservations", {
    params: {
      "filters[service][id][$eq]": serviceId,
      "filters[date][$eq]": date,
      "filters[time][$eq]": time,
    },
  })
}

export default {
  // getCategory,
  // getDoctorList,
  // getDoctorByCategory,
  getServiceList,
  getServiceById,
  getContactList,
  postReviews,
  getReviews,
  postReservation,
  getReservationsByServiceAndTime,
  getServiceTimes,
  updateTimeSlotStatus,
  getUserReservation,
  getReservationsByDate,
  //
}
