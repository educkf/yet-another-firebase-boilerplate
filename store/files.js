import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import dayjs from "dayjs";

export const state = () => ({
    list: [],
    single: {}
});

export const mutations = {
    SET_LIST(state, payload) {
      state.list = payload;
    },
    SET_SINGLE(state, payload) {
      state.single = payload;
    }
}

export const actions = {
    async upload(_, data) {
        const storage = getStorage();

        const extension = data.file.name.substring(
            data.file.name.lastIndexOf(".") + 1
        );

        const newFileName = `${data.filename}-${dayjs().unix()}.${extension}`;
        const dataRef = ref(storage, `${data.folder}/${newFileName}`);

        try {
            const snapshot = await uploadBytes(dataRef, data.file);

            if (snapshot?.metadata) {
                return snapshot.metadata;
            }
            return false;

        } catch (err) {
            console.log({ err });
            return false;
        }
    },

    async downloadFile(_, fullpath) {
        const storage = getStorage();

        return getDownloadURL(ref(storage, fullpath))
            .then((url) => {
                window.open(url, '_blank');
                return url;
            })
            .catch((error) => {
                console.log({ error })
                return false;
            });

    }
}
