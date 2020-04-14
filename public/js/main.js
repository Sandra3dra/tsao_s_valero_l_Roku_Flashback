
import router from './components/Router.js';

(() => {

    const vm = new Vue({
        router,

        data: {
          authenticated: false,
          administrator: false,
    
          users: [],

          currentUser: ''
    
        },
    
        created: function () {
            localStorage.getItem('user');
        },
    
        methods: {
          setAuthenticated(status, data) {
                this.authenticated = status;
                this.administrator = parseInt(data.user_admin);  //parse to make it number, not text. 1 is true 0 is false
                this.users = data;
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
