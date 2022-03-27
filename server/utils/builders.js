import slugify from "slugify";

const varietyPayloadBuilder = (param) => {
    const title = param.title;
    const feminized = param.feminized;
    const automatic = param.automatic;
    const floTime = param.floTime;
    const breeders = param.breeders;

    return {
        title,
        feminized,
        automatic,
        floTime,
        breeders,
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