export default {
    template: `
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
    `,

    data() {
        return {
            input2: {
                firstname: "",
                lastname: "",
                useremail: "",
                password: ""
            }
        }
    },

    created: function() {
        // this.fetchHero();
        // this.fetchHero2();
    },

    methods: {
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
        // fetchHero() {
        //     let url = './includes/admin/ajax.php?hero=true';

        //     fetch(url)
        //     .then(res => res.json())
        //     .then(data => {
        //         //console.log(data);
        //         this.herodata1 = data;
        //     })
        //     .catch((err) => console.log(err))
        // },

        // fetchHero2() {
        //     let url = './includes/admin/ajax.php?hero_alt=true';

        //     fetch(url)
        //     .then(res => res.json())
        //     .then(data => {
        //         //console.log(data);
        //         this.herodata2 = data;
        //     })
        //     .catch((err) => console.log(err))
        // }
}

