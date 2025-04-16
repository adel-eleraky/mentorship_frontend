import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import './ReviewMentor.CSS'
import { getUserSessions } from '../../rtk/features/userSlice';

function ReviewMentor({ mentor }) {

  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', isError: false });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(state => state.auth)
  const { sessions } = useSelector((state) => state.user);
  const [hasBooked, setHasBooked] = useState(false);

  console.log("has booked", hasBooked)
  const [formData, setFormData] = useState({
    user: user?._id || '',
    rating: '',
    mentor: mentor,
    content: '',
  });


  useEffect(() => {
    dispatch(getUserSessions());
  }, [user]);

  useEffect(() => {
    if (user && sessions?.length > 0) {
      const isBooked = sessions.some(
        (session) =>

          session.session?.mentor == mentor &&
          session.user?._id === user._id
      );
      setHasBooked(isBooked);
    }
  }, [user, mentor, sessions]);

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  };
  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toTimeString().split(" ")[0];
  };


  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/reviews/mentor/${mentor}`
      );
      setReviews(response.data.data);
      console.log("Reviews" + response.data.data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };



  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      user: user?._id || '',
      mentor: mentor,
    }));
    fetchReviews();


  }, [user, mentor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ message: '', isError: false });

    try {
      const response = await axios.post('http://localhost:3000/api/v1/reviews/', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = response.data;

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(data.message || 'Something went wrong');
      }

      setFeedback({
        message: 'Review submitted successfully!',
        isError: false,
      });

      setFormData({
        user: user?._id || '',
        rating: '',
        mentor: mentor || '',
        content: '',
      });
      await fetchReviews();

      setIsSubmitting(false);

    } catch (error) {
      setFeedback({
        message: error.message,
        isError: true,
      });
      setIsSubmitting(false);

    }

  };

  return (
    <>

      <div className="container  mt-5">
        <h3 className="mx-3 fw-medium second-color ">Reviews :</h3>
        <div className="">
          {reviews.length === 0 ? (
            <p>No Reviews yet</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="card mb-4 border-0 border-bottom">
                <div className="card-body pb-0">
                  <div className="row mb-1">
                    <div className="col">
                      <div>

                      </div>
                      <div className="d-flex justify-content-between align-items-start">

                        <div>


                          <h5 className="mb-0 second-color">
                            <img
                              src={`http://localhost:3000/img/users/${review.user?.image}`}
                              alt={user?.name}
                              className="border-4 border-white rounded-circle shadow-md object-cover bg-white me-2"
                              style={{ width: '40px' }}
                            />
                            {review?.user?.name}
                          </h5>
                          <p className="mb-0">{review?.user?.email}</p>
                          <div className=" mb-0">
                            {[...Array(review.rating)].map((_, i) => (
                              <i
                                key={i}
                                className="bi bi-star-fill st-r me-1 frist-color"
                              ></i>
                            ))}
                            <span className="text-muted">
                              {" "}
                              {review?.rating} out of 5 stars{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex ">
                    <p className="card-text ms-0 mx-3">{review?.content}</p>
                    <span className="text-muted">
                      {formatDate(review?.createdAt)} at   <span className='second-color'>{formatTime(review?.createdAt)}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>




      <div className="container mb-4">
        {user && hasBooked && user._id !== mentor && (
          <div className="">
            <form onSubmit={handleSubmit}>
              <div className='revcon '>
                <textarea
                  className="form-control d-inline"
                  id="content"
                  name="content"
                  rows="1"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  placeholder="Share your experience with this mentor"
                ></textarea>
                <button type="submit" className=" revbtn d-inline " disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Send Review'}
                </button>
              </div>
              <div className='d-flex justify-content-center align-items-center'>
                <div className="rating">
                  <input type="radio" id="star5" name="rating"
                    defaultValue={5}
                    checked={formData.rating === 5}
                    onChange={handleChange}
                  />
                  <label htmlFor="star5" />
                  <input type="radio" id="star4" name="rating"
                    defaultValue={4}
                    checked={formData.rating === 4}
                    onChange={handleChange}
                  />
                  <label htmlFor="star4" />
                  <input type="radio" id="star3" name="rating"
                    checked={formData.rating === 3}
                    onChange={handleChange}
                    defaultValue={3} />
                  <label htmlFor="star3" />
                  <input type="radio" id="star2" name="rating"
                    checked={formData.rating === 2}
                    onChange={handleChange}
                    defaultValue={2} />
                  <label htmlFor="star2" />
                  <input type="radio" id="star1" name="rating"
                    checked={formData.rating === 1}
                    onChange={handleChange}
                    defaultValue={1} />
                  <label htmlFor="star1" />
                </div>
              </div>


            </form>
          </div>
        )}
      </div>


    </>


  );
}

export default ReviewMentor;
