
import router from './components/Router.js';

(() => {

    const vm = new Vue({
        router,

        data: {
          authenticated: false,
          administrator: false,
    
          user: [],

          currentUser: 'herro',
          permission: '',
          kids: false
    
        },
    
        created: function () {
            localStorage.getItem('useremail');
            if(this.permission === undefined) {
                console.log("hello kiddo");
                this.kids = true;
            }
            // see if still logged in direct to profile
        },
    
        methods: {
            setAuthenticated(status, data) {
                console.log('authenticated!');
                this.authenticated = status;
                this.user = data;
                if(data.per > 0){
                    this.administrator = true; 
                } else {
                    this.administrator = false;
                }
            },

            gotCurrentUser(fname, per) {
                console.log(fname + ' is now the user!');
                this.currentUser = fname;
                this.permission = per;
            },
        
            signout() {
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
