import './App.css';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import autoIcon from './autofill-icon.svg';


function App() {

  // useEffect(() => {
  //   const requestToken = {
  //     method: 'POST',

  //   }
  // })
  const apiUrl = "https://umbrage-interview-api.herokuapp.com"
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [loginStatus, setLoginStatus] = useState("no success")
  const [peopleList, setPeopleList] = useState([])



  const user = "interview@umbrage.com"
  const pw = "umbrageinterview"



  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('submit')
    // console.log(username)
    // console.log(password)

    axios.post(`${apiUrl}/login`, {
      username: username,
      password: password,
    }).then((res) => {
      console.log("successful submit!")
      console.log(res)
      if ((res.data.access_token)) {
        setToken(res.data.access_token)
        setLoginStatus("success")
        getPeople()
        // console.log(token)
      } else {
        setLoginStatus("Something went wrong")
      }
    })

    //Here is where I will make an api request
  }

  const authAxios = axios.create({
    baseURL: { apiUrl },
    headers: {
      Authorization: `Bearer ${token}`
    }

  })

  const getPeople = useCallback(async () => {
    try {
      const result = await authAxios.get(`${apiUrl}/people`);
      console.log(result)
      setPeopleList(result.data.people)
      console.log(peopleList)
      console.log(result.data.people[0].first_name)
    } catch (err) {
      console.log("FAILED ATTEMPT " + (err))
    }
  })

  useEffect(() => {


  })

  // const renderPeople = () => {
  //   if (peopleList.length > 0) {
  //     peopleList.map(item => {
  //       return (

  //         <div key={item.id}>
  //           {item.first_name.map(person => {
  //             return (

  //               <div key={person.first_name}>
  //                 <p>{person.first_name}</p>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       )
  //     })



  //  [

  //  {
  //     "id": "cd7e01d3-5001-4657-99e7-1471e7bd9642",
  //     "first_name": "Johathan",
  //     "last_name": "Mraz",
  //     "email": "Johathan.Mraz@umbrage.com",
  //     "job_title": "Craft: Identity",
  //     "avatar": "https://picsum.photos/120"
  // }, {
  //  "id": "6462d35f-47ba-41ea-a385-abe0d32f55c2",
  //     "first_name": "Myrtle",
  //     "last_name": "Lakin",
  //      "email": "Myrtle.Lakin@umbrage.com",
  //      "job_title": "Craft: Functionality",
  //       "avatar": "https://picsum.photos/120"
  // }
  // ]


  //   } else {
  //     return ("<p>list not working</p>")
  //   }



  // }

  return (
    <div className="App">
      <header className="App-header">

        <div className='loginBox'>

          {/* <div><image className='autofill-icon' src={autoIcon} alt="nada"></image></div> */}

          {/* <p>Login Status: {loginStatus}</p> */}

          <br></br>

          <p>User: {user}</p>
          <p>Pw: {pw}</p>

          <form onSubmit={handleSubmit}>
            Username: <input
              required
              placeholder="username"
              className='formIinput'
              type="textbox"
              // value={user}

              onChange={(e) => {
                setUsername(e.target.value)
              }}>

            </input><br></br>

            Password: <input
              className='formIinput'
              required
              autoComplete='off'
              type="password"
              placeholder="password"
              // value={pw}
              onChange={(e) => {
                setPassword(e.target.value)
              }}>
            </input><br></br>

            <input id='submitButton' type="submit"></input>
            {/* <input type="reset"></input> */}
            <br></br>
            <span className='extras'>
              <a href="" > Clear all</a>
              <a href="" > Forgot password?</a>
            </span>



            {/* <div className='renderPeople'>

              {renderPeople()}
            </div>
            <p>token: {token}</p> */}



          </form>

        </div>

      </header>
    </div>
  );
}

export default App;


// ------------------------------- CODE CEMETERY------------------------

// const getPeople = () => {
//   console.log(token)
//   axios.get(`${apiUrl}/people`, {
//     "headers": {
//       "Authorization":{token}
//     },
//   }).then((res) => {
//     console.log(res)
//   })

// };

//   setToken(res.data.access_token))
    // console.log(token)

    // if (token.length > 0) {
    //   setLoginStatus("success")
    //   console.log(loginStatus)
    // }


    // .then((res) => {
    //   if (res.data.access_token) {
    //     console.log("login successful")

    //   }
    // })

