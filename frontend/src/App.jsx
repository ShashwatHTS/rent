import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar'

function App() {

  return (
    <>
        <Appbar/>
                    {/* <Router>
                        <Appbar />
                        <InitUser />
                        <Routes>
                            <Route path={"/addcourse"} element={<AddCourse />} />
                            <Route path={"/course/:courseId"} element={<Course />} />
                            <Route path={"/courses"} element={<Courses />} />
                            <Route path={"/signin"} element={<Signin />} />
                            <Route path={"/signup"} element={<Signup />} />
                            <Route path={"/"} element={<Landing />} />
                        </Routes>
                    </Router> */}
    </>
  )
}

export default App
