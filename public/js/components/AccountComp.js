import SigninComp from "./SigninComp.js";
import SignupComp from "./SignupComp.js";

export default {
    name: 'account',
    template: `
        <div class="homeWrapper">
            <section class="home">
                <img src="public/images/symbol.svg">
                <div id="welcome">
                    <h2>Welcome to Flashback!</h2>
                    <p>Get access to your favourite TV shows, movies, and music anywhere.</p>
                </div>
            </section>
            <section id="homeOption">
                <div class="decLine"></div>

                <component :is="homeAction" @goAuth="goAuthenticate"></component>

            </section>
        </div>
     `,

    data() {
        return {
            homeAction: SigninComp
        }
    },

    methods: {
        goAuthenticate(status, data) {
            this.$emit("authenticated", true, data);
        },
        switchToSignin() {
            this.homeAction = SigninComp;
        },
        switchToSignup() {
            this.homeAction = SignupComp;
        }
    }
}