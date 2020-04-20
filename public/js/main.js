
import router from './components/Router.js';

(() => {

    const vm = new Vue({
        router,

        data: {
          authenticated: false,
          administrator: false,
          user: [],
          permission: '',
          kids: false,
          kidView: false
        },
    
        created: function () {
            
            if(localStorage.getItem('useremail')) {
                this.$router.push({ path: "/profile" });
            }
            if(this.permission == 1) {
                this.kids = true;
            } else {
                this.kids = false;
            }
            
        },
    
        methods: {
            setAuthenticated(status, data) {
                console.log('authenticated!');
                this.authenticated = status;
                this.user = data;
            },
        
            signout() {
                console.log('signed out!');
                localStorage.clear();
                this.$router.push({ path: "/account" });
                this.authenticated = false;
                this.administrator = false;
                this.currentUser = '';
                this.permission = '';
                this.kids = false;
                this.user = [];
            }
        },
    
        router
      }).$mount('#app');

})();
