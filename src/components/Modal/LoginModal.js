import React from 'react';
import {Button, Checkbox, Input, Modal, Row, Text} from "@nextui-org/react";
import {history} from "../../util/settings";
import {Password} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_MODAL} from "../../store/types/Type";
import {useFormik} from "formik";
import {LoginModalAction} from "../../store/actions/UserAction";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function LoginModal() {
    const dispatch = useDispatch();
    const {visible, messageServer} = useSelector(state => state.UserReducer)

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
        },
        onSubmit: values => {
            console.log('values', values)
            dispatch(LoginModalAction(values))
        }
    })

    return <div>

        <Modal
            closeButton={false}
            blur
            aria-labelledby="modal-title"
            open={visible}
            preventClose
            onSubmit={formik.handleSubmit}
            className='py-4'
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>Sign in</Text>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        bordered
                        className='mb-3'
                        color="primary"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.taiKhoan && formik.errors.taiKhoan ? `${formik.errors.taiKhoan}` : null}
                        clearable name='taiKhoan'
                        size='large' width='100%'
                        contentLeft={<AccountCircleIcon/>}
                    />
                    {messageServer !== '' ? <p className='jsx-2076578745 helper-text
                    text-[#f21361] mt-[-11px] mb-4
                    text-[0.7rem] ml-[10px]
                    '>{messageServer}</p> : ''
                    }
                    <Input
                        className='mb-3'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.matKhau && formik.errors.matKhau ? `${formik.errors.matKhau}` : null}
                        name='matKhau'
                        size='large' type="password"
                        width='100%'
                        placeholder='Password'
                        clearable
                        bordered
                        color="primary"
                        contentLeft={<Password/>}
                    />
                    <Row justify="space-between">
                        <Checkbox>
                            <Text size={14}>Remember me</Text>
                        </Checkbox>
                        <Text size={14} className='cursor-pointer'>Forgot password?</Text>
                    </Row>
                    <div className='flex justify-end mt-4'>
                        <Button auto flat color="error" onClick={() => {
                            dispatch({type: CLOSE_MODAL})
                            history.goBack()
                        }}>
                            Close
                        </Button>
                        <Button htmlType='submit' type='submit' className='ml-2' auto>Sign in</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    </div>
}

export default LoginModal;