import React, {useEffect, useState} from 'react';
import {CustomCard} from "@tsamantanis/react-glassmorphism";
import '../../assets/styles/circle.css'
import {Tabs, Radio, Space, Rate} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getDetailFilmsAction} from "../../store/actions/FilmsAction";
import moment from "moment";
import {NavLink} from "react-router-dom";
import {Button} from "@nextui-org/react";
import {history} from "../../util/settings";

const {TabPane} = Tabs;

function Detail(props) {

    const dispatch = useDispatch();
    const {detailFilm} = useSelector(state => state.FilmsReducer)

    console.log('detail-film', detailFilm)

    const [state, setState] = useState({
        tabPosition: 'left',
        // tabPosition: 'top',
        width: window.innerWidth,
        height: window.innerHeight
    })

    if (state.width <= 768) {
        setState({
            tabPosition: 'top'
        })
    }

    useEffect(() => {
        let {id} = props.match.params;

        dispatch(getDetailFilmsAction(id))
        window.onload = () => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
    }, [])

    const {tabPosition} = state;

    return (
        <div style={{
            backgroundImage: `url(${detailFilm.hinhAnh})`,
            backgroundSize: '100%',
            backgroundPosition: 'center',
            minHeight: '100vh'
        }}>
            <CustomCard style={{paddingTop: 150, minHeight: '100vh'}}
                        effectColor="#fff" // required
                        color="#000000" // default color is white
                        blur={50} // default blur value is 10px
                        borderRadius={1}
            >
                <div className='w-2/3 lg:w-9/12 ml-72 lg:ml-52 mx-auto container py-5 rounded-lg'>
                    <div className='grid grid-cols-3 gap-x-8'>
                        <img className='col-span-1 rounded-lg' src={detailFilm.hinhAnh}
                             style={{width: 250, height: 300}}
                             alt={detailFilm.tenPhim}/>
                        <div className='col-span-2 text-white -ml-20'>
                            <p className='text-4xl mb-4'>{detailFilm.tenPhim}</p>
                            <p>{detailFilm.moTa}</p>
                            <p className='text-sm'>Ngày khởi
                                chiếu: {moment(detailFilm.ngayKhoiChieu).format('DD.MM.YY')}</p>
                            <div style={{marginBottom: 18}}>
                                <Rate style={{fontSize: 16}} allowHalf value={detailFilm.danhGia / 2}/>
                            </div>
                            <button
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow">
                                <a href={detailFilm.trailer} style={{color: 'black'}}>XEM TRAILER</a>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='my-20 w-2/3 lg:w-9/12 ml-72 lg:ml-52 mx-auto container bg-white px-5 py-9 rounded-lg'>
                    <Tabs tabPosition={tabPosition} defaultActiveKey='1' centered>
                        <TabPane tab="Lịch chiếu" key="1">
                            <div>
                                <Tabs tabPosition={tabPosition}>
                                    {detailFilm.heThongRapChieu?.map((cinema, index) => {
                                        return <TabPane key={index}
                                                        tab={
                                                            <div className='flex flex-row justify-center items-center'>
                                                                <img src={cinema.logo} width={50} height={50}
                                                                     alt={cinema.logo}/>
                                                                <div className='text-center ml-2'>
                                                                    {cinema.tenHeThongRap}
                                                                </div>
                                                            </div>
                                                        }>
                                            {cinema.cumRapChieu.slice(0,5).map((cumRap, index) => {
                                                return <div className='mt-5' key={index}>
                                                    <div className='flex flex-row  mt-2'>
                                                        <img width={100} height={100} src={cumRap.hinhAnh}
                                                             alt={cumRap.tenCumRap}/>
                                                        <div className='ml-5'>
                                                            <p className='text-xl font-bold leading-3'>{cumRap.tenCumRap}</p>
                                                            <p style={{marginBottom: 21}}>{cumRap.diaChi}</p>
                                                            <div className='flex flex-row'>
                                                                {cumRap.lichChieuPhim.slice(0, 4).map((showtime, index) => {
                                                                    return <Button className='mr-4 hover:bg-gray-100' size='mini' shadow key={index}
                                                                                   color="primary" auto
                                                                                   onClick={() => {
                                                                                       history.push(`/checkout/${showtime.maLichChieu}`)
                                                                                   }}
                                                                    >
                                                                        {moment(showtime.ngayKhoiChieu).format('hh:mm A')}
                                                                    </Button>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </TabPane>
                                    })}

                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Thông tin" key="2" style={{minHeight: 300}}>

                        </TabPane>
                        <TabPane tab="Đánh giá" key="3" style={{minHeight: 300}}>

                        </TabPane>
                    </Tabs></div>

            </CustomCard>
        </div>);
}

export default Detail;