import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { baseURL } from '../api/baseURL';
import { useAuthContext } from '../hooks/useAuthContext';

//components 
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm'; 

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async() => {
            const response = await fetch(`${baseURL}/workouts`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const jsonData = await response.json();
 
            if (response.ok) {
                dispatch({type:'SET_WORKOUTS', payload: jsonData});
            }
        };
        if (user) {
            fetchWorkouts();
        }    
    }, [dispatch, user]);

    return (
        <div className="home">
            <div className='workouts'>
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}; 

export default Home;