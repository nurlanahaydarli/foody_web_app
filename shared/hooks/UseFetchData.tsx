import { useState } from "react";
import { toast } from "react-toastify";

export const useEntityHandler = ({
                                     uploadFile,
                                     addEntity,
                                     editEntity,
                                     deleteEntity,
                                     onClose
                                 }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleEntity = async ({ entity, Img, setEntities, inputs, isEdit, editID }) => {
        setLoading(true);
        setError(null);
        try {
            if (Img instanceof File) {
                const res = await uploadFile({
                    file: Img,
                    collectionId: entity.collectionId, // Adjusted to include collectionId dynamically
                    documentId: entity.documentId // Adjusted to include documentId dynamically
                });
                entity.img_url = res;
            }

            if (isEdit) {
                await editEntity(entity, editID);
                toast.success("Entity successfully edited", {
                    position: "top-right",
                });
            } else {
                const newEntity = await addEntity(entity);
                setEntities(prevEntities => [...prevEntities, { ...entity, id: newEntity.id }]);
                toast.success("Entity successfully added", {
                    position: "top-right",
                });
            }

            Object.values(inputs).forEach(input => {
                if (input?.current) input.current.value = '';
            });
            onClose();
        } catch (err) {
            toast.error(`An error occurred while ${isEdit ? 'editing' : 'adding'} the entity`, {
                position: "top-right",
            });
            setError(err);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const removeEntity = async (id) => {
        try {
            await deleteEntity(id);
            toast.success("Entity successfully deleted", {
                position: "top-right",
            });
        } catch (err) {
            console.log(err);
        }
    };

    return { handleEntity, removeEntity, loading, error };
};
