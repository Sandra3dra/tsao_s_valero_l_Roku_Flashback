import BannerComp from "./BannerComp.js";
import MovComp from "./MovComp.js";
import TvComp from "./TvComp.js";
import MuComp from "./MuComp.js";

export default {
    name: 'home',
    template: `
        <div class="mainWrapper" v-bind:class="{ bgKid: kid}">
            <div id="mainNav">
                <div class="mobNav">
                    <a @click="openMob" class="fa fa-grip-lines"></a>
                    <ul v-if="mobNav" id="mobMain">
                        <li class="pImg">
                            <img :src="'public/images/' + liveuser.avatar" alt="avatar">
                            <p>{{ liveuser.username }}</p>
                            <a @click="closeMob" class="fa fa-angle-up"></a>
                        </li>
                        <div class="mobSub">
                            <li @click="cleanUser"><router-link :to="{ name: 'profile' }">PROFILES PANEL</router-link></li>
                            <li><button @click="byebye">SIGN OUT</button></li>
                        </div>
                    </ul>
                </div>
                <nav v-bind:class="{ kidNav : kid }">
                    <ul>
                        <button @click="switchAdult" v-bind:class="{ visNone : aOption, adultS : adultS }">ADULTS</button>
                        <button @click="switchKid" v-bind:class="{ kidS : kidS }">KIDS</button>
                        <div id="userNav">
                            <li class="pImg">
                                <img :src="'public/images/' + liveuser.avatar" alt="avatar">
                                <p>{{ liveuser.username }}</p>
                            </li>
                            <a @click="hamNav = !hamNav" v-bind:class="{arrowDown:hamNav}" class="hideIcon fa fa-angle-down"></a>
                            <div v-if="hamNav"amp class="hideNav">
                                <router-link @click.native="cleanUser" :to="{ name: 'profile' }">PROFILES PANEL</router-link>
                                <button @click="byebye">SIGN OUT</button>
                            </div>
                        </div>
                    </ul>
                </nav>
            </div>

            <banner v-for="(item, index) in items" :video="item.video" :name="item.name"
            :year="item.year" :genre="item.genre" :rating="item.rating" :mpaa="item.artist_mpaa"
            :des="item.des" :banner="item.banner" :key="item.name"></banner>

            <div id="tagsNav">
                <div v-bind:class="{ selected:tvSelected }" class="tag">
                    <img class="hidden" v-bind:class="{ kidIcons : kid }" src="./public/images/p_tv_icon.svg" alt="tv icon">
                    <button @click="goTvshows">TV Shows</button>
                </div>
                <div v-bind:class="{ selected:movSelected }" class="tag">
                    <img class="hidden" v-bind:class="{ kidIcons : kid }" src="./public/images/p_movies_icon.svg" alt="movies icon">
                    <button @click="goMovies">Movies</button>
                </div>
                <div v-bind:class="{ selected:muSelected }" class="tag">
                    <img class="hidden" v-bind:class="{ kidIcons : kid }" src="./public/images/p_music_icon.svg" alt="music icon">
                    <button @click="goMusic">Music</button>
                </div>
            </div>

            <component :is="activeComp" ref="media"></component>
        </div>
    `,

    data() {
        return {
            kid: false,
            activeComp: MovComp,
            items: [],
            liveuser: {
                avatar: '',
                username: ''
            },
            toKid: false,
            aOption: false,
            play: false,
            moreInfo: false,
            tvSelected: false,
            movSelected: true,
            muSelected: false,
            kidS: false,
            adultS: false,
            mobNav: false,
            hamNav: false
        }
    },

    created: function() {
        console.log(this.$root.permission);
        if(localStorage.getItem("user")) {
            var user = localStorage.getItem("user");
            var userinfo = JSON.parse(user);
            this.liveuser.avatar = userinfo.avatar;
            this.liveuser.username = userinfo.fname;
            if(this.$root.authenticated === false) {
                this.$root.authenticated = true;
                if (userinfo.isAdmin == 1) {
                    this.$root.administrator = true;
                }
                this.$root.permission = userinfo.per;
                if (userinfo.per == 1) {
                    this.$root.kids = true;
                }
                this.$root.user.avatar = userinfo.avatar;
                this.$root.user.email = userinfo.email;
                this.$root.user.fname = userinfo.fname;
                this.$root.user.id = userinfo.id;
                this.$root.user.isAdmin = userinfo.admin;
                this.$root.user.per = userinfo.per;
            }
        }
        if (this.avatar === null || this.avatar === "null") {
            this.avatar = "simon.svg";
        }
        if(this.activeComp == MovComp) {
            this.movSelected = true;
            this.tvSelected = false;
            this.muSelected = false;
        } else if(this.activeComp == TvComp) {
            this.movSelected = false;
            this.tvSelected = true;
            this.muSelected = false;
        } else {
            this.movSelected = false;
            this.tvSelected = false;
            this.muSelected = true;
        }
        if(this.$root.permission == 1) {
            this.kid = true;
            this.aOption = true;
            this.kidS = true;
            if(this.activeComp == MovComp){
                let url = './includes/admin/index.php?one_ko_item=true&tbl=tbl_movie&per=1';
            
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.items = data;
                })
                .catch((err) => console.log(err))
            } else if(this.activeComp == TvComp) {
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
            this.adultS = true;
            if(this.activeComp == MovComp){
                let url = './includes/admin/index.php?one_f_item=true&tbl=tbl_movie';
            
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.items = data;
                })
                .catch((err) => console.log(err))
            } else if(this.activeComp == TvComp) {
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
        switchKid() {
            // console.log('click');
            this.toKid = true;
            this.kid = true;
            this.kidS = true;
            this.adultS = false;
            this.$root.kidView = true;
            this.$refs.media.fetchKid();
            if(this.activeComp == MovComp){
                let url = './includes/admin/index.php?one_ko_item=true&tbl=tbl_movie&per=1';
            
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.items = data;
                })
                .catch((err) => console.log(err))
            } else if(this.activeComp == TvComp) {
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
        },
        switchAdult() {
            this.toKid = false;
            this.kid = false;
            this.kidS = false;
            this.adultS = true;
            this.$root.kidView = false;
            this.$refs.media.fetchAll();
            if(this.activeComp == MovComp){
                let url = './includes/admin/index.php?one_f_item=true&tbl=tbl_movie';
            
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.items = data;
                })
                .catch((err) => console.log(err))
            } else if(this.activeComp == TvComp) {
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
        },
        bannerUpdate() {
            if(this.kid === true) {
                if(this.activeComp == MovComp){
                    let url = './includes/admin/index.php?one_ko_item=true&tbl=tbl_movie&per=1';
                
                    fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        this.items = data;
                    })
                    .catch((err) => console.log(err))
                } else if(this.activeComp == TvComp) {
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
                if(this.activeComp == MovComp){
                    let url = './includes/admin/index.php?one_f_item=true&tbl=tbl_movie';
                
                    fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        this.items = data;
                    })
                    .catch((err) => console.log(err))
                } else if(this.activeComp == TvComp) {
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
        goTvshows() {
            console.log('switched to tv shows');
            this.activeComp = TvComp;
            this.bannerUpdate();
            this.tvSelected = true;
            this.muSelected = false;
            this.movSelected = false;
        },
        goMovies() {
            console.log('switched to movies');
            this.activeComp = MovComp;
            this.bannerUpdate();
            this.tvSelected = false;
            this.muSelected = false;
            this.movSelected = true;
        },
        goMusic() {
            console.log('switched to music');
            this.activeComp = MuComp;
            this.bannerUpdate();
            this.tvSelected = false;
            this.muSelected = true;
            this.movSelected = false;
        },
        getMovBan(id) {
            // var id = id;
            let url = './includes/admin/index.php?one_item=true&tbl=tbl_movie&id=' + id;
        
            fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                this.items = data;
            })
            .catch((err) => console.log(err))
        },
        getTvBan(id) {
            // var id = this.id;
            let url = './includes/admin/index.php?one_item=true&tbl=tbl_tvshow&id=' + id;
        
            fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                this.items = data;
            })
            .catch((err) => console.log(err))
        },
        getMuBan(id) {
            // var id = this.id;
            let url = './includes/admin/index.php?one_item=true&tbl=tbl_music&id=' + id;
        
            fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                this.items = data;
            })
            .catch((err) => console.log(err))
        },
        playVid() {
            this.play = true;
        },
        closeVid() {
            this.play = false;
        },
        openBan() {
            this.moreInfo = true;
        },
        closeBan() {
            this.moreInfo = false;
        },
        openMob() {
            this.mobNav = true;
        },
        closeMob() {
            this.mobNav = false;
        },
        cleanUser() {
            if(this.$root.administrator === false && this.$root.kids === false) {
                console.log('clean');
            } else {
                console.log("cleaned");
                this.$root.administrator = false;
                this.$root.kids = false;
            }
        }
    },

    components: {
        banner: BannerComp
    }
}