import { Button, Col, Row } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import envData from '../env.json'
import MovieCard from '../Moviecard/MovieCard'

const Trending = () => {
    const [pageNo, setPageNo] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [movies, setMovies] = useState([])
    const trendingURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${envData.API_KEY}&page=${pageNo}`
    useEffect(() => {
        axios.get(trendingURL)
            .then((response) => {
                console.log(response.data)
                setMovies(response.data.results)
                setTotalPages(response.data.total_pages)
            })


    }, [pageNo])
    return (
        <div>
            <h1>Trending</h1>
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
export default Trending