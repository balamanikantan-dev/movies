import { Card, Col, Row, Space } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import envData from '../env.json'


const MovieDetails = () => {
    const [movie, setMovies] = useState({})
    let { id } = useParams();
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${envData.API_KEY}`)
            .then((response) => {
                console.log(response.data)
                setMovies(response.data)
            })

    }, [])

    return (
        <div style={
            { width: "100%" }

        }>
            {Object.keys(movie).length > 0 ?
                <> <div style={
                    { display: 'flex', alignItems: "center" }
                }>

                    <img style={{ width: 240, margin: "auto" }} alt="example" src={movie.poster_path ? `${envData.BASE_POSTER_PATH}${movie.poster_path}` : envData.EMPTY_IMAGE} />

                </div ><br></br>
                    <div style={
                        { textAlign: "center", fontSize: "35px", fontFamily: "Cursive"}
                    }>
                        <div style={
                            { fontWeight: "bold" }
                        }>
                            {movie.original_title}<br></br>
                        </div>
                        Rating : {movie.vote_average}<br></br>
                        {movie.overview}<br></br>
                Run_Time:{movie.runtime}min<br></br>
                        {movie.genres.map((genre) => {
                            return <>{genre.name}                </>

                        })}<br></br>
                        <Row justify="space-around">
                            <Space>
                                {movie.production_companies.map((production_company) => {
                                    return <div> <Col xs={24} sm={12} md={8} lg={4} xl={4}></Col> <Card cover={<img style={{ width: 240, margin: "auto" }} alt="example" src={production_company.logo_path ? `${envData.BASE_POSTER_PATH}${production_company.logo_path}` : envData.EMPTY_IMAGE} />}> {production_company.name}



                                    </Card>


                                    </div>
                                })}
                            </Space>
                        </Row>
                    </div>

                </> : null}
            <div style={
                { textAlign: "center", fontSize: "30px" }
            }>
                Release_Date : {movie.release_date}<br></br>

            </div>
        </div>
    )
}
export default MovieDetails