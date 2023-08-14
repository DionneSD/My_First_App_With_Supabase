import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../src/supabaseClient';


function Create(){
  
  const navigate = useNavigate();

  const [activity, setActivity] = useState('');
  const [instruction, setInstruction] = useState('');
  const [minutes, setMinutes] = useState('');
  const [formError, setFormError] = useState(null);

  async function handleSubmit(e){
    e.preventDefault();

    if(!activity || !instruction || !minutes){
      setFormError('all fields are required, silly bum!');
      return;
    }

    const { data, error } = await supabase
      .from('activities')
      .insert([{activity, instruction, minutes}])
      .select();

    if(error){
      console.log(error);
      setFormError('all fields are required, silly bum!');
     }

    if(data){
      console.log(data);
      setFormError(null);
      navigate('/');
    }
  }

  return (
    <div className="page create">
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

        <button type="submit">add new activity</button>

        {formError && <p className="error">{formError}</p>}

      </form>
    </div>
  )
}

export default Create;