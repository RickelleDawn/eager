import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import logoutIcon from './logout-icon.svg'
import deleteIcon from './delete-icon.svg'
// import detailsIcon from './more-details-icon.svg'
import addIcon from './add-icon.svg'
import avatarIcon from './avatar-icon.svg'
import Modal from '../Modal';
import autoFill from './autofill-icon.svg'
import modalClose from './close-modal-icon.svg'



function Dashboard() {

    const apiUrl = "https://umbrage-interview-api.herokuapp.com"
    const [peopleList, setPeopleList] = useState([])
    const token = localStorage.token;
    const navigate = useNavigate()

    // Add new form
    const [modalOpen, setModalOpen] = useState(false)
    const [newFirst, setNewFirst] = useState('')
    const [newLast, setNewLast] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newJob, setNewJob] = useState('')

    const autoFirst = "Rickelle"
    const autoLast = "Tackitt"
    const autoEmail = "hire_me@eleox.com"
    const autoJob = "Junior Web Developer"



//----------------------------------------- SECURITY/LOGOUT --------------------------------------------


    useEffect(() => {
        if (!token){
         navigate("/login") 
        }
    },[])
    // check for token, if no token exists reroute to login screen


    const logout = () => {
        // called in logout button, clears local storage and reroutes to login screen
        localStorage.clear(token)
        navigate("/login")
    }



//---------------------------------------- RENDER DATA FUNCTIONALITY --------------------------------------------


    const authAxios = axios.create({
        // creates axios instance to pass in headers, including access token
        baseURL: { apiUrl },
        headers: {
            Authorization: `Bearer ${token}`
        }

    })


    const getPeople = async () => {

        try {
            const result = await authAxios.get(`${apiUrl}/people`);
            // api GET request using axios to fetch array of people

            setPeopleList(result.data.people)
            // updates peopleList to returned array

        } catch (err) {
            console.log("FAILED ATTEMPT " + (err))
        }
    }


    useEffect(() => {
        getPeople()
    }, [])
    // useEffect to keep from requesting data repeatedly


   
    const displayDashboard = () => {
        // called in "dashboard" div, maps through array of people returned from api and displays data 
        
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

//----------------------------------------- DELETE PERSON FUNCTION ----------------------------------------


    const deletePerson = (delId) => {
        // called in control-elements for delete icon
            
                authAxios.delete(`${apiUrl}/people/${delId}`)
                // deletes person by passing ID to API using axios delete request

                .then(response => {if (response.request.status === 200) {
                    console.log(response) 
                    // checks response status to verify success

                    setPeopleList(peopleList.filter(people => people.id !== delId))
                    // filters through people list to show all except deleted person to mimic list without having to re-render from API call
                }});
               
        }

//----------------------------------------- ADD NEW PERSON FUNCTION ----------------------------------------


    const addNew = (evt) => {
        evt.preventDefault()
       // adds randomized person to API using hardcoded payload 
        const result = authAxios.post(`${apiUrl}/people`, {
           
            "first_name": `${newFirst}`,
            "last_name": `${newLast}`,
            "email": `${newEmail}`,
            "job_title": `${newJob}`

        }).then(response => {if (response.request.status === 200) { 
            // check response status to ensure success 
            // josh wrote -- .then(response => console.log(response)) --- then I continued


            // if response status is successful: 
            setPeopleList([...peopleList, response.data.person])
            // push returned object to peopleList array to mimic list without having to re-render from API call
           

            handleModalClose()
            // clear state values and close modal
            
        }}) 
    }


//  -    -   -   -   -   -   -   -   -   -   -   MODAL CLOSE   -   -   -   -   -   -   -   -   -   -   -   -


    const handleModalClose = () => {
        setNewFirst('');
        setNewLast('');
        setNewEmail('');
        setNewJob('');
        // clear state values/form inputs

        setModalOpen(false)
        // close modal

    }

//----------------------------------------- ADD NEW PERSON DISPLAY ----------------------------------------



    const addNewForm = () => {

        // Displays form for add new person modal

        return(

        <div id='add-form'>
            <img id='auto-fill'
            src={autoFill}
             alt="Auto"
             onClick={() => {
             setNewFirst(autoFirst)
             setNewLast(autoLast)
             setNewEmail(autoEmail)
             setNewJob(autoJob)
            }}
            />
             <h2>new person</h2>
             <form onSubmit={addNew}>
             <input
                className='add-input'
                required
                type="textbox"
                placeholder="first name"
                autoComplete='off'
                value={newFirst}
                onChange={(e) => {
                setNewFirst(e.target.value)
                }}>
                {/* first name input textbox, will update state as changed */}
             </input>

             <br></br>

             <input
                className='add-input'
                required
                type="textbox"
                placeholder="last name"
                autoComplete='off'
                value={newLast}
                onChange={(e) => {
                setNewLast(e.target.value)
                }}>
                {/* last name input textbox, will update state as changed */}
             </input>

             <input
                className='add-input'
                required
                type="textbox"
                placeholder="email"
                autoComplete='off'
                value={newEmail}
                onChange={(e) => {
                setNewEmail(e.target.value)
                }}>
                {/* email input textbox, will update state as changed */}
             </input>

             <input
                className='add-input'
                required
                type="textbox"
                placeholder="job title"
                autoComplete='off'
                value={newJob}
                onChange={(e) => {
                setNewJob(e.target.value)
                }}>
                {/* job title input textbox, will update state as changed */}
             </input>

             <br></br>

             <input id='add-submit'
                type="submit"
                value="add">
             </input>
            </form>
        </div>
            
        )

    }

//-------------------------------------------- DASHBOARD DISPLAY -------------------------------------------


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
                    onClick={() => setModalOpen(true)}>
                        add new</button>
                        <img id='add-new-icon'
                        src={addIcon}
                    />
                    <Modal open={modalOpen}>
                        {addNewForm()}
                        <img id='modal-close' src={modalClose} onClick={() => {handleModalClose()}} /> 
                    </Modal>

                </div>

            </header>
        </div>
    );

}

export default Dashboard;