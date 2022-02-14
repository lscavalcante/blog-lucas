import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/home.module.scss';
import techsImage from '../../public/images/techs.svg';
import { IContent, getContentsHome } from '../useCases/home/getContentsHome';

export interface IContentProps {
  content?: IContent;
  isError: boolean;
}

export default function Home({ content, isError }: IContentProps) {


  return (
    <>
      <Head>
        <title>Apaixonado por tecnologia - Sujeito Programador</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content?.title}</h1>
            <span>{content?.subTitle}</span>
            <a>
              <button>COMEÇAR AGORA!</button>
            </a>
          </section>

          <img src={content?.imageHeader} alt="Contéudos programador" />

        </div>


        <hr className={styles.divisor} />


        <div className={styles.sectionContent}>
          <section>
            <h2>{content?.mobile}</h2>
            <span>{content?.mobileContent}</span>
          </section>
          <img src={content?.mobileBanner} alt="finance image mobile" />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <section>
            <h2>{content?.titleWeb}</h2>
            <span>{content?.webContent}</span>
          </section>
          <img src={content?.webBanner} alt="web dev" />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionFooter}>
          <Image src={techsImage} alt='' />
          <h2>Mais de <span className={styles.students}>15 mil</span> já levaram sua carreira ao próximo nivel.</h2>
          <span>E você vai perder a chance de evoluir de uma vez por todas?</span>
          <button>COMEÇAR AGORA!</button>
        </div>

      </main>

    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  let content;
  let isError = false;

  try {
    content = await getContentsHome();

  } catch (error) {
    isError = true;
    content = null;
    console.log(error);

  } finally {
    return {
      props: {
        content: content,
        isError: isError
      },
      revalidate: 60 * 2 // a cada 2 minutos
    }
  }


}

