export function generateMockData() {
    let mockData = [];
    const stores = ["Amazon", "Ebay", "Asos", "Google"];

    for (let i = 0; i < 20; i++) {
        const name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        const price = Math.random() * 100;
        const store = stores[Math.floor(Math.random() * 4)];
        const deliveryEstimate = new Date((Math.random() * (1653026128401 - 1610026128401)) + 1610026128401)
        mockData.push({ name, price, store, deliveryEstimate, id: i + 1 });
    }

    return mockData;
}
