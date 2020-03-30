export default {
    template: `
        <div class="container">
            <section class="home">
                <h1 class="hidden">Roku Flashback</h1>
                <img src="public/images/light_flashback_logo.svg" alt="roku flashback logo">
                <img src="public/images/symbol.svg">
                <section id="welcome">
                    <h2>Welcome to Flashback!</h2>
                    <p>Get access to your favourite TV shows, movies, and music anywhere.</p>
                </section>
            </section>
            <section id="homeOption">
                <div class="decLine"></div>
                <div class="singInCon">
                    <h2>Sign In</h2>
                    <form @submit.prevent="signin" class="form">
                        <div class="formCol">
                            <label for="email">Email</label>
                            <input v-model="input1.useremail" type="text" id="email" required>
                        </div>

                        <div class="formCol">
                            <label for="password">Password</label>
                            <input v-model="input1.password" type="password" id="password" required>
                        </div>

                        <button type="submit">SIGN IN</button>
                    </form>
                    <p>Don't have a Flashback account?</p>
                    <router-link to="/account" id="toSignup">Sign up</router-link>
                </div>
                <div class="singUpCon">
                    <h2>Create a Flashback account</h2>
                    <form @submit.prevent="signup" class="form">
                        <div class="formCol">
                            <label for="firstname">First name</label>
                            <input v-model="input2.firstname" type="text" id="firstname" required>
                        </div>

                        <div class="formCol">
                            <label for="lastname">Last name</label>
                            <input v-model="input2.lastname" type="text" id="lastname" required>
                        </div>

                        <div class="formCol">
                            <label for="signupEmail">Email</label>
                            <input v-model="input2.useremail" type="email" id="signupEmail" required>
                        </div>

                        <div class="formCol">
                            <label for="signupPassword">Password</label>
                            <input v-model="input2.password" type="password" id="signupPassword" required>
                        </div>

                        <button type="submit">SIGN UP</button>
                    </form>
                    <p>Already have a Flashback account?</p>
                    <router-link to="/account" id="toSignin">Sign in</router-link>
                </div>
            </section>
        </div>
     `,

    data() {
        return {
            input1: {
                useremail: "",
                password: ""
            },
            input2: {
                firstname: "",
                lastname: "",
                useremail: "",
                password: ""
            }
        }
    },

    methods: {
        signin() {
            //console.log(this.$parent.mockAccount.username);
            // debugger;
            if(this.input1.useremail != "" && this.input1.password != "") {
                let formData = new FormData();

                formData.append("username", this.input1.useremail);
                formData.append("password", this.input1.password);

                let url = "./includes/index.php?user=true";

                fetch(url, {
                    method: "POST",
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    // we got a user back but lets set authentication and such
                    this.$emit("authenticated", true, data[0]);
                    //reroute to the users comp so we can see all of them
                    
                })
                .catch((error) => console.log(error));
            } else {
                console.log("Please fill in the required fields.");
            }
        },
        signup() {
            //console.log(this.$parent.mockAccount.username);
            // debugger;
            if(this.input2.firstname != "" && this.input2.lastname != "" && this.input2.email != "" && this.input2.password != "") {
                let formData = new FormData();

                formData.append("username", this.input2.firstname);
                formData.append("password", this.input2.lastname);
                formData.append("username", this.input2.useremail);
                formData.append("password", this.input2.password);

                let url = "./includes/index.php?user=true";

                fetch(url, {
                    method: "POST",
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    // we got a user back but lets set authentication and such
                    this.$emit("authenticated", true, data[0]);
                    //reroute to the users comp so we can see all of them
                    
                })
                .catch((error) => console.log(error));
            } else {
                console.log("Please enter reqired information.");
            }
        }
    }
}