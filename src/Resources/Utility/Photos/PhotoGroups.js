import { Settings } from "../Config";
import { isNullOrUndefined } from "../verifying/verfyItems";


export function getPhotoGroupById(id) {

    if (isNullOrUndefined(photoGroupsData)) {
        getPhotoGroupsData
    }

}

var photoGroupsData = null;

async function getPhotoGroupsData() {
    Settings(["PhotoGroups.json"])
        .then(result => {
            photoGroupsData = JSON.parse(result);
        })
}