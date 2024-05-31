import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { storage } from '../../server/configs/firebase';

interface IUploadFile{
    file:File;
    documentId:string;
    collectionId:string;
    metadata?:any;
}

export const uploadFile = async ({
                                     file,
                                     documentId,
                                     collectionId,
                                     metadata
                                 }:IUploadFile

): Promise<string | null> => {
    if (!file) {
        throw new Error('Please select a file');
    }

    if (!documentId) {
        throw new Error('Please enter a document ID');
    }

    if (!collectionId) {
        throw new Error('Please enter a collection ID');
    }
    const storageRef = ref(storage, `${collectionId}/${documentId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file,metadata);

    return new Promise<string | null >((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                reject('Upload failed: ' + error.message);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    const db = getFirestore();
                    await addDoc(collection(db, 'files'), {
                        url: downloadURL,
                        documentId: documentId,
                        collectionId: collectionId,
                        createdAt: new Date(),
                    });
                    resolve(downloadURL);
                } catch (error:any) {
                    reject('Failed to save file metadata: ' + error.message);
                }
            }
        );
    });
};

export default uploadFile;
