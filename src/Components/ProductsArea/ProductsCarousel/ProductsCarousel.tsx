import "./ProductsCarousel.css";
import ProductCard from "../ProductCard/ProductCard";
import ProductModel from "../../../Models/ProductModel";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';

interface productsCarouselProps {
    products: ProductModel[]
}

function ProductsCarousel(props: productsCarouselProps): JSX.Element {
    return (
        <div className="ProductsCarousel">
            
                <Swiper
                    grabCursor
                    navigation
                    slidesPerView={1}
                    spaceBetween={10}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 0,
                        },

                        1600: {
                            slidesPerView: 4,
                            spaceBetween: 0,
                        },
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {props.products.map((p, i) => <SwiperSlide key={i}><ProductCard {...p} /></SwiperSlide>)}
                </Swiper>
            
        </div>
    );
}

export default ProductsCarousel;
