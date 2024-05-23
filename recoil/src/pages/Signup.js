
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

function Signup({ url }) {
  const navigate = useNavigate();

  const signupSubmit = async (form) => {
    const response = await fetch("http://localhost:3000/users/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.status === 400){
        console.error(data.error)
        return 0
    }
    navigate("/login");
  };

  return (
    <div className="Signup">
      <SignUpForm submit={signupSubmit} label="Create New User" />
    </div>
  );
}

export default Signup;
