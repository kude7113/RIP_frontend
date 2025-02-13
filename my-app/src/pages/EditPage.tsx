import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getFinesList, updateFine, deleteFine, uploadFineImage } from "../redux/fineSlice";
import { EditCard } from "../components/EditCard";
import "./EditPage.css";

const FineEditPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Загружаем список штрафов из Redux-хранилища
    const { fines, loading } = useSelector((state: RootState) => state.fines);

    // Локальное состояние для редактируемых данных
    const [editedFines, setEditedFines] = useState(fines);

    useEffect(() => {
        dispatch(getFinesList());
    }, [dispatch]);

    useEffect(() => {
        setEditedFines(fines);
    }, [fines]);

    // ✅ Обработчик изменения полей
    const handleChange = (id: number, field: string, value: string | number) => {
        setEditedFines((prevFines) =>
            prevFines.map((fine) =>
                fine.fineID === id ? { ...fine, [field]: value } : fine
            )
        );
    };

    // ✅ Обработчик сохранения изменений
    const handleSave = (fineID: number) => {
        const updatedFine = editedFines.find((fine) => fine.fineID === fineID);
        if (updatedFine && fineID) {
            dispatch(updateFine({ id: fineID, fine: updatedFine }));
        } else {
            console.error("Ошибка: fineID не определен", updatedFine);
        }
    };

    // ✅ Обработчик удаления штрафа
    const handleDelete = (fineID: number) => {
        dispatch(deleteFine(fineID));
    };

    // ✅ Обработчик загрузки изображения
    const handleImageUpload = (fineID: number, file: File) => {
        const formData = new FormData();
        formData.append("image", file);
        dispatch(uploadFineImage({ fineID, formData }));
    };

    return (
        <div className="fine-edit-page">
            {loading ? (
                <Spinner animation="border" />
            ) : (
                editedFines.map((fine) => (
                    <EditCard
                        key={fine.fineID}
                        fine={fine}
                        onChange={handleChange}
                        onSave={handleSave}
                        onDelete={handleDelete}
                        onImageUpload={handleImageUpload}
                    />
                ))
            )}
        </div>
    );
};

export default FineEditPage;
