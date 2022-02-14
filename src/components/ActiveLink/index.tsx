import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface IActiveLink extends LinkProps {
    children: ReactElement,
    activeClassName: string;
}

export default function ActiveLink({ children, activeClassName, ...rest }: IActiveLink) {

    const { asPath } = useRouter(); // se estiver na pagina de blog pega log

    const className = asPath === rest.href ? activeClassName : '';
    // se a rota/pagina for igual ao path ativa o link

    return (
        <Link {...rest}>
            {
                cloneElement(children, {
                    className
                })
            }
        </Link>
    )
}