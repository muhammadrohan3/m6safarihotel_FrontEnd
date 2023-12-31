export const imageUpload = async (images) => {
    let imgArr = [];
    for (const val of images) {
        const formData = new FormData()
        formData.append('file', val)
        formData.append('upload_preset', "wkeoc5wb")
        formData.append('cloud_name', "dwuohazeq")
        const res = await fetch("https://api.cloudinary.com/v1_1/dwuohazeq/upload", {
            method: "POST",
            body: formData,
        })
        const data = await res.json()
        imgArr.push({ url: data.secure_url, public_id: data.public_id })
    }
    return imgArr;
}