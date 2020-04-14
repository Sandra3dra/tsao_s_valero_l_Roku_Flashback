export default {
    template: `
        <div class="singInCon">
            <h2>Sign In</h2>
            <form @submit.prevent="signin" class="form">
                <div class="formCol">
                    <label for="email">Email</label>
                    <input v-model="input1.useremail" name="email" type="text" id="email" required>
                </div>

                <div class="formCol">
                    <label for="password">Password</label>
                    <input v-model="input1.password" name="password" type="password" id="password" required>
                </div>
                <p>{{ formmsg }}</p>
                <input type="submit" name="submit" value="SIGN IN">
            </form>
            <p>Don't have a Flashback account?</p>
            <router-link v-on:click="" to="/account" id="toSignup">Sign up</router-link>
        </div>
    `,

    data() {
        return {
            input1: {
                useremail: "",
                password: ""
            },
            formmsg: ""
        }
    },

    methods: {
        signin() {
            if(this.input1.useremail != "" && this.input1.password != "") {
                let formData = new FormData();

                formData.append("useremail", this.input1.useremail);
                formData.append("password", this.input1.password);

                let url = `./includes/admin/admin_login.php`;

                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    if(typeof data != "object"){
                        this.formMsg = data;
                        this.input1.useremail = '';
                        this.input1.password = '';
                    } else {
                        $useremail = data;
                        localStorage.setItem($useremail);
                        this.$emit("authenticated", true, data[0]);
                        this.$router.replace({name: "profile"});
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            } else {
                console.log("Please fill in the required fields.");
            }
        }
    }
}
