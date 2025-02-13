import React from "react";
import { Button, Form, Card } from "react-bootstrap";
import { DsFines } from "../api/Api.ts";
import "./EditCard.css"
import image from "../DefaultImage.jpg";

interface FineEditCardProps {
    fine: DsFines;
    onChange: (id: number, field: string, value: string | number) => void;
    onSave: (fineID: number) => void;
    onDelete: (fineID: number) => void;
    onImageUpload: (fineID: number, file: File) => void;
}

export const EditCard: React.FC<FineEditCardProps> = ({
                                                              fine,
                                                              onChange,
                                                              onSave,
                                                              onDelete,
                                                              onImageUpload,
                                                          }) => {
    return (
        <Card key={fine.fineID} className="fine-edit-card">
            <Card.Img variant="top" src={fine.imge || image} className="fine-image" />

            {/* ✅ Кнопка загрузки изображения */}
            <div className="upload-container">
                <input
                    type="file"
                    id={`file-input-${fine.fineID}`}
                    className="file-input"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            onImageUpload(fine.fineID, e.target.files[0]);
                        }
                    }}
                />
                <label htmlFor={`file-input-${fine.fineID}`} className="upload-button">
                    Изменить изображение
                </label>
            </div>

            <Card.Body>
                <Form.Group>
                    <Form.Label>Название</Form.Label>
                    <Form.Control
                        type="text"
                        value={fine.title}
                        onChange={(e) => onChange(fine.fineID, "title", e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Цена</Form.Label>
                    <Form.Control
                        type="number"
                        value={fine.price}
                        onChange={(e) => onChange(fine.fineID, "price", Number(e.target.value))}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Описание</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={fine.fullInf}
                        onChange={(e) => onChange(fine.fineID, "fullInf", e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Доп. информация</Form.Label>
                    <Form.Control
                        type="text"
                        value={fine.dopInf}
                        onChange={(e) => onChange(fine.fineID, "dopInf", e.target.value)}
                    />
                </Form.Group>

                <div className="button-group">
                    <Button className="save-button" onClick={() => onSave(fine.fineID)}>
                        Сохранить
                    </Button>
                    <Button className="delete-button" onClick={() => onDelete(fine.fineID)}>
                        Удалить
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};
