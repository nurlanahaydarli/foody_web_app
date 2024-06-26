import dynamic from "next/dynamic";
import AdminHedetbuttom from '../../../shared/components/admin/AdminHeaderButtom'
import AdminTable from '../../../shared/components/admin/AdminTable'
import {useEffect, useRef, useState} from "react";
import {useModalOpen} from "../../../shared/hooks/UseModalOpen";
import Input from "../../../shared/components/admin/Form/Input";
import Form from "../../../shared/components/admin/Form/Form";
import {DeleteCategory, EditCategory, getCategories, PostCategory} from "../../../shared/services";
import uploadFile from "../../../shared/utils/uploadFile";
import {CategoryPostDataType} from "../../../shared/interfaces";
import withAuth from "../../../shared/HOC/withAuth";
import {useEntityHandler} from "../../../shared/hooks/UseFetchData";
import Loading from "../../../shared/components/Loading/Loading";
import ConfirmModal from '../../../shared/components/admin/confirmModal'
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
const AdminLayout = dynamic(() => import("../../../shared/components/admin/Layout/AdminLayout"), {
    ssr: false,
});

function Category() {
    const inpTitle = useRef<any>()
    const {isOpen, onOpen, onClose} = useModalOpen()
    let [categories, setCategories] = useState<CategoryPostDataType[]>([]);
    let [Img, setImg] = useState<any>('')
    let [editImg, seteditImg] = useState<any>('')
    let [editID, seteditID] = useState<string>('')
    let [TitleYup, setTitleYup] = useState('')
    let [Titlevalue, setTitlevalue] = useState('')
    let [ResetData, setResetData] = useState(true)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

    const { t } = useTranslation('common')
    const {handleEntity, removeEntity, loading} = useEntityHandler({
        uploadFile,
        addEntity: PostCategory,
        editEntity: EditCategory,
        deleteEntity:DeleteCategory,
        onClose
    });

    useEffect(() => {
        (async () => {
            try {
                let res = await getCategories()
                let newData = await res.data.result.data
                setCategories(newData)
            } catch (err) {
                console.log(err);
            }
        })()
    }, [])
    async function addCategory() {
        let Title = inpTitle?.current?.value
        Title.length <= 3 ? setTitleYup('title have to be longer than 3 ') : setTitleYup('')

        let newCategory = {
            "name": Title,
        }
        handleEntity({
            entity: newCategory,
            Img: Img,
            setEntities: setCategories,
            inputs: {inpTitle},
            isEdit: false,
            onClose,
            collectionId: "category",
            documentId: "category"
        });

    }
    async function updateCategory() {
        let Title = inpTitle?.current?.value
        if (Title.length <= 3) {
            setTitleYup('title have to be longer than 3');
            return;
        } else {
            setTitleYup('');
        }

        if (!Img || Img.length === 0) {
            console.error('Image is required');
            return;
        }

        let updatedCategory = {
            id: editID,
            name: Title,
            img_url: editImg
        };
        handleEntity({
            entity: updatedCategory,
            Img,
            setEntities: setCategories,
            inputs: {inpTitle},
            isEdit: true,
            editID,
            editImg,
            collectionId: "category",
            documentId: editID ?? "",
            onClose
        });
    }
    function confirmDeleteCategory(id: string) {
        setCategoryToDelete(id);
        setIsConfirmModalOpen(true);
    }
    function handleConfirmDelete() {
        if (categoryToDelete) {
            removeEntity(categoryToDelete, setCategories);
        }
        setIsConfirmModalOpen(false);
        setCategoryToDelete(null);
    }
    function editCategory(name: string, description: string, image: string, id: string) {
        setTitlevalue(name)
        seteditImg(image)
        setImg([image])
        seteditID(id)
        onOpen()
    }
    return (
        <>
            <AdminLayout>


                <div>
                    <AdminHedetbuttom typeButton={false} addButton={true} addButtonFun={onOpen}
                                      addTitle={t('ADD CATEGORY')} Title={t('Category')}/>
                    {loading ?
                        <Loading/> :
                        <AdminTable edit={editCategory}
                                    data={categories}
                                    removeDocument={confirmDeleteCategory}
                                    reset={() => setResetData(prev => !prev)}/>
                    }


                    <Form
                        isOpen={isOpen}
                        loading={loading}
                        title={editImg ? `${t('Edit Category')}` : `${t('ADD CATEGORY')}`}
                        subtitle={`${t("Add your category description and necesarry information")}`}
                        onClose={() => {
                            onClose()
                            seteditImg('')
                            setTitlevalue('')
                            
                        }}
                        onAction={editImg ? updateCategory : addCategory}
                        btnTitle={editImg ? `${t("Edit Category")}` : `${t("create category")}`}
                        IMG={editImg}
                        setIMG={setImg}
                    >
                        <Input hasLabel={true} title={t("Name")} type={'text'} input_name={'category_title'} Ref={inpTitle}
                               value={Titlevalue}/>
                        <div className=" text-red-600">{TitleYup}</div>
                    </Form>
                </div>
                <ConfirmModal
                    isOpen={isConfirmModalOpen}
                    onRequestClose={() => setIsConfirmModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                />

            </AdminLayout>
        </>
    );
}

export default withAuth(Category)

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale as string, ["common"])),
    },
});
