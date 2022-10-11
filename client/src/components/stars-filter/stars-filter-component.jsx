import React from 'react'
import StarRatings from 'react-star-ratings'

const StarsFilterComponent = ({handleStarClick,amountOfStars}) => {
  return (
    <>
        <StarRatings  
            changeRating={()=>handleStarClick(amountOfStars)}
            numberOfStars={amountOfStars}
            starDimension='20px'
            starSpacing='2px'
            starHoverColor='red'
            starEmptyColor='red'
            

        />
        <br />
    </>
  )
}

export default StarsFilterComponent