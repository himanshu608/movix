import React, { useEffect, useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'


const HeroBanner = () => {
    const [background, setbackground] = useState("")
    const [query, setquery] = useState("")
    const navigate = useNavigate()
    const {data, loading} = useFetch("/movie/upcoming")
    const {url} = useSelector((state)=> state.home)


    const searchQueryHandle = (event)=>{
        if((event.key === "Enter" || event.type === "click") && query.length > 0){
            navigate(`/search/${query}`)
        }
    }

    useEffect(()=>{
        const bg = url?.backdrop + data?.results[Math.floor(Math.random()*20)]?.backdrop_path
        setbackground(bg);
        
    },[data])
  return (
    <div className="heroBanner">
        <div className="backdrop-img">
            <Img src={background} />
        </div>

        <div className="opacity-layer">
            
        </div>
        <ContentWrapper>
            <div className="heroBannerContent">
                    <span className="title">Welcome</span>
                    <span className="subtitle">
                        Explore the Future of Entertainment on Our Cutting-Edge TV Platform
                    </span>
                    <div className="searchInput">
                        <input type="text" 
                        autoFocus
                        placeholder='Search for movies and TV show...'
                        value={query}
                        onChange={(e)=> setquery(e.target.value)}
                        onKeyUp={searchQueryHandle}
                        />
                        <button onClick={searchQueryHandle}>Search</button>
                    </div>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner