import { IconSvgProps } from "@/types/layout"

export const ButtonSVG: React.FC<IconSvgProps> = ({ width, height, ...props }) => {
  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 269 82"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M237.862 80.0041H40.5413C24.4651 80.0041 11.2905 65.0844 11.2905 46.8764C11.2905 28.637 24.4651 13.7487 40.5413 13.7487H237.833C253.938 13.7487 267.111 28.637 267.111 46.8764C267.111 65.1008 253.938 80.0041 237.862 80.0041Z"
        fill="#EDD136"
      />
      <mask
        id="mask0_2_22"
        // style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="7"
        y="10"
        width="262"
        height="72"
      >
        <path d="M7.09332 10.9363H268.432V81.3543H7.09332V10.9363Z" fill="white" />
      </mask>
      <g mask="url(#mask0_2_22)">
        <path
          d="M260.819 24.2924L260.834 24.276L250.044 10.9512L248.278 12.7893L250.476 15.5062C246.626 13.5055 242.344 12.382 237.833 12.382H40.5413C23.7606 12.382 10.1135 27.8717 10.1135 46.8764C10.1135 50.8629 10.7165 54.7033 11.8222 58.2661L9.19386 55.0285L7.42712 56.8666L16.9087 68.5652C22.482 76.3592 31.0017 81.3543 40.5413 81.3543H237.862C254.641 81.3543 268.261 65.8647 268.261 46.86C268.261 38.2364 265.46 30.3454 260.819 24.2924ZM230.98 78.6703L221.254 66.6778L219.487 68.5174L227.719 78.6703H214.042L204.331 66.6942L202.564 68.5338L210.782 78.6703H197.263L187.537 66.6614L185.77 68.501L194.015 78.6539H180.454L170.729 66.6614L168.96 68.501L177.192 78.6539H163.358L153.632 66.6614L151.866 68.501L160.098 78.6539H146.262L136.551 66.6778L134.784 68.5174L143.002 78.6539H129.195L119.469 66.6614L117.703 68.501L125.935 78.6539H112.099L102.373 66.6614L100.606 68.501L108.839 78.6539H95.0028L85.2917 66.6778L83.5249 68.5174L91.7424 78.6539H77.9357L68.2101 66.6614L66.4434 68.5174L74.6754 78.6703H60.841L51.1285 66.6778L49.3618 68.5174L57.5938 78.6539H43.8016L34.076 66.6614L32.2802 68.501L40.5123 78.6539C32.8265 78.6375 25.8585 75.1224 20.801 69.4275L20.8301 69.3962L18.5751 66.6301C14.7672 61.2112 12.4832 54.3452 12.4832 46.8764C12.4832 29.3368 25.0536 15.1004 40.5123 15.1004H237.833C245.648 15.1004 252.716 18.7289 257.816 24.5699L259.052 26.0992C262.012 29.9873 264.166 34.69 265.201 39.8641L257.816 30.7527L256.049 32.5908L265.818 44.6474C265.862 45.3799 265.891 46.1289 265.891 46.8764C265.891 49.8215 265.531 52.6697 264.871 55.3702L256.193 44.6802L254.426 46.5183L263.994 58.3317C262.73 62.0244 260.877 65.3932 258.55 68.2727L249.369 56.9487L247.602 58.7868L256.854 70.2093C254.211 72.9754 251.093 75.188 247.66 76.6517L238.121 64.889L236.354 66.7271L245.145 77.5632C242.803 78.2794 240.346 78.6703 237.804 78.6703H230.98Z"
          fill="#040000"
        />
      </g>
      <path
        d="M227.834 67.6223H30.499C14.4229 67.6223 1.26404 52.7175 1.26404 34.4946C1.26404 16.2553 14.4229 1.35046 30.499 1.35046H227.82C243.896 1.35046 257.069 16.2717 257.069 34.4782C257.069 52.7175 243.91 67.6223 227.834 67.6223Z"
        fill="#F4F4F4"
      />
      <mask
        id="mask1_2_22"
        // style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="259"
        height="69"
      >
        <path d="M0 0H258.401V68.9917H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask1_2_22)">
        <path
          d="M227.834 0H30.4989C13.7195 0 0.071167 15.4255 0.071167 34.4615C0.071167 53.4991 13.7195 68.9559 30.4989 68.9559H227.82C244.599 68.9559 258.247 53.4663 258.247 34.4615C258.247 15.4583 244.614 0 227.834 0ZM73.5116 66.2554H30.528C15.0403 66.2554 2.46992 51.9862 2.46992 34.4779C2.46992 16.9712 15.0403 2.71688 30.4989 2.71688H73.5116L75.8536 2.68555H227.82C243.306 2.68555 255.878 16.9548 255.878 34.4615C255.878 52.0011 243.278 66.239 227.82 66.239H73.5116V66.2554Z"
          fill="#3A3A3A"
        />
      </g>
    </svg>
  )
}
export const SmButtonSVG: React.FC<IconSvgProps> = ({ width, height, ...props }) => {
  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 120 51"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M106.139 50.1548H18.328C11.1739 50.1548 5.31091 40.9317 5.31091 29.6758C5.31091 18.4006 11.1739 9.1969 18.328 9.1969H106.126C113.293 9.1969 119.156 18.4006 119.156 29.6758C119.156 40.9418 113.293 50.1548 106.139 50.1548Z"
        fill="#EDD136"
      />
      <mask id="mask0_5_19" maskUnits="userSpaceOnUse" x="3" y="7" width="117" height="44">
        <path d="M3.44312 7.45831H119.743V50.9894H3.44312V7.45831Z" fill="white" />
      </mask>
      <g mask="url(#mask0_5_19)">
        <path
          d="M116.355 15.7148L116.362 15.7047L111.561 7.46753L110.774 8.60381L111.753 10.2833C110.039 9.04652 108.134 8.35202 106.126 8.35202H18.328C10.8603 8.35202 4.78717 17.9274 4.78717 29.6758C4.78717 32.1402 5.05551 34.5142 5.54756 36.7167L4.3779 34.7153L3.59167 35.8516L7.81113 43.0834C10.2914 47.9016 14.0828 50.9894 18.328 50.9894H106.139C113.606 50.9894 119.667 41.414 119.667 29.6657C119.667 24.3347 118.421 19.4566 116.355 15.7148ZM103.076 49.3302L98.7483 41.9167L97.9621 43.0539L101.626 49.3302H95.5388L91.2172 41.9268L90.431 43.064L94.0879 49.3302H88.0717L83.7436 41.9065L82.9574 43.0438L86.6267 49.3201H80.5917L76.2636 41.9065L75.4768 43.0438L79.1402 49.3201H72.9836L68.6555 41.9065L67.8693 43.0438L71.5327 49.3201H65.3756L61.054 41.9167L60.2677 43.0539L63.9247 49.3201H57.7804L53.4524 41.9065L52.6661 43.0438L56.3295 49.3201H50.1724L45.8443 41.9065L45.0581 43.0438L48.7215 49.3201H42.5644L38.2427 41.9167L37.4565 43.0539L41.1134 49.3201H34.9692L30.6411 41.9065L29.8549 43.0539L33.5183 49.3302H27.3618L23.0396 41.9167L22.2533 43.0539L25.9167 49.3201H19.779L15.4509 41.9065L14.6517 43.0438L18.3151 49.3201C14.8948 49.3099 11.7939 47.137 9.5433 43.6165L9.55622 43.5971L8.55273 41.8872C6.85814 38.5374 5.84174 34.2929 5.84174 29.6758C5.84174 18.8331 11.4358 10.0325 18.3151 10.0325H106.126C109.604 10.0325 112.75 12.2755 115.019 15.8864L115.569 16.8317C116.886 19.2353 117.845 22.1424 118.305 25.341L115.019 19.7084L114.233 20.8447L118.58 28.2979C118.6 28.7507 118.613 29.2137 118.613 29.6758C118.613 31.4964 118.452 33.2571 118.159 34.9265L114.297 28.3182L113.511 29.4545L117.768 36.7573C117.206 39.04 116.381 41.1226 115.345 42.9026L111.26 35.9023L110.474 37.0386L114.591 44.0998C113.415 45.8098 112.027 47.1775 110.5 48.0823L106.254 40.8108L105.468 41.9471L109.38 48.6459C108.338 49.0886 107.245 49.3302 106.113 49.3302H103.076Z"
          fill="#040000"
        />
      </g>
      <path
        d="M101.677 42.5006H13.8591C6.70491 42.5006 0.848999 33.2868 0.848999 22.0217C0.848999 10.7465 6.70491 1.53259 13.8591 1.53259H101.67C108.824 1.53259 114.687 10.7566 114.687 22.0115C114.687 33.2868 108.831 42.5006 101.677 42.5006Z"
        fill="#F4F4F4"
      />
      <mask id="mask1_5_19" maskUnits="userSpaceOnUse" x="0" y="0" width="116" height="44">
        <path d="M0.286499 0.697754H115.279V43.3472H0.286499V0.697754Z" fill="white" />
      </mask>
      <g mask="url(#mask1_5_19)">
        <path
          d="M101.677 0.697754H13.8591C6.39193 0.697754 0.318176 10.2335 0.318176 22.0012C0.318176 33.7699 6.39193 43.325 13.8591 43.325H101.67C109.137 43.325 115.211 33.7496 115.211 22.0012C115.211 10.2538 109.144 0.697754 101.677 0.697754ZM33.0004 41.6556H13.872C6.9797 41.6556 1.38566 32.8347 1.38566 22.0114C1.38566 11.189 6.9797 2.37728 13.8591 2.37728H33.0004L34.0427 2.35791H101.67C108.562 2.35791 114.156 11.1789 114.156 22.0012C114.156 32.8439 108.55 41.6455 101.67 41.6455H33.0004V41.6556Z"
          fill="#3A3A3A"
        />
      </g>
      <mask id="mask2_5_19" maskUnits="userSpaceOnUse" x="0" y="0" width="116" height="44">
        <path d="M0.286499 0.697754H115.279V43.3472H0.286499V0.697754Z" fill="white" />
      </mask>
      <g mask="url(#mask2_5_19)">
        <path
          d="M101.677 0.697754H13.8591C6.39193 0.697754 0.318176 10.2335 0.318176 22.0012C0.318176 33.7699 6.39193 43.325 13.8591 43.325H101.67C109.137 43.325 115.211 33.7496 115.211 22.0012C115.211 10.2538 109.144 0.697754 101.677 0.697754ZM33.0004 41.6556H13.872C6.9797 41.6556 1.38566 32.8347 1.38566 22.0114C1.38566 11.189 6.9797 2.37728 13.8591 2.37728H33.0004L34.0427 2.35791H101.67C108.562 2.35791 114.156 11.1789 114.156 22.0012C114.156 32.8439 108.55 41.6455 101.67 41.6455H33.0004V41.6556Z"
          fill="#3A3A3A"
        />
      </g>
    </svg>
  )
}

export const headerBTNLeft: React.FC<IconSvgProps> = ({ width, height, ...props }) => {
  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 181 49"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M160.369 47.5888H27.4872C16.6642 47.5888 7.79028 38.7119 7.79028 27.8787C7.79028 17.0291 16.6642 8.17407 27.4872 8.17407H160.352C171.197 8.17407 180.066 17.0291 180.066 27.8787C180.066 38.7228 171.197 47.5888 160.369 47.5888Z"
        fill="#EDD136"
      />
      <mask id="mask0_6_271" maskUnits="userSpaceOnUse" x="4" y="6" width="177" height="43">
        <path d="M4.19519 6.10828H180.975V48.3889H4.19519V6.10828Z" fill="white" />
      </mask>
      <g mask="url(#mask0_6_271)">
        <path
          d="M175.832 14.4428L175.842 14.4373L168.577 6.5083L167.385 7.60422L168.863 9.2207C166.27 8.02615 163.39 7.35764 160.352 7.35764H27.4872C16.1877 7.35764 6.99976 16.5743 6.99976 27.8787C6.99976 30.2514 7.40583 32.5364 8.14757 34.657L6.37712 32.7282L5.19141 33.8241L11.5748 40.7832C15.3268 45.4189 21.0659 48.3889 27.4872 48.3889H160.369C171.668 48.3889 180.84 39.1777 180.84 27.8678C180.84 22.7389 178.956 18.0483 175.832 14.4428ZM155.734 46.7943L149.188 39.6599L147.997 40.7558L153.541 46.7943H144.332L137.791 39.6708L136.6 40.7613L142.133 46.7943H133.032L126.481 39.6489L125.29 40.7448L130.845 46.7834H121.711L115.16 39.6489L113.969 40.7448L119.513 46.7834H110.195L103.649 39.6489L102.458 40.7448L108.002 46.7834H98.6843L92.1439 39.6599L90.9528 40.7558L96.4861 46.7834H87.1899L80.6441 39.6489L79.4529 40.7448L84.9971 46.7834H75.6792L69.128 39.6489L67.9369 40.7448L73.481 46.7834H64.1632L57.6228 39.6599L56.4371 40.7558L61.9704 46.7834H52.6742L46.123 39.6489L44.9318 40.7558L50.476 46.7943H41.1581L34.6177 39.6599L33.4266 40.7558L38.9708 46.7834H29.6854L23.1342 39.6489L21.9268 40.7448L27.4709 46.7834C22.2949 46.7724 17.6008 44.6847 14.1953 41.2928L14.2169 41.2764L12.6955 39.6325C10.1346 36.405 8.59695 32.3227 8.59695 27.8787C8.59695 17.4456 17.0594 8.97412 27.4709 8.97412H160.352C165.615 8.97412 170.374 11.1331 173.807 14.6126L174.64 15.5222C176.633 17.8346 178.084 20.6292 178.782 23.7088L173.807 18.2894L172.616 19.3799L179.199 26.5527C179.226 26.991 179.243 27.4349 179.243 27.8787C179.243 29.6322 179.004 31.3254 178.56 32.9309L172.713 26.5746L171.527 27.665L177.97 34.6954C177.115 36.8927 175.869 38.8927 174.299 40.6079L168.122 33.8734L166.931 34.9639L173.162 41.7586C171.381 43.4079 169.28 44.723 166.968 45.5943L160.542 38.5968L159.356 39.6873L165.274 46.1368C163.698 46.5587 162.042 46.7943 160.331 46.7943H155.734Z"
          fill="#040000"
        />
      </g>
      <mask id="mask1_6_271" maskUnits="userSpaceOnUse" x="0" y="0" width="175" height="42">
        <path d="M0.0966797 0.497192H174.678V41.1777H0.0966797V0.497192Z" fill="white" />
      </mask>
      <g mask="url(#mask1_6_271)">
        <path
          d="M153.617 40.2188H20.7248C9.90179 40.2188 1.0387 31.3528 1.0387 20.5142C1.0387 9.66458 9.90179 0.798584 20.7248 0.798584H153.606C164.435 0.798584 173.303 9.67554 173.303 20.5032C173.303 31.3528 164.445 40.2188 153.617 40.2188Z"
          fill="#F4F4F4"
        />
      </g>
      <mask id="mask2_6_271" maskUnits="userSpaceOnUse" x="0" y="0" width="52" height="42">
        <path d="M0.0966797 0.497192H51.3207V41.1777H0.0966797V0.497192Z" fill="white" />
      </mask>
      <g mask="url(#mask2_6_271)">
        <path
          d="M50.4977 0.798584H20.7248C9.90179 0.798584 1.0387 9.66458 1.0387 20.4923C1.0387 31.3254 9.91261 40.2024 20.7357 40.2024H50.476V0.798584H50.4977Z"
          fill="#EDD136"
        />
      </g>
      <mask id="mask3_6_271" maskUnits="userSpaceOnUse" x="0" y="-1" width="175" height="43">
        <path d="M0.0966797 -0.00695801H174.678V41.1777H0.0966797V-0.00695801Z" fill="white" />
      </mask>
      <g mask="url(#mask3_6_271)">
        <path
          d="M153.617 -0.00695801H20.7249C9.42537 -0.00695801 0.237427 9.17138 0.237427 20.4922C0.237427 31.8186 9.42537 41.0133 20.7249 41.0133H153.606C164.906 41.0133 174.099 31.8021 174.099 20.4922C174.099 9.18781 164.917 -0.00695801 153.617 -0.00695801ZM20.7465 39.4078C10.3187 39.4078 1.85087 30.9199 1.85087 20.5032C1.85087 10.0919 10.3187 1.60952 20.7249 1.60952H49.691V39.3969H20.7465V39.4078ZM153.617 39.4078H51.2719V1.59309H153.606C164.039 1.59309 172.502 10.081 172.502 20.4922C172.513 30.9309 164.029 39.4078 153.617 39.4078Z"
          fill="#3A3A3A"
        />
      </g>
      <path
        d="M62.3636 17.0239C62.3636 14.3224 62.9321 12.1963 64.0745 10.6456C65.2115 9.10037 66.9657 8.32227 69.3372 8.32227C71.6761 8.32227 73.4141 9.10585 74.5565 10.6675C75.7097 12.2183 76.289 14.3389 76.289 17.0239C76.289 19.7418 75.7097 21.8843 74.5565 23.446C73.4141 24.9967 71.6761 25.7693 69.3372 25.7693C66.9657 25.7693 65.2115 24.9967 64.0745 23.446C62.9321 21.8843 62.3636 19.7418 62.3636 17.0239ZM71.1997 17.0239C71.1997 15.7855 71.0751 14.8485 70.8315 14.2183C70.5824 13.5772 70.0843 13.2539 69.3372 13.2539C68.5575 13.2539 68.0432 13.5772 67.7995 14.2183C67.5505 14.8485 67.4314 15.7855 67.4314 17.0239C67.4314 18.2951 67.5505 19.2541 67.7995 19.8952C68.0432 20.5253 68.5575 20.8377 69.3372 20.8377C70.0843 20.8377 70.5824 20.5253 70.8315 19.8952C71.0751 19.2541 71.1997 18.2951 71.1997 17.0239Z"
        fill="black"
      />
      <path
        d="M86.542 25.8569L84.333 22.876L82.6871 25.8569H77.0346L81.4093 18.8868L76.7964 12.6182H82.5571L84.7445 15.621L86.4121 12.6182H92.0862L87.5599 19.4348L92.2811 25.8569H86.542Z"
        fill="black"
      />
      <path d="M98.4067 21.9116H103.388V25.8569H93.274V9.2428H98.4067V21.9116Z" fill="black" />
      <path
        d="M112.816 26.0104C111.268 26.0104 109.849 25.6488 108.55 24.9145C107.261 24.1857 106.238 23.172 105.475 21.8678C104.722 20.5692 104.348 19.1061 104.348 17.4841C104.348 15.8512 104.722 14.3827 105.475 13.0785C106.238 11.7799 107.261 10.7716 108.55 10.0538C109.849 9.32502 111.268 8.95789 112.816 8.95789C114.359 8.95789 115.772 9.32502 117.061 10.0538C118.344 10.7716 119.362 11.7799 120.115 13.0785C120.862 14.3827 121.241 15.8512 121.241 17.4841C121.241 19.1061 120.862 20.5692 120.115 21.8678C119.362 23.172 118.339 24.1857 117.039 24.9145C115.751 25.6488 114.343 26.0104 112.816 26.0104ZM112.816 21.1664C113.84 21.1664 114.625 20.8377 115.177 20.1801C115.74 19.5116 116.021 18.6129 116.021 17.4841C116.021 16.3334 115.74 15.4238 115.177 14.7663C114.625 14.0978 113.84 13.758 112.816 13.758C111.777 13.758 110.975 14.0978 110.412 14.7663C109.86 15.4238 109.589 16.3334 109.589 17.4841C109.589 18.6129 109.86 19.5116 110.412 20.1801C110.975 20.8377 111.777 21.1664 112.816 21.1664Z"
        fill="black"
      />
      <path
        d="M135.802 9.2428V13.3635H131.449V25.8569H126.295V13.3635H121.985V9.2428H135.802Z"
        fill="black"
      />
      <path
        d="M149.904 9.2428V13.3635H145.551V25.8569H140.397V13.3635H136.087V9.2428H149.904Z"
        fill="black"
      />
    </svg>
  )
}
export const headerBTNLeftNot: React.FC<IconSvgProps> = ({ width, height, ...props }) => {
  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 181 49"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M160.369 47.7861H27.4872C16.6642 47.7861 7.79028 38.9092 7.79028 28.076C7.79028 17.2264 16.6642 8.37134 27.4872 8.37134H160.352C171.197 8.37134 180.066 17.2264 180.066 28.076C180.066 38.9201 171.197 47.7861 160.369 47.7861Z"
        fill="#EDD136"
      />
      <mask id="mask0_9_339" maskUnits="userSpaceOnUse" x="4" y="6" width="177" height="43">
        <path d="M4.19519 6.30554H180.975V48.5861H4.19519V6.30554Z" fill="white" />
      </mask>
      <g mask="url(#mask0_9_339)">
        <path
          d="M175.832 14.64L175.842 14.6345L168.577 6.70557L167.385 7.80149L168.863 9.41797C166.27 8.22342 163.39 7.5549 160.352 7.5549H27.4872C16.1877 7.5549 6.99976 16.7716 6.99976 28.076C6.99976 30.4487 7.40583 32.7337 8.14757 34.8543L6.37712 32.9255L5.19141 34.0214L11.5748 40.9805C15.3268 45.6162 21.0659 48.5862 27.4872 48.5862H160.369C171.668 48.5862 180.84 39.3749 180.84 28.0651C180.84 22.9361 178.956 18.2456 175.832 14.64ZM155.734 46.9916L149.188 39.8572L147.997 40.9531L153.541 46.9916H144.332L137.791 39.8681L136.6 40.9586L142.133 46.9916H133.032L126.481 39.8462L125.29 40.9421L130.845 46.9806H121.711L115.16 39.8462L113.969 40.9421L119.513 46.9806H110.195L103.649 39.8462L102.458 40.9421L108.002 46.9806H98.6843L92.1439 39.8572L90.9528 40.9531L96.4861 46.9806H87.1899L80.6441 39.8462L79.4529 40.9421L84.9971 46.9806H75.6792L69.128 39.8462L67.9369 40.9421L73.481 46.9806H64.1632L57.6228 39.8572L56.4371 40.9531L61.9704 46.9806H52.6742L46.123 39.8462L44.9318 40.9531L50.476 46.9916H41.1581L34.6177 39.8572L33.4266 40.9531L38.9708 46.9806H29.6854L23.1342 39.8462L21.9268 40.9421L27.4709 46.9806C22.2949 46.9697 17.6008 44.8819 14.1953 41.4901L14.2169 41.4736L12.6955 39.8298C10.1346 36.6023 8.59695 32.52 8.59695 28.076C8.59695 17.6428 17.0594 9.17139 27.4709 9.17139H160.352C165.615 9.17139 170.374 11.3303 173.807 14.8099L174.64 15.7195C176.633 18.0319 178.084 20.8265 178.782 23.906L173.807 18.4867L172.616 19.5771L179.199 26.7499C179.226 27.1883 179.243 27.6322 179.243 28.076C179.243 29.8295 179.004 31.5227 178.56 33.1282L172.713 26.7719L171.527 27.8623L177.97 34.8926C177.115 37.09 175.869 39.09 174.299 40.8051L168.122 34.0707L166.931 35.1611L173.162 41.9558C171.381 43.6052 169.28 44.9203 166.968 45.7916L160.542 38.7941L159.356 39.8845L165.274 46.334C163.698 46.756 162.042 46.9916 160.331 46.9916H155.734Z"
          fill="#040000"
        />
      </g>
      <mask id="mask1_9_339" maskUnits="userSpaceOnUse" x="0" y="0" width="175" height="42">
        <path d="M0.0966797 0.694458H174.678V41.375H0.0966797V0.694458Z" fill="white" />
      </mask>
      <g mask="url(#mask1_9_339)">
        <path
          d="M153.617 40.4161H20.7248C9.90179 40.4161 1.0387 31.5501 1.0387 20.7115C1.0387 9.86184 9.90179 0.99585 20.7248 0.99585H153.606C164.435 0.99585 173.303 9.8728 173.303 20.7005C173.303 31.5501 164.445 40.4161 153.617 40.4161Z"
          fill="#F4F4F4"
        />
      </g>
      <mask id="mask2_9_339" maskUnits="userSpaceOnUse" x="0" y="0" width="52" height="42">
        <path d="M0.0966797 0.694458H51.3207V41.375H0.0966797V0.694458Z" fill="white" />
      </mask>
      <g mask="url(#mask2_9_339)">
        <path
          d="M50.4977 0.99585H20.7248C9.90179 0.99585 1.0387 9.86184 1.0387 20.6895C1.0387 31.5227 9.91261 40.3997 20.7357 40.3997H50.476V0.99585H50.4977Z"
          fill="#EDD136"
        />
      </g>
      <mask id="mask3_9_339" maskUnits="userSpaceOnUse" x="0" y="0" width="175" height="42">
        <path d="M0.0966797 0.190308H174.678V41.375H0.0966797V0.190308Z" fill="white" />
      </mask>
      <g mask="url(#mask3_9_339)">
        <path
          d="M153.617 0.190308H20.7249C9.42537 0.190308 0.237427 9.36864 0.237427 20.6895C0.237427 32.0158 9.42537 41.2106 20.7249 41.2106H153.606C164.906 41.2106 174.099 31.9994 174.099 20.6895C174.099 9.38508 164.917 0.190308 153.617 0.190308ZM20.7465 39.6051C10.3187 39.6051 1.85087 31.1172 1.85087 20.7005C1.85087 10.2892 10.3187 1.80679 20.7249 1.80679H49.691V39.5941H20.7465V39.6051ZM153.617 39.6051H51.2719V1.79035H153.606C164.039 1.79035 172.502 10.2783 172.502 20.6895C172.513 31.1281 164.029 39.6051 153.617 39.6051Z"
          fill="#3A3A3A"
        />
      </g>
      <path
        d="M62.3636 17.2211C62.3636 14.5197 62.9321 12.3936 64.0745 10.8429C65.2115 9.29764 66.9657 8.51953 69.3372 8.51953C71.6761 8.51953 73.4141 9.30311 74.5565 10.8648C75.7097 12.4155 76.289 14.5361 76.289 17.2211C76.289 19.939 75.7097 22.0815 74.5565 23.6432C73.4141 25.194 71.6761 25.9666 69.3372 25.9666C66.9657 25.9666 65.2115 25.194 64.0745 23.6432C62.9321 22.0815 62.3636 19.939 62.3636 17.2211ZM71.1997 17.2211C71.1997 15.9827 71.0751 15.0457 70.8315 14.4156C70.5824 13.7745 70.0843 13.4512 69.3372 13.4512C68.5575 13.4512 68.0432 13.7745 67.7995 14.4156C67.5505 15.0457 67.4314 15.9827 67.4314 17.2211C67.4314 18.4924 67.5505 19.4513 67.7995 20.0924C68.0432 20.7226 68.5575 21.0349 69.3372 21.0349C70.0843 21.0349 70.5824 20.7226 70.8315 20.0924C71.0751 19.4513 71.1997 18.4924 71.1997 17.2211Z"
        fill="black"
      />
      <path
        d="M86.542 26.0541L84.333 23.0732L82.6871 26.0541H77.0346L81.4093 19.0841L76.7964 12.8154H82.5571L84.7445 15.8183L86.4121 12.8154H92.0862L87.5599 19.6321L92.2811 26.0541H86.542Z"
        fill="black"
      />
      <path d="M98.4067 22.1089H103.388V26.0542H93.274V9.44006H98.4067V22.1089Z" fill="black" />
      <path
        d="M112.816 26.2077C111.268 26.2077 109.849 25.846 108.55 25.1118C107.261 24.383 106.238 23.3692 105.475 22.0651C104.722 20.7664 104.348 19.3034 104.348 17.6814C104.348 16.0485 104.722 14.58 105.475 13.2758C106.238 11.9771 107.261 10.9689 108.55 10.2511C109.849 9.52228 111.268 9.15515 112.816 9.15515C114.359 9.15515 115.772 9.52228 117.061 10.2511C118.344 10.9689 119.362 11.9771 120.115 13.2758C120.862 14.58 121.241 16.0485 121.241 17.6814C121.241 19.3034 120.862 20.7664 120.115 22.0651C119.362 23.3692 118.339 24.383 117.039 25.1118C115.751 25.846 114.343 26.2077 112.816 26.2077ZM112.816 21.3637C113.84 21.3637 114.625 21.0349 115.177 20.3774C115.74 19.7089 116.021 18.8102 116.021 17.6814C116.021 16.5307 115.74 15.6211 115.177 14.9635C114.625 14.295 113.84 13.9553 112.816 13.9553C111.777 13.9553 110.975 14.295 110.412 14.9635C109.86 15.6211 109.589 16.5307 109.589 17.6814C109.589 18.8102 109.86 19.7089 110.412 20.3774C110.975 21.0349 111.777 21.3637 112.816 21.3637Z"
        fill="black"
      />
      <path
        d="M135.802 9.44006V13.5607H131.449V26.0542H126.295V13.5607H121.985V9.44006H135.802Z"
        fill="black"
      />
      <path
        d="M149.904 9.44006V13.5607H145.551V26.0542H140.397V13.5607H136.087V9.44006H149.904Z"
        fill="black"
      />
    </svg>
  )
}
export const RectMain: React.FC<IconSvgProps> = ({ width, height, ...props }) => {
  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 991 645"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M956.266 50.401C942.375 20.849 912.203 0.21875 877.469 0.21875H87.1302C39.099 0.21875 0 39.2969 0 87.2969V513.37C0 539.156 11.3125 562.365 29.375 578.432C39.2969 616.12 73.2396 644.089 113.531 644.089H903.87C951.901 644.089 991 604.219 991 555.422V121.021C990.802 92.2552 977.307 66.6667 956.266 50.401Z"
        fill="black"
      />
      <path
        d="M952.099 52.5834C939 24.6147 910.417 4.97925 877.469 4.97925H87.1302C41.6823 4.97925 4.76562 41.8751 4.76562 87.297V513.37C4.76562 540.745 18.0625 564.943 38.7031 579.823C52.1979 589.74 69.0677 595.49 87.1302 595.49H877.469C922.922 595.49 959.839 558.599 959.839 513.172V87.297C959.641 74.8022 956.859 63.099 952.099 52.5834ZM661.328 503.057C661.328 523.49 644.656 539.953 624.411 539.953H340.193C319.75 539.953 303.276 523.292 303.276 503.057V455.25C303.276 434.823 319.948 418.359 340.193 418.359H624.214C644.656 418.359 661.13 435.021 661.13 455.25V503.057H661.328Z"
        fill="#F7F5D0"
      />
      <path
        d="M986.036 119.037V545.109C986.036 590.531 949.12 627.427 903.672 627.427H113.328C83.9583 627.427 58.1562 611.958 43.4688 588.75C56.1667 596.287 71.2552 600.453 86.9323 600.453H877.271C925.302 600.453 964.401 561.375 964.401 513.37V87.297C964.401 77.3803 962.818 67.8595 959.641 58.9324C975.917 73.8074 986.036 95.2345 986.036 119.037Z"
        fill="#FDC600"
      />
      <path
        d="M444.886 463.842C441.149 463.842 438.429 467.698 436.447 470.581C432.032 477.003 427.185 483.535 421.081 488.53C409.058 498.366 392.164 501.365 378.759 492.119C373.516 488.504 365.425 476.28 368.808 469.762C371.897 463.81 381.836 463.577 387.324 463.212C401.907 462.244 416.065 463.632 430.023 467.936C440.588 471.193 457.345 476.255 463.213 486.955C471.963 502.911 414.78 496.503 410.374 495.961C394.407 493.997 378.563 491.395 362.51 490.167C359.571 489.942 356.692 490.881 356.213 487.522C353.634 469.474 356.823 451.087 377.499 447.279C378.448 447.104 388.828 445.413 385.75 449.357C378.204 459.025 364.859 466.696 354.701 473.037C342.961 480.367 330.052 487.508 315.906 488.215C307.006 488.66 293.589 486.849 287.944 478.831C284.857 474.447 286.24 466.923 287.188 462.205C290.943 443.513 300.817 426.732 311.561 411.255C313.908 407.875 321.148 398.004 319.433 401.745C314.054 413.482 308.084 424.836 303.689 437.013C302.436 440.484 298.656 447.765 299.154 451.75C299.155 451.758 306.835 439.16 306.837 439.155C310.78 430.648 314.649 421.639 317.166 412.578C318.092 409.245 306.394 425.246 305.452 426.622C299.163 435.801 285.357 466.222 289.203 455.781C291.18 450.417 292.218 444.582 293.486 439.029C294.41 434.981 294.522 425.749 297.517 422.402C297.739 422.154 297.415 445.492 303.311 434.683C303.581 434.187 306.992 427.486 307.53 427.755C309.882 428.931 305.998 450.291 305.704 452.632C305.601 453.448 304.931 458.462 304.57 460.063C304.432 460.678 304.508 458.801 304.57 458.174C305.194 451.94 306.6 445.882 307.656 439.721C309.466 429.166 308.654 441.653 307.656 445.767C306.632 449.991 305.36 454.162 304.507 458.426C303.33 464.313 307.686 446.846 309.231 441.044C310.98 434.473 310.606 422.273 311.372 436.258C311.76 443.335 311.763 450.485 312.254 457.544C312.747 464.632 321.995 441.691 322.708 439.784C323.26 438.308 328.916 415.039 326.109 417.994C321.587 422.754 318.951 430.196 316.788 436.195C311.768 450.114 307.637 464.877 305.074 479.461C304.783 481.119 305.02 486.127 305.452 484.499C310.14 466.812 313.655 448.651 317.544 430.778C317.766 429.759 321.079 414.424 321.826 410.499C322.45 407.223 321.202 411.55 321.134 411.759C318.752 419.051 316.177 426.106 313.387 433.235"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
      />
      <path
        d="M416.546 382.222C407.035 390.302 397.973 399.467 387.954 406.91C383.02 410.574 378.151 413.323 374.854 418.75C374.099 419.992 367.823 428.513 369.312 429.582C374.483 433.294 382.922 430.329 388.332 434.116C394.777 438.628 374.955 443.019 367.297 444.823C351.699 448.497 335.818 450.529 320 452.947C311.484 454.248 302.185 455.163 294.116 458.552C288.385 460.959 298.091 456.768 299.28 456.159C301.712 454.913 304.036 453.356 306.586 452.506"
        stroke="black"
        stroke-width="50"
        stroke-linecap="round"
      />
      <path
        d="M460.89 393.289C452.592 394.043 440.43 400.825 432.298 397.572C424.858 394.596 417.754 378.299 408.744 381.071C406.482 381.767 404.324 383.724 402.509 385.039C388.854 394.933 376.089 405.635 363.651 417.032C347.97 431.401 300.797 474.04 314.654 457.905C320.722 450.839 328.993 445.065 336.444 439.704C357.665 424.438 380.099 410.843 402.257 397.005C404.817 395.406 422.133 384.632 426.756 381.701C428.502 380.594 433.366 376.827 431.983 378.363C426.094 384.906 418.729 391.091 412.019 396.69C386.058 418.35 356.049 441.036 323.597 451.985C321.729 452.615 293.721 458.367 295.068 455.386C297.989 448.916 306.061 441.767 310.623 437.122C323.43 424.084 337.025 412 351.181 400.469C357.734 395.131 352.768 396.211 347.781 398.705C331.961 406.615 317.902 419.003 304.829 430.698C297.044 437.663 289.75 445.091 282.787 452.867C281.946 453.805 279.516 456.65 280.52 455.89C284.314 453.015 287.845 449.805 291.604 446.884C315.861 428.036 342.275 412.671 369.571 398.705C370.683 398.137 371.811 397.6 372.909 397.005C375.18 395.775 368.292 399.324 366.044 400.595C337.747 416.589 310.491 434.505 281.338 448.962C259.167 459.957 234.966 469.302 209.984 470.69C204.053 471.019 188.165 469.424 192.853 465.777C199.543 460.574 218.224 460.088 224.972 459.291C293.091 451.24 361.457 445.598 429.527 436.996C468.257 432.102 506.653 426.211 544.966 418.795C557.111 416.445 592.852 407.346 581.494 412.246C537.745 431.118 496.496 454.784 453.459 475.161C421.209 490.431 388.017 504.06 352.945 511.311C343.323 513.3 330.463 514.876 320.322 515.467C317.048 515.658 312.316 517.692 310.497 514.964C304.481 505.94 433.014 448.894 439.036 446.38C497.541 421.962 557.809 398.636 619.596 383.842C677.709 369.928 503.99 414.15 446.342 429.88C396.868 443.379 347.552 457.464 297.902 470.312C293.572 471.432 276.477 475.835 269.435 477.365C268.69 477.528 266.445 477.925 267.168 477.68C269.121 477.018 271.139 476.558 273.151 476.106C297.689 470.597 323.011 468.045 347.907 464.959C421.052 455.891 494.267 447.466 567.198 436.744C589.651 433.443 612.345 430.197 634.585 425.534C635.754 425.289 639.167 424.219 637.986 424.4C633.117 425.149 625.653 427.043 621.611 428.053C559.859 443.491 497.818 461.38 439.351 486.749C430.039 490.79 417.811 496.671 408.618 501.864C406.102 503.285 398.763 507.61 401.564 506.902C410.833 504.561 419.225 499.576 428.015 495.818C456.459 483.657 470.807 477.501 500.189 465.337C528.727 453.521 557.458 442.211 586.091 430.635C596.947 426.247 600.247 424.879 609.834 420.685C612.216 419.643 614.491 417.516 617.077 417.788C620.902 418.19 613.02 424.508 610.023 426.92C587.577 444.98 558.478 454.367 531.3 462.44C486.867 475.638 441.209 482.884 395.014 485.553C387.236 486.002 364.626 484.974 371.775 488.072C385.808 494.153 410.135 491.946 424.237 491.913C504.375 491.731 585.072 479.561 661.792 456.394C669.762 453.987 682.856 450.989 690.447 446.317C696.865 442.367 676.366 451.731 669.16 453.937C640.077 462.84 608.889 465.65 578.66 467.604C576.754 467.727 555.361 471.488 562.915 463.384C572.029 453.608 589.467 449.493 601.332 446.065C631.873 437.242 663.237 431.339 694.288 424.652C700.773 423.256 707.354 421.98 713.749 420.181C716.237 419.481 705.77 423.483 705.562 423.582C701.08 425.707 696.488 428.035 693.155 431.832C690.192 435.208 688.868 439.712 685.975 443.168C674.05 457.416 652.314 462.925 634.963 466.47C626.065 468.288 624.13 469.618 624.13 460.55C624.13 453.689 624.513 445.823 633.829 448.206C642.386 450.395 642.401 462.687 642.205 469.556C641.811 483.358 639.396 495.928 649.952 506.776C650.951 507.804 653.644 510.282 652.219 510.429C641.749 511.507 629.161 507.087 618.966 505.517C585.77 500.404 554.265 502.685 521.916 511.248C500.831 516.829 479.54 522.039 457.615 522.521C455.48 522.568 452.07 522.154 456.985 523.781C471.014 528.422 485.537 530.776 500.315 531.212C527.998 532.029 556.061 528.946 582.124 519.372C592.203 515.669 568.762 516.96 566.946 516.853C526.094 514.435 485.215 510.303 444.264 510.303C428.964 510.303 413.515 510.459 398.667 514.523C393.839 515.844 389.206 517.537 384.182 517.924C383.38 517.985 381.333 517.575 381.789 518.238C385.225 523.236 402.289 526.119 406.854 527.181C445.492 536.175 486.764 534.05 526.136 533.29C541.377 532.996 556.613 532.763 571.858 532.724C579.435 532.704 588.336 531.628 595.916 532.975C616.213 536.584 554.648 533.737 534.071 532.472C473.74 528.762 413.607 525.277 353.134 526.552C336.315 526.906 319.505 527.545 302.688 527.937C296.554 528.08 284.6 526.046 278.504 528.441C275.773 529.514 284 530.588 286.88 531.149C304.858 534.653 323.329 535.678 341.609 535.809C389.472 536.155 437.209 531.332 485.137 531.653C520.025 531.886 554.314 534.66 588.988 538.14C596.212 538.865 604.652 541.206 611.975 540.596C624.286 539.57 636.692 537.258 649.07 537.258"
        stroke="#F7F5D0"
        stroke-width="50"
        stroke-linecap="round"
      />
    </svg>
  )
}
export const ArrowBack: React.FC<IconSvgProps> = ({ width, height, ...props }) => {
  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 84 235"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="mask0_107_282" maskUnits="userSpaceOnUse" x="0" y="0" width="84" height="235">
        <path d="M0 0.199646H84V235H0V0.199646Z" fill="white" />
      </mask>
      <g mask="url(#mask0_107_282)">
        <mask
          id="mask1_107_282"
          maskUnits="userSpaceOnUse"
          x="-28"
          y="-2"
          width="139"
          height="262"
        >
          <path
            d="M110.091 51.5279L40.5142 259.44L-27.049 206.461L42.5278 -1.45068L110.091 51.5279Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask1_107_282)">
          <mask
            id="mask2_107_282"
            maskUnits="userSpaceOnUse"
            x="-28"
            y="-2"
            width="139"
            height="262"
          >
            <path
              d="M110.091 51.5279L40.5142 259.44L-27.049 206.461L42.5278 -1.45068L110.091 51.5279Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask2_107_282)">
            <path
              d="M19.2269 224.215C21.8763 225.628 22.8179 228.642 21.8661 231.983C21.0224 234.941 18.9089 234.797 17.0441 234.108C13.0536 232.632 8.98775 231.543 5.04617 229.831C-0.165107 227.559 -0.968096 221.882 2.68 215.059C5.08897 210.554 7.88109 206.729 10.6752 202.883C11.9694 201.101 13.2615 199.57 14.6983 201.594C16.286 203.828 16.0985 206.505 14.6474 209.188C13.9463 210.485 13.3818 211.964 12.2894 214.401C18.3444 213.271 23.142 209.341 27.803 205.709C33.1324 201.557 38.3947 196.971 43.3267 191.418C55.9504 177.198 66.3566 160.215 72.1039 137.007C77.8308 113.89 78.0102 91.1822 72.7276 68.7361C67.019 44.468 56.7167 26.0306 44.4395 10.0391C43.8118 9.22175 42.9049 8.62589 42.6093 7.55583C42.1426 5.86808 40.5896 4.57341 42.002 1.878C43.341 -0.67703 44.6127 0.202722 45.6623 1.38508C49.8444 6.0927 54.2221 10.5133 57.9599 16.0133C67.6263 30.2422 75.2894 46.9419 79.6712 67.1201C84.9497 91.4474 85.0536 116.449 78.5421 141.063C72.9354 162.252 64.4083 180.409 52.61 194.899C42.3607 207.487 31.1882 216.556 19.2269 224.215Z"
              fill="#EDD137"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
