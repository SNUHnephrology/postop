import React from 'react';


interface HeaderProps {
    children?: React.ReactNode;
    content_maxheight: number;
}

const Header: React.FC<HeaderProps> = (props) => {
    const {children, content_maxheight} = props;
    return (
        <div className='header'
            style={{
                height: `calc(${content_maxheight}rem + 2rem)`,
            }}
        >
            {children}
        </div>
    );
};

export default Header;
