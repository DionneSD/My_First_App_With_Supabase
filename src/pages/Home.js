import supabase from "../supabaseClient";
import { useEffect, useState } from "react";

// components
import ActivityCard from "../components/ActivityCard";


const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [activities, setActivities] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  function handleDelete(id) {
    setActivities(previousActivities => {
      return previousActivities.filter(activity => activity.id !== id)
    })
  }

  useEffect(() => {
    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order(orderBy, { ascending: true });

      if (error) {
        setFetchError("we couldn't find any activities");
        setActivities(null);
        console.log(error);
      }
      if (data) {
        setActivities(data);
        setFetchError(null);
      }
    }
    fetchActivities();
  }, [orderBy]);


  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {activities && (
        
        <div className="activities">
        <div className="order-by">
        <p>order by:</p>
        <button onClick={() => setOrderBy("created_at")}>date of creation</button>
        <button onClick={() => setOrderBy("activity")}>a-z</button>
        <button onClick={() => setOrderBy("minutes")}>duration</button>
        </div>

        <div className="activities-grid">
        {activities.map((activity) => (
            <ActivityCard 
            key={activity.id} 
            activity={activity}
            onDelete={handleDelete}
            />)
          )}
          </div>         
        </div>
      )}
    </div>
  )
};

export default Home;