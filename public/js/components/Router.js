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
                if (localStorage.getItem('user') == null) {
                    console.log("router guard fire");
                    next("/account");
                } else {
                    next();
                }
            },
            props: true
        },
        {   
            path: '/home', 
            name: 'home', 
            component: HomeComp, 
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('user') == null) {
                    console.log("router guard fire");
                    next("/account");
                } else {
                    next();
                }
            },
            props: true
        },
        { path: '*', name: 'error', component: ErrorComp }
    ]
});

export default router