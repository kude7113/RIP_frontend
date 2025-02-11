export const ROUTES = {
    HOME: "/",
    ALBUMS: "/fines",
    LOGIN: "/login",
    ACCOUNT: "/account",
    BASKET: "/basket",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    ALBUMS: "Штрафы",
    LOGIN: "Авторизация",
    ACCOUNT: "Аккаунт",
    BASKET: "Корзина"
};