import React from 'react'
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io'
import './star.css'

const Star = ({ rating }) => {
    const [star, setStar] = React.useState([])

    const createStar = () => {
        let arr = []
        for (let index = 0; index < 5; index++) {
            if (rating >= 1) {
                arr.push(1)
            } else if (rating < 1 && rating >= 0.5) {
                arr.push(-1)
            } else {
                arr.push(0)
            }
            rating -= 1
        }
        setStar(arr)
    }

    // console.log(star)

    React.useEffect(() => {
        createStar()
    }, [rating])
    return (
        <div className='star-display'>
            {star.map(val => {
                return (
                    (val === 1) ? <div className='star-yellow'><IoMdStar /></div>
                    : (val === -1) ? <div className='star-yellow'><IoMdStarHalf /></div>
                    : (val === 0) ? <div className='star-yellow'><IoMdStarOutline /></div>
                    : ''
                )
            })}
        </div>
    )
}

export default Star