
export default {
    name: 'signup',
    template: `
        <div class="signUpCon">
            <h2>Create a Flashback account</h2>
            <form @submit.prevent="signup" class="form">
                <div class="formCol">
                    <label for="firstname">First name</label>
                    <input v-model="input2.firstname" name="fname" type="text" id="firstname" required>
                
                    <label for="lastname">Last name</label>
                    <input v-model="input2.lastname" name="lname" type="text" id="lastname" required>
                
                    <label for="signupEmail">Email</label>
                    <input v-model="input2.useremail" name="email" type="email" id="signupEmail" required>
            
                    <label for="signupPassword">Password</label>
                    <input v-model="input2.password" name="password" type="password" id="signupPassword" required>
                </div>
                <p>{{ formMsg }}</p>
                <input type="submit" name="submit" value="SIGN UP">
            </form>
            <p>Already have a Flashback account?</p>
            <a v-on:click.prevent="switchBtn" href="#homeOption" id="toSignin">Sign in</a>
        </div>
    `,

    data() {
        return {
            input2: {
                firstname: "",
                lastname: "",
                useremail: ""
                // password: ""
            },
            formMsg: ""
        }
    },

    methods: {
        switchBtn() {
            this.$parent.switchToSignin()
        },
        signup() {
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
                    if(typeof data != "object"){
                        console.log(data);
                        this.formMsg = data;
                        this.input2.firstname = '';
                        this.input2.lastname = '';
                        this.input2.useremail = '';
                        this.input2.password = '';
                    } else {
                        this.$emit("goAuth", true, data);
                        var user = JSON.stringify(data);
                        localStorage.setItem("user", user);
                        this.$router.replace({ name: "profile" , params: { username: data.name }});
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

