export default {
    props: ['video', 'name', 'year', 'genre', 'rating', 'mpaa', 'des', 'banner'],
    name: 'banner',
    template: `
        <div id="banner" v-bind:class="{ kidBanner:kid }">
            <div v-if="this.$parent.play" class="videoWrapper">
                <a @click="closeVid" class="far fa-times-circle"></a>
                <video controls autoplay>
                    <source :src="'./public/video/' + video" type="video/mp4">
                        Sorry, your web don't support no web embbeded mp4.
                </video>
            </div>
            <div v-if="this.$parent.moreInfo" class="mainBan">
                <a>
                    <i @click="closeBan" class="fa fa-arrow-left"></i>
                    <p @click="closeBan">Back</p>
                </a>
                <div class="banCon">
                    <div class="row">
                        <h3>{{ name }}</h3>
                        <p>{{ year }} | {{ genre }}</p>
                        <p>Rating: {{ rating }}</p>
                        <p class="mpaa">{{ mpaa }}</p>
                        <button @click="play" v-if="authenticatedCheck">Play</button>
                    </div>
                    <div class="row">
                        <h4>Summary</h4>
                        <p>{{ des }}</p>
                    </div>
                </div>
            </div>
            <div class="backBan">
                <div class="imgCrop">
                    <img :src="'./public/images/' + banner" alt="banner image">
                </div>
                <div class="overImg">
                    <h3>{{ name }}</h3>
                    <p>{{ year }} | {{ genre }}</p>
                    <div class="banBtn">
                        <button @click="play" v-if="authenticatedCheck">Play</button>
                        <button @click="openBan">SEE MORE INFO</button>
                    </div>
                </div>
            </div>
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

    methods: {
        closeBan() {
            this.$parent.closeBan();
        },
        openBan() {
            this.$parent.openBan();
        },
        closeVid() {
            this.$parent.closeVid();
        },
        play() {
            this.$parent.playVid();
        }
    },
}