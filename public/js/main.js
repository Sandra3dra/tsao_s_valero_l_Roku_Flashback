
import router from './components/Router.js';

(() => {

    const vm = new Vue({
        router,

        data: {
          authenticated: false,
          administrator: false,
          user: [],
          currentUser: '',
          permission: '',
          kids: false
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

            gotCurrentUser(fname, per, admin) {
                console.log(fname + ' is now the user!');
                this.currentUser = fname;
                this.permission = per;
                if(admin > 0){
                    this.administrator = true; 
                } else {
                    this.administrator = false;
                }
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
