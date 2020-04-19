export default {
    name: 'signin',
    template: `
        <div class="signInCon">
            <h2>Sign In</h2>
            <form @submit.prevent="signin" class="form">
                <div class="formCol">
                    <label for="email">Email</label>
                    <input v-model="input1.useremail" name="email" type="text" id="email" required>
            
                    <label for="password">Password</label>
                    <input v-model="input1.password" name="password" type="password" id="password" required>
                </div>
                <p>{{ formMsg }}</p>
                <input type="submit" name="submit" value="SIGN IN">
            </form>
            <p>Don't have a Flashback account?</p>
            <a v-on:click.prevent="switchBtn" href="#homeOption" id="toSignup">Sign up</a>
        </div>
    `,

    data() {
        return {
            input1: {
                useremail: ""
                // password: ""
            },
            formMsg: ""
        }
    },

    methods: {
        switchBtn() {
            this.$parent.switchToSignup()
        },
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
                        console.log(data);
                        this.formMsg = data;
                        this.input1.useremail = '';
                        this.input1.password = '';
                    } else {
                        this.$emit("goAuth", true, data);
                        var user = JSON.stringify(data);
                        localStorage.setItem("user", user);
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
