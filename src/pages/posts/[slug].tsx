import { GetServerSideProps } from "next"
import Image from 'next/image';
import { toast } from "react-toastify";
import { getPostById } from "../../useCases/post/getPostById";
import { IPost } from "../../useCases/post/get_posts";

import styles from './post.module.scss';

interface PostProps {
    post?: IPost
}

export default function Post({ post }: PostProps) {
    console.log(post);


    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapperPost}>
                    <Image

                        src={post?.cover!}
                        alt='' width={720}
                        height={410}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM00NCoBwACEQEBHg90agAAAABJRU5ErkJggg=="}
                    />
                    <h1>{post?.title}</h1>
                    
                    <div className={styles.postDescription} dangerouslySetInnerHTML={{ __html: post?.description! }}></div>
                </div>
            </div>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    try {
        const { slug } = params as any

        const post: IPost = await getPostById(slug, req);

        console.log(post);
        return {
            props: {
                post: post
            }
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/posts',
                permanent: false,
            }
        }
    }

}