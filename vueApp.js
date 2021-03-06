//model
const store = new Vuex.Store({
    state: {
        total: 4,
        cartItems: [
        {
            "image": "https://media.sweetwater.com/images/items/120/SM57-medium.jpg",
            "url": "https://www.sweetwater.com/store/detail/SM57",
            "manufacturer": "Shure",
            "productName": "Sm57",
            "itemid": "SM57",
            "quantity": 1,
            "price": 99.00,
            "description": "Dynamic Microphone with Cardioid Pickup Pattern, 40Hz-15kHz Frequency Response, Low Impedance, Includes Stand Adapter, and Zippered Carrying Case",
            "available": 9
        },
        {
            "image": "https://media.sweetwater.com/api/i/f-webp__q-82__ha-c7901f059269b4c3__hmac-ca9855c930666d894a0047170b1c002f9d347ca3/images/items/750/SGS17HCCH-large.jpg.auto.webp",
            "url": "https://www.sweetwater.com/store/detail/SGS17HCCH/sn170099523",
            "manufacturer": "Gibson",
            "productName": "SG Standard 2017 T - Heritage Cherry",
            "itemid": "SGS17HCCH",
            "quantity": 1,
            "price": 1169.00,
            "serial": 170099523,
            "description": "Solidbody Electric Guitar with Mahogany Body, Mahogany Neck, Rosewood Fingerboard, and 2 Humbucking Pickups - Heritage Cherry",
            "available": 1
        },
        {
            "image": "https://media.sweetwater.com/images/items/120/SM58-medium.jpg",
            "url": "https://www.sweetwater.com/store/detail/SM58",
            "manufacturer": "Shure",
            "productName": "SM58",
            "itemid": "SM58",
            "quantity": 3,
            "price": 99.00,
            "description": "Dynamic Vocal Microphone with Cardioid Pickup Pattern and 50Hz-15kHz Frequency Response, Includes Stand Adapter, and Zippered Carrying Case",
            "available": 6
        },
        {
            "image": "https://media.sweetwater.com/images/items/120/R16-medium.jpg",
            "url": "https://www.sweetwater.com/store/detail/R16",
            "manufacturer": "Zoom",
            "productName": "R16",
            "itemid": "R16",
            "quantity": 1,
            "price": 399.99,
            "description": "16-track Portable SD Recorder, USB Audio Interface, and DAW Control Surface with 8 Microphone Inputs, Built-in Stereo Condenser Microphones, Built-in Effects, 1GB SD Card, and USB - Mac/PC",
            "available": 14
        }
    ],
    },
    mutations: {
        initialiseStore(state) {
            if(localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store')))
                );
            }
        },
        
        increment (state, n) {
            state.cartItems[n].quantity += 1
        },

        decrement (state, n) {
            if (state.cartItems[n].quantity > 0) {
                state.cartItems[n].quantity -= 1
            }
        },

        removeItem (state, n) {
            state.cartItems.splice(n,1)
        },

        addItem (state, item){
            state.cartItems.push(item)
        },
        
        resetState (state) {
            Object.assign(state, getData())
        }

    },
    getters : {
        total : state => {
            var curTot = 0;
            var i = 0;
            while (i < state.cartItems.length) {
                var curItemPrice = state.cartItems[i].price * state.cartItems[i].quantity;
                curTot += curItemPrice;
                i+= 1;
            }
            state.total = Math.round(curTot * 100) / 100;
            return state.total;
        }
    },
    })

//controller
const app = new Vue({
    el: '#app',
    store,
    beforeCreate() {
    this.$store.commit('initialiseStore');
    },
    data: {
    },
    computed: {

        total () {
            return this.$store.getters.total;
        },

        shoppingCart() {
            return this.$store.state.cartItems;
        },

    },
    methods: {

        increment: function(item, num) {
            store.commit('increment', num);
        },

        decrement: function(item, num) {
            store.commit('decrement', num);
        },

        getSubtotal: function(item) {
            var subTot = ((parseFloat(item.price) * parseFloat(item.quantity)));
            return Math.round(subTot * 100) / 100;
        },

        removeItem: function(item,num) {
            store.commit('removeItem', num);
        },

        addItem: function(item){
            store.commit('addItem',newItem);
        },
        
        reset(){
            store.commit('resetState');
        }

    }
})

store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state));
});

const getData = () => {
    return {
        total: 4,
            cartItems: [
                {
                    "image": "https://media.sweetwater.com/images/items/120/SM57-medium.jpg",
                    "url": "https://www.sweetwater.com/store/detail/SM57",
                    "manufacturer": "Shure",
                    "productName": "Sm57",
                    "itemid": "SM57",
                    "quantity": 1,
                    "price": 99.00,
                    "description": "Dynamic Microphone with Cardioid Pickup Pattern, 40Hz-15kHz Frequency Response, Low Impedance, Includes Stand Adapter, and Zippered Carrying Case",
                    "available": 9
                },
                {
                    "image": "https://media.sweetwater.com/api/i/f-webp__q-82__ha-c7901f059269b4c3__hmac-ca9855c930666d894a0047170b1c002f9d347ca3/images/items/750/SGS17HCCH-large.jpg.auto.webp",
                    "url": "https://www.sweetwater.com/store/detail/SGS17HCCH/sn170099523",
                    "manufacturer": "Gibson",
                    "productName": "SG Standard 2017 T - Heritage Cherry",
                    "itemid": "SGS17HCCH",
                    "quantity": 1,
                    "price": 1169.00,
                    "serial": 170099523,
                    "description": "Solidbody Electric Guitar with Mahogany Body, Mahogany Neck, Rosewood Fingerboard, and 2 Humbucking Pickups - Heritage Cherry",
                    "available": 1
                },
                {
                    "image": "https://media.sweetwater.com/images/items/120/SM58-medium.jpg",
                    "url": "https://www.sweetwater.com/store/detail/SM58",
                    "manufacturer": "Shure",
                    "productName": "SM58",
                    "itemid": "SM58",
                    "quantity": 3,
                    "price": 99.00,
                    "description": "Dynamic Vocal Microphone with Cardioid Pickup Pattern and 50Hz-15kHz Frequency Response, Includes Stand Adapter, and Zippered Carrying Case",
                    "available": 6
                },
                {
                    "image": "https://media.sweetwater.com/images/items/120/R16-medium.jpg",
                    "url": "https://www.sweetwater.com/store/detail/R16",
                    "manufacturer": "Zoom",
                    "productName": "R16",
                    "itemid": "R16",
                    "quantity": 1,
                    "price": 399.99,
                    "description": "16-track Portable SD Recorder, USB Audio Interface, and DAW Control Surface with 8 Microphone Inputs, Built-in Stereo Condenser Microphones, Built-in Effects, 1GB SD Card, and USB - Mac/PC",
                    "available": 14
                }
                ],
    }
}