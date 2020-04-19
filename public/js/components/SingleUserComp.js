
export default {
    props: ['img', 'fname', 'per', 'admin', 'id'],
    name: 'singleUser',
    template: `
        <div class="singleUser">
            <a>
            <img v-on:click="setCurrent" :src="'public/images/' + img" alt="avatar">
            <h4 v-on:click="setCurrent">{{ fname }}</h4>
            <div class="hidden"><p>{{ id }}</p><p>{{ per }}</p><p>{{ admin }}</p></div>
            </a>
        </div>
    `,

    methods: {
        setCurrent() {
            var fname = this.fname;
            var per = this.per;
            var admin = this.admin;
            var avatar = this.img;
            var id = this.id;
            var userinfo = localStorage.getItem("user");
            var useremail = JSON.parse(userinfo).email;
            if(per == 2) {
                // console.log(per);
                this.$parent.adultCheck();
                this.$emit("pickeduser", avatar, fname, admin, per, id);
            } else {
                this.$root.user.avatar = avatar;
                this.$root.user.email = useremail;
                this.$root.user.fname = fname;
                this.$root.user.id = id;
                this.$root.user.isAdmin = admin;
                this.$root.user.per = per;
                var updateUser = this.$root.user;
                localStorage.setItem("user", JSON.stringify(updateUser));
                console.log(fname + ' is now the user!');
                this.$root.permission = per;
                if(admin > 0){
                    this.administrator = true; 
                } else {
                    this.administrator = false;
                }
                // this.$emit("goset", fname, per, admin);
                this.$router.replace({name: 'home'});
            }
        }
    }
}