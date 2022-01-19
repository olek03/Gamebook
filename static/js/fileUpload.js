FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
)

FilePond.setOptions({
    stylePanelAspectRatio: 150 / 150,
    imageResizeTargetWidth: 150,
    imageResizeTargetHeight: 150
})

FilePond.parse(document.body)

const ads = document.querySelectorAll("a")
for (let i = 0; i < ads.length; i++) {
    if (ads[i].className == "filepond--credits") ads[i].remove()
}