<template>
  <h1 class="text-center text-primary fs-xxl fw-bold">Welcome to the InstaShare community!</h1>
  <p class="text-center fs-3 mt-3">A place to share your files freely, quickly, securely.</p>

  <div class="row flex-column-reverse flex-lg-row">
    <div class="col-lg-5 d-flex flex-column justify-content-center align-items-start">
      <h2 class="fs-xl fw-bold">Download files published by the community</h2>
      <p class="fs-4 mt-3">No registration needed, just feel free to browse through our file repo and download anything you like.</p>
      <router-link :to="{name: 'fileList'}" class="btn btn-lg rounded-pill btn-primary mt-3">Check it out! &rightarrow;</router-link>
    </div>

    <div class="col-lg-7 d-flex flex-column justify-content-center">
      <img :src="require('@/assets/images/illustration-download.svg')" alt="Download illustration">
    </div>
  </div>

  <div class="row">
    <div class="col-lg-7 d-flex flex-column justify-content-center">
      <img :src="require('@/assets/images/illustration-upload.svg')" alt="Upload illustration">
    </div>

    <div class="col-lg-5 d-flex flex-column justify-content-center align-items-end text-end">
      <h2 class="fs-xl fw-bold">Share your files with the community</h2>
      <p class="fs-4 mt-3">Sign up, upload your file(s) and that's it! You're good to go! Now everyone will be able to get your file(s) in just 1 click.</p>
      <div class="d-flex align-items-center gap-3 mt-3">
        <router-link :to="{name: 'register'}" class="btn btn-lg rounded-pill btn-primary">Sign up</router-link>
        <span class="fs-4">or</span>
        <router-link :to="{name: 'login'}" class="btn btn-lg rounded-pill btn-secondary">Login</router-link>
      </div>
    </div>
  </div>
</template>
