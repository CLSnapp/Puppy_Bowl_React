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
      if (element.name.includes(puppyFilter)) {
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
      <div>
        <form onSubmit={filterPuppies}>
          <label>
            Name
            <input
              name="puppyName"
              value={puppyFilter}
              onChange={(e) => setPuppyFilter(e.target.value)}
            />
          </label>
          <button type="submit">Search Puppies</button>{" "}
        </form>
      </div>
      <h2>Roster</h2>
      <ul className="puppies">
        {isLoading && <li>Loading puppies...</li>}
        {error && <li>Error loading puppies...</li>}
        {puppyArr.map((p) => (
          <li key={p.id}>
            <h3>
              {p.name} #{p.id}
            </h3>
            <figure>
              <img src={p.imageUrl} alt={p.name} />
            </figure>
            <button onClick={() => seePuppyDetails(p.id)}>See details</button>
          </li>
        ))}
      </ul>
    </article>
  );
}
