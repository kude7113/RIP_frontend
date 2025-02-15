import React from 'react';
import './ResCard.css';

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime()) || dateStr.startsWith('0001')) {
        return 'Не указано';
    }
    return date.toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const ResolutionCard = ({ resolution, onFinish }) => {
    const {
        Resolution_ID,
        Status,
        Date_Created,
        Date_Formed,
        Date_Done,
        Car_License_Plate,
        User,
        Head_Of_Depart,
        Qr, // Добавляем поле QR
    } = resolution;

    return (
        <div className="resolution-card">
            <h3 className="resolution-card__title">Постановление #{Resolution_ID}</h3>
            <div className="resolution-card__body">
                <p><strong>Статус:</strong> {Status}</p>
                <p><strong>Дата создания:</strong> {formatDate(Date_Created)}</p>
                <p><strong>Дата формирования:</strong> {formatDate(Date_Formed)}</p>
                <p><strong>Дата выполнения:</strong> {formatDate(Date_Done)}</p>
                <p><strong>Номер автомобиля:</strong> {Car_License_Plate || 'Не указан'}</p>
                <p><strong>Пользователь:</strong> {User}</p>
                <p><strong>Руководитель отдела:</strong> {Head_Of_Depart || 'Не указан'}</p>
            </div>
            {Qr && (
                <div className="resolution-card__qr">
                    <img src={`data:image/png;base64,${Qr}`} alt="QR Code" />
                </div>
            )}
            {Status === 'сформирован' && (
                <button className="resolution-card__btn" onClick={() => onFinish(Resolution_ID)}>
                    Подтвердить
                </button>
            )}
        </div>
    );
};

export default ResolutionCard;
