<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import store from "./store";
export default {
  name: "App",
  store,
  created() {
    console.log("when are you called");
    // if there is obj in localstorage, update vuex
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      store.commit("logUserIn", user);
    } else {
      this.$router.push({ path: `/` });
    }
    // else redirect them to the homepage so they can log in
  }
};
</script>

<style>
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
nav,
section,
summary {
  display: block;
}
audio,
canvas,
video {
  display: inline-block;
}
audio:not([controls]) {
  display: none;
  height: 0;
}
[hidden] {
  display: none;
}
html {
  font-family: sans-serif;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}
a:focus {
  outline: thin dotted;
}
a:active,
a:hover {
  outline: 0;
}
h1 {
  font-size: 2em;
}
abbr[title] {
  border-bottom: 1px dotted;
}
b,
strong {
  font-weight: 700;
}
dfn {
  font-style: italic;
}
mark {
  background: #ff0;
  color: #000;
}
code,
kbd,
pre,
samp {
  font-family: monospace, serif;
  font-size: 1em;
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
q {
  quotes: \201c \201d \2018 \2019;
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sup {
  top: -0.5em;
}
sub {
  bottom: -0.25em;
}
img {
  border: 0;
}
svg:not(:root) {
  overflow: hidden;
}
fieldset {
  border: 1px solid silver;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em;
}
button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  margin: 0;
}
button,
input {
  line-height: normal;
}
button,html input[type=button],/* 1 */input[type=reset],input[type=submit] {
  -webkit-appearance: button;
  cursor: pointer;
}
button[disabled],
input[disabled] {
  cursor: default;
}
input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
input[type="search"] {
  -webkit-appearance: textfield;
  -moz-box-sizing: content-box;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
textarea {
  overflow: auto;
  vertical-align: top;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
body,
figure {
  margin: 0;
}
legend,
button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: "";
  clear: both;
  height: 0;
}

* {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.visuallyhidden:not(:focus):not(:active) {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(00 0 0);
  overflow: hidden;
}

html {
  font-size: 62.5%;
}

body {
  background-image: linear-gradient(to top right, #fae0d9 0%, #ffe7ff 100%);
  font-size: 1.6rem;
  font-family: "Open Sans", sans-serif;
  position: relative;
  min-height: 100vh;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 30px 0;
}

.wrapper {
  max-width: 1280px;
  margin: 0 auto;
  width: 80%;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Playfair Display", serif;
}

.btn,
.firebaseui-idp-list button {
  background: #ffffff;
  border: none;
  padding: 5px 20px;
  border-left: 2px solid #fae0d9;
  border-bottom: 2px solid #fae0d9;
  border-right: 2px solid #ffe7ff;
  border-top: 2px solid #ffe7ff;
}

.firebaseui-idp-list {
  padding: 0;
  list-style: none;
}

.firebaseui-idp-list img {
  width: 25px;
  margin-right: 10px;
}

.firebaseui-idp-list button {
  display: flex;
  align-items: center;
  padding: 8px 15px;
}

.firebaseui-idp-text-short {
  display: none;
}
</style>
