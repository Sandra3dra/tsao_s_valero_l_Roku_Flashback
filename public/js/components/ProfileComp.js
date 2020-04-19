import SingleUserComp from "./SingleUserComp.js";
import DbcComp from "./DbcComp.js";

export default {
    props: ['user'],
    name: 'profile',
    template: ` 
        <div id="profile">
            <dbc v-if="isAdult" :name="liveuser.username" :img="liveuser.avatar" :admin="liveuser.admin" :per="liveuser.per" :id="liveuser.id"></dbc>
            <h2>{{ pageTitle }}</h2>
            <div class="usersRow">
                <users @pickeduser="needPass" v-for="(user, index) in usersdata" :img="user.user_avatar"
                :fname="user.user_fname" :per="user.user_permission" :admin="user.user_admin" :id="user.user_id" :key="index">
                </users>
            </div>
            <h3>{{ subTitle }}</h3>
            <div class="usersRow">
                <users v-for="(user, index) in usersdata2" :img="user.user_avatar"
                :fname="user.user_fname" :per="user.user_permission" :admin="user.user_admin" :id="user.user_id" :key="index">
                </users>
            </div>
        </div>
    `,

    data() {
        return {
            pageTitle: "Who's watching Flashback?",
            subTitle: "Kids",
            usersdata: [],
            usersdata2: [],
            liveuser: { 
                avatar: '', 
                username: '',
                admin: '',
                per: '',
                id: ''
            },
            isAdult: false
        }
    },

    created: function() {
        this.fetchUsers();
        this.fetchUsers2();
        if(localStorage.getItem("user")) {
            this.$root.authenticated = true;
            var user = localStorage.getItem('user');
            var userinfo = JSON.parse(user);
            this.$root.user = userinfo;
        }
        if (this.user_avatar === null || this.user_avatar === "null") {
            this.user_avatar = "simon.svg";
        }
        if(this.$root.currentUser == '' && this.$root.permission == '') {
            console.log('clean');
        } else {
            this.$root.administrator = false;
            this.$root.currentUser = '';
            this.$root.permission = '';
        }
    },

    methods: {
        fetchUsers() {
            var userinfo = localStorage.getItem("user");
            var useremail = JSON.parse(userinfo).email;
            
            let url = './includes/admin/index.php?all_user=true&per=2&email=' + useremail;
            
            fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                this.usersdata = data;
            })
            .catch((err) => console.log(err))
        },
        fetchUsers2() {
            var userinfo = localStorage.getItem("user");
            var useremail = JSON.parse(userinfo).email;

            let url = './includes/admin/index.php?all_user=true&per=1&email=' + useremail;

            fetch(url)
            .then(res => res.json())
            .then(data => {
                this.usersdata2 = data;
            })
            .catch((err) => console.log(err))
        },
        needPass(avatar,fname,admin,per,id) {
            this.liveuser.username = fname;
            this.liveuser.avatar = avatar;
            this.liveuser.admin = admin;
            this.liveuser.per = per;
            this.liveuser.id = id;
        },
        // goSetCurrent(fname, per, admin) {
        //     // console.log(fname);
        //     this.$emit("liveuser", fname, per, admin);
        // },
        adultCheck() {
            this.isAdult = true;
        },
        adultNo() {
            this.isAdult = false;
        }
    },

    components: {
        users: SingleUserComp,
        dbc: DbcComp
    }
}