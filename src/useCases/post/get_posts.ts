import { getPrismicClient } from "../../services/prismic";
import Prismic from '@prismicio/client';
import { RichText } from "prismic-dom";


export interface IPage<T> {
    page: number;
    results_per_page?: number;
    results_size?: number;
    total_results_size?: number;
    total_pages: number;
    next_page?: any;
    prev_page?: any,
    results: Array<T>,
}

export interface IPost {
    slug: string,
    title: string,
    description: string,
    cover: string,
    updateAt: string
}

export async function getPosts(page: number): Promise<IPage<IPost>> {
    try {
        const prismic = getPrismicClient();

        const response = await prismic.query([
            Prismic.Predicates.at('document.type', 'post')
        ], {
            orderings: "[document.last_publication_data desc]",
            fetch: ['post.title', 'post.description', 'post.cover'],
            pageSize: 2,
            page: page
        })

        const posts = response.results.map(post => {
            return {
                slug: post.uid,
                title: RichText.asText(post.data.title),
                description: post.data.description.find(content => content.type === 'paragraph')?.text ?? '',
                cover: post.data.cover.url,
                updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })
            }
        }) as IPost[]

        let data: IPage<IPost> = {
            ...response,
            results: posts
        }


        return data;
    } catch (error) {
        console.log(error);
        throw "Ocorreu um erro ao buscar os conteudos de post";
    }
}