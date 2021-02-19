import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import { useHistory } from 'react-router'
import envData from '../env.json'
const MovieCard = ({ movie }) => {
    const history = useHistory();
    const clickHandler = () => {
        history.push(`/movie/${movie.id}`);
    }
    let date = new Date(movie.release_date);
    return (

        <Card
            onClick={clickHandler}
            hoverable
            style={{ width: 240, margin: "10px 0px" }}
            cover={<img alt="example" src={movie.poster_path ? `${envData.BASE_POSTER_PATH}${movie.poster_path}` : envData.EMPTY_IMAGE} />}
        >
            <div style={{ fontSize: "20px", color: "black" }}>
                <Meta title={movie.original_title} description={`${movie.release_date} - ${movie.vote_average || ''}`} />
            </div>
        </Card>

    )
}
export default MovieCard