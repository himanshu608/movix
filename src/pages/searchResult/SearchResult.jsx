import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromApi } from '../../utis/api';
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import noResults from "../../assets/no-results.png"
import {useParams} from 'react-router-dom';
import './style.scss'
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/movieCard/MovieCard';

const SearchResult = () => {
  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false);
  const {query} = useParams();

  const fetchInfiniteData = ()=>{
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    .then(res => {
      setData(res);
      setPageNum((pre)=> pre+1);
      setLoading(false);
    })
  }

const fetchNextPageData = ()=>{
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    .then(res => {
      if(data.results) {
         setData({
          ...data, results: [...data?.results, res?.results]
         })
      }else{
        setData(res)
      }
      setPageNum((pre)=> pre+1);

    })
    .catch(err => console.log(err))
  }
  useEffect(()=>{
    setPageNum(1)
    fetchInfiniteData();
  },[query])
  return (
    <div className="searchResultsPage">
      {loading && <Spinner/>}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data?.total_results > 1 ? "results" : "result"} of ${query}`}
              </div>
              <InfiniteScroll
                className='content'
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum<= data?.total_pages}
                loader={<Spinner/>}
              >
                {data?.results?.map((item,index)=>{
                  if(item.media_type === "person") return;
                  return (
                    <MovieCard data={item} fromSearch={true} key={index} />
                  )
                })}
              </InfiniteScroll>
            </>
          ) :(
            <span className="resultsNotFound" style={{color:"wheat"}}>
              Sorry, results not found...
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult