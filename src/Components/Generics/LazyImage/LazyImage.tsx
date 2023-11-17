import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Props {
    imageSrc: string;
    imageAlt: string
}


function LazyImage(props: Props): JSX.Element {
    return (
        <LazyLoadImage
            style={{
                maxWidth:"60%",
                borderRadius:'3px'
            }}
            width={'100%'}
            alt={props.imageAlt}
            effect="blur"
            src={props.imageSrc} />
    );
}

export default LazyImage;
