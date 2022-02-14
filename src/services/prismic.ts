import Prismic from '@prismicio/client'


const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_URL as string;

export function getPrismicClient(req?: any) {

    const prismic = Prismic.client(repositoryName, {
        req,
    })
    

    return prismic;
}