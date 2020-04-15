import SingleUserComp from "./SingleUserComp.js";

export default {
    props: ['user'],
    name: 'profile',
    template: `
        <div id="profile">
            <h2>{{ pageTitle }}</h2>
            <div class="usersRow">
                <users @goset="goSetCurrent" v-for="(user, index) in usersdata" :img="user.user_avatar"
                :fname="user.user_fname" :per="user.user_permission" :key="index">
                </users>
            </div>
            <h3>{{ subTitle }}</h3>
            <div class="usersRow">
                <users @goset="goSetCurrent" v-for="(user, index) in usersdata2" :img="user.user_avatar"
                :fname="user.user_fname" :key="index">
                </users>
            </div>
        </div>
    `,

    data() {
        return {
            pageTitle: "Who's watching Flashback?",
            subTitle: "Kids",
            usersdata: [],
            usersdata2: []
        }
    },

    created: function() {
        this.fetchUsers();
        this.fetchUsers2();
        if (this.user_avatar === null || this.user_avatar === "null") {
            this.user_avatar = "simon.svg";
        }
        if(this.$root.currentUser == null && this.$root.permission == null) {
            console.log('clean');
        } else {
            this.$root.administrator = false;
            this.$root.kids = false;
            this.$root.currentUser = '';
            this.$root.permission = '';
            localStorage.removeItem("liveuser");
            localStorage.removeItem("avatar");
        }
    },

    methods: {
        fetchUsers() {
            var useremail = localStorage.getItem("useremail");
            
            let url = './includes/admin/index.php?all_user=true&per=1&email=' + useremail;
            
            fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                this.usersdata = data;
            })
            .catch((err) => console.log(err))
        },
        fetchUsers2() {
            var useremail = localStorage.getItem("useremail");
            let url = './includes/admin/index.php?all_user=true&per=0&email=' + useremail;

            fetch(url)
            .then(res => res.json())
            .then(data => {
                this.usersdata2 = data;
            })
            .catch((err) => console.log(err))
        },
        goSetCurrent(fname, per) {
            // console.log(fname);
            this.$emit("liveuser", fname, per);
        }
    },

    components: {
        users: SingleUserComp
    }
}