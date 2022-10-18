import React from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "index.css"
import StaffApp from "staff-app/app"
import { GlobalStyle } from "shared/styles/global-style"

const Home: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <p>Engineering Test</p>
        <Link to="staff/daily-care">Staff</Link>
      </header>
    </div>
  )
}

const NotFound: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <p>Page not found</p>
        <Link to="/">Go to Home page</Link>
      </header>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router basename="/student-attendance-portal">
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<Home>Engineering Test</Home>} />
        <Route path="staff/*" element={<StaffApp />} />
        <Route path="*" element={<NotFound>Engineering Test</NotFound>} />
      </Routes>
    </Router>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
)
