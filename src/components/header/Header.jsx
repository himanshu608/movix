import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
      window.scrollTo(0,0);
    },[location])
    const controlNavbar = ()=>{
      if(window.scrollY > 200 ){
        if(window.scrollY > lastScrollY && !mobileMenu){
          setShow("hide");
        }else setShow("show")

      }else setShow("top")
      setLastScrollY(window.scrollY)
    }
    useEffect(()=>{
      window.addEventListener("scroll",controlNavbar);
      return ()=> window.removeEventListener("scroll",controlNavbar);
    },[lastScrollY])

    const openSearch = ()=>{
      setMobileMenu(false);
      setShowSearch(true);
    }

    const openMobileMenu = ()=>{
      setMobileMenu(true);
      setShowSearch(false);
    }

    const searchQueryHandle = (event)=>{
      if((event.key === "Enter" || event.keyCode === 13)&& query.length > 0){
          navigate(`/search/${query}`);
          setQuery("");
          setTimeout(()=>{
            setShowSearch(false);
          },100)
      }
    }

    const navigationHandler = (type)=>{
        navigate(`/explore/${type}`);
        setShowSearch(false);
        setMobileMenu(false);
    }
    return (
        <header className={`header ${mobileMenu ? 'mobileView':""} ${show}`}>
          <ContentWrapper>
            <div className="logo" onClick={()=>navigate("/")}>
              <img src={logo} alt="Movix" />
            </div>
            <ul className="menuItems">
              <li className="menuItem" onClick={()=>navigationHandler("movie")}>Movies</li>
              <li className="menuItem" onClick={()=>navigationHandler("tv")}>TV Shows</li>
              <li className="menuItem" onClick={openSearch}><HiOutlineSearch/></li>
            </ul>

            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={openSearch}/>
              {mobileMenu ? (
                    <VscChromeClose onClick={()=>setMobileMenu(false)}/>
              ) : (
                <SlMenu onClick={openMobileMenu}/>
              )}
            </div>
          </ContentWrapper>
          {showSearch && <div className="searchBar">
            <ContentWrapper>
            <div className="searchInput">
                        <input type="text" 
                        autoFocus
                        placeholder='Search for movies and TV show...'
                        value={query}
                        onChange={(e)=> setQuery(e.target.value)}
                        onKeyUp={searchQueryHandle}
                        />
                      <VscChromeClose onClick={()=>setShowSearch(false)}/>
                    </div>
            </ContentWrapper>
          </div>}
        </header>
    );
};

export default Header;
