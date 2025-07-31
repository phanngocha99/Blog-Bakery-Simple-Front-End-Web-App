function onSubmit(e) {
    e.preventDefault();
    const CAPTCHA_SITE_KEY = '';
    const CAPTCHA_PROJECT_ID = 'my-project-web1-1732838476499';
    const CAPTCHA_API_KEY = '';
    let responseMessage = document.getElementById('responseMessage');
    responseMessage.className = 'text-success';
    responseMessage.innerHTML = '';

    grecaptcha.enterprise.ready(async function () {
        let token = await grecaptcha.enterprise.execute(CAPTCHA_SITE_KEY, { action: 'submit' });

        let url = `https://recaptchaenterprise.googleapis.com/v1/projects/${CAPTCHA_PROJECT_ID}/assessments?key=${CAPTCHA_API_KEY}`;

        let postData = {
            "event": {
                "token": token,
                "siteKey": CAPTCHA_SITE_KEY,
                "expectedAction": "submit"
            }
        };
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        let result = await response.json();

        if (result.tokenProperties.valid) {
            sendMail();
        } else {
            responseMessage.innerHTML = 'Error: Can not verify Recaptcha!';
            responseMessage.className = 'text-danger';
        }

    });
}
