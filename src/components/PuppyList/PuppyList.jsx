import { useState, useEffect } from "react";
import { useGetPuppiesQuery } from "./PuppyListSlice";
import { useNavigate } from "react-router-dom";


/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */

// TODO: Get data from getPuppies query
export default function PuppyList({ setSelectedPuppyId }) {
  const { data: puppies, isLoading, error } = useGetPuppiesQuery();
  const navigate = useNavigate();
  const seePuppyDetails = (id) => {
    console.log(id);
    navigate(`/players/${id}`);
  };

  const [puppyArr, setPuppyArr] = useState([]);
  const [puppyFilter, setPuppyFilter] = useState("");

  const filterPuppies = (e) => {
    e.preventDefault();
    const filteredPuppies = puppies?.data?.players.filter((element) => {
      if (element.name.toLowerCase().includes(puppyFilter.toLowerCase())) {
        return element;
      }
    });

    setPuppyArr(filteredPuppies);
  };
  useEffect(() => {
    if (puppies?.data?.players) {
      setPuppyArr(puppies.data.players);
    }
  }, [puppies]);

  return (
    <article>
      {/*input box and search button */}
      <div className="searchbar">
        <form className="searchform" onSubmit={filterPuppies}>
          <label>
            <input
              name="puppyName"
              placeholder="Enter Puppies Name"
              value={puppyFilter}
              onChange={(e) => setPuppyFilter(e.target.value)}
            />
          </label>
          <button className="searchbutton" type="submit">
            Search
          </button>
        </form>
      </div>
      <br />
      <h2 className="plheader">Puppy Bowl Roster</h2>
      <ul className="puppies">
        {isLoading && <li>Loading puppies...</li>}
        {error && <li>Error loading puppies...</li>}
        {puppyArr.map((p) => (
          <li key={p.id}>
            <h3>
              {p.name} #{p.id}
            </h3>
            <figure className="outline">
              <img src={p.imageUrl} alt={p.name} />
            </figure>
            <button
              className="detailbutton"
              onClick={() => seePuppyDetails(p.id)}
            >
              See details
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}
