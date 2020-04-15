export default {
    props: ['img', 'fname', 'per', 'admin'],
    name: 'singleUser',
    template: `
        <div class="singleUser">
            <router-link :to="{ name: 'home', params: { liveuser: { avatar: this.img, username: this.fname } } }">
            <img v-on:click="setCurrent" :src="'public/images/' + img" alt="avatar">
            <h4 v-on:click="setCurrent">{{ fname }}</h4>
            <p>{{ per }}</p><p>{{ admin }}</p>
            </router-link>
        </div>
    `,

    methods: {
        setCurrent() {
            var fname = this.fname;
            var per = this.per;
            var admin = this.admin;
            this.$emit("goset", fname, per, admin);
        }
    }
}