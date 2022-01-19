const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"]

function saveImage(image, imageEncoded) {
    if (imageEncoded == null) return
    const img = JSON.parse(imageEncoded)
    if (img != null && imageMimeTypes.includes(img.type)) {
        image.coverImage = new Buffer.from(img.data, 'base64')
        image.coverImageType = img.type
    }
}

module.exports = saveImage