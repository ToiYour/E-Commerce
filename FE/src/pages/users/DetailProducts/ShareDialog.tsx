// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { ToastError, ToastSuccess } from "@/lib/utils";

// type ShareDialogType = {
//   title: string;
//   desc: string;
//   img: string;
// };
// const ShareDialog = (props: ShareDialogType) => {
//   const ogTitleContent = document.getElementById(
//     "ogTitleContent"
//   ) as HTMLMetaElement;
//   const ogDescriptionContent = document.getElementById(
//     "ogDescriptionContent"
//   ) as HTMLMetaElement;
//   const ogImageContent = document.getElementById(
//     "ogImageContent"
//   ) as HTMLMetaElement;
//   ogTitleContent.content = props.title;
//   ogDescriptionContent.content = props.desc;
//   ogImageContent.content = props.img;
//   window.fbAsyncInit = function () {
//     FB.init({
//       appId: "1589154008606291",
//       xfbml: true,
//       version: "v20.0",
//     });
//   };
//   const shareNewFeedDialog = () => {
//     if (FB) {
//       window.FB.ui(
//         {
//           method: "share",
//           href: window.location.href,
//         },
//         function (response) {
//           if (!response || response.error_message) {
//             console.error("Lỗi chia sẻ:", response.error_message);
//             response != "" && ToastError("Chia sẻ thất bại!");
//           } else {
//             ToastSuccess("Chia sẻ thành công!");
//           }
//         }
//       );
//     }
//   };
//   const shareMessengerDialog = () => {
//     if (FB) {
//       FB.ui({
//         method: "send",
//         link: window.location.href,
//       });
//     }
//   };
//   return (
//     <div className="flex items-center gap-1 ml-5">
//       <p>Chia sẻ:</p>
//       <ul className="flex items-center gap-2 *:cursor-pointer">
//         <li
//           onClick={shareMessengerDialog}
//           className="size-10 min-w-10 min-h-10"
//         >
//           <img
//             src="/images/messenger.png"
//             alt=""
//             className="w-full h-full object-cover"
//           />
//         </li>
//         <li onClick={shareNewFeedDialog} className="size-8 min-w-8 min-h-8">
//           <img
//             src="/images/facebook.png"
//             alt=""
//             className="w-full h-full object-cover"
//           />
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default ShareDialog;
