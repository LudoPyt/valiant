import React, { useEffect } from 'react';

const Credits = () => {

    useEffect(() => {
        document.querySelector('.navbar').classList.remove('isActive');
        document.querySelector('.menu__button').classList.remove('isOpen');
    }, [])

    return (
        <main>
            <div className="credits">
                PAGE CREDITS
            </div>
        </main>
    )
}

export default Credits;
