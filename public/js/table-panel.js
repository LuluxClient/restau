const baseURL = 'http://localhost:3000';
let category_active = 1;
const app = {
    start() {
        let that = this;
        $('.btn-load-products').on('click', function() { that.changeCategoryActive(this) } );
        this.loadProducts(category_active);
        this.loadOrder();
    },

    async addProductOrder(el, quantity) {
        let id_product = $( el ).attr( "product-id");
        await axios.post(`${baseURL}/tables/addProductOrder/${id_product}`, { params: { quantity: quantity } });
        this.loadOrder();
    },

    changeCategoryActive(el) {
        $('.btn-load-products').removeClass("active");
        category_active = $( el ).attr( "category-id");
        this.loadProducts(category_active);
        $( el ).addClass("active");
    },

    async loadProducts(cat) {
        let res = await axios.get(`${baseURL}/tables/getProducts/${cat}`);
        let data = res.data;
        $('#panel-products').html(data);
        // add the click event on every product
        let that = this;
        $('.panel-products-items').on('click', function() { that.addProductOrder(this, 1) } );
    },

    async loadOrder() {
        let res = await axios.get(`${baseURL}/tables/getOrder`);
        let data = res.data;
        $('#panel-order').html(data);
        // add the click event on every product
        let that = this;
        $('.panel-order-items-delete').on('click', function() { that.addProductOrder(this, -1) });
    }
}
$(document).ready(() => app.start());