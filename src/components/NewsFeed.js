import {useEffect, useState} from 'react'
import axios from 'axios'




export const NewsFeed = () => {
    const [articles, setArticles] = useState(null)

    useEffect(() => {

        const options = {
            method: 'GET',
            url: 'https://crypto-news-live.p.rapidapi.com/news',
            headers: {
                'x-rapidapi-host': 'crypto-news-live.p.rapidapi.com',
                'x-rapidapi-key': process.env.RAPID_API_KEY || 'd69124657fmshb1f5e6efe393777p1c8c67jsnf79809a4ab2c'
            }
        }

        axios.request(options)
            .then(response => {
                console.log(response.data)
                setArticles(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])


    const first7Articles = articles?.slice(0, 7)

    return (
        <div className="news-feed">
            <h2>News Feed</h2>
            {first7Articles?.map((article, _index) => (
                <div key={_index}>
                    <a href={article.url} target='_blank'><p>{article.title}</p></a>
                </div>))}
        </div>
    )
}