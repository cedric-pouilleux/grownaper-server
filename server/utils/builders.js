import slugify from "slugify";

/**
 * Variety builder
 * @param param
 * @returns {{breeders, automatic: *, title, floTime: (*|{default: number, type: Number | NumberConstructor}), feminized: *, slug: string}}
 */
const varietyPayloadBuilder = (param) => {
    const title = param.title;
    const feminized = param.feminized;
    const automatic = param.automatic;
    const floTime = param.floTime;
    const breeder = param.breeder;
    const phenotype = param.phenotype;

    return {
        title,
        phenotype,
        feminized,
        automatic,
        floTime,
        breeder,
        slug: [
            slugify(title),
            feminized ? 'feminized' : null,
            automatic ? 'automatic' : null
        ].filter(Boolean).join('-')
    }

}

export {
    varietyPayloadBuilder
}