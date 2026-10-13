import { useState } from "react";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [submittedName, setSubmittedName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!["1", "2", "3", "4", "5"].includes(rating)) {
      nextErrors.rating = "Please select a rating";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmittedName(name.trim());
    } else {
      setSubmittedName("");
    }
  }

  return (
    <main className="page">
      <section className="form-card">
        <h1>Course Feedback Form</h1>
        <p className="intro">Please share your feedback about the course.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name-input">Name</label>
            <input
              id="name-input"
              data-testid="name-input"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setSubmittedName("");
              }}
            />
            {errors.name && <p className="error" data-testid="name-error">{errors.name}</p>}
          </div>

          <div className="field">
            <label htmlFor="email-input">Email</label>
            <input
              id="email-input"
              data-testid="email-input"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSubmittedName("");
              }}
            />
            {errors.email && <p className="error" data-testid="email-error">{errors.email}</p>}
          </div>

          <div className="field">
            <label htmlFor="rating-select">Rating</label>
            <select
              id="rating-select"
              data-testid="rating-select"
              value={rating}
              onChange={(event) => {
                setRating(event.target.value);
                setSubmittedName("");
              }}
            >
              <option value="">Select rating</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={String(value)}>{value}</option>
              ))}
            </select>
            {errors.rating && <p className="error" data-testid="rating-error">{errors.rating}</p>}
          </div>

          <div className="field">
            <label htmlFor="comment-input">Comment (optional)</label>
            <textarea
              id="comment-input"
              data-testid="comment-input"
              maxLength={200}
              rows={4}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <p className="counter" data-testid="comment-count">{comment.length}/200</p>
          </div>

          <button data-testid="submit-btn" type="submit">Submit Feedback</button>
        </form>

        {submittedName && (
          <p className="success" data-testid="success-msg">
            Thank you, {submittedName}! Feedback submitted.
          </p>
        )}
      </section>
    </main>
  );
}
