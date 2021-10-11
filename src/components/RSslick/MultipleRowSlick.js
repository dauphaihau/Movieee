import React from "react";
import Slider from "react-slick";
import Film from "../Film/Film";
import styleSlick from './MultipleRowSlick.module.css'
import {useDispatch, useSelector} from "react-redux";
import {SET_FILM_COMING_SOON, SET_FILM_NEW_IN} from "../../store/types/Type";

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{...style, display: "block", left: '-50px'}}
            onClick={onClick}
        />
    );
}

function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{...style, display: "block"}}
            onClick={onClick}
        />
    );
}


function MultipleRowSlick(props) {

    const dispatch = useDispatch();
    console.log('props', props)

    const renderListFilms = () => {

        return props.arrFilms.slice(0, 12).map((film, index) => {
            return <div key={index}>
                <Film film={film}/>
            </div>
        })
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 3,
        slidesToScroll: 3,

        className: "center variable-width",
        // centerMode: true,
        // centerPadding: "60px",
        rows: 1,
        slidesPerRow: 2,
        autoplay: true,
        pauseOnHover: true,
        variableWidth: true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>
        , responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    prevArrow: false,
                    nextArrow: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    // centerMode: true,
                    // centerPadding: "60px",
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: false,
                    nextArrow: false,
                }
            }
        ]
    };

    return (
        <div>
            <div className='flex mb-4'>
                <button
                    className="bg-white mr-4 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    onClick={() => {
                    dispatch({type: SET_FILM_NEW_IN})
                }}>
                    ĐANG CHIẾU
                </button>
                <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    onClick={() => {
                        dispatch({type: SET_FILM_COMING_SOON})
                    }}>
                    SẮP CHIẾU
                </button>
            </div>
            <Slider {...settings}>
                {renderListFilms()}
            </Slider>
        </div>
    );
}


export default MultipleRowSlick