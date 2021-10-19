import React, {useEffect} from 'react';
import {Disclosure, Transition} from '@headlessui/react'
import {CustomCard} from "@tsamantanis/react-glassmorphism";
import '../../assets/styles/circle.css'
import {Tabs, Radio, Space, Rate} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getDetailFilmsAction} from "../../store/actions/FilmsAction";
import moment from "moment";
import {NavLink} from "react-router-dom";
import {Button} from "@nextui-org/react";
import {history} from "../../util/settings";
import {ChevronUpIcon} from "@heroicons/react/solid";

const {TabPane} = Tabs;

function Detail_mobile(props) {

    const dispatch = useDispatch();
    const {detailFilm} = useSelector(state => state.FilmsReducer)

    console.log('detail-film', detailFilm)

    useEffect(() => {
        let {id} = props.match.params;

        dispatch(getDetailFilmsAction(id))
    }, [])

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
                <div className='mx-auto container py-5 rounded-lg'>
                    <div className=' gap-x-8'>
                        <img className='col-span-1 rounded-lg' src={detailFilm.hinhAnh}
                            // style={{width: 250, height: 300}}
                             alt={detailFilm.tenPhim}
                        />
                        <div className='col-span-2 text-white mt-8'>
                            <p className='text-4xl mb-4'>{detailFilm.tenPhim}</p>
                            <p>{detailFilm.moTa}</p>
                            <p className='text-sm'>Ngày khởi
                                chiếu: {moment(detailFilm.ngayKhoiChieu).format('DD.MM.YY')}</p>
                            <div style={{marginBottom: 18}}>
                                <Rate style={{fontSize: 16}} allowHalf value={detailFilm.danhGia / 2}/>
                            </div>
                            <Button shadow color="white" auto>
                                <a href={detailFilm.trailer} style={{color: 'black'}}>XEM TRAILER</a>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='my-20 mx-auto container bg-white px-0 py-5 rounded-lg'>
                    <Tabs defaultActiveKey='1' centered className='hidden'>
                        <TabPane tab="Lịch chiếu" key="1">
                            <div>
                                <Tabs tabPosition={'top'}>
                                    {detailFilm.heThongRapChieu?.map((cinema, index) => {
                                        return <TabPane key={index}
                                                        tab={
                                                            <div
                                                                className='flex flex-row justify-center items-center mr-4'>
                                                                <img src={cinema.logo} width={50} height={50}
                                                                     alt={cinema.logo}/>
                                                                <div className='text-center ml-2'>
                                                                    {cinema.tenHeThongRap}
                                                                </div>
                                                            </div>
                                                        }>
                                            {cinema.cumRapChieu.slice(0, 5).map((cumRap, index) => {
                                                return <div className='mt-5' key={index}>
                                                    <div className='flex flex-row  mt-2'>
                                                        <img width={100} height={100} src={cumRap.hinhAnh}
                                                             alt={cumRap.tenCumRap}/>
                                                        <div className='ml-5'>
                                                            <p className='text-xl font-bold leading-3'>{cumRap.tenCumRap}</p>
                                                            <p style={{marginBottom: 21}}>{cumRap.diaChi}</p>
                                                            <div className='flex flex-row'>
                                                                {cumRap.lichChieuPhim.slice(0, 4).map((showtime, index) => {
                                                                    return <Button className='mr-4' size='mini' shadow
                                                                                   key={index}
                                                                                   color="primary" auto
                                                                                   onClick={() => {
                                                                                       history.push(`/checkout/${showtime.maLichChieu}`)
                                                                                   }}
                                                                    >
                                                                        {moment(showtime.ngayChieuGioChieu).format('hh:mm A')}
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
                    </Tabs>

                    <div className="w-full px-4 pt-4">
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            Lịch chiếu
                        </span>
                        <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl">
                            {detailFilm.heThongRapChieu?.map((cinema, index) => {
                                return <Disclosure as='div' className='mb-2'>
                                    {({open}) => (
                                        <>
                                            <Disclosure.Button
                                                className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blupurplee-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                                                <span>{cinema.tenHeThongRap}</span>
                                                <ChevronUpIcon
                                                    className={`${
                                                        open ? 'transform rotate-180' : ''
                                                    } w-5 h-5 text-blue-500`}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-[5px] pb-4 pb-2 text-sm text-gray-500">
                                                {cinema.cumRapChieu.slice(0, 5).map((cumRap, index) => {
                                                    return <div className='mt-5' key={index}>
                                                        <div className='flex flex-row mt-2 h-full'>
                                                            <img width={70} height={70} className='rounded-lg' src={cumRap.hinhAnh}
                                                                 alt={cumRap.tenCumRap}/>
                                                            <div className='ml-4'>
                                                                <p className='text-[10px] font-bold leading-3'>{cumRap.tenCumRap}</p>
                                                                <p className='text-[10px] mb-4'>{cumRap.diaChi.length > 40 ?
                                                                    <span>{cumRap.diaChi.slice(0, 40)}..</span> :
                                                                    <span>{cumRap.diaChi}</span>}
                                                                </p>
                                                                <div className='flex flex-row'>
                                                                    {cumRap.lichChieuPhim.slice(0, 2).map((showtime, index) => {
                                                                        return <Button className='mr-4' size='mini'
                                                                                       shadow
                                                                                       key={index}
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
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            })}
                        </div>
                    </div>
                </div>

            </CustomCard>
        </div>);
}

export default Detail_mobile;