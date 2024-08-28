import React from 'react';
import { Formik, Form} from 'formik';
import Spinner from '../spinner/Spinner';
import './popup.scss';

const InfoBanner = () => {
    
    // <Popup trigger={<button className="button"> Info </button>} modal>
    //     <span> Note that this is a test project and uses a third-party API (Marvel). Therefore, the speed of loading characters and comics depends only on the server, which unfortunately responds very slowly (~30 sec).
    //     Thank you for being patient! </span>
    // </Popup>
    return (
        // <div>Note that this is a test project and uses a third-party API (Marvel). Therefore, the speed of loading characters and comics depends only on the server, which unfortunately responds very slowly (~30 sec).
        // Thank you for being patient!</div>
        <div className='modal'>
        <Formik>
            <Form>
                <label className='label' htmlFor="charName">Note that this is a test project and uses a third-party API (Marvel). Therefore, the speed of loading characters and comics depends only on the server, which unfortunately responds very slowly (~30 sec).
                Thank you for being patient!
                </label>
                <Spinner/>
            </Form>
        </Formik>
    </div>
    )
}

export default InfoBanner;