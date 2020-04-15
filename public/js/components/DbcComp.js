export default {
    props:['name', 'img', 'admin', 'per'],
    name: 'doublecheck',
    template: `
        <div id="dbc">
            <div class="avDiv">
                <img :src="'public/images/' + img" alt="avatar">
                <p>{{ name }}</p>
            </div>
            <form @submit.prevent="dbc" class="dbcForm">
                <input class="hidden" type="email" name="useremail" v-model="input3.email">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="input3.password" required>
                <p>{{ formMsg }}</p>
                <input type="submit" name="submit" value="GO">
            </form>
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
        this.input3.email = localStorage.getItem("useremail");
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
                        var fname = this.name;
                        var per = this.per;
                        var admin = this.admin;
                        this.$emit("goset", fname, per, admin);
                        this.$router.replace({name: 'home', params: { liveuser: { avatar: this.img, username: this.fname } }});
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            } else {
                console.log("Please fill in the required fields.");
            }
        }
    },
}