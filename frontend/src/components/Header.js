"use client"
import "./Header.css"

const Header = ({ currentView, onNavigation, user, onLogout }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo" onClick={() => onNavigation("home")}>
            <h1>TechConnect</h1>
            <span>Find Local Technicians</span>
          </div>

          <nav className="nav">
            <button
              className={`nav-link ${currentView === "home" ? "active" : ""}`}
              onClick={() => onNavigation("home")}
            >
              Home
            </button>

            {user ? (
              <div className="user-menu">
                <span className="user-greeting">Hello, {user.name}!</span>
                <button className="btn btn-outline" onClick={onLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={() => onNavigation("register")}>
                Register / Login
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
