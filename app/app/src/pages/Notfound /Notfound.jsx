import React from 'react';
import style from './Notfound.module.css'


const Notfound = () => {
    return (
        <div className={style.not_found_message}>
            <h1>404 Not Found</h1>
        </div>
    );
};

export default Notfound;