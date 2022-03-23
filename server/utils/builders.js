import slugify from "slugify";

const varietyPayloadBuilder = (param) => {
    const title = param.title;
    const feminized = param.feminized;
    const automatic = param.automatic;
    const floTime = param.floTime;
    return {
        title,
        feminized,
        automatic,
        floTime,
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