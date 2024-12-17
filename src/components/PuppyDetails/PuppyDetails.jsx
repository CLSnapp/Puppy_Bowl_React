import { useEffect, useState } from "react";
import { useGetPuppyQuery, useDeletePuppyMutation } from "./puppyDetailsSlice";
import { useNavigate, useParams } from "react-router-dom";

/**
 * @component
 * Shows comprehensive information about the selected puppy, if there is one.
 * Also provides a button for users to remove the selected puppy from the roster.
 */
export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  // TODO: Grab data from the `getPuppy` query

  // TODO: Use the `deletePuppy` mutation to remove a puppy when the button is clicked

  const { id } = useParams();
  const { data, isLoading, error } = useGetPuppyQuery(id);
  const [deletePuppy] = useDeletePuppyMutation();
  const navigate = useNavigate();
  const [puppy, setPuppy] = useState({});

  useEffect(() => {
    if (data?.data?.player) {
      setPuppy(data.data.player);
    }
  }, [data]);

  const removePuppy = async (id) => {
    try {
      const response = await deletePuppy(id).unwrap();
      console.log("Puppy removed:", response);
      setSelectedPuppyId(null);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete puppy:", error);
    }
  };

  // There are 3 possibilities:
  let $details;
  // 1. A puppy has not yet been selected.
  if (!puppy) {
    $details = <p>Please select a puppy to see more details.</p>;
  }
  //  2. A puppy has been selected, but results have not yet returned from the API.
  else if (isLoading) {
    $details = <p>Loading puppy information...</p>;
  } else if (error) {
    $details = <p>Error loading puppy details: {error.message}</p>;
  }
  // 3. Information about the selected puppy has returned from the API.
  else {
    $details = (
      <>
        <h3>
          {puppy.name} #{puppy.id}
        </h3>
        <p>{puppy.breed}</p>
        <p>Team {puppy.team?.name ?? "Unassigned"}</p>
        <div>
          <button
            className="rbutton"
            onClick={() => removePuppy(puppy.id)}
          >
            Remove From Roster 
          </button>
        </div>

        <figure>
          <img src={puppy.imageUrl} alt={puppy.name} />
        </figure>
      </>
    );
  }

  return (
    <aside>
      {/* <h2>Selected Puppy</h2> */}
      {$details}
    </aside>
  );
}
