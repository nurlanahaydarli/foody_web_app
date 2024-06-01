import {useState} from "react";
import {toast} from "react-toastify";
import {AxiosResponse} from "axios";

interface UseEntityHandlerProps {
    uploadFile:  (params: { file: File; collectionId: string; documentId: string }) => Promise<AxiosResponse<string | null>>;
    addEntity: (entity: object) => Promise<any>;
    editEntity: (entity: object, id: string | number) => Promise<any>;
    deleteEntity: (id: string | number) => Promise<any>;
    onClose: Function;
}

export const useEntityHandler = ({
                                     uploadFile ,
                                     addEntity,
                                     editEntity,
                                     deleteEntity,
                                     onClose
                                 }: UseEntityHandlerProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleEntity = async ({
                                    entity,
                                    Img,
                                    editImg,
                                    setEntities,
                                    inputs,
                                    isEdit,
                                    editID,
                                    collectionId,
                                    documentId
                                }: {
        entity: { [key: string]: any };
        Img: File | null;
        editImg?: File | null;
        setEntities: React.Dispatch<React.SetStateAction<any[]>>;
        inputs: { [key: string]: React.RefObject<HTMLInputElement> };
        isEdit: boolean;
        editID?: string | number;
        collectionId: string;
        documentId: string;
        onClose:Function;
    }) => {
        setLoading(true);
        setError(null);
        try {
            if (Img instanceof File) {
                const res = await uploadFile({
                    file: Img,
                    collectionId: collectionId,
                    documentId: documentId
                });
                entity.img_url = res;
            } else if (!Img && isEdit) {
                entity.img_url = editImg;
            }

            if (isEdit) {
                await editEntity(entity, editID);
                setEntities(prev => prev.map(item => (item.id === editID ? { ...item, ...entity } : item)));
                toast.success(`${collectionId[0].toUpperCase() + collectionId.slice(1)} successfully edited`, {
                    position: "top-right",
                });
            } else {
                const newEntity = await addEntity(entity);
                setEntities(prevEntities => [{ ...entity, id: newEntity.id }, ...prevEntities]);
                toast.success(`${collectionId[0].toUpperCase() + collectionId.slice(1)}  successfully added`, {
                    position: "top-right",
                });
            }

            Object.values(inputs).forEach(input => {
                if (input?.current) input.current.value = '';
            });
            onClose();
        } catch (err) {
            toast.error(`An error occurred while ${isEdit ? 'editing' : 'adding'} the ${collectionId[0].toUpperCase() + collectionId.slice(1)}`, {
                position: "top-right",
            });
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const removeEntity = async (id: string | number, setEntities: React.Dispatch<React.SetStateAction<any[]>>) => {
        setLoading(true);
        try {
            await deleteEntity(id);
            setEntities(prev => prev.filter((entity)=>{
                return  entity.id !== id
            }))
            toast.success("Successfully deleted", { position: "top-right" });
        } catch (err) {
            console.log(err,'err')
            setError(err);
            toast.error("An error occurred while deleting the document", { position: "top-right" });
        } finally {
            setLoading(false);
        }
    };


    return {handleEntity, removeEntity, loading, error};
};
