import StarRatings from "react-star-ratings";

export const AverageRating=(product)=>{

    if(product && product.ratings.length>0){
        let ratingArray=product&& product.ratings;
        let length=ratingArray.length
        let totalStars=[]
        ratingArray.map(i=>totalStars.push(i.stars))
        
        let toatlReduced=totalStars.reduce((acu,cc)=>{
            return acu+cc
        },0)
        let highest=length*5

        let result=(toatlReduced*5)/highest
        return (
            // <div className="text-center pt-1  pb-3 " >
            <div className="d-flex justify-content-center pb-3 " >
                {/* <span style={{}}> */}
                    <StarRatings 
                        starDimension="20px"
                        starSpacing="2px"
                        starRatedColor="#004080"
                        editing={false}
                        rating={result}
                        />{"  "}
                        <span style={{marginTop:'3px',marginRight:'4px'}}>
                        ({product.ratings.length})  

                        </span>
                            
                {/* </span> */}
            </div>
        )
    }
}