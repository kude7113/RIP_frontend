export const ROUTES = {
    HOME: "/",
    ALBUMS: "/fines",
    LOGIN: "/login",
    EDIT: "/edit_fine",
    BASKET: "/basket",
    RESOLUTIONS: "/resolutions",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    ALBUMS: "Штрафы",
    LOGIN: "Авторизация",
    EDIT: "Редактирование штрафов",
    BASKET: "Корзина",
    RESOLUTIONS: "Постановления"
};