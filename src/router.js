import index from './pages/index/index.vue';
import apply from './pages/apply/apply.vue';
import member from './pages/member/member.vue';
import addMember from './pages/addMember/addMember.vue';
import editMember from './pages/editMember/editMember.vue';
import situation from './pages/situation/situation.vue';
import funding from './pages/funding/funding.vue';
import contactInfo from './pages/contactInfo/contactInfo.vue';
import civilianInfo from './pages/civilianInfo/civilianInfo.vue';

export default {
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/apply',
            component: apply
        },
        {
            path: '/member',
            component: member
        },
        {
            path: '/addMember',
            component: addMember
        },
        {
            path: '/editMember',
            component: editMember
        },
        {
            path: '/situation',
            component: situation
        },
        {
            path: '/funding',
            component: funding
        },
        {
            path: '/contactInfo',
            component: contactInfo
        },
        {
            path: '/civilianInfo',
            component: civilianInfo
        }
    ]
};