import Vue from "vue";
import VueRouter from "vue-router"

Vue.use(VueRouter);

const routes = [
	{ path: "*", redirect: "/orderManage/underway" },
	{
		path: "/homePage",
		component: () => import("@/view/HomePage"),
		children: [
			{ path: "/orderManage/underway", component: () => import("@/view/UnderwayPage") },
			{ path: "/orderManage/finished", component: () => import("@/view/FinishedPage") },
			{ path: "/companyManage", component: () => import("@/view/CompanyManage") },
			{ path: "/proTotal", component: () => import("@/view/ProTotalPage") },
			{ path: "/systemManage/orderFields", component: () => import("@/view/OrderFieldsPage") },
			{ path: "/systemManage/craftManage", component: () => import("@/view/CraftManage") },
			{ path: "/systemManage/tipsTime", component: () => import("@/view/TipsTimePage") },
			{ path: "/systemManage/operationLog", component: () => import("@/view/OperationLog") },
		]
	},
];

const router = new VueRouter({
	routes,
	mode: "history"
})

export default router;