// Vue.use(VueRouter);
import AccountComp from "./components/AccountComp.js";
import AdultComp from "./components/AdultComp.js";
import KidComp from "./components/KidComp.js";
import ErrorComp from "./components/ErrorComp.js";


(() => {

    const routes = [
        { path: '/', redirect: { name: "account" } },
        { path: '/account', name: 'account', component: AccountComp },
        { path: '/adult', name: 'adult', component: AdultComp },
        { path: '/kid', name: 'kid', component: KidComp },
        { path: '*', name: 'error', component: ErrorComp }
    ]

    const router = new VueRouter({
        routes // shorthand for routes: routes
    })

    const vm = new Vue({

        data: {
          authenticated: false,
          administrator: false,
    
          mockAccount: {
            useremail: "email",
            password: "password"
          },
    
          user: [],
    
          //currentUser: {},
        },
    
        created: function () {
          // do a localstorage session check and set authenticated to true if the session still exists
          // if the cached user exists, then just navigate to their user home page
    
          // the localstorage session will persist until logout
        },
    
        methods: {
          setAuthenticated(status, data) {
                // this means that the authentication has passed inside login comp
                // and we have a valid user
                // so set authenticated property to true, and store the user
                this.authenticated = status;
                this.administrator = parseInt(data.isadmin);  //parse to make it number, not text. 1 is true 0 is false
                this.user = data;
          },
    
          signout() {
            // delete local session
    
            // push user back to login page
            this.$router.push({ path: "/account" });
            this.authenticated = false;
          }
        },
    
        router
      }).$mount('#app');

    router.beforeEach((to, from, next) => {
        console.log("router guard fire");

        if (vm.authenticated == false) {
            next("/account");
        } else {
            next();
        }
    })
})();
