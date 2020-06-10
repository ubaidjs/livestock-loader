import * as React from 'react'
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg'

export function add() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Defs>
        <ClipPath id="prefix__a">
          <Path
            data-name="Rectangle 408"
            transform="translate(.435)"
            fill="#fff"
            stroke="#707070"
            d="M0 0h24v24H0z"
          />
        </ClipPath>
      </Defs>
      {/* <G transform="translate(-.435)" clipPath="url(#prefix__a)"> */}
        <Path
          d="M18.194 11.713v.581a.582.582 0 01-.581.581h-4.742v4.738a.582.582 0 01-.581.581h-.577a.582.582 0 01-.584-.581v-4.742H6.387a.582.582 0 01-.581-.581v-.577a.582.582 0 01.581-.581h4.742V6.387a.582.582 0 01.581-.581h.581a.582.582 0 01.581.581v4.742h4.741a.582.582 0 01.581.584zm5.806.29a12 12 0 11-12-12A12 12 0 0124 12zm-1.548 0A10.452 10.452 0 1012 22.452 10.451 10.451 0 0022.452 12z"
          fill="#423f33"
        />
      {/* </G> */}
    </Svg>
  )
}

export function addActive() {
  return (
    <Svg width={48} height={32} viewBox="0 7 48 32">
      <Defs>
        {/* <ClipPath id="prefix__a">
          <Path
            data-name="Rectangle 409"
            transform="translate(.435)"
            fill="#fff"
            stroke="#707070"
            d="M0 0h24v24H0z"
          />
        </ClipPath> */}
      </Defs>
      <G fill="rgba(255,255,255,0)" stroke="rgba(0,0,0,0)">
        <Path stroke="none" d="M0 0h48v32H0z" />
        <Path fill="none" d="M.5.5h47v31H.5z" />
      </G>
      <G transform="translate(11.565 8)" clipPath="url(#prefix__a)">
        <Path
          data-name="Path 394"
          d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm6.968 13.355a.581.581 0 01-.581.581h-4.451v4.452a.581.581 0 01-.581.581h-2.71a.581.581 0 01-.581-.581v-4.452H5.613a.581.581 0 01-.581-.581v-2.71a.581.581 0 01.581-.58h4.452V5.613a.581.581 0 01.581-.581h2.71a.581.581 0 01.58.581v4.452h4.452a.581.581 0 01.581.581z"
          fill="#423f33"
        />
        <Path
          data-name="Path 395"
          d="M18.968 13.355a.581.581 0 01-.581.581h-4.451v4.452a.581.581 0 01-.581.581h-2.71a.581.581 0 01-.581-.581v-4.452H5.613a.581.581 0 01-.581-.581v-2.71a.581.581 0 01.581-.58h4.452V5.613a.581.581 0 01.581-.581h2.71a.581.581 0 01.58.581v4.452h4.452a.581.581 0 01.581.581z"
          fill="#eac547"
        />
      </G>
    </Svg>
  )
}

export function alert() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Defs>
        <ClipPath id="prefix__a">
          <Path
            data-name="Rectangle 410"
            transform="translate(-.217)"
            fill="#fff"
            stroke="#707070"
            d="M0 0h24v24H0z"
          />
        </ClipPath>
      </Defs>
      <G transform="translate(.217)" clipPath="url(#prefix__a)">
        <Path
          d="M12 22.5a1.5 1.5 0 01-1.5-1.5H9a3 3 0 106 0h-1.5a1.5 1.5 0 01-1.5 1.5zm9.815-6.806C20.5 14.446 19.5 13.14 19.5 8.714a7.314 7.314 0 00-6.75-7.141V.75a.75.75 0 00-1.5 0v.823A7.313 7.313 0 004.5 8.714c0 4.426-1 5.732-2.313 6.98a2.182 2.182 0 00-.527 2.4A2.237 2.237 0 003.75 19.5h16.5a2.237 2.237 0 002.093-1.4 2.181 2.181 0 00-.528-2.406zM20.25 18H3.75a.712.712 0 01-.531-1.219C4.853 15.225 6 13.484 6 8.715A5.86 5.86 0 0112 3a5.86 5.86 0 016 5.714c0 4.751 1.135 6.5 2.779 8.066A.712.712 0 0120.25 18z"
          fill="#423f33"
        />
      </G>
    </Svg>
  )
}

export function alertActive() {
  return (
    <Svg width={48} height={32} viewBox="0 7 48 32">
      <Defs>
        <ClipPath id="prefix__a">
          <Path
            data-name="Rectangle 198"
            transform="translate(0 .5)"
            fill="#423f33"
            stroke="#707070"
            d="M0 0h24v24H0z"
          />
        </ClipPath>
      </Defs>
      <G fill="rgba(255,255,255,0)" stroke="rgba(0,0,0,0)">
        <Path stroke="none" d="M0 0h48v32H0z" />
        <Path fill="none" d="M.5.5h47v31H.5z" />
      </G>
      <G data-name="notification-icon \u2013 1">
        <G
          data-name="Mask Group 12"
          transform="translate(12 7.5)"
          clipPath="url(#prefix__a)"
        >
          <Path
            d="M12 23.9a3 3 0 003-3H9a3 3 0 003 3zm10.1-7.018c-.906-.973-2.6-2.437-2.6-7.232a7.4 7.4 0 00-6-7.273V1.4a1.5 1.5 0 10-3 0v.977a7.4 7.4 0 00-6 7.273c0 4.8-1.695 6.259-2.6 7.232a1.465 1.465 0 00-.4 1.018A1.5 1.5 0 003 19.4h18a1.5 1.5 0 001.5-1.5 1.464 1.464 0 00-.4-1.018z"
            fill="#423f33"
          />
        </G>
      </G>
    </Svg>
  )
}

export function calculator() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Defs>
        <ClipPath id="prefix__a">
          <Path
            data-name="Rectangle 406"
            transform="translate(.217)"
            fill="#fff"
            stroke="#707070"
            d="M0 0h24v24H0z"
          />
        </ClipPath>
      </Defs>
      <G
        data-name="Mask Group 97"
        transform="translate(-.217)"
        clipPath="url(#prefix__a)"
      >
        <Path
          d="M5.25 21h13.5a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75H5.25a.75.75 0 00-.75.75v9a.75.75 0 00.75.75zM15 16.5V12h3v7.5h-3zM10.5 12h3v3h-3zm0 4.5h3v3h-3zM6 12h3v3H6zm0 4.5h3v3H6zM20.25 0H3.75A2.307 2.307 0 001.5 2.25v19.5A2.307 2.307 0 003.75 24h16.5a2.307 2.307 0 002.25-2.25V2.25A2.307 2.307 0 0020.25 0zM21 21.75a.812.812 0 01-.75.75H3.75a.812.812 0 01-.75-.75V9h18zM21 7.5H3V2.25a.812.812 0 01.75-.75h16.5a.812.812 0 01.75.75z"
          fill="#423f33"
        />
      </G>
    </Svg>
  )
}

export function calculatorActive() {
  return (
    <Svg width={48} height={32} viewBox="0 7 48 32">
      <Defs>
        <ClipPath id="prefix__a">
          <Path
            data-name="Rectangle 407"
            transform="translate(.217)"
            fill="#fff"
            stroke="#707070"
            d="M0 0h24v24H0z"
          />
        </ClipPath>
      </Defs>
      <G fill="rgba(255,255,255,0)" stroke="rgba(0,0,0,0)">
        <Path stroke="none" d="M0 0h48v32H0z" />
        <Path fill="none" d="M.5.5h47v31H.5z" />
      </G>
      <G
        data-name="active-calc-icon"
        transform="translate(11.783 8)"
        clipPath="url(#prefix__a)"
      >
        <Path
          data-name="Path 392"
          d="M6.9 18H5.1a.645.645 0 00-.6.6v1.8a.645.645 0 00.6.6h1.8a.645.645 0 00.6-.6v-1.8a.645.645 0 00-.6-.6zm0-6H5.1a.645.645 0 00-.6.6v1.8a.645.645 0 00.6.6h1.8a.645.645 0 00.6-.6v-1.8a.645.645 0 00-.6-.6zm6 6h-1.8a.645.645 0 00-.6.6v1.8a.645.645 0 00.6.6h1.8a.645.645 0 00.6-.6v-1.8a.645.645 0 00-.6-.6zm0-6h-1.8a.645.645 0 00-.6.6v1.8a.645.645 0 00.6.6h1.8a.645.645 0 00.6-.6v-1.8a.645.645 0 00-.6-.6zm6 0h-1.8a.645.645 0 00-.6.6v7.8a.645.645 0 00.6.6h1.8a.645.645 0 00.6-.6v-7.8a.645.645 0 00-.6-.6z"
          fill="#eac547"
        />
        <Path
          data-name="Path 393"
          d="M20.25 0H3.75A2.307 2.307 0 001.5 2.25v19.5A2.307 2.307 0 003.75 24h16.5a2.307 2.307 0 002.25-2.25V2.25A2.307 2.307 0 0020.25 0zM7.5 20.4a.645.645 0 01-.6.6H5.1a.645.645 0 01-.6-.6v-1.8a.645.645 0 01.6-.6h1.8a.645.645 0 01.6.6zm0-6a.645.645 0 01-.6.6H5.1a.645.645 0 01-.6-.6v-1.8a.645.645 0 01.6-.6h1.8a.645.645 0 01.6.6zm6 6a.645.645 0 01-.6.6h-1.8a.645.645 0 01-.6-.6v-1.8a.645.645 0 01.6-.6h1.8a.645.645 0 01.6.6zm0-6a.645.645 0 01-.6.6h-1.8a.645.645 0 01-.6-.6v-1.8a.645.645 0 01.6-.6h1.8a.645.645 0 01.6.6zm6 6a.645.645 0 01-.6.6h-1.8a.645.645 0 01-.6-.6v-7.8a.645.645 0 01.6-.6h1.8a.645.645 0 01.6.6zm0-12a.645.645 0 01-.6.6H5.1a.645.645 0 01-.6-.6V3.6a.645.645 0 01.6-.6h13.8a.645.645 0 01.6.6z"
          fill="#423f33"
        />
      </G>
    </Svg>
  )
}

export function boards() {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28">
      <Defs>
        <ClipPath id="prefix__a">
          <Path
            data-name="Rectangle 403"
            transform="translate(-2)"
            fill="#fff"
            stroke="#707070"
            d="M0 0h28v28H0z"
          />
        </ClipPath>
      </Defs>
      <G
        data-name="Mask Group 96"
        transform="translate(2)"
        clipPath="url(#prefix__a)"
      >
        <Path
          d="M6.446 9.222l.667-1.333h-5.78v-1.8a3.47 3.47 0 012.985-3.516A3.337 3.337 0 018 5.888v.273a2.659 2.659 0 011.2-1.123 4.751 4.751 0 00-4.282-3.809A4.666 4.666 0 000 5.888v16a.667.667 0 00.667.667h4.666v-1.333h-4v-12zM17 10.554h-3.333a.333.333 0 00-.333.333v3.335a.333.333 0 00.333.333H17a.333.333 0 00.333-.333v-3.335a.333.333 0 00-.333-.333zm-1 2.668h-1.333v-1.335H16zm7.859-1.741l-2.312-4.626a1.335 1.335 0 00-.651-.622l-5.021-2.23a1.334 1.334 0 00-1.083 0L9.77 6.235a1.609 1.609 0 00-.651.622l-2.312 4.624a1.336 1.336 0 00-.141.6v9.809a.667.667 0 00.667.667h5.333a.667.667 0 00.667-.667v-3.337h4v3.333a.667.667 0 00.667.666h5.333a.667.667 0 00.667-.667v-9.809a1.336 1.336 0 00-.141-.6zm-1.192 9.741h-4v-3.336a.667.667 0 00-.667-.664h-5.333a.667.667 0 00-.667.667v3.333H8v-9.146l2.312-4.624 5.021-2.23 5.021 2.231 2.312 4.624z"
          fill="#423f33"
        />
      </G>
    </Svg>
  )
}

export function boardsActive() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Defs>
        <ClipPath id="prefix__a">
          <Path data-name="Rectangle 201" fill="#423f33" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
      <G data-name="Mask Group 15" clipPath="url(#prefix__a)">
        <Path
          d="M9.229 4.534l.015-.007A4.664 4.664 0 000 5.401v16.666h5.333V11.59a2.681 2.681 0 01.282-1.193l2.312-4.625a2.672 2.672 0 011.302-1.238zm14.63 6.464l-2.312-4.63a1.333 1.333 0 00-.651-.622l-5.021-2.23a1.333 1.333 0 00-1.083 0L9.77 5.747a1.333 1.333 0 00-.651.622l-2.312 4.626a1.337 1.337 0 00-.141.6v10.472H12v-4h6.667v4H24V11.59a1.337 1.337 0 00-.141-.6zm-6.526 3.074h-4v-4h4z"
          fill="#423f33"
        />
      </G>
    </Svg>
  )
}

export function more() {
  return (
    <Svg width={48} height={32} viewBox="0 8 48 32">
      <Defs>
        <ClipPath id="prefix__a">
          <Path
            data-name="Rectangle 412"
            fill="#fff"
            stroke="#707070"
            d="M0 0h24v24H0z"
          />
        </ClipPath>
      </Defs>
      <G fill="rgba(255,255,255,0)" stroke="rgba(0,0,0,0)">
        <Path stroke="none" d="M0 0h48v32H0z" />
        <Path fill="none" d="M.5.5h47v31H.5z" />
      </G>
      <G transform="translate(12 8)" clipPath="url(#prefix__a)">
        <Path d="M23.679 4.393H.321A.321.321 0 010 4.072V2.786a.321.321 0 01.321-.321h23.358a.321.321 0 01.321.321v1.286a.321.321 0 01-.321.321zm0 8.571H.321A.321.321 0 010 12.643v-1.286a.321.321 0 01.321-.321h23.358a.321.321 0 01.321.321v1.286a.321.321 0 01-.321.321zm0 8.571H.321a.321.321 0 01-.321-.32v-1.286a.321.321 0 01.321-.321h23.358a.321.321 0 01.321.321v1.286a.321.321 0 01-.321.321z" />
      </G>
    </Svg>
  )
}

export function moreActive() {
  return (
    <Svg width={48} height={32} viewBox="0 8 48 32">
      <Defs>
        <ClipPath id="prefix__a">
          <Path
            data-name="Rectangle 414"
            transform="translate(364 11)"
            fill="#fff"
            stroke="#707070"
            d="M0 0h24v24H0z"
          />
        </ClipPath>
      </Defs>
      <G fill="rgba(255,255,255,0)" stroke="rgba(0,0,0,0)">
        <Path stroke="none" d="M0 0h48v32H0z" />
        <Path fill="none" d="M.5.5h47v31H.5z" />
      </G>
      <G transform="translate(-352 -3)" clipPath="url(#prefix__a)">
        <G fill="#eac547">
          <Path
            data-name="Path 400"
            d="M364.857 24.715h22.286a.857.857 0 00.857-.858v-1.714a.857.857 0 00-.857-.857h-22.286a.857.857 0 00-.857.857v1.714a.857.857 0 00.857.857z"
          />
          <Path
            data-name="Path 401"
            d="M387.143 29.857h-22.286a.857.857 0 00-.857.858v1.714a.857.857 0 00.857.857h22.286a.857.857 0 00.857-.857v-1.714a.857.857 0 00-.857-.858zm0-17.143h-22.286a.857.857 0 00-.857.858v1.714a.857.857 0 00.857.857h22.286a.857.857 0 00.857-.857v-1.714a.857.857 0 00-.857-.857z"
          />
        </G>
      </G>
    </Svg>
  )
}
