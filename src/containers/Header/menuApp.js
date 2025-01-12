export const adminMenu = [
  {
    //hệ thống
    name: "menu.system.header",
    menus: [
      {
        name: "menu.system.system-administrator.header",
        subMenus: [
          {
            name: "menu.system.system-administrator.user-manage",
            link: "/system/user-manage",
          },
          {
            name: "menu.system.system-administrator.user-redux",
            link: "/system/user-redux",
          },
        ],
      },
      {
        name: "menu.system.doctor.header",
        link: "/system/manage-doctor",
      },
      {
        name: "menu.system.doctor.manage-schedule",
        link: "/doctor/doctor-schedule",
      },
    ],
  },
  {
    //hệ thống
    name: "menu.clinic.header",
    menus: [
      {
        name: "menu.clinic.clinic-manage",
        link: "/clinic/clinic-manage",
      },
      {
        name: "menu.clinic.clinic-redux",
        link: "/clinic/clinic-redux",
      },
    ],
  },
  {
    //hệ thống
    name: "menu.specialties.header",
    menus: [
      {
        name: "menu.specialties.specialties-manage",
        link: "/clinic/clinic-manage",
      },
      {
        name: "menu.specialties.specialties-redux",
        link: "/clinic/clinic-redux",
      },
    ],
  },
  {
    //hệ thống
    name: "menu.Handbook.header",
    menus: [
      {
        name: "menu.Handbook.Handbook-manage",
        link: "/clinic/clinic-manage",
      },
      {
        name: "menu.Handbook.Handbook-redux",
        link: "/clinic/clinic-redux",
      },
    ],
  },
];
export const DoctorMenu = [
  {
    //hệ thống
    name: "menu.system.doctor.manage-schedule",
    menus: [
      {
        name: "menu.system.doctor.schedule",
        link: "/doctor/doctor-schedule",
      },
    ],
  },
];
