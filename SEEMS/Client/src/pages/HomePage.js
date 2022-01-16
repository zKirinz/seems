import { Fragment } from 'react'

import Header from '../components/Header'
import Introduction from '../components/Header/Introduction'

const introHeaderImage = {
    src: 'https://www.fpt-software.com/wp-content/uploads/sites/2/2020/02/Logistech-social-media-post-2-1024x536.png',
    size: '100% 100%',
}

const HomePage = () => {
    return (
        <Fragment>
            <Header />
            <Introduction src={introHeaderImage.src} size={introHeaderImage.size} />
        </Fragment>
    )
}

export default HomePage
