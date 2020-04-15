import BannerComp from "./BannerComp.js";
import MovComp from "./MovComp.js";
import TvComp from "./TvComp.js";
import MuComp from "./MuComp.js";

export default {
    props: {
        liveuser: {
            avatar: String,
            username: String,
        }
    },
    name: 'home',
    template: `
        <div class="mainWrapper">
            <div id="mainNav">
                <nav v-bind:class="{ kidNav : kid }">
                    <ul>
                        <li><router-link :to="{ name: 'profile' }" v-bind:class="{ hidden : kid }">ADULTS</router-link></li>
                        <li><router-link :to="{ name: 'profile' }">KIDS</router-link></li>
                        <div id="userNav">
                            <li><img :src="'public/images/' + liveuser.avatar" alt="avatar"><p>{{ liveuser.username }}</p></li>
                            <li><router-link :to="{ name: 'profile' }">PROFILES PANEL</router-link></li>
                            <li><button @click="byebye">SIGN OUT</button></li>
                        </div>
                    </ul>
                </nav>
            </div>

            <banner v-for="(item, index) in items" :video="item.video" :name="item.name"
            :year="item.year" :genre="item.genre" :rating="item.rating" :mpaa="item.artist_mpaa"
            :des="item.des" :banner="item.banner" :key="index"></banner>

            <div id="tagsNav">
                <div class="tag">
                    <img class="hidden" v-bind:class="{ kidIcons : kid }" src="./public/images/p_tv_icon.svg" alt="tv icon">
                    <button @click="goTvshows">TV Shows</button>
                </div>
                <div class="tag">
                    <img class="hidden" v-bind:class="{ kidIcons : kid }" src="./public/images/p_movies_icon.svg" alt="movies icon">
                    <button @click="goMovies">Movies</button>
                </div>
                <div class="tag">
                    <img class="hidden" v-bind:class="{ kidIcons : kid }" src="./public/images/p_music_icon.svg" alt="music icon">
                    <button @click="goMusic">Music</button>
                </div>
            </div>

            <component :is="activeComp"></component>
        </div>
    `,

    data() {
        return {
            kid: false,
            activeComp: MovComp,
            items: []
        }
    },

    created: function() {
        console.log(this.$root.permission);
        if(localStorage.getItem("liveuser")) {
            this.liveuser.username = localStorage.getItem("liveuser");
            this.liveuser.avatar = localStorage.getItem("avatar");
        } else {
            localStorage.setItem("liveuser", this.liveuser.username);
            localStorage.setItem("avatar", this.liveuser.avatar);
        }
        if(this.$root.permission == 1) {
            this.kid = true;
        }
        if (this.avatar === null || this.avatar === "null") {
            this.avatar = "simon.svg";
        }
        if(this.$root.permission == 1) {
            if(this.activeComp = MovComp){
                let url = './includes/admin/index.php?one_ko_item=true&tbl=tbl_movie&per=1';
            
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.items = data;
                })
                .catch((err) => console.log(err))
            } else if(this.activeComp = TvComp) {
                let url = './includes/admin/index.php?one_ko_item=true&tbl=tbl_tvshow&per=1';
            
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.items = data;
                })
                .catch((err) => console.log(err))
            } else {
                let url = './includes/admin/index.php?one_ko_item=true&tbl=tbl_music&per=1';
            
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.items = data;
                })
                .catch((err) => console.log(err))
            }
        } else {
            if(this.activeComp = MovComp){
                let url = './includes/admin/index.php?one_f_item=true&tbl=tbl_movie';
            
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.items = data;
                })
                .catch((err) => console.log(err))
            } else if(this.activeComp = TvComp) {
                let url = './includes/admin/index.php?one_f_item=true&tbl=tbl_tvshow';
            
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.items = data;
                })
                .catch((err) => console.log(err))
            } else {
                let url = './includes/admin/index.php?one_f_item=true&tbl=tbl_music';
            
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.items = data;
                })
                .catch((err) => console.log(err))
            }
        }
    },

    methods: {
        byebye() {
            this.$root.signout();
        },
        goTvshows() {
            console.log('switched to tv shows');
            this.activeComp = TvComp;
        },
        goMovies() {
            console.log('switched to movies');
            this.activeComp = MovComp;
        },
        goMusic() {
            console.log('switched to music');
            this.activeComp = MuComp;
        },
        openMovBan() {
            var id = this.getAttribute("id");
            let url = './includes/admin/index.php?one_item=true&tbl=tbl_movie&id=' + id;
        
            fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                this.items = data;
            })
            .catch((err) => console.log(err))
        },
        openTvBan() {
            var id = this.getAttribute("id");
            let url = './includes/admin/index.php?one_item=true&tbl=tbl_tvshow&id=' + id;
        
            fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                this.items = data;
            })
            .catch((err) => console.log(err))
        },
        openMuBan() {
            var id = this.getAttribute("id");
            let url = './includes/admin/index.php?one_item=true&tbl=tbl_music&id=' + id;
        
            fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                this.items = data;
            })
            .catch((err) => console.log(err))
        }
    },

    components: {
        banner: BannerComp
    }
}