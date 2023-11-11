import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import globals from '../../../Services/Globals';



interface Props{
    imageNames:string[]
}
const Slideshow = (props:Props) => {
    
    return (
        <div className='Slideshow' >
            {props.imageNames?.length &&
                <Slide slidesToScroll={1} arrows={props.imageNames?.length>1 ? true : false} slidesToShow={1} indicators={props.imageNames?.length>1 ? true : false} autoplay={false} canSwipe infinite={false} transitionDuration={300}>
                    {props.imageNames?.map((img, i) => <img width="100%" key={i} alt='img' src={globals.productsUrl + "/img/" + img} />)}
                </Slide>
            }
        </div>
    );
};

export default Slideshow;