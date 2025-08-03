import React from 'react';
import { navMenu } from '../utils';
import { Link } from 'react-router-dom';

export default function NavMenu() {
    return (
        <ul className='flex flex-row justify-center items-center gap-10'>
            {navMenu.map((item, index) => {
                return (
                    <li key={index} className='text-white text-md font-bold'>
                        <Link to={item.path}>{item.name}</Link>
                    </li>
                )
            })}
        </ul>
    )
}
