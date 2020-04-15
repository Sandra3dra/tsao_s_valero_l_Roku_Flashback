
export default {
    props: ['img', 'fname', 'per', 'admin', 'id'],
    name: 'singleUser',
    template: `
        <div class="singleUser">
            <a>
            <img v-on:click="setCurrent" :src="'public/images/' + img" alt="avatar">
            <h4 v-on:click="setCurrent">{{ fname }}</h4>
            <div class="hidden"><p>{{ id }}</p><p>{{ per }}</p><p>{{ admin }}</p></div>
            </a>
        </div>
    `,

    methods: {
        setCurrent() {
            var fname = this.fname;
            var per = this.per;
            var admin = this.admin;
            var avatar = this.img;
            if(per == 2) {
                // console.log(per);
                this.$emit("pickeduser", avatar, fname, admin, per);
            } else {
                this.$emit("goset", fname, per, admin);
                this.$router.replace({name: 'home', params: { liveuser: { avatar: this.img, username: this.fname } }});
            }
        }
    }
}