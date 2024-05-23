import { useState } from "react";

function AuthForm({ submit, label }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(form);
  };

  return (
    <div className="AuthForm">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <input type="submit" value={label} />
      </form>
    </div>
  );
}

export default AuthForm;
