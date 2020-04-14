import SingleUserComp from "./SingleUserComp.js";

export default {
    props: ['user'],
    name: 'profile',
    template: `
        <div id="profile">
            <h2>{{ pageTitle }}</h2>
            <div class="usersRow">
                <users v-for="(user, index) in usersdata" :img="user.img"
                :fname="user.fname" :key="index">
                </users>
            </div>
            <h3>{{ subTitle }}</h3>
            <div class="usersRow">
                <users v-for="(user, index) in usersdata2" :img="user.img"
                :fname="user.fname" :key="index">
                </users>
            </div>
        </div>
    `,

    data() {
        return {
            usersdata: [],
            usersdata2: []
        }
    },

    created: function() {
        this.fetchUsers();
        this.fetchUsers2();
    },

    methods: {
        fetchUsers() {
            $useremail = this.user.email;
            let url = './includes/admin/index.php?all_user=true&per=1&email='.$useremail;

            fetch(url)
            .then(res => res.json())
            .then(data => {
                this.usersdata = data;
            })
            .catch((err) => console.log(err))
        },
        fetchUsers2() {
            $useremail = this.user.email;
            let url = './includes/admin/index.php?all_user=true&per=0&email='.$useremail;

            fetch(url)
            .then(res => res.json())
            .then(data => {
                this.usersdata2 = data;
            })
            .catch((err) => console.log(err))
        },
        setCurrent() {
            this.$emit("currentUser", this.fname);
        }
    },

    components: {
        users: SingleUserComp
    }
}