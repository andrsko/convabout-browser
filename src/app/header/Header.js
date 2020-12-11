import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "../../features/auth/authSlice";
import logo from "../../logo.svg";
import add from "./add.svg";
import home from "./home.svg";
import more from "./more.svg";
import styles from "./Header.module.css";

export const Header = () => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const onDropdownToggle = () => setDisplayDropdown(!displayDropdown);

  const username = useSelector((state) => state.auth.username);

  const dispatch = useDispatch();

  const authMenu = username ? (
    <React.Fragment>
      <p>{username}</p>
      <button type="button" onClick={() => dispatch(signOut())}>
        Sign out
      </button>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Link to="/signin">Sign in</Link>
      <Link to="/signup">Sign up</Link>
    </React.Fragment>
  );

  const dropdownToggleRef = useRef(null);
  const dropdownMenuRef = useRef(null);

  const dropdownMenu = displayDropdown ? (
    <div ref={dropdownMenuRef} className={styles.dropdownMenu}>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/terms-of-service">Terms of Service</Link>
      <Link to="/privacy-policy">Privacy Policy</Link>
      {authMenu}
    </div>
  ) : null;

  useEffect(() => {
    /**
     * Hide dropdown menu if clicked on outside
     */
    function handleClickOutside(event) {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target) &&
        !dropdownToggleRef.current.contains(event.target)
      ) {
        setDisplayDropdown(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownToggleRef, dropdownMenuRef]);

  return (
    <header>
      <img src={logo} className={styles.logo} alt="logo" />
      <nav>
        <Link to="/">
          <button>
            <img src={home} alt="home" />
            <span className={styles.buttonLinkText}>Home</span>
          </button>
        </Link>
        <Link to="/submit">
          <button>
            <img src={add} alt="add" />
            <span className={styles.buttonLinkText}>New conversation</span>
          </button>
        </Link>
        <div className={styles.dropdown}>
          <button ref={dropdownToggleRef} onClick={onDropdownToggle}>
            <img src={more} alt="more" />
          </button>
          {dropdownMenu}
        </div>
      </nav>
    </header>
  );
};
