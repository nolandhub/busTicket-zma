export interface Route {
    routeId: string
    title: string
    fromLabel: string
    toLabel: string
}


export interface PopRoute extends Route {
    image: string;
    description: string; // "Cung đường đèo ấn tượng quanh co uốn lượn giữa vùng đồi xanh ngát,.."
    price: number;
    note: string;  //"Limousine 20 Phòng Đôi VIP"
}
























