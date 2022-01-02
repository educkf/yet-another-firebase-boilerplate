import { db } from "~/config/firebase";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, updateDoc } from 'firebase/firestore/lite';
import dayjs from "dayjs";

export default {
    async list(path, ...queryParams) {

        try {
            let queryRef;

            if (queryParams && queryParams.length && queryParams[0]) {
                queryRef = query(collection(db, path), ...queryParams)

            } else {
                queryRef = collection(db, path);
            }

			const querySnapshot = await getDocs(queryRef);

			const list = [];

			querySnapshot.forEach(function (doc) {
				const data = doc.data();

				const docObj = {
					...data,
					_id: doc.id
				};

				list.push(docObj);
			});

			return list;

		} catch (err) {
			console.log({ err });

			return {
				_status: false,
				_message: "Error api/_base.js: " + err
			};
		}
	},

	async get(path, docId) {
		try {
            const docRef = doc(collection(db, path), docId);

            const document = await getDoc(docRef);

			if (document.exists())
				return {
					...document.data()
				};

			else
				return {
					_status: false,
					_message: "Document not found"
				};

		} catch (err) {
			console.log({ err });

			return {
				_status: false,
				_message: "Error api/_base.js: " + err
			};
		}
    },

    async getLatest(path) {
		try {
            const doc = await getDocs(query(collection(db, path), orderBy("id", "desc"), limit(1)));

			if (doc && !doc.empty)
				return {
                    _status: true,
                    _id: doc[0].id,
                    data: { ...doc[0].data() }
				};

			else
				return {

					_message: "Document not found"
				};

		} catch (err) {
			console.log({ err });

			return {
				_status: false,
				_message: "Error api/_base.js: " + err
			};
		}
	},

	async add(path, data) {
		try {
			let docRef;

			if (data._id) {
                docRef = doc(collection(db, path), data._id);

			} else {
				docRef = doc(collection(db, path));
			}

			await setDoc(docRef, {
				_id: docRef.id,
                ...data,
                metaData: {
                    ...data.metaData,
                    createDate: dayjs().unix(),
                }
            });

            return {
                _id: docRef.id,
				_status: true,
				_message: "Document created."
			};

		} catch (err) {
			console.log({ err });

			return {
				_status: false,
				_message: "Error api/_base.js: " + err
			};
		}
	},

	async update(path, data) {
		try {
            const docRef = doc(db, path, data._id);

            await updateDoc(docRef, {
                ...data,
                metaData: {
                    ...data.metaData,
                    updateDate: dayjs().unix(),
                }
            });

			return {
				_status: true,
				_message: "Document updated."
			};

		} catch (err) {
			console.log({ err });

			return {
				_status: false,
				_message: "Error api/_base.js: " + err
			};
		}
	},

	async remove(path, docId) {
		try {
            const docRef = doc(db, path, docId);

            await updateDoc(docRef,
                {
                    "metaData.deleteDate": dayjs().unix(),
                    status: 'deleted'
                }
            );

			return {
				_status: true,
				_message: "Document deleted."
			};

		} catch (err) {
			console.log({ err });

			return {
				_status: false,
				_message: "Error api/_base.js: " + err
			};
		}
	},

	async getId(path) {
		try {
			return await db.collection(path)
				.doc();

		} catch (err) {
			console.log({ err });

			return {
				_status: false,
				_message: "Error api/_base.js: " + err
			};
		}
	}
};
