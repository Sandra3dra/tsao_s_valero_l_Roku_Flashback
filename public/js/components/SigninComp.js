export default {
    template: `
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
    `,

    data() {
        return {
            input1: {
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
}
