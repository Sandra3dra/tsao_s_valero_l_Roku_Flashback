import SigninComp from "./SigninComp.js";
import SignupComp from "./SignupComp.js";

export default {
    name: 'account',
    template: `
        <div class="container">
            <section class="home">
                <img src="public/images/symbol.svg">
                <section id="welcome">
                    <h2>Welcome to Flashback!</h2>
                    <p>Get access to your favourite TV shows, movies, and music anywhere.</p>
                </section>
            </section>
            <section id="homeOption">
                <div class="decLine"></div>

                <signin></signin>

                <signup></signup>

            </section>
        </div>
     `,

    data() {
        return {
            
        }
    },

    methods: {
        
    },
    components: {
        signin: SigninComp,
        signup: SignupComp
    }
}