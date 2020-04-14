
import router from './components/Router.js';

(() => {

    const vm = new Vue({
        router,

        data: {
          authenticated: false,
          administrator: false,
    
          user: [],
    
          //currentUser: {},
        },
    
        created: function () {
            localStorage.getItem('user');
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
            localStorage.clear();
            this.$router.push({ path: "/account" });
            this.authenticated = false;
          }
        },
    
        router
      }).$mount('#app');

})();
