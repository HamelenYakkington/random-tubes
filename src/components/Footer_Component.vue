<template>
  <div class="footer row d-flex justify-content-end align-items-center">
    <div class="col-12 col-md-10 div_copyright">
      <span class="copyright-span">{{ copyrightText }}</span>
    </div>
    <div class="div_logo col-12 col-md-1">
      <div class="logoFooter logo_linkedin">
        <a
          href="https://www.linkedin.com/in/steven-lef%C3%A8bvre-9697b127b/"
          target="”_blank”"
        >
          <img src="../assets/linkedin.webp" alt="logo_linkedin" />
        </a>
      </div>
      <div class="logoFooter logo_git">
        <a href="https://github.com/HamelenYakkington" target="”_blank”">
          <img src="../assets/github.webp" alt="logo_github" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterComponent",
  data() {
    return {
      copyrightText: `© ${new Date().getFullYear()} Steven Lefebvre tous droits réservés`,
    };
  },
};
</script>

<style>
.footer {
  background-color: black;
}

.logoFooter img {
  width: 32px;
  height: auto;
  text-align: center;
  margin-bottom: 8px;
  margin-top: 8px;
}

.copyright-span {
  color: white;
}

.div_copyright {
  text-align: center;
}

.div_logo {
  display: flex;
  flex-direction: row;
  padding-right: 0px !important;
  justify-content: center;
  align-items: center;
}
</style>
