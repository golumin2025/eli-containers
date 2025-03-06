import { fields } from "@keystatic/core";


// <header
//   class="w-full px-4 sm:px-6 lg:px-8 relative z-[990000] transition-all duration-300"
//   id="navbar"
// >
//   <div class="max-w-7xl mx-auto">
//     <div class="flex justify-between items-center py-4">
//       <!-- Logo with fade animation -->
//       <a
//         href="/"
//         class="text-xl font-bold text-gray-800"
//         id="logo"
//       >
//         <ImageMod src={header.data.logo.logo} alt="Logo" />
//       </a>

//       <!-- Navigation with staggered fade animations -->
//       <nav
//         class="hidden lg:flex space-x-8"
//         id="navItems"

//       >
//         {
//           header?.data.menuItems.map((item, index) => (
//             <>
//               {!item.subMenu ? (
//                 <a
//                   href={item.link}
//                   class="text-text underline-text font-medium hover:text-primary"

//                 >
//                   {item.name}
//                 </a>
//               ) : (
//                 <div
//                   class="relative group"

//                 >
//                   <button class="text-text flex cursor-pointer  font-medium items-center gap-1 hover:text-primary">
//                     <span class="underline-text"> {item.name}</span>{" "}
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       class="w-5"
//                       xmlns:xlink="http://www.w3.org/1999/xlink"
//                       role="img"
//                       color="currentColor"
//                     >
//                       <path
//                         d="M5.99977 9.00005L11.9998 15L17.9998 9"
//                         stroke="currentColor"
//                         stroke-width="1.5"
//                         stroke-miterlimit="16"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       />
//                     </svg>
//                   </button>
//                   <div class="absolute left-0 mt-2 w-56 bg-primaryShade border border-border shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//                     {item.subMenu.map((sub) => (
//                       <a
//                         href={sub.link}
//                         class="block px-4 py-2 text-text hover:text-primary "
//                       >
//                         {sub.name}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </>
//           ))
//         }
//       </nav>
//       <div class="flex justify-center items-center gap-4">
//         <!-- CTA Button with fade animation -->
//         {
//           header?.data.button.enable && (
//             <div

//               class="sm:flex hidden"
//             >
//               <Button link={header?.data.button.link}>
//                 {header?.data.button.label}
//               </Button>
//             </div>
//           )
//         }

//         <!-- Mobile menu button -->
//         <button
//           class="lg:hidden text-text text-3xl relative"
//           id="menuBtn"

//         >
//           ☰
//         </button>
//       </div>
//     </div>
//   </div>
// </header>

// <!-- Mobile Menu with slide animation -->
// <div
//   class="lg:hidden fixed top-0 right-0 w-full h-full bg-gray-900/70 z-[990000] bg-opacity-75 hidden transition-all duration-300"
//   id="mobileMenu"
// >
//   <div
//     class="bg-primaryShade ml-auto w-72 h-full p-4 relative shadow-lg transform transition-transform duration-300"

//   >
//     <div class="mt-8"></div>
//     <button class="text-text top-4 right-4 absolute" id="closeMenu"
//       ><svg
//         width="48px"
//         height="48px"
//         viewBox="0 0 25.00 25.00"
//         fill="none"
//         class="w-6"
//         xmlns="http://www.w3.org/2000/svg"
//         stroke="#000000"
//         stroke-width="0.00025"
//         ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
//           id="SVGRepo_tracerCarrier"
//           stroke-linecap="round"
//           stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
//           <path
//             d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
//             fill="#000"></path>
//         </g></svg
//       ></button
//     >
//     <nav class="mt-8 divide-y border-b border-black/20 divide-black/20">
//       {
//         {header?.data.menuItems.map((item) => (
//           <>
//             {!item.subMenu ? (
//               <a
//                 href={item.link}
//                 class="block py-2  text-text hover:bg-gray-100"
//               >
//                 {item.name}
//               </a>
//             ) : (
//               <div class="relative">
//                 <button
//                   class="text-text py-2 w-full justify-between text-left flex items-center gap-2"
//                   id="dropdownBtn"
//                 >
//                   {item.name}{" "}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     class="injected-svg"
//                     data-src="https://cdn.hugeicons.com/icons/arrow-down-01-stroke-standard.svg"
//                     xmlns:xlink="http://www.w3.org/1999/xlink"
//                     role="img"
//                     color="#000000"
//                   >
//                     <path
//                       d="M5.99977 9.00005L11.9998 15L17.9998 9"
//                       stroke="#000"
//                       stroke-width="1.5"
//                       stroke-miterlimit="16"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     />
//                   </svg>
//                 </button>
//                 <div
//                   class="hidden  bg-primaryShade  divide-y   divide-black/20"
//                   id="mobileDropdown"
//                 >
//                   {item.subMenu.map((sub) => (
//                     <a
//                       href={sub.link}
//                       class="block px-6 py-2 text-text hover:bg-gray-100"
//                     >
//                       {sub.name}
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </>
//         ))
//       }
//     </nav>
//   </div>
// </div>



export const header = {
  label: "Header",
  path: "src/data/singletons/header",
  schema: {
    menuItems: fields.array(
      fields.object({
        name: fields.text({ label: "Name" }),
        link: fields.text({ label: "Link" }),
        subMenu: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            link: fields.text({ label: "Link" }),
          }),
          {
            label: "Sub Menu",
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      }),
      {
        label: "Menu Items",
        itemLabel: (props) => props.fields.name.value,
      }
    ),
    button: fields.object({
      enable: fields.checkbox({ label: "Enable" }),
      label: fields.text({ label: "Label" }),
      link: fields.text({ label: "Link" }),
    }),

  },
};
