import { Button, Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import envData from '../env.json'
import MovieCard from "../Moviecard/MovieCard";
import EventEmitter from "../utils/eventEmitter";

const Search = () => {
    const style = { background: '#0092ff', padding: '8px 0' };
    const [query, setQuery] = useState("")
    const [pageNo, setPageNo] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [movies, setMovies] = useState([])
    const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${envData.API_KEY}&language=en-US&page=${pageNo}&include_adult=false&query=${query}`

    let urlQuery = useQuery();


    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    useEffect(() => {

        setQuery(urlQuery.get("query"))
        if (query) {
            console.log(searchURL, query)
            axios.get(searchURL)
                .then((response) => {
                    console.log(response.data)
                    setMovies(response.data.results)
                    setTotalPages(response.data.total_pages)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        // EventEmitter.subscribe('search', (event) => {

        //     console.log(event)
        // })

    }, [query, pageNo])

    useEffect(() => {
        EventEmitter.subscribe('search', (query) => {
            console.log(query)
            setQuery(query)
        })
        return () => {
            EventEmitter.unsubscribe('search')
        }
    })

    return (
        <div>
            <h1>Search</h1>
            {/* <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card> */}

            {
                movies.length > 0 ?
                    <Row>

                        {movies.map((movie) => {
                            return <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                                {/* <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src={movie.poster_path ? `${envData.BASE_POSTER_PATH}${movie.poster_path}` : envData.EMPTY_IMAGE} />}
                                >
                                    <Meta title={movie.original_title} description="www.instagram.com" />
                                </Card>               */}
                                <MovieCard movie={movie} />
                            </Col>
                        })}


                    </Row> : null

            }
            <Button disabled={pageNo === 1} onClick={() => {
                setPageNo(1)
            }} type="primary">First</Button>
            <Button disabled={pageNo === 1} onClick={() => {
                setPageNo(prev => {
                    return prev - 1
                })
            }} type="primary">Previous</Button>

            {pageNo} <Button disabled={pageNo === totalPages} onClick={() => {
                setPageNo(prev => {
                    return prev + 1
                })
            }} type="primary">Next</Button>
            <Button disabled={pageNo === totalPages} onClick={() => {
                setPageNo(totalPages)
            }} type="primary">Last</Button>



        </div>
    )
}
export default Search;