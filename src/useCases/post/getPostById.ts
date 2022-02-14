import { getPrismicClient } from "../../services/prismic";
import Prismic from '@prismicio/client';
import { RichText } from "prismic-dom";
import { IPost } from "./get_posts";


export async function getPostById(uid: string, req?: any): Promise<IPost> {
    try {
        const prismic = getPrismicClient(req);

        const response = await prismic.getByUID('post', uid, {}) as any ;

        if (!response) {
            throw "O uid não foi encontrado !!!";
        }

        const data: IPost = {
            title: RichText.asText(response.data.title),
            cover: response.data.cover.url,
            description: RichText.asHtml(response.data.description),
            updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }),
            ...response,
        }



        return data;
    } catch (error) {
        if(error === String) {
            throw error;
        }
        throw `${error}`
    }
}