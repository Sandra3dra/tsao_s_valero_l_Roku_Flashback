import AccountComp from "./AccountComp.js";
import ProfileComp from "./ProfileComp.js";
import HomeComp from "./HomeComp.js";
import ErrorComp from "./ErrorComp.js";

let router = new VueRouter({
    routes: [
        { path: '/', redirect: { name: "account" } },
        { path: '/account', name: 'account', component: AccountComp },
        { 
            path: '/profile', 
            name: 'profile', 
            component: ProfileComp,
            beforeEnter: (to, from, next) => {
                console.log("router guard fire");

                if (localStorage.getItem('user') == null) {
                    next("/account");
                } else {
                    next();
                }
            }
        },
        {   path: '/home', name: 'home', component: HomeComp },
        { path: '*', name: 'error', component: ErrorComp }
    ]
});

export default router