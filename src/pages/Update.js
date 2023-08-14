import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

function Update(){

  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState('');
  const [instruction, setInstruction] = useState('');
  const [minutes, setMinutes] = useState('');
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!activity || !instruction || !minutes){
      setFormError('all fields are required, silly bum!');
      return;
    }

    const { data, error } = await supabase
      .from('activities')
      .update({ activity, instruction, minutes })
      .eq('id', id)
      .select();

    if (error){
      console.log(error);
      setFormError("all fields are required, silly bum!");}

    if(data){
      setFormError(null); 
      navigate('/');
    }
  }

  useEffect(() => {
    const fetchActivity = async () => {
      const { data, error } = await supabase
        .from('activities')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        console.log(error)
        navigate('/', { replace: true})
      }
      if (data) {
        setActivity(data.activity)
        setInstruction(data.instruction)
        setMinutes(data.minutes)
        console.log(data);
      }
    }
    fetchActivity();
}, [id, navigate])


  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="activity">activity:</label>
        <input
          type="text"
          id="activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        
        <label htmlFor="instruction">instruction:</label>
        <input
          type="text"
          id="instruction"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
        />
        
        <label htmlFor="minutes">minutes:</label>
        <input
          type="number"
          id="minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />

        <button type="submit">update</button>

        {formError && <p className="error">{formError}</p>}

      </form>
    </div>
  )
}

export default Update