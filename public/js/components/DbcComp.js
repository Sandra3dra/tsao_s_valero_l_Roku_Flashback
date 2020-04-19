export default {
    props:['name', 'img', 'admin', 'per', "id"],
    name: 'doublecheck',
    template: `
        <div id="dbc">
            <div class="dbcWrapper">
                <a v-on:click.prevent="closePanel" href="#">X</a>
                <div class="avDiv">
                    <img :src="'public/images/' + img" alt="avatar">
                    <p>{{ name }}</p>
                    <p class="hidden">{{ id }}</p>
                </div>
                <form @submit.prevent="dbc" class="dbcForm">
                    <input class="hidden" type="email" name="useremail" v-model="input3.email">
                    <label for="password">Password</label>
                    <input type="password" name="password" v-model="input3.password" required>
                    <p>{{ formMsg }}</p>
                    <input type="submit" name="submit" value="NEXT">
                </form>
            </div>
        </div>
    `,
    data() {
        return {
            formMsg: '',
            input3: {
                email: ""
            }
        }
    },

    created: function() {
        var userinfo = localStorage.getItem("user");
        var useremail = JSON.parse(userinfo).email;
        this.input3.email = useremail;
    },

    methods: {
        dbc() {
            if(this.password != "") {
                let formData = new FormData();

                formData.append('email', this.input3.email);
                formData.append("password", this.input3.password);
                // debugger;

                let url = `./includes/admin/admin_check.php`;

                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    if(typeof data != "object"){
                        console.log(data);
                        this.formMsg = data;
                        this.password = '';
                    } else {
                        var userinfo = localStorage.getItem("user");
                        var useremail = JSON.parse(userinfo).email;
                        var fname = this.name;
                        var per = this.per;
                        var admin = this.admin;
                        var avatar = this.img;
                        var id = this.id;
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
                })
                .catch(function(error) {
                    console.log(error);
                });
            } else {
                console.log("Please fill in the required fields.");
            }
        },
        closePanel() {
            this.$parent.adultNo();
        }
    }
}