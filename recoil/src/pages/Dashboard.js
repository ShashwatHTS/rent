import { useNavigate } from "react-router-dom";
import { useAuthState } from "../atoms";
import { useEffect, useState } from "react";

function Dashboard(props) {
  const navigate = useNavigate();
  const [authState, setAuthState] = useAuthState();
  const [data, setData] = useState([])

  const res = async () => {
    const response = await fetch("http://localhost:3000/api/properties", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    const data = await response.json()
    console.log("data", data.properties)
    setData(data.properties)
  }
  useEffect(() => {
    res()
  }, [])

  if (authState.loggedIn) {
    return <div className="Dashboard">
      {/* {console.log("loggedIn", authState.loggedIn)} */}

    {data.map((item) => {
      return (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </div>
      );
    })}
      Dashboard</div>;
  } else {
    return <h1>{console.log("loggedIn", authState.loggedIn)}Must Be Logged In to See This Page</h1>;
  }
}

export default Dashboard;
