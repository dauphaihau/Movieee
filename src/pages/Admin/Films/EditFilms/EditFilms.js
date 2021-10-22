import React, {Fragment, useEffect, useState} from 'react';
import moment from "moment";
import {
    Form,
    Input,
    Radio,
    DatePicker,
    Button,
    Switch, Rate,
} from 'antd';
import {useFormik} from "formik";
import {GROUP_ID} from "../../../../util/settings";
import {getInfoFilmsAction, updateFilmsAction} from "../../../../store/actions/FilmsAction";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";

const desc = ['quá dở', 'dở', 'bình thường', 'tốt', 'tuyệt vời'];

function EditFilms(props) {

    const [star, setStar] = useState(3);
    const {infoFilm} = useSelector(state => state.FilmsReducer)
    const dispatch = useDispatch();

    console.log('info-film', infoFilm)
    useEffect(() => {
        dispatch(getInfoFilmsAction(props.match.params.id))
    }, [])

    const [componentSize, setComponentSize] = useState('default');

    const [imgSrc, setImgSrc] = useState('');

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: infoFilm.maPhim,
            tenPhim: infoFilm.tenPhim,
            trailer: infoFilm.trailer,
            moTa: infoFilm.moTa,
            maNhom: GROUP_ID,
            ngayKhoiChieu: infoFilm.ngayKhoiChieu,
            sapChieu: infoFilm.sapChieu,
            dangChieu: infoFilm.dangChieu,
            hot: infoFilm.hot,
            danhGia: infoFilm.danhGia,
            hinhAnh: null
        },
        validationSchema: Yup.object({
            tenPhim: Yup.string().required('Tên phim không được bỏ trống'),
            moTa: Yup.string().required('Mô tả không được để trống'),
            trailer: Yup.string().required('trailer không được để trống'),
            ngayKhoiChieu: Yup.string().required('Ngày khởi chiếu không được để trống'),
        }),
        onSubmit: (values) => {
            console.log(values)
            values.maNhom = GROUP_ID
            let formData = new FormData();

            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }
            console.log('values', values)
            dispatch(updateFilmsAction(formData))
        }
    })

    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    const handleChangeDataPicker = (date) => {
        const dateLocal = moment(date)
        formik.setFieldValue('ngayKhoiChieu', dateLocal)
    }

    const handleChangeSwitch = (name, checked) => {
        formik.setFieldValue(name, checked)
    }

    const handleChangeFile = async (e) => {
        let file = e.target.files[0];

        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            await formik.setFieldValue('hinhAnh', file)
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }
        }

    }

    return (
        <Fragment>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                initialValues={{size: componentSize}}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label='Chức năng'>
                    <span className="ant-form-text font-bold">CHỈNH SỬA PHIM</span>
                </Form.Item>

                <Form.Item label="Tên phim" required validateStatus='validating'
                           help={formik.touched.tenPhim && formik.errors.tenPhim ? `${formik.errors.tenPhim}` : null}
                >
                    <Input onChange={formik.handleChange} name='tenPhim' value={formik.values.tenPhim}/>
                </Form.Item>
                <Form.Item label="Mô tả"
                           required validateStatus='error'
                           help={formik.touched.moTa && formik.errors.moTa ? `${formik.errors.moTa}` : null}
                >
                    <Input onChange={formik.handleChange} name='moTa' value={formik.values.moTa}/>
                </Form.Item>
                <Form.Item label="Trailer"
                           required validateStatus='error'
                           help={formik.touched.trailer && formik.errors.trailer ? `${formik.errors.trailer}` : null}
                >
                    <Input onChange={formik.handleChange} name='trailer' value={formik.values.trailer}/>
                </Form.Item>

                <Form.Item label="Ngày khởi chiếu"
                           required validateStatus='error'
                           help={formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? `${formik.errors.ngayKhoiChieu}` : null}
                >
                    <DatePicker onChange={handleChangeDataPicker} format='DD/MM/YYYY' name='ngayKhoiChieu'
                                value={moment(formik.values.ngayKhoiChieu)}
                    />
                </Form.Item>

                <Form.Item label="Đang chiếu">
                    <Switch
                        onChange={(checked) => {
                            handleChangeSwitch('dangChieu', checked)
                        }}
                        name='dangChieu'
                        checked={formik.values.dangChieu}
                    />
                </Form.Item>
                <Form.Item label="Sắp chiếu">
                    <Switch
                        onChange={(checked) => {
                            handleChangeSwitch('sapChieu', checked)
                        }}
                        name='sapChieu'
                        checked={formik.values.sapChieu}
                    />
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch
                        onChange={(checked) => {
                            handleChangeSwitch('hot', checked)
                        }}
                        name='hot'
                        checked={formik.values.hot}
                    />
                </Form.Item>

                <Form.Item label="Đánh giá" name={['danhGia']}>
                    <Rate tooltips={desc} value={star} onChange={(value) => {
                        setStar(value);
                        formik.setFieldValue('danhGia', value)
                    }} name='danhGia'
                    />
                    {star ? <span className="ant-rate-text">{desc[star - 1]}</span> : ''}
                </Form.Item>


                <Form.Item label="Hình ảnh"
                           required validateStatus='error'
                           help={formik.touched.hinhAnh && formik.errors.hinhAnh ? `${formik.errors.hinhAnh}` : null}
                >
                    <input onChange={handleChangeFile}
                           accept='image/png, image/jpq, image/jpeg, image/gif' type='file'
                           name='hinhAnh'/>
                    <img width={200} className='mt-2'
                         src={imgSrc === '' ? infoFilm.hinhAnh : imgSrc}
                         alt={formik.values.tenPhim}
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        xs: {span: 24, offset: 0},
                        sm: {span: 16, offset: 6},
                        lg: {span: 16, offset: 6},
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Chỉnh sửa
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
}

export default EditFilms;
