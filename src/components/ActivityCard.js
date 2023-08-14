import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';

function ActivityCard({ activity, onDelete }){

    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('activities')
            .delete()
            .eq('id', activity.id)
            .select();

        if (error) {
            console.log(error);
        }
        if (data) {
            console.log(data);
            onDelete(activity.id);
        }
    }

    return (
        <div className='activity-card'>
            <h3>{activity.activity}</h3>
            <p>{activity.instruction}</p>
            <div className='minutes'>{activity.minutes}</div>
            <div className='buttons'>
                <Link to={'/' + activity.id}>
                    <i className='material-icons'>edit</i>
                </Link>
                <i className='material-icons' onClick={handleDelete}>delete</i>
            </div>
        </div>
    )
}

export default ActivityCard;