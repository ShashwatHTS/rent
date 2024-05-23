import { useState } from "react";

function SignUpForm({ submit, label }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(form);
  };

  return (
    <div className="SignUpForm">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="firstName"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="lastName"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />

        <input
          type="phoneNumber"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input type="submit" value={label} />
      </form>
    </div>
  );
}

export default SignUpForm;
