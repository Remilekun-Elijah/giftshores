exports.sendGiftTemplate = ({ purpose, name, gifts }) => {
  return `
  <mjml>
  <mj-head>
    <mj-title>Say hello to card</mj-title>
    <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500"></mj-font>
    <mj-attributes>
      <mj-all font-family="Montserrat, Helvetica, Arial, sans-serif"></mj-all>
      <mj-text font-weight="400" font-size="16px" color="#000000" line-height="24px"></mj-text>
      <mj-section padding="0px"></mj-section>
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#F2F2F2">
    <mj-section padding="10px 0 20px 0">
      <mj-column>
      </mj-column>
    </mj-section>
    <mj-section padding="20px 20px 0 20px" background-color="#FFFFFF">
      <mj-column width="35%">
        <mj-text align="center" font-size="20px" font-weight="500">// BR&amp;AND</mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding="20px 20px 0 20px" background-color="#FFFFFF">
      <mj-column>
        <mj-text align="center" font-weight="300" padding="30px 40px 10px 40px" font-size="32px" line-height="40px" color="#5FA91D">Start Your Wishlist Journey with Giftshores!</mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding="10px 20px" background-color="#FFFFFF">
      <mj-column>
        <mj-divider width="30px" border-width="3px" border-color="#9B9B9B"></mj-divider>
      </mj-column>
    </mj-section>
    <mj-section padding="0 20px 20px 20px" background-color="#FFFFFF">
      <mj-column width="80%">
        <mj-text align="center" padding-top="10px" font-weight="500" padding="0px">${name} Shared Their Giftshores Wishlist with You.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-url="http://nimus.de/share/tpl-card/bg.jpg" vertical-align="middle" background-size="cover" background-repeat="no-repeat">
      <mj-column width="100%">
        <mj-image src="http://nimus.de/share/tpl-card/lineshadow.png" alt="" align="center" border="none" padding="0px"></mj-image>
        <mj-text align="left" padding="10px 0 0 40px" font-weight="500" padding="0px">Hi there,
</mj-text>
        
        <mj-text align="left" padding="20px 40px 0 40px" font-weight="300">Great news! ${name} has just shared a fantastic wishlist for their ${purpose}, and we thought you might want to join in on the fun.
</mj-text>
        
        <mj-text align="left" padding="20px 40px 0 40px" font-weight="300"><p style="color: #5FA91D">Check out their list:</p> ${gifts.join(
          ", "
        )}
</mj-text>
        
        <mj-text align="left" padding="20px 40px 0 40px" font-weight="300">Ready to create your own wishlist and spread the joy? Head over to <a style="color: #5FA91D;" href="https://fb.com">Giftshores</a> and start crafting your perfect wishlist to share with family and friends
</mj-text>
        
        <mj-button align="center" background-color="#5FA91D" color="#FFFFFF" border-radius="2px" href="#" inner-padding="15px 30px" padding-bottom="100px" padding-top="20px">CREATE LIST</mj-button>
      </mj-column>
    </mj-section>
    <mj-section padding="50px 0 0 0" background-color="#FFFFFF">
      <mj-column>
        <mj-image src="http://nimus.de/share/tpl-card/bottom.png" alt="bottom border" align="center" border="none" padding="0px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section padding="10px 0 20px 0">
      <mj-column>
        <mj-text align="center" color="#9B9B9B" font-size="11px">52 Edison Court Suite 259 / East Aidabury / Cambodi<br /> <a href="#" style="color: #9B9B9B; text-decoration:none;">&copy; copyright GiftShore HQ </a></mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;
};
