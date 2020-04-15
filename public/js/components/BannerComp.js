export default {
    props: ['video', 'name', 'year', 'genre', 'rating', 'mpaa', 'des', 'banner'],
    name: 'banner',
    template: `
        <div class="banner" v-bind:class="{ kidBanner:kid }">
            <div class="videoWrapper">
                <router-link to="home" @click="this.$parent.closeVid()"><i class="fa fa-times-circle"></i></router-link>
                <video controls autoplay>
                    <source :src="'./public/video/' + video" type="video/mp4">
                        Sorry, your web don't support no web embbeded mp4.
                </video>
            </div>
            <div class="mainBan">
                <router-link to="home" @click="this.$parent.closeBanner()">
                    <i class="fa fa-arrow-left"></i>
                    <p>Back</p>
                </router-link>
                <div class="banCon">
                    <div class="row">
                        <h3>{{ name }}</h3>
                        <p>{{ year }} | {{ genre }}</p>
                        <p>Rating: {{ rating }}</p>
                        <p class="mpaa">{{ mpaa }}</p>
                        <button v-if="authenticatedCheck = true">Play</button>
                    </div>
                    <div class="row">
                        <h4>Summary</h4>
                        <p>{{ des }}</p>
                    </div>
                </div>
            </div>
            <div class="backBan">
                <h3>{{ name }}</h3>
                <p>{{ year }} | {{ genre }}</p>
                <button v-if="authenticatedCheck = true">Play</button>
                <button @click="this.$parent.openBan()">SEE MORE INFO</button>
            </div>
            <img :src="'./public/images/' + banner" alt="banner image">
        </div>
    `,
    data() {
        return {
            authenticatedCheck: this.$root.authenticated,
            kid: false
        }
    },

    created: function() {
        if(this.$root.permission == 1) {
            this.kid = true;
        }
    },
}