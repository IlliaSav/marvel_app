import React from 'react';
import { Formik, Form} from 'formik';
import Spinner from '../spinner/Spinner';
import './popup.scss';

const InfoBanner = () => {
    return (
        <div>
        <Formik>
            <Form>
                <div className='modal'>
                    <label className='label'>Note!</label>
                    <h2 className='title'>This is a test project and uses a third-party API (Marvel). Therefore, the speed of loading characters and comics depends only on the server, which unfortunately responds very slowly (~30 sec).
                    Thank you for being patient!</h2>
                </div>
                <Spinner/>
            </Form>
        </Formik>
    </div>
    )
}

export default InfoBanner;