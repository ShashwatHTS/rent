
const authHeader = {
  headers: {
    "Authorization": "Bearer " + localStorage.getItem("token")
  }
}
const handleProperties = async () => {
  try {
    console.log("auhHeader--->", authHeader)
    const response = await fetch("http://localhost:3000/api/properties", {
      authHeader
    });
    console.log("hand;leProperties", response)
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error);
  }
}
handleProperties()
export { handleProperties }
// const handleRegisterSubmit = (event) => {
//   event.preventDefault();
//   const data = new FormData(event.currentTarget);
//   console.log({
//     email: data.get('email'),
//     password: data.get('password'),
//   });
//   axios.post("http://localhost:3000/users/register", {
//     email: data.get('email'),
//     password: data.get('password'),
//     firstName: data.get('firstName'),
//     lastName: data.get('lastName'),
//     phoneNumber: data.get('phoneNumber'),

//   }).then(res => {
//     console.log(res.data)
//     navigate('/signin')
//   }).catch(err => console.log(err))
// };

// const handleLoginSubmit = (event) => {
//   event.preventDefault();
//   const data = new FormData(event.currentTarget);
//   console.log({
//     email: data.get('email'),
//     password: data.get('password'),
//   });
//   axios.post("http://localhost:3000/users/login", {
//     email: data.get('email'),
//     password: data.get('password'),
//   }).then(res => {
//     console.log(res.data)
//     setAuthState({ loggedIn: true, ...res.data })
//     localStorage.setItem("token", JSON.stringify(res.data.token))
//     navigate('/properties')
//   }).catch(err => console.log(err))
// };

// const handlePorpertyFormSubmit = (event) => {
//   event.preventDefault();
//   setLoading(true)
//   axios.post(`http://localhost:3000/api/properties/${updateForm ? 'update/' + id : 'create'}`, fields,
//     {
//       authHeader
//     }
//   ).then(res => {
//     setLoading(false)
//     console.log(res.data)
//     alert("Property added successfully")
//   }).catch(err => {
//     setLoading(false)
//     console.log(err)
//     alert("Something went wrong")
//   })
//   console.log({ fields })

// }