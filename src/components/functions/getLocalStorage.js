const getLocalStorageItem = (key,json=false) => {
    let item = localStorage.getItem(key);

    if (item !== undefined || item !== null) {

        if (item === "true") {
            return true;

        } else if (item === "false") {
            return false;
        }else if (json){
            return JSON.parse(item);
        }
         else {
            return item
        }
    } else {
        return null
    }
}

export default getLocalStorageItem