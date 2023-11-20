type infoArr = {
    id: number,
    title: string,
    urlLink: string,
    filename: JSX.Element,
    imgUrl: string,
    description: string,
    productsArr?: Array<productsArr> | string | undefined
}

type productsArr = {
    id: number,
    title: string,
    urlLink: string,
    filename: JSX.Element,
    imgUrl: string,
    description: string,
}