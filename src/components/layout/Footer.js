import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa'

import styles from './Footer.module.css'

function Footer(){

    return(
        <>

            <hr className={styles.hr_footer} />

            <footer className={styles.footer}>
                <ul className={styles.social_list}>
                    <li> <FaFacebook /> </li>
                    <li> <FaInstagram /> </li>
                    <li> <FaTwitter /> </li>
                </ul>

                <p className={styles.copy_right} id="costs"> <span> Costs </span> &copy; 2023 </p>
            </footer>
        </>    
    )
}

export default Footer