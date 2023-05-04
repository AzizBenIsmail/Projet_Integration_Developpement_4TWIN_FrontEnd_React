const [query, setQuery] = useState("");
const [data, setData] = useState([]);

 const SearchJob = ({}) => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000?q=${query}`);
      setData(res.data);
    };
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);
 
  

  return (
    <div className="app">
        <input
          className="search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      {<Table data={data} />}
    </div>
  );
  }


// const [searchQuery, setSearchQuery] = useState("");
// const [searchResults, setSearchResults] = useState([]);

// const handleSearch = async (event) => {
//   event.preventDefault();
//   const response = await fetch(`/api/jobs?title=${searchQuery}`);
//   const data = await response.json();
//   setSearchResults(data);
// };

// {searchResults.map((jobOffer) => (
//   <div key={jobOffer.id}>
//     <h2>Job Title: {jobOffer.title}</h2>
//     <p>Description: {jobOffer.description}</p>
//     <p>Company: {jobOffer.company}</p>
//     <p>Salary: {jobOffer.salary}</p>
//     <p>Location: {jobOffer.location}</p>
//     <button onClick={() => setShowApplicationForm(true)}>Apply</button>
//   </div>
// ))}


// import React, { useState } from "react";
// import JobOfferCard from "./JobOfferCard";

// const SearchJob = ({ jobOffers }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredJobOffers = jobOffers.filter((jobOffer) =>
//     jobOffer.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <input type="text" value={searchTerm} onChange={handleSearchChange} />
//       {filteredJobOffers.map((jobOffer) => (
//         <JobOfferCard key={jobOffer.id} jobOffer={jobOffer} />
//       ))}
//     </div>
//   );
// };

// export default SearchJob;
