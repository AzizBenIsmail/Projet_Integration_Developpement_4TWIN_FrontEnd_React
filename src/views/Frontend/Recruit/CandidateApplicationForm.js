import { useState } from "react";

function CandidateApplicationForm({ jobOffer }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [resume, setResume] = useState(null);
  const handleApply = async (event) => {
    event.preventDefault();
  
    // Get the form data
    const formData = new FormData(event.target);
  
    try {
      // Make a POST request to the server to apply for the job
      const response = await axios.post("http://localhost:5000/recruit/apply", formData);
  
      // Get the updated job offer data from the response
      const updatedJobOffer = response.data.jobOffer;
  
      // Update the jobOffers state with the updated data returned from the server
      const updatedJobOffers = jobOffers.map((jobOffer) => {
        if (jobOffer.id === updatedJobOffer.id) {
          return updatedJobOffer;
        }
        return jobOffer;
      });
  
      setJobOffers(updatedJobOffers);
  
      // Reset the form after successful submission
      event.target.reset();
    } catch (error) {
      console.error(error);
    }
  };
  
  // Rest of the code for the form and submit handler

  return(
    <form onSubmit={handleSubmit}>
  <label htmlFor="resume">Resume/CV:</label>
  <input
    type="file"
    id="resume"
    name="resume"
    accept=".pdf,.doc,.docx"
    required
    onChange={(e) => setResume(e.target.files[0])}
  />
  
  <label htmlFor="availability">Availability:</label>
  <select
    id="availability"
    name="availability"
    required
    onChange={(e) => setAvailability(e.target.value)}
  >
    <option value="">Select availability</option>
    <option value="full-time">Full-time</option>
    <option value="part-time">Part-time</option>
    <option value="contract">Contract</option>
    <option value="freelance">Freelance</option>
  </select>

  <label htmlFor="firstName">First Name:</label>
  <input
    type="text"
    id="firstName"
    name="firstName"
    required
    onChange={(e) => setFirstName(e.target.value)}
  />

  <label htmlFor="lastName">Last Name:</label>
  <input
    type="text"
    id="lastName"
    name="lastName"
    required
    onChange={(e) => setLastName(e.target.value)}
  />

  <label htmlFor="location">Location:</label>
  <input
    type="text"
    id="location"
    name="location"
    required
    onChange={(e) => setLocation(e.target.value)}
  />

  <label htmlFor="email">Email:</label>
  <input
    type="email"
    id="email"
    name="email"
    required
    onChange={(e) => setEmail(e.target.value)}
  />

  <label htmlFor="phone">Phone:</label>
  <input
    type="tel"
    id="phone"
    name="phone"
    required
    onChange={(e) => setPhone(e.target.value)}
  />

  <button type="submit">Apply</button>
</form>

  )
}

export default CandidateApplicationForm;