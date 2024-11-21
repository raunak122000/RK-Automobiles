// we did not integrated due to errors



// import React, { useState } from 'react';
// import axios from 'axios';

// const ReviewForm = () => {
//   const [newReview, setNewReview] = useState({ rating: '', comment: '' });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewReview({ ...newReview, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/reviews', newReview); // Adjust the API endpoint
//       setNewReview({ rating: '', comment: '' });
//       // Optionally, you can call a function to refresh the reviews after adding a new one
//     } catch (error) {
//       console.error('Error adding review:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Review</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Rating:</label>
//           <input type="number" name="rating" value={newReview.rating} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Comment:</label>
//           <textarea name="comment" value={newReview.comment} onChange={handleChange} />
//         </div>
//         <button type="submit">Submit Review</button>
//       </form>
//     </div>
//   );
// };

// export default ReviewForm;
