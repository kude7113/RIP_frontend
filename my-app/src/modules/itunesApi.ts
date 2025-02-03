export interface Fine {
    fineID: number;
    title: string;
    fullInf: string,
    price: number;
    imge: string;
    dopInf: string;
}
export interface finesResult {
    fines: Fine[];
    resCount: number;
    resId: number;
}

export const getFinesByName = async (name = ""): Promise<finesResult> => {
    return fetch(`http://localhost:8000/fine?searchFines=${name}`).then(
        (response) => response.json()
    );
};

export const getAlbumById = async (
    id: number | string
): Promise<Fine> => {
    return fetch(`http://localhost:8000/fine/?id=${id}`).then(
        (response) => response.json()
    );
};