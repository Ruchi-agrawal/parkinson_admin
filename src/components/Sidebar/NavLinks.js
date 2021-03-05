// sidebar nav links
export default {
   category1: [
      {
         "menu_title": "sidebar.dashboard",
         "menu_icon": "zmdi zmdi-view-dashboard",
         "type_multi": null,
         "new_item": false,
         "access": ["super_admin", "sip_admin", "agent_admin"],
         "path": "/system_admin/app/admin/dashboard",
         "path2": "/system_admin/app/admin-agent/development",
         // "child_routes": [
         //    {
         //       "path": "/system_admin/app/admin/developments",
         //       "new_item": false,
         //       "menu_title": "Developments"
         //    }
         // ]
      },
      {
         "menu_title": "Post",
         "menu_icon": "zmdi zmdi-account-box-mail",
         "type_multi": null,
         "new_item": false,
         "access": ["super_admin"],
         "child_routes": [
            {
               "path": "/system_admin/app/admin/postList",
               "new_item": false,
               "menu_title": "List of Post"
            }
         ]
      },
      // {
      //    "menu_title": "User's List",
      //    "menu_icon": "zmdi zmdi-accounts",
      //    "type_multi": null,
      //    "new_item": false,
      //    "access": ["super_admin"],
      //    "child_routes": [
      //       {
      //          "path": "/system_admin/app/admin/users_list",
      //          "new_item": false,
      //          "menu_title": "List of Users"
      //       }
      //    ]
      // },
      // {
      //    "menu_title": "Settings",
      //    "menu_icon": "zmdi zmdi-settings",
      //    "type_multi": null,
      //    "new_item": false,
      //    "access": ["super_admin", "sip_admin"],
      //    "child_routes": [
      //       {
      //          "path": "/system_admin/app/admin/settings-route",
      //          "new_item": false,
      //          "menu_title": "Settings"
      //       }
      //    ]
      // },
      // {
      //    "menu_title": "Reports",
      //    "menu_icon": "zmdi zmdi-file",
      //    "type_multi": null,
      //    "new_item": false,
      //    "access": ["super_admin", "sip_admin", "sip_progress_management"],
      //    "path": "/system_admin/app/admin/report",
      //    // "child_routes": [
      //    //    {
      //    //       "path": "/system_admin/app/admin/report",
      //    //       "new_item": false,
      //    //       "menu_title": ""
      //    //    }
      //    // ]
      // },
      // {
      //    "menu_title": "Announcment",
      //    "menu_icon": "zmdi zmdi-notifications-active",
      //    "type_multi": null,
      //    "new_item": false,
      //    "access": ["super_admin"],
      //    "child_routes": [
      //       {
      //          "path": "/system_admin/app/admin/shared_announcment",
      //          "new_item": false,
      //          "menu_title": "Sent E-mail List"
      //       },
      //       {
      //          "path": "/system_admin/app/admin/shared_announcment",
      //          "new_item": false,
      //          "menu_title": "Send New E-mail",
      //          "type": "popoup",
      //          "click": "Announcment"
      //       }
      //    ]
      // },
   ],
   category2: [
      // {
      //    "menu_title": localStorage.getItem('access_token') && localStorage.getItem('access_token').length ? "Logout" : "Login",
      //    "menu_icon": "zmdi zmdi-time-interval",
      //    "path": localStorage.getItem('access_token') && localStorage.getItem('access_token').length ? "/app/admin/logout" : "/app/admin/login",
      //    "new_item": false,
      //    "child_routes": null
      // },
      // {
      //    "menu_title": "Forgot Password",
      //    "menu_icon": "zmdi zmdi-time-interval",
      //    "path": "/system_admin/app/admin/forgotpassword",
      //    "new_item": false,
      //    "child_routes": null
      // },
      // {
      //    "menu_title": "Account",
      //    "menu_icon": "zmdi zmdi-time-interval",
      //    "path": "/system_admin/app/admin/account",
      //    "new_item": false,
      //    "child_routes": null
      // }
   ]
}
