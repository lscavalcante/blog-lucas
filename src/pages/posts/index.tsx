import Head from 'next/head';
import styles from './styles.module.scss';

import Image from 'next/image';
import Link from 'next/link';

import { toast } from 'react-toastify';

import { FiChevronRight, FiChevronLeft, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { GetStaticProps } from 'next';
import { getPosts, IPage, IPost } from '../../useCases/post/get_posts';
import { useState } from 'react';
import Router from 'next/router';
import Loading from '../../components/Loading';


export interface IPostProps {
    data: IPage<IPost>,
    isError: boolean
}


export default function Posts({ data, isError }: IPostProps) {

    const [page, setPage] = useState<IPage<IPost>>(data || null);
    const [posts, setPosts] = useState<IPost[]>(data.results || []);
    const [loading, setIsLoading] = useState<boolean>();
    const [error, setError] = useState<boolean>(isError);

    async function fetchPosts(pageNumber: number) {
        try {
            setError(false);
            setIsLoading(true);
            const data = await getPosts(pageNumber);
            setPage(data);

            data.results.map(post => {
                setPosts(posts => [...posts, post]);
            })

            toast.success("Dados carregado com sucesso!");

            // altera o valor da url sem recarregar a pagina!
            // Router.push({ pathname: '/posts', query: { page: data.page } }, undefined, { shallow: true })

        } catch (error) {
            toast.error("Ocorreu um erro ao buscar os dados!");
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Head>
                <title>Conteúdo</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>

                    {posts.map(post => (
                        <Link key={post.slug} href={`/posts/${post.slug}`}>
                            <a key={post.slug}>
                                <Image
                                    src={post.cover}
                                    alt='' width={720}
                                    height={410}
                                    quality={100}
                                    placeholder="blur"
                                    blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM00NCoBwACEQEBHg90agAAAABJRU5ErkJggg=="}
                                />
                                <strong>{post.title}</strong>
                                <time>{post.updateAt}</time>
                                <p>{post.description}</p>
                            </a>
                        </Link>
                    ))}

                    {/* <div className={styles.buttonNavigate}>

                        {
                            page.page >= 2 && (
                                <div>
                                    <button onClick={() => fetchPosts(1)}>
                                        <FiChevronsLeft size={25} color="#fff" />
                                    </button>
                                    <button onClick={() => fetchPosts(page.page - 1)}>
                                        <FiChevronLeft size={25} color="#fff" />
                                    </button>
                                </div>
                            )
                        }

                        {
                            page.page < page.total_pages && (
                                <div>
                                    <button onClick={() => fetchPosts(page.page + 1)}>
                                        <FiChevronsRight size={25} color="#fff" />
                                    </button>
                                    <button onClick={() => fetchPosts(page.total_pages)}>
                                        <FiChevronRight size={25} color="#fff" />
                                    </button>
                                </div>
                            )
                        }
                    </div> */}

                    <button onClick={() => fetchPosts(page.page + 1)} disabled={page.page >= page.total_pages} className={styles.buttonPost}> 
                       {
                           loading ? <Loading/>: "Carregar Mais"
                       }
                    </button>


                </div>
            </main>


        </>
    )
}


export const getStaticProps: GetStaticProps = async () => {

    let result: IPage<IPost> | null;
    let isError = false;

    try {
        result = await getPosts(1);


    } catch (error) {
        isError = true;
        result = null;

    } finally {
        return {
            props: {
                data: result!,
                isError: isError,
            },
            revalidate: 60 * 2 // a cada 2 minutos
        }
    }


}