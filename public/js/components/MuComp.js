export default {
    name: 'music',
    template: `
        <div class="movCon" v-bind:class="{ kidMu : kid }">
            <div class="mov" v-for="(items, index) in allitems" :key="index">
                <div class="imgWrapper">
                    <div class="imgHov">
                        <button @click="play" v-if="authenticatedCheck">Play</button>
                        <button @click="getBan(items.id); banner();">SEE MORE INFO</button>
                    </div>
                    <img @click="banner" :src="'public/images/' + items.img" alt="cover image">
                </div>
                <div class="content">
                    <h3>{{ items.name }}</h3>
                    <p>{{ items.artist }} {{ items.length }} min</p>
                    <p>{{ items.year }} | {{ items.genre }}</p>
                </div>
            </div>
        </div>
    `,

    data() {
        return {
            allitems: [],
            authenticatedCheck: this.$root.authenticated,
            kid: false
        }
    },

    created: function() {
        this.fetchAll();
        if(this.$root.permission == 1) {
            this.kid = true;
        }
    },

    methods: {
        fetchAll() {
            if(this.$root.permission == 1) {
                let url = './includes/admin/index.php?all_items=true&per=1&tbl=tbl_music';
            
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.allitems = data;
                })
                .catch((err) => console.log(err))
            } else {
                let url = './includes/admin/index.php?all_items=true&per=2&tbl=tbl_music';
            
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.allitems = data;
                })
                .catch((err) => console.log(err))
            }
        },
        getBan(id) {
            this.$parent.getMuBan(id);
        },
        fetchKid() {
            let url = './includes/admin/index.php?all_items=true&per=1&tbl=tbl_music';
            
            fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                this.allitems = data;
            })
            .catch((err) => console.log(err))
        },
        banner() {
            this.$parent.openBan();
        },
        play() {
            this.$parent.playVid();
        }
    }
}