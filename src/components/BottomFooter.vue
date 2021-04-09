<template>
    <div class="footer-middle">
    <div class="container">
      <div class="row">
        <div class="col-md-12 copy">
          
          <div class="mb-3">
      <div class="pt-4">
        <img
          class="mr-2"
          width="45px"
          src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
          alt="Visa"
        />
        <img
          class="mr-2"
          width="45px"
          src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
          alt="Mastercard"
        />
        <img
          class="mr-2"
          width="45px"
          src="https://mdbootstrap.com/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
          alt="PayPal acceptance mark"
        />
        <ul class="social-network social-circle">
                <li>
                  <a href="https://www.facebook.com" aria-label="facebook" target="_blank" class="sm-icons" title="Facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                </li>
                <li>
                  <a href="https://www.linkedin.com" aria-label="linkedin" target="_blank" class="sm-icons" title="Linkedin"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
                </li>
                <li>
                    <a href="https://www.instagram.com" aria-label="instagram" target="_blank" class="icoInstagram" title="Instagram"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                </li>
                <li>
                    <a href="https://twitter.com" aria-label="twitter" target="_blank" class="icoTwitter" title="Twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                </li>
              </ul>
        
      </div>
    </div>
          <p class="text-center">
            &copy; Copyright 2021 - Banana Commerce. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: "bottomfooter",
}

</script>
<style scoped>
.footer-middle {
  background-color:#fff;
  position: sticky;
  width: 100%;
  margin-top: 50px;
  bottom: 0;
  }
.copy {
  width: 100%;
  font-size: 12px;
  padding: 10px;
  border-top: 1px solid rgb(156, 154, 154);
}

.soc-media-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

ul.social-network {
  list-style: none;
  display: inline;
  padding: 0;
  margin-left: 50px;
}

ul.social-network li {
  display: inline;
  margin: 0 5px;
}
.social-network a.sm-icons:hover{
  color: #44bcdd;
}
.mr-2 {
    cursor: pointer;
}
</style>