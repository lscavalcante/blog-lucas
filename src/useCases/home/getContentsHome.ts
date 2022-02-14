import { getPrismicClient } from "../../services/prismic";
import Prismic from '@prismicio/client';
import { RichText } from "prismic-dom";

export interface IContent {
    title: string,
    subTitle: string,
    imageHeader: string,
    linkAction: string,
    mobile: string,
    mobileContent: string,
    mobileBanner: string,
    titleWeb: string,
    webContent: string,
    webBanner: string,
}

export async function getContentsHome(): Promise<IContent> {
    try {
        const prismic = getPrismicClient();

        const response = await prismic.query([
            Prismic.Predicates.at('document.type', 'home')
        ])

        console.log(response.results[0].data)

        const {
            title,
            sub_title,
            image_header,
            link_action,
            mobile,
            mobile_content,
            mobile_banner,
            title_web,
            web_content,
            web_banner,
        } = response.results[0].data as any;

        const content: IContent = {
            title: RichText.asText(title),
            subTitle: RichText.asText(sub_title),
            imageHeader: image_header.url,
            linkAction: link_action.url,
            mobile: RichText.asText(mobile),
            mobileContent: RichText.asText(mobile_content),
            mobileBanner: mobile_banner.url,
            titleWeb: RichText.asText(title_web),
            webContent: RichText.asText(web_content),
            webBanner: web_banner.url,
        };

        return content;
    } catch (error) {
        throw "Ocorreu um erro no metodo que busca o conteudo da tela home";
    }
}