export function listImage(data) {
    let returndata = data.description?.mainImages?.filter(res => {
        if (res.makeListing == true) {
            return res.image
        } else {
            return false
        }
    })
    return returndata[0].image
}

