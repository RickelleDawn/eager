import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import logoutIcon from './logout-icon.svg'
import deleteIcon from './delete-icon.svg'
// import detailsIcon from './more-details-icon.svg'
import addIcon from './add-icon.svg'
import avatarIcon from './avatar-icon.svg'






function Dashboard() {

    const apiUrl = "https://umbrage-interview-api.herokuapp.com"
    const [peopleList, setPeopleList] = useState([])
    const token = localStorage.token;
    const navigate = useNavigate()


    const authAxios = axios.create({
        // creates axios instance 
        baseURL: { apiUrl },
        headers: {
            Authorization: `Bearer ${token}`
        }

    })

    const getPeople = async () => {
        // post request to fetch data using axios.create to pass in headers, including access token

        try {
            const result = await authAxios.get(`${apiUrl}/people`);
            // api GET request using axios to fetch array of people

            setPeopleList(result.data.people)
            // updates people list to returned data 

        } catch (err) {
            console.log("FAILED ATTEMPT " + (err))
        }
    }

    const addNew = () => {
       // adds randomized person to API using hardcoded payload 
        const result = authAxios.post(`${apiUrl}/people`, {
            "first_name": "Walt",
            "last_name": "Womble",
            "email": "walt.womble@umbrage.com",
            "job_title": "Craft: Software Engineering"

        }).then(response => {if (response.request.status === 200) { 
            // check response status to ensure success 
            // josh wrote -- .then(response => console.log(response)) --- then I continued

            setPeopleList([...peopleList, response.data.person])
            // if response status is successful, push returned object to peopleList array to mimic list without having to re-render from API call
        }}) 
    }

    useEffect(() => {
        if (!token){
         navigate("/login") 
        }
    },[])
    // check for token, if token exists display data, if not reroute to login screen


    useEffect(() => {
        getPeople()
    }, [])
    // useEffect to keep from requesting data repeatedly

    const deletePerson = (delId) => {
        // called in control-elements for delete icon
            
                authAxios.delete(`${apiUrl}/people/${delId}`)
                // deletes person by passing ID to API using axios delete request

                .then(response => {if (response.request.status === 200) { 
                    // checks response status to verify success

                    setPeopleList(peopleList.filter(people => people.id !== delId))
                    // filters through people list to show all except deleted person to mimic list without having to re-render from API call
                }});
               
        }

    const displayDashboard = () => {
        // called in "dashboard" div, maps through array of people from api/people and displays data 
        
            return peopleList.map((person) => {

                const id = person.id
                const name = `${person.first_name} ${person.last_name}`
                const job = person.job_title
                // const avatar = person.avatar
                // person.avatar returns broken img link, so I imported my own avatar icon
                const email = person.email.toLowerCase() // lowercase for styling 

                

                

                return (
                    // returns html to display data 
                    <div key={id} className='person-div'>

                        <div className='person-avatar'>
                            <img src={avatarIcon} alt={`${name}'s avatar`} />
                        </div>

                        <div className='person-info'>
                            <h3 className='person-name'>{name}</h3>
                            <p className='person-job'>{job}</p>
                            <hr />
                            <p className='person-email'>{email}</p>
                        </div>

                        <div className='extras'>
                            {/* <img className='control-elements'
                                src={detailsIcon}
                                alt="Click here to view comments"

                            /> */}
                            {/* Non-functional, added in for styling and will continue adding functionailty */}

                            <img className='control-elements'
                                src={deleteIcon}
                                alt="Click here to delete this person"
                                onClick={() => deletePerson(id)}
                                // Deletes person on click using API call
                            />
                        </div>
                    </div>
                )

            })       
    }

   





    const logout = () => {
        // called in logout button, clears local storage and reroutes to login screen
        localStorage.clear(token)
        navigate("/login")
    }

    return (
        <div className="Dashboard">
            <header className="Dashboard-header">

                <div className='person-container'>
                    {displayDashboard()}

                    <img id='logout-icon'
                        src={logoutIcon}
                        alt="Click here to log out"
                        onClick={logout}

                    />

                    <button id='add-new'
                    onClick={() => addNew()}>add new</button>
                    <img id='add-new-icon'
                        src={addIcon}
                    />

                </div>

            </header>
        </div>
    );

}

export default Dashboard;