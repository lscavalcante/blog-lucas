import styles from './styles.module.scss';
import { AiFillInstagram, AiFillFacebook, AiFillLinkedin, AiFillYoutube } from 'react-icons/ai';

export default function About() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <section>
                        <h1>Programador</h1>
                        <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat accusamus temporibus in sint commodi dignissimos. Amet itaque doloribus commodi inventore ducimus error dolores molestias quidem, eligendi atque odio. Earum, rem?
                        </span>
                        <div className={styles.contentSocialMedia}>
                            <AiFillYoutube size={33} />
                            <AiFillInstagram size={33} />
                            <AiFillFacebook size={33} />
                            <AiFillLinkedin size={33} />
                        </div>
                    </section>
                    <img src="/images/about.png" alt="about image" />
                </div>

            </div>
        </>
    )
}