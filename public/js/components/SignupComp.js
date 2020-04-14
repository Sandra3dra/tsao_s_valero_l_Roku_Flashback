export default {
    template: `
        <div class="singUpCon">
            <h2>Create a Flashback account</h2>
            <form @submit.prevent="signup" class="form">
                <div class="formCol">
                    <label for="firstname">First name</label>
                    <input v-model="input2.firstname" name="fname" type="text" id="firstname" required>
                </div>

                <div class="formCol">
                    <label for="lastname">Last name</label>
                    <input v-model="input2.lastname" name="lname" type="text" id="lastname" required>
                </div>

                <div class="formCol">
                    <label for="signupEmail">Email</label>
                    <input v-model="input2.useremail" name="email" type="email" id="signupEmail" required>
                </div>

                <div class="formCol">
                    <label for="signupPassword">Password</label>
                    <input v-model="input2.password" name="password" type="password" id="signupPassword" required>
                </div>
                <p>{{ formMsg }}</p>
                <input type="submit" name="submit" value="SIGN UP">
            </form>
            <p>Already have a Flashback account?</p>
            <router-link to="/account" id="toSignin">Sign in</router-link>
        </div>
    `,

    data() {
        return {
            input2: {
                firstname: "",
                lastname: "",
                useremail: "",
                password: ""
            },
            formMsg: ""
        }
    },

    methods: {
        signup() {
            //console.log(this.$parent.mockAccount.username);
            // debugger;
            if(this.input2.firstname != "" && this.input2.lastname != "" && this.input2.email != "" && this.input2.password != "") {
                let formData = new FormData();

                formData.append("firstname", this.input2.firstname);
                formData.append("lastname", this.input2.lastname);
                formData.append("useremail", this.input2.useremail);
                formData.append("password", this.input2.password);

                let url = `./includes/admin/admin_createUser.php`;

                fetch(url, {
                    method: "POST",
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    if(typeof data == "string" || typeof data != "object"){
                        this.formMsg = data;
                    } else {
                        this.$emit("authenticated", true, data);
                        this.$router.replace({name: "profile"});
                    }
                })
                .catch(function(error) {
                    console.log(error)
                });
            } else {
                console.log("Please enter reqired information.");
            }
        }
    }
}

