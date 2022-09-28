import React from 'react'
import { Link } from 'react-router-dom'
const styleDiv={
    display:'flex',
    flexDirection:'row',
     justifyContent:'space-between',
     marginBottom:'5px',
    
    padding:'10px'}
const ViewProductCardPropComp = ({product}) => {
    const {price,shipping,color,sold,quantity,category,subs,brand,slug,}=product

  return (
        <>
    {/* <ul className='list-group' style={{backgroundColor:'green'}}>
         <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill pull-xs-right">
          $ {price}
        </span>
      </li>    
    </ul> */}
        <div className="" style={styleDiv}>
            <span> Price{" "} </span>
           <span className=''>${price}</span>
        </div>

        {category &&
            <div className="" style={styleDiv}>
                <span> Category{" "} </span>
            <Link to={`/category/${category.slug}`} style={{textDecoration:'none'}}>{category.name}</Link>
            </div>
        }

        {subs && subs.length>0&&( 
            <div className="" style={styleDiv}>
        
                <span> SubCategories{" "} </span>
                {subs.map((sub)=>(
                    <Link to={`/sub-category/${sub.slug}`} key={sub._id} style={{textDecoration:'none'}}>
                        {sub.name}
                    </Link>))}
    
            </div>
            )}
                <div className="" style={styleDiv}>
            <span> Shipping{" "} </span>
           <span className=''>{shipping}</span>
        </div>

        <div className="" style={styleDiv}>
            <span> Color{" "} </span>
           <span className=''>{color}</span>
        </div>

        <div className="" style={styleDiv}>
            <span> Brand{" "} </span>
           <span className=''>{brand}</span>
        </div>
        <div className="" style={styleDiv}>
            <span> Available{" "} </span>
           <span className=''>{quantity}</span>
        </div>
        <div className="" style={styleDiv}>
            <span> Sold{" "} </span>
           <span className=''>{sold}</span>
        </div>
    </>

            
    
  )
}

export default ViewProductCardPropComp