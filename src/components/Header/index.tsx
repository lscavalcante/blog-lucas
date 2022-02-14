import Link from 'next/link';
import ActiveLink from '../ActiveLink';
import styles from './styles.module.scss';

export default function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <img src="/images/techs.svg" alt="Logo header" />
                <nav>
                    <ActiveLink href="/" activeClassName={styles.active}>
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink href="/posts" activeClassName={styles.active}>
                        <a>Conteúdos</a>
                    </ActiveLink>
                    <ActiveLink href="/about" activeClassName={styles.active}>
                        <a>Quem somos?</a>
                    </ActiveLink>
                </nav>
                <button className={styles.readyButton}>Começar</button>
            </div>

        </div>
    )
}