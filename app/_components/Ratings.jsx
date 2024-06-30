"use client"
import React, { useEffect, useState } from "react"
import { Rating } from "@smastrom/react-rating"
import { Button } from "@/components/ui/button"
import "@smastrom/react-rating/style.css"
import GlobalApi from "../_utils/GlobalApi"
import { toast } from "sonner"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function Ratings() {
  const [state, setState] = useState({
    name: "",
    review: "",
    rating: 3,
  })

  const [reviews, setReviews] = useState([])

  useEffect(() => {
    getReviewList()
  }, [])

  const getReviewList = () => {
    GlobalApi.getReviews()
      .then((resp) => {
        const reviewData = resp.data.data.map((item) => ({
          id: item.id,
          name: item.attributes.name,
          rating: item.attributes.stars,
          review: item.attributes.text,
        }))
        setReviews(reviewData)
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error)
      })
  }

  function handleRatingChange(selectedValue) {
    setState((prevState) => ({
      ...prevState,
      rating: selectedValue,
    }))
  }

  function handleInputChange(event) {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const newReview = {
      name: state.name,
      review: state.review,
      rating: state.rating,
    }

    const data = {
      data: {
        name: newReview.name,
        stars: newReview.rating,
        text: newReview.review,
      },
    }

    try {
      const resp = await GlobalApi.postReviews(data)
      if (resp) {
        const createdReview = {
          id: resp.data.data.id,
          name: resp.data.data.attributes.name,
          rating: resp.data.data.attributes.stars,
          review: resp.data.data.attributes.text,
        }
        setReviews((prevReviews) => [...prevReviews, createdReview])
        setState({
          name: "",
          review: "",
          rating: 3,
        })
        toast("The review was added successfully")
      }
    } catch (error) {
      console.error("Error posting review:", error)
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="bg-white  mb-10 mx-auto w-screen mt-5">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-center">Rate Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Pelanggan
            </label>
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-800 hover:border-pink-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Star/Ratings
            </label>
            <Rating
              style={{ maxWidth: 200 }}
              value={state.rating}
              onChange={handleRatingChange}
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              Komentar
            </label>
            <input
              name="review"
              value={state.review}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-800 hover:border-pink-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border-neutral-900 border-[1px] shadow-sm text-sm font-medium rounded-md bg-pink-800 hover:bg-transparent hover:text-slate-950"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div className="mt-8 object-cover">
        {reviews.length > 3 ? (
          <Slider
            {...settings}
            className="bg-gradient-to-l from-rose-100 to-pink-100 w-screen  p-10 mx-auto "
          >
            {reviews.map((rev, index) => (
              <div
                key={index}
                className="p-2  rounded-lg bg-gradient-to-bl from-slate-300 border-[1px] to-gray-300 gap-4  object-cover w-screen"
              >
                <p className="text-lg font-medium text-gray-800">
                  Nama: {rev.name}
                </p>
                <div className="flex items-center mt-2 m">
                  <p className="text-lg font-medium text-gray-800 mr-2">
                    Rating:
                  </p>
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={rev.rating}
                    readOnly
                    className="p-2"
                  />
                </div>
                <p className="mt-2 text-gray-800 font-medium">
                  Komentar: {rev.review}
                </p>
              </div>
            ))}
          </Slider>
        ) : (
          reviews.map((rev, index) => (
            <div
              key={index}
              className="p-4 mt-4 border rounded-lg bg-gray-50 gap-4 mr-2 object-cover"
            >
              <p className="text-lg font-medium text-gray-800">
                Nama: {rev.name}
              </p>
              <div className="flex items-center mt-2">
                <p className="text-lg font-medium text-gray-800 mr-2">
                  Rating:
                </p>
                <Rating style={{ maxWidth: 100 }} value={rev.rating} readOnly />
              </div>
              <p className="mt-2 text-gray-700">Komentar: {rev.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Ratings
