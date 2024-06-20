import {useState} from "react";
import {AxiosPromise, AxiosResponse} from "axios";
import { useToast } from '@chakra-ui/react'

interface UseEntityHandlerProps {
    uploadFile: (params: { file: File; collectionId: string; documentId: string }) => Promise<string | null>;
    addEntity: (entity: any) => AxiosPromise<any>;
    editEntity: (entity: any, id: string | number) => Promise<any>;
    deleteEntity: (id: string | number) => Promise<any>;
    onClose: Function;
}

export const useEntityHandler = ({
                                     uploadFile,
                                     addEntity,
                                     editEntity,
                                     deleteEntity,
                                     onClose
                                 }: UseEntityHandlerProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const toast = useToast()
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
        editID?: string | number | undefined;
        collectionId: string;
        documentId: string;
        onClose: Function;
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
                if (editID) {
                    await editEntity(entity, editID);
                }
                setEntities(prev => prev.map(item => (item.id === editID ? {...item, ...entity} : item)));
                toast({
                    title: `${collectionId[0].toUpperCase() + collectionId.slice(1)} successfully edited`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position:'top-right',
                    variant:'subtle'
                })
            } else {
                const newEntity = await addEntity(entity);
                // setEntities(prevEntities => [{...entity, id: newEntity.id}, ...prevEntities]);
                setEntities(prevEntities => [{ ...entity, id: newEntity.data.id }, ...prevEntities]);
                toast({
                    title: `${collectionId[0].toUpperCase() + collectionId.slice(1)} successfully added`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                position:'top-right',
                    variant:'subtle'
                })
            }

            Object.values(inputs).forEach(input => {
                if (input?.current) input.current.value = '';
            });
            onClose();
        } catch (err) {
            toast({
                title: `An error occurred while ${isEdit ? 'editing' : 'adding'} the ${collectionId[0].toUpperCase() + collectionId.slice(1)}`,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:'top-right',
                    variant:'subtle'
            })
            // setError(err);
        } finally {
            setLoading(false);
        }
    };

    const removeEntity = async (id: string | number, setEntities: React.Dispatch<React.SetStateAction<any[]>>) => {
        setLoading(true);
        try {
            await deleteEntity(id);
            setEntities(prev => prev.filter((entity) => {
                return entity.id !== id
            }))
            toast({
                title: "Successfully deleted",
                status: 'success',
                duration: 2000,
                isClosable: true,
                position:'top-right',
                    variant:'subtle'
            })
        } catch (err) {
            console.log(err, 'err')
            // setError(err);
            toast({
                title: "An error occurred while deleting the document",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:'top-right',
                    variant:'subtle'
            })
        } finally {
            setLoading(false);
        }
    };


    return {handleEntity, removeEntity, loading, error};
};
