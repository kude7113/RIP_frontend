export const ROUTES = {
    HOME: "/",
    ALBUMS: "/fines",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    ALBUMS: "Штрафы",
};